import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

export const runtime = "nodejs";

const es = initEdgeStore.create();

/**
 * This is the main router for the EdgeStore buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket({
    maxSize: 1024 * 1024 * 20,
    accept: ["image/*", "application/pdf"],
  }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

async function wrappedHandler(req: Request) {
  try {
    return await handler(req as any);
  } catch (e: any) {
    const msg = String(e?.message || "EdgeStore handler error");
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      {
        status: 502,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

export { wrappedHandler as GET, wrappedHandler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
