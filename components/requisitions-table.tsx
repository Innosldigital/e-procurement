// "use client";

// import { useMemo, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { StatusBadge } from "@/components/status-badge";
// import { Download } from "lucide-react";
// import { RequisitionDetailModal } from "./requisition-detail-modal";

// type RequisitionItem = {
//   _id: string;
//   requisitionId: string;
//   requester: string;
//   branch: string;
//   date: string | Date;
//   status: string;
// };

// export default function RequisitionsTable({
//   items,
// }: {
//   items: RequisitionItem[];
// }) {
//   const [query, setQuery] = useState("");
//   const [branch, setBranch] = useState<string>("all");
//   const [status, setStatus] = useState<string>("all");
//   const [selectedRequisitionId, setSelectedRequisitionId] = useState<
//     string | null
//   >(null);

//   const fmtDate = (d: string | Date) => new Date(d).toISOString().slice(0, 10);

//   const filtered = useMemo(() => {
//     return items
//       .filter((r) => {
//         const q = query.trim().toLowerCase();
//         const matchesQuery = q
//           ? r.requisitionId?.toLowerCase().includes(q) ||
//             r.requester?.toLowerCase().includes(q)
//           : true;
//         const matchesBranch =
//           branch && branch !== "all" ? r.branch === branch : true;
//         const matchesStatus =
//           status && status !== "all" ? r.status === status : true;
//         return matchesQuery && matchesBranch && matchesStatus;
//       })
//       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//       .slice(0, 100);
//   }, [items, query, branch, status]);

//   const exportCsv = () => {
//     const rows = filtered.map((r) => [
//       r.requisitionId,
//       r.requester,
//       r.branch,
//       fmtDate(r.date),
//       r.status,
//     ]);
//     const header = ["Requisition ID", "Requester", "Branch", "Date", "Status"];
//     const encode = (v: string) => '"' + v.replace(/"/g, '""') + '"';
//     const csv = [header, ...rows]
//       .map((row) => row.map(encode).join(","))
//       .join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "requisitions.csv";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="text-base">All requisitions</CardTitle>
//               <CardDescription className="text-xs">
//                 Showing {filtered.length} result(s)
//               </CardDescription>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="sm" onClick={exportCsv}>
//                 <Download className="h-4 w-4 mr-2" />
//                 Export CSV
//               </Button>
//             </div>
//           </div>
//           <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
//             <Input
//               placeholder="Search by requester or ID"
//               className="md:col-span-2"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <Select value={branch} onValueChange={(v) => setBranch(v)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Branch" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Global HQ">InnoSL HQ</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={status} onValueChange={(v) => setStatus(v)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All statuses</SelectItem>
//                 <SelectItem value="Pending approval">
//                   Pending approval
//                 </SelectItem>
//                 <SelectItem value="In review">In review</SelectItem>
//                 <SelectItem value="Approved">Approved</SelectItem>
//                 <SelectItem value="Rejected">Rejected</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {filtered.length === 0 ? (
//             <div className="text-center py-8 text-muted-foreground text-sm">
//               No requisitions found.
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>ID</TableHead>
//                   <TableHead>Requester</TableHead>
//                   <TableHead>Branch</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Status</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filtered.map((req) => (
//                   <TableRow
//                     key={req._id}
//                     onClick={() => setSelectedRequisitionId(req._id)}
//                     className="cursor-pointer hover:bg-muted/50 transition-colors"
//                   >
//                     <TableCell className="font-medium">
//                       {req.requisitionId}
//                     </TableCell>
//                     <TableCell>{req.requester}</TableCell>
//                     <TableCell className="text-muted-foreground">
//                       {req.branch}
//                     </TableCell>
//                     <TableCell className="text-muted-foreground">
//                       {fmtDate(req.date)}
//                     </TableCell>
//                     <TableCell>
//                       <StatusBadge status={req.status} />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>
//       {selectedRequisitionId && (
//         <RequisitionDetailModal
//           requisitionId={selectedRequisitionId}
//           onClose={() => setSelectedRequisitionId(null)}
//         />
//       )}
//     </>
//   );
// }

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
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { EditRequisitionForm } from "./edit-requisition-form";
import { useRouter } from "next/navigation";

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

  const isAdmin = user?.publicMetadata?.role === "admin";
  const currentUserId = user?.id;

  // Check if user can edit a requisition (must be creator and status is pending)
  // const canEdit = (requisition: RequisitionSummary) => {
  //   return (
  //     requisition.createdBy === currentUserId &&
  //     requisition.status === "Pending approval"
  //   );
  // };

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
    router.push(`/requisitions/${requisitionId}`);
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
    </>
  );
}
