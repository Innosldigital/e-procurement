import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { getRequisitions } from "@/lib/actions/requisition-actions"
import { getPurchaseOrders, getSpendMTD } from "@/lib/actions/purchase-order-actions"
import { getApprovals } from "@/lib/actions/approval-actions"
import { getInvoices } from "@/lib/actions/invoice-actions"
import { getNotifications, getNotificationsPublic } from "@/lib/actions/notification-actions"
import DashboardClient from "@/components/dashboard-client"

type ApprovalSummary = { status: string }
type RequisitionSummary = {
  _id: string
  requisitionId: string
  requester: string
  branch: string
  createdAt: string | Date
  status: string
  amount: number
}
type PurchaseOrderSummary = {
  _id: string
  poNumber: string
  supplier: string
  department: string
  status: string
  total: number
  keyDates?: { issued?: string | Date; requestedDelivery?: string | Date }
}
type InvoiceSummary = { status: string; dueDate: string | Date }

type NotificationItem = {
  _id: string
  type: string
  title: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  read: boolean
  createdAt: string | Date
}

export default async function DashboardPage() {
  const [requisitionsResult, purchaseOrdersResult, approvalsResult, invoicesResult, spendResult, notificationsResult, notificationsPublicResult] = await Promise.all([
    getRequisitions(),
    getPurchaseOrders(),
    getApprovals(),
    getInvoices(),
    getSpendMTD(),
    getNotifications(10),
    getNotificationsPublic(10),
  ])

  const requisitions = (requisitionsResult.success ? requisitionsResult.data : []) as RequisitionSummary[]
  const purchaseOrders = (purchaseOrdersResult.success ? purchaseOrdersResult.data : []) as PurchaseOrderSummary[]
  const approvals = (approvalsResult.success ? approvalsResult.data : []) as ApprovalSummary[]
  const invoices = (invoicesResult.success ? invoicesResult.data : []) as InvoiceSummary[]

  const pendingApprovals = approvals.filter((a) => (
    [
      "Awaiting your approval",
      "Pending review",
      "Parallel approval",
      "SLA breached",
    ].includes(a.status)
  )).length
  const pendingRequisitions = requisitions.filter(
    (r) => r.status === "Pending approval" || r.status === "In review",
  ).length
  const openPOs = purchaseOrders.filter((po) => po.status !== "Closed").length
  const totalSpendMTD = (spendResult.success ? (spendResult as any).data : 0) as number

  // Get recent requisitions (last 5)
  const fmtDate = (d?: string | Date | null) => {
    if (!d) return "-"
    const date = typeof d === "string" ? new Date(d) : d
    return isNaN(date.getTime()) ? "-" : date.toISOString().slice(0, 10)
  }
  const fmtAmount = (n: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
  const labelFromType = (t: string) => (t || '').replace(/_/g, ' ')

  const recentRequisitions = requisitions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Get active purchase orders (last 5)
  const activePurchaseOrders = purchaseOrders
    .filter((po) => po.status !== "Closed")
    .sort((a, b) => new Date(b?.keyDates?.issued || "").getTime() - new Date(a?.keyDates?.issued || "").getTime())
    .slice(0, 5)

  // Count overdue invoices
  const overdueInvoices = invoices.filter((inv) => {
    const dueDate = new Date(inv.dueDate)
    return dueDate < new Date() && inv.status === "Pending approval"
  })
  const notifications = (
    notificationsResult.success ? (notificationsResult as any).data : (
      notificationsPublicResult.success ? (notificationsPublicResult as any).data : []
    )
  ) as NotificationItem[]

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-1">Overview dashboard</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Monitor spend, track approvals, and manage procurement activity in real-time.
          </p>
        </div>
        {/* Client component handles form modals */}
        <DashboardClient />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Pending approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingApprovals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Pending requisitions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingRequisitions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Open POs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{openPOs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Total spend (MTD)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(totalSpendMTD / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Spend vs Budget */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Spend vs budget</CardTitle>
                <CardDescription className="text-xs">Track spend across branches and categories.</CardDescription>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-muted-foreground">Period: This quarter</span>
                <span className="text-muted-foreground">Branch: All branches</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  Actual spend
                </span>
                <span className="text-sm font-semibold">$6.8M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-muted"></span>
                  Budget
                </span>
                <span className="text-sm font-semibold">$9.5M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-success"></span>
                  Savings
                </span>
                <span className="text-sm font-semibold">$420K</span>
              </div>
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">Top branch: EMEA</p>
                <p className="text-xs text-muted-foreground">Category: IT & software</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Alerts & notifications</CardTitle>
                <CardDescription className="text-xs">Items requiring your attention.</CardDescription>
              </div>
              <span className="text-sm text-muted-foreground">{notifications.filter(n => !n.read).length} open</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-sm text-muted-foreground">No notifications.</div>
              ) : (
                notifications.slice(0, 3).map((n) => (
                  <div key={String(n._id)} className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status={labelFromType(n.type)} />
                      </div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.message}</p>
                    </div>
                  </div>
                ))
              )}

              <div className="pt-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Create requisition
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Create tender
                </Button>
                <Button size="sm" className="flex-1">
                  View all alerts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Requisitions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent requisitions</CardTitle>
                <CardDescription className="text-xs">
                  Last {recentRequisitions.length} submitted requests.
                </CardDescription>
              </div>
              <Button variant="link" className="text-xs h-auto p-0">
                Filter: My approvals
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentRequisitions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No requisitions found. Create your first requisition to get started.
              </div>
            ) : (
              <div className="space-y-3">
                {recentRequisitions.map((req) => (
                  <div key={req._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{req.requisitionId}</span>
                        <span className="text-xs text-muted-foreground">{req.requester}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{req.branch}</span>
                        <span>•</span>
                        <span>{fmtDate(req.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={req.status} />
                      <span className="text-sm font-medium w-20 text-right">${fmtAmount(req.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Purchase Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Active purchase orders</CardTitle>
                <CardDescription className="text-xs">Orders in progress across branches.</CardDescription>
              </div>
              <span className="text-xs text-muted-foreground">{activePurchaseOrders.length} active</span>
            </div>
          </CardHeader>
          <CardContent>
            {activePurchaseOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">No active purchase orders found.</div>
            ) : (
              <div className="space-y-3">
                {activePurchaseOrders.map((po) => (
                  <div key={po._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{po.poNumber}</span>
                        <span className="text-xs text-muted-foreground">{po.supplier}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{po.department}</span>
                        <span>•</span>
                        <span>{fmtDate(po?.keyDates?.requestedDelivery || "")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={po.status} />
                      <span className="text-sm font-medium w-20 text-right">${fmtAmount(po.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
        <span>
          Branch: <span className="text-primary">Global HQ</span>
        </span>
        <span>
          FY24 Budget Utilization: <span className="text-success">68% used</span>
        </span>
      </div>
    </div>
  )
}
