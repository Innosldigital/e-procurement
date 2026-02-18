"use server";

import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { Notification } from "../models/Notification";
import { revalidatePath } from "next/cache";

// Helper function to add timeout to database operations
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 15000,
  errorMessage: string = "Operation timed out"
): Promise<T> {
  let timeoutHandle: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(
      () => reject(new Error(errorMessage)),
      timeoutMs
    );
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutHandle!);
    return result;
  } catch (error) {
    clearTimeout(timeoutHandle!);
    throw error;
  }
}

function isSoftFail(e: any): boolean {
  const msg = String(e?.message || "").toLowerCase();
  return (
    msg.includes("timed out") ||
    msg.includes("timeout") ||
    msg.includes("fetch failed") ||
    msg.includes("connect timeout") ||
    msg.includes("und_err_connect_timeout")
  );
}

export async function getNotifications(limit = 20) {
  try {
    let userId: string | null = null;
    try {
      const authRes = await auth();
      userId = String(authRes?.userId || "") || null;
    } catch (e: any) {
      if (isSoftFail(e)) {
        console.warn(
          "getNotifications: auth soft-failed, returning empty list"
        );
        return { success: true, data: [] };
      }
      console.error("getNotifications: auth error:", e);
      return { success: false, error: e?.message || "Unauthorized", data: [] };
    }

    if (!userId) {
      console.warn("getNotifications: No userId - unauthorized");
      return {
        success: false,
        error: "Unauthorized",
        data: [],
      };
    }

    await connectDB();

    const notificationsPromise = Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .maxTimeMS(10000)
      .lean()
      .exec();

    const notifications = await withTimeout(
      notificationsPromise,
      12000,
      "Notification query timed out"
    );

    console.log(
      `Found ${notifications.length} notifications for userId: ${userId}`
    );

    // Log each notification
    notifications.forEach((n: any, i: number) => {
      console.log(`  ${i + 1}. ${n.type} - ${n.title} (read: ${n.read})`);
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notifications)),
    };
  } catch (error: any) {
    if (isSoftFail(error)) {
      console.warn("getNotifications soft-failed, returning empty list");
      return { success: true, data: [] };
    } else {
      console.error("❌ getNotifications error:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch notifications",
        data: [],
      };
    }
  }
}

export async function getNotificationsPublic(limit = 20) {
  try {
    await connectDB();

    const notificationsPromise = Notification.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .maxTimeMS(10000)
      .lean()
      .exec();

    const notifications = await withTimeout(
      notificationsPromise,
      12000,
      "Notification query timed out"
    );

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notifications)),
    };
  } catch (error: any) {
    if (isSoftFail(error)) {
      console.warn("getNotificationsPublic soft-failed, returning empty list");
      return { success: true, data: [] };
    } else {
      console.error("❌ getNotificationsPublic error:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch notifications",
        data: [],
      };
    }
  }
}

export async function getUnreadCount() {
  try {
    let userId: string | null = null;
    try {
      const authRes = await auth();
      userId = String(authRes?.userId || "") || null;
    } catch (e: any) {
      if (isSoftFail(e)) {
        console.warn("getUnreadCount: auth soft-failed, returning 0");
        return { success: true, count: 0 };
      }
      console.error("getUnreadCount: auth error:", e);
      return { success: false, error: e?.message || "Unauthorized", count: 0 };
    }
    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
        count: 0,
      };
    }

    await connectDB();

    const countPromise = Notification.countDocuments({
      userId,
      read: false,
    })
      .maxTimeMS(8000)
      .exec();

    const count = await withTimeout(
      countPromise,
      10000,
      "Count query timed out"
    );

    return {
      success: true,
      count,
    };
  } catch (error: any) {
    if (isSoftFail(error)) {
      console.warn("getUnreadCount soft-failed, returning 0");
      return { success: true, count: 0 };
    } else {
      console.error("❌ getUnreadCount error:", error);
      return {
        success: false,
        error: error.message || "Failed to get unread count",
        count: 0,
      };
    }
  }
}

export async function markAsRead(notificationId: string) {
  try {
    let userId: string | null = null;
    try {
      const authRes = await auth();
      userId = String(authRes?.userId || "") || null;
    } catch (e: any) {
      if (isSoftFail(e)) {
        console.warn("markAsRead: auth soft-failed, ignoring");
        return { success: false, error: "Unauthorized" };
      }
      console.error("markAsRead: auth error:", e);
      return { success: false, error: e?.message || "Unauthorized" };
    }
    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await connectDB();

    const updatePromise = Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { read: true }
    )
      .maxTimeMS(8000)
      .exec();

    await withTimeout(updatePromise, 10000, "Mark as read timed out");

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: any) {
    if (isSoftFail(error)) {
      console.warn("markAsRead soft-failed");
      return { success: false, error: "Timed out" };
    } else {
      console.error("❌ markAsRead error:", error);
      return {
        success: false,
        error: error.message || "Failed to mark as read",
      };
    }
  }
}

export async function markAllAsRead() {
  try {
    let userId: string | null = null;
    try {
      const authRes = await auth();
      userId = String(authRes?.userId || "") || null;
    } catch (e: any) {
      if (isSoftFail(e)) {
        console.warn("markAllAsRead: auth soft-failed, ignoring");
        return { success: false, error: "Unauthorized" };
      }
      console.error("markAllAsRead: auth error:", e);
      return { success: false, error: e?.message || "Unauthorized" };
    }
    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await connectDB();

    const updatePromise = Notification.updateMany(
      { userId, read: false },
      { read: true }
    )
      .maxTimeMS(8000)
      .exec();

    await withTimeout(updatePromise, 10000, "Mark all as read timed out");

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: any) {
    if (isSoftFail(error)) {
      console.warn("markAllAsRead soft-failed");
      return { success: false, error: "Timed out" };
    } else {
      console.error("❌ markAllAsRead error:", error);
      return {
        success: false,
        error: error.message || "Failed to mark all as read",
      };
    }
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    let userId: string | null = null;
    try {
      const authRes = await auth();
      userId = String(authRes?.userId || "") || null;
    } catch (e: any) {
      if (isSoftFail(e)) {
        console.warn("deleteNotification: auth soft-failed, ignoring");
        return { success: false, error: "Unauthorized" };
      }
      console.error("deleteNotification: auth error:", e);
      return { success: false, error: e?.message || "Unauthorized" };
    }
    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await connectDB();

    const deletePromise = Notification.findOneAndDelete({
      _id: notificationId,
      userId,
    })
      .maxTimeMS(8000)
      .exec();

    await withTimeout(deletePromise, 10000, "Delete notification timed out");

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: any) {
    if (isSoftFail(error)) {
      console.warn("deleteNotification soft-failed");
      return { success: false, error: "Timed out" };
    } else {
      console.error("❌ deleteNotification error:", error);
      return {
        success: false,
        error: error.message || "Failed to delete notification",
      };
    }
  }
}

export async function createNotification(data: {
  userId: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  metadata?: any;
  expiresAt?: Date;
}) {
  try {
    await connectDB();

    const createPromise = Notification.create(data);

    const notification = await withTimeout(
      createPromise,
      10000,
      "Create notification timed out"
    );

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notification)),
    };
  } catch (error: any) {
    if (isSoftFail(error)) {
      console.warn("createNotification soft-failed");
      return { success: false, error: "Timed out" };
    } else {
      console.error("❌ createNotification error:", error);
      return {
        success: false,
        error: error.message || "Failed to create notification",
      };
    }
  }
}
