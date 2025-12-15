import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Shield, Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export default function NotAuthorizedPage() {
  return (
    <div className="mx-auto w-full max-w-full px-4 py-6 sm:max-w-3xl sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold">Not authorized</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            You don’t have permission to access this page.
          </p>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={"Access restricted"} />
        </div>
      </div>

      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm sm:text-base">
              Why you’re seeing this
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm sm:text-base px-4 sm:px-6">
          <div className="flex items-start gap-3">
            <Lock className="w-4 h-4 text-muted-foreground mt-0.5" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Your account role does not grant access to this section. If you
              believe this is an error, contact an administrator for assistance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">Back to dashboard</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/onboarding/support">Contact support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
