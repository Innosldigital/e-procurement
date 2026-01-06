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
import { ApprovalDetailModal } from "./approval-detail-modal";
import { useRouter } from "next/navigation";

type Approval = {
  _id: string;
  type: string;
  itemId: string;
  amount: number;
  status: string;
  requester?: string;
  createdAt: string | Date;
  priority?: string;
};

type ApprovalTableRow = {
  _id: string;
  type: "Approval" | "Requisition" | "Purchase Order";
  itemId: string;
  requester: string;
  status: string;
  amount: number;
  createdAt: string | Date;
};

interface ApprovalsClientProps {
  approvals: Approval[];
  requisitions?: any[];
  purchaseOrders?: any[];
}

export default function ApprovalsClient({
  approvals = [],
  requisitions = [],
  purchaseOrders = [],
}: ApprovalsClientProps) {
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(
    null
  );
  const router = useRouter();

  const safeApprovals = Array.isArray(approvals) ? approvals : [];
  const safeReqs = Array.isArray(requisitions) ? requisitions : [];
  const safePOs = Array.isArray(purchaseOrders) ? purchaseOrders : [];

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

  const fmtDate = (d: string | Date) => {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fmtAmount = (n: number) => `Nle ${n.toLocaleString()}`;

  const handleViewDetails = (approvalId: string) => {
    setSelectedApprovalId(approvalId);
  };

  const handleActionComplete = () => {
    router.refresh();
  };

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
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
            {safeApprovals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No approvals found
                </TableCell>
              </TableRow>
            ) : (
              safeApprovals.map((approval) => (
                <TableRow key={approval._id}>
                  <TableCell className="font-medium">{approval.type}</TableCell>
                  <TableCell>{approval.itemId}</TableCell>
                  <TableCell>{approval.requester || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(approval.status)}
                    >
                      {approval.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {fmtAmount(approval.amount)}
                  </TableCell>
                  <TableCell>{fmtDate(approval.createdAt)}</TableCell>
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
                          onClick={() => handleViewDetails(approval._id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View & Action
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedApprovalId && (
        <ApprovalDetailModal
          approvalId={selectedApprovalId}
          onClose={() => setSelectedApprovalId(null)}
          onActionComplete={handleActionComplete}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg border bg-card">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="font-medium text-sm">Requisitions</div>
            <div className="text-xs text-muted-foreground">
              {safeReqs.length} total
            </div>
          </div>
          <div className="divide-y">
            {safeReqs.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No requisitions found.
              </div>
            ) : (
              safeReqs.slice(0, 10).map((r: any) => (
                <div
                  key={String(r._id)}
                  className="p-3 flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">
                      {r.requisitionId}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {r.requester} •{" "}
                      {r.date ? new Date(r.date).toLocaleDateString() : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">
                      Nle {Number(r.amount || 0).toLocaleString()}
                    </span>
                    <Badge
                      variant="outline"
                      className={getStatusColor(String(r.status || ""))}
                    >
                      {r.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="font-medium text-sm">Purchase Orders</div>
            <div className="text-xs text-muted-foreground">
              {safePOs.length} total
            </div>
          </div>
          <div className="divide-y">
            {safePOs.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No purchase orders found.
              </div>
            ) : (
              safePOs.slice(0, 10).map((po: any) => (
                <div
                  key={String(po._id)}
                  className="p-3 flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">
                      {po.poNumber}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {po.supplier} •{" "}
                      {po.keyDates?.requestedDelivery
                        ? new Date(
                            po.keyDates.requestedDelivery
                          ).toLocaleDateString()
                        : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">
                      {po.currency || "NLE"}{" "}
                      {Number(po.total || 0).toLocaleString()}
                    </span>
                    <Badge
                      variant="outline"
                      className={getStatusColor(String(po.status || ""))}
                    >
                      {po.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
