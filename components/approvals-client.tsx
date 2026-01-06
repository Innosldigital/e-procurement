// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal, Eye } from "lucide-react";
// import { ApprovalDetailModal } from "./approval-detail-modal";

// // Common type for all approval-like rows
// export type ApprovalTableRow = {
//   _id: string;
//   type: "Approval" | "Requisition" | "Purchase Order";
//   itemId: string;
//   requester: string;
//   status: string;
//   amount: number;
//   createdAt: string | Date;
//   priority?: string;
// };

// interface ApprovalsClientProps {
//   approvals: ApprovalTableRow[];
//   requisitions: ApprovalTableRow[];
//   purchaseOrders: ApprovalTableRow[];
// }

// export default function ApprovalsClient({
//   approvals = [],
//   requisitions = [],
//   purchaseOrders = [],
// }: ApprovalsClientProps) {
//   const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(
//     null
//   );
//   const router = useRouter();

//   const getStatusColor = (status: string) => {
//     const s = status.toLowerCase();
//     if (s.includes("approved"))
//       return "bg-green-100 text-green-800 border-green-300";
//     if (s.includes("rejected")) return "bg-red-100 text-red-800 border-red-300";
//     if (s.includes("awaiting") || s.includes("pending"))
//       return "bg-yellow-100 text-yellow-800 border-yellow-300";
//     if (s.includes("review"))
//       return "bg-blue-100 text-blue-800 border-blue-300";
//     return "bg-gray-100 text-gray-800 border-gray-300";
//   };

//   const fmtDate = (d: string | Date) =>
//     new Date(d).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   const fmtAmount = (n: number) => `Nle ${n.toLocaleString()}`;

//   const handleViewDetails = (id: string) => setSelectedApprovalId(id);
//   const handleActionComplete = () => router.refresh();

//   return (
//     <>
//       {/* Approvals Table */}
//       <div className="rounded-lg border bg-card mb-6">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Type</TableHead>
//               <TableHead>Item ID</TableHead>
//               <TableHead>Requester</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Amount</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {approvals.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={7}
//                   className="text-center py-8 text-muted-foreground"
//                 >
//                   No approvals found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               approvals.map((a) => (
//                 <TableRow key={a._id}>
//                   <TableCell className="font-medium">{a.type}</TableCell>
//                   <TableCell>{a.itemId}</TableCell>
//                   <TableCell>{a.requester || "N/A"}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant="outline"
//                       className={getStatusColor(a.status)}
//                     >
//                       {a.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     {fmtAmount(a.amount)}
//                   </TableCell>
//                   <TableCell>{fmtDate(a.createdAt)}</TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />
//                           <span className="sr-only">Open menu</span>
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem
//                           onClick={() => handleViewDetails(a._id)}
//                         >
//                           <Eye className="h-4 w-4 mr-2" /> View & Action
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Detail Modal */}
//       {selectedApprovalId && (
//         <ApprovalDetailModal
//           approvalId={selectedApprovalId}
//           onClose={() => setSelectedApprovalId(null)}
//           onActionComplete={handleActionComplete}
//         />
//       )}

//       {/* Requisitions & Purchase Orders */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
//         {[
//           { title: "Requisitions", items: requisitions },
//           { title: "Purchase Orders", items: purchaseOrders },
//         ].map(({ title, items }) => (
//           <div key={title} className="rounded-lg border bg-card">
//             <div className="p-3 border-b flex items-center justify-between">
//               <div className="font-medium text-sm">{title}</div>
//               <div className="text-xs text-muted-foreground">
//                 {items.length} total
//               </div>
//             </div>
//             <div className="divide-y">
//               {items.length === 0 ? (
//                 <div className="p-6 text-center text-sm text-muted-foreground">
//                   No {title.toLowerCase()} found.
//                 </div>
//               ) : (
//                 items.slice(0, 10).map((item) => (
//                   <div
//                     key={item._id}
//                     className="p-3 flex items-center justify-between"
//                   >
//                     <div className="min-w-0">
//                       <div className="font-medium text-sm truncate">
//                         {item.itemId}
//                       </div>
//                       <div className="text-xs text-muted-foreground truncate">
//                         {item.requester} • {fmtDate(item.createdAt)}
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className="text-sm font-semibold">
//                         {fmtAmount(item.amount)}
//                       </span>
//                       <Badge
//                         variant="outline"
//                         className={getStatusColor(item.status)}
//                       >
//                         {item.status}
//                       </Badge>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

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

  // Ensure all arrays are safe
  const safeApprovals = Array.isArray(approvals) ? approvals : [];
  const safeRequisitions = Array.isArray(requisitions) ? requisitions : [];
  const safePurchaseOrders = Array.isArray(purchaseOrders)
    ? purchaseOrders
    : [];

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

  const handleViewDetails = (approvalId: string) => {
    setSelectedApprovalId(approvalId);
  };

  const handleActionComplete = () => {
    router.refresh();
  };

  return (
    <>
      {/* Approvals Table */}
      <div className="rounded-lg border bg-card mb-6">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">Pending Approvals</h3>
          <p className="text-sm text-muted-foreground">
            Review and action items requiring approval
          </p>
        </div>
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
                  <TableCell>{approval.itemId || "N/A"}</TableCell>
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

      {/* Requisitions and Purchase Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requisitions */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Requisitions</h3>
              <p className="text-xs text-muted-foreground">
                {safeRequisitions.length} total
              </p>
            </div>
          </div>
          <div className="divide-y max-h-[400px] overflow-y-auto">
            {safeRequisitions.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No requisitions found
              </div>
            ) : (
              safeRequisitions.slice(0, 10).map((req) => (
                <div
                  key={req._id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {req.itemId}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {req.requester} • {fmtDate(req.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold">
                        {fmtAmount(req.amount)}
                      </span>
                      <Badge
                        variant="outline"
                        className={getStatusColor(req.status)}
                      >
                        {req.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Purchase Orders */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Purchase Orders</h3>
              <p className="text-xs text-muted-foreground">
                {safePurchaseOrders.length} total
              </p>
            </div>
          </div>
          <div className="divide-y max-h-[400px] overflow-y-auto">
            {safePurchaseOrders.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No purchase orders found
              </div>
            ) : (
              safePurchaseOrders.slice(0, 10).map((po) => (
                <div
                  key={po._id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {po.itemId}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {po.requester} • {fmtDate(po.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold">
                        {fmtAmount(po.amount)}
                      </span>
                      <Badge
                        variant="outline"
                        className={getStatusColor(po.status)}
                      >
                        {po.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Approval Detail Modal */}
      {selectedApprovalId && (
        <ApprovalDetailModal
          approvalId={selectedApprovalId}
          onClose={() => setSelectedApprovalId(null)}
          onActionComplete={handleActionComplete}
        />
      )}
    </>
  );
}
