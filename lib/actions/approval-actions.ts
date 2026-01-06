"use server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Approval } from "../models/Approval";
import { Requisition } from "../models/Requisition";
import { PurchaseOrder } from "../models/PurchaseOrder";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type ApprovalTableRow = {
  _id: string;
  type: "Approval" | "Requisition" | "Purchase Order";
  itemId: string;
  requester: string;
  status: string;
  amount: number;
  createdAt: string | Date;
};

async function canApprove(
  userId: string
): Promise<{ allowed: boolean; role?: string; error?: string }> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const md = (user?.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const normalizedRole = rawRole.toLowerCase().replace(/[\s_-]/g, "");

    const allowedRoles = ["admin", "superadmin", "projectlead"];

    if (allowedRoles.includes(normalizedRole)) {
      return { allowed: true, role: normalizedRole };
    }

    return {
      allowed: false,
      error: "Only Admin, Superadmin, and Project Lead can approve requests",
    };
  } catch (error) {
    console.error("Error checking approval permission:", error);
    return { allowed: false, error: "Failed to verify permissions" };
  }
}

// Add this function to your approval-actions.ts file

export async function getItemDetails(id: string, type: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    let item: any = null;

    if (type === "Approval") {
      item = await Approval.findById(id).lean();
    } else if (type === "Requisition") {
      item = await Requisition.findById(id).lean();
      if (item) {
        // Transform requisition to match expected format
        item = {
          ...item,
          type: "Requisition",
          itemId: item.requisitionId,
          requester: item.requester || item.createdBy || "N/A",
          amount: item.amount || 0,
        };
      }
    } else if (type === "Purchase Order") {
      item = await PurchaseOrder.findById(id).lean();
      if (item) {
        // Transform purchase order to match expected format
        item = {
          ...item,
          type: "Purchase Order",
          itemId: item.poNumber,
          requester: item.supplier || "N/A",
          amount: item.total || 0,
        };
      }
    }

    if (!item) {
      return { success: false, error: "Item not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(item)),
    };
  } catch (error) {
    console.error("Error fetching item details:", error);
    return { success: false, error: "Failed to fetch item details" };
  }
}

// UPDATED: Handle approval for different item types
export async function approveRequest(
  id: string,
  type: string,
  comments?: string
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    await dbConnect();

    const updateData = {
      status: "approved",
      approvedAt: new Date(),
      approvedBy: userId,
    };

    let item: any = null;

    if (type === "Approval") {
      item = await Approval.findByIdAndUpdate(id, updateData, { new: true });
    } else if (type === "Requisition") {
      item = await Requisition.findByIdAndUpdate(id, updateData, { new: true });
    } else if (type === "Purchase Order") {
      item = await PurchaseOrder.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    }

    if (!item) {
      return { success: false, error: "Item not found" };
    }

    // Add comment and timeline if provided
    if (comments) {
      const commentUpdate = {
        $push: {
          comments: { author: userId, text: comments, date: new Date() },
          timeline: {
            event: "Approved",
            timestamp: new Date(),
            actor: userId,
            details: comments,
          },
        },
      };

      if (type === "Approval") {
        await Approval.findByIdAndUpdate(id, commentUpdate);
      } else if (type === "Requisition") {
        await Requisition.findByIdAndUpdate(id, commentUpdate);
      } else if (type === "Purchase Order") {
        await PurchaseOrder.findByIdAndUpdate(id, commentUpdate);
      }
    }

    revalidatePath("/approvals");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(item)),
    };
  } catch (error) {
    console.error("Error approving request:", error);
    return { success: false, error: "Failed to approve request" };
  }
}

// UPDATED: Handle rejection for different item types
export async function rejectRequest(
  id: string,
  type: string,
  comments: string
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    if (!comments || !comments.trim()) {
      return { success: false, error: "Rejection reason is required" };
    }

    await dbConnect();

    const updateData = {
      status: "rejected",
      rejectedAt: new Date(),
      rejectedBy: userId,
      reason: comments,
      $push: {
        comments: { author: userId, text: comments, date: new Date() },
        timeline: {
          event: "Rejected",
          timestamp: new Date(),
          actor: userId,
          details: comments,
        },
      },
    };

    let item: any = null;

    if (type === "Approval") {
      item = await Approval.findByIdAndUpdate(id, updateData, {
        new: true,
      }).lean();
    } else if (type === "Requisition") {
      item = await Requisition.findByIdAndUpdate(id, updateData, {
        new: true,
      }).lean();
    } else if (type === "Purchase Order") {
      item = await PurchaseOrder.findByIdAndUpdate(id, updateData, {
        new: true,
      }).lean();
    }

    if (!item) {
      return { success: false, error: "Item not found" };
    }

    revalidatePath("/approvals");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(item)),
    };
  } catch (error) {
    console.error("Error rejecting request:", error);
    return { success: false, error: "Failed to reject request" };
  }
}

// UPDATED: Handle change requests for different item types
export async function requestChanges(
  id: string,
  type: string,
  comments: string
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    if (!comments || !comments.trim()) {
      return { success: false, error: "Change details are required" };
    }

    await dbConnect();

    const updateData = {
      status: "changes_requested",
      requestedBy: userId,
      $push: {
        comments: { author: userId, text: comments, date: new Date() },
        timeline: {
          event: "Changes Requested",
          timestamp: new Date(),
          actor: userId,
          details: comments,
        },
      },
    };

    let item: any = null;

    if (type === "Approval") {
      item = await Approval.findByIdAndUpdate(id, updateData, {
        new: true,
      }).lean();
    } else if (type === "Requisition") {
      item = await Requisition.findByIdAndUpdate(id, updateData, {
        new: true,
      }).lean();
    } else if (type === "Purchase Order") {
      item = await PurchaseOrder.findByIdAndUpdate(id, updateData, {
        new: true,
      }).lean();
    }

    if (!item) {
      return { success: false, error: "Item not found" };
    }

    revalidatePath("/approvals");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(item)),
    };
  } catch (error) {
    console.error("Error requesting changes:", error);
    return { success: false, error: "Failed to request changes" };
  }
}

export async function bulkApprove(ids: string[], comments?: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    await dbConnect();

    const now = new Date();
    const timelineEntry = {
      event: "Bulk Approved",
      timestamp: now,
      actor: userId,
      details: comments || "Bulk approval",
    };

    // Update only approvals in bulk (not requisitions/POs directly)
    await Approval.updateMany(
      { _id: { $in: ids } },
      {
        $set: { status: "approved", approvedAt: now, approvedBy: userId },
        $push: { timeline: timelineEntry },
      }
    );

    if (comments) {
      await Approval.updateMany(
        { _id: { $in: ids } },
        { $push: { comments: { author: userId, text: comments, date: now } } }
      );
    }

    revalidatePath("/approvals");

    return { success: true, count: ids.length };
  } catch (error) {
    console.error("Error bulk approving:", error);
    return { success: false, error: "Failed to bulk approve" };
  }
}

export async function getApprovalsWithDetails() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
        data: { approvals: [], requisitions: [], purchaseOrders: [] },
      };
    }

    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return {
        success: false,
        error: permissionCheck.error,
        data: { approvals: [], requisitions: [], purchaseOrders: [] },
      };
    }

    await dbConnect();

    const [approvals, requisitions, purchaseOrders] = await Promise.all([
      Approval.find({}).sort({ createdAt: -1 }).limit(100).lean(),
      Requisition.find({}).sort({ createdAt: -1 }).limit(100).lean(),
      PurchaseOrder.find({}).sort({ createdAt: -1 }).limit(100).lean(),
    ]);

    const safeApprovals = Array.isArray(approvals) ? approvals : [];
    const safeReqs = Array.isArray(requisitions) ? requisitions : [];
    const safePOs = Array.isArray(purchaseOrders) ? purchaseOrders : [];

    const approvalRows: ApprovalTableRow[] = safeApprovals.map((a: any) => ({
      _id: String(a._id),
      type: "Approval",
      itemId: a.itemId || "N/A",
      requester: a.requester || "N/A",
      status: a.status || "pending",
      amount: Number(a.amount || 0),
      createdAt: a.createdAt,
    }));

    const requisitionRows: ApprovalTableRow[] = safeReqs.map((r: any) => ({
      _id: String(r._id),
      type: "Requisition",
      itemId: r.requisitionId || "N/A",
      requester: r.requester || r.createdBy || "N/A",
      status: r.status || "pending",
      amount: Number(r.amount || 0),
      createdAt: r.createdAt,
    }));

    const purchaseOrderRows: ApprovalTableRow[] = safePOs.map((po: any) => ({
      _id: String(po._id),
      type: "Purchase Order",
      itemId: po.poNumber || "N/A",
      requester: po.supplier || "N/A",
      status: po.status || "pending",
      amount: Number(po.total || 0),
      createdAt: po.createdAt || po.keyDates?.requestedDelivery || new Date(),
    }));

    return {
      success: true,
      data: {
        approvals: approvalRows,
        requisitions: requisitionRows,
        purchaseOrders: purchaseOrderRows,
      },
    };
  } catch (error) {
    console.error("Error fetching approvals with details:", error);
    return {
      success: false,
      error: "Failed to fetch approvals",
      data: { approvals: [], requisitions: [], purchaseOrders: [] },
    };
  }
}
