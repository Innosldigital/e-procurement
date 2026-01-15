// import { auth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { Suspense } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   getBidsWithDetails,
//   type BidWithDetails,
// } from "@/lib/actions/tender-actions";
// import BidDetailsModal from "@/components/bid-details-modal";

// export const dynamic = "force-dynamic";

// function fmtAmount(n: number) {
//   try {
//     return new Intl.NumberFormat("en-SL", {
//       style: "currency",
//       currency: "SLE",
//       maximumFractionDigits: 0,
//     }).format(Number(n || 0));
//   } catch {
//     return `Nle ${Number(n || 0).toLocaleString()}`;
//   }
// }

// type BidRow = {
//   amount: number;
//   bidder: string;
//   submittedAt: Date;
//   status: string;
//   tenderTitle: string;
//   tenderId: string;
//   _key: string;
// };

// export default async function BidsPage({
//   searchParams,
// }: {
//   searchParams?: Record<string, string | string[]>;
// }) {
//   const { userId } = await auth();
//   let allowed = false;

//   if (userId) {
//     try {
//       const client = await clerkClient();
//       const user = await client.users.getUser(userId);
//       const md = (user?.publicMetadata || {}) as any;
//       const normalized = String(md.role || "")
//         .toLowerCase()
//         .replace(/[\s_-]/g, "");
//       allowed = ["admin", "superadmin", "projectlead"].includes(normalized);
//     } catch {
//       allowed = false;
//     }
//   }

//   if (!allowed) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <main className="p-4 md:p-6">
//           <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
//             <h2 className="text-lg font-semibold text-destructive mb-2">
//               Access Denied
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               Only Admin, Superadmin, and Project Lead can access the bids page.
//             </p>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   const sortParam = String(searchParams?.sort || "time").toLowerCase();
//   const orderParam = String(searchParams?.order || "desc").toLowerCase();
//   const pageParam = parseInt(String(searchParams?.page || "1"), 10) || 1;
//   const perPage = 20;

//   let rows: BidRow[] = [];
//   const detailMap: Record<string, BidWithDetails> = {};
//   let fetchError = "";

//   try {
//     const res = await getBidsWithDetails();
//     const data: BidWithDetails[] =
//       res.success && Array.isArray(res.data) ? res.data : [];

//     rows = data.map((r, idx) => {
//       const key = `${r.tenderObjectId}:${r.supplier}:${idx}`;
//       detailMap[key] = r;
//       return {
//         _key: key,
//         amount: Number(r.totalPrice || 0),
//         bidder: String(r.supplier || ""),
//         submittedAt: new Date(r.createdAt || new Date()),
//         status: String(r.stage || ""),
//         tenderTitle: String(r.tenderTitle || "Untitled"),
//         tenderId: String(r.tenderId || ""),
//       };
//     });
//   } catch (e: any) {
//     fetchError = e?.message || "Failed to load bids";
//   }

//   rows.sort((a, b) => {
//     if (sortParam === "amount") {
//       return orderParam === "asc" ? a.amount - b.amount : b.amount - a.amount;
//     }
//     return orderParam === "asc"
//       ? a.submittedAt.getTime() - b.submittedAt.getTime()
//       : b.submittedAt.getTime() - a.submittedAt.getTime();
//   });

//   const total = rows.length;
//   const totalPages = Math.max(1, Math.ceil(total / perPage));
//   const currentPage = Math.min(Math.max(1, pageParam), totalPages);
//   const pageRows = rows.slice(
//     (currentPage - 1) * perPage,
//     currentPage * perPage
//   );

//   // Fix: Properly decode the bid parameter
//   const selectedBidId = searchParams?.bid
//     ? decodeURIComponent(String(searchParams.bid))
//     : "";
//   const selectedDetail = selectedBidId
//     ? detailMap[selectedBidId] || null
//     : null;

//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="p-4 md:p-6">
//         <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-xl md:text-2xl font-semibold mb-1">Bids</h1>
//             <p className="text-sm text-muted-foreground">
//               View all supplier bids with tender details and pricing.
//             </p>
//           </div>
//           <Button asChild variant="outline" size="sm">
//             <Link href="/tenders">Back to Tenders</Link>
//           </Button>
//         </div>

//         <Suspense fallback={<div>Loading bids…</div>}>
//           <div className="rounded-lg border bg-card">
//             {/* Add sorting controls */}
//             <div className="p-3 flex items-center justify-between border-b gap-2">
//               <div className="flex items-center gap-2 text-sm flex-wrap">
//                 <span className="text-muted-foreground">Sort by</span>
//                 <Button
//                   asChild
//                   size="sm"
//                   variant={sortParam === "time" ? "default" : "outline"}
//                 >
//                   <Link
//                     href={`/bids?sort=time&order=${orderParam}&page=${currentPage}`}
//                   >
//                     Submission time
//                   </Link>
//                 </Button>
//                 <Button
//                   asChild
//                   size="sm"
//                   variant={sortParam === "amount" ? "default" : "outline"}
//                 >
//                   <Link
//                     href={`/bids?sort=amount&order=${orderParam}&page=${currentPage}`}
//                   >
//                     Amount
//                   </Link>
//                 </Button>
//                 <Button asChild size="sm" variant="outline">
//                   <Link
//                     href={`/bids?sort=${sortParam}&order=${
//                       orderParam === "asc" ? "desc" : "asc"
//                     }&page=${currentPage}`}
//                   >
//                     {orderParam === "asc" ? "↑ Asc" : "↓ Desc"}
//                   </Link>
//                 </Button>
//               </div>
//               <div className="text-sm text-muted-foreground">{total} bids</div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-muted/50">
//                   <tr>
//                     <th className="p-3 text-left">Tender</th>
//                     <th className="p-3 text-left">Bidder</th>
//                     <th className="p-3 text-right">Amount</th>
//                     <th className="p-3 text-left">Submitted</th>
//                     <th className="p-3 text-left">Status</th>
//                     <th className="p-3 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {fetchError ? (
//                     <tr>
//                       <td
//                         colSpan={6}
//                         className="text-center py-8 text-destructive"
//                       >
//                         {fetchError}
//                       </td>
//                     </tr>
//                   ) : pageRows.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={6}
//                         className="text-center py-8 text-muted-foreground"
//                       >
//                         No bids found
//                       </td>
//                     </tr>
//                   ) : (
//                     pageRows.map((r) => (
//                       <tr key={r._key} className="border-t hover:bg-muted/50">
//                         <td className="p-3">
//                           <div className="font-medium">{r.tenderTitle}</div>
//                           <div className="text-xs text-muted-foreground">
//                             {r.tenderId}
//                           </div>
//                         </td>
//                         <td className="p-3">{r.bidder || "—"}</td>
//                         <td className="p-3 text-right">
//                           {fmtAmount(r.amount)}
//                         </td>
//                         <td className="p-3">
//                           {r.submittedAt.toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           })}
//                         </td>
//                         <td className="p-3">{r.status || "—"}</td>
//                         <td className="p-3 text-right">
//                           <Button asChild variant="ghost" size="sm">
//                             <Link
//                               href={`/bids?sort=${sortParam}&order=${orderParam}&page=${currentPage}&bid=${encodeURIComponent(
//                                 r._key
//                               )}`}
//                             >
//                               View Details
//                             </Link>
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="p-3 border-t flex items-center justify-between text-sm">
//                 <div className="text-muted-foreground">
//                   Page {currentPage} of {totalPages}
//                 </div>
//                 <div className="flex gap-2">
//                   {currentPage > 1 ? (
//                     <Button asChild size="sm" variant="outline">
//                       <Link
//                         href={`/bids?sort=${sortParam}&order=${orderParam}&page=${
//                           currentPage - 1
//                         }`}
//                       >
//                         Previous
//                       </Link>
//                     </Button>
//                   ) : (
//                     <Button size="sm" variant="outline" disabled>
//                       Previous
//                     </Button>
//                   )}
//                   {currentPage < totalPages ? (
//                     <Button asChild size="sm" variant="outline">
//                       <Link
//                         href={`/bids?sort=${sortParam}&order=${orderParam}&page=${
//                           currentPage + 1
//                         }`}
//                       >
//                         Next
//                       </Link>
//                     </Button>
//                   ) : (
//                     <Button size="sm" variant="outline" disabled>
//                       Next
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </Suspense>

//         {/* Render modal when a bid is selected */}
//         {selectedDetail && (
//           <BidDetailsModal
//             bid={selectedDetail as any}
//             closeHref={`/bids?sort=${sortParam}&order=${orderParam}&page=${currentPage}`}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  getBidsWithDetails,
  type BidWithDetails,
} from "@/lib/actions/tender-actions";
import BidDetailsModal from "@/components/bid-details-modal";

export const dynamic = "force-dynamic";

function fmtAmount(n: number) {
  try {
    return new Intl.NumberFormat("en-SL", {
      style: "currency",
      currency: "SLE",
      maximumFractionDigits: 0,
    }).format(Number(n || 0));
  } catch {
    return `Nle ${Number(n || 0).toLocaleString()}`;
  }
}

type BidRow = {
  amount: number;
  bidder: string;
  submittedAt: Date;
  status: string;
  tenderTitle: string;
  tenderId: string;
  _key: string;
};

export default async function BidsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const { userId } = await auth();
  let allowed = false;

  if (userId) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const md = (user?.publicMetadata || {}) as any;
      const normalized = String(md.role || "")
        .toLowerCase()
        .replace(/[\s_-]/g, "");
      allowed = ["admin", "superadmin", "projectlead"].includes(normalized);
    } catch {
      allowed = false;
    }
  }

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="p-4 md:p-6">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
            <h2 className="text-lg font-semibold text-destructive mb-2">
              Access Denied
            </h2>
            <p className="text-sm text-muted-foreground">
              Only Admin, Superadmin, and Project Lead can access the bids page.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const sortParam = String(searchParams?.sort || "time").toLowerCase();
  const orderParam = String(searchParams?.order || "desc").toLowerCase();
  const pageParam = parseInt(String(searchParams?.page || "1"), 10) || 1;
  const perPage = 20;

  let rows: BidRow[] = [];
  const detailMap: Record<string, BidWithDetails> = {};
  let fetchError = "";

  try {
    const res = await getBidsWithDetails();
    const data: BidWithDetails[] =
      res.success && Array.isArray(res.data) ? res.data : [];

    rows = data.map((r) => {
      const key = String((r as any)._key || "");
      if (key) detailMap[key] = r;
      return {
        _key: key,
        amount: Number(r.totalPrice || 0),
        bidder: String(r.supplier || ""),
        submittedAt: new Date(r.createdAt || new Date()),
        status: String(r.stage || ""),
        tenderTitle: String(r.tenderTitle || "Untitled"),
        tenderId: String(r.tenderId || ""),
      };
    });
  } catch (e: any) {
    fetchError = e?.message || "Failed to load bids";
  }

  rows.sort((a, b) => {
    if (sortParam === "amount") {
      return orderParam === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    return orderParam === "asc"
      ? a.submittedAt.getTime() - b.submittedAt.getTime()
      : b.submittedAt.getTime() - a.submittedAt.getTime();
  });

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, pageParam), totalPages);
  const pageRows = rows.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Fix: Properly decode the bid parameter
  const selectedBidId = searchParams?.bid
    ? decodeURIComponent(String(searchParams.bid))
    : "";
  const selectedDetail = selectedBidId
    ? detailMap[selectedBidId] || null
    : null;

  // Debug logging
  if (selectedBidId && !selectedDetail) {
    console.log("Bid ID not found in detailMap:", selectedBidId);
    console.log("Available keys:", Object.keys(detailMap));
  }

  if (selectedDetail) {
    console.log("Selected bid details:", {
      supplier: selectedDetail.supplier,
      totalPrice: selectedDetail.totalPrice,
      technicalDocsCount: selectedDetail.technicalDocuments?.length || 0,
      financialDocsCount: selectedDetail.financialDocuments?.length || 0,
      hasContactEmail: !!selectedDetail.contactEmail,
      hasContactPhone: !!selectedDetail.contactPhone,
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold mb-1">Bids</h1>
            <p className="text-sm text-muted-foreground">
              View all supplier bids with tender details and pricing.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/tenders">Back to Tenders</Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading bids…</div>}>
          <div className="rounded-lg border bg-card">
            {/* Add sorting controls */}
            <div className="p-3 flex items-center justify-between border-b gap-2">
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="text-muted-foreground">Sort by</span>
                <Button
                  asChild
                  size="sm"
                  variant={sortParam === "time" ? "default" : "outline"}
                >
                  <Link
                    href={`/bids?sort=time&order=${orderParam}&page=${currentPage}`}
                  >
                    Submission time
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant={sortParam === "amount" ? "default" : "outline"}
                >
                  <Link
                    href={`/bids?sort=amount&order=${orderParam}&page=${currentPage}`}
                  >
                    Amount
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={`/bids?sort=${sortParam}&order=${
                      orderParam === "asc" ? "desc" : "asc"
                    }&page=${currentPage}`}
                  >
                    {orderParam === "asc" ? "↑ Asc" : "↓ Desc"}
                  </Link>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">{total} bids</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-3 text-left">Tender</th>
                    <th className="p-3 text-left">Bidder</th>
                    <th className="p-3 text-right">Amount</th>
                    <th className="p-3 text-left">Submitted</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchError ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-destructive"
                      >
                        {fetchError}
                      </td>
                    </tr>
                  ) : pageRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No bids found
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((r) => (
                      <tr key={r._key} className="border-t hover:bg-muted/50">
                        <td className="p-3">
                          <div className="font-medium">{r.tenderTitle}</div>
                          <div className="text-xs text-muted-foreground">
                            {r.tenderId}
                          </div>
                        </td>
                        <td className="p-3">{r.bidder || "—"}</td>
                        <td className="p-3 text-right">
                          {fmtAmount(r.amount)}
                        </td>
                        <td className="p-3">
                          {r.submittedAt.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-3">{r.status || "—"}</td>
                        <td className="p-3 text-right">
                          <Button asChild variant="ghost" size="sm">
                            <Link
                              href={`/bids?sort=${sortParam}&order=${orderParam}&page=${currentPage}&bid=${encodeURIComponent(
                                r._key
                              )}`}
                            >
                              View Details
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-3 border-t flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  {currentPage > 1 ? (
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={`/bids?sort=${sortParam}&order=${orderParam}&page=${
                          currentPage - 1
                        }`}
                      >
                        Previous
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      Previous
                    </Button>
                  )}
                  {currentPage < totalPages ? (
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={`/bids?sort=${sortParam}&order=${orderParam}&page=${
                          currentPage + 1
                        }`}
                      >
                        Next
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Suspense>

        {/* Render modal when a bid is selected */}
        {selectedDetail && (
          <BidDetailsModal
            bid={selectedDetail as any}
            closeHref={`/bids?sort=${sortParam}&order=${orderParam}&page=${currentPage}`}
          />
        )}
      </main>
    </div>
  );
}
