"use server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Approval } from "../models/Approval";
import { Requisition } from "../models/Requisition";
import { PurchaseOrder } from "../models/PurchaseOrder";
import { clerkClient } from "@clerk/nextjs/server";
import { sendEmail } from "./admin-approval-actions";
import { createNotification } from "./notification-actions";
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

type ApprovalsResponse = {
  success: boolean;
  error?: string;
  data: {
    approvals: ApprovalTableRow[];
    requisitions: ApprovalTableRow[];
    purchaseOrders: ApprovalTableRow[];
  };
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

async function getRequesterInfo(approval: any) {
  try {
    let userId = "";
    if (approval.type === "Requisition") {
      let req: any = null;
      if (approval.itemId && /^[0-9a-fA-F]{24}$/.test(approval.itemId)) {
        req = await Requisition.findById(approval.itemId).lean();
      }
      if (!req) {
        req = await Requisition.findOne({
          requisitionId: approval.itemId,
        }).lean();
      }
      if (req) userId = req.createdBy || "";
    } else if (approval.type === "Purchase Order") {
      let po: any = null;
      if (approval.itemId && /^[0-9a-fA-F]{24}$/.test(approval.itemId)) {
        po = await PurchaseOrder.findById(approval.itemId).lean();
      }
      if (!po) {
        po = await PurchaseOrder.findOne({ poNumber: approval.itemId }).lean();
      }

      if (po) {
        if (po.linkedRequisition) {
          let req: any = null;
          if (
            po.linkedRequisition &&
            /^[0-9a-fA-F]{24}$/.test(po.linkedRequisition)
          ) {
            req = await Requisition.findById(po.linkedRequisition).lean();
          }
          if (!req) {
            req = await Requisition.findOne({
              requisitionId: po.linkedRequisition,
            }).lean();
          }
          if (req) userId = req.createdBy || "";
        }
      }
    }

    if (!userId) return null;

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;
    const name =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";

    return { userId, email, name };
  } catch (e) {
    console.error("Error getting requester info:", e);
    return null;
  }
}

// ✅ RESTORED: getApprovals function
export async function getApprovals() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    await dbConnect();
    const approvals = await Approval.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approvals || [])),
    };
  } catch (error) {
    console.error("Error fetching approvals:", error);
    return { success: false, error: "Failed to fetch approvals", data: [] };
  }
}

// ✅ RESTORED: getPendingApprovalsCount function
export async function getPendingApprovalsCount() {
  try {
    await dbConnect();
    const statuses = [
      "Awaiting your approval",
      "Pending review",
      "Parallel approval",
      "SLA breached",
    ];
    const count = await Approval.countDocuments({ status: { $in: statuses } });
    return { success: true, count };
  } catch (error) {
    return {
      success: false,
      error: "Failed to count pending approvals",
      count: 0,
    };
  }
}

// export async function getPendingApprovals() {
//   try {
//     await dbConnect();
//     const statuses = [
//       "Awaiting your approval",
//       "Pending review",
//       "Parallel approval",
//       "SLA breached",
//     ];
//     const items = await Approval.find({ status: { $in: statuses } })
//       .sort({ createdAt: -1 })
//       .lean();
//     return { success: true, data: JSON.parse(JSON.stringify(items)) };
//   } catch (error) {
//     return {
//       success: false,
//       error: "Failed to fetch pending approvals",
//       data: [],
//     };
//   }
// }

// RESTORED: getApprovalById function

// Add this function to your lib/actions/approval-actions.ts file

export async function getPendingApprovals() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    await dbConnect();

    // Get all approvals with pending statuses
    const statuses = [
      "Awaiting your approval",
      "Pending review",
      "Parallel approval",
      "SLA breached",
      "pending",
    ];

    const approvals = await Approval.find({
      status: { $in: statuses },
    })
      .sort({ createdAt: -1 })
      .lean();

    console.log(
      `[getPendingApprovals] Found ${approvals.length} pending approvals`
    );

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approvals || [])),
    };
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    return {
      success: false,
      error: "Failed to fetch pending approvals",
      data: [],
    };
  }
}

export async function getApprovalById(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    const approval = await Approval.findById(id).lean();

    if (!approval) {
      return { success: false, error: "Approval not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approval)),
    };
  } catch (error) {
    console.error("Error fetching approval:", error);
    return { success: false, error: "Failed to fetch approval" };
  }
}

// ✅ NEW: Get details for any item type (Approval, Requisition, or Purchase Order)
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

// ✅ UPDATED: Handle approval for different item types
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

// ✅ UPDATED: Handle rejection for different item types
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

// ✅ UPDATED: Handle change requests for different item types
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

    const approvals = await Approval.find({ _id: { $in: ids } }).lean();
    for (const approval of approvals) {
      const ap = approval as any;
      const resourceType = ap.type ? ap.type.toLowerCase() : "request";
      const requester = await getRequesterInfo(ap);
      const targetUserId = requester?.userId || "REQUESTER_USER_ID";

      await createNotification({
        userId: targetUserId,
        type: "approval_pending",
        title: `${ap.type} Approved`,
        message: `Your ${resourceType} ${ap.itemId ?? ""} for Nle${(
          ap.amount ?? 0
        ).toLocaleString()} has been approved`,
        actionUrl: `/${resourceType}s/${ap.itemId ?? ""}`,
        priority: "medium",
        metadata: {
          approvalId: ap._id,
          itemId: ap.itemId ?? "",
          amount: ap.amount ?? 0,
        },
      });

      if (requester?.email) {
        await sendEmail(
          requester.email,
          `${ap.type} Approved`,
          `<p>Your ${resourceType} <strong>${
            ap.itemId ?? ""
          }</strong> for <strong>Nle${(
            ap.amount ?? 0
          ).toLocaleString()}</strong> has been approved.</p>`,
          `${process.env.NEXT_PUBLIC_APP_URL || ""}/${resourceType}s/${
            ap.itemId ?? ""
          }`,
          "View Details"
        );
      }
    }

    revalidatePath("/approvals");

    return { success: true, count: ids.length };
  } catch (error) {
    console.error("Error bulk approving:", error);
    return { success: false, error: "Failed to bulk approve" };
  }
}

export async function getApprovalsWithDetails(): Promise<ApprovalsResponse> {
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
