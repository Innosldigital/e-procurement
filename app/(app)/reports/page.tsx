"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileDown, Settings } from 'lucide-react'
import { getRequisitions } from "@/lib/actions/requisition-actions"

const fmtAmount = (n: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

export default function ReportsPage() {
  const [categoryData, setCategoryData] = useState<{ category: string; amount: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getRequisitions()
      .then((res) => {
        const data = (res && (res as any).success) ? (res as any).data : []
        const totals: Record<string, number> = {}
        for (const r of data as any[]) {
          const cat = r.category || "Uncategorized"
          const amt = Number(r.amount || 0)
          totals[cat] = (totals[cat] || 0) + amt
        }
        const top = Object.entries(totals)
          .map(([category, amount]) => ({ category, amount }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 5)
        if (!mounted) return
        setCategoryData(top)
      })
      .catch(() => {
        if (!mounted) return
        setCategoryData([])
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })
    return () => { mounted = false }
  }, [])
  return (
    <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Reports</h1>
            <p className="text-sm text-muted-foreground">
              Analyze spend, compliance, and cycle times across your procurement lifecycle.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileDown className="w-4 h-4 mr-2" />
              Export as PDF
            </Button>
            <Button size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Build custom report
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Period:</span>{" "}
              <span className="font-medium">Q1 FY25</span>
            </div>
            <div>
              <span className="text-muted-foreground">Dimension:</span>{" "}
              <span className="font-medium">Cost center & category</span>
            </div>
            <div>
              <span className="text-muted-foreground">Entities:</span>{" "}
              <span className="font-medium">Global HQ + 3 regions</span>
            </div>
            <div>
              <span className="text-muted-foreground">Currency:</span>{" "}
              <span className="font-medium">USD (reporting)</span>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
            <span>Consolidated view</span>
            <span>Data refreshed 5 min ago</span>
            <span>Includes committed & actual spend</span>
          </div>
        </div>

        <div className="grid gap-6 mb-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium mb-1">Spend & performance overview</h2>
                <p className="text-xs text-muted-foreground">High-level KPIs for the selected period across all entities.</p>
              </div>
              <span className="text-xs text-muted-foreground">Benchmark vs previous period</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total addressable spend</div>
                <div className="text-2xl font-semibold mb-1">$12.4M</div>
                <div className="text-xs text-success">+8.3% vs Q4</div>
                <div className="text-xs text-muted-foreground mt-1">Includes POs & invoices approved</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Realized savings</div>
                <div className="text-2xl font-semibold mb-1">$1.26M</div>
                <div className="text-xs text-success">+4.1% vs target</div>
                <div className="text-xs text-muted-foreground mt-1">From negotiations, rebates & avoided cost</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">On-contract compliance</div>
                <div className="text-2xl font-semibold mb-1">87%</div>
                <div className="text-xs text-muted-foreground">+2 pts vs Q4</div>
                <div className="text-xs text-muted-foreground mt-1">Spend with approved suppliers & catalogs</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium mb-4">Spend by category</h3>
              <p className="text-xs text-muted-foreground mb-4">Top 5 categories, filtered by approved suppliers only.</p>
              {loading ? (
                <div className="text-xs text-muted-foreground">Loading categories...</div>
              ) : categoryData.length === 0 ? (
                <div className="text-xs text-muted-foreground">No category data found.</div>
              ) : (
                <div className="space-y-3">
                  {categoryData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{item.category}</span>
                      </div>
                      <span className="text-sm font-medium">${fmtAmount(item.amount)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium mb-4">Cycle time & SLA</h3>
              <p className="text-xs text-muted-foreground mb-4">Average lead time from requisition to payment.</p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Requisition → PO</span>
                    <span className="text-sm font-medium">4.3d</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-success">-0.7d vs Q4</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">PO → Invoice</span>
                    <span className="text-sm font-medium">5.1d</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Stable</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Invoice → Payment</span>
                    <span className="text-sm font-medium">8.9d</span>
                  </div>
                  <div className="text-xs text-destructive">+1.2d vs target</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium mb-1">Saved & scheduled reports</h2>
              <p className="text-xs text-muted-foreground">Access recurring reports shared across finance, procurement, and leadership.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 border border-border rounded-lg text-xs text-muted-foreground">No saved reports found.</div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Tip: Use "Build custom report" to drill into a specific entity, category, or supplier cluster.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-sm font-medium mb-4">Recently run reports</h2>
          <p className="text-xs text-muted-foreground mb-4">Re-run or export with the same parameters.</p>
          <div className="space-y-3">
            <div className="p-3 border border-border rounded-lg text-xs text-muted-foreground">No recent reports.</div>
          </div>
          <Button variant="link" size="sm" className="mt-4 text-xs">View full report catalog</Button>
        </div>
      </div>
  )
}
