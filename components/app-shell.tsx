"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { Header } from "./header";

// Check if essential env vars are configured (client-side check)
const isConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Show minimal layout for setup, onboarding, auth pages, or when not configured
  if (
    !isConfigured ||
    pathname.startsWith("/onboarding") ||
    pathname === "/_not-found" ||
    pathname.startsWith("/landing") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/setup")
  ) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={mobileOpen ? "block" : "hidden md:block"}>
        <Navigation mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
