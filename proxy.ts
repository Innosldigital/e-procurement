import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isApiRoute = createRouteMatcher(["/(api|trpc)(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    const path = request.nextUrl.pathname;
    const isUsersApi = path.startsWith("/api/users");

    if (!isUsersApi) {
      await auth.protect();
    }

    const { sessionClaims } = await auth();
    const claims: any = sessionClaims || {};
    const md: any = claims.metadata || {};

    const email: string = String(
      typeof claims.email === "string"
        ? claims.email
        : Array.isArray(claims.email_addresses) &&
          claims.email_addresses.length > 0
        ? claims.email_addresses[0]?.email_address
        : ""
    ).toLowerCase();

    const rawRole = md.role || "";
    const normalizedRole = String(rawRole)
      .toLowerCase()
      .replace(/[\s_-]/g, "");
    const onboarded = md?.onboarded === true;
    const supplierApproved = md?.supplier_approved === true;

    const isSuperAdmin =
      normalizedRole === "superadmin" || email === "keitamorie@gmail.com";
    const isAdmin = normalizedRole === "admin";
    const isSupplier = normalizedRole === "supplier";

    // ✅ Super admins and admins get full access - no onboarding required
    if (isSuperAdmin || isAdmin) {
      return NextResponse.next();
    }

    // ✅ Handle suppliers
    if (isSupplier) {
      // Approved suppliers get full access
      if (onboarded && supplierApproved) {
        return NextResponse.next();
      }

      // Not onboarded - redirect to onboarding
      if (!onboarded && !isOnboardingRoute(request) && !isApiRoute(request)) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }

      // Onboarded but not approved - restrict to approval pages
      if (onboarded && !supplierApproved) {
        const p = request.nextUrl.pathname;
        const allowedPaths = [
          "/onboarding/pending-approval",
          "/onboarding/support",
          "/onboarding",
        ];
        const isAllowed =
          allowedPaths.some((allowed) => p.startsWith(allowed)) ||
          p.startsWith("/onboarding/supplier/") ||
          isApiRoute(request);

        if (!isAllowed) {
          return NextResponse.redirect(
            new URL("/onboarding/pending-approval", request.url)
          );
        }
      }

      return NextResponse.next();
    }

    // ✅ For other roles: check onboarding status
    if (!onboarded && !isOnboardingRoute(request) && !isApiRoute(request)) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
