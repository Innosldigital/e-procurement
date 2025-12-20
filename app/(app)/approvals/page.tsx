import { Button } from "@/components/ui/button";
import { getApprovals } from "@/lib/actions/approval-actions";
import { bulkApprove } from "@/lib/actions/approval-actions";
import { getRequisitions } from "@/lib/actions/requisition-actions";
import { getPurchaseOrders } from "@/lib/actions/purchase-order-actions";
import ApprovalsClient from "@/components/approvals-client";
import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export default async function ApprovalsPage(props: any) {
  const { userId } = await auth();
  let allowed = false;
  if (userId) {
    const client: any = await clerkClient();
    const user = await client.users.getUser(userId);
    const md = (user?.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const normalized = rawRole.toLowerCase().replace(/[\s_-]/g, "");
    allowed = ["admin", "superadmin"].includes(normalized);
  }

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="p-4 md:p-6">
          <div className="text-sm text-muted-foreground">
            You don’t have permission to view approvals.
          </div>
        </main>
      </div>
    );
  }

  const result = await getApprovals();
  const approvals = result.success ? result.data : [];

  const [reqResult, poResult] = await Promise.all([
    getRequisitions().catch(() => ({ success: false, data: [] })),
    getPurchaseOrders().catch(() => ({ success: false, data: [] })),
  ]);
  const requisitions =
    reqResult && (reqResult as any).success ? (reqResult as any).data : [];
  const purchaseOrders =
    poResult && (poResult as any).success ? (poResult as any).data : [];
  const pendingIds = approvals
    .filter((a: any) => {
      const s = String(a.status || "").toLowerCase();
      return s.includes("awaiting") || s.includes("pending review");
    })
    .map((a: any) => String(a._id));

  return (
    <div className="flex min-h-screen flex-col">
      <main className="p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold mb-1">
              Approvals
            </h1>
            <p className="text-sm text-muted-foreground">
              Review, compare, and action pending approvals in your queue.
            </p>
          </div>
          <div className="flex gap-2 md:gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 md:flex-none"
            >
              <Link href="/admin?section=approval-workflows">
                Approval rules
              </Link>
            </Button>
            <form
              action={async (formData: FormData) => {
                "use server";
                const idsStr = formData.get("ids") as string;
                const ids = idsStr ? JSON.parse(idsStr) : [];
                await bulkApprove(ids);
              }}
            >
              <input
                type="hidden"
                name="ids"
                value={JSON.stringify(pendingIds)}
              />
              <Button
                size="sm"
                className="flex-1 md:flex-none"
                type="submit"
                disabled={pendingIds.length === 0}
              >
                Bulk approve
              </Button>
            </form>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">
              Loading approvals…
            </div>
          }
        >
          <ApprovalsClient
            approvals={approvals}
            requisitions={requisitions}
            purchaseOrders={purchaseOrders}
          />
        </Suspense>
      </main>
    </div>
  );
}
