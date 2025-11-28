import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { getRequisitions } from "@/lib/actions/requisition-actions"
import DashboardClient from "@/components/dashboard-client"
import RequisitionsTable from "@/components/requisitions-table"
export const dynamic = 'force-dynamic'

type RequisitionSummary = {
  _id: string
  requisitionId: string
  requester: string
  branch: string
  date: string | Date
  status: string
  amount: number
}

export default async function RequisitionsPage() {
  const result = await getRequisitions()
  const requisitions = (result.success ? result.data : []) as RequisitionSummary[]
  const recent = requisitions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20)

  const pendingCount = requisitions.filter(r => r.status === 'Pending approval').length
  const reviewCount = requisitions.filter(r => r.status === 'In review').length
  const approvedCount = requisitions.filter(r => r.status === 'Approved').length
  const rejectedCount = requisitions.filter(r => r.status === 'Rejected').length

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <CardTitle className="text-base">Requisitions</CardTitle>
        <DashboardClient />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Pending approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">In review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reviewCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Approved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Rejected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      <RequisitionsTable items={requisitions} />
    </div>
  )
}
