// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { useUser } from "@clerk/nextjs";
// import { StatusBadge } from "@/components/status-badge";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { FileText, Plus, RefreshCw } from "lucide-react";
// import {
//   getTenders,
//   awardTender,
//   requestRevisedBids,
//   getTenderStats,
// } from "@/lib/actions/tender-actions";
// import { CreateTenderForm } from "@/components/create-tender-form";
// import { TenderScorecardModal } from "@/components/tender-scorecard-modal";
// import { TemplatesRulesModal } from "@/components/templates-rules-modal";
// import { SubmitBidForm } from "@/components/submit-bid-form";

// export default function TendersPage() {
//   const [tenders, setTenders] = useState<any[]>([]);
//   const [selectedTender, setSelectedTender] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [showCreate, setShowCreate] = useState(false);
//   const [showScorecard, setShowScorecard] = useState(false);
//   const [showTemplatesRules, setShowTemplatesRules] = useState(false);
//   const [showBidForm, setShowBidForm] = useState(false);
//   const { user } = useUser();
//   const [canCreateTender, setCanCreateTender] = useState(false);
//   const [isSupplier, setIsSupplier] = useState(false);
//   const [stats, setStats] = useState<{
//     openCount: number;
//     evalCount: number;
//     avgBids: number;
//   } | null>(null);

//   // Memoized function to load tenders
//   const loadTenders = useCallback(
//     async (showLoader = true) => {
//       if (showLoader) setLoading(true);
//       try {
//         const result = await getTenders();
//         if (result.success && result.data) {
//           setTenders(result.data);

//           // If we have a selected tender, update it with fresh data
//           if (selectedTender) {
//             const updatedSelected = result.data.find(
//               (t: any) => t._id === selectedTender._id
//             );
//             if (updatedSelected) {
//               setSelectedTender(updatedSelected);
//             } else if (result.data.length > 0) {
//               setSelectedTender(result.data[0]);
//             }
//           } else if (result.data.length > 0) {
//             setSelectedTender(result.data[0]);
//           }
//         }
//       } catch (error) {
//         console.error("Error loading tenders:", error);
//       } finally {
//         if (showLoader) setLoading(false);
//       }
//     },
//     [selectedTender]
//   );

//   // Memoized function to load stats
//   const loadStats = useCallback(async () => {
//     try {
//       const result = await getTenderStats();
//       if (result.success) {
//         setStats(result.data ?? null);
//       } else {
//         setStats(null);
//       }
//     } catch (error) {
//       console.error("Error loading stats:", error);
//       setStats(null);
//     }
//   }, []);

//   // Manual refresh function
//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await Promise.all([loadTenders(false), loadStats()]);
//     setRefreshing(false);
//   };

//   // Initial load
//   useEffect(() => {
//     loadTenders();
//   }, []);

//   // Load stats
//   useEffect(() => {
//     loadStats();
//   }, [loadStats]);

//   // Check user permissions
//   useEffect(() => {
//     const md = (user?.publicMetadata || {}) as any;
//     const rawRole = String(md.role || "");
//     const normalized = rawRole.toLowerCase().replace(/[\s_-]/g, "");
//     setCanCreateTender(["admin", "company", "superadmin"].includes(normalized));
//     setIsSupplier(normalized === "supplier");
//   }, [user]);

//   const handleSubmitBid = () => {
//     setShowBidForm(true);
//   };

//   const handleCloseCreateForm = async () => {
//     setShowCreate(false);
//     // Refresh data after creating tender
//     await handleRefresh();
//   };

//   const handleCloseBidForm = async () => {
//     setShowBidForm(false);
//     // Refresh data after submitting bid
//     await handleRefresh();
//   };

//   return (
//     <div className="p-6">
//       <div className="max-w-[1600px] mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold text-foreground mb-2">
//               Tenders
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Plan, publish, and evaluate sourcing events across your
//               organization.
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleRefresh}
//               disabled={refreshing}
//             >
//               <RefreshCw
//                 className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
//               />
//               Refresh
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setShowTemplatesRules(true)}
//             >
//               <FileText className="w-4 h-4 mr-2" />
//               Templates & rules
//             </Button>
//             {canCreateTender && (
//               <Button size="sm" onClick={() => setShowCreate(true)}>
//                 <Plus className="w-4 h-4 mr-2" />
//                 New tender
//               </Button>
//             )}
//           </div>
//         </div>
//         <div className="bg-card border border-border rounded-lg p-4 mb-6">
//           <div className="flex flex-wrap gap-6 text-sm">
//             <div>
//               <span className="text-muted-foreground">View:</span>{" "}
//               <span className="font-medium">Active & in evaluation</span>
//             </div>
//             <div>
//               <span className="text-muted-foreground">Stage:</span>{" "}
//               <span className="font-medium">Open, Evaluation</span>
//             </div>
//             <div>
//               <span className="text-muted-foreground">Type:</span>{" "}
//               <span className="font-medium">RFP, RFQ</span>
//             </div>
//             <div>
//               <span className="text-muted-foreground">Region:</span>{" "}
//               <span className="font-medium">InnoSL HQ</span>
//             </div>
//           </div>
//           <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
//             <span>{stats ? stats.openCount : "-"} open tenders</span>
//             <span>{stats ? stats.evalCount : "-"} in final evaluation</span>
//             <span>
//               Avg. {stats ? (stats.avgBids || 0).toFixed(1) : "-"} bids per
//               tender
//             </span>
//           </div>
//         </div>
//         <div className="grid grid-cols-5 gap-6">
//           <div className="col-span-2 bg-card border border-border rounded-lg">
//             <div className="border-b border-border p-4 flex items-center justify-between">
//               <div>
//                 <h2 className="font-medium">Sourcing pipeline</h2>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Select a tender to review participation and evaluation.
//                 </p>
//               </div>
//               <span className="text-xs text-muted-foreground">
//                 {tenders.length} tender{tenders.length !== 1 ? "s" : ""}
//               </span>
//             </div>
//             <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
//               {loading ? (
//                 <div className="p-8 text-center text-muted-foreground text-sm">
//                   Loading tenders...
//                 </div>
//               ) : tenders.length === 0 ? (
//                 <div className="p-8 text-center">
//                   <p className="text-muted-foreground text-sm mb-4">
//                     No tenders found.
//                   </p>
//                   {canCreateTender && (
//                     <Button size="sm" onClick={() => setShowCreate(true)}>
//                       <Plus className="w-4 h-4 mr-2" />
//                       Create your first tender
//                     </Button>
//                   )}
//                 </div>
//               ) : (
//                 tenders.map((tender) => (
//                   <button
//                     key={tender._id}
//                     onClick={() => setSelectedTender(tender)}
//                     className={`w-full text-left p-4 hover:bg-accent/50 transition-colors ${
//                       selectedTender?._id === tender._id ? "bg-accent" : ""
//                     }`}
//                   >
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex-1">
//                         <div className="font-medium text-sm mb-1">
//                           {tender.tenderId}
//                         </div>
//                         <div className="text-xs text-muted-foreground mb-2">
//                           {tender.title}
//                         </div>
//                         <div className="flex gap-2">
//                           <Badge variant="outline" className="text-xs">
//                             {tender.type}
//                           </Badge>
//                           <StatusBadge status={tender.stage || tender.status} />
//                         </div>
//                       </div>
//                       <div className="text-right text-xs text-muted-foreground">
//                         <div>{tender.bids?.length || 0} responses</div>
//                       </div>
//                     </div>
//                     {tender.closeDate && (
//                       <div className="text-xs text-muted-foreground">
//                         Close: {new Date(tender.closeDate).toLocaleDateString()}
//                       </div>
//                     )}
//                   </button>
//                 ))
//               )}
//             </div>
//             <div className="p-3 border-t border-border text-xs text-muted-foreground">
//               Tip: Use "Templates & rules" to standardize scoring and mandatory
//               questions.
//             </div>
//           </div>
//           {selectedTender && (
//             <div className="col-span-3 bg-card border border-border rounded-lg">
//               <div className="border-b border-border p-4 flex items-center justify-between">
//                 <div>
//                   <h2 className="font-medium">
//                     {selectedTender.tenderId} · {selectedTender.title}
//                   </h2>
//                   <div className="flex gap-4 text-xs text-muted-foreground mt-1">
//                     <span>Owner: {selectedTender.owner}</span>
//                     {selectedTender.category && (
//                       <span>Category: {selectedTender.category}</span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <StatusBadge
//                     status={selectedTender.stage || selectedTender.status}
//                   />
//                   <div className="text-xs text-muted-foreground mt-1">
//                     {selectedTender.stage === "Evaluation"
//                       ? "In evaluation"
//                       : "Active"}
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
//                 {isSupplier &&
//                   (selectedTender.type === "RFQ" ||
//                     selectedTender.type === "RFP") &&
//                   selectedTender.stage !== "Awarded" &&
//                   selectedTender.stage !== "Closed" && (
//                     <div className="bg-accent/30 border border-border rounded-lg p-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h3 className="text-sm font-medium mb-1">
//                             Supplier Bidding
//                           </h3>
//                           <p className="text-xs text-muted-foreground">
//                             Submit your bid for this {selectedTender.type}{" "}
//                             before the closing date
//                           </p>
//                         </div>
//                         <Button onClick={handleSubmitBid}>Submit Bid</Button>
//                       </div>
//                     </div>
//                   )}

//                 <div className="flex gap-4 text-xs">
//                   {selectedTender.businessUnit && (
//                     <span>Business unit: {selectedTender.businessUnit}</span>
//                   )}
//                   {selectedTender.region && (
//                     <span>Region: {selectedTender.region}</span>
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium mb-3">
//                     Overview & key details
//                   </h3>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     {selectedTender.sourcingObjective && (
//                       <div>
//                         <div className="text-muted-foreground text-xs mb-1">
//                           Sourcing objective
//                         </div>
//                         <div>{selectedTender.sourcingObjective}</div>
//                       </div>
//                     )}
//                     {selectedTender.estimatedValue && (
//                       <div>
//                         <div className="text-muted-foreground text-xs mb-1">
//                           Estimated contract value
//                         </div>
//                         <div className="font-medium">
//                           Nle {selectedTender.estimatedValue.toLocaleString()}
//                         </div>
//                       </div>
//                     )}
//                     {selectedTender.sourcingType && (
//                       <div>
//                         <div className="text-muted-foreground text-xs mb-1">
//                           Sourcing type
//                         </div>
//                         <div>{selectedTender.sourcingType}</div>
//                       </div>
//                     )}
//                     <div>
//                       <div className="text-muted-foreground text-xs mb-1">
//                         Key dates
//                       </div>
//                       <div>
//                         {selectedTender.publishedDate && (
//                           <>
//                             Published:{" "}
//                             {new Date(
//                               selectedTender.publishedDate
//                             ).toLocaleDateString()}
//                           </>
//                         )}
//                         {selectedTender.closeDate && (
//                           <>
//                             {" · "}
//                             Close:{" "}
//                             {new Date(
//                               selectedTender.closeDate
//                             ).toLocaleDateString()}
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {selectedTender.tenderDocuments &&
//                   selectedTender.tenderDocuments.length > 0 && (
//                     <div>
//                       <h3 className="text-sm font-medium mb-3">
//                         Tender Documents
//                       </h3>
//                       <div className="space-y-2">
//                         {selectedTender.tenderDocuments.map(
//                           (doc: any, i: number) => (
//                             <a
//                               key={i}
//                               href={doc.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-center gap-2 text-xs text-primary hover:underline"
//                             >
//                               <FileText className="w-4 h-4" />
//                               {doc.name} ({(doc.size / 1024).toFixed(1)} KB)
//                             </a>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   )}

//                 {String(
//                   selectedTender.stage || selectedTender.status
//                 ).toLowerCase() === "evaluation" &&
//                   selectedTender.evaluationSummary && (
//                     <div>
//                       <h3 className="text-sm font-medium mb-3">
//                         Evaluation summary
//                       </h3>
//                       <div className="grid grid-cols-2 gap-4">
//                         {selectedTender.evaluationSummary
//                           .recommendedSupplier && (
//                           <div>
//                             <div className="text-muted-foreground text-xs mb-1">
//                               Recommended supplier
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <span className="font-medium">
//                                 {
//                                   selectedTender.evaluationSummary
//                                     .recommendedSupplier
//                                 }
//                               </span>
//                               {selectedTender.evaluationSummary.score && (
//                                 <Badge className="bg-success/20 text-success-foreground">
//                                   Score:{" "}
//                                   {selectedTender.evaluationSummary.score} / 100
//                                 </Badge>
//                               )}
//                             </div>
//                           </div>
//                         )}
//                         <div>
//                           <div className="text-muted-foreground text-xs mb-1">
//                             Total evaluated bids
//                           </div>
//                           <div className="font-medium">
//                             {selectedTender.bids?.length || 0} bids
//                             {selectedTender.evaluationSummary.disqualified ? (
//                               <>
//                                 {" "}
//                                 ·{" "}
//                                 {
//                                   selectedTender.evaluationSummary.disqualified
//                                 }{" "}
//                                 disqualified
//                               </>
//                             ) : null}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                 {selectedTender.bids && selectedTender.bids.length > 0 && (
//                   <div>
//                     <h3 className="text-sm font-medium mb-3">
//                       Bids & scoring comparison
//                     </h3>
//                     <div className="border border-border rounded-lg overflow-hidden">
//                       <table className="w-full text-xs">
//                         <thead className="bg-muted/50">
//                           <tr>
//                             <th className="text-left p-3 font-medium">
//                               Supplier
//                             </th>
//                             <th className="text-right p-3 font-medium">
//                               Total price
//                             </th>
//                             {selectedTender.bids.some((b: any) => b.score) && (
//                               <th className="text-center p-3 font-medium">
//                                 Score
//                               </th>
//                             )}
//                             <th className="text-center p-3 font-medium">
//                               Compliance
//                             </th>
//                             <th className="text-left p-3 font-medium">
//                               Highlights
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-border">
//                           {selectedTender.bids.map((bid: any, i: number) => (
//                             <tr key={i}>
//                               <td className="p-3 font-medium">
//                                 {bid.supplier}
//                               </td>
//                               <td className="p-3 text-right">
//                                 Nle {bid.totalPrice?.toLocaleString()}
//                               </td>
//                               {selectedTender.bids.some(
//                                 (b: any) => b.score
//                               ) && (
//                                 <td className="p-3 text-center">
//                                   {bid.score ? (
//                                     <Badge
//                                       className={
//                                         i === 0
//                                           ? "bg-success/20 text-success-foreground"
//                                           : "bg-muted"
//                                       }
//                                     >
//                                       {bid.score}
//                                     </Badge>
//                                   ) : (
//                                     "-"
//                                   )}
//                                 </td>
//                               )}
//                               <td className="p-3 text-center">
//                                 <span className={i === 0 ? "text-success" : ""}>
//                                   {bid.compliance || "Pending"}
//                                 </span>
//                               </td>
//                               <td className="p-3 text-muted-foreground">
//                                 {bid.highlights || "-"}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}

//                 {selectedTender.timeline &&
//                   selectedTender.timeline.length > 0 && (
//                     <div>
//                       <h3 className="text-sm font-medium mb-2">
//                         Timeline & governance
//                       </h3>
//                       <div className="space-y-3">
//                         {selectedTender.timeline.map(
//                           (activity: any, i: number) => (
//                             <div key={i} className="flex gap-3">
//                               <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
//                               <div className="flex-1">
//                                 <div className="text-sm font-medium">
//                                   {activity.event}
//                                 </div>
//                                 <div className="text-xs text-muted-foreground">
//                                   {activity.date &&
//                                     new Date(activity.date).toLocaleString()}
//                                   {activity.owner && ` · ${activity.owner}`}
//                                 </div>
//                               </div>
//                             </div>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   )}

//                 {selectedTender.notes && (
//                   <div>
//                     <h3 className="text-sm font-medium mb-2">
//                       Notes & attachments
//                     </h3>
//                     <p className="text-xs text-muted-foreground">
//                       {selectedTender.notes}
//                     </p>
//                   </div>
//                 )}

//                 {!isSupplier && (
//                   <div className="border-t border-border pt-4">
//                     <h3 className="text-sm font-medium mb-2">Next actions</h3>
//                     <p className="text-xs text-muted-foreground mb-4">
//                       Manage this tender and coordinate with suppliers.
//                     </p>
//                     <div className="flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setShowScorecard(true)}
//                       >
//                         View full scorecard
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={async () => {
//                           await requestRevisedBids(selectedTender._id);
//                           await handleRefresh();
//                         }}
//                       >
//                         Request revised bids
//                       </Button>
//                       {selectedTender.evaluationSummary
//                         ?.recommendedSupplier && (
//                         <Button
//                           size="sm"
//                           onClick={async () => {
//                             await awardTender(
//                               selectedTender._id,
//                               selectedTender.evaluationSummary
//                                 .recommendedSupplier
//                             );
//                             await handleRefresh();
//                           }}
//                         >
//                           Award tender
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <footer className="border-t border-border p-4 flex items-center justify-between text-xs text-muted-foreground mt-6">
//         <div className="flex gap-6">
//           <span>
//             Branch: <span className="text-primary">Global HQ</span>
//           </span>
//           <span>
//             Total tenders: <span className="font-medium">{tenders.length}</span>
//           </span>
//         </div>
//       </footer>
//       {showCreate && <CreateTenderForm onClose={handleCloseCreateForm} />}
//       {showScorecard && selectedTender && (
//         <TenderScorecardModal
//           tender={selectedTender}
//           onClose={() => setShowScorecard(false)}
//         />
//       )}
//       {showTemplatesRules && (
//         <TemplatesRulesModal onClose={() => setShowTemplatesRules(false)} />
//       )}
//       {showBidForm && selectedTender && (
//         <SubmitBidForm tender={selectedTender} onClose={handleCloseBidForm} />
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, RefreshCw } from "lucide-react";
import {
  getTenders,
  awardTender,
  requestRevisedBids,
  getTenderStats,
} from "@/lib/actions/tender-actions";
import { CreateTenderForm } from "@/components/create-tender-form";
import { TenderScorecardModal } from "@/components/tender-scorecard-modal";
import { TemplatesRulesModal } from "@/components/templates-rules-modal";
import { SubmitBidForm } from "@/components/submit-bid-form";

function TendersPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [selectedTender, setSelectedTender] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);
  const [showTemplatesRules, setShowTemplatesRules] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const { user } = useUser();

  const [canCreateTender, setCanCreateTender] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isAdminOrSuperAdmin, setIsAdminOrSuperAdmin] = useState(false);

  const [stats, setStats] = useState<{
    openCount: number;
    evalCount: number;
    avgBids: number;
  } | null>(null);

  // Memoized function to load tenders
  const loadTenders = useCallback(
    async (showLoader = true) => {
      if (showLoader) setLoading(true);
      try {
        const result = await getTenders();
        if (result.success && result.data) {
          setTenders(result.data);

          if (selectedTender) {
            const updatedSelected = result.data.find(
              (t: any) => t._id === selectedTender._id
            );
            if (updatedSelected) {
              setSelectedTender(updatedSelected);
            } else if (result.data.length > 0) {
              setSelectedTender(result.data[0]);
            }
          } else if (result.data.length > 0) {
            setSelectedTender(result.data[0]);
          }
        }
      } catch (error) {
        console.error("Error loading tenders:", error);
      } finally {
        if (showLoader) setLoading(false);
      }
    },
    [selectedTender]
  );

  // Memoized function to load stats
  const loadStats = useCallback(async () => {
    try {
      const result = await getTenderStats();
      if (result.success) {
        setStats(result.data ?? null);
      } else {
        setStats(null);
      }
    } catch (error) {
      console.error("Error loading stats:", error);
      setStats(null);
    }
  }, []);

  // Manual refresh function
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadTenders(false), loadStats()]);
    setRefreshing(false);
  };

  // Initial load
  useEffect(() => {
    loadTenders();
  }, []);

  // Load stats
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Check user permissions and role
  useEffect(() => {
    if (!user) return;

    const md = (user.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const normalized = rawRole.toLowerCase().replace(/[\s_-]/g, "");

    setCanCreateTender(["admin", "company", "superadmin"].includes(normalized));
    setIsSupplier(normalized === "supplier");
    setIsAdminOrSuperAdmin(["admin", "superadmin"].includes(normalized));
  }, [user]);

  const handleSubmitBid = () => {
    setShowBidForm(true);
  };

  const handleCloseCreateForm = async () => {
    setShowCreate(false);
    await handleRefresh();
  };

  const handleCloseBidForm = async () => {
    setShowBidForm(false);
    await handleRefresh();
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Tenders
            </h1>
            <p className="text-sm text-muted-foreground">
              Plan, publish, and evaluate sourcing events across your
              organization.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            {/* Only admin & superadmin see Templates & rules */}
            {isAdminOrSuperAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplatesRules(true)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Templates & rules
              </Button>
            )}

            {canCreateTender && (
              <Button size="sm" onClick={() => setShowCreate(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New tender
              </Button>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">View:</span>{" "}
              <span className="font-medium">Active & in evaluation</span>
            </div>
            <div>
              <span className="text-muted-foreground">Stage:</span>{" "}
              <span className="font-medium">Open, Evaluation</span>
            </div>
            <div>
              <span className="text-muted-foreground">Type:</span>{" "}
              <span className="font-medium">RFP, RFQ</span>
            </div>
            <div>
              <span className="text-muted-foreground">Region:</span>{" "}
              <span className="font-medium">InnoSL HQ</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
            <span>{stats ? stats.openCount : "-"} open tenders</span>
            <span>{stats ? stats.evalCount : "-"} in final evaluation</span>
            <span>
              Avg. {stats ? (stats.avgBids || 0).toFixed(1) : "-"} bids per
              tender
            </span>
          </div>
        </div>

        {/* Responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
          {/* Tender List */}
          <div className="md:col-span-2 bg-card border border-border rounded-lg order-1">
            <div className="border-b border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-medium">Sourcing pipeline</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Select a tender to review participation and evaluation.
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {tenders.length} tender{tenders.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="divide-y divide-border max-h-[50vh] md:max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Loading tenders...
                </div>
              ) : tenders.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground text-sm mb-4">
                    No tenders found.
                  </p>
                  {canCreateTender && (
                    <Button size="sm" onClick={() => setShowCreate(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create your first tender
                    </Button>
                  )}
                </div>
              ) : (
                tenders.map((tender) => (
                  <button
                    key={tender._id}
                    onClick={() => setSelectedTender(tender)}
                    className={`w-full text-left p-4 hover:bg-accent/50 transition-colors ${
                      selectedTender?._id === tender._id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm mb-1 truncate">
                          {tender.tenderId}
                        </div>
                        <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {tender.title}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            {tender.type}
                          </Badge>
                          <StatusBadge status={tender.stage || tender.status} />
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground ml-4">
                        <div>{tender.bids?.length || 0} responses</div>
                      </div>
                    </div>
                    {tender.closeDate && (
                      <div className="text-xs text-muted-foreground">
                        Close: {new Date(tender.closeDate).toLocaleDateString()}
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
            <div className="p-3 border-t border-border text-xs text-muted-foreground">
              Tip: Use "Templates & rules" to standardize scoring and mandatory
              questions.
            </div>
          </div>

          {/* Tender Details */}
          {selectedTender && (
            <div className="md:col-span-3 bg-card border border-border rounded-lg order-2">
              <div className="border-b border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium truncate">
                    {selectedTender.tenderId} · {selectedTender.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-1">
                    <span>Owner: {selectedTender.owner}</span>
                    {selectedTender.category && (
                      <span>Category: {selectedTender.category}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge
                    status={selectedTender.stage || selectedTender.status}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {selectedTender.stage === "Evaluation"
                      ? "In evaluation"
                      : "Active"}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6 max-h-[50vh] md:max-h-[600px] overflow-y-auto">
                {/* Supplier bidding card */}
                {isSupplier &&
                  (selectedTender.type === "RFQ" ||
                    selectedTender.type === "RFP") &&
                  selectedTender.stage !== "Awarded" &&
                  selectedTender.stage !== "Closed" && (
                    <div className="bg-accent/30 border border-border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            Supplier Bidding
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Submit your bid for this {selectedTender.type}{" "}
                            before the closing date
                          </p>
                        </div>
                        <Button onClick={handleSubmitBid}>Submit Bid</Button>
                      </div>
                    </div>
                  )}

                {/* Rest of the details — unchanged from your original */}
                <div className="flex flex-wrap gap-4 text-xs">
                  {selectedTender.businessUnit && (
                    <span>Business unit: {selectedTender.businessUnit}</span>
                  )}
                  {selectedTender.region && (
                    <span>Region: {selectedTender.region}</span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Overview & key details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {selectedTender.sourcingObjective && (
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">
                          Sourcing objective
                        </div>
                        <div>{selectedTender.sourcingObjective}</div>
                      </div>
                    )}
                    {selectedTender.estimatedValue && (
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">
                          Estimated contract value
                        </div>
                        <div className="font-medium">
                          Nle {selectedTender.estimatedValue.toLocaleString()}
                        </div>
                      </div>
                    )}
                    {selectedTender.sourcingType && (
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">
                          Sourcing type
                        </div>
                        <div>{selectedTender.sourcingType}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">
                        Key dates
                      </div>
                      <div>
                        {selectedTender.publishedDate && (
                          <>
                            Published:{" "}
                            {new Date(
                              selectedTender.publishedDate
                            ).toLocaleDateString()}
                          </>
                        )}
                        {selectedTender.closeDate && (
                          <>
                            {" "}
                            · Close:{" "}
                            {new Date(
                              selectedTender.closeDate
                            ).toLocaleDateString()}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedTender.tenderDocuments &&
                  selectedTender.tenderDocuments.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Tender Documents
                      </h3>
                      <div className="space-y-2">
                        {selectedTender.tenderDocuments.map(
                          (doc: any, i: number) => (
                            <a
                              key={i}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs text-primary hover:underline"
                            >
                              <FileText className="w-4 h-4" />
                              {doc.name} ({(doc.size / 1024).toFixed(1)} KB)
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {String(
                  selectedTender.stage || selectedTender.status
                ).toLowerCase() === "evaluation" &&
                  selectedTender.evaluationSummary && (
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Evaluation summary
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedTender.evaluationSummary
                          .recommendedSupplier && (
                          <div>
                            <div className="text-muted-foreground text-xs mb-1">
                              Recommended supplier
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {
                                  selectedTender.evaluationSummary
                                    .recommendedSupplier
                                }
                              </span>
                              {selectedTender.evaluationSummary.score && (
                                <Badge className="bg-success/20 text-success-foreground">
                                  Score:{" "}
                                  {selectedTender.evaluationSummary.score} / 100
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">
                            Total evaluated bids
                          </div>
                          <div className="font-medium">
                            {selectedTender.bids?.length || 0} bids
                            {selectedTender.evaluationSummary.disqualified ? (
                              <>
                                {" "}
                                ·{" "}
                                {
                                  selectedTender.evaluationSummary.disqualified
                                }{" "}
                                disqualified
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {selectedTender.bids && selectedTender.bids.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Bids & scoring comparison
                    </h3>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <table className="w-full text-xs">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-3 font-medium">
                              Supplier
                            </th>
                            <th className="text-right p-3 font-medium">
                              Total price
                            </th>
                            {selectedTender.bids.some((b: any) => b.score) && (
                              <th className="text-center p-3 font-medium">
                                Score
                              </th>
                            )}
                            <th className="text-center p-3 font-medium">
                              Compliance
                            </th>
                            <th className="text-left p-3 font-medium">
                              Highlights
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {selectedTender.bids.map((bid: any, i: number) => (
                            <tr key={i}>
                              <td className="p-3 font-medium">
                                {bid.supplier}
                              </td>
                              <td className="p-3 text-right">
                                Nle {bid.totalPrice?.toLocaleString()}
                              </td>
                              {selectedTender.bids.some(
                                (b: any) => b.score
                              ) && (
                                <td className="p-3 text-center">
                                  {bid.score ? (
                                    <Badge
                                      className={
                                        i === 0
                                          ? "bg-success/20 text-success-foreground"
                                          : "bg-muted"
                                      }
                                    >
                                      {bid.score}
                                    </Badge>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              )}
                              <td className="p-3 text-center">
                                <span className={i === 0 ? "text-success" : ""}>
                                  {bid.compliance || "Pending"}
                                </span>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                {bid.highlights || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {selectedTender.timeline &&
                  selectedTender.timeline.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Timeline & governance
                      </h3>
                      <div className="space-y-3">
                        {selectedTender.timeline.map(
                          (activity: any, i: number) => (
                            <div key={i} className="flex gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                              <div className="flex-1">
                                <div className="text-sm font-medium">
                                  {activity.event}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {activity.date &&
                                    new Date(activity.date).toLocaleString()}
                                  {activity.owner && ` · ${activity.owner}`}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {selectedTender.notes && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Notes & attachments
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedTender.notes}
                    </p>
                  </div>
                )}
                {!isSupplier && (
                  <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-medium mb-2">Next actions</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Manage this tender and coordinate with suppliers.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowScorecard(true)}
                      >
                        View full scorecard
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          await requestRevisedBids(selectedTender._id);
                          await handleRefresh();
                        }}
                      >
                        Request revised bids
                      </Button>
                      {selectedTender.evaluationSummary
                        ?.recommendedSupplier && (
                        <Button
                          size="sm"
                          onClick={async () => {
                            await awardTender(
                              selectedTender._id,
                              selectedTender.evaluationSummary
                                .recommendedSupplier
                            );
                            await handleRefresh();
                          }}
                        >
                          Award tender
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-muted-foreground mt-6 gap-3">
        <div className="flex flex-wrap gap-6">
          <span>
            Branch: <span className="text-primary">Global HQ</span>
          </span>
          <span>
            Total tenders: <span className="font-medium">{tenders.length}</span>
          </span>
        </div>
      </footer>

      {/* Modals */}
      {showCreate && <CreateTenderForm onClose={handleCloseCreateForm} />}
      {showScorecard && selectedTender && (
        <TenderScorecardModal
          tender={selectedTender}
          onClose={() => setShowScorecard(false)}
        />
      )}
      {showTemplatesRules && (
        <TemplatesRulesModal onClose={() => setShowTemplatesRules(false)} />
      )}
      {showBidForm && selectedTender && (
        <SubmitBidForm tender={selectedTender} onClose={handleCloseBidForm} />
      )}
    </div>
  );
}

export default TendersPage;
