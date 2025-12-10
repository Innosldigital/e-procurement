import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupplierById } from "@/lib/actions/supplier-actions";
import { FileText, Download } from "lucide-react";

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getSupplierById(id);

  if (!res || !res.success) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Supplier not found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {res?.error || "The requested supplier could not be retrieved."}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" asChild>
                <a href="/suppliers">Back to suppliers</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/onboarding">Go to Onboarding</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const s: any = res.data;
  const o: any = s.onboarding || {};

  // Collect all uploaded documents
  const uploads = [
    ...(o.priceListUploads || []),
    ...(o.registrationCertificateUploads || []),
    ...(o.businessRegistrationCertificateUploads || []),
    ...(o.taxClearanceCertificateUploads || []),
    ...(o.gstVatRegistrationCertificateUploads || []),
    ...(o.businessLicenseUploads || []),
    ...(o.nassitCertificateUploads || []),
    ...(o.sectorSpecificCertificateUploads || []),
    ...(o.businessDurationDocuments || []),
  ];

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">{s.name}</h1>
          <div className="mt-1 text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-2">
            {s.supplierId && (
              <>
                <span>ID: {s.supplierId}</span>
                <span>•</span>
              </>
            )}
            <span>{(s.segment || "").trim() || "Standard"}</span>
            <span>•</span>
            <span>{(s.category || "").trim() || "General"}</span>
            <span>•</span>
            <span>{(s.region || "").trim() || "Global"}</span>
          </div>
        </div>
        <StatusBadge status={s.approved ? "Approved" : "Pending approval"} />
      </div>

      {/* Supplier Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Supplier Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {/* Primary Contact */}
          {(o.contactPerson || o.phone || o.email) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Primary Contact</span>
              <div className="sm:col-span-2 text-muted-foreground space-y-1">
                {o.contactPerson && <div>{o.contactPerson}</div>}
                {o.phone && <div>{o.phone}</div>}
                {o.email && <div className="break-all">{o.email}</div>}
              </div>
            </div>
          )}

          {/* Goods Type */}
          {o.goodsType && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Goods Type</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {o.goodsType}
              </div>
            </div>
          )}

          {/* Product Categories */}
          {o.productCategories &&
            Array.isArray(o.productCategories) &&
            o.productCategories.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <span className="font-medium">Product Categories</span>
                <div className="sm:col-span-2 text-muted-foreground break-words">
                  {o.productCategories.join(", ")}
                </div>
              </div>
            )}

          {/* Supply Areas */}
          {o.supplyAreas &&
            Array.isArray(o.supplyAreas) &&
            o.supplyAreas.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <span className="font-medium">Supply Areas</span>
                <div className="sm:col-span-2 text-muted-foreground break-words">
                  {o.supplyAreas.join(", ")}
                </div>
              </div>
            )}

          {/* Delivery Timeline */}
          {o.deliveryTimeline && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Delivery Timeline</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {o.deliveryTimeline}
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {o.paymentMethods &&
            Array.isArray(o.paymentMethods) &&
            o.paymentMethods.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <span className="font-medium">Payment Methods</span>
                <div className="sm:col-span-2 text-muted-foreground break-words">
                  {o.paymentMethods.join(", ")}
                </div>
              </div>
            )}

          {/* Vendor Payment Terms */}
          {o.vendorPaymentTerms && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Payment Terms</span>
              <div className="sm:col-span-2 text-muted-foreground break-words">
                {o.vendorPaymentTerms}
              </div>
            </div>
          )}

          {/* Bank Details */}
          {o.bankDetails &&
            (o.bankDetails.bankName || o.bankDetails.accountName) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <span className="font-medium">Bank Details</span>
                <div className="sm:col-span-2 text-muted-foreground space-y-1">
                  {o.bankDetails.bankName && (
                    <div>{o.bankDetails.bankName}</div>
                  )}
                  {o.bankDetails.accountName && (
                    <div>{o.bankDetails.accountName}</div>
                  )}
                  {o.bankDetails.accountNumber && (
                    <div>{o.bankDetails.accountNumber}</div>
                  )}
                </div>
              </div>
            )}
        </CardContent>
      </Card>

      {/* Business Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {/* Date of Incorporation */}
          {o.dateOfIncorporation && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Date of Incorporation</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {new Date(o.dateOfIncorporation).toLocaleDateString()}
              </div>
            </div>
          )}

          {/* Business Lead Gender */}
          {o.businessLeadGender && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Business Lead Gender</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {o.businessLeadGender}
              </div>
            </div>
          )}

          {/* In Business 3+ Years */}
          {o.inBusinessMoreThan3Years !== undefined && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">In Business 3+ Years</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {o.inBusinessMoreThan3Years ? "Yes" : "No"}
              </div>
            </div>
          )}

          {/* Average Turnover */}
          {o.averageTurnover && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Average Turnover (2 Years)</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {o.averageTurnover}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Onboarding Documents Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Onboarding Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {uploads.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No documents available
            </div>
          ) : (
            <div className="space-y-2">
              {uploads.map((d: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline break-all flex-1 flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    {d.name || "Document"}
                  </a>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="text-xs text-muted-foreground">
                      {(d.type || "").split("/")[1]?.toUpperCase() || "FILE"}
                    </div>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Declarations */}
      {o.declarations &&
        (o.declarations.infoAccurate || o.declarations.agreeRules) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Declarations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {o.declarations.infoAccurate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Information accuracy confirmed
                </div>
              )}
              {o.declarations.agreeRules && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Agreed to platform rules and regulations
                </div>
              )}
            </CardContent>
          </Card>
        )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" asChild>
          <a href="/onboarding/pending-approval">Back</a>
        </Button>
      </div>
    </div>
  );
}
