"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function ClientClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // If Clerk is not configured, just render children without the provider
  if (!isClerkConfigured) {
    return <>{children}</>;
  }
  
  return <ClerkProvider>{children}</ClerkProvider>;
}
