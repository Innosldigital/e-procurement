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

async function getRequesterInfo(approval: any) {
  try {
    let userId = "";
    if (approval.type === "Requisition") {
      let req: any = null;
      if (mongoose.Types.ObjectId.isValid(approval.itemId)) {
        req = await Requisition.findById(approval.itemId).lean();
      }
      // If not found or invalid ID, try by requisitionId
      if (!req) {
        req = await Requisition.findOne({
          requisitionId: approval.itemId,
        }).lean();
      }
      if (req) userId = req.createdBy || "";
    } else if (approval.type === "Purchase Order") {
      let po: any = null;
      // Try finding by _id
      if (mongoose.Types.ObjectId.isValid(approval.itemId)) {
        po = await PurchaseOrder.findById(approval.itemId).lean();
      }
      if (!po) {
        po = await PurchaseOrder.findOne({ poNumber: approval.itemId }).lean();
      }

      if (po) {
        // Try to find linked requisition to get createdBy
        if (po.linkedRequisition) {
          let req: any = null;
          // Try finding by _id (linkedRequisition might be ID or String ID)
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
        // Fallback: if PO has a requester field that happens to be a userId (unlikely but possible)
        if (!userId && po.requester && !po.requester.includes(" ")) {
          // Heuristic: if no spaces, might be an ID?
          // userId = po.requester;
        }
      }
    }

    if (!userId) return null;

    const client: any = await clerkClient();
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

export async function getApprovals() {
  try {
    await dbConnect();
    const approvals = await Approval.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approvals)),
    };
  } catch (error) {
    console.error("[v0] Error fetching approvals:", error);
    return { success: false, error: "Failed to fetch approvals" };
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

    await dbConnect();

    const updated = await Approval.findByIdAndUpdate(
      id,
      {
        status: "approved",
        approvedAt: new Date(),
        approvedBy: userId,
      },
      { new: true }
    );
    let approval = updated?.toObject();
    if (comments && updated) {
      approval = await Approval.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: { author: userId, text: comments, date: new Date() },
          },
        },
        { new: true }
      ).lean();
    } else {
      approval = approval as any;
    }

    if (!approval) {
      return { success: false, error: "Approval not found" };
    }

    const ap = approval as {
      _id: string;
      type?: string;
      itemId?: string;
      amount?: number;
    };
    const resourceType = ap.type ? ap.type.toLowerCase() : "request";

    // Get requester info
    const requester = await getRequesterInfo(ap);
    const targetUserId = requester?.userId || "REQUESTER_USER_ID";

    await createNotification({
      userId: targetUserId,
      type: "approval_pending",
      title: `${resourceType} Approved`,
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
        `${resourceType} Approved`,
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
    console.error("[v0] Error approving request:", error);
    return { success: false, error: "Failed to approve request" };
  }
}

export async function rejectRequest(id: string, comments: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const updated = await Approval.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        rejectedAt: new Date(),
        rejectedBy: userId,
      },
      { new: true }
    );
    const approval = await Approval.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: { author: userId, text: comments, date: new Date() },
        },
      },
      { new: true }
    ).lean();

    if (!approval) {
      return { success: false, error: "Approval not found" };
    }

    {
      const ap = approval as {
        _id: string;
        type?: string;
        itemId?: string;
        amount?: number;
      };
      const resourceType = ap.type ? ap.type.toLowerCase() : "request";
      await createNotification({
        userId: "REQUESTER_USER_ID",
        type: "approval_pending",
        title: `${ap.type ?? "Request"} Rejected`,
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
    }

    revalidatePath("/approvals");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approval)),
    };
  } catch (error) {
    console.error("[v0] Error rejecting request:", error);
    return { success: false, error: "Failed to reject request" };
  }
}

export async function requestChanges(id: string, comments: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const updated = await Approval.findByIdAndUpdate(
      id,
      {
        status: "changes_requested",
        requestedBy: userId,
      },
      { new: true }
    );
    const approval = await Approval.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: { author: userId, text: comments, date: new Date() },
        },
      },
      { new: true }
    ).lean();

    if (!approval) {
      return { success: false, error: "Approval not found" };
    }

    {
      const ap = approval as { _id: string; type?: string; itemId?: string };
      const resourceType = ap.type ? ap.type.toLowerCase() : "request";
      await createNotification({
        userId: "REQUESTER_USER_ID",
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
    }

    revalidatePath("/approvals");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(approval)),
    };
  } catch (error) {
    console.error("[v0] Error requesting changes:", error);
    return { success: false, error: "Failed to request changes" };
  }
}

export async function bulkApprove(ids: string[], comments?: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    const now = new Date();
    await Approval.updateMany(
      { _id: { $in: ids } },
      { $set: { status: "approved", approvedAt: now, approvedBy: userId } }
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
        title: `${resourceType} Approved`,
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
          `${resourceType} Approved`,
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
    console.error("[v0] Error bulk approving:", error);
    return { success: false, error: "Failed to bulk approve" };
  }
}
