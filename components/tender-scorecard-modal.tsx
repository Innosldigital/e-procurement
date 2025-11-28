"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TenderScorecardModalProps {
  tender: any
  onClose: () => void
}

export function TenderScorecardModal({ tender, onClose }: TenderScorecardModalProps) {
  if (!tender) return null

  const bids: any[] = Array.isArray(tender.bids) ? [...tender.bids] : []
  bids.sort((a, b) => {
    const sa = typeof a.score === "number" ? a.score : 0
    const sb = typeof b.score === "number" ? b.score : 0
    if (sb !== sa) return sb - sa
    const pa = typeof a.totalPrice === "number" ? a.totalPrice : Number.MAX_SAFE_INTEGER
    const pb = typeof b.totalPrice === "number" ? b.totalPrice : Number.MAX_SAFE_INTEGER
    return pa - pb
  })

  const summary = tender.evaluationSummary || {}
  const totalBids = typeof summary.totalBids === "number" ? summary.totalBids : bids.length
  const disqualified = typeof summary.disqualified === "number" ? summary.disqualified : 0
  const overallScore = typeof summary.score === "number" ? summary.score : undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-2xl mx-4 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="sticky top-0 z-10 bg-background border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Tender Scorecard</h2>
            <p className="text-sm text-muted-foreground">{tender.tenderId} · {tender.title}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Recommended supplier</p>
              <p className="text-sm font-medium">{summary.recommendedSupplier || "—"}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Overall score</p>
              <p className="text-sm font-medium">{overallScore !== undefined ? `${overallScore}` : "—"}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Total bids</p>
              <p className="text-sm font-medium">{totalBids}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Disqualified</p>
              <p className="text-sm font-medium">{disqualified}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Bid score breakdown</h3>
              <p className="text-xs text-muted-foreground">Sorted by score, then price</p>
            </div>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs">
                  <tr>
                    <th className="text-left p-3 font-medium">Supplier</th>
                    <th className="text-left p-3 font-medium">Score</th>
                    <th className="text-left p-3 font-medium">Total price</th>
                    <th className="text-left p-3 font-medium">Compliance</th>
                    <th className="text-left p-3 font-medium">Highlights</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.length === 0 ? (
                    <tr>
                      <td className="p-4 text-center text-muted-foreground text-xs" colSpan={5}>No bids available</td>
                    </tr>
                  ) : (
                    bids.map((bid, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{bid.supplier || "—"}</span>
                            {summary.recommendedSupplier && bid.supplier === summary.recommendedSupplier && (
                              <Badge className="text-xs">Recommended</Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-3">{typeof bid.score === "number" ? bid.score : "—"}</td>
                        <td className="p-3">{typeof bid.totalPrice === "number" ? `$${bid.totalPrice.toLocaleString()}` : "—"}</td>
                        <td className="p-3">
                          {bid.compliance ? (
                            <Badge variant="outline" className="text-xs">{bid.compliance}</Badge>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="p-3 text-xs text-muted-foreground">{bid.highlights || ""}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

