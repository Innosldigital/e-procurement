import { NotificationsList } from '@/components/notifications-list'
import { getNotifications } from '@/lib/actions/notification-actions'


export default async function NotificationsPage() {
  const result = await getNotifications(100)
  const notifications = result.success ? result.data : []

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">All Notifications</h1>
        <p className="text-sm text-muted-foreground">
          View and manage all your procurement notifications
        </p>
      </div>

      <NotificationsList initialNotifications={notifications} />
    </div>
  )
}
