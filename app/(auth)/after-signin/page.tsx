// app/after-signin/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export default async function AfterSignInPage() {
  const { userId } = await auth();

  // If somehow not signed in (shouldn't happen), send to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const md = user.publicMetadata || {};
  const rawRole = (md.role as string) || "";
  const normalizedRole = rawRole.toLowerCase().replace(/[\s_-]/g, "");
  const onboarded = md.onboarded === true;
  const supplierApproved = md.supplier_approved === true;

  const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";
  const isSuperAdmin =
    normalizedRole === "superadmin" || email === "keitamorie@gmail.com";
  const isAdmin = normalizedRole === "admin";
  const isSupplier = normalizedRole === "supplier";

  // Superadmin & Admin → go straight to dashboard (root or admin dashboard)
  if (isSuperAdmin || isAdmin) {
    redirect("/");
  }

  // Approved suppliers → go to their dashboard
  if (isSupplier && onboarded && supplierApproved) {
    redirect("/supplier-dashboard");
  }

  // Suppliers who haven't onboarded yet → onboarding
  if (isSupplier && !onboarded) {
    redirect("/onboarding");
  }

  // Other users (regular employees, etc.) → onboarding if not done
  if (!onboarded) {
    redirect("/onboarding");
  }

  // Fallback: if onboarded and not supplier/admin → main app
  redirect("/");
}
