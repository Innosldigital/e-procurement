"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";

type UserSummary = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  photo?: string;
  onboarded?: boolean;
  onboardingStatus?: string;
  createdAt?: number;
  lastSignInAt?: number;
};

function normalizeRole(role: string) {
  return String(role || "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

export async function getUsers(): Promise<{ users: UserSummary[] }> {
  const client = await clerkClient();
  const list = await client.users.getUserList({ limit: 200 });
  const users: UserSummary[] = (list?.data || []).map((u: any) => {
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
  return { users };
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  role: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await clerkClient();
    const mdRole = normalizeRole(role);

    const meta = {
      role: mdRole,
      onboarded: ["superadmin", "admin"].includes(mdRole),
      onboardingStatus: ["superadmin", "admin"].includes(mdRole)
        ? "approved"
        : "pending_admin_approval",
    };

    try {
      await client.users.createUser({
        emailAddress: [email],
        firstName,
        lastName,
        publicMetadata: meta,
      });
    } catch (e) {
      await client.invitations.createInvitation({
        emailAddress: email,
        publicMetadata: meta,
        notify: true,
        redirectUrl: "/sign-in",
      });
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create user" };
  }
}

export async function updateUser(
  id: string,
  firstName: string,
  lastName: string,
  role: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await clerkClient();
    await client.users.updateUser(id, {
      firstName,
      lastName,
      publicMetadata: { role: normalizeRole(role) },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update user" };
  }
}

export async function deleteUser(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await clerkClient();
    await client.users.deleteUser(id);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete user" };
  }
}
