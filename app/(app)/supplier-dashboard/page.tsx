"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { getSuppliers, getSupplierById } from "@/lib/actions/supplier-actions";
import {
  FileText,
  TrendingUp,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Award,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function SupplierDashboardPage() {
  const { user } = useUser();
  const currentUserId =
    String(user?.id || "").trim() || String((user as any)?.id || "");
  const [supplier, setSupplier] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const res = await getSuppliers();
      const all = res && res.success ? res.data : [];
      const mine = (all || []).find(
        (s: any) => String(s?.ownerUserId || "") === currentUserId
      );
      if (!mounted) return;
      if (mine?._id) {
        const detailed = await getSupplierById(String(mine._id));
        setSupplier(
          detailed && (detailed as any).success
            ? (detailed as any).data
            : mine || null
        );
      } else {
        setSupplier(null);
      }
      setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [currentUserId]);

  const o: any = supplier?.onboarding || {};
  const uploads: Array<any> = [
    ...(o.priceListUploads || []),
    ...(o.registrationCertificateUploads || []),
    ...(o.businessRegistrationCertificateUploads || []),
    ...(o.taxClearanceCertificateUploads || []),
    ...(o.gstVatRegistrationCertificateUploads || []),
    ...(o.businessLicenseUploads || []),
    ...(o.nassitCertificateUploads || []),
    ...(o.sectorSpecificCertificateUploads || []),
  ];
  const docs: Array<any> = (supplier?.documents || []) as any[];

  // Performance metrics
  const performanceScore = supplier?.performanceScore || 0;
  const onTimeDelivery =
    supplier?.performanceMetrics?.deliveryPerformance?.onTime || 0;
  const qualityIncidents =
    supplier?.performanceMetrics?.qualityMetrics?.qualityIncidents ?? 0;
  const returnRate =
    supplier?.performanceMetrics?.qualityMetrics?.returnRate ?? 0;
  const criticalEvents =
    supplier?.performanceMetrics?.qualityMetrics?.criticalEvents ?? 0;
  const qualityScore = Math.max(
    0,
    Math.min(100, 100 - returnRate - qualityIncidents * 2 - criticalEvents * 5)
  );
  const totalDocs = uploads.length + docs.length;

  return (
    <div className="min-h-screen">
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Welcome back{supplier?.name ? `, ${supplier.name}` : ""}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Here's an overview of your supplier profile and performance
              </p>
            </div>
            {supplier?._id && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/suppliers/${supplier._id}/edit`}>Edit Profile</a>
                </Button>
                <Button size="sm" asChild>
                  <a href="/tenders">Browse Tenders</a>
                </Button>
              </div>
            )}
          </div>

          {loading ? (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">
                  Loading your dashboard...
                </p>
              </div>
            </Card>
          ) : !supplier ? (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    No Supplier Profile Found
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We couldn't find a supplier profile associated with your
                    account.
                  </p>
                  <Button size="sm">Contact Support</Button>
                </div>
              </div>
            </Card>
          ) : (
            <>
              {/* Key Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Performance Score
                        </p>
                        <p className="text-2xl font-bold">
                          {performanceScore}
                          <span className="text-lg text-muted-foreground">
                            /100
                          </span>
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          On-Time Delivery
                        </p>
                        <p className="text-2xl font-bold">
                          {onTimeDelivery}
                          <span className="text-lg text-muted-foreground">
                            %
                          </span>
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Quality Rating
                        </p>
                        <p className="text-2xl font-bold">
                          {qualityScore.toFixed(0)}
                          <span className="text-lg text-muted-foreground">
                            %
                          </span>
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Documents
                        </p>
                        <p className="text-2xl font-bold">{totalDocs}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-orange-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column - Profile Details */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Company Profile Card */}
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Company Profile
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="bg-primary/5 border-primary/20"
                        >
                          {supplier.supplierId || "N/A"}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">
                        Your registered supplier information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="pb-4 border-b">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-base font-semibold mb-1">
                              {supplier.name || "Supplier Name"}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {supplier.category ||
                                supplier.primaryCategory ||
                                "Category"}{" "}
                              • {supplier.region || "Region"}
                            </p>
                          </div>
                          <StatusBadge
                            status={
                              supplier.risk || supplier.riskStatus || "Low"
                            }
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {supplier.segment || "Standard"}
                          </Badge>
                          {supplier.approved && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-success/10 border-success/30 text-success"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approved
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">
                              Email Address
                            </p>
                            <p className="text-sm font-medium truncate">
                              {o.email || "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">
                              Phone Number
                            </p>
                            <p className="text-sm font-medium">
                              {o.phone || "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">
                              Goods & Services
                            </p>
                            <p className="text-sm font-medium">
                              {o.goodsType || "Not specified"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">
                              Primary Contact
                            </p>
                            <p className="text-sm font-medium">
                              {o.contactPerson || "Not assigned"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Quick Actions</CardTitle>
                      <CardDescription className="text-xs">
                        Manage your supplier activities
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="sm"
                        asChild
                      >
                        <a href="/tenders">
                          <Package className="w-4 h-4 mr-2" />
                          View Active Tenders
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="sm"
                        asChild
                      >
                        <a href="/purchase-orders">
                          <FileText className="w-4 h-4 mr-2" />
                          My Purchase Orders
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="sm"
                        asChild
                      >
                        <a href="/invoices">
                          <DollarSign className="w-4 h-4 mr-2" />
                          View Invoices
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="sm"
                        asChild
                      >
                        <a href={`/suppliers/${supplier._id}/edit`}>
                          <Award className="w-4 h-4 mr-2" />
                          Update Profile
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Documents */}
                <div className="lg:col-span-7">
                  <Card className="h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            Compliance Documents
                          </CardTitle>
                          <CardDescription className="text-xs mt-1">
                            All uploaded certificates and registrations
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {totalDocs} Files
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {uploads.length === 0 && docs.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                              <FileText className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-sm font-semibold mb-2">
                              No Documents Available
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4 max-w-sm">
                              Upload compliance documents to maintain your
                              supplier status and improve your profile.
                            </p>
                            <Button size="sm" variant="outline" asChild>
                              <a href={`/suppliers/${supplier._id}/edit`}>
                                Upload Documents
                              </a>
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                            {uploads.map((d: any, i: number) => (
                              <div
                                key={`up-${i}`}
                                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 text-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <a
                                      href={d.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      download
                                      className="text-sm font-medium hover:text-primary transition-colors truncate block"
                                    >
                                      {d.name || "Document"}
                                    </a>
                                    <p className="text-xs text-muted-foreground">
                                      {d.type || "File"} •{" "}
                                      {d.size || "Unknown size"}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  asChild
                                >
                                  <a
                                    href={d.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    Download
                                  </a>
                                </Button>
                              </div>
                            ))}
                            {docs.map((d: any, i: number) => (
                              <div
                                key={`doc-${i}`}
                                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 text-blue-500" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    {d.url ? (
                                      <a
                                        href={d.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="text-sm font-medium hover:text-primary transition-colors truncate block"
                                      >
                                        {d.name || "Document"}
                                      </a>
                                    ) : (
                                      <span className="text-sm font-medium truncate block">
                                        {d.name || "Document"}
                                      </span>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                      {d.type || "File"} •{" "}
                                      {d.size || "Unknown size"}
                                    </p>
                                  </div>
                                </div>
                                {d.url && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    asChild
                                  >
                                    <a
                                      href={d.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      download
                                    >
                                      Download
                                    </a>
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
