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
  getApprovalById,
} from "@/lib/actions/approval-actions";
import { useToast } from "@/hooks/use-toast";

interface ApprovalDetailModalProps {
  approvalId: string;
  onClose: () => void;
  onActionComplete?: () => void;
}

export function ApprovalDetailModal({
  approvalId,
  onClose,
  onActionComplete,
}: ApprovalDetailModalProps) {
  const [approval, setApproval] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | "changes" | null>(
    null
  );
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    async function loadApproval() {
      try {
        const result = await getApprovalById(approvalId);
        if (result.success && result.data) {
          setApproval(result.data);
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to load approval details",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load approval details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadApproval();
  }, [approvalId, toast]);

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
        result = await approveRequest(approvalId, comments || undefined);
      } else if (action === "reject") {
        result = await rejectRequest(approvalId, comments);
      } else {
        result = await requestChanges(approvalId, comments);
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

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("approved"))
      return "bg-green-100 text-green-800 border-green-300";
    if (s.includes("rejected")) return "bg-red-100 text-red-800 border-red-300";
    if (s.includes("awaiting") || s.includes("pending"))
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  if (loading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!approval) {
    return null;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Approval Details</span>
            <Badge
              variant="outline"
              className={getStatusColor(approval.status)}
            >
              {approval.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Review and take action on this {approval.type?.toLowerCase()}{" "}
            request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Type</Label>
              <div className="font-medium">{approval.type}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Item ID</Label>
              <div className="font-medium">{approval.itemId}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Requester</Label>
              <div className="font-medium">{approval.requester || "N/A"}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Amount</Label>
              <div className="font-medium">
                Nle {approval.amount?.toLocaleString()}
              </div>
            </div>
            {approval.costCenter && (
              <div>
                <Label className="text-xs text-muted-foreground">
                  Cost Center
                </Label>
                <div className="font-medium">{approval.costCenter}</div>
              </div>
            )}
            {approval.branch && (
              <div>
                <Label className="text-xs text-muted-foreground">Branch</Label>
                <div className="font-medium">{approval.branch}</div>
              </div>
            )}
          </div>

          {approval.reason && (
            <>
              <Separator />
              <div>
                <Label className="text-xs text-muted-foreground">Reason</Label>
                <div className="text-sm mt-1">{approval.reason}</div>
              </div>
            </>
          )}

          {approval.comments && approval.comments.length > 0 && (
            <>
              <Separator />
              <div>
                <Label className="text-xs text-muted-foreground">
                  Comments
                </Label>
                <div className="space-y-2 mt-2">
                  {approval.comments.map((comment: any, idx: number) => (
                    <div key={idx} className="text-sm bg-muted p-3 rounded-md">
                      <div className="font-medium text-xs mb-1">
                        {comment.author}
                      </div>
                      <div>{comment.text}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(comment.date).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!action && (
            <>
              <Separator />
              <div className="flex gap-2">
                <Button
                  onClick={() => setAction("approve")}
                  className="flex-1"
                  variant="default"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => setAction("changes")}
                  className="flex-1"
                  variant="outline"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Request Changes
                </Button>
                <Button
                  onClick={() => setAction("reject")}
                  className="flex-1"
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </>
          )}

          {action && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="comments">
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
                />
              </div>
            </>
          )}
        </div>

        {action && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAction(null);
                setComments("");
              }}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleAction} disabled={actionLoading}>
              {actionLoading && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {action === "approve"
                ? "Confirm Approval"
                : action === "reject"
                ? "Confirm Rejection"
                : "Submit Changes"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
