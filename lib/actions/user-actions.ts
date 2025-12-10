"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

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

async function canAssignRole(
  targetRole: string
): Promise<{ allowed: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { allowed: false, error: "Unauthorized" };
  }

  const client = await clerkClient();
  const currentUser = await client.users.getUser(userId);
  const currentUserRole = normalizeRole(
    String((currentUser.publicMetadata as any)?.role || "")
  );
  const normalizedTargetRole = normalizeRole(targetRole);

  // Superadmin can assign all roles
  if (currentUserRole === "superadmin") {
    return { allowed: true };
  }

  // Admin can only assign these specific roles
  if (currentUserRole === "admin") {
    const adminAllowedRoles = [
      "financialcontroller",
      "financialaccountant",
      "procurementofficer",
      "projectlead",
    ];

    if (adminAllowedRoles.includes(normalizedTargetRole)) {
      return { allowed: true };
    }

    return {
      allowed: false,
      error: "You do not have permission to assign this role",
    };
  }

  return {
    allowed: false,
    error: "You do not have permission to create users",
  };
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
    const permissionCheck = await canAssignRole(role);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    const client = await clerkClient();
    const mdRole = normalizeRole(role);

    // Define which roles should be auto-onboarded
    const autoOnboardedRoles = ["superadmin", "admin"];

    // Define which roles need admin approval
    const needsApprovalRoles = [
      "financialcontroller",
      "financialaccountant",
      "procurementofficer",
      "projectlead",
      "supplier",
    ];

    const meta = {
      role: mdRole,
      onboarded: autoOnboardedRoles.includes(mdRole),
      onboardingStatus: autoOnboardedRoles.includes(mdRole)
        ? "approved"
        : needsApprovalRoles.includes(mdRole)
        ? "pending_admin_approval"
        : "pending",
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
    const permissionCheck = await canAssignRole(role);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

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

export async function getCurrentUserRole(): Promise<string> {
  try {
    const { userId } = await auth();
    if (!userId) return "";

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return normalizeRole(String((user.publicMetadata as any)?.role || ""));
  } catch {
    return "";
  }
}

export async function getUserPhoto(
  id: string
): Promise<{ success: boolean; photo?: string; error?: string }> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(id);
    const photo = String((user as any)?.imageUrl || "");
    return { success: true, photo };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to fetch user photo",
    };
  }
}
