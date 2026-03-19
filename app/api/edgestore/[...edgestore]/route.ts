import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Check if EdgeStore credentials are configured
const isEdgeStoreConfigured = !!(
  process.env.EDGE_STORE_ACCESS_KEY && process.env.EDGE_STORE_SECRET_KEY
);

// Only initialize EdgeStore if credentials are available
let handler: ReturnType<typeof createEdgeStoreNextHandler> | null = null;
let edgeStoreRouter: ReturnType<ReturnType<typeof initEdgeStore.create>["router"]> | null = null;

if (isEdgeStoreConfigured) {
  const es = initEdgeStore.create();

  /**
   * This is the main router for the EdgeStore buckets.
   */
  edgeStoreRouter = es.router({
    publicFiles: es.fileBucket({
      maxSize: 1024 * 1024 * 20,
      accept: ["image/*", "application/pdf"],
    }),
  });

  handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
  });
}

// Fallback handler when EdgeStore is not configured
function notConfiguredHandler() {
  return NextResponse.json(
    {
      error: "EdgeStore not configured",
      message: "Please set EDGE_STORE_ACCESS_KEY and EDGE_STORE_SECRET_KEY environment variables.",
    },
    { status: 503 }
  );
}

export async function GET(request: Request, context: { params: Promise<{ edgestore: string[] }> }) {
  if (!handler) return notConfiguredHandler();
  return handler(request, context);
}

export async function POST(request: Request, context: { params: Promise<{ edgestore: string[] }> }) {
  if (!handler) return notConfiguredHandler();
  return handler(request, context);
}

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = NonNullable<typeof edgeStoreRouter>;
