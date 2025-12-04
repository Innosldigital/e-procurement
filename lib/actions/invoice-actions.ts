"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Invoice } from "../models/Invoice";
import { createNotification } from "./notification-actions";

export async function getInvoices() {
  try {
    await dbConnect();
    const invoices = await Invoice.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(invoices)),
    };
  } catch (error) {
    console.error("[v0] Error fetching invoices:", error);
    return { success: false, error: "Failed to fetch invoices" };
  }
}

export async function getInvoiceById(id: string) {
  try {
    await dbConnect();
    const invoice = await Invoice.findById(id).lean();

    if (!invoice) {
      return { success: false, error: "Invoice not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(invoice)),
    };
  } catch (error) {
    console.error("[v0] Error fetching invoice:", error);
    return { success: false, error: "Failed to fetch invoice" };
  }
}

export async function createInvoice(payload: {
  invoiceNumber: string;
  supplier: string;
  amount: number;
  poNumber?: string;
  dueDate?: Date;
  invoiceDate?: Date;
  entity?: string;
  currency?: string;
  lineItems?: Array<{
    description: string;
    qty: number;
    unitPrice: number;
    tax?: number;
    lineTotal?: number;
  }>;
  notes?: string;
}) {
  try {
    await dbConnect();
    const doc = await Invoice.create({
      invoiceNumber: payload.invoiceNumber,
      supplier: payload.supplier,
      amount: payload.amount,
      poNumber: payload.poNumber,
      dueDate: payload.dueDate,
      invoiceDate: payload.invoiceDate || new Date(),
      entity: payload.entity,
      currency: payload.currency || "USD",
      status: "Pending approval",
      lineItems: payload.lineItems || [],
      notes: payload.notes || "",
    });

    revalidatePath("/invoices");

    return { success: true, data: JSON.parse(JSON.stringify(doc)) };
  } catch (error) {
    console.error("[v0] Error creating invoice:", error);
    return { success: false, error: "Failed to create invoice" };
  }
}

export async function approveInvoice(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { status: "approved_for_payment" },
      { new: true }
    ).lean();

    if (!invoice) {
      return { success: false, error: "Invoice not found" };
    }

    await createNotification({
      userId: "FINANCE_USER_ID",
      type: "invoice_update",
      title: "Invoice Approved for Payment",
      message: `Invoice ${String(
        (invoice as any).invoiceNumber || ""
      )} approved for payment`,
      actionUrl: `/invoices/${String((invoice as any)._id)}`,
      priority: "medium",
      metadata: {
        invoiceNumber: (invoice as any).invoiceNumber || "",
        supplier: (invoice as any).supplier || "",
        amount: (invoice as any).amount ?? 0,
      },
    });

    revalidatePath("/invoices");

    return { success: true, data: JSON.parse(JSON.stringify(invoice)) };
  } catch (error) {
    console.error("[v0] Error approving invoice:", error);
    return { success: false, error: "Failed to approve invoice" };
  }
}

export async function schedulePayment(id: string, paymentDate: Date) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      {
        status: "scheduled",
        scheduledPaymentDate: paymentDate,
        scheduledBy: userId,
      },
      { new: true }
    ).lean();

    if (!invoice) {
      return { success: false, error: "Invoice not found" };
    }

    const inv = invoice as {
      _id: string;
      invoiceNumber?: string;
      amount?: number;
    };
    await createNotification({
      userId: "FINANCE_USER_ID",
      type: "invoice_overdue",
      title: "Payment Scheduled",
      message: `Invoice ${String(
        inv.invoiceNumber || ""
      )} payment scheduled for ${new Date(paymentDate).toLocaleDateString()}`,
      actionUrl: `/invoices/${String(inv._id)}`,
      priority: "low",
      metadata: {
        invoiceNumber: inv.invoiceNumber || "",
        amount: inv.amount ?? 0,
        paymentDate: paymentDate,
      },
    });

    revalidatePath("/invoices");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(invoice)),
    };
  } catch (error) {
    console.error("Error scheduling payment:", error);
    return { success: false, error: "Failed to schedule payment" };
  }
}

export async function putInvoiceOnHold(id: string, reason: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      {
        status: "on_hold",
        holdReason: reason,
        putOnHoldBy: userId,
      },
      { new: true }
    ).lean();

    if (!invoice) {
      return { success: false, error: "Invoice not found" };
    }

    const inv2 = invoice as {
      _id: string;
      invoiceNumber?: string;
      amount?: number;
    };
    await createNotification({
      userId: "PROCUREMENT_USER_ID", // In production, get procurement manager ID
      type: "invoice_overdue",
      title: "Invoice Put On Hold",
      message: `Invoice ${String(
        inv2.invoiceNumber || ""
      )} has been put on hold. Reason: ${reason}`,
      actionUrl: `/invoices/${String(inv2._id)}`,
      priority: "high",
      metadata: {
        invoiceNumber: inv2.invoiceNumber || "",
        amount: inv2.amount ?? 0,
        holdReason: reason,
      },
    });

    revalidatePath("/invoices");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(invoice)),
    };
  } catch (error) {
    console.error("[v0] Error putting invoice on hold:", error);
    return { success: false, error: "Failed to put invoice on hold" };
  }
}

export async function checkOverdueInvoices() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const today = new Date();
    const overdueInvoices = await Invoice.find({
      status: { $in: ["pending_approval", "pending_match"] },
      dueDate: { $lt: today },
    }).lean();

    for (const invoice of overdueInvoices) {
      await createNotification({
        userId: "FINANCE_USER_ID",
        type: "invoice_overdue",
        title: "Invoice Overdue",
        message: `Invoice ${invoice.invoiceNumber} from ${
          invoice.supplier
        } is overdue by ${Math.floor(
          (today.getTime() - new Date(invoice.dueDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )} days`,
        actionUrl: `/invoices/${invoice._id}`,
        priority: "urgent",
        metadata: {
          invoiceNumber: invoice.invoiceNumber,
          supplier: invoice.supplier,
          amount: invoice.amount,
          dueDate: invoice.dueDate,
        },
      });
    }

    return {
      success: true,
      count: overdueInvoices.length,
    };
  } catch (error) {
    console.error("[v0] Error checking overdue invoices:", error);
    return { success: false, error: "Failed to check overdue invoices" };
  }
}
