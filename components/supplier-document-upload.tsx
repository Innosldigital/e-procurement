"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle2 } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { addSupplierDocuments } from "@/lib/actions/supplier-actions";
import { useRouter } from "next/navigation";

export function SupplierDocumentUpload({ supplierId }: { supplierId: string }) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const handleUpload = async () => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setMessage(null);
    try {
      const uploads: Array<{
        name: string;
        type: string;
        size: number;
        url: string;
      }> = [];
      for (const file of Array.from(files)) {
        const res = await edgestore.publicFiles.upload({
          file,
        });
        uploads.push({
          name: file.name,
          type: file.type,
          size: file.size,
          url: res.url,
        });
      }
      const result = await addSupplierDocuments(supplierId, uploads);
      if (result && result.success) {
        setMessage("Documents uploaded successfully");
        setFiles(null);
        router.refresh();
      } else {
        setMessage(result?.error || "Failed to save documents");
      }
    } catch (e: any) {
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="supplier-docs" className="text-xs">
        Upload documents (PDF or images)
      </Label>
      <div className="flex items-center gap-3 p-3 border border-dashed rounded-md">
        <Upload className="h-4 w-4 text-muted-foreground" />
        <Input
          id="supplier-docs"
          type="file"
          multiple
          accept="image/*,application/pdf"
          onChange={(e) => setFiles(e.target.files)}
          className="border-0 p-0 h-auto text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={handleUpload}
          disabled={uploading || !files || files.length === 0}
        >
          {uploading ? "Uploading..." : "Upload"}
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
