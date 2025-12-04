"use client"

import { useState, useEffect } from 'react'
import { Bell, Check, CheckCheck, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from '@/lib/actions/notification-actions'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Notification {
  _id: string
  type: string
  title: string
  message: string
  actionUrl?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  read: boolean
  createdAt: string
}

export function NotificationsDropdown() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadNotifications = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [notifResult, countResult] = await Promise.all([
        getNotifications(20).catch(() => ({ success: false, error: 'Failed to fetch notifications' })),
        getUnreadCount().catch(() => ({ success: false, count: 0 }))
      ])

      if (notifResult.success) {
        setNotifications((notifResult as any).data || [])
        setTotalCount(((notifResult as any).data || []).length)
      } else {
        setNotifications([])
        setTotalCount(0)
        setError((notifResult as any).error || 'Failed to fetch notifications')
      }

      if (countResult.success) {
        setUnreadCount((countResult as any).count)
      } else if (notifResult.success) {
        setUnreadCount((((notifResult as any).data || []).filter((n: any) => !n.read)).length)
      } else {
        setUnreadCount(0)
      }
    } catch (e) {
      setNotifications([])
      setTotalCount(0)
      setUnreadCount(0)
      setError('Failed to fetch notifications')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNotifications()
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId)
    await loadNotifications()
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
    await loadNotifications()
  }

  const handleDelete = async (notificationId: string) => {
    await deleteNotification(notificationId)
    await loadNotifications()
  }

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await handleMarkAsRead(notification._id)
    }

    if (notification.actionUrl) {
      setIsOpen(false)
      router.push(notification.actionUrl)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-blue-500'
      case 'low': return 'bg-gray-500'
      default: return 'bg-blue-500'
    }
  }

  const getNotificationIcon = (type: string) => {
    // You can customize icons based on notification type
    return '📬'
  }

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const notifDate = new Date(date)
    const diffMs = now.getTime() - notifDate.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return notifDate.toLocaleDateString()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (open) loadNotifications() }}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive hover:bg-destructive"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
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
              {totalCount} total{unreadCount > 0 ? ` • ${unreadCount} unread` : ''}
            </p>
          </div>

          {notifications.length > 0 && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="h-7 sm:h-8 text-xs flex-1 sm:flex-none"
                >
                  <CheckCheck className="w-3 h-3 mr-1" />
                  <span className="hidden xs:inline">Mark all read</span>
                  <span className="xs:hidden">Mark all</span>
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="max-h-[300px] overflow-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-xs text-muted-foreground">Loading...</div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className="px-3 sm:px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-accent"
              >
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-sm", notification.read ? "font-medium text-muted-foreground" : "font-semibold")}>{notification.title}</span>
                    <Badge
                      variant="secondary"
                      className={cn("text-[10px] px-1.5 py-0.5", notification.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary")}
                    >
                      {notification.read ? "Read" : "Unread"}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(notification.createdAt)}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); handleDelete(notification._id) }}
                  className="w-5 h-5 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-4 py-3 text-xs text-muted-foreground">No notifications</div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
