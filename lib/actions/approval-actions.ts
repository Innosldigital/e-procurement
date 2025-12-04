"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { createNotification } from "../actions/notification-actions";
import { Approval } from "../models/Approval";

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

    await createNotification({
      userId: "REQUESTER_USER_ID",
      type: "approval_pending",
      title: `${resourceType} Approved`,
      message: `Your ${resourceType} ${ap.itemId ?? ""} for $${(
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

    revalidatePath("/approvals");

    return { success: true, count: ids.length };
  } catch (error) {
    console.error("[v0] Error bulk approving:", error);
    return { success: false, error: "Failed to bulk approve" };
  }
}
