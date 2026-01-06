"use client";

import { useEffect, useState } from "react";
import {
  X,
  Calendar,
  DollarSign,
  User,
  Building2,
  Tag,
  AlertCircle,
  Clock,
  Package,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  getApprovalById,
  approveRequest,
  rejectRequest,
  requestChanges,
} from "@/lib/actions/approval-actions";
import { getRequisitionById } from "@/lib/actions/requisition-actions";
import { useToast } from "@/hooks/use-toast";

type ApprovalDetail = {
  _id: string;
  type: string;
  itemId: string;
  amount: number;
  status: string;
  priority?: string;
  requester?: string;
  createdAt: string | Date;
  approvedBy?: string;
  approvedAt?: string | Date;
  rejectedBy?: string;
  rejectedAt?: string | Date;
  comments?: Array<{
    author: string;
    text: string;
    date: string | Date;
  }>;
  approvalChain?: Array<{
    approver: string;
    status: string;
    date?: string | Date;
  }>;
  slaDeadline?: string | Date;
  metadata?: any;
};

type RequisitionDetail = {
  requisitionId: string;
  requester: string;
  branch: string;
  category: string;
  date: string | Date;
  amount: number;
  neededBy?: string | Date;
  description?: string;
  lineItems?: Array<{
    description: string;
    quantity: number;
    unit?: string;
    unitCost?: number;
  }>;
  costCenter?: string;
};

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
        <div className="font-medium text-sm break-words">{value}</div>
      </div>
    </div>
  );
}

export function ApprovalDetailModal({
  approvalId,
  onClose,
  onActionComplete,
}: {
  approvalId: string;
  onClose: () => void;
  onActionComplete?: () => void;
}) {
  const [approval, setApproval] = useState<ApprovalDetail | null>(null);
  const [requisition, setRequisition] = useState<RequisitionDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [comments, setComments] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadApproval();
  }, [approvalId]);

  const loadApproval = async () => {
    setLoading(true);
    const result = await getApprovalById(approvalId);
    if (result.success) {
      setApproval(result.data);

      // Load related requisition if type is Requisition
      if (result.data.type === "Requisition" && result.data.itemId) {
        const reqResult = await getRequisitionById(result.data.itemId);
        if (reqResult.success) {
          setRequisition(reqResult.data);
        }
      }
    }
    setLoading(false);
  };

  const handleApprove = async () => {
    setActionLoading(true);
    const result = await approveRequest(approvalId, comments);
    if (result.success) {
      toast({
        title: "Approved",
        description: "Request has been approved successfully",
      });
      onActionComplete?.();
      onClose();
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to approve request",
        variant: "destructive",
      });
    }
    setActionLoading(false);
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }

    setActionLoading(true);
    const result = await rejectRequest(approvalId, rejectReason);
    if (result.success) {
      toast({
        title: "Rejected",
        description: "Request has been rejected",
      });
      onActionComplete?.();
      onClose();
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to reject request",
        variant: "destructive",
      });
    }
    setActionLoading(false);
  };

  const handleRequestChanges = async () => {
    if (!comments.trim()) {
      toast({
        title: "Error",
        description: "Please provide details about required changes",
        variant: "destructive",
      });
      return;
    }

    setActionLoading(true);
    const result = await requestChanges(approvalId, comments);
    if (result.success) {
      toast({
        title: "Changes Requested",
        description: "Requester has been notified",
      });
      onActionComplete?.();
      onClose();
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to request changes",
        variant: "destructive",
      });
    }
    setActionLoading(false);
  };

  const fmtDate = (d: string | Date | undefined) => {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fmtAmount = (n: number) =>
    `Nle ${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
    }).format(n)}`;

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("approved"))
      return "bg-green-100 text-green-800 border-green-300";
    if (s.includes("rejected")) return "bg-red-100 text-red-800 border-red-300";
    if (s.includes("awaiting") || s.includes("pending"))
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (s.includes("review"))
      return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  const isPending =
    approval?.status.toLowerCase().includes("awaiting") ||
    approval?.status.toLowerCase().includes("pending");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between bg-gradient-to-r from-muted/50 to-muted/30">
          <div className="flex-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              {loading
                ? "Loading..."
                : `${approval?.type || "Approval"} Review`}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              ID: {approval?.itemId || "..."}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
              <p className="text-sm text-muted-foreground">
                Loading approval details...
              </p>
            </div>
          ) : !approval ? (
            <div className="flex flex-col items-center justify-center py-20">
              <XCircle className="h-12 w-12 text-destructive mb-3" />
              <p className="text-lg font-semibold">Approval not found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status Header */}
              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    approval.status
                  )} text-sm px-3 py-1`}
                >
                  {approval.status}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {fmtAmount(approval.amount)}
                </Badge>
                {approval.priority && (
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {approval.priority} Priority
                  </Badge>
                )}
              </div>

              {/* Approval Information */}
              <div className="border rounded-xl p-6 bg-muted/30">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Approval Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InfoCard icon={Tag} label="Type" value={approval.type} />
                  <InfoCard
                    icon={User}
                    label="Item ID"
                    value={approval.itemId}
                  />
                  <InfoCard
                    icon={Clock}
                    label="Submitted"
                    value={fmtDate(approval.createdAt)}
                  />
                  {approval.approvedBy && (
                    <InfoCard
                      icon={CheckCircle2}
                      label="Approved By"
                      value={approval.approvedBy}
                    />
                  )}
                  {approval.approvedAt && (
                    <InfoCard
                      icon={Clock}
                      label="Approved At"
                      value={fmtDate(approval.approvedAt)}
                    />
                  )}
                  {approval.rejectedBy && (
                    <InfoCard
                      icon={XCircle}
                      label="Rejected By"
                      value={approval.rejectedBy}
                    />
                  )}
                  {approval.slaDeadline && (
                    <InfoCard
                      icon={AlertCircle}
                      label="SLA Deadline"
                      value={fmtDate(approval.slaDeadline)}
                    />
                  )}
                </div>
              </div>

              {/* Requisition Details (if available) */}
              {requisition && (
                <div className="border rounded-xl p-6 bg-muted/30">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Requisition Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    <InfoCard
                      icon={User}
                      label="Requester"
                      value={requisition.requester}
                    />
                    <InfoCard
                      icon={Building2}
                      label="Branch"
                      value={requisition.branch}
                    />
                    <InfoCard
                      icon={Tag}
                      label="Category"
                      value={requisition.category}
                    />
                    {requisition.neededBy && (
                      <InfoCard
                        icon={Calendar}
                        label="Needed By"
                        value={fmtDate(requisition.neededBy)}
                      />
                    )}
                    {requisition.costCenter && (
                      <InfoCard
                        icon={Building2}
                        label="Cost Center"
                        value={requisition.costCenter}
                      />
                    )}
                  </div>

                  {requisition.description && (
                    <div className="mt-4 p-4 rounded-lg bg-background/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        Description
                      </p>
                      <p className="text-sm">{requisition.description}</p>
                    </div>
                  )}

                  {requisition.lineItems &&
                    requisition.lineItems.length > 0 && (
                      <div className="mt-4 border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50 border-b">
                            <tr>
                              <th className="text-left px-4 py-2 font-semibold">
                                Item
                              </th>
                              <th className="text-right px-4 py-2 font-semibold">
                                Qty
                              </th>
                              <th className="text-right px-4 py-2 font-semibold">
                                Unit
                              </th>
                              {requisition.lineItems.some(
                                (item) => item.unitCost
                              ) && (
                                <th className="text-right px-4 py-2 font-semibold">
                                  Cost
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {requisition.lineItems.map((item, idx) => (
                              <tr key={idx} className="border-b last:border-0">
                                <td className="px-4 py-2">
                                  {item.description}
                                </td>
                                <td className="px-4 py-2 text-right">
                                  {item.quantity}
                                </td>
                                <td className="px-4 py-2 text-right">
                                  {item.unit || "Unit"}
                                </td>
                                {requisition.lineItems!.some(
                                  (item) => item.unitCost
                                ) && (
                                  <td className="px-4 py-2 text-right">
                                    {item.unitCost
                                      ? fmtAmount(item.unitCost)
                                      : "-"}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                </div>
              )}

              {/* Comments History */}
              {approval.comments && approval.comments.length > 0 && (
                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-muted/50 px-6 py-3 border-b">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Comments ({approval.comments.length})
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {approval.comments.map((comment, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="p-2 rounded-full bg-primary/10 h-fit">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {comment.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {fmtDate(comment.date)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Section - Only show if pending */}
              {isPending && (
                <div className="border rounded-xl p-6 bg-muted/30">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Take Action
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="comments">Comments (Optional)</Label>
                      <Textarea
                        id="comments"
                        placeholder="Add any comments or notes..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rejectReason">
                        Rejection Reason (Required for rejection)
                      </Label>
                      <Textarea
                        id="rejectReason"
                        placeholder="Specify why this request is being rejected..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t px-6 py-4 flex items-center justify-between bg-muted/30">
          <Button variant="outline" onClick={onClose} disabled={actionLoading}>
            Close
          </Button>

          {isPending && approval && (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleRequestChanges}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 mr-2" />
                )}
                Request Changes
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                disabled={actionLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                )}
                Approve
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
