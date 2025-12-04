import { NextRequest } from "next/server";
import { createRequisition } from "@/lib/actions/requisition-actions";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const res = await createRequisition(formData);
    return new Response(JSON.stringify(res), {
      status: res.success ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: e?.message || "Failed to create requisition",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
