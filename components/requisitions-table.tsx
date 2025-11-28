"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { Download } from "lucide-react"
import { RequisitionDetailModal } from "./requisition-detail-modal"
// import { RequisitionDetailModal } from "@/components/requisition-detail-modal"

type RequisitionItem = {
  _id: string
  requisitionId: string
  requester: string
  branch: string
  date: string | Date
  status: string
  amount: number
}

export default function RequisitionsTable({ items }: { items: RequisitionItem[] }) {
  const [query, setQuery] = useState("")
  const [branch, setBranch] = useState<string | undefined>()
  const [status, setStatus] = useState<string | undefined>()
  const [selectedRequisitionId, setSelectedRequisitionId] = useState<string | null>(null)

  const fmtDate = (d: string | Date) => new Date(d).toISOString().slice(0, 10)
  const fmtAmount = (n: number) =>
    new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

  const filtered = useMemo(() => {
    return items
      .filter((r) => {
        const q = query.trim().toLowerCase()
        const matchesQuery = q
          ? r.requisitionId?.toLowerCase().includes(q) || r.requester?.toLowerCase().includes(q)
          : true
        const matchesBranch = branch ? r.branch === branch : true
        const matchesStatus = status ? r.status === status : true
        return matchesQuery && matchesBranch && matchesStatus
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 100)
  }, [items, query, branch, status])

  const exportCsv = () => {
    const rows = filtered.map((r) => [
      r.requisitionId,
      r.requester,
      r.branch,
      fmtDate(r.date),
      r.status,
      fmtAmount(r.amount),
    ])
    const header = ["Requisition ID", "Requester", "Branch", "Date", "Status", "Amount"]
    const encode = (v: string) => '"' + v.replace(/"/g, '""') + '"'
    const csv = [header, ...rows].map((row) => row.map(encode).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "requisitions.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">All requisitions</CardTitle>
              <CardDescription className="text-xs">Showing {filtered.length} result(s)</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportCsv}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Search by requester or ID"
              className="md:col-span-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select value={branch} onValueChange={(v) => setBranch(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Global HQ">Global HQ</SelectItem>
                <SelectItem value="APAC">APAC</SelectItem>
                <SelectItem value="EMEA">EMEA</SelectItem>
                <SelectItem value="NA">North America</SelectItem>
                <SelectItem value="LATAM">LATAM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending approval">Pending approval</SelectItem>
                <SelectItem value="In review">In review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">No requisitions found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((req) => (
                  <TableRow
                    key={req._id}
                    onClick={() => setSelectedRequisitionId(req._id)}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{req.requisitionId}</TableCell>
                    <TableCell>{req.requester}</TableCell>
                    <TableCell className="text-muted-foreground">{req.branch}</TableCell>
                    <TableCell className="text-muted-foreground">{fmtDate(req.date)}</TableCell>
                    <TableCell>
                      <StatusBadge status={req.status} />
                    </TableCell>
                    <TableCell className="text-right">${fmtAmount(req.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedRequisitionId && (
        <RequisitionDetailModal requisitionId={selectedRequisitionId} onClose={() => setSelectedRequisitionId(null)} />
      )}
    </>
  )
}
