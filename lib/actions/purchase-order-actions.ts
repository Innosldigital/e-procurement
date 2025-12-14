"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import { PurchaseOrder } from "../models/PurchaseOrder";
import { Requisition } from "../models/Requisition";
import { Supplier } from "../models/Supplier";

export async function getPurchaseOrders() {
  try {
    await dbConnect();
    const orders = await PurchaseOrder.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    console.error("[v0] Error fetching purchase orders:", error);
    return { success: false, error: "Failed to fetch purchase orders" };
  }
}

export async function getSpendMTD() {
  try {
    await dbConnect();
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const result = await PurchaseOrder.aggregate([
      { $match: { "keyDates.issued": { $gte: start, $lt: end } } },
      { $group: { _id: null, sum: { $sum: "$total" } } },
    ]);

    const sum = result?.[0]?.sum || 0;
    return { success: true, data: sum };
  } catch (error) {
    console.error("[v0] Error aggregating MTD spend:", error);
    return { success: false, error: "Failed to aggregate MTD spend" };
  }
}

export async function getSpendVsBudgetThisQuarter() {
  try {
    await dbConnect();
    const now = new Date();
    const month = now.getMonth();
    const quarterStartMonth = month - (month % 3);
    const start = new Date(now.getFullYear(), quarterStartMonth, 1);
    const end = new Date(now.getFullYear(), quarterStartMonth + 3, 1);

    const actualAgg = await PurchaseOrder.aggregate([
      { $match: { "keyDates.issued": { $gte: start, $lt: end } } },
      { $group: { _id: null, sum: { $sum: "$total" } } },
    ]);
    const budgetAgg = await Requisition.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);
    const topBranchAgg = await Requisition.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      { $group: { _id: "$branch", sum: { $sum: "$amount" } } },
      { $sort: { sum: -1 } },
      { $limit: 1 },
    ]);
    const topCategoryAgg = await Requisition.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      { $group: { _id: "$category", sum: { $sum: "$amount" } } },
      { $sort: { sum: -1 } },
      { $limit: 1 },
    ]);

    const actual = actualAgg?.[0]?.sum || 0;
    const budget = budgetAgg?.[0]?.sum || 0;
    const savings = Math.max(budget - actual, 0);
    const topBranch = (topBranchAgg?.[0]?._id as string) || "";
    const topCategory = (topCategoryAgg?.[0]?._id as string) || "";

    return {
      success: true,
      data: {
        actual,
        budget,
        savings,
        topBranch,
        topCategory,
        start,
        end,
      },
    };
  } catch (error) {
    console.error("[v0] Error aggregating spend vs budget:", error);
    return { success: false, error: "Failed to aggregate spend vs budget" };
  }
}

export async function getPurchaseOrderById(id: string) {
  try {
    await dbConnect();
    const order = await PurchaseOrder.findById(id).lean();

    if (!order) {
      return { success: false, error: "Purchase order not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(order)),
    };
  } catch (error) {
    console.error("[v0] Error fetching purchase order:", error);
    return { success: false, error: "Failed to fetch purchase order" };
  }
}

export async function receiveGoods(id: string, lineItems: any[]) {
  try {
    await dbConnect();

    const order = await PurchaseOrder.findByIdAndUpdate(
      id,
      {
        $set: {
          "receiptStatus.received": lineItems,
        },
      },
      { new: true }
    ).lean();

    if (!order) {
      return { success: false, error: "Purchase order not found" };
    }

    revalidatePath("/purchase-orders");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(order)),
    };
  } catch (error) {
    console.error("[v0] Error receiving goods:", error);
    return { success: false, error: "Failed to receive goods" };
  }
}

export async function closePurchaseOrder(id: string) {
  try {
    await dbConnect();

    const order = await PurchaseOrder.findByIdAndUpdate(
      id,
      {
        status: "closed",
        closedAt: new Date(),
      },
      { new: true }
    ).lean();

    if (!order) {
      return { success: false, error: "Purchase order not found" };
    }

    revalidatePath("/purchase-orders");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(order)),
    };
  } catch (error) {
    console.error("[v0] Error closing purchase order:", error);
    return { success: false, error: "Failed to close purchase order" };
  }
}

export async function createPurchaseOrder(data: {
  supplier: string;
  requester?: string;
  department?: string;
  linkedRequisition?: string;
  currency?: string;
  purpose?: string;
  paymentTerms?: string;
  requestedDelivery?: Date;
  lineItems: Array<{ description: string; qty: number; unitPrice: number }>;
}) {
  try {
    await dbConnect();

    const count = await PurchaseOrder.countDocuments();
    const poNumber = `PO-${(count + 1200).toString()}`;

    const now = new Date();
    const items = (data.lineItems || []).map((li, idx) => {
      const ordered = Number(li.qty) || 0;
      const received = 0;
      const remaining = ordered;
      const lineTotal = (Number(li.qty) || 0) * (Number(li.unitPrice) || 0);
      return {
        line: idx + 1,
        description: li.description,
        ordered,
        received,
        remaining,
        lineTotal,
      };
    });
    const total = items.reduce(
      (sum, it) => sum + (Number(it.lineTotal) || 0),
      0
    );

    const po = await PurchaseOrder.create({
      poNumber,
      supplier: data.supplier,
      supplierRef: await (async () => {
        try {
          const s = await Supplier.findOne({
            $or: [{ name: data.supplier }, { supplierId: data.supplier }],
          }).select(["_id"]);
          return s?._id || undefined;
        } catch {
          return undefined;
        }
      })(),
      status: "Issued",
      total,
      requester: data.requester,
      department: data.department,
      linkedRequisition: data.linkedRequisition,
      currency: data.currency || "USD",
      purpose: data.purpose,
      paymentTerms: data.paymentTerms,
      keyDates: {
        issued: now,
        requestedDelivery: data.requestedDelivery || undefined,
      },
      lineItems: items,
      delivery: {
        shipTo: "",
        invoiceTo: "",
      },
      receiptStatus: {
        status: "Pending receipt",
        details: "",
      },
      invoiceStatus: {
        status: "Pending invoice",
        details: "",
      },
      approvalHistory: [
        {
          event: "PO issued",
          date: now.toISOString(),
          actor: data.requester || "",
        },
      ],
      notes: "",
    });

    revalidatePath("/purchase-orders");

    return { success: true, data: JSON.parse(JSON.stringify(po)) };
  } catch (error) {
    console.error("[v0] Error creating purchase order:", error);
    return { success: false, error: "Failed to create purchase order" };
  }
}
