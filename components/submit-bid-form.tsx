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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitBid } from "@/lib/actions/tender-actions";

interface SubmitBidFormProps {
  tender: any;
  onClose: () => void;
}

interface BidFormValues {
  supplierName: string;
  contactEmail: string;
  contactPhone: string;
  totalPrice: string;
  deliveryTimeline: string;
  complianceStatement: string;
  additionalNotes: string;
}

export function SubmitBidForm({ tender, onClose }: SubmitBidFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [technicalFiles, setTechnicalFiles] = useState<FileList | null>(null);
  const [financialFiles, setFinancialFiles] = useState<FileList | null>(null);

  const form = useForm<BidFormValues>({
    defaultValues: {
      supplierName: "",
      contactEmail: "",
      contactPhone: "",
      totalPrice: "",
      deliveryTimeline: "",
      complianceStatement: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: BidFormValues) => {
    setIsSubmitting(true);
    try {
      async function uploadFiles(list: FileList | null, folder: string) {
        if (!list || list.length === 0)
          return [] as Array<{
            name: string;
            size: number;
            type: string;
            url: string;
          }>;
        const fd = new FormData();
        Array.from(list)
          .filter(
            (f) =>
              f.type === "application/pdf" ||
              String((f as any).name || "")
                .toLowerCase()
                .endsWith(".pdf")
          )
          .forEach((f) => fd.append("files", f));
        fd.append("folder", folder);
        const resp = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await resp.json();
        return (json && json.success ? json.data : []) as Array<{
          name: string;
          size: number;
          type: string;
          url: string;
        }>;
      }

      const techUploads = await uploadFiles(
        technicalFiles,
        `tenders/${tender.tenderId}/technical`
      );
      const finUploads = await uploadFiles(
        financialFiles,
        `tenders/${tender.tenderId}/financial`
      );

      const res: any = await submitBid(String(tender._id), {
        supplierName: data.supplierName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        totalPrice: data.totalPrice,
        deliveryTimeline: data.deliveryTimeline,
        complianceStatement: data.complianceStatement,
        additionalNotes: data.additionalNotes,
        technicalProposalUploads: techUploads,
        financialProposalUploads: finUploads,
      });
      if (res && res.success) {
        onClose();
      } else {
        console.error(res?.error || "Failed to submit bid");
      }
    } catch (e) {
      console.error("Failed to submit bid", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Bid for {tender.tenderId}</DialogTitle>
          <DialogDescription>
            {tender.title} · Closes on{" "}
            {new Date(tender.closeDate).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Supplier Information</h3>

              <FormField
                control={form.control}
                name="supplierName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                        />
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
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Commercial Proposal</h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Price (per year)</FormLabel>
                      <FormControl>
                        <Input placeholder="$0.00" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your total annual price
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Timeline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 4-6 weeks" {...field} />
                      </FormControl>
                      <FormDescription>
                        Expected delivery timeframe
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Upload bids document</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Technical proposal document</FormLabel>
                  <Input
                    type="file"
                    multiple
                    accept="application/pdf,.pdf"
                    onChange={(e) => setTechnicalFiles(e.target.files)}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>Financial proposal document</FormLabel>
                  <Input
                    type="file"
                    multiple
                    accept="application/pdf,.pdf"
                    onChange={(e) => setFinancialFiles(e.target.files)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Technical & Compliance</h3>

              <FormField
                control={form.control}
                name="complianceStatement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compliance Statement</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Confirm compliance with requirements, certifications, and standards..."
                        className="min-h-[80px]"
                        {...field}
                      />
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
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information or special considerations..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Bid"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
