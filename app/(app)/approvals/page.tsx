// import { Button } from "@/components/ui/button";
// import { getApprovals } from "@/lib/actions/approval-actions";
// import { bulkApprove } from "@/lib/actions/approval-actions";
// import { getRequisitions } from "@/lib/actions/requisition-actions";
// import { getPurchaseOrders } from "@/lib/actions/purchase-order-actions";
// import ApprovalsClient from "@/components/approvals-client";
// import { Suspense } from "react";
// import Link from "next/link";
// import { auth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";

// export default async function ApprovalsPage(props: any) {
//   const { userId } = await auth();
//   let allowed = false;
//   if (userId) {
//     const client: any = await clerkClient();
//     const user = await client.users.getUser(userId);
//     const md = (user?.publicMetadata || {}) as any;
//     const rawRole = String(md.role || "");
//     const normalized = rawRole.toLowerCase().replace(/[\s_-]/g, "");
//     allowed = ["admin", "superadmin"].includes(normalized);
//   }

//   if (!allowed) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <main className="p-4 md:p-6">
//           <div className="text-sm text-muted-foreground">
//             You don’t have permission to view approvals.
//           </div>
//         </main>
//       </div>
//     );
//   }

//   const result = await getApprovals();
//   const approvals = result.success ? result.data : [];

//   const [reqResult, poResult] = await Promise.all([
//     getRequisitions().catch(() => ({ success: false, data: [] })),
//     getPurchaseOrders().catch(() => ({ success: false, data: [] })),
//   ]);
//   const requisitions =
//     reqResult && (reqResult as any).success ? (reqResult as any).data : [];
//   const purchaseOrders =
//     poResult && (poResult as any).success ? (poResult as any).data : [];
//   const pendingIds = approvals
//     .filter((a: any) => {
//       const s = String(a.status || "").toLowerCase();
//       return s.includes("awaiting") || s.includes("pending review");
//     })
//     .map((a: any) => String(a._id));

//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="p-4 md:p-6">
//         <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-xl md:text-2xl font-semibold mb-1">
//               Approvals
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Review, compare, and action pending approvals in your queue.
//             </p>
//           </div>
//           <div className="flex gap-2 md:gap-3">
//             <Button
//               asChild
//               variant="outline"
//               size="sm"
//               className="flex-1 md:flex-none"
//             >
//               <Link href="/admin?section=approval-workflows">
//                 Approval rules
//               </Link>
//             </Button>
//             <form
//               action={async (formData: FormData) => {
//                 "use server";
//                 const idsStr = formData.get("ids") as string;
//                 const ids = idsStr ? JSON.parse(idsStr) : [];
//                 await bulkApprove(ids);
//               }}
//             >
//               <input
//                 type="hidden"
//                 name="ids"
//                 value={JSON.stringify(pendingIds)}
//               />
//               <Button
//                 size="sm"
//                 className="flex-1 md:flex-none"
//                 type="submit"
//                 disabled={pendingIds.length === 0}
//               >
//                 Bulk approve
//               </Button>
//             </form>
//           </div>
//         </div>

//         <Suspense
//           fallback={
//             <div className="text-sm text-muted-foreground">
//               Loading approvals…
//             </div>
//           }
//         >
//           <ApprovalsClient
//             approvals={approvals}
//             requisitions={requisitions}
//             purchaseOrders={purchaseOrders}
//           />
//         </Suspense>
//       </main>
//     </div>
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ApprovalDetailModal } from "@/components/approval-detail-modal";

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

interface ApprovalsClientProps {
  approvals: Approval[];
  requisitions?: any[];
  purchaseOrders?: any[];
}

export default function ApprovalsClient({
  approvals,
  requisitions = [],
  purchaseOrders = [],
}: ApprovalsClientProps) {
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(
    null
  );
  const router = useRouter();

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
            {approvals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No approvals found
                </TableCell>
              </TableRow>
            ) : (
              approvals.map((approval) => (
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
    </>
  );
}
