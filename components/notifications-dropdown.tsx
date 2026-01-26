"use client";

import { useState, useEffect } from "react";
import { Bell, Check, CheckCheck, Trash2, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "@/lib/actions/notification-actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Notification {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string;
  priority: "low" | "medium" | "high" | "urgent";
  read: boolean;
  createdAt: string;
}

export function NotificationsDropdown() {
  const router = useRouter();
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshEnabled, setRefreshEnabled] = useState(true);
  const saveCache = (items: Notification[], unread: number) => {
    try {
      const payload = { items, unread, ts: Date.now() };
      localStorage.setItem("notif_cache", JSON.stringify(payload));
    } catch {}
  };
  const readCache = (): { items: Notification[]; unread: number } => {
    try {
      const raw = localStorage.getItem("notif_cache") || "";
      if (!raw) return { items: [], unread: 0 };
      const parsed = JSON.parse(raw);
      const items = Array.isArray(parsed?.items) ? parsed.items : [];
      const unread = Number(parsed?.unread || 0);
      return { items, unread };
    } catch {
      return { items: [], unread: 0 };
    }
  };

  // const loadNotifications = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   // DEBUG LOGGING
  //   console.log("=== NOTIFICATION DROPDOWN DEBUG ===");
  //   console.log("Current user ID:", user?.id);
  //   console.log("Current user email:", user?.emailAddresses?.[0]?.emailAddress);
  //   console.log("Timestamp:", new Date().toISOString());

  //   try {
  //     const [notifResult, countResult] = await Promise.all([
  //       getNotifications(20).catch((err) => {
  //         console.error("getNotifications error:", err);
  //         return { success: false, error: "Failed to fetch notifications" };
  //       }),
  //       getUnreadCount().catch((err) => {
  //         console.error("getUnreadCount error:", err);
  //         return { success: false, count: 0 };
  //       }),
  //     ]);

  //     // DEBUG LOGGING FOR RESULTS
  //     console.log("Notification result:", notifResult);
  //     console.log("Unread count result:", countResult);

  //     if (notifResult.success) {
  //       const notifs = (notifResult as any).data || [];
  //       setNotifications(notifs);
  //       setTotalCount(notifs.length);

  //       // DEBUG LOGGING FOR EACH NOTIFICATION
  //       console.log(`Found ${notifs.length} notifications:`);
  //       if (notifs.length === 0) {
  //         console.warn("⚠️ No notifications found for this user!");
  //       } else {
  //         notifs.forEach((n: any, i: number) => {
  //           console.log(`  ${i + 1}. Type: ${n.type}`);
  //           console.log(`     Title: ${n.title}`);
  //           console.log(`     For userId: ${n.userId}`);
  //           console.log(`     Read: ${n.read}`);
  //           console.log(`     Created: ${n.createdAt}`);
  //         });
  //       }

  //       // Check for tender notifications specifically
  //       const tenderNotifs = notifs.filter(
  //         (n: any) => n.type === "tender_published"
  //       );
  //       console.log(`Tender notifications: ${tenderNotifs.length}`);
  //     } else {
  //       setNotifications([]);
  //       setTotalCount(0);
  //       setError((notifResult as any).error || "Failed to fetch notifications");
  //       console.error(
  //         "❌ Failed to fetch notifications:",
  //         (notifResult as any).error
  //       );
  //     }

  //     if (countResult.success) {
  //       setUnreadCount((countResult as any).count);
  //       console.log("Unread count from server:", (countResult as any).count);
  //     } else if (notifResult.success) {
  //       const unread = ((notifResult as any).data || []).filter(
  //         (n: any) => !n.read
  //       ).length;
  //       setUnreadCount(unread);
  //       console.log("Unread count calculated:", unread);
  //     } else {
  //       setUnreadCount(0);
  //       console.log("Unread count set to 0");
  //     }

  //     console.log("Final state - Total:", totalCount, "Unread:", unreadCount);
  //     console.log("===================================");
  //   } catch (e) {
  //     console.error("❌ Exception loading notifications:", e);
  //     setNotifications([]);
  //     setTotalCount(0);
  //     setUnreadCount(0);
  //     setError("Failed to fetch notifications");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const loadNotifications = async () => {
    if (!refreshEnabled) return;
    setIsLoading(true);
    setError(null);

    console.log("=== NOTIFICATION DROPDOWN DEBUG ===");
    console.log("Current user ID:", user?.id);
    console.log("Timestamp:", new Date().toISOString());

    if (!user?.id) {
      setNotifications([]);
      setTotalCount(0);
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }

    try {
      const [notifResult, countResult] = await Promise.allSettled([
        getNotifications(20),
        getUnreadCount(),
      ]);

      console.log("Notification result:", notifResult);
      console.log("Unread count result:", countResult);

      // Handle notifications result
      if (notifResult.status === "fulfilled" && notifResult.value.success) {
        const notifs = notifResult.value.data || [];
        setNotifications(notifs);
        setTotalCount(notifs.length);
        const unreadDerived = (notifs || []).filter((n: any) => !n.read).length;
        saveCache(notifs, unreadDerived);

        console.log(`Found ${notifs.length} notifications:`);
        if (notifs.length === 0) {
          console.warn("⚠️ No notifications found for this user!");
        } else {
          notifs.forEach((n: any, i: number) => {
            console.log(`  ${i + 1}. Type: ${n.type}, Title: ${n.title}`);
          });
        }
      } else {
        setNotifications([]);
        setTotalCount(0);
        const errorMsg =
          notifResult.status === "fulfilled"
            ? notifResult.value.error
            : notifResult.reason?.message || "Network error";
        const isUnauthorized =
          typeof errorMsg === "string" &&
          errorMsg.toLowerCase().includes("unauthorized");
        if (isUnauthorized) {
          setUnreadCount(0);
          setError(null);
        } else {
          const msg = String(errorMsg || "").toLowerCase();
          const isTimeout =
            msg.includes("etimedout") ||
            msg.includes("timeout") ||
            msg.includes("timed out");
          if (isTimeout) {
            const cached = readCache();
            if (cached.items.length > 0) {
              setNotifications(cached.items);
              setTotalCount(cached.items.length);
              setUnreadCount(cached.unread);
            } else {
              setNotifications([]);
              setTotalCount(0);
              setUnreadCount(0);
            }
            setError("Notifications temporarily unavailable. Retrying soon.");
            setRefreshEnabled(false);
            setTimeout(() => setRefreshEnabled(true), 120000);
            console.warn("Notifications fetch timed out");
          } else {
            setError(errorMsg);
          }
        }
        console.warn("Failed to fetch notifications");
      }

      // Handle unread count result
      if (countResult.status === "fulfilled" && countResult.value.success) {
        setUnreadCount(countResult.value.count);
        console.log("Unread count from server:", countResult.value.count);
      } else if (
        notifResult.status === "fulfilled" &&
        notifResult.value.success
      ) {
        const unread = (notifResult.value.data || []).filter(
          (n: any) => !n.read
        ).length;
        setUnreadCount(unread);
        console.log("Unread count calculated:", unread);
      } else {
        setUnreadCount(0);
      }

      console.log("===================================");
    } catch (e) {
      const cached = readCache();
      if (cached.items.length > 0) {
        setNotifications(cached.items);
        setTotalCount(cached.items.length);
        setUnreadCount(cached.unread);
      } else {
        setNotifications([]);
        setTotalCount(0);
        setUnreadCount(0);
      }
      setRefreshEnabled(false);
      setTimeout(() => setRefreshEnabled(true), 120000);
      setError("Network error - retrying soon");
      console.warn("Notifications load exception");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    console.log("NotificationsDropdown mounted");
    loadNotifications();

    const interval = setInterval(() => {
      console.log("Auto-refreshing notifications...");
      if (refreshEnabled) loadNotifications();
    }, 30000);

    return () => {
      console.log("NotificationsDropdown unmounted");
      clearInterval(interval);
    };
  }, [user?.id, refreshEnabled]);

  const handleMarkAsRead = async (notificationId: string) => {
    console.log("Marking as read:", notificationId);
    await markAsRead(notificationId);
    await loadNotifications();
  };

  const handleMarkAllAsRead = async () => {
    console.log("Marking all as read");
    await markAllAsRead();
    await loadNotifications();
  };

  const handleDelete = async (notificationId: string) => {
    console.log("Deleting notification:", notificationId);
    await deleteNotification(notificationId);
    await loadNotifications();
  };

  const handleNotificationClick = async (notification: Notification) => {
    console.log("Notification clicked:", notification.title);

    if (!notification.read) {
      await handleMarkAsRead(notification._id);
    }

    if (notification.actionUrl) {
      setIsOpen(false);
      router.push(notification.actionUrl);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-blue-500";
      case "low":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "tender_published":
        return "📢";
      case "tender_response":
        return "📝";
      case "requisition_approved":
        return "✅";
      case "requisition_rejected":
        return "❌";
      case "po_issued":
        return "📋";
      case "invoice_overdue":
        return "⚠️";
      case "contract_expiring":
        return "⏰";
      case "supplier_update":
        return "🔔";
      default:
        return "📬";
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now.getTime() - notifDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return notifDate.toLocaleDateString();
  };

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => {
        console.log("Dropdown state changed:", open ? "opened" : "closed");
        setIsOpen(open);
        if (open) {
          console.log("Dropdown opened - refreshing notifications");
          loadNotifications();
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive hover:bg-destructive">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[calc(100vw-2rem)] sm:w-[400px] p-0"
        sideOffset={8}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-3 sm:px-4 py-3 border-b">
          <div>
            <h3 className="font-semibold text-sm">Notifications</h3>
            <p className="text-xs text-muted-foreground">
              {totalCount} total
              {unreadCount > 0 ? ` • ${unreadCount} unread` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Manual Refresh Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Manual refresh clicked");
                loadNotifications();
              }}
              disabled={isLoading}
              className="h-7 sm:h-8 text-xs"
            >
              <RefreshCw
                className={cn("w-3 h-3 mr-1", isLoading && "animate-spin")}
              />
              <span className="hidden xs:inline">Refresh</span>
            </Button>

            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkAllAsRead();
                }}
                className="h-7 sm:h-8 text-xs flex-1 sm:flex-none"
              >
                <CheckCheck className="w-3 h-3 mr-1" />
                <span className="hidden xs:inline">Mark all read</span>
                <span className="xs:hidden">Mark all</span>
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[300px] overflow-auto">
          {isLoading ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              <RefreshCw className="w-4 h-4 mx-auto mb-2 animate-spin" />
              Loading notifications...
            </div>
          ) : error ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-destructive mb-2">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadNotifications()}
              >
                Try Again
              </Button>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className="px-3 sm:px-4 py-3 flex items-start gap-3 cursor-pointer hover:bg-accent border-b last:border-b-0"
              >
                <div className="shrink-0 mt-0.5">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      getPriorityColor(notification.priority)
                    )}
                  />
                </div>

                <div className="flex flex-col flex-1 min-w-0 gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm shrink-0">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <span
                        className={cn(
                          "text-sm truncate",
                          notification.read
                            ? "font-medium text-muted-foreground"
                            : "font-semibold text-foreground"
                        )}
                      >
                        {notification.title}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 shrink-0",
                        notification.read
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {notification.read ? "Read" : "Unread"}
                    </Badge>
                  </div>

                  {notification.message && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification.createdAt)}
                    </span>
                    {notification.actionUrl && (
                      <span className="text-xs text-primary">View →</span>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notification._id);
                  }}
                  className="w-6 h-6 p-0 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <Bell className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground mb-1">
                No notifications
              </p>
              <p className="text-xs text-muted-foreground">
                You're all caught up!
              </p>
            </div>
          )}
        </div>

        {/* Debug Info (Remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="border-t px-3 py-2 bg-muted/50">
            <p className="text-[10px] text-muted-foreground">
              Debug: User ID: {user?.id?.slice(-8) || "N/A"}
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
