import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { submitBid } from "@/lib/actions/tender-actions";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const tenderId = String(body?.tenderId || "");
    const payload = body?.payload || {};

    if (!tenderId) {
      return NextResponse.json({ success: false, error: "Missing tenderId" }, { status: 400 });
    }

    const res = await submitBid(tenderId, payload);
    const status = res?.success ? 200 : 400;
    return NextResponse.json(res, { status });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Server error" }, { status: 500 });
  }
}