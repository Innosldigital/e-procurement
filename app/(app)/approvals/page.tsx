import { Button } from "@/components/ui/button";
import {
  getApprovalsWithDetails,
  bulkApprove,
} from "@/lib/actions/approval-actions";
import ApprovalsClient from "@/components/approvals-client";
import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

async function handleBulkApproval(formData: FormData) {
  "use server";
  try {
    const idsStr = formData.get("ids") as string;
    const ids = idsStr ? JSON.parse(idsStr) : [];
    if (Array.isArray(ids) && ids.length > 0) {
      const result = await bulkApprove(ids);
      if (!result.success) {
        console.error("Bulk approval failed:", result.error);
      }
    }
  } catch (error) {
    console.error("Error in bulk approve:", error);
  }
}

export default async function ApprovalsPage() {
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
    } catch (error) {
      console.error("Error checking user role:", error);
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
              Only Admin, Superadmin, and Project Lead can access the approvals
              page.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Fetch all data from backend
  let approvals: any[] = [];
  let requisitions: any[] = [];
  let purchaseOrders: any[] = [];

  try {
    const result = await getApprovalsWithDetails();
    if (result.success && result.data) {
      approvals = result.data.approvals || [];
      requisitions = result.data.requisitions || [];
      purchaseOrders = result.data.purchaseOrders || [];
    }
  } catch (error) {
    console.error("Error fetching approvals data:", error);
    approvals = [];
    requisitions = [];
    purchaseOrders = [];
  }

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
              className="flex-1 md:flex-none bg-transparent"
            >
              <Link href="/admin?section=approval-workflows">
                Approval rules
              </Link>
            </Button>
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
            bulkApprovalAction={handleBulkApproval}
          />
        </Suspense>
      </main>
    </div>
  );
}
