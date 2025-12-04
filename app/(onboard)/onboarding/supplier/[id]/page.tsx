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
            <span className="font-medium">Payment & Bank</span>
            <div className="sm:col-span-2 text-muted-foreground space-y-1">
              <div className="break-words">
                {Array.isArray(o.paymentMethods)
                  ? o.paymentMethods.join(", ")
                  : ""}
              </div>
              <div className="break-words">
                {[
                  o.bankDetails?.bankName,
                  o.bankDetails?.accountName,
                  o.bankDetails?.accountNumber,
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </div>
            </div>
          </div>
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
                  <div className="text-xs text-muted-foreground">
                    {d.type || ""} • {d.size || ""}
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
