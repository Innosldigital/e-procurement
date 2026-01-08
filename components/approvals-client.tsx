"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
// import { ApprovalDetailModal } from "./approval-detail-modal";
import { useRouter } from "next/navigation";
import { ApprovalDetailModal } from "./approval-details-modal";

type ApprovalTableRow = {
  _id: string;
  type: string;
  itemId: string;
  requester: string;
  status: string;
  amount: number;
  createdAt: string | Date;
};

interface ApprovalsClientProps {
  approvals: ApprovalTableRow[];
  requisitions: ApprovalTableRow[];
  purchaseOrders: ApprovalTableRow[];
  bulkApprovalAction?: (formData: FormData) => Promise<void>;
}

export default function ApprovalsClient({
  approvals = [],
  requisitions = [],
  purchaseOrders = [],
  bulkApprovalAction,
}: ApprovalsClientProps) {
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkApproving, setIsBulkApproving] = useState(false);
  const router = useRouter();

  // Ensure all arrays are safe
  const safeApprovals = Array.isArray(approvals) ? approvals : [];
  const safeRequisitions = Array.isArray(requisitions) ? requisitions : [];
  const safePurchaseOrders = Array.isArray(purchaseOrders)
    ? purchaseOrders
    : [];

  // Combine all data into one unified array
  const combinedData = [
    ...safeApprovals,
    ...safeRequisitions,
    ...safePurchaseOrders,
  ].sort((a, b) => {
    // Sort by date, newest first
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  const getStatusColor = (status: string) => {
    const s = String(status || "").toLowerCase();
    if (s.includes("approved"))
      return "bg-green-100 text-green-800 border-green-300";
    if (s.includes("rejected")) return "bg-red-100 text-red-800 border-red-300";
    if (s.includes("awaiting") || s.includes("pending"))
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (s.includes("review"))
      return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  const fmtDate = (d: string | Date) => {
    if (!d) return "N/A";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const fmtAmount = (n: number) => {
    const amount = Number(n || 0);
    return `Nle ${amount.toLocaleString()}`;
  };

  const pendingApprovalsCount = safeApprovals.filter((a) => {
    const s = String(a?.status || "").toLowerCase();
    return (
      s.includes("awaiting") ||
      s.includes("pending review") ||
      s.includes("parallel approval") ||
      s.includes("sla breached")
    );
  }).length;

  const handleViewDetails = (id: string, type: string) => {
    setSelectedApprovalId(id);
    setSelectedType(type);
  };

  const handleActionComplete = () => {
    router.refresh();
    setSelectedApprovalId(null);
    setSelectedType(null);
  };

  const handleSelectItem = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const pendingItems = combinedData.filter(item => {
      const s = String(item.status || "").toLowerCase();
      return s.includes("awaiting") || s.includes("pending") || s.includes("review");
    });
    
    if (selectedIds.size === pendingItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(pendingItems.map(item => item._id)));
    }
  };

  const handleBulkApprove = async () => {
    if (selectedIds.size === 0 || !bulkApprovalAction) return;
    
    setIsBulkApproving(true);
    try {
      const formData = new FormData();
      formData.append("ids", JSON.stringify(Array.from(selectedIds)));
      
      await bulkApprovalAction(formData);
      
      setSelectedIds(new Set());
      router.refresh();
    } catch (error) {
      console.error("Error during bulk approval:", error);
    } finally {
      setIsBulkApproving(false);
    }
  };

  return (
    <>
      {/* Combined Approvals Table */}
      <div className="rounded-lg border bg-card mb-6">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSelectAll}
              disabled={combinedData.filter(item => {
                const s = String(item.status || "").toLowerCase();
                return s.includes("awaiting") || s.includes("pending") || s.includes("review");
              }).length === 0}
            >
              {selectedIds.size === combinedData.filter(item => {
                const s = String(item.status || "").toLowerCase();
                return s.includes("awaiting") || s.includes("pending") || s.includes("review");
              }).length ? "Deselect All" : "Select All Pending"}
            </Button>
            {selectedIds.size > 0 && (
              <Button
                size="sm"
                onClick={handleBulkApprove}
                disabled={isBulkApproving}
              >
                {isBulkApproving ? "Approving..." : `Approve Selected (${selectedIds.size})`}
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {selectedIds.size} selected
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedIds.size > 0 && selectedIds.size === combinedData.filter(item => {
                    const s = String(item.status || "").toLowerCase();
                    return s.includes("awaiting") || s.includes("pending") || s.includes("review");
                  }).length}
                  onChange={handleSelectAll}
                  disabled={combinedData.filter(item => {
                    const s = String(item.status || "").toLowerCase();
                    return s.includes("awaiting") || s.includes("pending") || s.includes("review");
                  }).length === 0}
                />
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Item ID</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {combinedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No approvals found
                </TableCell>
              </TableRow>
            ) : (
              combinedData.map((item) => {
                const s = String(item.status || "").toLowerCase();
                const isPending = s.includes("awaiting") || s.includes("pending") || s.includes("review");
                return (
                <TableRow key={`${item.type}-${item._id}`}>
                  <TableCell className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item._id)}
                      onChange={() => handleSelectItem(item._id)}
                      disabled={!isPending}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.itemId || "N/A"}</TableCell>
                  <TableCell>{item.requester || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(item.status)}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {fmtAmount(item.amount)}
                  </TableCell>
                  <TableCell>{fmtDate(item.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(item._id, item.type)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View & Action
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )})
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Pending Approvals</div>
          <div className="text-2xl font-bold mt-1">{pendingApprovalsCount}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Requisitions</div>
          <div className="text-2xl font-bold mt-1">
            {safeRequisitions.length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Purchase Orders</div>
          <div className="text-2xl font-bold mt-1">
            {safePurchaseOrders.length}
          </div>
        </div>
      </div>

      {/* Approval Detail Modal */}
      {selectedApprovalId && selectedType && (
        <ApprovalDetailModal
          approvalId={selectedApprovalId}
          itemType={selectedType}
          onClose={() => {
            setSelectedApprovalId(null);
            setSelectedType(null);
          }}
          onActionComplete={handleActionComplete}
        />
      )}
    </>
  );
}
