import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

const isApiRoute = createRouteMatcher(["/(api|trpc)(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();

    const { sessionClaims, userId } = await auth();
    const claims: any = sessionClaims || {};

    // FIX: Check metadata directly (not publicMetadata)
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
      normalizedRole === "superadmin" ||
      email === "keitamorie@gmail.com" ||
      userId === "user_35hjSURy4Wv5CPxXRrqfSoCGK7W";

    const isAdmin = normalizedRole === "admin";
    const isSupplier = normalizedRole === "supplier";

    // Allow super admins and admins full access
    if (isSuperAdmin || isAdmin) {
      return NextResponse.next();
    }

    // For suppliers: check if onboarded AND approved
    if (isSupplier) {
      if (onboarded && supplierApproved) {
        // Supplier is onboarded and approved - grant access
        return NextResponse.next();
      } else if (
        !onboarded &&
        !isOnboardingRoute(request) &&
        !isApiRoute(request)
      ) {
        // Supplier not onboarded - redirect to onboarding
        const url = new URL("/onboarding", request.url);
        return NextResponse.redirect(url);
      } else if (onboarded && !supplierApproved) {
        // Supplier onboarded but not approved - show pending page
        if (
          !request.nextUrl.pathname.startsWith("/pending-approval") &&
          !isApiRoute(request)
        ) {
          const url = new URL("/pending-approval", request.url);
          return NextResponse.redirect(url);
        }
        return NextResponse.next();
      }
    }

    // For non-suppliers: redirect to onboarding if not onboarded
    if (!onboarded && !isOnboardingRoute(request) && !isApiRoute(request)) {
      const url = new URL("/onboarding", request.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
