"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Requisition } from "../models/Requisition";
// import { uploadFileToCloudinary } from '@/lib/cloudinary'
import { createNotification } from "@/lib/actions/notification-actions";

export async function getRequisitions() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    const requisitions = await Requisition.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(requisitions)),
    };
  } catch (error) {
    console.error("[v0] Error fetching requisitions:", error);
    return { success: false, error: "Failed to fetch requisitions" };
  }
}

export async function getRequisitionById(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    const requisition = await Requisition.findById(id).lean();

    if (!requisition) {
      return { success: false, error: "Requisition not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(requisition)),
    };
  } catch (error) {
    console.error("[v0] Error fetching requisition:", error);
    return { success: false, error: "Failed to fetch requisition" };
  }
}

export async function createRequisition(formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    await dbConnect();

    const files = formData.getAll("files") as File[];
    const attachments: Array<{ filename: string; url: string }> = [];
    if (Array.isArray(files) && files.length > 0) {
      for (const f of files) {
        if (!f || !f.size) continue;
        try {
          // const result = await uploadFileToCloudinary(f, 'requisitions')
          // const filename = (f as any).name || result.original_filename || 'file'
          // attachments.push({ filename, url: result.secure_url || result.url })
        } catch {}
      }
    }

    // Auto-generate requisitionId if not provided
    let requisitionId = formData.get("requisitionId") as string;
    if (!requisitionId) {
      const count = await Requisition.countDocuments();
      const year = new Date().getFullYear();
      requisitionId = `REQ-${year}-${String(count + 1).padStart(4, "0")}`;
    }

    const lineItemsRaw = formData.get("lineItems") as string;
    const lineItems = lineItemsRaw ? JSON.parse(lineItemsRaw) : [];

    const requisition = await Requisition.create({
      requisitionId,
      requester: formData.get("requester"),
      createdBy: userId,
      branch: formData.get("branch"),
      date: formData.get("date")
        ? new Date(formData.get("date") as string)
        : new Date(),
      amount: Number(formData.get("amount")),
      category: formData.get("category"),
      neededBy: formData.get("neededBy")
        ? new Date(formData.get("neededBy") as string)
        : null,
      costCenter: formData.get("costCenter") || undefined,
      lineItems,
      attachments,
      timeline: [
        {
          event: "Requisition created",
          timestamp: new Date(),
          actor: userId,
          details: "Requisition submitted for approval",
        },
      ],
    });

    // Create notification
    await createNotification({
      userId: "admin-user-id-here", // Replace with real approver logic
      type: "requisition_submitted",
      title: "New Requisition Submitted",
      message: `${
        requisition.requester
      } submitted ${requisitionId} for $${requisition.amount.toLocaleString()}`,
      actionUrl: `/requisitions/${requisition._id}`,
      priority: "high",
      metadata: { requisitionId, amount: requisition.amount },
    });

    revalidatePath("/requisitions");
    return { success: true, data: JSON.parse(JSON.stringify(requisition)) };
  } catch (error: any) {
    console.error("[createRequisition] Error:", error);
    return {
      success: false,
      error: error.message || "Failed to create requisition",
    };
  }
}

export async function updateRequisition(id: string, updates: any) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const oldRequisition = await Requisition.findById(id).lean();

    const requisition = await Requisition.findByIdAndUpdate(id, updates, {
      new: true,
    }).lean();

    if (!requisition) {
      return { success: false, error: "Requisition not found" };
    }

    const oldReq = oldRequisition as { status?: string } | null;
    const req = requisition as {
      _id: string;
      createdBy?: string;
      requisitionId?: string;
      amount?: number;
      status?: string;
    };
    if (oldReq && oldReq.status !== req.status) {
      if (req.status === "approved") {
        await createNotification({
          userId: req.createdBy || "REQUESTER_USER_ID",
          type: "requisition_approved",
          title: "Requisition Approved",
          message: `Your requisition ${
            req.requisitionId ?? ""
          } has been approved for Nle${(req.amount ?? 0).toLocaleString()}`,
          actionUrl: `/requisitions/${req._id}`,
          priority: "medium",
          metadata: {
            requisitionId: req.requisitionId ?? "",
            amount: req.amount ?? 0,
          },
        });
      } else if (req.status === "rejected") {
        await createNotification({
          userId: req.createdBy || "REQUESTER_USER_ID",
          type: "requisition_rejected",
          title: "Requisition Rejected",
          message: `Your requisition ${
            req.requisitionId ?? ""
          } has been rejected. Please review and resubmit.`,
          actionUrl: `/requisitions/${req._id}`,
          priority: "high",
          metadata: {
            requisitionId: req.requisitionId ?? "",
            amount: req.amount ?? 0,
          },
        });
      }
    }

    revalidatePath("/requisitions");
    revalidatePath(`/requisitions/${id}`);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(requisition)),
    };
  } catch (error) {
    console.error("[v0] Error updating requisition:", error);
    return { success: false, error: "Failed to update requisition" };
  }
}

export async function deleteRequisition(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const requisition = await Requisition.findByIdAndDelete(id);

    if (!requisition) {
      return { success: false, error: "Requisition not found" };
    }

    revalidatePath("/requisitions");

    return { success: true };
  } catch (error) {
    console.error("[v0] Error deleting requisition:", error);
    return { success: false, error: "Failed to delete requisition" };
  }
}
