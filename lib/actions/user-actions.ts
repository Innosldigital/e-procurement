// "use server";

// import { revalidatePath } from "next/cache";
// import { clerkClient } from "@clerk/nextjs/server";
// import { auth } from "@clerk/nextjs/server";

// type UserSummary = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   photo?: string;
//   onboarded?: boolean;
//   onboardingStatus?: string;
//   createdAt?: number;
//   lastSignInAt?: number;
// };

// function normalizeRole(role: string) {
//   return String(role || "")
//     .toLowerCase()
//     .replace(/[\s_-]+/g, "");
// }

// async function canAssignRole(
//   targetRole: string
// ): Promise<{ allowed: boolean; error?: string }> {
//   const { userId } = await auth();
//   if (!userId) {
//     return { allowed: false, error: "Unauthorized" };
//   }

//   const client = await clerkClient();
//   const currentUser = await client.users.getUser(userId);
//   const currentUserRole = normalizeRole(
//     String((currentUser.publicMetadata as any)?.role || "")
//   );
//   const normalizedTargetRole = normalizeRole(targetRole);

//   // Superadmin can assign all roles
//   if (currentUserRole === "superadmin") {
//     return { allowed: true };
//   }

//   // Admin can only assign these specific roles
//   if (currentUserRole === "admin") {
//     const adminAllowedRoles = [
//       "financialcontroller",
//       "financialaccountant",
//       "procurementofficer",
//       "projectlead",
//     ];

//     if (adminAllowedRoles.includes(normalizedTargetRole)) {
//       return { allowed: true };
//     }

//     return {
//       allowed: false,
//       error: "You do not have permission to assign this role",
//     };
//   }

//   return {
//     allowed: false,
//     error: "You do not have permission to create users",
//   };
// }

// export async function getUsers(): Promise<{ users: UserSummary[] }> {
//   const client = await clerkClient();
//   const list = await client.users.getUserList({ limit: 200 });
//   const users: UserSummary[] = (list?.data || []).map((u: any) => {
//     const md = (u?.publicMetadata || {}) as any;
//     const email = u?.emailAddresses?.[0]?.emailAddress || "";
//     return {
//       id: String(u.id),
//       firstName: String(u.firstName || ""),
//       lastName: String(u.lastName || ""),
//       email,
//       role: normalizeRole(String(md.role || "")) || "",
//       photo: String(u.imageUrl || ""),
//       onboarded: Boolean(md.onboarded || false),
//       onboardingStatus: String(md.onboardingStatus || ""),
//       createdAt: u?.createdAt
//         ? Number(new Date(u.createdAt).getTime())
//         : undefined,
//       lastSignInAt: u?.lastSignInAt
//         ? Number(new Date(u.lastSignInAt).getTime())
//         : undefined,
//     };
//   });
//   return { users };
// }

// export async function createUser(
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string
// ): Promise<{ success: boolean; error?: string }> {
//   try {
//     const permissionCheck = await canAssignRole(role);
//     if (!permissionCheck.allowed) {
//       return { success: false, error: permissionCheck.error };
//     }

//     const client = await clerkClient();
//     const mdRole = normalizeRole(role);

//     // Define which roles should be auto-onboarded
//     const autoOnboardedRoles = ["superadmin", "admin"];

//     // Define which roles need admin approval
//     const needsApprovalRoles = [
//       "financialcontroller",
//       "financialaccountant",
//       "procurementofficer",
//       "projectlead",
//       "supplier",
//     ];

//     const meta = {
//       role: mdRole,
//       onboarded: autoOnboardedRoles.includes(mdRole),
//       onboardingStatus: autoOnboardedRoles.includes(mdRole)
//         ? "approved"
//         : needsApprovalRoles.includes(mdRole)
//         ? "pending_admin_approval"
//         : "pending",
//     };

//     try {
//       await client.users.createUser({
//         emailAddress: [email],
//         firstName,
//         lastName,
//         publicMetadata: meta,
//       });
//     } catch (e) {
//       await client.invitations.createInvitation({
//         emailAddress: email,
//         publicMetadata: meta,
//         notify: true,
//         redirectUrl: "/sign-in",
//       });
//     }

//     revalidatePath("/admin/users");
//     return { success: true };
//   } catch (error: any) {
//     return { success: false, error: error?.message || "Failed to create user" };
//   }
// }

// export async function updateUser(
//   id: string,
//   firstName: string,
//   lastName: string,
//   role: string
// ): Promise<{ success: boolean; error?: string }> {
//   try {
//     const permissionCheck = await canAssignRole(role);
//     if (!permissionCheck.allowed) {
//       return { success: false, error: permissionCheck.error };
//     }

//     const client = await clerkClient();
//     await client.users.updateUser(id, {
//       firstName,
//       lastName,
//       publicMetadata: { role: normalizeRole(role) },
//     });
//     revalidatePath("/admin/users");
//     return { success: true };
//   } catch (error: any) {
//     return { success: false, error: error?.message || "Failed to update user" };
//   }
// }

// export async function deleteUser(
//   id: string
// ): Promise<{ success: boolean; error?: string }> {
//   try {
//     const client = await clerkClient();
//     await client.users.deleteUser(id);
//     revalidatePath("/admin/users");
//     return { success: true };
//   } catch (error: any) {
//     return { success: false, error: error?.message || "Failed to delete user" };
//   }
// }

// export async function getCurrentUserRole(): Promise<string> {
//   try {
//     const { userId } = await auth();
//     if (!userId) return "";

//     const client = await clerkClient();
//     const user = await client.users.getUser(userId);
//     return normalizeRole(String((user.publicMetadata as any)?.role || ""));
//   } catch {
//     return "";
//   }
// }

// export async function getUserPhoto(
//   id: string
// ): Promise<{ success: boolean; photo?: string; error?: string }> {
//   try {
//     const client = await clerkClient();
//     const user = await client.users.getUser(id);
//     const photo = String((user as any)?.imageUrl || "");
//     return { success: true, photo };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error?.message || "Failed to fetch user photo",
//     };
//   }
// }

// export async function getCurrentUserName(): Promise<
//   { success: true; name: string } | { success: false; error: string }
// > {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized" };
//     }
//     const client = await clerkClient();
//     const user = await client.users.getUser(userId);
//     const name = `${String(user.firstName || "").trim()} ${String(
//       user.lastName || ""
//     ).trim()}`.trim();
//     return { success: true, name };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error?.message || "Failed to fetch current user name",
//     };
//   }
// }

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

  // Get existing users from Clerk
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

  // Get pending invitations
  const invitations = await client.invitations.getInvitationList({
    status: "pending",
    limit: 200,
  });

  // Convert invitations to user format
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

  // Fetch onboarded suppliers from MongoDB
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

  // Combine all users: Clerk users, pending invitations, and suppliers
  // Remove duplicates based on ownerUserId (suppliers might already be in Clerk users)
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
        // Revoke the old invitation and create a new one
        await client.invitations.revokeInvitation(existingInvitation.id);
        console.log("Revoked existing invitation for:", email);
      }

      // Create invitation
      const invitation = await client.invitations.createInvitation({
        emailAddress: email,
        publicMetadata: meta,
        redirectUrl: process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/sign-up`
          : undefined,
      });

      console.log("Invitation created successfully:", invitation.id);
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

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("createUser outer error:", error);
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
