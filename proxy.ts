// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { clerkClient } from "@clerk/nextjs/server";

// // Route matchers
// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
// const isOnboardingRoute = createRouteMatcher([
//   "/onboarding(.*)",
//   "/pending-approval(.*)",
// ]);
// const isApiRoute = createRouteMatcher(["/(api|trpc)(.*)"]);
// const isAfterSignIn = createRouteMatcher(["/after-signin"]);
// // ✨ ADD THIS - Exclude EdgeStore from middleware processing
// const isEdgeStoreRoute = createRouteMatcher(["/api/edgestore(.*)"]);

// export default clerkMiddleware(async (auth, request) => {
//   // ✨ ADD THIS - Let EdgeStore handle its own requests
//   if (isEdgeStoreRoute(request)) {
//     return NextResponse.next();
//   }

//   // Allow public routes
//   if (isPublicRoute(request)) {
//     return NextResponse.next();
//   }

//   // Allow after-signin route (it handles its own redirect logic)
//   if (isAfterSignIn(request)) {
//     return NextResponse.next();
//   }

//   const { userId } = await auth();

//   // Not logged in → redirect to sign-in
//   if (!userId) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   // Fetch user metadata from Clerk
//   const client = await clerkClient();
//   const user = await client.users.getUser(userId);

//   const md: any = user.publicMetadata || {};

//   // Normalize role
//   const rawRole = md.role || "";
//   const normalizedRole = String(rawRole)
//     .toLowerCase()
//     .replace(/[\s_-]/g, "");

//   const onboarded = md.onboarded === true;
//   const supplierApproved = md.supplier_approved === true;

//   // Check if superadmin
//   const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";
//   const isSuperAdmin =
//     normalizedRole === "superadmin" || email === "keitamorie@gmail.com";
//   const isAdmin = normalizedRole === "admin";
//   const isSupplier = normalizedRole === "supplier";

//   const pathname = request.nextUrl.pathname;

//   // 🚀 SUPERADMIN & ADMIN — FULL ACCESS, NO ONBOARDING REQUIRED
//   if (isSuperAdmin || isAdmin) {
//     // Block them from accessing onboarding
//     if (isOnboardingRoute(request)) {
//       console.log("🔄 Redirecting admin/superadmin away from onboarding to /");
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     return NextResponse.next();
//   }

//   // 🏭 SUPPLIER FLOW
//   if (isSupplier) {
//     console.log("🏭 Supplier detected");

//     // Approved suppliers: restricted to specific paths
//     if (onboarded && supplierApproved) {
//       console.log("✅ Approved supplier - restricting access");

//       // Redirect root to supplier dashboard
//       if (pathname === "/") {
//         return NextResponse.redirect(
//           new URL("/supplier-dashboard", request.url)
//         );
//       }

//       const allowedSupplierPaths = [
//         "/supplier-dashboard",
//         "/tenders",
//         "/purchase-orders",
//         "/suppliers",
//         "/invoices",
//       ];

//       const isAllowed =
//         allowedSupplierPaths.some((path) => pathname.startsWith(path)) ||
//         isApiRoute(request);

//       if (!isAllowed && !isOnboardingRoute(request)) {
//         console.log("❌ Supplier accessing unauthorized path");
//         return NextResponse.redirect(new URL("/not-authorized", request.url));
//       }

//       return NextResponse.next();
//     }

//     // Not onboarded → force onboarding
//     if (!onboarded && !isOnboardingRoute(request) && !isApiRoute(request)) {
//       console.log("🔄 Supplier not onboarded - redirecting to onboarding");
//       return NextResponse.redirect(new URL("/onboarding", request.url));
//     }

//     // Onboarded but pending approval → restrict to pending pages
//     if (onboarded && !supplierApproved) {
//       console.log("⏳ Supplier pending approval");

//       const allowedPendingPaths = ["/onboarding", "/pending-approval"];

//       const isAllowed =
//         allowedPendingPaths.some((path) => pathname.startsWith(path)) ||
//         pathname.startsWith("/onboarding/supplier/") ||
//         isApiRoute(request);

//       if (!isAllowed) {
//         return NextResponse.redirect(new URL("/pending-approval", request.url));
//       }
//     }

//     return NextResponse.next();
//   }

//   // 👤 ALL OTHER ROLES — require onboarding if not completed
//   if (!onboarded && !isOnboardingRoute(request) && !isApiRoute(request)) {
//     console.log("🔄 User not onboarded - redirecting to onboarding");
//     return NextResponse.redirect(new URL("/onboarding", request.url));
//   }

//   console.log("✅ Allowing access");
//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

// Route matchers
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sign-out(.*)",
]);
const isOnboardingRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/pending-approval(.*)",
]);
const isApiRoute = createRouteMatcher(["/(api|trpc)(.*)"]);
const isAfterSignIn = createRouteMatcher(["/after-signin"]);
const isEdgeStoreRoute = createRouteMatcher(["/api/edgestore(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Let EdgeStore handle its own requests
  if (isEdgeStoreRoute(request)) {
    return NextResponse.next();
  }

  // Allow public routes (including sign-out)
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // Allow after-signin route (it handles its own redirect logic)
  if (isAfterSignIn(request)) {
    return NextResponse.next();
  }

  const { userId } = await auth();

  // Not logged in → redirect to sign-in
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Fetch user metadata from Clerk
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const md: any = user.publicMetadata || {};

  // Normalize role
  const rawRole = md.role || "";
  const normalizedRole = String(rawRole)
    .toLowerCase()
    .replace(/[\s_-]/g, "");

  const onboarded = md.onboarded === true;
  const supplierApproved = md.supplier_approved === true;

  // Check if superadmin
  const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";
  const isSuperAdmin =
    normalizedRole === "superadmin" || email === "keitamorie@gmail.com";
  const isAdmin = normalizedRole === "admin";
  const isSupplier = normalizedRole === "supplier";

  const pathname = request.nextUrl.pathname;

  // 🚀 SUPERADMIN & ADMIN — FULL ACCESS, NO ONBOARDING REQUIRED
  if (isSuperAdmin || isAdmin) {
    // Block them from accessing onboarding
    if (isOnboardingRoute(request)) {
      console.log("🔄 Redirecting admin/superadmin away from onboarding to /");
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  // 🏭 SUPPLIER FLOW
  if (isSupplier) {
    console.log("🏭 Supplier detected");

    // Approved suppliers: restricted to specific paths
    if (onboarded && supplierApproved) {
      console.log("✅ Approved supplier - restricting access");

      // Redirect root to supplier dashboard
      if (pathname === "/") {
        return NextResponse.redirect(
          new URL("/supplier-dashboard", request.url)
        );
      }

      const allowedSupplierPaths = [
        "/supplier-dashboard",
        "/tenders",
        "/purchase-orders",
        "/suppliers",
        "/invoices",
      ];

      const isAllowed =
        allowedSupplierPaths.some((path) => pathname.startsWith(path)) ||
        isApiRoute(request);

      if (!isAllowed && !isOnboardingRoute(request)) {
        console.log("❌ Supplier accessing unauthorized path");
        return NextResponse.redirect(new URL("/not-authorized", request.url));
      }

      return NextResponse.next();
    }

    // Not onboarded → force onboarding
    if (!onboarded && !isOnboardingRoute(request) && !isApiRoute(request)) {
      console.log("🔄 Supplier not onboarded - redirecting to onboarding");
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // Onboarded but pending approval → restrict to pending pages
    if (onboarded && !supplierApproved) {
      console.log("⏳ Supplier pending approval");

      const allowedPendingPaths = ["/onboarding", "/pending-approval"];

      const isAllowed =
        allowedPendingPaths.some((path) => pathname.startsWith(path)) ||
        pathname.startsWith("/onboarding/supplier/") ||
        isApiRoute(request);

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/pending-approval", request.url));
      }

      // ✅ FIXED: Allow access to pending-approval and allowed paths
      return NextResponse.next();
    }

    return NextResponse.next();
  }

  // 👤 ALL OTHER ROLES — require onboarding if not completed
  if (!onboarded && !isOnboardingRoute(request) && !isApiRoute(request)) {
    console.log("🔄 User not onboarded - redirecting to onboarding");
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  console.log("✅ Allowing access");
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
