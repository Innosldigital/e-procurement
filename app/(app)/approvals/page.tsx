import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { getApprovals } from "@/lib/actions/approval-actions";
import { bulkApprove } from "@/lib/actions/approval-actions";
import ApprovalsClient from "@/components/approvals-client";
import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

const fmtDate = (d: string | Date) => new Date(d).toISOString().slice(0, 10);
const fmtAmount = (n: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export default async function ApprovalsPage(props: any) {
  const { userId } = await auth();
  let allowed = false;
  if (userId) {
    const client: any = await clerkClient();
    const user = await client.users.getUser(userId);
    const md = (user?.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const normalized = rawRole.toLowerCase().replace(/[\s_-]/g, "");
    allowed = ["admin", "company", "superadmin"].includes(normalized);
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
  const selected = approvals.length ? approvals[0] : null;
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
          <ApprovalsClient approvals={approvals} />
        </Suspense>
        {false && (
          <>
            <Card className="mb-6">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Queue:
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      My approvals
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Type:</span>
                    <Badge variant="secondary" className="text-xs">
                      Requisitions, POs
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Priority:
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      High-first
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">SLA:</span>
                    <Badge variant="secondary" className="text-xs">
                      Due in 3 days
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground">
                  <span>{approvals.length} items in your approval queue</span>
                  <span>3 items breaching SLA</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
              <Card className="lg:col-span-5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      My approval queue
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      Grouped by due date
                    </span>
                  </div>
                  <CardDescription className="text-xs">
                    Select an item to review and take action.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {approvals.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No approvals pending. Connect to MongoDB to see data.
                      </div>
                    ) : (
                      approvals.slice(0, 10).map((item: any) => (
                        <Link
                          key={String(item._id)}
                          href={`/approvals?id=${String(item._id)}`}
                          className="block"
                        >
                          <div
                            className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                              String(selected?._id) === String(item._id)
                                ? "bg-accent/50 border-border"
                                : "hover:bg-accent border-transparent hover:border-border"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="font-medium text-sm mb-1">
                                  {item.itemId}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {item.type} • {item.requester}
                                </div>
                              </div>
                              <StatusBadge status={item.status} />
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <StatusBadge status={item.priority} />
                                <span className="text-muted-foreground">
                                  Due: {fmtDate(item.dueDate)}
                                </span>
                              </div>
                              <span className="font-medium">
                                ${fmtAmount(item.amount)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 px-3">
                    Tip: Use Bulk approve above for low-risk, policy-compliant
                    requests.
                  </p>
                </CardContent>
              </Card>

              <Card className="lg:col-span-7">
                <CardHeader className="border-b pb-4">
                  {selected ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <CardTitle className="text-sm md:text-base">
                          {selected.itemId} • {selected.type}
                        </CardTitle>
                        <StatusBadge status={selected.status} />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground">
                        <span>Requester: {selected.requester}</span>
                        <span>Type: {selected.type}</span>
                        <span>Due: {fmtDate(selected.dueDate)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      Select an approval from the left
                    </div>
                  )}
                </CardHeader>
                <CardContent className="pt-4 md:pt-6">
                  <div className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">
                          Decision context
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Total amount
                            </span>
                            <div className="font-medium">
                              ${selected ? fmtAmount(selected.amount) : "-"}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Budget impact
                            </span>
                            <div className="font-medium">
                              Remaining after approval: $210,000
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">
                          Risk & policy
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <StatusBadge
                              status={selected ? selected.priority : "-"}
                            />
                            <span className="text-xs">
                              SLA: {selected ? fmtDate(selected.dueDate) : "-"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">SLA</span>
                            <div className="font-medium">
                              Due: {selected ? fmtDate(selected.dueDate) : "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-3">
                        Summary & items
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Category
                          </span>
                          <span>Marketing & events</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Needed by
                          </span>
                          <span>2025-04-01</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Supplier preference
                          </span>
                          <span>Existing panel suppliers only</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Approval route
                          </span>
                          <span>You → Finance → Marketing Director</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-3">Item</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-2 font-medium">
                                Item
                              </th>
                              <th className="text-right p-2 font-medium">
                                Qty
                              </th>
                              <th className="text-right p-2 font-medium">
                                Unit
                              </th>
                              <th className="text-right p-2 font-medium">
                                Unit cost
                              </th>
                              <th className="text-right p-2 font-medium">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-2">Digital ads package (Q2)</td>
                              <td className="text-right p-2">1</td>
                              <td className="text-right p-2">Package</td>
                              <td className="text-right p-2">$32,000</td>
                              <td className="text-right p-2">$32,000</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-2">
                                Event sponsorship - Singapore summit
                              </td>
                              <td className="text-right p-2">1</td>
                              <td className="text-right p-2">Event</td>
                              <td className="text-right p-2">$24,000</td>
                              <td className="text-right p-2">$24,000</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-2">Creative agency support</td>
                              <td className="text-right p-2">40</td>
                              <td className="text-right p-2">Hours</td>
                              <td className="text-right p-2">$170</td>
                              <td className="text-right p-2">$6,800</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-3">Timeline</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                          <div>
                            <div className="font-medium">
                              Submitted by David Kim
                            </div>
                            <div className="text-muted-foreground">
                              2025-03-13 • 09:32 • APAC Marketing
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                          <div>
                            <div className="font-medium">
                              Auto-assigned to marketing workflow
                            </div>
                            <div className="text-muted-foreground">
                              2025-03-13 • 09:33 • Rule: Marketing &gt; 50K
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5"></div>
                          <div>
                            <div className="font-medium">
                              Waiting for your decision
                            </div>
                            <div className="text-muted-foreground">
                              Current step • SLA: 2 business days
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-2">
                        Comments & notes
                      </h3>
                      <div className="bg-muted/30 p-3 rounded-lg text-xs">
                        <p className="italic text-muted-foreground">
                          "Budget aligned with Q2 regional plan. Please confirm
                          final media split before issuing PO." - David Kim,
                          2025-03-13
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-3">
                        Your decision
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Actions are logged and visible to requester and
                        downstream approvers.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-none"
                        >
                          Request changes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-none"
                        >
                          Reject
                        </Button>
                        <Button size="sm" className="flex-1">
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
