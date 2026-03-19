"use client";

import React from "react";
import { EdgeStoreProvider } from "@/lib/edgestore";

// Check if EdgeStore is configured (client-side check using public env var workaround)
// Note: We check for the existence of the API route working properly
const isEdgeStoreConfigured = !!(
  process.env.NEXT_PUBLIC_EDGE_STORE_CONFIGURED === "true" ||
  // Fallback: assume configured in production environments
  (typeof window !== "undefined" && window.location.hostname !== "localhost")
);

export function ConditionalEdgeStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Always try to use EdgeStoreProvider - it will gracefully handle errors
  // The actual configuration check happens server-side in the API route
  return <EdgeStoreProvider>{children}</EdgeStoreProvider>;
}
