"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import {
  approveRequest,
  rejectRequest,
  requestChanges,
  getItemDetails,
} from "@/lib/actions/approval-actions";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  author: string;
  text: string;
  date: string | Date;
}

interface ItemDetails {
  _id: string;
  type: string;
  itemId: string;
  amount?: number;
  status: string;
  requester?: string;
  createdAt: string | Date;
  costCenter?: string;
  branch?: string;
  reason?: string;
  comments?: Comment[];
}

interface ApprovalDetailModalProps {
  approvalId: string;
  itemType: string;
  onClose: () => void;
  onActionComplete?: () => void;
}

export function ApprovalDetailModal({
  approvalId,
  itemType,
  onClose,
  onActionComplete,
}: ApprovalDetailModalProps) {
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | "changes" | null>(
    null
  );
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    async function loadDetails() {
      try {
        console.log("Loading details for:", { approvalId, itemType });
        const result = await getItemDetails(approvalId, itemType);
        console.log("Result:", result);

        if (result.success && result.data) {
          console.log("Setting item details:", result.data);
          setItemDetails(result.data);
        } else {
          console.error("Failed to load details:", result.error);
          toast({
            title: "Error",
            description: result.error || "Failed to load details",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Exception loading details:", error);
        toast({
          title: "Error",
          description: "Failed to load details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [approvalId, itemType, toast]);

  const getStatusColor = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("approved"))
      return "bg-green-100 text-green-800 border-green-300";
    if (s.includes("rejected")) return "bg-red-100 text-red-800 border-red-300";
    if (s.includes("awaiting") || s.includes("pending"))
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (s.includes("review"))
      return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  const fmtAmount = (n?: number) => `Nle ${Number(n || 0).toLocaleString()}`;

  const handleAction = async () => {
    if (!action) return;

    if ((action === "reject" || action === "changes") && !comments.trim()) {
      toast({
        title: "Error",
        description: `Please provide ${
          action === "reject" ? "a rejection reason" : "change details"
        }`,
        variant: "destructive",
      });
      return;
    }

    setActionLoading(true);
    try {
      let result;
      if (action === "approve") {
        result = await approveRequest(
          approvalId,
          itemType,
          comments || undefined
        );
      } else if (action === "reject") {
        result = await rejectRequest(approvalId, itemType, comments);
      } else {
        result = await requestChanges(approvalId, itemType, comments);
      }

      if (result.success) {
        toast({
          title: "Success",
          description: `Request ${
            action === "approve"
              ? "approved"
              : action === "reject"
              ? "rejected"
              : "changes requested"
          } successfully`,
        });
        onActionComplete?.();
        onClose();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to process request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing the request",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <div className="flex items-center justify-center py-8 sm:py-12">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-muted-foreground" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!itemDetails) return null;

  const itemComments = itemDetails.comments || [];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pr-6">
            <span className="text-base sm:text-lg md:text-xl font-semibold break-words">
              {itemType} Details
            </span>
            <Badge
              variant="outline"
              className={`${getStatusColor(
                itemDetails.status
              )} shrink-0 self-start sm:self-auto text-xs sm:text-sm`}
            >
              {itemDetails.status}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Review and take action on this {itemType.toLowerCase()} request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-5 py-2 sm:py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm text-muted-foreground font-medium">
                Type
              </Label>
              <div className="text-sm sm:text-base font-medium break-words">
                {itemDetails.type}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm text-muted-foreground font-medium">
                Item ID
              </Label>
              <div className="text-sm sm:text-base font-medium break-words">
                {itemDetails.itemId}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm text-muted-foreground font-medium">
                Requester
              </Label>
              <div className="text-sm sm:text-base font-medium break-words">
                {itemDetails.requester || "N/A"}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm text-muted-foreground font-medium">
                Amount
              </Label>
              <div className="text-sm sm:text-base font-semibold text-primary">
                {fmtAmount(itemDetails.amount)}
              </div>
            </div>
            {itemDetails.costCenter && (
              <div className="space-y-1">
                <Label className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Cost Center
                </Label>
                <div className="text-sm sm:text-base font-medium break-words">
                  {itemDetails.costCenter}
                </div>
              </div>
            )}
            {itemDetails.branch && (
              <div className="space-y-1">
                <Label className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Branch
                </Label>
                <div className="text-sm sm:text-base font-medium break-words">
                  {itemDetails.branch}
                </div>
              </div>
            )}
          </div>

          {itemDetails.reason && (
            <>
              <Separator className="my-3 sm:my-4" />
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Reason
                </Label>
                <div className="text-xs sm:text-sm leading-relaxed break-words bg-muted/50 p-3 rounded-md">
                  {itemDetails.reason}
                </div>
              </div>
            </>
          )}

          {itemComments.length > 0 && (
            <>
              <Separator className="my-3 sm:my-4" />
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Comments ({itemComments.length})
                </Label>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {itemComments.map((comment, idx) => (
                    <div
                      key={idx}
                      className="text-xs sm:text-sm bg-muted p-3 rounded-lg border border-border"
                    >
                      <div className="break-words leading-relaxed">
                        {comment.text}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                        {new Date(comment.date).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!action && (
            <>
              <Separator className="my-3 sm:my-4" />
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={() => setAction("approve")}
                  className="flex-1 h-10 sm:h-11"
                  variant="default"
                >
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">Approve</span>
                </Button>
                <Button
                  onClick={() => setAction("changes")}
                  className="flex-1 h-10 sm:h-11"
                  variant="outline"
                >
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">Request Changes</span>
                </Button>
                <Button
                  onClick={() => setAction("reject")}
                  className="flex-1 h-10 sm:h-11"
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">Reject</span>
                </Button>
              </div>
            </>
          )}

          {action && (
            <>
              <Separator className="my-3 sm:my-4" />
              <div className="space-y-3">
                <Label
                  htmlFor="comments"
                  className="text-xs sm:text-sm font-medium"
                >
                  {action === "approve"
                    ? "Comments (optional)"
                    : action === "reject"
                    ? "Rejection Reason *"
                    : "Change Details *"}
                </Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder={
                    action === "approve"
                      ? "Add any comments..."
                      : action === "reject"
                      ? "Please provide a reason for rejection..."
                      : "Please describe the required changes..."
                  }
                  rows={4}
                  className="text-sm sm:text-base resize-none min-h-[100px]"
                />
              </div>
            </>
          )}
        </div>

        {action && (
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setAction(null);
                setComments("");
              }}
              disabled={actionLoading}
              className="w-full sm:w-auto h-10 sm:h-11"
            >
              <span className="text-sm sm:text-base">Cancel</span>
            </Button>
            <Button
              onClick={handleAction}
              disabled={actionLoading}
              className="w-full sm:w-auto h-10 sm:h-11"
            >
              {actionLoading && (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
              )}
              <span className="text-sm sm:text-base">
                {action === "approve"
                  ? "Confirm Approval"
                  : action === "reject"
                  ? "Confirm Rejection"
                  : "Submit Changes"}
              </span>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
