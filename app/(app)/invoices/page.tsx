"use client"

import { useState, useEffect } from "react"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { FileDown, Plus } from 'lucide-react'
import { getInvoices, schedulePayment, putInvoiceOnHold } from "@/lib/actions/invoice-actions"

const fmtDate = (d?: string | Date) => d ? new Date(d).toISOString().slice(0, 10) : ""
const fmtAmount = (n: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadInvoices() {
      const result = await getInvoices()
      if (result.success) {
        setInvoices(result.data)
        if (result.data.length > 0) {
          setSelectedInvoice(result.data[0])
        }
      }
      setLoading(false)
    }
    loadInvoices()
  }, [])

  const invoiceLineItems = selectedInvoice?.lineItems || []
  const invoiceActivities = selectedInvoice?.activity || []

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Invoices</h1>
            <p className="text-sm text-muted-foreground">
              Track invoice flow from receipt to payment and manage exceptions.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <FileDown className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export list</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button size="sm" className="flex-1 sm:flex-none">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New invoice</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-3 md:gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Status:</span>{" "}
              <span className="font-medium">Pending & overdue</span>
            </div>
            <div>
              <span className="text-muted-foreground">Due:</span>{" "}
              <span className="font-medium">Next 30 days</span>
            </div>
            <div>
              <span className="text-muted-foreground">Entity:</span>{" "}
              <span className="font-medium">Global HQ</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-muted-foreground">Supplier:</span>{" "}
              <span className="font-medium">Top 20 by spend</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 mt-3 text-xs text-muted-foreground">
            <span>64 open invoices</span>
            <span>12 overdue</span>
            <span>$842,300 pending payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg">
            <div className="border-b border-border p-3 md:p-4 flex items-center justify-between">
              <div>
                <h2 className="font-medium text-sm md:text-base">Invoice worklist</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Prioritized view of invoices awaiting validation or payment.
                </p>
              </div>
              <span className="text-xs text-muted-foreground hidden md:inline">Sorted by due date</span>
            </div>
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground text-sm">Loading invoices...</div>
              ) : invoices.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  No invoices found. Connect to MongoDB to see data.
                </div>
              ) : (
                invoices.map((invoice) => (
                  <button
                    key={invoice._id}
                    onClick={() => setSelectedInvoice(invoice)}
                    className={`w-full text-left p-3 md:p-4 hover:bg-accent/50 transition-colors ${
                      selectedInvoice?._id === invoice._id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm mb-1 truncate">{invoice.invoiceNumber}</div>
                        <div className="text-xs text-muted-foreground mb-2 truncate">{invoice.supplier}</div>
                        <StatusBadge status={invoice.status} />
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">${fmtAmount(invoice.amount)}</div>
                    <div className="text-xs text-muted-foreground mt-1">{fmtDate(invoice.dueDate)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{invoice.poNumber}</div>
                  </button>
                ))
              )}
            </div>
            <div className="p-3 border-t border-border text-xs text-muted-foreground">
              Tip: Filter by "Status" = Overdue to prioritize collections and payment holds.
            </div>
          </div>

          <div className="lg:col-span-3 bg-card border border-border rounded-lg">
            <div className="border-b border-border p-3 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-sm md:text-base truncate">Invoice #{selectedInvoice?.invoiceNumber}</h2>
                <div className="flex flex-wrap gap-2 md:gap-4 text-xs text-muted-foreground mt-1">
                  <span className="truncate">Supplier: {selectedInvoice?.supplier}</span>
                  <span className="truncate">PO: {selectedInvoice?.poNumber}</span>
                </div>
              </div>
              <StatusBadge status={selectedInvoice?.status} />
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <div className="flex gap-4 text-xs mb-2">
                  <span>Entity: Global HQ</span>
                  <span>Currency: USD</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Invoice & payment summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Invoice date</div>
                    <div className="font-medium">{selectedInvoice?.invoiceDate ? fmtDate(selectedInvoice.invoiceDate) : ""}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Due date</div>
                    <div className="font-medium">{selectedInvoice?.dueDate ? fmtDate(selectedInvoice.dueDate) : ""} (Net 30)</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Invoice total</div>
                    <div className="font-medium">{selectedInvoice?.amount != null ? `$${fmtAmount(selectedInvoice.amount)}` : ""}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Remaining to pay</div>
                    <div className="font-medium">{selectedInvoice?.amount != null ? `$${fmtAmount(selectedInvoice.amount)}` : ""}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Matching & validation</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">3-way match status</div>
                    <div>PO match: Complete · GRN match: Complete · Price variance {"<"} 1% threshold.</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Approval workflow</div>
                    <div>Owner: Facilities · Approvers: Cost center manager, Finance AP · SLA: 2 business days.</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-muted-foreground text-xs mb-1">Exceptions</div>
                  <div className="text-sm">No blocking exceptions. One minor tax rounding difference logged and accepted.</div>
                </div>
                <div className="mt-3">
                  <div className="text-muted-foreground text-xs mb-1">Coding</div>
                  <div className="text-sm">Cost center: HQ-FAC-001 · GL: 6100 Office Supplies · Tax code: US-NY-STD.</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Line items</h3>
                <div className="border border-border rounded-lg overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-xs min-w-[600px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-2 font-medium">Description</th>
                        <th className="text-right p-2 font-medium">Qty</th>
                        <th className="text-right p-2 font-medium">Unit price</th>
                        <th className="text-right p-2 font-medium">Tax</th>
                        <th className="text-right p-2 font-medium">Line total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {invoiceLineItems.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="p-2">{item.description}</td>
                          <td className="p-2 text-right">{item.qty}</td>
                          <td className="p-2 text-right">${fmtAmount(item.unitPrice ?? 0)}</td>
                          <td className="p-2 text-right">${fmtAmount(item.tax ?? 0)}</td>
                          <td className="p-2 text-right font-medium">${fmtAmount(item.lineTotal ?? 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Activity & notes</h3>
                <div className="space-y-3">
                  {invoiceActivities.map((activity: any, i: number) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.event}</div>
                        <div className="text-xs text-muted-foreground">{fmtDate(activity.date)}{activity.details ? ` · ${activity.details}` : ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded text-xs text-muted-foreground italic">
                  Internal note: Align this invoice with Q1 budget reallocation for HQ office supplies. Do not pay before 2025-03-20.
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-medium mb-2">Next actions</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Review approval status and schedule payment based on cash planning.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Approve for payment</Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Put on hold</Button>
                  <Button size="sm" className="flex-1 sm:flex-none">Schedule payment</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
