import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getSuppliers } from "@/lib/actions/supplier-actions"

export default async function SuppliersPage() {
  const result = await getSuppliers()
  const suppliers = result.success ? result.data : []

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-1">Suppliers</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Manage strategic vendors, performance, and risk across your supplier base.
          </p>
        </div>
        <div className="flex gap-2 md:gap-3">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Supplier settings</Button>
          <Button size="sm" className="flex-1 sm:flex-none">New supplier</Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Segment:</span>
              <Badge variant="secondary" className="text-xs">Strategic & preferred</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Category:</span>
              <Badge variant="secondary" className="text-xs">Facilities, IT, Logistics</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Region:</span>
              <Badge variant="secondary" className="text-xs">Global HQ & North America</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Risk:</span>
              <Badge variant="secondary" className="text-xs">Low & medium</Badge>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{suppliers.length} active suppliers</span>
            <span>24 strategic</span>
            <span>5 on watchlist</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
        <Card className="xl:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Supplier directory</CardTitle>
              <span className="text-xs text-muted-foreground">Sorted by spend (FY24)</span>
            </div>
            <CardDescription className="text-xs">
              Select a supplier to view performance and compliance details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Search by supplier name, ID, category..." className="mb-4" />
            <div className="space-y-1">
              {suppliers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No suppliers found. Connect to MongoDB to see data.
                </div>
              ) : (
                suppliers.slice(0, 10).map((supplier: any) => (
                  <div key={supplier._id} className="p-3 rounded-lg hover:bg-accent cursor-pointer border border-transparent hover:border-border transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{supplier.name}</div>
                        <div className="text-xs text-muted-foreground">{supplier.supplierId}</div>
                      </div>
                      <StatusBadge status={supplier.riskRating} />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>{supplier.category}</span>
                        <span>•</span>
                        <span>Score: {supplier.performanceScore}/100</span>
                      </div>
                      <span className="font-medium">${supplier.totalSpend?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-4 px-3">
              Tip: Change "Segment" to see all suppliers and identify consolidation opportunities.
            </p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-7">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-base">Global Office Supplies Ltd</CardTitle>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="Strategic" />
                    <Badge variant="outline" className="text-xs bg-success/10 border-success/30">
                      Performance score: 94 / 100
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Supplier ID: SUP-2045</span>
                  <span>Segment: Strategic</span>
                </div>
              </div>
              <div className="flex gap-2">
                <StatusBadge status="Low" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Overview & commercial profile</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Summary</h4>
                    <p className="text-xs">
                      Primary supplier for office consumables, stationery, and basic facilities items across Global HQ locations.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Primary category</h4>
                    <p className="text-xs">Facilities & Office</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Region</h4>
                    <p className="text-xs">Global HQ & North America</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Contract status</h4>
                    <p className="text-xs text-success">Master service agreement active • Expires: 2026-06-30 • Auto-renew: Yes</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Commercial terms</h4>
                  <p className="text-xs">Net 30 days • Early payment discount 2% / 10 days • Annual rebate tiered by spend.</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Diversity & ESG</h4>
                  <p className="text-xs">Certified minority-owned & ISO 14001 • 48% of catalog marked as eco-preferred.</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Performance & risk</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Delivery performance</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>On-time:</span>
                        <span className="font-medium">96% (last 12 months)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Avg. lead time:</span>
                        <span className="font-medium">4.2 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>3 late deliveries &gt; 5 days:</span>
                        <span className="text-warning">3 late deliveries &gt; 5 days</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Quality & issues</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>Return rate:</span>
                        <span className="font-medium">0.8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>2 quality incidents YTD:</span>
                        <span className="font-medium">2 quality incidents YTD</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>No critical safety events:</span>
                        <span className="text-success">No critical safety events</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Financial & credit risk</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>External rating:</span>
                        <span className="font-medium">Stable</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>No overdue invoices &gt; 30 days:</span>
                        <span className="font-medium">No overdue invoices &gt; 30 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Credit limit:</span>
                        <span className="font-medium">$2,000,000</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Compliance status</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>KYC / AML cleared:</span>
                        <span className="font-medium">KYC / AML cleared</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Insurance certificates up to date:</span>
                        <span className="font-medium">Insurance certificates up to date</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sanctions & watchlist:</span>
                        <span className="text-success">Clear</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Primary contacts</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="font-medium">Account manager</div>
                    <div className="text-muted-foreground">Sarah Johnson • sarah.johnson@globaloffice.com • +1 (212) 555-0182</div>
                  </div>
                  <div>
                    <div className="font-medium">Order & delivery</div>
                    <div className="text-muted-foreground">orders@globaloffice.com • +1 (212) 555-0194</div>
                  </div>
                  <div>
                    <div className="font-medium">Billing & AP</div>
                    <div className="text-muted-foreground">billing@globaloffice.com • Remittance via ACH preferred</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Key documents</h3>
                  <Button variant="link" size="sm" className="text-xs h-auto p-0">View all</Button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded border">
                    <span className="font-medium">Master services agreement – Global HQ</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>PDF • 2.3 MB</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded border">
                    <span className="font-medium">Service level agreement (SLA)</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>PDF • 1.1 MB</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded border">
                    <span className="font-medium">Insurance & compliance pack</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>ZIP • 4.8 MB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Recent activity</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <div>
                      <div className="font-medium">Quarterly performance review completed</div>
                      <div className="text-muted-foreground">2025-03-10 • Scorecard shared with supplier • Owner: Procurement</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <div>
                      <div className="font-medium">Catalog updated with eco-preferred items</div>
                      <div className="text-muted-foreground">2025-02-22 • 34 items replaced with greener alternatives</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <div>
                      <div className="font-medium">MSA amendment signed – pricing indexation</div>
                      <div className="text-muted-foreground">2025-01-15 • Linked to contract doc #MSA-2045-A1</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <div>
                      <div className="font-medium">Risk review completed – Low risk</div>
                      <div className="text-muted-foreground">2024-12-01 • Outcome: Low risk • Next review in 12 months</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Next actions</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit supplier profile</Button>
                  <Button variant="outline" size="sm">Manage contracts</Button>
                  <Button size="sm">Mark as preferred</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
