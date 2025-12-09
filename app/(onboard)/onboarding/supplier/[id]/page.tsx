import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupplierById } from "@/lib/actions/supplier-actions";

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
              The requested supplier could not be retrieved.
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a href="/suppliers">Back to suppliers</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const s: any = res.data;
  const o: any = s.onboarding || {};

  // Since uploads are now just URL strings, we need to create objects for display
  const createUploadObjects = (urls: string[] | undefined, label: string) => {
    if (!urls || !Array.isArray(urls)) return [];
    return urls.map((url, idx) => {
      const fileName = url.split("/").pop() || `${label}-${idx + 1}`;
      const extension = fileName.split(".").pop()?.toLowerCase() || "";
      const type =
        extension === "pdf" ? "application/pdf" : `image/${extension}`;
      return {
        url,
        name: decodeURIComponent(fileName),
        type,
        size: "",
      };
    });
  };

  const uploads = [
    ...createUploadObjects(o.priceListUploads, "Price List"),
    ...createUploadObjects(
      o.businessRegistrationCertificateUploads,
      "Business Registration"
    ),
    ...createUploadObjects(o.taxClearanceCertificateUploads, "Tax Clearance"),
    ...createUploadObjects(o.gstVatRegistrationCertificateUploads, "GST/VAT"),
    ...createUploadObjects(o.businessLicenseUploads, "Business License"),
    ...createUploadObjects(o.nassitCertificateUploads, "NASSIT"),
    ...createUploadObjects(
      o.sectorSpecificCertificateUploads,
      "Sector Certificate"
    ),
    ...createUploadObjects(o.businessDurationDocuments, "Business Duration"),
  ];

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">{s.name}</h1>
          <div className="mt-1 text-xs text-muted-foreground">
            {(s.segment || "").trim() || "Standard"} •{" "}
            {(s.category || "").trim() || "General"} •{" "}
            {(s.region || "").trim() || "Global"}
          </div>
        </div>
        <StatusBadge status={s.approved ? "Approved" : "Pending approval"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Supplier Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <span className="font-medium">Primary Contact</span>
            <div className="sm:col-span-2 text-muted-foreground space-y-1">
              <div>{o.contactPerson || ""}</div>
              <div>{o.phone || ""}</div>
              <div className="break-all">{o.email || ""}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <span className="font-medium">Goods Type</span>
            <div className="sm:col-span-2 text-muted-foreground">
              {o.goodsType || ""}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <span className="font-medium">Product Categories</span>
            <div className="sm:col-span-2 text-muted-foreground break-words">
              {Array.isArray(o.productCategories)
                ? o.productCategories.join(", ")
                : ""}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <span className="font-medium">Supply Areas</span>
            <div className="sm:col-span-2 text-muted-foreground break-words">
              {Array.isArray(o.supplyAreas) ? o.supplyAreas.join(", ") : ""}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <span className="font-medium">Delivery Timeline</span>
            <div className="sm:col-span-2 text-muted-foreground">
              {o.deliveryTimeline || ""}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <span className="font-medium">Payment Methods</span>
            <div className="sm:col-span-2 text-muted-foreground break-words">
              {Array.isArray(o.paymentMethods)
                ? o.paymentMethods.join(", ")
                : ""}
            </div>
          </div>
          {o.vendorPaymentTerms && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Payment Terms</span>
              <div className="sm:col-span-2 text-muted-foreground break-words">
                {o.vendorPaymentTerms}
              </div>
            </div>
          )}
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {o.dateOfIncorporation && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Date of Incorporation</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {new Date(o.dateOfIncorporation).toLocaleDateString()}
              </div>
            </div>
          )}
          {o.businessLeadGender && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">Business Lead Gender</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {o.businessLeadGender}
              </div>
            </div>
          )}
          {o.inBusinessMoreThan3Years !== undefined && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <span className="font-medium">In Business 3+ Years</span>
              <div className="sm:col-span-2 text-muted-foreground">
                {o.inBusinessMoreThan3Years ? "Yes" : "No"}
              </div>
            </div>
          )}
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Onboarding Documents</CardTitle>
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
                    className="text-sm font-medium hover:underline break-all flex-1"
                  >
                    {d.name || "Document"}
                  </a>
                  <div className="text-xs text-muted-foreground ml-4">
                    {d.type?.split("/")[1]?.toUpperCase() || "FILE"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <a href="/onboarding">Back to onboarding</a>
        </Button>
      </div>
    </div>
  );
}
