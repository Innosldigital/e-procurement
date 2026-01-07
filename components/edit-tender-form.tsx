"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updateTender } from "@/lib/actions/tender-actions";
import { Loader2, Upload, X } from "lucide-react";

interface EditTenderFormProps {
  tender: any;
  onClose: () => void;
}

export function EditTenderForm({ tender, onClose }: EditTenderFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: tender.title || "",
      type: tender.type || "RFP",
      category: tender.category || "",
      businessUnit: tender.businessUnit || "",
      region: tender.region || "",
      sourcingObjective: tender.sourcingObjective || "",
      estimatedValue: tender.estimatedValue || "",
      contractTerm: tender.contractTerm || "",
      sourcingType: tender.sourcingType || "",
      invitedSuppliers: tender.invitedSuppliers || "",
      closeDate: tender.closeDate
        ? new Date(tender.closeDate).toISOString().split("T")[0]
        : "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<any[]>(
    tender.tenderDocuments || []
  );
  const { toast } = useToast();

  const type = watch("type");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setDocuments([...documents, ...newDocs]);
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await updateTender(tender._id, {
        ...data,
        estimatedValue: data.estimatedValue
          ? Number(data.estimatedValue)
          : undefined,
        invitedSuppliers: data.invitedSuppliers
          ? Number(data.invitedSuppliers)
          : undefined,
        closeDate: data.closeDate ? new Date(data.closeDate) : undefined,
        tenderDocuments: documents,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "Tender updated successfully",
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update tender",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tender</DialogTitle>
          <DialogDescription>
            Update tender details - {tender.tenderId}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Tender Title *</Label>
              <Input
                id="title"
                {...register("title", { required: true })}
                placeholder="e.g., Office Equipment Supply 2024"
              />
            </div>

            <div>
              <Label htmlFor="type">Tender Type *</Label>
              <Select
                value={type}
                onValueChange={(value) => setValue("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RFP">
                    RFP - Request for Proposal
                  </SelectItem>
                  <SelectItem value="RFQ">RFQ - Request for Quote</SelectItem>
                  <SelectItem value="RFI">
                    RFI - Request for Information
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register("category")}
                placeholder="e.g., IT Services, Construction"
              />
            </div>

            <div>
              <Label htmlFor="businessUnit">Business Unit</Label>
              <Input
                id="businessUnit"
                {...register("businessUnit")}
                placeholder="e.g., Operations, Finance"
              />
            </div>

            <div>
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                {...register("region")}
                placeholder="e.g., Western Area, Freetown"
              />
            </div>

            <div>
              <Label htmlFor="estimatedValue">Estimated Value (Nle)</Label>
              <Input
                id="estimatedValue"
                type="number"
                {...register("estimatedValue")}
                placeholder="e.g., 50000"
              />
            </div>

            <div>
              <Label htmlFor="contractTerm">Contract Term</Label>
              <Input
                id="contractTerm"
                {...register("contractTerm")}
                placeholder="e.g., 12 months, 2 years"
              />
            </div>

            <div>
              <Label htmlFor="sourcingType">Sourcing Type</Label>
              <Input
                id="sourcingType"
                {...register("sourcingType")}
                placeholder="e.g., Open, Selective, Direct"
              />
            </div>

            <div>
              <Label htmlFor="invitedSuppliers">
                Number of Invited Suppliers
              </Label>
              <Input
                id="invitedSuppliers"
                type="number"
                {...register("invitedSuppliers")}
                placeholder="e.g., 5"
              />
            </div>

            <div>
              <Label htmlFor="closeDate">Close Date</Label>
              <Input id="closeDate" type="date" {...register("closeDate")} />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="sourcingObjective">Sourcing Objective</Label>
              <Textarea
                id="sourcingObjective"
                {...register("sourcingObjective")}
                placeholder="Describe the purpose and goals of this tender..."
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Tender Documents</Label>
              <div className="mt-2 space-y-2">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-md"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(doc.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <label htmlFor="file-upload">
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, DOCX, XLS, XLSX (max 10MB)
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Tender
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
