import { NextRequest } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

function normalizeRole(role: string) {
  return String(role || "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const client = await clerkClient();
    const list = await client.users.getUserList({ limit: 200 });
    const users = (list?.data || []).map((u: any) => {
      const md = (u?.publicMetadata || {}) as any;
      const email = u?.emailAddresses?.[0]?.emailAddress || "";
      return {
        id: String(u.id),
        firstName: String(u.firstName || ""),
        lastName: String(u.lastName || ""),
        email,
        role: normalizeRole(String(md.role || "")) || "",
        photo: String(u.imageUrl || ""),
        onboarded: Boolean(md.onboarded || false),
        onboardingStatus: String(md.onboardingStatus || ""),
        createdAt: u?.createdAt
          ? Number(new Date(u.createdAt).getTime())
          : undefined,
        lastSignInAt: u?.lastSignInAt
          ? Number(new Date(u.lastSignInAt).getTime())
          : undefined,
      };
    });
    return new Response(JSON.stringify({ success: true, users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: e?.message || "Failed to fetch users",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
