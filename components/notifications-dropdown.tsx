// "use client"

// import { useState, useEffect } from 'react'
// import { Bell, Check, CheckCheck, Trash2, X } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import {
//   getNotifications,
//   getUnreadCount,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification
// } from '@/lib/actions/notification-actions'
// import { useRouter } from 'next/navigation'
// import { cn } from '@/lib/utils'

// interface Notification {
//   _id: string
//   type: string
//   title: string
//   message: string
//   actionUrl?: string
//   priority: 'low' | 'medium' | 'high' | 'urgent'
//   read: boolean
//   createdAt: string
// }

// export function NotificationsDropdown() {
//   const router = useRouter()
//   const [notifications, setNotifications] = useState<Notification[]>([])
//   const [unreadCount, setUnreadCount] = useState(0)
//   const [totalCount, setTotalCount] = useState(0)
//   const [isOpen, setIsOpen] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const loadNotifications = async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const [notifResult, countResult] = await Promise.all([
//         getNotifications(20).catch(() => ({ success: false, error: 'Failed to fetch notifications' })),
//         getUnreadCount().catch(() => ({ success: false, count: 0 }))
//       ])

//       if (notifResult.success) {
//         setNotifications((notifResult as any).data || [])
//         setTotalCount(((notifResult as any).data || []).length)
//       } else {
//         setNotifications([])
//         setTotalCount(0)
//         setError((notifResult as any).error || 'Failed to fetch notifications')
//       }

//       if (countResult.success) {
//         setUnreadCount((countResult as any).count)
//       } else if (notifResult.success) {
//         setUnreadCount((((notifResult as any).data || []).filter((n: any) => !n.read)).length)
//       } else {
//         setUnreadCount(0)
//       }
//     } catch (e) {
//       setNotifications([])
//       setTotalCount(0)
//       setUnreadCount(0)
//       setError('Failed to fetch notifications')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     loadNotifications()
//     const interval = setInterval(loadNotifications, 30000)
//     return () => clearInterval(interval)
//   }, [])

//   const handleMarkAsRead = async (notificationId: string) => {
//     await markAsRead(notificationId)
//     await loadNotifications()
//   }

//   const handleMarkAllAsRead = async () => {
//     await markAllAsRead()
//     await loadNotifications()
//   }

//   const handleDelete = async (notificationId: string) => {
//     await deleteNotification(notificationId)
//     await loadNotifications()
//   }

//   const handleNotificationClick = async (notification: Notification) => {
//     if (!notification.read) {
//       await handleMarkAsRead(notification._id)
//     }

//     if (notification.actionUrl) {
//       setIsOpen(false)
//       router.push(notification.actionUrl)
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'urgent': return 'bg-red-500'
//       case 'high': return 'bg-orange-500'
//       case 'medium': return 'bg-blue-500'
//       case 'low': return 'bg-gray-500'
//       default: return 'bg-blue-500'
//     }
//   }

//   const getNotificationIcon = (type: string) => {
//     // You can customize icons based on notification type
//     return '📬'
//   }

//   const formatTimeAgo = (date: string) => {
//     const now = new Date()
//     const notifDate = new Date(date)
//     const diffMs = now.getTime() - notifDate.getTime()
//     const diffMins = Math.floor(diffMs / 60000)
//     const diffHours = Math.floor(diffMs / 3600000)
//     const diffDays = Math.floor(diffMs / 86400000)

//     if (diffMins < 1) return 'Just now'
//     if (diffMins < 60) return `${diffMins}m ago`
//     if (diffHours < 24) return `${diffHours}h ago`
//     if (diffDays < 7) return `${diffDays}d ago`
//     return notifDate.toLocaleDateString()
//   }

//   return (
//     <DropdownMenu open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (open) loadNotifications() }}>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="w-4 h-4" />
//           {unreadCount > 0 && (
//             <Badge
//               className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive hover:bg-destructive"
//             >
//               {unreadCount > 9 ? '9+' : unreadCount}
//             </Badge>
//           )}
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         align="end"
//         className="w-[calc(100vw-2rem)] sm:w-[400px] p-0"
//         sideOffset={8}
//       >
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-3 sm:px-4 py-3 border-b">
//           <div>
//             <h3 className="font-semibold text-sm">Notifications</h3>
//             <p className="text-xs text-muted-foreground">
//               {totalCount} total{unreadCount > 0 ? ` • ${unreadCount} unread` : ''}
//             </p>
//           </div>

//           {notifications.length > 0 && (
//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               {unreadCount > 0 && (
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={handleMarkAllAsRead}
//                   className="h-7 sm:h-8 text-xs flex-1 sm:flex-none"
//                 >
//                   <CheckCheck className="w-3 h-3 mr-1" />
//                   <span className="hidden xs:inline">Mark all read</span>
//                   <span className="xs:hidden">Mark all</span>
//                 </Button>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="max-h-[300px] overflow-auto">
//           {isLoading ? (
//             <div className="px-4 py-3 text-xs text-muted-foreground">Loading...</div>
//           ) : notifications.length > 0 ? (
//             notifications.map((notification) => (
//               <DropdownMenuItem
//                 key={notification._id}
//                 onClick={() => handleNotificationClick(notification)}
//                 className="px-3 sm:px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-accent"
//               >
//                 <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
//                 <div className="flex flex-col w-full">
//                   <div className="flex items-center justify-between">
//                     <span className={cn("text-sm", notification.read ? "font-medium text-muted-foreground" : "font-semibold")}>{notification.title}</span>
//                     <Badge
//                       variant="secondary"
//                       className={cn("text-[10px] px-1.5 py-0.5", notification.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary")}
//                     >
//                       {notification.read ? "Read" : "Unread"}
//                     </Badge>
//                   </div>
//                   <span className="text-xs text-muted-foreground">{formatTimeAgo(notification.createdAt)}</span>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={(e) => { e.stopPropagation(); handleDelete(notification._id) }}
//                   className="w-5 h-5 p-0"
//                 >
//                   <Trash2 className="w-3 h-3" />
//                 </Button>
//               </DropdownMenuItem>
//             ))
//           ) : (
//             <div className="px-4 py-3 text-xs text-muted-foreground">No notifications</div>
//           )}
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
"use client";

import { useState, useEffect } from "react";
import { Bell, Check, CheckCheck, Trash2, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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

  const loadNotifications = async () => {
    setIsLoading(true);
    setError(null);

    // DEBUG LOGGING
    console.log("=== NOTIFICATION DROPDOWN DEBUG ===");
    console.log("Current user ID:", user?.id);
    console.log("Current user email:", user?.emailAddresses?.[0]?.emailAddress);
    console.log("Timestamp:", new Date().toISOString());

    try {
      const [notifResult, countResult] = await Promise.all([
        getNotifications(20).catch((err) => {
          console.error("getNotifications error:", err);
          return { success: false, error: "Failed to fetch notifications" };
        }),
        getUnreadCount().catch((err) => {
          console.error("getUnreadCount error:", err);
          return { success: false, count: 0 };
        }),
      ]);

      // DEBUG LOGGING FOR RESULTS
      console.log("Notification result:", notifResult);
      console.log("Unread count result:", countResult);

      if (notifResult.success) {
        const notifs = (notifResult as any).data || [];
        setNotifications(notifs);
        setTotalCount(notifs.length);

        // DEBUG LOGGING FOR EACH NOTIFICATION
        console.log(`Found ${notifs.length} notifications:`);
        if (notifs.length === 0) {
          console.warn("⚠️ No notifications found for this user!");
        } else {
          notifs.forEach((n: any, i: number) => {
            console.log(`  ${i + 1}. Type: ${n.type}`);
            console.log(`     Title: ${n.title}`);
            console.log(`     For userId: ${n.userId}`);
            console.log(`     Read: ${n.read}`);
            console.log(`     Created: ${n.createdAt}`);
          });
        }

        // Check for tender notifications specifically
        const tenderNotifs = notifs.filter(
          (n: any) => n.type === "tender_published"
        );
        console.log(`Tender notifications: ${tenderNotifs.length}`);
      } else {
        setNotifications([]);
        setTotalCount(0);
        setError((notifResult as any).error || "Failed to fetch notifications");
        console.error(
          "❌ Failed to fetch notifications:",
          (notifResult as any).error
        );
      }

      if (countResult.success) {
        setUnreadCount((countResult as any).count);
        console.log("Unread count from server:", (countResult as any).count);
      } else if (notifResult.success) {
        const unread = ((notifResult as any).data || []).filter(
          (n: any) => !n.read
        ).length;
        setUnreadCount(unread);
        console.log("Unread count calculated:", unread);
      } else {
        setUnreadCount(0);
        console.log("Unread count set to 0");
      }

      console.log("Final state - Total:", totalCount, "Unread:", unreadCount);
      console.log("===================================");
    } catch (e) {
      console.error("❌ Exception loading notifications:", e);
      setNotifications([]);
      setTotalCount(0);
      setUnreadCount(0);
      setError("Failed to fetch notifications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("NotificationsDropdown mounted");
    loadNotifications();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      console.log("Auto-refreshing notifications...");
      loadNotifications();
    }, 30000);

    return () => {
      console.log("NotificationsDropdown unmounted");
      clearInterval(interval);
    };
  }, []);

  // Log when user changes
  useEffect(() => {
    if (user?.id) {
      console.log("User changed or loaded:", user.id);
      loadNotifications();
    }
  }, [user?.id]);

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
                <div className="flex-shrink-0 mt-0.5">
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
                      <span className="text-sm flex-shrink-0">
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
                        "text-[10px] px-1.5 py-0.5 flex-shrink-0",
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
                  className="w-6 h-6 p-0 flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
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
