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

    const isSuperAdmin =
      normalizedRole === "superadmin" ||
      email === "keitamorie@gmail.com" ||
      userId === "user_35hjSURy4Wv5CPxXRrqfSoCGK7W";

    const isAdmin = normalizedRole === "admin";

    console.log("🔍 Proxy Check:", {
      path: request.nextUrl.pathname,
      userId,
      email,
      role: rawRole,
      normalizedRole,
      isSuperAdmin,
      isAdmin,
      onboarded,
      metadata: md,
      hasSessionClaims: !!sessionClaims,
    });

    if (isSuperAdmin || isAdmin) {
      return NextResponse.next();
    }

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
