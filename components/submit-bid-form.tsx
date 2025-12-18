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
import { useEdgeStore } from "@/lib/edgestore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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
  const { edgestore } = useEdgeStore();

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
      // Upload files using EdgeStore
      async function uploadFilesWithEdgeStore(list: FileList | null) {
        if (!list || list.length === 0) return [];
        const uploads: Array<{
          name: string;
          size: number;
          type: string;
          url: string;
        }> = [];

        for (const file of Array.from(list).filter(
          (f) =>
            f.type === "application/pdf" ||
            String(f.name || "")
              .toLowerCase()
              .endsWith(".pdf")
        )) {
          try {
            const res = await edgestore.publicFiles.upload({
              file,
            });
            uploads.push({
              name: file.name,
              size: file.size,
              type: file.type,
              url: res.url,
            });
          } catch (err) {
            console.error("Error uploading file:", file.name, err);
          }
        }
        return uploads;
      }

      console.log("Uploading technical files...");
      const techUploads = await uploadFilesWithEdgeStore(technicalFiles);
      console.log("Technical files uploaded:", techUploads);

      console.log("Uploading financial files...");
      const finUploads = await uploadFilesWithEdgeStore(financialFiles);
      console.log("Financial files uploaded:", finUploads);

      const bidData = {
        supplierName: data.supplierName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        totalPrice: data.totalPrice,
        deliveryTimeline: data.deliveryTimeline,
        complianceStatement: data.complianceStatement,
        additionalNotes: data.additionalNotes,
        technicalProposalUploads: techUploads,
        financialProposalUploads: finUploads,
      };

      console.log("Submitting bid:", bidData);

      const res = await submitBid(String(tender._id), bidData);

      console.log("Submit bid result:", res);

      if (res && res.success) {
        // alert("Bid submitted successfully!");
        toast.success("Bid submitted successfully!");
        onClose();
      } else {
        toast.error(res?.error || "Failed to submit bid");
      }
    } catch (e) {
      console.error("Failed to submit bid", e);
      toast.error(
        "Failed to submit bid: " +
          (e instanceof Error ? e.message : "Unknown error")
      );
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
            {tender.title}
            {tender.closeDate && (
              <>
                {" · Closes on "}
                {new Date(tender.closeDate).toLocaleDateString()}
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Supplier Information</h3>

              <FormField
                control={form.control}
                name="supplierName"
                rules={{ required: "Supplier name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name *</FormLabel>
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
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email *</FormLabel>
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
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone *</FormLabel>
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
                  rules={{ required: "Total price is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Price (per year) *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50000" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your total annual price in USD
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryTimeline"
                  rules={{ required: "Delivery timeline is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Timeline *</FormLabel>
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
              <h3 className="text-sm font-medium">Upload Bid Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Technical Proposal (PDF only)</FormLabel>
                  <Input
                    type="file"
                    multiple
                    accept="application/pdf,.pdf"
                    onChange={(e) => setTechnicalFiles(e.target.files)}
                    disabled={isSubmitting}
                  />
                  {technicalFiles && (
                    <p className="text-xs text-muted-foreground">
                      {technicalFiles.length} file(s) selected
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <FormLabel>Financial Proposal (PDF only)</FormLabel>
                  <Input
                    type="file"
                    multiple
                    accept="application/pdf,.pdf"
                    onChange={(e) => setFinancialFiles(e.target.files)}
                    disabled={isSubmitting}
                  />
                  {financialFiles && (
                    <p className="text-xs text-muted-foreground">
                      {financialFiles.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Technical & Compliance</h3>

              <FormField
                control={form.control}
                name="complianceStatement"
                rules={{ required: "Compliance statement is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compliance Statement *</FormLabel>
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
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
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
