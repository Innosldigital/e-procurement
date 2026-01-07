// "use client";

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
// import {
//   approveRequest,
//   rejectRequest,
//   requestChanges,
//   getItemDetails,
// } from "@/lib/actions/approval-actions";
// import { useToast } from "@/hooks/use-toast";

// interface Comment {
//   author: string;
//   text: string;
//   date: string | Date;
// }

// interface ItemDetails {
//   _id: string;
//   type: string;
//   itemId: string;
//   amount?: number;
//   status: string;
//   requester?: string;
//   createdAt: string | Date;
//   costCenter?: string;
//   branch?: string;
//   reason?: string;
//   comments?: Comment[];
// }

// interface ApprovalDetailModalProps {
//   approvalId: string;
//   itemType: string;
//   onClose: () => void;
//   onActionComplete?: () => void;
// }

// export function ApprovalDetailModal({
//   approvalId,
//   itemType,
//   onClose,
//   onActionComplete,
// }: ApprovalDetailModalProps) {
//   const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [action, setAction] = useState<"approve" | "reject" | "changes" | null>(
//     null
//   );
//   const [comments, setComments] = useState("");
//   const { toast } = useToast();

//   useEffect(() => {
//     async function loadDetails() {
//       try {
//         const result = await getItemDetails(approvalId, itemType);
//         if (result.success && result.data) {
//           setItemDetails(result.data);
//         } else {
//           toast({
//             title: "Error",
//             description: result.error || "Failed to load details",
//             variant: "destructive",
//           });
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load details",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadDetails();
//   }, [approvalId, itemType, toast]);

//   const getStatusColor = (status?: string) => {
//     const s = status?.toLowerCase() || "";
//     if (s.includes("approved"))
//       return "bg-green-100 text-green-800 border-green-300";
//     if (s.includes("rejected")) return "bg-red-100 text-red-800 border-red-300";
//     if (s.includes("awaiting") || s.includes("pending"))
//       return "bg-yellow-100 text-yellow-800 border-yellow-300";
//     if (s.includes("review"))
//       return "bg-blue-100 text-blue-800 border-blue-300";
//     return "bg-gray-100 text-gray-800 border-gray-300";
//   };

//   const fmtAmount = (n?: number) => `Nle ${Number(n || 0).toLocaleString()}`;

//   const handleAction = async () => {
//     if (!action) return;

//     if ((action === "reject" || action === "changes") && !comments.trim()) {
//       toast({
//         title: "Error",
//         description: `Please provide ${
//           action === "reject" ? "a rejection reason" : "change details"
//         }`,
//         variant: "destructive",
//       });
//       return;
//     }

//     setActionLoading(true);
//     try {
//       let result;
//       if (action === "approve") {
//         result = await approveRequest(
//           approvalId,
//           itemType,
//           comments || undefined
//         );
//       } else if (action === "reject") {
//         result = await rejectRequest(approvalId, itemType, comments);
//       } else {
//         result = await requestChanges(approvalId, itemType, comments);
//       }

//       if (result.success) {
//         toast({
//           title: "Success",
//           description: `Request ${
//             action === "approve"
//               ? "approved"
//               : action === "reject"
//               ? "rejected"
//               : "changes requested"
//           } successfully`,
//         });
//         onActionComplete?.();
//         onClose();
//       } else {
//         toast({
//           title: "Error",
//           description: result.error || "Failed to process request",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while processing the request",
//         variant: "destructive",
//       });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Dialog open onOpenChange={onClose}>
//         <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//           </div>
//         </DialogContent>
//       </Dialog>
//     );
//   }

//   if (!itemDetails) return null;

//   const itemComments = itemDetails.comments || [];

//   return (
//     <Dialog open onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center justify-between">
//             <span>{itemType} Details</span>
//             <Badge
//               variant="outline"
//               className={getStatusColor(itemDetails.status)}
//             >
//               {itemDetails.status}
//             </Badge>
//           </DialogTitle>
//           <DialogDescription>
//             Review and take action on this {itemType.toLowerCase()} request
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label className="text-xs text-muted-foreground">Type</Label>
//               <div className="font-medium">{itemDetails.type}</div>
//             </div>
//             <div>
//               <Label className="text-xs text-muted-foreground">Item ID</Label>
//               <div className="font-medium">{itemDetails.itemId}</div>
//             </div>
//             <div>
//               <Label className="text-xs text-muted-foreground">Requester</Label>
//               <div className="font-medium">
//                 {itemDetails.requester || "N/A"}
//               </div>
//             </div>
//             <div>
//               <Label className="text-xs text-muted-foreground">Amount</Label>
//               <div className="font-medium">{fmtAmount(itemDetails.amount)}</div>
//             </div>
//             {itemDetails.costCenter && (
//               <div>
//                 <Label className="text-xs text-muted-foreground">
//                   Cost Center
//                 </Label>
//                 <div className="font-medium">{itemDetails.costCenter}</div>
//               </div>
//             )}
//             {itemDetails.branch && (
//               <div>
//                 <Label className="text-xs text-muted-foreground">Branch</Label>
//                 <div className="font-medium">{itemDetails.branch}</div>
//               </div>
//             )}
//           </div>

//           {itemDetails.reason && (
//             <>
//               <Separator />
//               <div>
//                 <Label className="text-xs text-muted-foreground">Reason</Label>
//                 <div className="text-sm mt-1">{itemDetails.reason}</div>
//               </div>
//             </>
//           )}

//           {itemComments.length > 0 && (
//             <>
//               <Separator />
//               <div>
//                 <Label className="text-xs text-muted-foreground">
//                   Comments
//                 </Label>
//                 <div className="space-y-2 mt-2">
//                   {itemComments.map((comment, idx) => (
//                     <div key={idx} className="text-sm bg-muted p-3 rounded-md">
//                       <div className="font-medium text-xs mb-1">
//                         {comment.author}
//                       </div>
//                       <div>{comment.text}</div>
//                       <div className="text-xs text-muted-foreground mt-1">
//                         {new Date(comment.date).toLocaleString()}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {!action && (
//             <>
//               <Separator />
//               <div className="flex gap-2">
//                 <Button
//                   onClick={() => setAction("approve")}
//                   className="flex-1"
//                   variant="default"
//                 >
//                   <CheckCircle2 className="h-4 w-4 mr-2" />
//                   Approve
//                 </Button>
//                 <Button
//                   onClick={() => setAction("changes")}
//                   className="flex-1"
//                   variant="outline"
//                 >
//                   <AlertCircle className="h-4 w-4 mr-2" />
//                   Request Changes
//                 </Button>
//                 <Button
//                   onClick={() => setAction("reject")}
//                   className="flex-1"
//                   variant="destructive"
//                 >
//                   <XCircle className="h-4 w-4 mr-2" />
//                   Reject
//                 </Button>
//               </div>
//             </>
//           )}

//           {action && (
//             <>
//               <Separator />
//               <div className="space-y-2">
//                 <Label htmlFor="comments">
//                   {action === "approve"
//                     ? "Comments (optional)"
//                     : action === "reject"
//                     ? "Rejection Reason *"
//                     : "Change Details *"}
//                 </Label>
//                 <Textarea
//                   id="comments"
//                   value={comments}
//                   onChange={(e) => setComments(e.target.value)}
//                   placeholder={
//                     action === "approve"
//                       ? "Add any comments..."
//                       : action === "reject"
//                       ? "Please provide a reason for rejection..."
//                       : "Please describe the required changes..."
//                   }
//                   rows={4}
//                 />
//               </div>
//             </>
//           )}
//         </div>

//         {action && (
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setAction(null);
//                 setComments("");
//               }}
//               disabled={actionLoading}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleAction} disabled={actionLoading}>
//               {actionLoading && (
//                 <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//               )}
//               {action === "approve"
//                 ? "Confirm Approval"
//                 : action === "reject"
//                 ? "Confirm Rejection"
//                 : "Submit Changes"}
//             </Button>
//           </DialogFooter>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import {
  approveRequest,
  rejectRequest,
  requestChanges,
  getItemDetails,
} from "@/lib/actions/approval-actions";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  author: string;
  text: string;
  date: string | Date;
}

interface ItemDetails {
  _id: string;
  type: string;
  itemId: string;
  amount?: number;
  status: string;
  requester?: string;
  createdAt: string | Date;
  costCenter?: string;
  branch?: string;
  reason?: string;
  comments?: Comment[];
}

// ✅ CRITICAL: This interface MUST include itemType
interface ApprovalDetailModalProps {
  approvalId: string;
  itemType: string; // ← THIS MUST BE HERE
  onClose: () => void;
  onActionComplete?: () => void;
}

export function ApprovalDetailModal({
  approvalId,
  itemType, // ← AND THIS MUST BE DESTRUCTURED HERE
  onClose,
  onActionComplete,
}: ApprovalDetailModalProps) {
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | "changes" | null>(
    null
  );
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    async function loadDetails() {
      try {
        console.log("Loading details for:", { approvalId, itemType });
        const result = await getItemDetails(approvalId, itemType);
        console.log("Result:", result);

        if (result.success && result.data) {
          console.log("Setting item details:", result.data);
          setItemDetails(result.data);
        } else {
          console.error("Failed to load details:", result.error);
          toast({
            title: "Error",
            description: result.error || "Failed to load details",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Exception loading details:", error);
        toast({
          title: "Error",
          description: "Failed to load details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [approvalId, itemType, toast]);

  const getStatusColor = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("approved"))
      return "bg-green-100 text-green-800 border-green-300";
    if (s.includes("rejected")) return "bg-red-100 text-red-800 border-red-300";
    if (s.includes("awaiting") || s.includes("pending"))
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (s.includes("review"))
      return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  const fmtAmount = (n?: number) => `Nle ${Number(n || 0).toLocaleString()}`;

  const handleAction = async () => {
    if (!action) return;

    if ((action === "reject" || action === "changes") && !comments.trim()) {
      toast({
        title: "Error",
        description: `Please provide ${
          action === "reject" ? "a rejection reason" : "change details"
        }`,
        variant: "destructive",
      });
      return;
    }

    setActionLoading(true);
    try {
      let result;
      if (action === "approve") {
        result = await approveRequest(
          approvalId,
          itemType,
          comments || undefined
        );
      } else if (action === "reject") {
        result = await rejectRequest(approvalId, itemType, comments);
      } else {
        result = await requestChanges(approvalId, itemType, comments);
      }

      if (result.success) {
        toast({
          title: "Success",
          description: `Request ${
            action === "approve"
              ? "approved"
              : action === "reject"
              ? "rejected"
              : "changes requested"
          } successfully`,
        });
        onActionComplete?.();
        onClose();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to process request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing the request",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!itemDetails) return null;

  const itemComments = itemDetails.comments || [];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{itemType} Details</span>
            <Badge
              variant="outline"
              className={getStatusColor(itemDetails.status)}
            >
              {itemDetails.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Review and take action on this {itemType.toLowerCase()} request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Type</Label>
              <div className="font-medium">{itemDetails.type}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Item ID</Label>
              <div className="font-medium">{itemDetails.itemId}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Requester</Label>
              <div className="font-medium">
                {itemDetails.requester || "N/A"}
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Amount</Label>
              <div className="font-medium">{fmtAmount(itemDetails.amount)}</div>
            </div>
            {itemDetails.costCenter && (
              <div>
                <Label className="text-xs text-muted-foreground">
                  Cost Center
                </Label>
                <div className="font-medium">{itemDetails.costCenter}</div>
              </div>
            )}
            {itemDetails.branch && (
              <div>
                <Label className="text-xs text-muted-foreground">Branch</Label>
                <div className="font-medium">{itemDetails.branch}</div>
              </div>
            )}
          </div>

          {itemDetails.reason && (
            <>
              <Separator />
              <div>
                <Label className="text-xs text-muted-foreground">Reason</Label>
                <div className="text-sm mt-1">{itemDetails.reason}</div>
              </div>
            </>
          )}

          {itemComments.length > 0 && (
            <>
              <Separator />
              <div>
                <Label className="text-xs text-muted-foreground">
                  Comments
                </Label>
                <div className="space-y-2 mt-2">
                  {itemComments.map((comment, idx) => (
                    <div key={idx} className="text-sm bg-muted p-3 rounded-md">
                      <div className="font-medium text-xs mb-1">
                        {comment.author}
                      </div>
                      <div>{comment.text}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(comment.date).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!action && (
            <>
              <Separator />
              <div className="flex gap-2">
                <Button
                  onClick={() => setAction("approve")}
                  className="flex-1"
                  variant="default"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => setAction("changes")}
                  className="flex-1"
                  variant="outline"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Request Changes
                </Button>
                <Button
                  onClick={() => setAction("reject")}
                  className="flex-1"
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </>
          )}

          {action && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="comments">
                  {action === "approve"
                    ? "Comments (optional)"
                    : action === "reject"
                    ? "Rejection Reason *"
                    : "Change Details *"}
                </Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder={
                    action === "approve"
                      ? "Add any comments..."
                      : action === "reject"
                      ? "Please provide a reason for rejection..."
                      : "Please describe the required changes..."
                  }
                  rows={4}
                />
              </div>
            </>
          )}
        </div>

        {action && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAction(null);
                setComments("");
              }}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleAction} disabled={actionLoading}>
              {actionLoading && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {action === "approve"
                ? "Confirm Approval"
                : action === "reject"
                ? "Confirm Rejection"
                : "Submit Changes"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
