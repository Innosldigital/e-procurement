import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { getBidsWithDetails } from "@/lib/actions/tender-actions";

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

export default async function BidsPage() {
  const { userId } = await auth();
  let allowed = false;

  if (userId) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const md = (user?.publicMetadata || {}) as any;
      const rawRole = String(md.role || "");
      const normalized = rawRole.toLowerCase().replace(/[\s_-]/g, "");
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
            <h2 className="text-lg font-semibold text-destructive mb-2">Access Denied</h2>
            <p className="text-sm text-muted-foreground">
              Only Admin, Superadmin, and Project Lead can access the bids page.
            </p>
          </div>
        </main>
      </div>
    );
  }

  let rows: any[] = [];
  try {
    const res = await getBidsWithDetails();
    if (res.success && Array.isArray(res.data)) rows = res.data;
  } catch {}

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
          <div className="flex gap-2 md:gap-3">
            <Button asChild variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
              <Link href="/tenders">Back to Tenders</Link>
            </Button>
          </div>
        </div>

        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading bids…</div>}>
          <div className="rounded-lg border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium">Tender</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Category</th>
                    <th className="text-left p-3 font-medium">Stage</th>
                    <th className="text-left p-3 font-medium">Supplier</th>
                    <th className="text-right p-3 font-medium">Total Price</th>
                    <th className="text-center p-3 font-medium">Score</th>
                    <th className="text-left p-3 font-medium">Compliance</th>
                    <th className="text-left p-3 font-medium">Highlights</th>
                    <th className="text-center p-3 font-medium">Docs</th>
                    <th className="text-left p-3 font-medium">Updated</th>
                    <th className="text-right p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="text-center py-8 text-muted-foreground">
                        No bids found
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => (
                      <tr key={`${r.tenderObjectId}-${r.supplier}-${r.totalPrice}`} className="border-t">
                        <td className="p-3">
                          <div className="font-medium">{r.tenderTitle}</div>
                          <div className="text-xs text-muted-foreground">{r.tenderId}</div>
                        </td>
                        <td className="p-3">{r.type || "—"}</td>
                        <td className="p-3">{r.category || "—"}</td>
                        <td className="p-3">{r.stage || "—"}</td>
                        <td className="p-3">{r.supplier || "—"}</td>
                        <td className="p-3 text-right">{fmtAmount(r.totalPrice)}</td>
                        <td className="p-3 text-center">{r.score !== undefined ? r.score : "—"}</td>
                        <td className="p-3">{String(r.compliance || "").slice(0, 80)}</td>
                        <td className="p-3">{String(r.highlights || "").slice(0, 80)}</td>
                        <td className="p-3 text-center">
                          {(r.technicalDocCount || 0) + (r.financialDocCount || 0)}
                        </td>
                        <td className="p-3">
                          {new Date(r.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-3 text-right">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/tenders`}>View tender</Link>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Suspense>
      </main>
    </div>
  );
}