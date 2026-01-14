"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitBid } from "@/lib/actions/tender-actions";
import { useEdgeStore } from "@/lib/edgestore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SubmitBidFormProps {
  tender: any;
  onClose: () => void;
}

const BidFormSchema = z.object({
  supplierName: z.string().min(2).max(120),
  contactEmail: z.string().email().max(160),
  contactPhone: z.string().min(6).max(40),
  totalPrice: z.string().refine((v) => Number(v) > 0),
  complianceStatement: z.string().min(10).max(2000),
  additionalNotes: z.string().max(2000).optional().or(z.literal("")),
});

type BidFormValues = z.infer<typeof BidFormSchema>;

export function SubmitBidForm({ tender, onClose }: SubmitBidFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [technicalFiles, setTechnicalFiles] = useState<FileList | null>(null);
  const [financialFiles, setFinancialFiles] = useState<FileList | null>(null);
  const [isPrefilling, setIsPrefilling] = useState(false);
  const [prefillError, setPrefillError] = useState("");
  const { edgestore } = useEdgeStore();

  const form = useForm<BidFormValues>({
    resolver: zodResolver(BidFormSchema),
    defaultValues: {
      supplierName: "",
      contactEmail: "",
      contactPhone: "",
      totalPrice: "",
      complianceStatement: "",
      additionalNotes: "",
    },
  });

  useEffect(() => {
    let active = true;
    async function prefill() {
      try {
        setIsPrefilling(true);
        setPrefillError("");
        const resp = await fetch("/api/supplier/me", {
          headers: { Accept: "application/json" },
        });
        if (!resp.ok) throw new Error("Failed to fetch user details");
        const json = await resp.json();
        const d = json?.data || {};
        const supplierName = String(d.supplierName || "").trim();
        const contactEmail = String(d.contactEmail || "").trim();
        const contactPhone = String(d.contactPhone || "").trim();
        if (!active) return;
        if (supplierName) form.setValue("supplierName", supplierName);
        if (contactEmail) form.setValue("contactEmail", contactEmail);
        if (contactPhone)
          form.setValue("contactPhone", normalizePhone(contactPhone));
      } catch (e: any) {
        setPrefillError(e?.message || "Unable to load user details");
      } finally {
        setIsPrefilling(false);
      }
    }
    prefill();
    return () => {
      active = false;
    };
  }, []);

  function normalizePhone(p: string) {
    const trimmed = String(p || "").trim();
    if (!trimmed) return "";
    const hasPlus = trimmed.startsWith("+");
    const digits = trimmed.replace(/[^0-9]/g, "");
    return hasPlus ? `+${digits}` : digits;
  }

  const onSubmit = async (data: BidFormValues) => {
    setIsSubmitting(true);
    try {
      if (!tender || !tender._id) {
        toast.error("Invalid tender reference");
        return;
      }

      async function uploadFiles(list: FileList | null) {
        if (!list?.length)
          return [] as Array<{
            name: string;
            size: number;
            type: string;
            url: string;
          }>;
        const uploads: Array<{
          name: string;
          size: number;
          type: string;
          url: string;
        }> = [];
        const files = Array.from(list).filter((f) => {
          const isPdf =
            f.type === "application/pdf" ||
            String(f.name || "")
              .toLowerCase()
              .endsWith(".pdf");
          const under10MB = f.size <= 10 * 1024 * 1024;
          if (!isPdf) toast.error(`${f.name} is not a PDF`);
          if (!under10MB) toast.error(`${f.name} exceeds 10MB limit`);
          return isPdf && under10MB;
        });
        for (const file of files) {
          const res = await edgestore.publicFiles.upload({ file });
          uploads.push({
            name: file.name,
            size: file.size,
            type: file.type,
            url: res.url,
          });
        }
        return uploads;
      }

      const bidData = {
        supplierName: data.supplierName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        totalPrice: data.totalPrice,
        complianceStatement: data.complianceStatement,
        additionalNotes: data.additionalNotes ?? "",
        technicalProposalUploads: await uploadFiles(technicalFiles),
        financialProposalUploads: await uploadFiles(financialFiles),
      };

      const res = await submitBid(String(tender._id), bidData);
      if (res?.success) {
        toast.success("Bid submitted successfully!");
        onClose();
      } else {
        toast.error(res?.error || "Failed to submit bid");
      }
    } catch {
      toast.error("Failed to submit bid");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Submit Bid for {tender.tenderId}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {tender.title}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Supplier Information</h3>
              {isPrefilling && (
                <div className="text-xs text-muted-foreground">
                  Loading your details…
                </div>
              )}
              {prefillError && (
                <div className="text-xs text-destructive">{prefillError}</div>
              )}
              <FormField
                control={form.control}
                name="supplierName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onBlur={(e) =>
                            form.setValue(
                              "contactPhone",
                              normalizePhone(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="totalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Price *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="file"
                multiple
                accept="application/pdf"
                onChange={(e) => setTechnicalFiles(e.target.files)}
              />
              <Input
                type="file"
                multiple
                accept="application/pdf"
                onChange={(e) => setFinancialFiles(e.target.files)}
              />
            </div>
            <FormField
              control={form.control}
              name="complianceStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compliance Statement *</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[90px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[90px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Bid"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
