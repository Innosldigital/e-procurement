// "use server";

// import mongoose from "mongoose";
// import { revalidatePath } from "next/cache";
// import { auth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import dbConnect from "@/lib/mongodb";
// import { createNotification } from "../actions/notification-actions";
// import { Approval } from "../models/Approval";
// import { Requisition } from "../models/Requisition";
// import { PurchaseOrder } from "../models/PurchaseOrder";
// import { sendEmail } from "./admin-approval-actions";

// // Helper to check if user has approval permissions
// async function canApprove(
//   userId: string
// ): Promise<{ allowed: boolean; role?: string; error?: string }> {
//   try {
//     const client = await clerkClient();
//     const user = await client.users.getUser(userId);
//     const md = (user?.publicMetadata || {}) as any;
//     const rawRole = String(md.role || "");
//     const normalizedRole = rawRole.toLowerCase().replace(/[\s_-]/g, "");

//     const allowedRoles = ["admin", "superadmin", "projectlead"];

//     if (allowedRoles.includes(normalizedRole)) {
//       return { allowed: true, role: normalizedRole };
//     }

//     return {
//       allowed: false,
//       error: "Only Admin, Superadmin, and Project Lead can approve requests",
//     };
//   } catch (error) {
//     console.error("Error checking approval permission:", error);
//     return { allowed: false, error: "Failed to verify permissions" };
//   }
// }

// async function getRequesterInfo(approval: any) {
//   try {
//     let userId = "";
//     if (approval.type === "Requisition") {
//       let req: any = null;
//       if (mongoose.Types.ObjectId.isValid(approval.itemId)) {
//         req = await Requisition.findById(approval.itemId).lean();
//       }
//       if (!req) {
//         req = await Requisition.findOne({
//           requisitionId: approval.itemId,
//         }).lean();
//       }
//       if (req) userId = req.createdBy || "";
//     } else if (approval.type === "Purchase Order") {
//       let po: any = null;
//       if (mongoose.Types.ObjectId.isValid(approval.itemId)) {
//         po = await PurchaseOrder.findById(approval.itemId).lean();
//       }
//       if (!po) {
//         po = await PurchaseOrder.findOne({ poNumber: approval.itemId }).lean();
//       }

//       if (po) {
//         if (po.linkedRequisition) {
//           let req: any = null;
//           if (mongoose.Types.ObjectId.isValid(po.linkedRequisition)) {
//             req = await Requisition.findById(po.linkedRequisition).lean();
//           }
//           if (!req) {
//             req = await Requisition.findOne({
//               requisitionId: po.linkedRequisition,
//             }).lean();
//           }
//           if (req) userId = req.createdBy || "";
//         }
//       }
//     }

//     if (!userId) return null;

//     const client = await clerkClient();
//     const user = await client.users.getUser(userId);
//     const email = user.emailAddresses[0]?.emailAddress;
//     const name =
//       `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";

//     return { userId, email, name };
//   } catch (e) {
//     console.error("Error getting requester info:", e);
//     return null;
//   }
// }

// // Get all approvals with related requisitions and purchase orders
// export async function getApprovalsWithDetails() {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized", data: [] };
//     }

//     // Check if user has approval permissions
//     const permissionCheck = await canApprove(userId);
//     if (!permissionCheck.allowed) {
//       return { success: false, error: permissionCheck.error, data: [] };
//     }

//     await dbConnect();

//     // Fetch all data in parallel
//     const [approvals, requisitions, purchaseOrders] = await Promise.all([
//       Approval.find({}).sort({ createdAt: -1 }).limit(50).lean(),
//       Requisition.find({}).sort({ createdAt: -1 }).lean(),
//       PurchaseOrder.find({}).sort({ createdAt: -1 }).lean(),
//     ]);

//     return {
//       success: true,
//       data: {
//         approvals: JSON.parse(JSON.stringify(approvals || [])),
//         requisitions: JSON.parse(JSON.stringify(requisitions || [])),
//         purchaseOrders: JSON.parse(JSON.stringify(purchaseOrders || [])),
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching approvals with details:", error);
//     return {
//       success: false,
//       error: "Failed to fetch approvals",
//       data: {
//         approvals: [],
//         requisitions: [],
//         purchaseOrders: [],
//       },
//     };
//   }
// }

// export async function getApprovals() {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized", data: [] };
//     }

//     await dbConnect();
//     const approvals = await Approval.find({})
//       .sort({ createdAt: -1 })
//       .limit(50)
//       .lean();

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(approvals || [])),
//     };
//   } catch (error) {
//     console.error("Error fetching approvals:", error);
//     return { success: false, error: "Failed to fetch approvals", data: [] };
//   }
// }

// export async function getPendingApprovalsCount() {
//   try {
//     await dbConnect();
//     const statuses = [
//       "Awaiting your approval",
//       "Pending review",
//       "Parallel approval",
//       "SLA breached",
//     ];
//     const count = await Approval.countDocuments({ status: { $in: statuses } });
//     return { success: true, count };
//   } catch (error) {
//     return {
//       success: false,
//       error: "Failed to count pending approvals",
//       count: 0,
//     };
//   }
// }

// export async function getApprovalById(id: string) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized" };
//     }

//     await dbConnect();
//     const approval = await Approval.findById(id).lean();

//     if (!approval) {
//       return { success: false, error: "Approval not found" };
//     }

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(approval)),
//     };
//   } catch (error) {
//     console.error("Error fetching approval:", error);
//     return { success: false, error: "Failed to fetch approval" };
//   }
// }

// export async function approveRequest(id: string, comments?: string) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized" };
//     }

//     // Check approval permission
//     const permissionCheck = await canApprove(userId);
//     if (!permissionCheck.allowed) {
//       return { success: false, error: permissionCheck.error };
//     }

//     await dbConnect();

//     const approval = await Approval.findByIdAndUpdate(
//       id,
//       {
//         status: "approved",
//         approvedAt: new Date(),
//         approvedBy: userId,
//       },
//       { new: true }
//     );

//     if (!approval) {
//       return { success: false, error: "Approval not found" };
//     }

//     // Add comment if provided
//     if (comments) {
//       await Approval.findByIdAndUpdate(id, {
//         $push: {
//           comments: { author: userId, text: comments, date: new Date() },
//         },
//       });
//     }

//     // Add timeline event
//     await Approval.findByIdAndUpdate(id, {
//       $push: {
//         timeline: {
//           event: "Approved",
//           timestamp: new Date(),
//           actor: userId,
//           details: comments || "Request approved",
//         },
//       },
//     });

//     const ap = approval as any;
//     const resourceType = ap.type ? ap.type.toLowerCase() : "request";

//     // Get requester info and send notification
//     const requester = await getRequesterInfo(ap);
//     const targetUserId = requester?.userId || "REQUESTER_USER_ID";

//     await createNotification({
//       userId: targetUserId,
//       type: "approval_pending",
//       title: `${ap.type} Approved`,
//       message: `Your ${resourceType} ${ap.itemId ?? ""} for Nle${(
//         ap.amount ?? 0
//       ).toLocaleString()} has been approved`,
//       actionUrl: `/${resourceType}s/${ap.itemId ?? ""}`,
//       priority: "medium",
//       metadata: {
//         approvalId: ap._id,
//         itemId: ap.itemId ?? "",
//         amount: ap.amount ?? 0,
//       },
//     });

//     // Send email
//     if (requester?.email) {
//       await sendEmail(
//         requester.email,
//         `${ap.type} Approved`,
//         `<p>Your ${resourceType} <strong>${
//           ap.itemId ?? ""
//         }</strong> for <strong>Nle${(
//           ap.amount ?? 0
//         ).toLocaleString()}</strong> has been approved.</p>`,
//         `${process.env.NEXT_PUBLIC_APP_URL || ""}/${resourceType}s/${
//           ap.itemId ?? ""
//         }`,
//         "View Details"
//       );
//     }

//     revalidatePath("/approvals");

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(approval)),
//     };
//   } catch (error) {
//     console.error("Error approving request:", error);
//     return { success: false, error: "Failed to approve request" };
//   }
// }

// export async function rejectRequest(id: string, comments: string) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized" };
//     }

//     // Check approval permission
//     const permissionCheck = await canApprove(userId);
//     if (!permissionCheck.allowed) {
//       return { success: false, error: permissionCheck.error };
//     }

//     if (!comments || !comments.trim()) {
//       return { success: false, error: "Rejection reason is required" };
//     }

//     await dbConnect();

//     const approval = await Approval.findByIdAndUpdate(
//       id,
//       {
//         status: "rejected",
//         rejectedAt: new Date(),
//         rejectedBy: userId,
//         reason: comments,
//         $push: {
//           comments: { author: userId, text: comments, date: new Date() },
//           timeline: {
//             event: "Rejected",
//             timestamp: new Date(),
//             actor: userId,
//             details: comments,
//           },
//         },
//       },
//       { new: true }
//     ).lean();

//     if (!approval) {
//       return { success: false, error: "Approval not found" };
//     }

//     const ap = approval as any;
//     const resourceType = ap.type ? ap.type.toLowerCase() : "request";

//     // Get requester info and send notification
//     const requester = await getRequesterInfo(ap);
//     const targetUserId = requester?.userId || "REQUESTER_USER_ID";

//     await createNotification({
//       userId: targetUserId,
//       type: "approval_pending",
//       title: `${ap.type} Rejected`,
//       message: `Your ${resourceType} ${
//         ap.itemId ?? ""
//       } has been rejected. ${comments}`,
//       actionUrl: `/${resourceType}s/${ap.itemId ?? ""}`,
//       priority: "high",
//       metadata: {
//         approvalId: ap._id,
//         itemId: ap.itemId ?? "",
//         amount: ap.amount ?? 0,
//         rejectionReason: comments,
//       },
//     });

//     // Send email
//     if (requester?.email) {
//       await sendEmail(
//         requester.email,
//         `${ap.type} Rejected`,
//         `<p>Your ${resourceType} <strong>${
//           ap.itemId ?? ""
//         }</strong> has been rejected.</p><p><strong>Reason:</strong> ${comments}</p>`,
//         `${process.env.NEXT_PUBLIC_APP_URL || ""}/${resourceType}s/${
//           ap.itemId ?? ""
//         }`,
//         "View Details"
//       );
//     }

//     revalidatePath("/approvals");

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(approval)),
//     };
//   } catch (error) {
//     console.error("Error rejecting request:", error);
//     return { success: false, error: "Failed to reject request" };
//   }
// }

// export async function requestChanges(id: string, comments: string) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized" };
//     }

//     // Check approval permission
//     const permissionCheck = await canApprove(userId);
//     if (!permissionCheck.allowed) {
//       return { success: false, error: permissionCheck.error };
//     }

//     if (!comments || !comments.trim()) {
//       return { success: false, error: "Change details are required" };
//     }

//     await dbConnect();

//     const approval = await Approval.findByIdAndUpdate(
//       id,
//       {
//         status: "changes_requested",
//         requestedBy: userId,
//         $push: {
//           comments: { author: userId, text: comments, date: new Date() },
//           timeline: {
//             event: "Changes Requested",
//             timestamp: new Date(),
//             actor: userId,
//             details: comments,
//           },
//         },
//       },
//       { new: true }
//     ).lean();

//     if (!approval) {
//       return { success: false, error: "Approval not found" };
//     }

//     const ap = approval as any;
//     const resourceType = ap.type ? ap.type.toLowerCase() : "request";

//     // Get requester info and send notification
//     const requester = await getRequesterInfo(ap);
//     const targetUserId = requester?.userId || "REQUESTER_USER_ID";

//     await createNotification({
//       userId: targetUserId,
//       type: "approval_pending",
//       title: "Changes Requested",
//       message: `Changes requested for ${resourceType} ${
//         ap.itemId ?? ""
//       }. ${comments}`,
//       actionUrl: `/${resourceType}s/${ap.itemId ?? ""}`,
//       priority: "medium",
//       metadata: {
//         approvalId: ap._id,
//         itemId: ap.itemId ?? "",
//         changeComments: comments,
//       },
//     });

//     // Send email
//     if (requester?.email) {
//       await sendEmail(
//         requester.email,
//         "Changes Requested",
//         `<p>Changes have been requested for your ${resourceType} <strong>${
//           ap.itemId ?? ""
//         }</strong>.</p><p><strong>Details:</strong> ${comments}</p>`,
//         `${process.env.NEXT_PUBLIC_APP_URL || ""}/${resourceType}s/${
//           ap.itemId ?? ""
//         }`,
//         "View Details"
//       );
//     }

//     revalidatePath("/approvals");

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(approval)),
//     };
//   } catch (error) {
//     console.error("Error requesting changes:", error);
//     return { success: false, error: "Failed to request changes" };
//   }
// }

// export async function bulkApprove(ids: string[], comments?: string) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized" };
//     }

//     // Check approval permission
//     const permissionCheck = await canApprove(userId);
//     if (!permissionCheck.allowed) {
//       return { success: false, error: permissionCheck.error };
//     }

//     await dbConnect();

//     const now = new Date();
//     await Approval.updateMany(
//       { _id: { $in: ids } },
//       {
//         $set: { status: "approved", approvedAt: now, approvedBy: userId },
//         $push: {
//           timeline: {
//             event: "Bulk Approved",
//             timestamp: now,
//             actor: userId,
//             details: comments || "Bulk approval",
//           },
//         },
//       }
//     );

//     if (comments) {
//       await Approval.updateMany(
//         { _id: { $in: ids } },
//         { $push: { comments: { author: userId, text: comments, date: now } } }
//       );
//     }

//     // Send notifications and emails for each approved item
//     const approvals = await Approval.find({ _id: { $in: ids } }).lean();
//     for (const approval of approvals) {
//       const ap = approval as any;
//       const resourceType = ap.type ? ap.type.toLowerCase() : "request";
//       const requester = await getRequesterInfo(ap);
//       const targetUserId = requester?.userId || "REQUESTER_USER_ID";

//       await createNotification({
//         userId: targetUserId,
//         type: "approval_pending",
//         title: `${ap.type} Approved`,
//         message: `Your ${resourceType} ${ap.itemId ?? ""} for Nle${(
//           ap.amount ?? 0
//         ).toLocaleString()} has been approved`,
//         actionUrl: `/${resourceType}s/${ap.itemId ?? ""}`,
//         priority: "medium",
//         metadata: {
//           approvalId: ap._id,
//           itemId: ap.itemId ?? "",
//           amount: ap.amount ?? 0,
//         },
//       });

//       if (requester?.email) {
//         await sendEmail(
//           requester.email,
//           `${ap.type} Approved`,
//           `<p>Your ${resourceType} <strong>${
//             ap.itemId ?? ""
//           }</strong> for <strong>Nle${(
//             ap.amount ?? 0
//           ).toLocaleString()}</strong> has been approved.</p>`,
//           `${process.env.NEXT_PUBLIC_APP_URL || ""}/${resourceType}s/${
//             ap.itemId ?? ""
//           }`,
//           "View Details"
//         );
//       }
//     }

//     revalidatePath("/approvals");

//     return { success: true, count: ids.length };
//   } catch (error) {
//     console.error("Error bulk approving:", error);
//     return { success: false, error: "Failed to bulk approve" };
//   }
// }

"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { createNotification } from "../actions/notification-actions";
import { Approval } from "../models/Approval";
import { Requisition } from "../models/Requisition";
import { PurchaseOrder } from "../models/PurchaseOrder";
import { sendEmail } from "./admin-approval-actions";

type ApprovalTableRow = {
  _id: string;
  type: "Approval" | "Requisition" | "Purchase Order";
  itemId: string;
  requester: string;
  status: string;
  amount: number;
  createdAt: string | Date;
};

// Helper to check if user has approval permissions
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
      if (mongoose.Types.ObjectId.isValid(approval.itemId)) {
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
      if (mongoose.Types.ObjectId.isValid(approval.itemId)) {
        po = await PurchaseOrder.findById(approval.itemId).lean();
      }
      if (!po) {
        po = await PurchaseOrder.findOne({ poNumber: approval.itemId }).lean();
      }

      if (po) {
        if (po.linkedRequisition) {
          let req: any = null;
          if (mongoose.Types.ObjectId.isValid(po.linkedRequisition)) {
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

// Get all approvals with related requisitions and purchase orders
export async function getApprovalsWithDetails() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error, data: [] };
    }

    await dbConnect();

    const [approvals, requisitions, purchaseOrders] = await Promise.all([
      Approval.find({}).sort({ createdAt: -1 }).limit(50).lean(),
      Requisition.find({}).sort({ createdAt: -1 }).lean(),
      PurchaseOrder.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    // ✅ SAFETY
    const safeApprovals = Array.isArray(approvals) ? approvals : [];
    const safeReqs = Array.isArray(requisitions) ? requisitions : [];
    const safePOs = Array.isArray(purchaseOrders) ? purchaseOrders : [];

    // ✅ MAP TO TABLE ROWS
    const approvalRows: ApprovalTableRow[] = safeApprovals.map((a: any) => ({
      _id: String(a._id),
      type: a.type || "Approval",
      itemId: a.itemId,
      requester: a.requester || "N/A",
      status: a.status,
      amount: Number(a.amount || 0),
      createdAt: a.createdAt,
    }));

    const requisitionRows: ApprovalTableRow[] = safeReqs.map((r: any) => ({
      _id: String(r._id),
      type: "Requisition",
      itemId: r.requisitionId,
      requester: r.requester || r.createdBy || "N/A",
      status: r.status,
      amount: Number(r.amount || 0),
      createdAt: r.createdAt,
    }));

    const purchaseOrderRows: ApprovalTableRow[] = safePOs.map((po: any) => ({
      _id: String(po._id),
      type: "Purchase Order",
      itemId: po.poNumber,
      requester: po.supplier || "N/A",
      status: po.status,
      amount: Number(po.total || 0),
      createdAt: po.createdAt || po.keyDates?.requestedDelivery || new Date(),
    }));

    const allRows = [...approvalRows, ...requisitionRows, ...purchaseOrderRows];

    return {
      success: true,
      data: allRows,
    };
  } catch (error) {
    console.error("Error fetching approvals with details:", error);
    return {
      success: false,
      error: "Failed to fetch approvals",
      data: [],
    };
  }
}

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

export async function approveRequest(id: string, comments?: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Check approval permission
    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    await dbConnect();

    const approval = await Approval.findByIdAndUpdate(
      id,
      {
        status: "approved",
        approvedAt: new Date(),
        approvedBy: userId,
      },
      { new: true }
    );

    if (!approval) {
      return { success: false, error: "Approval not found" };
    }

    // Add comment if provided
    if (comments) {
      await Approval.findByIdAndUpdate(id, {
        $push: {
          comments: { author: userId, text: comments, date: new Date() },
        },
      });
    }

    // Add timeline event
    await Approval.findByIdAndUpdate(id, {
      $push: {
        timeline: {
          event: "Approved",
          timestamp: new Date(),
          actor: userId,
          details: comments || "Request approved",
        },
      },
    });

    const ap = approval as any;
    const resourceType = ap.type ? ap.type.toLowerCase() : "request";

    // Get requester info and send notification
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

    // Send email
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

    revalidatePath("/approvals");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approval)),
    };
  } catch (error) {
    console.error("Error approving request:", error);
    return { success: false, error: "Failed to approve request" };
  }
}

export async function rejectRequest(id: string, comments: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Check approval permission
    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    if (!comments || !comments.trim()) {
      return { success: false, error: "Rejection reason is required" };
    }

    await dbConnect();

    const approval = await Approval.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    ).lean();

    if (!approval) {
      return { success: false, error: "Approval not found" };
    }

    const ap = approval as any;
    const resourceType = ap.type ? ap.type.toLowerCase() : "request";

    // Get requester info and send notification
    const requester = await getRequesterInfo(ap);
    const targetUserId = requester?.userId || "REQUESTER_USER_ID";

    await createNotification({
      userId: targetUserId,
      type: "approval_pending",
      title: `${ap.type} Rejected`,
      message: `Your ${resourceType} ${
        ap.itemId ?? ""
      } has been rejected. ${comments}`,
      actionUrl: `/${resourceType}s/${ap.itemId ?? ""}`,
      priority: "high",
      metadata: {
        approvalId: ap._id,
        itemId: ap.itemId ?? "",
        amount: ap.amount ?? 0,
        rejectionReason: comments,
      },
    });

    // Send email
    if (requester?.email) {
      await sendEmail(
        requester.email,
        `${ap.type} Rejected`,
        `<p>Your ${resourceType} <strong>${
          ap.itemId ?? ""
        }</strong> has been rejected.</p><p><strong>Reason:</strong> ${comments}</p>`,
        `${process.env.NEXT_PUBLIC_APP_URL || ""}/${resourceType}s/${
          ap.itemId ?? ""
        }`,
        "View Details"
      );
    }

    revalidatePath("/approvals");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approval)),
    };
  } catch (error) {
    console.error("Error rejecting request:", error);
    return { success: false, error: "Failed to reject request" };
  }
}

export async function requestChanges(id: string, comments: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Check approval permission
    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    if (!comments || !comments.trim()) {
      return { success: false, error: "Change details are required" };
    }

    await dbConnect();

    const approval = await Approval.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    ).lean();

    if (!approval) {
      return { success: false, error: "Approval not found" };
    }

    const ap = approval as any;
    const resourceType = ap.type ? ap.type.toLowerCase() : "request";

    // Get requester info and send notification
    const requester = await getRequesterInfo(ap);
    const targetUserId = requester?.userId || "REQUESTER_USER_ID";

    await createNotification({
      userId: targetUserId,
      type: "approval_pending",
      title: "Changes Requested",
      message: `Changes requested for ${resourceType} ${
        ap.itemId ?? ""
      }. ${comments}`,
      actionUrl: `/${resourceType}s/${ap.itemId ?? ""}`,
      priority: "medium",
      metadata: {
        approvalId: ap._id,
        itemId: ap.itemId ?? "",
        changeComments: comments,
      },
    });

    // Send email
    if (requester?.email) {
      await sendEmail(
        requester.email,
        "Changes Requested",
        `<p>Changes have been requested for your ${resourceType} <strong>${
          ap.itemId ?? ""
        }</strong>.</p><p><strong>Details:</strong> ${comments}</p>`,
        `${process.env.NEXT_PUBLIC_APP_URL || ""}/${resourceType}s/${
          ap.itemId ?? ""
        }`,
        "View Details"
      );
    }

    revalidatePath("/approvals");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approval)),
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

    // Check approval permission
    const permissionCheck = await canApprove(userId);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    await dbConnect();

    const now = new Date();
    await Approval.updateMany(
      { _id: { $in: ids } },
      {
        $set: { status: "approved", approvedAt: now, approvedBy: userId },
        $push: {
          timeline: {
            event: "Bulk Approved",
            timestamp: now,
            actor: userId,
            details: comments || "Bulk approval",
          },
        },
      }
    );

    if (comments) {
      await Approval.updateMany(
        { _id: { $in: ids } },
        { $push: { comments: { author: userId, text: comments, date: now } } }
      );
    }

    // Send notifications and emails for each approved item
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
