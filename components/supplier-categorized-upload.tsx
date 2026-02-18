"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle2, FileText } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { addSupplierOnboardingUploads } from "@/lib/actions/supplier-actions";
import { useRouter } from "next/navigation";

type UploadFieldKey =
  | "businessRegistrationCertificateUploads"
  | "taxClearanceCertificateUploads"
  | "gstVatRegistrationCertificateUploads"
  | "businessLicenseUploads"
  | "nassitCertificateUploads"
  | "sectorSpecificCertificateUploads"
  | "businessDurationDocuments";

const LABELS: Record<UploadFieldKey, string> = {
  businessRegistrationCertificateUploads: "Business Registration Certificate",
  taxClearanceCertificateUploads: "Tax Clearance Certificate",
  gstVatRegistrationCertificateUploads: "GST/VAT Registration Certificate",
  businessLicenseUploads: "Business License",
  nassitCertificateUploads: "NASSIT Certificate",
  sectorSpecificCertificateUploads: "Sector-Specific Certificate",
  businessDurationDocuments: "Business Duration Documents",
};

export function SupplierCategorizedUpload({
  supplierId,
}: {
  supplierId: string;
}) {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const MAX_SIZE = 20 * 1024 * 1024;

  const [filesByKey, setFilesByKey] = useState<
    Record<UploadFieldKey, FileList | null>
  >({
    businessRegistrationCertificateUploads: null,
    taxClearanceCertificateUploads: null,
    gstVatRegistrationCertificateUploads: null,
    businessLicenseUploads: null,
    nassitCertificateUploads: null,
    sectorSpecificCertificateUploads: null,
    businessDurationDocuments: null,
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const setFiles = (key: UploadFieldKey, fl: FileList | null) =>
    setFilesByKey((prev) => ({ ...prev, [key]: fl }));

  const validateFiles = (fl: FileList | null) => {
    if (!fl || fl.length === 0)
      return { valid: [] as File[], errors: [] as string[] };
    const valid: File[] = [];
    const errors: string[] = [];
    for (const f of Array.from(fl)) {
      const isAllowedType =
        f.type === "application/pdf" || f.type.startsWith("image/");
      const withinLimit = f.size <= MAX_SIZE;
      if (isAllowedType && withinLimit) {
        valid.push(f);
      } else {
        const reasons = [
          !isAllowedType ? "unsupported type" : null,
          !withinLimit ? "exceeds 20MB" : null,
        ]
          .filter(Boolean)
          .join(", ");
        errors.push(`${f.name} (${reasons})`);
      }
    }
    return { valid, errors };
  };

  const doEdgestoreUploads = async (files: File[]) => {
    if (!files || files.length === 0) return [];
    const uploads: Array<{
      name: string;
      type: string;
      size: number;
      url: string;
    }> = [];
    for (const file of files) {
      try {
        const res = await edgestore.publicFiles.upload({ file });
        uploads.push({
          name: file.name,
          type: file.type,
          size: file.size,
          url: res.url,
        });
      } catch {}
    }
    return uploads;
  };

  const handleUploadAll = async () => {
    setUploading(true);
    setMessage(null);
    try {
      let totalUploaded = 0;
      let totalInvalid = 0;
      let totalFailed = 0;
      for (const key of Object.keys(filesByKey) as UploadFieldKey[]) {
        const fl = filesByKey[key];
        if (!fl || fl.length === 0) continue;
        const { valid, errors } = validateFiles(fl);
        totalInvalid += errors.length;
        const uploads = await doEdgestoreUploads(valid);
        if (uploads.length === 0) continue;
        const res = await addSupplierOnboardingUploads(
          supplierId,
          key,
          uploads
        );
        if (!res || !res.success) {
          totalFailed += uploads.length;
          continue;
        }
        totalUploaded += uploads.length;
      }
      if (totalUploaded > 0 || totalInvalid > 0 || totalFailed > 0) {
        const parts = [];
        if (totalUploaded > 0) parts.push(`Uploaded ${totalUploaded}`);
        if (totalInvalid > 0) parts.push(`Skipped ${totalInvalid} invalid`);
        if (totalFailed > 0) parts.push(`Failed ${totalFailed}`);
        setMessage(`${parts.join("; ")} document(s)`);
        setFilesByKey({
          businessRegistrationCertificateUploads: null,
          taxClearanceCertificateUploads: null,
          gstVatRegistrationCertificateUploads: null,
          businessLicenseUploads: null,
          nassitCertificateUploads: null,
          sectorSpecificCertificateUploads: null,
          businessDurationDocuments: null,
        });
        router.refresh();
      } else {
        setMessage("No files selected");
      }
    } catch {
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {(Object.keys(LABELS) as UploadFieldKey[]).map((key) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={`file-${key}`} className="text-xs">
            <span className="inline-flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              {LABELS[key]}
            </span>
          </Label>
          <div className="flex items-center gap-3 p-3 border border-dashed rounded-md">
            <Upload className="h-4 w-4 text-muted-foreground" />
            <Input
              id={`file-${key}`}
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={(e) => setFiles(key, e.target.files)}
              className="border-0 p-0 h-auto text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={handleUploadAll}
          disabled={
            uploading ||
            !Object.values(filesByKey).some((fl) => fl && fl.length > 0)
          }
        >
          {uploading ? "Uploading..." : "Upload Selected"}
        </Button>
        {message && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
