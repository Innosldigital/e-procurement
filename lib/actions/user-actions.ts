// "use server";

// import { revalidatePath } from "next/cache";
// import { clerkClient } from "@clerk/nextjs/server";
// import { auth } from "@clerk/nextjs/server";
// import dbConnect from "@/lib/mongodb";
// import { Supplier } from "../models/Supplier";

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

//   if (currentUserRole === "superadmin") {
//     return { allowed: true };
//   }

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

//   const invitations = await client.invitations.getInvitationList({
//     status: "pending",
//     limit: 200,
//   });

//   const pendingUsers: UserSummary[] = (invitations?.data || []).map(
//     (inv: any) => {
//       const md = (inv?.publicMetadata || {}) as any;
//       return {
//         id: `invitation_${inv.id}`,
//         firstName: "Pending",
//         lastName: "Invitation",
//         email: String(inv.emailAddress || ""),
//         role: normalizeRole(String(md.role || "")) || "",
//         photo: "",
//         onboarded: false,
//         onboardingStatus: "pending_invitation",
//         createdAt: inv?.createdAt
//           ? Number(new Date(inv.createdAt).getTime())
//           : undefined,
//         lastSignInAt: undefined,
//       };
//     }
//   );

//   let supplierUsers: UserSummary[] = [];
//   try {
//     await dbConnect();
//     const suppliers = await Supplier.find({}).lean();

//     supplierUsers = suppliers.map((supplier: any) => {
//       const contactPerson = supplier.onboarding?.contactPerson || "";
//       const [firstName = "", ...lastNameParts] = contactPerson.split(" ");
//       const lastName = lastNameParts.join(" ") || "";

//       return {
//         id: String(supplier.ownerUserId || supplier._id),
//         firstName: firstName || supplier.name || "Supplier",
//         lastName: lastName || "",
//         email: supplier.onboarding?.email || "",
//         role: "supplier",
//         photo: "",
//         onboarded: true,
//         onboardingStatus: supplier.approved
//           ? "approved"
//           : "pending_admin_approval",
//         createdAt: supplier.createdAt
//           ? Number(new Date(supplier.createdAt).getTime())
//           : undefined,
//         lastSignInAt: undefined,
//       };
//     });
//   } catch (error) {
//     console.error("Error fetching suppliers:", error);
//   }

//   const allUsers = [...users, ...pendingUsers, ...supplierUsers];
//   const uniqueUsers = allUsers.filter(
//     (user, index, self) => index === self.findIndex((u) => u.id === user.id)
//   );

//   return { users: uniqueUsers };
// }

// export async function createUser(
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string
// ): Promise<{ success: boolean; error?: string; invitationUrl?: string }> {
//   try {
//     const permissionCheck = await canAssignRole(role);
//     if (!permissionCheck.allowed) {
//       return { success: false, error: permissionCheck.error };
//     }

//     const client = await clerkClient();
//     const mdRole = normalizeRole(role);

//     const autoOnboardedRoles = ["superadmin", "admin"];
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
//       // Check if user already exists
//       const existingUsers = await client.users.getUserList({
//         emailAddress: [email],
//       });
//       if (existingUsers.data.length > 0) {
//         return {
//           success: false,
//           error: "A user with this email already exists",
//         };
//       }

//       // Check if invitation already exists
//       const pendingInvitations = await client.invitations.getInvitationList({
//         status: "pending",
//       });

//       const existingInvitation = pendingInvitations.data.find(
//         (inv: any) => inv.emailAddress.toLowerCase() === email.toLowerCase()
//       );

//       if (existingInvitation) {
//         await client.invitations.revokeInvitation(existingInvitation.id);
//         console.log("Revoked existing invitation for:", email);
//       }

//       // Get the base URL from environment
//       const baseUrl =
//         process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
//           ? `https://${process.env.VERCEL_URL}`
//           : "http://localhost:3000";

//       // Create invitation with improved configuration
//       const invitation = await client.invitations.createInvitation({
//         emailAddress: email,
//         publicMetadata: meta,
//         redirectUrl: `${baseUrl}/sign-up`,
//         // Set a longer expiration (optional, default is 30 days)
//         // expiresInDays: 7,
//       });

//       console.log("Invitation created successfully:", {
//         id: invitation.id,
//         email: invitation.emailAddress,
//         url: invitation.url,
//       });

//       revalidatePath("/admin/users");

//       return {
//         success: true,
//         invitationUrl: invitation.url, // Return URL so you can copy it manually if needed
//       };
//     } catch (error: any) {
//       console.error("Error creating invitation:", error);
//       console.error("Error details:", JSON.stringify(error.errors, null, 2));

//       const errorMsg =
//         error?.errors?.[0]?.longMessage ||
//         error?.errors?.[0]?.message ||
//         error?.message ||
//         "Failed to create invitation";
//       return {
//         success: false,
//         error: errorMsg,
//       };
//     }
//   } catch (error: any) {
//     console.error("createUser outer error:", error);
//     return { success: false, error: error?.message || "Failed to create user" };
//   }
// }

// export async function resendInvitation(
//   invitationId: string
// ): Promise<{ success: boolean; error?: string }> {
//   try {
//     const client = await clerkClient();

//     // Remove the invitation_ prefix if it exists
//     const cleanId = invitationId.replace("invitation_", "");

//     // Revoke old invitation
//     await client.invitations.revokeInvitation(cleanId);

//     // Get the invitation details to recreate it
//     // Note: You'll need to store email and metadata to recreate
//     return {
//       success: true,
//     };
//   } catch (error: any) {
//     console.error("Error resending invitation:", error);
//     return {
//       success: false,
//       error: error?.message || "Failed to resend invitation",
//     };
//   }
// }

// export async function revokeInvitation(
//   invitationId: string
// ): Promise<{ success: boolean; error?: string }> {
//   try {
//     const client = await clerkClient();

//     // Remove the invitation_ prefix if it exists
//     const cleanId = invitationId.replace("invitation_", "");

//     await client.invitations.revokeInvitation(cleanId);
//     revalidatePath("/admin/users");

//     return { success: true };
//   } catch (error: any) {
//     console.error("Error revoking invitation:", error);
//     return {
//       success: false,
//       error: error?.message || "Failed to revoke invitation",
//     };
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
import { Resend } from "resend";

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

function renderInvitationEmailTemplate(
  firstName: string,
  lastName: string,
  invitationUrl: string,
  role: string
) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>You're Invited to E-Procurement Suite</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f8;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827">
  <table role="presentation" style="width:100%;border-collapse:collapse">
    <tr>
      <td align="center" style="padding:24px">
        <table role="presentation" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
          <tr>
            <td style="padding:20px 24px;background:#111827;color:#ffffff;font-weight:700;font-size:18px">
              E‑Procurement Suite
            </td>
          </tr>
          <tr>
            <td style="padding:24px">
              <div style="font-size:16px;font-weight:600;margin-bottom:8px;color:#111827">
                You've Been Invited!
              </div>
              <div style="font-size:14px;line-height:1.6;color:#374151">
                <p>Hello ${firstName} ${lastName},</p>
                <p>You've been invited to join E-Procurement Suite as a <strong>${role}</strong>.</p>
                <p>Click the button below to accept your invitation and create your account:</p>
              </div>
              <div style="margin-top:24px;text-align:center">
                <a href="${invitationUrl}" style="display:inline-block;padding:12px 24px;border-radius:6px;background:#111827;color:#fff;text-decoration:none;font-weight:600;font-size:14px">
                  Accept Invitation & Sign Up
                </a>
              </div>
              <div style="margin-top:24px;padding:12px;background:#f3f4f6;border-radius:6px;font-size:12px;color:#6b7280">
                <p style="margin:0"><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
                <p style="margin:8px 0 0;word-break:break-all">${invitationUrl}</p>
              </div>
              <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280">
                This invitation will expire in 7 days. If you didn't expect this invitation, you can safely ignore this email.
              </div>
            </td>
          </tr>
        </table>
        <div style="font-size:11px;color:#9ca3af;margin-top:12px">
          © ${new Date().getFullYear()} E‑Procurement Suite
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendInvitationEmail(
  email: string,
  firstName: string,
  lastName: string,
  invitationUrl: string,
  role: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured - skipping email send");
    return { success: false, error: "Email service not configured" };
  }

  if (!email) {
    return { success: false, error: "No recipient email provided" };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "E-Procurement Suite <onboarding@yourdomain.com>",
      replyTo: process.env.RESEND_REPLY_TO_EMAIL,
      to: email,
      subject: "You've been invited to E-Procurement Suite",
      html: renderInvitationEmailTemplate(
        firstName,
        lastName,
        invitationUrl,
        role
      ),
    });

    console.log(`✅ Invitation email sent to ${email}`);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Failed to send invitation email:", error);
    return {
      success: false,
      error: error?.message || "Failed to send invitation email",
    };
  }
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

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000");

      const invitation = await client.invitations.createInvitation({
        emailAddress: email,
        publicMetadata: meta,
        redirectUrl: `${baseUrl}/sign-up`,
        notify: false, // We send our own email via Resend
      });

      console.log("Clerk invitation created successfully:", {
        id: invitation.id,
        email: invitation.emailAddress,
        url: invitation.url,
      });

      const invitationUrl =
        invitation.url || `${baseUrl}/sign-up?__clerk_ticket=${invitation.id}`;

      const emailResult = await sendInvitationEmail(
        email,
        firstName,
        lastName,
        invitationUrl,
        role
      );

      if (!emailResult.success) {
        console.warn(
          "Failed to send invitation email, but invitation was created:",
          emailResult.error
        );
        return {
          success: true,
          error: `User invited but email delivery failed: ${emailResult.error}. Please share the invitation link manually.`,
          invitationUrl: invitationUrl,
        };
      }

      revalidatePath("/admin/users");

      return {
        success: true,
        invitationUrl: invitationUrl,
      };
    } catch (error: any) {
      console.error("❌ Error creating invitation:", error);
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
    console.error("❌ createUser outer error:", error);
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
