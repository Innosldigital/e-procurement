// // app/bids/page.tsx
// import { auth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { Suspense } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import BidsFilters from "@/components/bids-filters";
// import {
//   getBidsWithDetails,
//   type BidWithDetails,
// } from "@/lib/actions/tender-actions";
// import BidDetailsModal from "@/components/bid-details-modal";
// import { Search, Filter, X } from "lucide-react";

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
//   category: string;
//   _key: string;
// };

// export default async function BidsPage({
//   searchParams,
// }: {
//   searchParams?:
//     | Promise<Record<string, string | string[]>>
//     | Record<string, string | string[]>;
// }) {
//   // 🔥 FIX: Await searchParams if it's a Promise (Next.js 15+)
//   const resolvedParams =
//     searchParams instanceof Promise ? await searchParams : searchParams || {};

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

//   const sortParam = String(resolvedParams?.sort || "time").toLowerCase();
//   const orderParam = String(resolvedParams?.order || "desc").toLowerCase();
//   const pageParam = parseInt(String(resolvedParams?.page || "1"), 10) || 1;
//   const searchQuery = String(resolvedParams?.search || "").toLowerCase();
//   const statusFilter = String(resolvedParams?.status || "");
//   const categoryFilter = String(resolvedParams?.category || "");
//   const perPage = 20;

//   let rows: BidRow[] = [];
//   const detailMap: Record<string, BidWithDetails> = {};
//   let fetchError = "";

//   try {
//     const res = await getBidsWithDetails();
//     const data: BidWithDetails[] =
//       res.success && Array.isArray(res.data) ? res.data : [];

//     rows = data.map((r) => {
//       const key = r._key;
//       detailMap[key] = r;
//       return {
//         _key: key,
//         amount: Number(r.totalPrice || 0),
//         bidder: String(r.supplier || ""),
//         submittedAt: new Date(r.createdAt || new Date()),
//         status: String(r.stage || ""),
//         tenderTitle: String(r.tenderTitle || "Untitled"),
//         tenderId: String(r.tenderId || ""),
//         category: String(r.category || ""),
//       };
//     });

//     console.log("[BidsPage] Loaded bids:", rows.length);
//     console.log("[BidsPage] Available keys:", Object.keys(detailMap));
//   } catch (e: any) {
//     fetchError = e?.message || "Failed to load bids";
//     console.error("[BidsPage] Error loading bids:", e);
//   }

//   // Apply search filter
//   let filteredRows = rows;
//   if (searchQuery) {
//     filteredRows = filteredRows.filter((r) => {
//       const searchableText = [r.tenderTitle, r.tenderId, r.bidder, r.category]
//         .join(" ")
//         .toLowerCase();
//       return searchableText.includes(searchQuery);
//     });
//   }

//   // Apply status filter
//   if (statusFilter) {
//     filteredRows = filteredRows.filter(
//       (r) => r.status.toLowerCase() === statusFilter.toLowerCase()
//     );
//   }

//   // Apply category filter
//   if (categoryFilter) {
//     filteredRows = filteredRows.filter(
//       (r) => r.category.toLowerCase() === categoryFilter.toLowerCase()
//     );
//   }

//   // Get unique statuses and categories for filter dropdowns
//   const uniqueStatuses = Array.from(
//     new Set(rows.map((r) => r.status).filter(Boolean))
//   );
//   const uniqueCategories = Array.from(
//     new Set(rows.map((r) => r.category).filter(Boolean))
//   );

//   // Apply sorting
//   filteredRows.sort((a, b) => {
//     if (sortParam === "amount") {
//       return orderParam === "asc" ? a.amount - b.amount : b.amount - a.amount;
//     }
//     if (sortParam === "bidder") {
//       return orderParam === "asc"
//         ? a.bidder.localeCompare(b.bidder)
//         : b.bidder.localeCompare(a.bidder);
//     }
//     if (sortParam === "tender") {
//       return orderParam === "asc"
//         ? a.tenderTitle.localeCompare(b.tenderTitle)
//         : b.tenderTitle.localeCompare(a.tenderTitle);
//     }
//     // Default: sort by time
//     return orderParam === "asc"
//       ? a.submittedAt.getTime() - b.submittedAt.getTime()
//       : b.submittedAt.getTime() - a.submittedAt.getTime();
//   });

//   const total = filteredRows.length;
//   const totalPages = Math.max(1, Math.ceil(total / perPage));
//   const currentPage = Math.min(Math.max(1, pageParam), totalPages);
//   const pageRows = filteredRows.slice(
//     (currentPage - 1) * perPage,
//     currentPage * perPage
//   );

//   const selectedBidId = resolvedParams?.bid
//     ? decodeURIComponent(String(resolvedParams.bid))
//     : "";

//   const selectedDetail = selectedBidId
//     ? detailMap[selectedBidId] || null
//     : null;

//   console.log("[BidsPage] Selected bid ID:", selectedBidId);
//   console.log("[BidsPage] Selected detail found:", !!selectedDetail);

//   if (selectedBidId && !selectedDetail) {
//     console.log("[BidsPage] ❌ Bid ID not found in detailMap:", selectedBidId);
//     console.log("[BidsPage] Sample keys:", Object.keys(detailMap).slice(0, 3));
//   }

//   if (selectedDetail) {
//     console.log("[BidsPage] ✅ Selected bid details:", {
//       supplier: selectedDetail.supplier,
//       totalPrice: selectedDetail.totalPrice,
//       technicalDocsCount: selectedDetail.technicalDocuments?.length || 0,
//       financialDocsCount: selectedDetail.financialDocuments?.length || 0,
//       hasContactEmail: !!selectedDetail.contactEmail,
//       hasContactPhone: !!selectedDetail.contactPhone,
//     });
//   }

//   // Build query string helper
//   const buildQueryString = (updates: Record<string, string | number>) => {
//     const params = new URLSearchParams();
//     const merged = {
//       sort: sortParam,
//       order: orderParam,
//       page: currentPage.toString(),
//       ...(searchQuery && { search: searchQuery }),
//       ...(statusFilter && { status: statusFilter }),
//       ...(categoryFilter && { category: categoryFilter }),
//       ...updates,
//     };

//     Object.entries(merged).forEach(([key, value]) => {
//       if (value) params.set(key, String(value));
//     });

//     return `/bids?${params.toString()}`;
//   };

//   const hasActiveFilters = !!(searchQuery || statusFilter || categoryFilter);

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
//             {/* Search and Filter Controls */}
//             <div className="p-4 border-b space-y-4">
//               {/* Search Bar */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <form action="/bids" method="GET">
//                   <Input
//                     type="text"
//                     name="search"
//                     placeholder="Search by tender, bidder, or category..."
//                     defaultValue={searchQuery}
//                     className="pl-10 pr-10"
//                   />
//                   {/* Hidden inputs to preserve other params */}
//                   <input type="hidden" name="sort" value={sortParam} />
//                   <input type="hidden" name="order" value={orderParam} />
//                   <input type="hidden" name="page" value="1" />
//                   {statusFilter && (
//                     <input type="hidden" name="status" value={statusFilter} />
//                   )}
//                   {categoryFilter && (
//                     <input
//                       type="hidden"
//                       name="category"
//                       value={categoryFilter}
//                     />
//                   )}
//                 </form>
//                 {searchQuery && (
//                   <Button
//                     asChild
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
//                   >
//                     <Link href={buildQueryString({ search: "", page: "1" })}>
//                       <X className="h-4 w-4" />
//                     </Link>
//                   </Button>
//                 )}
//               </div>

//               {/* Filters Row */}
//               <div className="flex flex-wrap gap-2 items-center">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Filter className="h-4 w-4" />
//                   <span>Filters:</span>
//                 </div>

//                 <BidsFilters
//                   statusFilter={statusFilter}
//                   categoryFilter={categoryFilter}
//                   uniqueStatuses={uniqueStatuses}
//                   uniqueCategories={uniqueCategories}
//                   sortParam={sortParam}
//                   orderParam={orderParam}
//                   searchQuery={searchQuery}
//                 />

//                 {/* Clear Filters Button */}
//                 {hasActiveFilters && (
//                   <Button asChild variant="outline" size="sm" className="h-9">
//                     <Link href="/bids?sort=time&order=desc&page=1">
//                       <X className="h-4 w-4 mr-1" />
//                       Clear Filters
//                     </Link>
//                   </Button>
//                 )}

//                 {/* Results Count */}
//                 <div className="ml-auto text-sm text-muted-foreground">
//                   {total === rows.length ? (
//                     <span>{total} bids</span>
//                   ) : (
//                     <span>
//                       {total} of {rows.length} bids
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Sorting Controls */}
//             <div className="p-3 flex items-center justify-between border-b gap-2">
//               <div className="flex items-center gap-2 text-sm flex-wrap">
//                 <span className="text-muted-foreground">Sort by:</span>
//                 <Button
//                   asChild
//                   size="sm"
//                   variant={sortParam === "time" ? "default" : "outline"}
//                 >
//                   <Link href={buildQueryString({ sort: "time", page: "1" })}>
//                     Submission time
//                   </Link>
//                 </Button>
//                 <Button
//                   asChild
//                   size="sm"
//                   variant={sortParam === "amount" ? "default" : "outline"}
//                 >
//                   <Link href={buildQueryString({ sort: "amount", page: "1" })}>
//                     Amount
//                   </Link>
//                 </Button>
//                 <Button
//                   asChild
//                   size="sm"
//                   variant={sortParam === "bidder" ? "default" : "outline"}
//                 >
//                   <Link href={buildQueryString({ sort: "bidder", page: "1" })}>
//                     Bidder
//                   </Link>
//                 </Button>
//                 <Button
//                   asChild
//                   size="sm"
//                   variant={sortParam === "tender" ? "default" : "outline"}
//                 >
//                   <Link href={buildQueryString({ sort: "tender", page: "1" })}>
//                     Tender
//                   </Link>
//                 </Button>
//                 <Button asChild size="sm" variant="outline">
//                   <Link
//                     href={buildQueryString({
//                       order: orderParam === "asc" ? "desc" : "asc",
//                     })}
//                   >
//                     {orderParam === "asc" ? "↑ Asc" : "↓ Desc"}
//                   </Link>
//                 </Button>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-muted/50">
//                   <tr>
//                     <th className="p-3 text-left">Tender</th>
//                     <th className="p-3 text-left">Bidder</th>
//                     <th className="p-3 text-left">Category</th>
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
//                         colSpan={7}
//                         className="text-center py-8 text-destructive"
//                       >
//                         {fetchError}
//                       </td>
//                     </tr>
//                   ) : pageRows.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={7}
//                         className="text-center py-8 text-muted-foreground"
//                       >
//                         {hasActiveFilters
//                           ? "No bids match your filters"
//                           : "No bids found"}
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
//                         <td className="p-3">
//                           <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs">
//                             {r.category || "—"}
//                           </span>
//                         </td>
//                         <td className="p-3 text-right font-medium">
//                           {fmtAmount(r.amount)}
//                         </td>
//                         <td className="p-3">
//                           {r.submittedAt.toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           })}
//                         </td>
//                         <td className="p-3">
//                           <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
//                             {r.status || "—"}
//                           </span>
//                         </td>
//                         <td className="p-3 text-right">
//                           <Button asChild variant="ghost" size="sm">
//                             <Link
//                               href={`${buildQueryString(
//                                 {}
//                               )}&bid=${encodeURIComponent(r._key)}`}
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
//                   {hasActiveFilters && (
//                     <span className="ml-2">
//                       (showing {total} filtered results)
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex gap-2">
//                   {currentPage > 1 ? (
//                     <Button asChild size="sm" variant="outline">
//                       <Link
//                         href={buildQueryString({
//                           page: (currentPage - 1).toString(),
//                         })}
//                       >
//                         Previous
//                       </Link>
//                     </Button>
//                   ) : (
//                     <Button size="sm" variant="outline" disabled>
//                       Previous
//                     </Button>
//                   )}

//                   {/* Page Numbers */}
//                   <div className="hidden sm:flex gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum: number;
//                       if (totalPages <= 5) {
//                         pageNum = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNum = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNum = totalPages - 4 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }

//                       return (
//                         <Button
//                           key={pageNum}
//                           asChild
//                           size="sm"
//                           variant={
//                             currentPage === pageNum ? "default" : "outline"
//                           }
//                         >
//                           <Link
//                             href={buildQueryString({
//                               page: pageNum.toString(),
//                             })}
//                           >
//                             {pageNum}
//                           </Link>
//                         </Button>
//                       );
//                     })}
//                   </div>

//                   {currentPage < totalPages ? (
//                     <Button asChild size="sm" variant="outline">
//                       <Link
//                         href={buildQueryString({
//                           page: (currentPage + 1).toString(),
//                         })}
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
//         <BidDetailsModal
//           bid={selectedDetail as any}
//           closeHref={buildQueryString({})}
//         />
//       </main>
//     </div>
//   );
// }
// app/bids/page.tsx
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BidsFilters from "@/components/bids-filters";
import {
  getBidsWithDetails,
  type BidWithDetails,
} from "@/lib/actions/tender-actions";
import BidDetailsModal from "@/components/bid-details-modal";
import { Search, Filter, X } from "lucide-react";

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
  category: string;
  _key: string;
};

export default async function BidsPage({
  searchParams,
}: {
  searchParams?:
    | Promise<Record<string, string | string[]>>
    | Record<string, string | string[]>;
}) {
  const resolvedParams =
    searchParams instanceof Promise ? await searchParams : searchParams || {};

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

  const sortParam = String(resolvedParams?.sort || "time").toLowerCase();
  const orderParam = String(resolvedParams?.order || "desc").toLowerCase();
  const pageParam = parseInt(String(resolvedParams?.page || "1"), 10) || 1;
  const searchQuery = String(resolvedParams?.search || "").toLowerCase();
  const statusFilter = String(resolvedParams?.status || "");
  const categoryFilter = String(resolvedParams?.category || "");
  const perPage = 20;

  let rows: BidRow[] = [];
  const detailMap: Record<string, BidWithDetails> = {};
  let fetchError = "";

  try {
    const res = await getBidsWithDetails();
    const data: BidWithDetails[] =
      res.success && Array.isArray(res.data) ? res.data : [];

    rows = data.map((r) => {
      const key = r._key;
      detailMap[key] = r;
      return {
        _key: key,
        amount: Number(r.totalPrice || 0),
        bidder: String(r.supplier || ""),
        submittedAt: new Date(r.createdAt || new Date()),
        status: String(r.stage || ""),
        tenderTitle: String(r.tenderTitle || "Untitled"),
        tenderId: String(r.tenderId || ""),
        category: String(r.category || ""),
      };
    });
  } catch (e: any) {
    fetchError = e?.message || "Failed to load bids";
  }

  let filteredRows = rows;

  if (searchQuery) {
    filteredRows = filteredRows.filter((r) =>
      [r.tenderTitle, r.tenderId, r.bidder, r.category]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery)
    );
  }

  if (statusFilter) {
    filteredRows = filteredRows.filter(
      (r) => r.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }

  if (categoryFilter) {
    filteredRows = filteredRows.filter(
      (r) => r.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  const uniqueStatuses = Array.from(
    new Set(rows.map((r) => r.status).filter(Boolean))
  );

  const uniqueCategories = Array.from(
    new Set(rows.map((r) => r.category).filter(Boolean))
  );

  filteredRows.sort((a, b) => {
    if (sortParam === "amount") {
      return orderParam === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortParam === "bidder") {
      return orderParam === "asc"
        ? a.bidder.localeCompare(b.bidder)
        : b.bidder.localeCompare(a.bidder);
    }
    if (sortParam === "tender") {
      return orderParam === "asc"
        ? a.tenderTitle.localeCompare(b.tenderTitle)
        : b.tenderTitle.localeCompare(a.tenderTitle);
    }
    return orderParam === "asc"
      ? a.submittedAt.getTime() - b.submittedAt.getTime()
      : b.submittedAt.getTime() - a.submittedAt.getTime();
  });

  const total = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, pageParam), totalPages);
  const pageRows = filteredRows.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const selectedBidId = resolvedParams?.bid
    ? decodeURIComponent(String(resolvedParams.bid))
    : "";

  const selectedDetail = selectedBidId
    ? detailMap[selectedBidId] || null
    : null;

  const buildQueryString = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams();
    const merged = {
      sort: sortParam,
      order: orderParam,
      page: currentPage.toString(),
      ...(searchQuery && { search: searchQuery }),
      ...(statusFilter && { status: statusFilter }),
      ...(categoryFilter && { category: categoryFilter }),
      ...updates,
    };

    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, String(v));
    });

    return `/bids?${params.toString()}`;
  };

  const hasActiveFilters = !!(searchQuery || statusFilter || categoryFilter);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
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
            {/* Search & Filters */}
            <div className="p-4 border-b space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <form action="/bids" method="GET">
                  <Input
                    name="search"
                    placeholder="Search bids..."
                    defaultValue={searchQuery}
                    className="pl-10 pr-10"
                  />
                </form>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  Filters:
                </div>

                <BidsFilters
                  statusFilter={statusFilter}
                  categoryFilter={categoryFilter}
                  uniqueStatuses={uniqueStatuses}
                  uniqueCategories={uniqueCategories}
                  sortParam={sortParam}
                  orderParam={orderParam}
                  searchQuery={searchQuery}
                />

                {hasActiveFilters && (
                  <Button asChild size="sm" variant="outline">
                    <Link href="/bids?sort=time&order=desc&page=1">
                      Clear Filters
                    </Link>
                  </Button>
                )}

                <div className="sm:ml-auto text-sm text-muted-foreground">
                  {total} bids
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-3 text-left">Tender</th>
                    <th className="p-3 text-left hidden sm:table-cell">
                      Bidder
                    </th>
                    <th className="p-3 text-left hidden md:table-cell">
                      Category
                    </th>
                    <th className="p-3 text-right">Amount</th>
                    <th className="p-3 text-left hidden sm:table-cell">
                      Submitted
                    </th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((r) => (
                    <tr key={r._key} className="border-t">
                      <td className="p-3">
                        <div className="font-medium">{r.tenderTitle}</div>
                        <div className="text-xs text-muted-foreground">
                          {r.tenderId}
                        </div>
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        {r.bidder || "—"}
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        {r.category || "—"}
                      </td>
                      <td className="p-3 text-right font-medium">
                        {fmtAmount(r.amount)}
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        {r.submittedAt.toLocaleDateString()}
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          asChild
                          size="sm"
                          variant="ghost"
                          className="w-full sm:w-auto"
                        >
                          <Link
                            href={`${buildQueryString(
                              {}
                            )}&bid=${encodeURIComponent(r._key)}`}
                          >
                            View
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Suspense>

        <BidDetailsModal
          bid={selectedDetail as any}
          closeHref={buildQueryString({})}
        />
      </main>
    </div>
  );
}
