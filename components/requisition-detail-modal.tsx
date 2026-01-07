// "use client";

// import { useEffect, useState } from "react";
// import {
//   X,
//   Calendar,
//   DollarSign,
//   User,
//   Building2,
//   Tag,
//   AlertCircle,
//   Clock,
//   Package,
//   FileText,
//   Download,
//   MapPin,
//   Hash,
//   CheckCircle2,
//   XCircle,
//   Loader2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { getRequisitionById } from "@/lib/actions/requisition-actions";

// type RequisitionDetail = {
//   _id: string;
//   requisitionId: string;
//   requester: string;
//   branch: string;
//   category: string;
//   date: string | Date;
//   status: string;
//   amount: number;
//   priority?: string;
//   neededBy?: string | Date;
//   description?: string;
//   notes?: string;
//   lineItems?: Array<{
//     id?: string;
//     description: string;
//     quantity: number;
//     unit?: string;
//     unitCost?: number;
//     total?: number;
//   }>;
//   costCenter?: string;
//   approvalRoute?: string;
//   createdAt?: string | Date;
//   updatedAt?: string | Date;
//   createdBy?: string;
//   attachments?: Array<{
//     filename: string;
//     url: string;
//     size?: number;
//     type?: string;
//   }>;
//   timeline?: Array<{
//     event: string;
//     timestamp: string | Date;
//     actor?: string;
//     details?: string;
//   }>;
// };

// interface InfoCardProps {
//   icon: React.ElementType;
//   label: string;
//   value: string | number;
//   className?: string;
// }

// function InfoCard({ icon: Icon, label, value, className = "" }: InfoCardProps) {
//   return (
//     <div className={`flex items-start gap-3 ${className}`}>
//       <div className="p-2 rounded-lg bg-muted">
//         <Icon className="h-4 w-4 text-muted-foreground" />
//       </div>
//       <div className="flex-1 min-w-0">
//         <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
//         <div className="font-medium text-sm break-words">{value}</div>
//       </div>
//     </div>
//   );
// }

// export function RequisitionDetailModal({
//   requisitionId,
//   onClose,
// }: {
//   requisitionId: string;
//   onClose: () => void;
// }) {
//   const [requisition, setRequisition] = useState<RequisitionDetail | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     loadRequisition();
//   }, [requisitionId]);

//   const loadRequisition = async () => {
//     setLoading(true);
//     const result = await getRequisitionById(requisitionId);
//     if (result.success) {
//       setRequisition(result.data);
//     }
//     setLoading(false);
//   };

//   const fmtDate = (d: string | Date | undefined) => {
//     if (!d) return "N/A";
//     return new Date(d).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const fmtDateShort = (d: string | Date | undefined) => {
//     if (!d) return "N/A";
//     return new Date(d).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const fmtAmount = (n: number) =>
//     `Nle ${new Intl.NumberFormat("en-US", {
//       minimumFractionDigits: 2,
//     }).format(n)}`;

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       "Pending approval": "bg-yellow-100 text-yellow-800 border-yellow-300",
//       "In review": "bg-blue-100 text-blue-800 border-blue-300",
//       Approved: "bg-green-100 text-green-800 border-green-300",
//       Rejected: "bg-red-100 text-red-800 border-red-300",
//     };
//     return colors[status] || "bg-gray-100 text-gray-800";
//   };

//   const getPriorityColor = (priority: string) => {
//     const colors: Record<string, string> = {
//       low: "bg-gray-100 text-gray-700 border-gray-300",
//       medium: "bg-blue-100 text-blue-700 border-blue-300",
//       high: "bg-orange-100 text-orange-700 border-orange-300",
//       urgent: "bg-red-100 text-red-700 border-red-300",
//     };
//     return colors[priority?.toLowerCase()] || colors.medium;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="border-b px-6 py-4 flex items-center justify-between bg-gradient-to-r from-muted/50 to-muted/30">
//           <div className="flex-1">
//             <h2 className="text-xl font-bold flex items-center gap-2">
//               <FileText className="h-5 w-5" />
//               {loading
//                 ? "Loading..."
//                 : requisition?.requisitionId || "Requisition Details"}
//             </h2>
//             <p className="text-sm text-muted-foreground mt-0.5">
//               Complete requisition information and history
//             </p>
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={onClose}
//             className="shrink-0"
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20">
//               <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
//               <p className="text-sm text-muted-foreground">
//                 Loading requisition details...
//               </p>
//             </div>
//           ) : !requisition ? (
//             <div className="flex flex-col items-center justify-center py-20">
//               <XCircle className="h-12 w-12 text-destructive mb-3" />
//               <p className="text-lg font-semibold">Requisition not found</p>
//               <p className="text-sm text-muted-foreground">
//                 The requested requisition could not be found
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* Status Header */}
//               <div className="flex items-center gap-3 flex-wrap">
//                 <Badge
//                   variant="outline"
//                   className={`${getStatusColor(
//                     requisition.status
//                   )} text-sm px-3 py-1`}
//                 >
//                   {requisition.status}
//                 </Badge>
//                 {requisition.priority && (
//                   <Badge
//                     variant="outline"
//                     className={`${getPriorityColor(
//                       requisition.priority
//                     )} text-sm px-3 py-1`}
//                   >
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     {requisition.priority} Priority
//                   </Badge>
//                 )}
//                 <Badge variant="outline" className="text-sm px-3 py-1">
//                   <DollarSign className="h-3 w-3 mr-1" />
//                   {fmtAmount(requisition.amount)}
//                 </Badge>
//               </div>

//               {/* Basic Information */}
//               <div className="border rounded-xl p-6 bg-muted/30">
//                 <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
//                   <Hash className="h-4 w-4" />
//                   Basic Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <InfoCard
//                     icon={User}
//                     label="Requester"
//                     value={requisition.requester}
//                   />
//                   <InfoCard
//                     icon={Building2}
//                     label="Branch"
//                     value={requisition.branch}
//                   />
//                   <InfoCard
//                     icon={Tag}
//                     label="Category"
//                     value={requisition.category}
//                   />
//                   <InfoCard
//                     icon={Calendar}
//                     label="Needed By"
//                     value={fmtDateShort(requisition.neededBy)}
//                   />
//                   <InfoCard
//                     icon={Clock}
//                     label="Submitted On"
//                     value={fmtDate(requisition.createdAt || requisition.date)}
//                   />
//                   {requisition.updatedAt && (
//                     <InfoCard
//                       icon={Clock}
//                       label="Last Updated"
//                       value={fmtDate(requisition.updatedAt)}
//                     />
//                   )}
//                   {requisition.costCenter && (
//                     <InfoCard
//                       icon={MapPin}
//                       label="Cost Center"
//                       value={requisition.costCenter}
//                     />
//                   )}
//                   {requisition.approvalRoute && (
//                     <InfoCard
//                       icon={CheckCircle2}
//                       label="Approval Route"
//                       value={requisition.approvalRoute}
//                     />
//                   )}
//                 </div>
//               </div>

//               {/* Description/Notes */}
//               {(requisition.description || requisition.notes) && (
//                 <div className="border rounded-xl p-6 bg-muted/30">
//                   <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
//                     <FileText className="h-4 w-4" />
//                     Description & Notes
//                   </h3>
//                   {requisition.description && (
//                     <div className="mb-3">
//                       <p className="text-xs text-muted-foreground mb-1">
//                         Description
//                       </p>
//                       <p className="text-sm">{requisition.description}</p>
//                     </div>
//                   )}
//                   {requisition.notes && (
//                     <div>
//                       <p className="text-xs text-muted-foreground mb-1">
//                         Additional Notes
//                       </p>
//                       <p className="text-sm">{requisition.notes}</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Line Items */}
//               {requisition.lineItems && requisition.lineItems.length > 0 && (
//                 <div className="border rounded-xl overflow-hidden">
//                   <div className="bg-muted/50 px-6 py-3 border-b">
//                     <h3 className="text-sm font-bold flex items-center gap-2">
//                       <Package className="h-4 w-4" />
//                       Line Items ({requisition.lineItems.length})
//                     </h3>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-sm">
//                       <thead className="border-b bg-muted/30">
//                         <tr>
//                           <th className="text-left px-6 py-3 font-semibold">
//                             #
//                           </th>
//                           <th className="text-left px-6 py-3 font-semibold">
//                             Description
//                           </th>
//                           <th className="text-right px-6 py-3 font-semibold">
//                             Quantity
//                           </th>
//                           <th className="text-right px-6 py-3 font-semibold">
//                             Unit
//                           </th>
//                           {requisition.lineItems.some(
//                             (item) => item.unitCost
//                           ) && (
//                             <>
//                               <th className="text-right px-6 py-3 font-semibold">
//                                 Unit Cost
//                               </th>
//                               <th className="text-right px-6 py-3 font-semibold">
//                                 Total
//                               </th>
//                             </>
//                           )}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {requisition.lineItems.map((item, idx) => (
//                           <tr
//                             key={idx}
//                             className="border-b last:border-0 hover:bg-muted/30"
//                           >
//                             <td className="px-6 py-4 text-muted-foreground">
//                               {idx + 1}
//                             </td>
//                             <td className="px-6 py-4">{item.description}</td>
//                             <td className="px-6 py-4 text-right font-medium">
//                               {item.quantity}
//                             </td>
//                             <td className="px-6 py-4 text-right">
//                               {item.unit || "Unit"}
//                             </td>
//                             {Array.isArray(requisition.lineItems) &&
//                               requisition.lineItems.some(
//                                 (li) => li.unitCost
//                               ) && (
//                                 <>
//                                   <td className="px-6 py-4 text-right">
//                                     {item.unitCost
//                                       ? fmtAmount(item.unitCost)
//                                       : "-"}
//                                   </td>
//                                   <td className="px-6 py-4 text-right font-semibold">
//                                     {item.total
//                                       ? fmtAmount(item.total)
//                                       : item.unitCost
//                                       ? fmtAmount(item.quantity * item.unitCost)
//                                       : "-"}
//                                   </td>
//                                 </>
//                               )}
//                           </tr>
//                         ))}
//                       </tbody>
//                       {Array.isArray(requisition.lineItems) &&
//                         requisition.lineItems.some((li) => li.unitCost) && (
//                           <tfoot className="border-t-2 bg-muted/50">
//                             <tr>
//                               <td
//                                 colSpan={5}
//                                 className="px-6 py-4 text-right font-bold"
//                               >
//                                 Total Amount:
//                               </td>
//                               <td className="px-6 py-4 text-right font-bold text-lg">
//                                 {fmtAmount(requisition.amount)}
//                               </td>
//                             </tr>
//                           </tfoot>
//                         )}
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {/* Attachments */}
//               {requisition.attachments &&
//                 requisition.attachments.length > 0 && (
//                   <div className="border rounded-xl overflow-hidden">
//                     <div className="bg-muted/50 px-6 py-3 border-b">
//                       <h3 className="text-sm font-bold flex items-center gap-2">
//                         <FileText className="h-4 w-4" />
//                         Attachments ({requisition.attachments.length})
//                       </h3>
//                     </div>
//                     <div className="p-6">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         {requisition.attachments.map((file, idx) => (
//                           <div
//                             key={idx}
//                             className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
//                           >
//                             <div className="p-2 rounded bg-primary/10">
//                               <FileText className="h-5 w-5 text-primary" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-medium truncate">
//                                 {file.filename}
//                               </p>
//                               {file.size && (
//                                 <p className="text-xs text-muted-foreground">
//                                   {(file.size / 1024).toFixed(2)} KB
//                                 </p>
//                               )}
//                             </div>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               asChild
//                               className="shrink-0"
//                             >
//                               <a
//                                 href={file.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <Download className="h-4 w-4" />
//                               </a>
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//               {/* Timeline */}
//               {requisition.timeline && requisition.timeline.length > 0 && (
//                 <div className="border rounded-xl overflow-hidden">
//                   <div className="bg-muted/50 px-6 py-3 border-b">
//                     <h3 className="text-sm font-bold flex items-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       Activity Timeline
//                     </h3>
//                   </div>
//                   <div className="p-6">
//                     <div className="space-y-4">
//                       {requisition.timeline.map((event, idx) => (
//                         <div key={idx} className="flex gap-3">
//                           <div className="flex flex-col items-center">
//                             <div className="w-2 h-2 rounded-full bg-primary mt-2" />
//                             {idx < requisition.timeline!.length - 1 && (
//                               <div className="w-px h-full bg-border mt-1" />
//                             )}
//                           </div>
//                           <div className="flex-1 pb-4">
//                             <p className="text-sm font-medium">{event.event}</p>
//                             <p className="text-xs text-muted-foreground mt-0.5">
//                               {fmtDate(event.timestamp)}
//                             </p>
//                             {event.details && (
//                               <p className="text-xs text-muted-foreground mt-1">
//                                 {event.details}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t px-6 py-4 flex items-center justify-between bg-muted/30">
//           <div className="text-xs text-muted-foreground">
//             {requisition && (
//               <span>
//                 ID: {requisition._id} • Created{" "}
//                 {fmtDateShort(requisition.createdAt || requisition.date)}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <Button variant="outline" onClick={onClose}>
//               Close
//             </Button>
//             {requisition && (
//               <Button
//                 onClick={() => {
//                   router.push(
//                     `/approvals?itemId=${encodeURIComponent(
//                       requisition.requisitionId
//                     )}`
//                   );
//                 }}
//               >
//                 Open in Approvals
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  Download,
  MapPin,
  Hash,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
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
  priority?: string;
  neededBy?: string | Date;
  description?: string;
  notes?: string;
  lineItems?: Array<{
    description: string;
    quantity: number;
    unit?: string;
    unitCost?: number;
    total?: number;
  }>;
  costCenter?: string;
  approvalRoute?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  attachments?: Array<{
    filename: string;
    url: string;
    size?: number;
  }>;
  timeline?: Array<{
    event: string;
    timestamp: string | Date;
    details?: string;
  }>;
};

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

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
    if (result.success) setRequisition(result.data);
    setLoading(false);
  };

  const fmtDate = (d?: string | Date) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const fmtDateShort = (d?: string | Date) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  const fmtAmount = (n: number) =>
    new Intl.NumberFormat("en-SL", {
      style: "currency",
      currency: "SLE",
      minimumFractionDigits: 2,
    }).format(n);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-background w-full max-w-6xl h-[95vh] sm:h-auto sm:max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b px-4 sm:px-6 py-3 sm:py-4 flex items-start sm:items-center justify-between gap-3 bg-muted/40">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 flex-wrap">
              <FileText className="h-5 w-5" />
              {loading ? "Loading..." : requisition?.requisitionId}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Complete requisition information
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : !requisition ? (
            <div className="text-center py-20">
              <XCircle className="h-10 w-10 mx-auto mb-2 text-destructive" />
              <p className="font-semibold">Requisition not found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{requisition.status}</Badge>
                <Badge variant="outline">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {fmtAmount(requisition.amount)}
                </Badge>
              </div>

              {/* Basic Info */}
              <div className="border rounded-xl p-4 sm:p-6 bg-muted/30">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <Hash className="h-4 w-4" /> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  <InfoCard
                    icon={Calendar}
                    label="Needed By"
                    value={fmtDateShort(requisition.neededBy)}
                  />
                  <InfoCard
                    icon={Clock}
                    label="Submitted On"
                    value={fmtDate(requisition.createdAt || requisition.date)}
                  />
                  {requisition.costCenter && (
                    <InfoCard
                      icon={MapPin}
                      label="Cost Center"
                      value={requisition.costCenter}
                    />
                  )}
                </div>
              </div>

              {/* Line Items */}
              {requisition.lineItems?.length ? (
                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-muted/50 px-4 sm:px-6 py-3 border-b">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Package className="h-4 w-4" /> Line Items
                    </h3>
                  </div>
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <table className="w-full text-xs sm:text-sm">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="px-3 sm:px-6 py-2 text-left">#</th>
                          <th className="px-3 sm:px-6 py-2 text-left">
                            Description
                          </th>
                          <th className="px-3 sm:px-6 py-2 text-right">Qty</th>
                          <th className="px-3 sm:px-6 py-2 text-right">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requisition.lineItems.map((item, i) => (
                          <tr key={i} className="border-b">
                            <td className="px-3 sm:px-6 py-2">{i + 1}</td>
                            <td className="px-3 sm:px-6 py-2">
                              {item.description}
                            </td>
                            <td className="px-3 sm:px-6 py-2 text-right">
                              {item.quantity}
                            </td>
                            <td className="px-3 sm:px-6 py-2 text-right">
                              {item.unit || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between bg-muted/30">
          <p className="text-xs text-muted-foreground truncate">
            {requisition &&
              `ID: ${requisition._id} • ${fmtDateShort(requisition.createdAt)}`}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            {requisition && (
              <Button
                className="w-full sm:w-auto"
                onClick={() =>
                  router.push(
                    `/approvals?itemId=${encodeURIComponent(
                      requisition.requisitionId
                    )}`
                  )
                }
              >
                Open in Approvals
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
