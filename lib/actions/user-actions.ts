"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Supplier } from "../models/Supplier";

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

  if (currentUserRole === "superadmin") {
    return { allowed: true };
  }

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

  const invitations = await client.invitations.getInvitationList({
    status: "pending",
    limit: 200,
  });

  const pendingUsers: UserSummary[] = (invitations?.data || []).map(
    (inv: any) => {
      const md = (inv?.publicMetadata || {}) as any;
      return {
        id: `invitation_${inv.id}`,
        firstName: "Pending",
        lastName: "Invitation",
        email: String(inv.emailAddress || ""),
        role: normalizeRole(String(md.role || "")) || "",
        photo: "",
        onboarded: false,
        onboardingStatus: "pending_invitation",
        createdAt: inv?.createdAt
          ? Number(new Date(inv.createdAt).getTime())
          : undefined,
        lastSignInAt: undefined,
      };
    }
  );

  let supplierUsers: UserSummary[] = [];
  try {
    await dbConnect();
    const suppliers = await Supplier.find({}).lean();

    supplierUsers = suppliers.map((supplier: any) => {
      const contactPerson = supplier.onboarding?.contactPerson || "";
      const [firstName = "", ...lastNameParts] = contactPerson.split(" ");
      const lastName = lastNameParts.join(" ") || "";

      return {
        id: String(supplier.ownerUserId || supplier._id),
        firstName: firstName || supplier.name || "Supplier",
        lastName: lastName || "",
        email: supplier.onboarding?.email || "",
        role: "supplier",
        photo: "",
        onboarded: true,
        onboardingStatus: supplier.approved
          ? "approved"
          : "pending_admin_approval",
        createdAt: supplier.createdAt
          ? Number(new Date(supplier.createdAt).getTime())
          : undefined,
        lastSignInAt: undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
  }

  const allUsers = [...users, ...pendingUsers, ...supplierUsers];
  const uniqueUsers = allUsers.filter(
    (user, index, self) => index === self.findIndex((u) => u.id === user.id)
  );

  return { users: uniqueUsers };
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  role: string
): Promise<{ success: boolean; error?: string; invitationUrl?: string }> {
  try {
    const permissionCheck = await canAssignRole(role);
    if (!permissionCheck.allowed) {
      return { success: false, error: permissionCheck.error };
    }

    const client = await clerkClient();
    const mdRole = normalizeRole(role);

    const autoOnboardedRoles = ["superadmin", "admin"];
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
      // Check if user already exists
      const existingUsers = await client.users.getUserList({
        emailAddress: [email],
      });
      if (existingUsers.data.length > 0) {
        return {
          success: false,
          error: "A user with this email already exists",
        };
      }

      // Check if invitation already exists
      const pendingInvitations = await client.invitations.getInvitationList({
        status: "pending",
      });

      const existingInvitation = pendingInvitations.data.find(
        (inv: any) => inv.emailAddress.toLowerCase() === email.toLowerCase()
      );

      if (existingInvitation) {
        await client.invitations.revokeInvitation(existingInvitation.id);
        console.log("Revoked existing invitation for:", email);
      }

      // Get the base URL from environment
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000";

      // Create invitation with improved configuration
      const invitation = await client.invitations.createInvitation({
        emailAddress: email,
        publicMetadata: meta,
        redirectUrl: `${baseUrl}/sign-up`,
        // Set a longer expiration (optional, default is 30 days)
        // expiresInDays: 7,
      });

      console.log("Invitation created successfully:", {
        id: invitation.id,
        email: invitation.emailAddress,
        url: invitation.url,
      });

      revalidatePath("/admin/users");

      return {
        success: true,
        invitationUrl: invitation.url, // Return URL so you can copy it manually if needed
      };
    } catch (error: any) {
      console.error("Error creating invitation:", error);
      console.error("Error details:", JSON.stringify(error.errors, null, 2));

      const errorMsg =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Failed to create invitation";
      return {
        success: false,
        error: errorMsg,
      };
    }
  } catch (error: any) {
    console.error("createUser outer error:", error);
    return { success: false, error: error?.message || "Failed to create user" };
  }
}

export async function resendInvitation(
  invitationId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await clerkClient();

    // Remove the invitation_ prefix if it exists
    const cleanId = invitationId.replace("invitation_", "");

    // Revoke old invitation
    await client.invitations.revokeInvitation(cleanId);

    // Get the invitation details to recreate it
    // Note: You'll need to store email and metadata to recreate
    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error resending invitation:", error);
    return {
      success: false,
      error: error?.message || "Failed to resend invitation",
    };
  }
}

export async function revokeInvitation(
  invitationId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await clerkClient();

    // Remove the invitation_ prefix if it exists
    const cleanId = invitationId.replace("invitation_", "");

    await client.invitations.revokeInvitation(cleanId);
    revalidatePath("/admin/users");

    return { success: true };
  } catch (error: any) {
    console.error("Error revoking invitation:", error);
    return {
      success: false,
      error: error?.message || "Failed to revoke invitation",
    };
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

export async function getCurrentUserName(): Promise<
  { success: true; name: string } | { success: false; error: string }
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const name = `${String(user.firstName || "").trim()} ${String(
      user.lastName || ""
    ).trim()}`.trim();
    return { success: true, name };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to fetch current user name",
    };
  }
}
