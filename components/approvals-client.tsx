// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { StatusBadge } from "@/components/status-badge";
// import { Badge } from "@/components/ui/badge";
// import { useSearchParams, useRouter } from "next/navigation";
// import {
//   approveRequest,
//   rejectRequest,
//   requestChanges,
// } from "@/lib/actions/approval-actions";
// import { useState, useRef } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";

// const fmtDate = (d?: string | Date) =>
//   d ? new Date(d).toISOString().slice(0, 10) : "";
// const fmtAmount = (n: number) =>
//   new Intl.NumberFormat("en-US", {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(n);

// export default function ApprovalsClient({
//   approvals,
//   requisitions,
//   purchaseOrders,
// }: {
//   approvals: any[];
//   requisitions?: any[];
//   purchaseOrders?: any[];
// }) {
//   const params = useSearchParams();
//   const router = useRouter();
//   const selectedId = params.get("id") || "";
//   const selectedItemId = params.get("itemId") || "";
//   const selected = approvals.length
//     ? approvals.find((a: any) => {
//         if (selectedItemId) {
//           const candidates = [a.itemId, a.requisitionId, a.approvalId, a._id];
//           return candidates.some(
//             (v: any) => String(v) === String(selectedItemId)
//           );
//         }
//         return String(a._id) === String(selectedId);
//       }) || approvals[0]
//     : null;
//   const [actionLoading, setActionLoading] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [changesOpen, setChangesOpen] = useState(false);
//   const [changesHtml, setChangesHtml] = useState("");
//   const changesRef = useRef<HTMLDivElement | null>(null);

//   const handleSelect = (id: string) => {
//     const url = `/approvals?id=${String(id)}`;
//     router.replace(url, { scroll: false });
//   };

//   const doApprove = async () => {
//     if (!selected?._id) return;
//     setError(null);
//     setActionLoading("approve");
//     const res = await approveRequest(String(selected._id));
//     setActionLoading(null);
//     if (!res?.success) {
//       setError(res?.error || "Failed to approve");
//       return;
//     }
//     router.refresh();
//   };

//   const openReject = () => {
//     setRejectReason("");
//     setRejectOpen(true);
//   };

//   const confirmReject = async () => {
//     if (!selected?._id) return;
//     setError(null);
//     setActionLoading("reject");
//     const res = await rejectRequest(String(selected._id), rejectReason);
//     setActionLoading(null);
//     if (!res?.success) {
//       setError(res?.error || "Failed to reject");
//       return;
//     }
//     setRejectOpen(false);
//     router.refresh();
//   };

//   const openChanges = () => {
//     setChangesHtml("");
//     setChangesOpen(true);
//   };

//   const confirmChanges = async () => {
//     if (!selected?._id) return;
//     setError(null);
//     const html = (changesRef.current?.innerHTML || "").trim();
//     if (!html) return;
//     setActionLoading("changes");
//     const res = await requestChanges(String(selected._id), html);
//     setActionLoading(null);
//     if (!res?.success) {
//       setError(res?.error || "Failed to request changes");
//       return;
//     }
//     setChangesOpen(false);
//     router.refresh();
//   };

//   return (
//     <div>
//       <Card className="mb-6">
//         <CardContent className="pt-4 md:pt-6">
//           <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-muted-foreground">Queue:</span>
//               <Badge variant="secondary" className="text-xs">
//                 My approvals
//               </Badge>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-muted-foreground">Type:</span>
//               <Badge variant="secondary" className="text-xs">
//                 Requisitions, POs
//               </Badge>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-muted-foreground">Priority:</span>
//               <Badge variant="secondary" className="text-xs">
//                 High-first
//               </Badge>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-muted-foreground">SLA:</span>
//               <Badge variant="secondary" className="text-xs">
//                 Due in 3 days
//               </Badge>
//             </div>
//           </div>
//           <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground">
//             <span>{approvals.length} items in your approval queue</span>
//             <span>3 items breaching SLA</span>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
//         <Card className="lg:col-span-5">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-base">My approval queue</CardTitle>
//               <span className="text-xs text-muted-foreground">
//                 Grouped by due date
//               </span>
//             </div>
//             <CardDescription className="text-xs">
//               Select an item to review and take action.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-1">
//               {approvals.length === 0 ? (
//                 <div className="text-center py-8 text-muted-foreground text-sm">
//                   No approvals pending. Connect to MongoDB to see data.
//                 </div>
//               ) : (
//                 approvals.slice(0, 10).map((item: any) => (
//                   <div
//                     key={String(item._id)}
//                     onClick={() => handleSelect(String(item._id))}
//                     className={`p-3 rounded-lg cursor-pointer border transition-colors ${
//                       String(selected?._id) === String(item._id)
//                         ? "bg-accent/50 border-border"
//                         : "hover:bg-accent border-transparent hover:border-border"
//                     }`}
//                   >
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex-1">
//                         <div className="font-medium text-sm mb-1">
//                           {item.itemId}
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {item.type} • {item.requester}
//                         </div>
//                       </div>
//                       <StatusBadge status={item.status} />
//                     </div>
//                     <div className="flex items-center justify-between text-xs">
//                       <div className="flex items-center gap-2">
//                         <StatusBadge status={item.priority} />
//                         <span className="text-muted-foreground">
//                           Due: {fmtDate(item.dueDate)}
//                         </span>
//                       </div>
//                       <span className="font-medium">
//                         ${fmtAmount(item.amount)}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             <p className="text-xs text-muted-foreground mt-4 px-3">
//               Tip: Use Bulk approve above for low-risk, policy-compliant
//               requests.
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="lg:col-span-7">
//           <CardHeader className="border-b pb-4">
//             {selected ? (
//               <div className="flex flex-col gap-2">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
//                   <CardTitle className="text-sm md:text-base">
//                     {selected.itemId} • {selected.type}
//                   </CardTitle>
//                   <StatusBadge status={selected.status} />
//                 </div>
//                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground">
//                   <span>Requester: {selected.requester}</span>
//                   <span>Type: {selected.type}</span>
//                   <span>Due: {fmtDate(selected.dueDate)}</span>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-xs text-muted-foreground">
//                 Select an approval from the left
//               </div>
//             )}
//           </CardHeader>
//           <CardContent className="pt-4 md:pt-6">
//             <div className="space-y-4 md:space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
//                 <div>
//                   <h4 className="text-xs font-medium text-muted-foreground mb-1">
//                     Decision context
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <div>
//                       <span className="text-muted-foreground">
//                         Total amount
//                       </span>
//                       <div className="font-medium">
//                         Nle{selected ? fmtAmount(selected.amount) : "-"}
//                       </div>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">
//                         Budget impact
//                       </span>
//                       <div className="font-medium">
//                         {selected?.decisionContext?.budgetImpact
//                           ? `Remaining: Nle${fmtAmount(
//                               selected.decisionContext.budgetImpact
//                             )}`
//                           : "No budget data"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="text-xs font-medium text-muted-foreground mb-1">
//                     Risk & policy
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center gap-2">
//                       <StatusBadge
//                         status={selected ? selected.priority : "-"}
//                       />
//                       <span className="text-xs">
//                         SLA: {selected ? fmtDate(selected.dueDate) : "-"}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">SLA</span>
//                       <div className="font-medium">
//                         Due: {selected ? fmtDate(selected.dueDate) : "-"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-4 border-t">
//                 <h3 className="text-sm font-medium mb-3">Summary & items</h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Category</span>
//                     <span>{selected?.decisionContext?.category || "-"}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Needed by</span>
//                     <span>{fmtDate(selected?.decisionContext?.neededBy)}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-muted-foreground">
//                       Supplier preference
//                     </span>
//                     <span>
//                       {selected?.decisionContext?.supplierPreference || "-"}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-muted-foreground">
//                       Approval route
//                     </span>
//                     <span>
//                       {selected?.decisionContext?.approvalRoute || "-"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-4 border-t">
//                 <h3 className="text-sm font-medium mb-3">Item</h3>
//                 <div className="border rounded-lg overflow-hidden">
//                   <table className="w-full text-xs">
//                     <thead className="bg-muted/50">
//                       <tr>
//                         <th className="text-left p-2 font-medium">Item</th>
//                         <th className="text-right p-2 font-medium">Qty</th>
//                         <th className="text-right p-2 font-medium">Unit</th>
//                         <th className="text-right p-2 font-medium">
//                           Unit cost
//                         </th>
//                         <th className="text-right p-2 font-medium">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selected?.summary?.items?.map((item: any, i: number) => (
//                         <tr key={i} className="border-t">
//                           <td className="p-2">{item.description}</td>
//                           <td className="text-right p-2">{item.qty}</td>
//                           <td className="text-right p-2">{item.unit}</td>
//                           <td className="text-right p-2">
//                             Nle{fmtAmount(item.unitCost)}
//                           </td>
//                           <td className="text-right p-2">
//                             Nle{fmtAmount(item.total)}
//                           </td>
//                         </tr>
//                       ))}
//                       {!selected?.summary?.items?.length && (
//                         <tr className="border-t">
//                           <td
//                             colSpan={5}
//                             className="p-2 text-center text-muted-foreground"
//                           >
//                             No items
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="pt-4 border-t">
//                 <h3 className="text-sm font-medium mb-3">Timeline</h3>
//                 <div className="space-y-2 text-xs">
//                   {selected?.timeline?.map((event: any, i: number) => (
//                     <div key={i} className="flex items-start gap-2">
//                       <div
//                         className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
//                           event.event === "Waiting for your decision"
//                             ? "bg-warning"
//                             : "bg-primary"
//                         }`}
//                       ></div>
//                       <div>
//                         <div className="font-medium">{event.event}</div>
//                         <div className="text-muted-foreground">
//                           {fmtDate(event.timestamp)} • {event.actor}{" "}
//                           {event.details ? `• ${event.details}` : ""}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {!selected?.timeline?.length && (
//                     <div className="text-muted-foreground">
//                       No timeline events
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="pt-4 border-t">
//                 <h3 className="text-sm font-medium mb-2">Comments & notes</h3>
//                 {selected?.comments?.length > 0 ? (
//                   <div className="space-y-2">
//                     {selected.comments.map((comment: any, i: number) => (
//                       <div
//                         key={i}
//                         className="bg-muted/30 p-3 rounded-lg text-xs"
//                       >
//                         <p className="italic text-muted-foreground">
//                           "{comment.text}" - {comment.author},{" "}
//                           {fmtDate(comment.date)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-xs text-muted-foreground">
//                     No comments
//                   </div>
//                 )}
//               </div>

//               <div className="pt-4 border-t">
//                 <h3 className="text-sm font-medium mb-3">Your decision</h3>
//                 <p className="text-xs text-muted-foreground mb-4">
//                   Actions are logged and visible to requester and downstream
//                   approvers.
//                 </p>
//                 {error && (
//                   <div className="text-xs text-destructive">{error}</div>
//                 )}
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 sm:flex-none"
//                     onClick={openChanges}
//                     disabled={!selected || actionLoading !== null}
//                   >
//                     {actionLoading === "changes"
//                       ? "Processing..."
//                       : "Request changes"}
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 sm:flex-none"
//                     onClick={openReject}
//                     disabled={!selected || actionLoading !== null}
//                   >
//                     {actionLoading === "reject" ? "Processing..." : "Reject"}
//                   </Button>
//                   <Button
//                     size="sm"
//                     className="flex-1"
//                     onClick={doApprove}
//                     disabled={!selected || actionLoading !== null}
//                   >
//                     {actionLoading === "approve" ? "Processing..." : "Approve"}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Reject approval</DialogTitle>
//               <DialogDescription>
//                 Enter a reason for rejection
//               </DialogDescription>
//             </DialogHeader>
//             <Textarea
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               placeholder="Reason"
//             />
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setRejectOpen(false)}>
//                 Cancel
//               </Button>
//               <Button
//                 onClick={confirmReject}
//                 disabled={!rejectReason || actionLoading !== null}
//               >
//                 {actionLoading === "reject"
//                   ? "Processing..."
//                   : "Confirm rejection"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//         <Dialog open={changesOpen} onOpenChange={setChangesOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Request changes</DialogTitle>
//               <DialogDescription>Describe requested changes</DialogDescription>
//             </DialogHeader>
//             <div className="flex items-center gap-2 mb-2">
//               <Button
//                 variant="outline"
//                 size="icon-sm"
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => document.execCommand("bold")}
//               >
//                 B
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon-sm"
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => document.execCommand("italic")}
//               >
//                 I
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon-sm"
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => document.execCommand("underline")}
//               >
//                 U
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon-sm"
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => document.execCommand("insertUnorderedList")}
//               >
//                 •
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon-sm"
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => {
//                   const url = prompt("Link URL") || "";
//                   if (url) document.execCommand("createLink", false, url);
//                 }}
//               >
//                 ↗
//               </Button>
//             </div>
//             <div
//               ref={changesRef}
//               contentEditable
//               className="min-h-[140px] p-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//               onInput={(e) =>
//                 setChangesHtml((e.target as HTMLDivElement).innerHTML)
//               }
//               suppressContentEditableWarning
//             />
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setChangesOpen(false)}>
//                 Cancel
//               </Button>
//               <Button
//                 onClick={confirmChanges}
//                 disabled={!changesHtml || actionLoading !== null}
//               >
//                 {actionLoading === "changes"
//                   ? "Processing..."
//                   : "Submit changes"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-base">Requisitions</CardTitle>
//               <span className="text-xs text-muted-foreground">
//                 {requisitions?.length || 0} total
//               </span>
//             </div>
//             <CardDescription className="text-xs">
//               Recent requisitions awaiting action
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="divide-y rounded-lg border">
//               {(requisitions || []).slice(0, 10).map((r: any) => (
//                 <div
//                   key={String(r._id)}
//                   className="p-3 flex items-center justify-between"
//                 >
//                   <div className="min-w-0">
//                     <div className="font-medium text-sm truncate">
//                       {r.requisitionId}
//                     </div>
//                     <div className="text-xs text-muted-foreground truncate">
//                       {r.requester} •{" "}
//                       {r.date
//                         ? new Date(r.date).toISOString().slice(0, 10)
//                         : ""}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-sm font-semibold">
//                       Nle{fmtAmount(Number(r.amount || 0))}
//                     </span>
//                     <StatusBadge status={r.status} />
//                   </div>
//                 </div>
//               ))}
//               {(requisitions || []).length === 0 && (
//                 <div className="p-6 text-center text-sm text-muted-foreground">
//                   No requisitions found.
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-base">Purchase Orders</CardTitle>
//               <span className="text-xs text-muted-foreground">
//                 {purchaseOrders?.length || 0} total
//               </span>
//             </div>
//             <CardDescription className="text-xs">
//               Recent POs and fulfillment status
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="divide-y rounded-lg border">
//               {(purchaseOrders || []).slice(0, 10).map((po: any) => (
//                 <div
//                   key={String(po._id)}
//                   className="p-3 flex items-center justify-between"
//                 >
//                   <div className="min-w-0">
//                     <div className="font-medium text-sm truncate">
//                       {po.poNumber}
//                     </div>
//                     <div className="text-xs text-muted-foreground truncate">
//                       {po.supplier} •{" "}
//                       {po.keyDates?.requestedDelivery
//                         ? new Date(po.keyDates.requestedDelivery)
//                             .toISOString()
//                             .slice(0, 10)
//                         : ""}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-sm font-semibold">
//                       {po.currency || "NLE"} {fmtAmount(Number(po.total || 0))}
//                     </span>
//                     <StatusBadge status={po.status} />
//                   </div>
//                 </div>
//               ))}
//               {(purchaseOrders || []).length === 0 && (
//                 <div className="p-6 text-center text-sm text-muted-foreground">
//                   No purchase orders found.
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
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

  // Ensure approvals is always an array
  const safeApprovals = Array.isArray(approvals) ? approvals : [];

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
    </>
  );
}
