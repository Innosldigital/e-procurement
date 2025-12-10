"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getSuppliers, getSupplierById } from "@/lib/actions/supplier-actions";
import { SettingsModal } from "@/components/settings-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getSuppliers()
      .then((res: any) => {
        const all = res && res.success ? res.data : [];
        const data = (all || []).filter((s: any) => s && s.approved === true);
        if (!mounted) return;
        setSuppliers(data);
        setSelectedSupplier(data[0] || null);
      })
      .catch(() => {
        if (!mounted) return;
        setSuppliers([]);
        setSelectedSupplier(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const id = selectedSupplier?._id;
    if (!id || selectedSupplier?.approved !== true) {
      setSelectedDetails(null);
      return;
    }
    let mounted = true;
    setDetailsLoading(true);
    getSupplierById(String(id))
      .then((res: any) => {
        const data = res && res.success ? res.data : selectedSupplier;
        if (!mounted) return;
        setSelectedDetails(data);
      })
      .catch(() => {
        if (!mounted) return;
        setSelectedDetails(selectedSupplier);
      })
      .finally(() => {
        if (!mounted) return;
        setDetailsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [selectedSupplier]);

  const segments = Array.from(
    new Set((suppliers || []).map((s: any) => s?.segment).filter(Boolean))
  );
  const categories = Array.from(
    new Set(
      (suppliers || [])
        .map((s: any) => s?.primaryCategory || s?.category)
        .filter(Boolean)
    )
  );
  const regions = Array.from(
    new Set((suppliers || []).map((s: any) => s?.region).filter(Boolean))
  );
  const risks = Array.from(
    new Set(
      (suppliers || [])
        .map((s: any) => s?.risk || s?.riskStatus || s?.riskRating)
        .filter(Boolean)
    )
  );
  const strategicCount = (suppliers || []).filter(
    (s: any) => String(s?.segment || "").toLowerCase() === "strategic"
  ).length;
  const watchlistCount = (suppliers || []).filter((s: any) => {
    const r = String(
      s?.risk || s?.riskStatus || s?.riskRating || ""
    ).toLowerCase();
    return (
      r.includes("high") ||
      r.includes("under review") ||
      r.includes("watchlist")
    );
  }).length;

  const visibleSuppliers = (suppliers || []).filter((s: any) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const name = String(s?.name || "").toLowerCase();
    const id = String(s?.supplierId || "").toLowerCase();
    return name.includes(q) || id.includes(q);
  });

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-1">Suppliers</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Manage strategic vendors, performance, and risk across your supplier
            base.
          </p>
        </div>
        <div className="flex gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={() => setSettingsOpen(true)}
          >
            Supplier settings
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Segment:</span>
              <Badge variant="secondary" className="text-xs">
                {segments.length > 0 ? segments.join(", ") : "-"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Category:</span>
              <Badge variant="secondary" className="text-xs">
                {categories.length > 0 ? categories.join(", ") : "-"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Region:</span>
              <Badge variant="secondary" className="text-xs">
                {regions.length > 0 ? regions.join(", ") : "-"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Risk:</span>
              <Badge variant="secondary" className="text-xs">
                {risks.length > 0 ? risks.join(", ") : "-"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{suppliers.length} active suppliers</span>
            <span>{strategicCount} strategic</span>
            <span>{watchlistCount} on watchlist</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
        <Card className="xl:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Supplier directory</CardTitle>
              <span className="text-xs text-muted-foreground">
                Sorted by spend (FY24)
              </span>
            </div>
            <CardDescription className="text-xs">
              Select a supplier to view performance and compliance details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search by supplier name, ID, category..."
              className="mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="space-y-1">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Loading suppliers...
                </div>
              ) : suppliers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No suppliers found. Connect to MongoDB to see data.
                </div>
              ) : visibleSuppliers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No suppliers match your search.
                </div>
              ) : (
                visibleSuppliers.map((supplier: any) => (
                  <button
                    key={supplier._id}
                    onClick={() => setSelectedSupplier(supplier)}
                    className={`w-full text-left p-3 rounded-lg hover:bg-accent cursor-pointer border transition-colors ${
                      selectedSupplier?._id === supplier._id
                        ? "bg-accent border-border"
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">
                          {supplier.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {supplier.supplierId}
                        </div>
                      </div>
                      <StatusBadge
                        status={supplier.risk || supplier.riskStatus}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>
                          {supplier.primaryCategory || supplier.category}
                        </span>
                        <span>•</span>
                        <span>
                          Score:{" "}
                          {supplier.performanceScore != null
                            ? supplier.performanceScore
                            : 0}
                          /100
                        </span>
                      </div>
                      <span className="font-medium">
                        ${supplier.fy24Spend?.toLocaleString() || "0"}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-4 px-3">
              Tip: Change "Segment" to see all suppliers and identify
              consolidation opportunities.
            </p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-7">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-base">
                    {selectedDetails?.name || "Select a supplier"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <StatusBadge
                      status={selectedDetails?.segment || "Strategic"}
                    />
                    <Badge
                      variant="outline"
                      className="text-xs bg-success/10 border-success/30"
                    >
                      Performance score:{" "}
                      {selectedDetails?.performanceScore ?? 0} / 100
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Supplier ID: {selectedDetails?.supplierId || ""}</span>
                  <span>Segment: {selectedDetails?.segment || ""}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <StatusBadge
                  status={
                    selectedDetails?.risk ||
                    selectedDetails?.riskStatus ||
                    "Low"
                  }
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {detailsLoading && (
              <div className="text-xs text-muted-foreground mb-4">
                Loading details...
              </div>
            )}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">
                  Overview & commercial profile
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Summary
                    </h4>
                    <p className="text-xs">
                      {selectedDetails?.onboarding?.goodsType || ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Primary category
                    </h4>
                    <p className="text-xs">
                      {selectedDetails?.primaryCategory ||
                        selectedDetails?.category ||
                        ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Region
                    </h4>
                    <p className="text-xs">{selectedDetails?.region || ""}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Contract status
                    </h4>
                    <p className="text-xs text-success">
                      {selectedDetails?.commercialTerms?.paymentTerms ||
                        "Payment terms not set"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    Commercial terms
                  </h4>
                  <p className="text-xs">
                    {selectedDetails?.commercialTerms?.paymentTerms || ""}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    Diversity & ESG
                  </h4>
                  <p className="text-xs">
                    {selectedDetails?.commercialTerms?.diversityStatus || ""}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Supplier Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Primary contact
                    </h4>
                    <p className="text-xs">
                      {selectedDetails?.onboarding?.contactPerson || ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Contact email
                    </h4>
                    <p className="text-xs">
                      {selectedDetails?.onboarding?.email || ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Contact phone
                    </h4>
                    <p className="text-xs">
                      {selectedDetails?.onboarding?.phone || ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Goods type
                    </h4>
                    <p className="text-xs">
                      {selectedDetails?.onboarding?.goodsType || ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Delivery timeline
                    </h4>
                    <p className="text-xs">
                      {selectedDetails?.onboarding?.deliveryTimeline || ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Product categories
                    </h4>
                    <p className="text-xs">
                      {(selectedDetails?.onboarding?.productCategories || [])
                        .length > 0
                        ? (
                            selectedDetails?.onboarding?.productCategories || []
                          ).join(", ")
                        : ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Supply areas
                    </h4>
                    <p className="text-xs">
                      {(selectedDetails?.onboarding?.supplyAreas || []).length >
                      0
                        ? (selectedDetails?.onboarding?.supplyAreas || []).join(
                            ", "
                          )
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Payment methods
                    </h4>
                    <p className="text-xs">
                      {(selectedDetails?.onboarding?.paymentMethods || [])
                        .length > 0
                        ? (
                            selectedDetails?.onboarding?.paymentMethods || []
                          ).join(", ")
                        : ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Bank details
                    </h4>
                    <p className="text-xs">
                      {selectedDetails?.onboarding?.bankDetails?.bankName || ""}
                      {selectedDetails?.onboarding?.bankDetails?.accountName
                        ? ` • ${selectedDetails?.onboarding?.bankDetails?.accountName}`
                        : ""}
                      {selectedDetails?.onboarding?.bankDetails?.accountNumber
                        ? ` • ${selectedDetails?.onboarding?.bankDetails?.accountNumber}`
                        : ""}
                      {typeof selectedDetails?.onboarding?.bankDetails
                        ?.prefersCash === "boolean"
                        ? ` • Prefers cash: ${
                            selectedDetails?.onboarding?.bankDetails
                              ?.prefersCash
                              ? "Yes"
                              : "No"
                          }`
                        : ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Declarations
                    </h4>
                    <p className="text-xs">
                      {typeof selectedDetails?.onboarding?.declarations
                        ?.infoAccurate === "boolean"
                        ? `Info accurate: ${
                            selectedDetails?.onboarding?.declarations
                              ?.infoAccurate
                              ? "Yes"
                              : "No"
                          }`
                        : ""}
                      {typeof selectedDetails?.onboarding?.declarations
                        ?.agreeRules === "boolean"
                        ? ` • Agreed to rules: ${
                            selectedDetails?.onboarding?.declarations
                              ?.agreeRules
                              ? "Yes"
                              : "No"
                          }`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Performance & risk</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Delivery performance
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>On-time:</span>
                        <span className="font-medium">
                          {selectedDetails?.performanceMetrics
                            ?.deliveryPerformance?.onTime ?? 0}
                          %
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Avg. lead time:</span>
                        <span className="font-medium">
                          {selectedDetails?.performanceMetrics
                            ?.deliveryPerformance?.avgLeadTime ?? 0}{" "}
                          days
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Late deliveries &gt; 5 days:</span>
                        <span className="text-warning">
                          {selectedDetails?.performanceMetrics
                            ?.deliveryPerformance?.lateDeliveries ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Quality & issues
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>Return rate:</span>
                        <span className="font-medium">
                          {selectedDetails?.performanceMetrics?.qualityMetrics
                            ?.returnRate ?? 0}
                          %
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Quality incidents YTD:</span>
                        <span className="font-medium">
                          {selectedDetails?.performanceMetrics?.qualityMetrics
                            ?.qualityIncidents ?? 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>No critical safety events:</span>
                        <span className="text-success">
                          {Number(
                            selectedDetails?.performanceMetrics?.qualityMetrics
                              ?.criticalEvents || 0
                          ) === 0
                            ? "No critical safety events"
                            : `${selectedDetails?.performanceMetrics?.qualityMetrics?.criticalEvents} critical events`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Financial & credit risk
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>External rating:</span>
                        <span className="font-medium">
                          {selectedDetails?.performanceMetrics?.financialMetrics
                            ?.externalRating || ""}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>No overdue invoices &gt; 30 days:</span>
                        <span className="font-medium">
                          {selectedDetails?.performanceMetrics?.financialMetrics
                            ?.overdueInvoices === false
                            ? "No overdue invoices"
                            : selectedDetails?.performanceMetrics
                                ?.financialMetrics?.overdueInvoices === true
                            ? "Overdue invoices present"
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Credit limit:</span>
                        <span className="font-medium">
                          $
                          {selectedDetails?.performanceMetrics?.financialMetrics?.creditLimit?.toLocaleString() ||
                            "0"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Compliance status
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>KYC / AML cleared:</span>
                        <span className="font-medium">
                          {selectedDetails?.performanceMetrics?.complianceStatus
                            ?.kyc || ""}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Insurance certificates up to date:</span>
                        <span className="font-medium">
                          {selectedDetails?.performanceMetrics?.complianceStatus
                            ?.insuranceCerts
                            ? "Insurance certificates up to date"
                            : "Insurance certificates missing"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sanctions & watchlist:</span>
                        <span className="text-success">
                          {selectedDetails?.performanceMetrics?.complianceStatus
                            ?.sanctions || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Primary contacts</h3>
                <div className="space-y-3 text-xs">
                  {(selectedDetails?.contacts || []).length === 0 ? (
                    <div className="text-muted-foreground">
                      No contacts listed
                    </div>
                  ) : (
                    (selectedDetails?.contacts || []).map(
                      (c: any, i: number) => (
                        <div key={i}>
                          <div className="font-medium">
                            {c.role || "Contact"}
                          </div>
                          <div className="text-muted-foreground">
                            {c.name || ""} • {c.email || ""} • {c.phone || ""}
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Key documents</h3>
                  <Dialog open={docsOpen} onOpenChange={setDocsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-xs h-auto p-0"
                      >
                        View all
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Supplier documents</DialogTitle>
                        <DialogDescription>
                          All uploaded and attached documents.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 text-xs">
                        {(() => {
                          const o = selectedDetails?.onboarding || {};
                          const uploads = [
                            ...(o.priceListUploads || []),
                            ...(o.registrationCertificateUploads || []),
                            ...(o.businessRegistrationCertificateUploads || []),
                            ...(o.taxClearanceCertificateUploads || []),
                            ...(o.gstVatRegistrationCertificateUploads || []),
                            ...(o.businessLicenseUploads || []),
                            ...(o.nassitCertificateUploads || []),
                            ...(o.sectorSpecificCertificateUploads || []),
                          ];
                          const docs = selectedDetails?.documents || [];
                          const empty =
                            uploads.length === 0 && docs.length === 0;
                          if (empty) {
                            return (
                              <div className="text-muted-foreground">
                                No documents available
                              </div>
                            );
                          }
                          return (
                            <div className="space-y-2">
                              {uploads.map((d: any, i: number) => (
                                <div
                                  key={`up-modal-${i}`}
                                  className="flex items-center justify-between p-2 rounded border"
                                >
                                  {d.url ? (
                                    <a
                                      href={d.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-medium hover:underline break-all"
                                    >
                                      {d.name || "Document"}
                                    </a>
                                  ) : (
                                    <span className="font-medium break-all">
                                      {d.name || "Document"}
                                    </span>
                                  )}
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <span>
                                      {d.type || ""} • {d.size || ""}
                                    </span>
                                  </div>
                                </div>
                              ))}
                              {docs.map((d: any, i: number) => (
                                <div
                                  key={`doc-modal-${i}`}
                                  className="flex items-center justify-between p-2 rounded border"
                                >
                                  <span className="font-medium">
                                    {d.name || "Document"}
                                  </span>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <span>
                                      {d.type || ""} • {d.size || ""}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-2 text-xs">
                  {(() => {
                    const o = selectedDetails?.onboarding || {};
                    const uploads = [
                      ...(o.priceListUploads || []),
                      ...(o.registrationCertificateUploads || []),
                      ...(o.businessRegistrationCertificateUploads || []),
                      ...(o.taxClearanceCertificateUploads || []),
                      ...(o.gstVatRegistrationCertificateUploads || []),
                      ...(o.businessLicenseUploads || []),
                      ...(o.nassitCertificateUploads || []),
                      ...(o.sectorSpecificCertificateUploads || []),
                    ];
                    const docs = selectedDetails?.documents || [];
                    const empty = uploads.length === 0 && docs.length === 0;
                    if (empty) {
                      return (
                        <div className="text-muted-foreground">
                          No documents available
                        </div>
                      );
                    }
                    return (
                      <>
                        {uploads.map((d: any, i: number) => (
                          <div
                            key={`up-${i}`}
                            className="flex items-center justify-between p-2 rounded border"
                          >
                            <a
                              href={d.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium hover:underline break-all"
                            >
                              {d.name || "Document"}
                            </a>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>
                                {d.type || ""} • {d.size || ""}
                              </span>
                            </div>
                          </div>
                        ))}
                        {docs.map((d: any, i: number) => (
                          <div
                            key={`doc-${i}`}
                            className="flex items-center justify-between p-2 rounded border"
                          >
                            <span className="font-medium">
                              {d.name || "Document"}
                            </span>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>
                                {d.type || ""} • {d.size || ""}
                              </span>
                            </div>
                          </div>
                        ))}
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Recent activity</h3>
                <div className="space-y-2 text-xs">
                  {(selectedDetails?.recentActivity || []).length === 0 ? (
                    <div className="text-muted-foreground">
                      No recent activity
                    </div>
                  ) : (
                    (selectedDetails?.recentActivity || []).map(
                      (a: any, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                          <div>
                            <div className="font-medium">
                              {a.event || "Activity"}
                            </div>
                            <div className="text-muted-foreground">
                              {a.date || ""} • Owner: {a.owner || ""}
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Next actions</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit supplier profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage contracts
                  </Button>
                  <Button size="sm">Mark as preferred</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
