import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Supplier } from "@/lib/models/Supplier";
import Link from "next/link";

export default async function PendingApprovalPage() {
  const { userId } = await auth();
  let supplierHref = "/onboarding";
  let supplierId: string | null = null;
  if (userId) {
    await dbConnect();
    const s = (await Supplier.findOne(
      { ownerUserId: userId },
      { _id: 1 }
    ).lean()) as { _id: string } | null;
    if (s && s._id) {
      supplierId = String(s._id);
      supplierHref = `/onboarding/supplier/${supplierId}`;
    }
  }
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Pending Approval</h1>
          <p className="text-sm text-muted-foreground">
            Your supplier onboarding is awaiting admin review.
          </p>
        </div>
        <StatusBadge status={"Pending approval"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What happens next</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Thank you for submitting your onboarding details. An administrator
            will review and approve your account shortly.
          </p>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/onboarding/support">Contact Support</Link>
            </Button>

            <Button asChild>
              <Link href={supplierHref}>
                {supplierId ? "View Supplier Details" : "Continue Onboarding"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
