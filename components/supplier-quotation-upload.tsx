"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle2, FileText } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { addRequisitionAttachments } from "@/lib/actions/requisition-actions";

type RequisitionLite = {
  requisitionId: string;
  amount?: number;
  requester?: string;
  date?: string | Date;
};

export function SupplierQuotationUpload({
  requisitions,
}: {
  requisitions: RequisitionLite[];
}) {
  const { edgestore } = useEdgeStore();
  const [selectedReq, setSelectedReq] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const MAX_SIZE = 20 * 1024 * 1024;

  const options = useMemo(
    () =>
      (requisitions || []).map((r) => {
        const amt = r.amount ? ` • $${Number(r.amount).toLocaleString()}` : "";
        const who = r.requester ? ` • ${r.requester}` : "";
        return {
          id: r.requisitionId,
          label: `${r.requisitionId}${who}${amt}`,
        };
      }),
    [requisitions]
  );

  function validateFiles(fl: FileList | null) {
    if (!fl || fl.length === 0) return { valid: [] as File[], errors: [] as string[] };
    const valid: File[] = [];
    const errors: string[] = [];
    for (const f of Array.from(fl)) {
      const isAllowedType = f.type === "application/pdf" || f.type.startsWith("image/");
      const withinLimit = f.size <= MAX_SIZE;
      if (isAllowedType && withinLimit) valid.push(f);
      else {
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
  }

  async function doUploads(files: File[]) {
    const uploads: Array<{ name: string; type: string; size: number; url: string }> = [];
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
  }

  async function handleUpload() {
    if (!selectedReq) {
      setMessage("Select a requisition first");
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const { valid, errors } = validateFiles(files);
      const uploads = await doUploads(valid);
      if (uploads.length === 0 && errors.length === 0) {
        setMessage("No files selected");
        return;
      }
      const res = uploads.length
        ? await addRequisitionAttachments(
            selectedReq,
            uploads.map((u) => ({
              name: u.name,
              type: u.type,
              size: u.size,
              url: u.url,
            }))
          )
        : { success: true };
      const parts = [];
      if (uploads.length > 0) parts.push(`Uploaded ${uploads.length}`);
      if (errors.length > 0) parts.push(`Skipped ${errors.length} invalid`);
      if (!res || !res.success) parts.push("Failed to save attachments");
      setMessage(parts.join("; "));
      if (res && res.success) {
        setFiles(null);
      }
    } catch {
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Select Requisition</Label>
        <Select value={selectedReq} onValueChange={setSelectedReq}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose requisition" />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="quotation-files" className="text-xs">
          <span className="inline-flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            Quotation Documents (PDF or Images)
          </span>
        </Label>
        <div className="flex items-center gap-3 p-3 border border-dashed rounded-md">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <Input
            id="quotation-files"
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={(e) => setFiles(e.target.files)}
            className="w-full border-0 p-0 h-auto text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={handleUpload}
          disabled={uploading || !selectedReq || !(files && files.length > 0)}
          className="w-full sm:w-auto"
        >
          {uploading ? "Uploading..." : "Upload to Requisition"}
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

