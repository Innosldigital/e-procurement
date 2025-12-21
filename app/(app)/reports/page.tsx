"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDown, Settings } from "lucide-react";
import { getRequisitions } from "@/lib/actions/requisition-actions";
import { getPurchaseOrders } from "@/lib/actions/purchase-order-actions";
import { getInvoices } from "@/lib/actions/invoice-actions";
import { getSuppliers } from "@/lib/actions/supplier-actions";
import {
  getSpendVsBudgetThisQuarter,
  getCycleTimes,
} from "@/lib/actions/purchase-order-actions";

const fmtAmount = (n: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
const fmtNLe = (n: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(n);
const fmtNLeCompact = (n: number) =>
  n >= 1_000_000
    ? `${fmtNLe(n / 1_000_000)}M`
    : `${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Math.round(n / 1_000))}K`;

export default function ReportsPage() {
  const [categoryData, setCategoryData] = useState<
    { category: string; amount: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [totalSpend, setTotalSpend] = useState(0);
  const [compliancePct, setCompliancePct] = useState(0);
  const [cycleReqToPO, setCycleReqToPO] = useState(0);
  const [cyclePOToInv, setCyclePOToInv] = useState(0);
  const [cycleInvToPay, setCycleInvToPay] = useState(0);
  const [savingsThisQ, setSavingsThisQ] = useState(0);
  const [budgetThisQ, setBudgetThisQ] = useState(0);
  const [customOpen, setCustomOpen] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);
  const [customDim, setCustomDim] = useState("category");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [customApprovedOnly, setCustomApprovedOnly] = useState(false);
  const [customItems, setCustomItems] = useState<
    { label: string; amount: number }[]
  >([]);
  const [customTotal, setCustomTotal] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      getRequisitions().catch(() => ({ success: false, data: [] })),
      getPurchaseOrders().catch(() => ({ success: false, data: [] })),
      getInvoices().catch(() => ({ success: false, data: [] })),
      getSuppliers().catch(() => ({ success: false, data: [] })),
      getSpendVsBudgetThisQuarter().catch(() => ({ success: false, data: {} })),
      getCycleTimes().catch(() => ({ success: false, data: {} })),
    ])
      .then(([reqRes, poRes, invRes, supRes, svbRes, ctRes]) => {
        const reqs =
          reqRes && (reqRes as any).success ? (reqRes as any).data : [];
        const pos = poRes && (poRes as any).success ? (poRes as any).data : [];
        const invs =
          invRes && (invRes as any).success ? (invRes as any).data : [];
        const sups =
          supRes && (supRes as any).success ? (supRes as any).data : [];
        const svb =
          svbRes && (svbRes as any).success ? (svbRes as any).data : {};
        const ct = ctRes && (ctRes as any).success ? (ctRes as any).data : {};

        const catTotals: Record<string, number> = {};
        for (const r of reqs as any[]) {
          const cat = r.category || "Uncategorized";
          const amt = Number(r.amount || 0);
          catTotals[cat] = (catTotals[cat] || 0) + amt;
        }
        const topCats = Object.entries(catTotals)
          .map(([category, amount]) => ({ category, amount }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 5);

        const poSpend = (pos as any[]).reduce(
          (sum, p) => sum + Number(p.total || 0),
          0
        );
        const invSpend = (invs as any[]).reduce(
          (sum, i) => sum + Number(i.amount || 0),
          0
        );
        const total = poSpend + invSpend;

        const approvedNames = new Set(
          (sups as any[])
            .filter((s) => s && s.approved === true)
            .map((s) => String(s.name || s.supplier || ""))
            .filter(Boolean)
        );
        const approvedSpend = (pos as any[])
          .filter((p) => approvedNames.has(String(p.supplier || "")))
          .reduce((sum, p) => sum + Number(p.total || 0), 0);
        const compliance = total > 0 ? (approvedSpend / total) * 100 : 0;

        if (!mounted) return;
        setCategoryData(topCats);
        setTotalSpend(total);
        setCompliancePct(compliance);
        setCycleReqToPO(Number((ct as any).reqToPO || 0));
        setCyclePOToInv(Number((ct as any).poToInv || 0));
        setCycleInvToPay(Number((ct as any).invToPay || 0));
        setSavingsThisQ(Number((svb as any).savings || 0));
        setBudgetThisQ(Number((svb as any).budget || 0));
      })
      .catch(() => {
        if (!mounted) return;
        setCategoryData([]);
        setTotalSpend(0);
        setCompliancePct(0);
        setCycleReqToPO(0);
        setCyclePOToInv(0);
        setCycleInvToPay(0);
        setSavingsThisQ(0);
        setBudgetThisQ(0);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);
  const printRef = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={printRef} className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Reports
          </h1>
          <p className="text-sm text-muted-foreground">
            Analyze spend, compliance, and cycle times across your procurement
            lifecycle.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pdfLoading}
            onClick={async () => {
              const node = printRef.current;
              if (!node) return;
              setPdfLoading(true);
              try {
                const { jsPDF } = await import("jspdf");
                const html2canvas = (await import("html2canvas")).default;

                const canvas = await html2canvas(node, {
                  scale: 2,
                  useCORS: true,
                  logging: false,
                  backgroundColor: "#ffffff",
                  windowWidth: node.scrollWidth,
                  onclone: (clonedDoc) => {
                    // Hide all buttons in the clone (e.g. Export, Settings)
                    const buttons = clonedDoc.querySelectorAll("button");
                    buttons.forEach((btn) => (btn.style.display = "none"));

                    // Add a professional header to the cloned node
                    const container = clonedDoc.querySelector(".p-8");
                    if (container) {
                      const headerDiv = clonedDoc.createElement("div");
                      headerDiv.style.marginBottom = "24px";
                      headerDiv.style.borderBottom = "2px solid #e5e7eb";
                      headerDiv.style.paddingBottom = "16px";
                      headerDiv.style.display = "flex";
                      headerDiv.style.justifyContent = "space-between";
                      headerDiv.style.alignItems = "flex-end";

                      headerDiv.innerHTML = `
                        <div>
                          <h1 style="font-size: 24px; font-weight: 700; color: #111827; line-height: 1.2;">Innovation-SL Procurement</h1>
                          <p style="font-size: 14px; color: #6b7280; margin-top: 4px;">Procurement Intelligence Report</p>
                        </div>
                        <div style="text-align: right;">
                          <p style="font-size: 12px; color: #9ca3af; font-weight: 500;">GENERATED ON</p>
                          <p style="font-size: 14px; color: #374151;">${new Date().toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}</p>
                        </div>
                      `;
                      container.prepend(headerDiv);
                    }
                  },
                });

                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF({
                  orientation: "portrait",
                  unit: "pt",
                  format: "a4",
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const margin = 30;
                const contentWidth = pdfWidth - margin * 2;
                const contentHeight =
                  (canvas.height * contentWidth) / canvas.width;
                const printableHeight = pdfHeight - margin * 2;

                let heightLeft = contentHeight;
                let position = margin;

                pdf.addImage(
                  imgData,
                  "PNG",
                  margin,
                  position,
                  contentWidth,
                  contentHeight
                );
                heightLeft -= printableHeight;

                while (heightLeft > 0) {
                  position -= printableHeight;
                  pdf.addPage();
                  pdf.addImage(
                    imgData,
                    "PNG",
                    margin,
                    position,
                    contentWidth,
                    contentHeight
                  );
                  heightLeft -= printableHeight;
                }

                const name = `InnoslProcura_Report_${new Date()
                  .toISOString()
                  .slice(0, 10)}.pdf`;
                pdf.save(name);
              } catch (e) {
                console.error("PDF generation failed:", e);
              } finally {
                setPdfLoading(false);
              }
            }}
          >
            <FileDown className="w-4 h-4 mr-2" />
            {pdfLoading ? "Exporting..." : "Export as PDF"}
          </Button>
          <Button size="sm" onClick={() => setCustomOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Build custom report
          </Button>
        </div>
      </div>

      <Dialog open={customOpen} onOpenChange={setCustomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Build custom report</DialogTitle>
            <DialogDescription>
              Configure parameters and generate a tailored report.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Dimension</Label>
                <Select
                  value={customDim}
                  onValueChange={(v) => setCustomDim(v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select dimension" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="cost_center">Cost center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Start date</Label>
                <Input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End date</Label>
                <Input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="approvedOnly"
                checked={customApprovedOnly}
                onCheckedChange={(v: any) => setCustomApprovedOnly(Boolean(v))}
              />
              <Label htmlFor="approvedOnly">Approved suppliers only</Label>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCustomItems([]);
                  setCustomTotal(0);
                }}
              >
                Reset
              </Button>
              <Button
                onClick={async () => {
                  setCustomLoading(true);
                  const s = customStart ? new Date(customStart) : null;
                  const e = customEnd ? new Date(customEnd) : null;
                  const inRange = (d: any) => {
                    const dt = d ? new Date(d) : null;
                    if (!dt || isNaN(dt.getTime())) return false;
                    if (s && dt < s) return false;
                    if (e && dt > e) return false;
                    return true;
                  };
                  const [reqRes, poRes, invRes, supRes] = await Promise.all([
                    getRequisitions().catch(() => ({
                      success: false,
                      data: [],
                    })),
                    getPurchaseOrders().catch(() => ({
                      success: false,
                      data: [],
                    })),
                    getInvoices().catch(() => ({ success: false, data: [] })),
                    getSuppliers().catch(() => ({ success: false, data: [] })),
                  ]);
                  const reqs =
                    reqRes && (reqRes as any).success
                      ? (reqRes as any).data
                      : [];
                  const pos =
                    poRes && (poRes as any).success ? (poRes as any).data : [];
                  const invs =
                    invRes && (invRes as any).success
                      ? (invRes as any).data
                      : [];
                  const sups =
                    supRes && (supRes as any).success
                      ? (supRes as any).data
                      : [];
                  const approvedNames = new Set(
                    (sups as any[])
                      .filter((s) => s && s.approved === true)
                      .map((s) => String(s.name || s.supplier || ""))
                      .filter(Boolean)
                  );
                  let items: { label: string; amount: number }[] = [];
                  let total = 0;
                  if (customDim === "supplier") {
                    const map: Record<string, number> = {};
                    for (const p of pos as any[]) {
                      const dt = p?.keyDates?.issued ? p.keyDates.issued : null;
                      if (!dt || !inRange(dt)) continue;
                      const name = String(p.supplier || "");
                      if (customApprovedOnly && !approvedNames.has(name))
                        continue;
                      const amt = Number(p.total || 0);
                      map[name] = (map[name] || 0) + amt;
                      total += amt;
                    }
                    for (const i of invs as any[]) {
                      const dt = i?.invoiceDate ? i.invoiceDate : null;
                      if (!dt || !inRange(dt)) continue;
                      const name = String(i.supplier || "");
                      if (customApprovedOnly && !approvedNames.has(name))
                        continue;
                      const amt = Number(i.amount || 0);
                      map[name] = (map[name] || 0) + amt;
                      total += amt;
                    }
                    items = Object.entries(map)
                      .map(([label, amount]) => ({ label, amount }))
                      .sort((a, b) => b.amount - a.amount)
                      .slice(0, 10);
                  } else if (customDim === "category") {
                    const map: Record<string, number> = {};
                    for (const r of reqs as any[]) {
                      const dt = r?.date || r?.createdAt || null;
                      if (!dt || !inRange(dt)) continue;
                      const cat = String(r.category || "Uncategorized");
                      const amt = Number(r.amount || 0);
                      map[cat] = (map[cat] || 0) + amt;
                      total += amt;
                    }
                    items = Object.entries(map)
                      .map(([label, amount]) => ({ label, amount }))
                      .sort((a, b) => b.amount - a.amount)
                      .slice(0, 10);
                  } else {
                    const map: Record<string, number> = {};
                    for (const r of reqs as any[]) {
                      const dt = r?.date || r?.createdAt || null;
                      if (!dt || !inRange(dt)) continue;
                      const cc = String(r.costCenter || "Unassigned");
                      const amt = Number(r.amount || 0);
                      map[cc] = (map[cc] || 0) + amt;
                      total += amt;
                    }
                    items = Object.entries(map)
                      .map(([label, amount]) => ({ label, amount }))
                      .sort((a, b) => b.amount - a.amount)
                      .slice(0, 10);
                  }
                  setCustomItems(items);
                  setCustomTotal(total);
                  setCustomLoading(false);
                }}
                disabled={customLoading}
              >
                {customLoading ? "Generating..." : "Generate report"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (!customItems.length) return;
                  const headers = ["label", "amount"];
                  const rows = customItems.map((it) => [
                    it.label,
                    String(it.amount),
                  ]);
                  const esc = (v: any) => String(v).replace(/"/g, '""');
                  const csv = [
                    headers.join(","),
                    ...rows.map((r) => r.map(esc).join(",")),
                  ].join("\n");
                  const blob = new Blob([csv], {
                    type: "text/csv;charset=utf-8;",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  const name = `custom-report-${customDim}-${Date.now()}.csv`;
                  a.href = url;
                  a.download = name;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Export as CSV
              </Button>
            </div>
            <div className="mt-4">
              <div className="text-sm text-muted-foreground mb-2">Results</div>
              {customItems.length === 0 ? (
                <div className="text-xs text-muted-foreground">
                  No results. Generate a report to see data.
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm">
                    Total: Nle {fmtAmount(customTotal)}
                  </div>
                  <div className="space-y-2">
                    {customItems.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{it.label}</span>
                        <span className="text-sm font-medium">
                          Nle {fmtAmount(it.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCustomOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <span className="font-medium">NLE (reporting)</span>
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
              <h2 className="text-lg font-medium mb-1">
                Spend & performance overview
              </h2>
              <p className="text-xs text-muted-foreground">
                High-level KPIs for the selected period across all entities.
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              Benchmark vs previous period
            </span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                Total addressable spend
              </div>
              <div className="text-2xl font-semibold mb-1">
                Nle {fmtAmount(totalSpend)}
              </div>
              <div className="text-xs text-success">Data-driven</div>
              <div className="text-xs text-muted-foreground mt-1">
                Includes POs & invoices approved
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                Realized savings
              </div>
              <div className="text-2xl font-semibold mb-1">
                Nle {fmtNLeCompact(savingsThisQ)}
              </div>
              <div className="text-xs text-success">
                {`${(budgetThisQ > 0
                  ? (savingsThisQ / budgetThisQ) * 100
                  : 0
                ).toFixed(1)}% vs budget`}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                From negotiations, rebates & avoided cost
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                On-contract compliance
              </div>
              <div className="text-2xl font-semibold mb-1">
                {compliancePct.toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Based on approved supplier spend
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Spend with approved suppliers & catalogs
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-medium mb-4">Spend by category</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Top 5 categories, filtered by approved suppliers only.
            </p>
            {loading ? (
              <div className="text-xs text-muted-foreground">
                Loading categories...
              </div>
            ) : categoryData.length === 0 ? (
              <div className="text-xs text-muted-foreground">
                No category data found.
              </div>
            ) : (
              <div className="space-y-3">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{item.category}</span>
                    </div>
                    <span className="text-sm font-medium">
                      NLe {fmtAmount(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-medium mb-4">Cycle time & SLA</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Average lead time from requisition to payment.
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">
                    Requisition → PO
                  </span>
                  <span className="text-sm font-medium">
                    {cycleReqToPO.toFixed(1)}d
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground">
                    Data-driven
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">
                    PO → Invoice
                  </span>
                  <span className="text-sm font-medium">
                    {cyclePOToInv.toFixed(1)}d
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Data-driven</div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">
                    Invoice → Payment
                  </span>
                  <span className="text-sm font-medium">
                    {cycleInvToPay.toFixed(1)}d
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Data-driven</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium mb-1">
              Saved & scheduled reports
            </h2>
            <p className="text-xs text-muted-foreground">
              Access recurring reports shared across finance, procurement, and
              leadership.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="p-3 border border-border rounded-lg text-xs text-muted-foreground">
            No saved reports found.
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Tip: Use "Build custom report" to drill into a specific entity,
          category, or supplier cluster.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-sm font-medium mb-4">Recently run reports</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Re-run or export with the same parameters.
        </p>
        <div className="space-y-3">
          <div className="p-3 border border-border rounded-lg text-xs text-muted-foreground">
            No recent reports.
          </div>
        </div>
        <Button variant="link" size="sm" className="mt-4 text-xs">
          View full report catalog
        </Button>
      </div>
    </div>
  );
}
