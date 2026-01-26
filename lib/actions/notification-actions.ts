// "use server";

// import { auth } from "@clerk/nextjs/server";
// import dbConnect from "@/lib/mongodb";
// import { Notification } from "../models/Notification";
// import { revalidatePath } from "next/cache";

// export async function getNotifications(limit = 20) {
//   try {
//     const { userId } = await auth();

//     // console.log("=== getNotifications SERVER ===");
//     // console.log("Authenticated userId:", userId);

//     if (!userId) {
//       // console.error("No userId - unauthorized");
//       throw new Error("Unauthorized");
//     }

//     await dbConnect();

//     const notifications = await Notification.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .lean();

//     console.log(
//       `Found ${notifications.length} notifications for userId: ${userId}`
//     );

//     // Log each notification
//     notifications.forEach((n: any, i: number) => {
//       console.log(`  ${i + 1}. ${n.type} - ${n.title} (read: ${n.read})`);
//     });

//     // console.log("================================");

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(notifications)),
//     };
//   } catch (error: any) {
//     // console.error("getNotifications error:", error);
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

// export async function getNotificationsPublic(limit = 20) {
//   try {
//     await dbConnect();
//     const notifications = await Notification.find({})
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .lean();

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(notifications)),
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: "Failed to fetch notifications",
//     };
//   }
// }

// export async function getUnreadCount() {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     await dbConnect();

//     const count = await Notification.countDocuments({
//       userId,
//       read: false,
//     });

//     return {
//       success: true,
//       count,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message,
//       count: 0,
//     };
//   }
// }

// export async function markAsRead(notificationId: string) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     await dbConnect();

//     await Notification.findOneAndUpdate(
//       { _id: notificationId, userId },
//       { read: true }
//     );

//     revalidatePath("/", "layout");

//     return { success: true };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

// export async function markAllAsRead() {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     await dbConnect();

//     await Notification.updateMany({ userId, read: false }, { read: true });

//     revalidatePath("/", "layout");

//     return { success: true };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

// export async function deleteNotification(notificationId: string) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     await dbConnect();

//     await Notification.findOneAndDelete({
//       _id: notificationId,
//       userId,
//     });

//     revalidatePath("/", "layout");

//     return { success: true };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

// export async function createNotification(data: {
//   userId: string;
//   type: string;
//   title: string;
//   message: string;
//   actionUrl?: string;
//   priority?: "low" | "medium" | "high" | "urgent";
//   metadata?: any;
//   expiresAt?: Date;
// }) {
//   try {
//     await dbConnect();

//     const notification = await Notification.create(data);

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(notification)),
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

"use server";

import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { Notification } from "../models/Notification";
import { revalidatePath } from "next/cache";

// Helper function to add timeout to database operations
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 20000,
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

export async function getNotifications(limit = 20) {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.error("No userId - unauthorized");
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
      .maxTimeMS(15000) // Query-level timeout
      .lean()
      .exec();

    const notifications = await withTimeout(
      notificationsPromise,
      20000,
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
    console.error("❌ getNotifications error:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch notifications",
      data: [],
    };
  }
}

export async function getNotificationsPublic(limit = 20) {
  try {
    await connectDB();

    const notificationsPromise = Notification.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .maxTimeMS(15000)
      .lean()
      .exec();

    const notifications = await withTimeout(
      notificationsPromise,
      20000,
      "Notification query timed out"
    );

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notifications)),
    };
  } catch (error: any) {
    console.error("❌ getNotificationsPublic error:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch notifications",
      data: [],
    };
  }
}

export async function getUnreadCount() {
  try {
    const { userId } = await auth();
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
      .maxTimeMS(10000)
      .exec();

    const count = await withTimeout(
      countPromise,
      15000,
      "Count query timed out"
    );

    return {
      success: true,
      count,
    };
  } catch (error: any) {
    console.error("❌ getUnreadCount error:", error);
    return {
      success: false,
      error: error.message || "Failed to get unread count",
      count: 0,
    };
  }
}

export async function markAsRead(notificationId: string) {
  try {
    const { userId } = await auth();
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
      .maxTimeMS(10000)
      .exec();

    await withTimeout(updatePromise, 15000, "Mark as read timed out");

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: any) {
    console.error("❌ markAsRead error:", error);
    return {
      success: false,
      error: error.message || "Failed to mark as read",
    };
  }
}

export async function markAllAsRead() {
  try {
    const { userId } = await auth();
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
      .maxTimeMS(10000)
      .exec();

    await withTimeout(updatePromise, 15000, "Mark all as read timed out");

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: any) {
    console.error("❌ markAllAsRead error:", error);
    return {
      success: false,
      error: error.message || "Failed to mark all as read",
    };
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const { userId } = await auth();
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
      .maxTimeMS(10000)
      .exec();

    await withTimeout(deletePromise, 15000, "Delete notification timed out");

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: any) {
    console.error("❌ deleteNotification error:", error);
    return {
      success: false,
      error: error.message || "Failed to delete notification",
    };
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
      15000,
      "Create notification timed out"
    );

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notification)),
    };
  } catch (error: any) {
    console.error("❌ createNotification error:", error);
    return {
      success: false,
      error: error.message || "Failed to create notification",
    };
  }
}
