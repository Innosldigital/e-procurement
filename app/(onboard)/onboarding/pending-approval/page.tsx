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
    <div className="mx-auto w-full max-w-full px-4 py-6 sm:max-w-4xl sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold">Pending Approval</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your supplier onboarding is awaiting admin review.
          </p>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={"Pending approval"} />
        </div>
      </div>

      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-sm sm:text-base">
            What happens next
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm sm:text-base px-4 sm:px-6">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Thank you for submitting your onboarding details. An administrator
            will review and approve your account shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/onboarding/support">Contact Support</Link>
            </Button>

            <Button asChild className="w-full sm:w-auto">
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
