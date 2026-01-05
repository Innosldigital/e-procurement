"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit } from "lucide-react";
import { EditRequisitionForm } from "./edit-requisition-form";
import { useRouter } from "next/navigation";
import { RequisitionDetailModal } from "./requisition-detail-modal";

type RequisitionSummary = {
  _id: string;
  requisitionId: string;
  requester: string;
  branch: string;
  date: string | Date;
  status: string;
  amount: number;
  createdBy?: string;
};

interface RequisitionsTableProps {
  items: RequisitionSummary[];
}

export default function RequisitionsTable({ items }: RequisitionsTableProps) {
  const { user } = useUser();
  const router = useRouter();
  const [editingRequisition, setEditingRequisition] = useState<any>(null);
  const [selectedRequisitionId, setSelectedRequisitionId] = useState<
    string | null
  >(null);

  const isAdmin = user?.publicMetadata?.role === "admin";

  const canEdit = (requisition: RequisitionSummary) => {
    return isAdmin && requisition.status === "Pending approval";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Pending approval": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "In review": "bg-blue-100 text-blue-800 border-blue-300",
      Approved: "bg-green-100 text-green-800 border-green-300",
      Rejected: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleViewDetails = (requisitionId: string) => {
    setSelectedRequisitionId(requisitionId);
  };

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requisition ID</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No requisitions found
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    {item.requisitionId}
                  </TableCell>
                  <TableCell>{item.requester}</TableCell>
                  <TableCell>{item.branch}</TableCell>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(item.status)}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    Nle {item.amount.toLocaleString()}
                  </TableCell>
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
                          onClick={() => handleViewDetails(item.requisitionId)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>

                        {canEdit(item) && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setEditingRequisition(item)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingRequisition && (
        <EditRequisitionForm
          requisition={editingRequisition}
          onClose={() => setEditingRequisition(null)}
        />
      )}

      {selectedRequisitionId && (
        <RequisitionDetailModal
          requisitionId={selectedRequisitionId}
          onClose={() => setSelectedRequisitionId(null)}
        />
      )}
    </>
  );
}
