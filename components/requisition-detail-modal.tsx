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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { getRequisitionById } from "@/lib/actions/requisition-actions";

type RequisitionDetail = {
  _id: string;
  requisitionId: string;
  requester: string;
  branch: string;
  category: string;
  date: string | Date;
  status: string;
  amount: number;
  priority: string;
  neededBy?: string;
  description?: string;
  lineItems?: Array<{
    description: string;
    quantity: number;
    unitCost: number;
    total: number;
  }>;
  costCenter?: string;
  approvalRoute?: string;
  createdAt?: string;
};

export function RequisitionDetailModal({
  requisitionId,
  onClose,
}: {
  requisitionId: string;
  onClose: () => void;
}) {
  const [requisition, setRequisition] = useState<RequisitionDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadRequisition();
  }, [requisitionId]);

  const loadRequisition = async () => {
    setLoading(true);
    const result = await getRequisitionById(requisitionId);
    if (result.success) {
      setRequisition(result.data);
    }
    setLoading(false);
  };

  const fmtDate = (d: string | Date | undefined) => {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fmtAmount = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(n);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between bg-muted/30">
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {loading
                ? "Loading..."
                : requisition?.requisitionId || "Requisition Details"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              View complete requisition information
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
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">
                Loading requisition details...
              </div>
            </div>
          ) : !requisition ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Requisition not found</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status and Priority */}
              <div className="flex items-center gap-3 flex-wrap">
                <StatusBadge status={requisition.status} />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                  <AlertCircle className="h-3 w-3" />
                  {requisition.priority || "Medium"} Priority
                </span>
              </div>

              {/* Summary Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Requester
                      </div>
                      <div className="font-medium">{requisition.requester}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Branch
                      </div>
                      <div className="font-medium">{requisition.branch}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Category
                      </div>
                      <div className="font-medium">{requisition.category}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Needed By
                      </div>
                      <div className="font-medium">
                        {fmtDate(requisition.neededBy)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Submitted
                      </div>
                      <div className="font-medium">
                        {fmtDate(requisition.createdAt || requisition.date)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {requisition.description && (
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h3 className="text-sm font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {requisition.description}
                  </p>
                </div>
              )}

              {/* Line Items */}
              {requisition.lineItems && requisition.lineItems.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Line Items
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b bg-muted/30">
                        <tr>
                          <th className="text-left px-4 py-3 font-medium">
                            Description
                          </th>
                          <th className="text-right px-4 py-3 font-medium">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {requisition.lineItems.map((item, idx) => (
                          <tr key={idx} className="border-b last:border-0">
                            <td className="px-4 py-3">{item.description}</td>
                            <td className="px-4 py-3 text-right">
                              {item.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                {requisition.costCenter && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Cost Center
                    </div>
                    <div className="text-sm font-medium">
                      {requisition.costCenter}
                    </div>
                  </div>
                )}
                {requisition.approvalRoute && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Approval Route
                    </div>
                    <div className="text-sm font-medium">
                      {requisition.approvalRoute}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex items-center justify-end gap-3 bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {requisition && (
            <Button
              onClick={() => {
                router.push(
                  `/approvals?itemId=${encodeURIComponent(
                    requisition.requisitionId
                  )}`
                );
              }}
            >
              Open in Approvals
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
