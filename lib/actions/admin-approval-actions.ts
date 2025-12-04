"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import { Supplier } from "@/lib/models/Supplier";
import { clerkClient } from "@clerk/nextjs/server";
import { Notification } from "@/lib/models/Notification";
import { Resend } from "resend";

interface SystemUser {
  _id: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  approved: boolean;
  createdAt: number;
  lastSignInAt?: number;
  onboarding?: any;
  contact?: any;
  supplierId?: string;
  companyId?: string;
}

async function sendApprovalEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: "no-reply@eprocurement.local",
      to,
      subject,
      html,
    });
  } catch {}
}

export async function approveSupplierOnboarding(supplierId: string) {
  try {
    await dbConnect();

    const supplierDoc = await Supplier.findOneAndUpdate(
      { supplierId },
      { approved: true },
      { new: true }
    );

    if (!supplierDoc) return { success: false, error: "Supplier not found" };

    const client = await clerkClient();
    await client.users.updateUser(String(supplierDoc.ownerUserId), {
      publicMetadata: { onboarded: true, onboardingStatus: "approved" },
    });

    await Notification.create({
      userId: String(supplierDoc.ownerUserId),
      type: "supplier_update",
      title: "Your supplier account has been approved",
      message: "You now have full access to the system.",
      actionUrl: "/suppliers",
      priority: "medium",
      read: false,
    });

    const user = await client.users.getUser(String(supplierDoc.ownerUserId));
    const email = (user as any)?.emailAddresses?.[0]?.emailAddress || "";
    await sendApprovalEmail(
      email,
      "Supplier account approved",
      `<p>Your supplier account has been approved. You now have full access to the system.</p>`
    );

    revalidatePath("/suppliers");
    revalidatePath("/admin");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(supplierDoc.toObject())),
    };
  } catch (e) {
    return { success: false, error: "Failed to approve supplier onboarding" };
  }
}


export async function rejectSupplierOnboarding(
  supplierId: string,
  reason: string
) {
  try {
    await dbConnect();

    const supplierDoc = await Supplier.findOneAndUpdate(
      { supplierId },
      { approved: false },
      { new: true }
    );

    if (!supplierDoc) return { success: false, error: "Supplier not found" };

    const client = await clerkClient();
    await client.users.updateUser(String(supplierDoc.ownerUserId), {
      publicMetadata: {
        onboarded: false,
        onboardingStatus: "rejected",
        rejectionReason: reason,
      },
    });

    await Notification.create({
      userId: String(supplierDoc.ownerUserId),
      type: "supplier_update",
      title: "Your supplier onboarding was rejected",
      message: `Reason: ${reason}`,
      actionUrl: "/onboarding",
      priority: "high",
      read: false,
    });

    const user = await client.users.getUser(String(supplierDoc.ownerUserId));
    const email = (user as any)?.emailAddresses?.[0]?.emailAddress || "";
    await sendApprovalEmail(
      email,
      "Supplier onboarding rejected",
      `<p>Your supplier onboarding was rejected.</p><p>Reason: ${reason}</p>`
    );

    revalidatePath("/admin");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(supplierDoc.toObject())),
    };
  } catch (e) {
    return { success: false, error: "Failed to reject supplier onboarding" };
  }
}


export async function getPendingSuppliers() {
  try {
    await dbConnect();
    const suppliers = await Supplier.find({ approved: false })
      .sort({ createdAt: -1 })
      .lean();
    return { success: true, data: JSON.parse(JSON.stringify(suppliers)) };
  } catch (e) {
    return { success: false, error: "Failed to fetch pending suppliers" };
  }
}


export async function getAllSuppliers() {
  try {
    await dbConnect();
    const suppliers = await Supplier.find({}).sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(suppliers)) };
  } catch (e) {
    return { success: false, error: "Failed to fetch suppliers" };
  }
}

export async function createSystemUser(payload: {
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}) {
  "use server";
  try {
    const client: any = await clerkClient();
    const roleKey = String(payload.role)
      .toLowerCase()
      .replace(/[\s_-]+/g, " ")
      .trim()
      .replace(/\s/g, "_");

    const meta = {
      role: roleKey,
      onboarded: roleKey === "super_admin",
      onboardingStatus:
        roleKey === "super_admin"
          ? "approved"
          : roleKey === "admin"
          ? "pending_superadmin_approval"
          : "pending_admin_approval",
    };

    try {
      await client.users.createUser({
        emailAddress: [payload.email],
        firstName: payload.firstName,
        lastName: payload.lastName,
        publicMetadata: meta,
      });
    } catch (e) {
      await client.invitations.createInvitation({
        emailAddress: payload.email,
        publicMetadata: meta,
        notify: true,
        redirectUrl: "/sign-in",
      });
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create user" };
  }
}

export async function getPendingAdmins() {
  try {
    const client: any = await clerkClient();
    const ClerkUsers = await client.users.getUserList({ limit: 100 });

    const users = ClerkUsers.data.map((u: any) => ({
      id: u.id,
      name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
      email: u.emailAddresses?.[0]?.emailAddress,
      imageUrl: u.imageUrl,
      lastSignInAt: u.lastSignInAt,
      publicMetadata: u.publicMetadata,
    }));

    const pendingUsers = (users || []).filter((u: any) => {
      const md = (u?.publicMetadata || {}) as any;
      const role = String(md.role || "");
      const status = String(md.onboardingStatus || "");
      return role === "admin" && status === "pending_superadmin_approval";
    });

    const mappedUsers = pendingUsers.map((u: any) => ({
      userId: u.id,
      name:
        `${u.firstName || ""} ${u.lastName || ""}`.trim() ||
        u.emailAddresses?.[0]?.emailAddress ||
        "Unknown",
      email: u.emailAddresses?.[0]?.emailAddress || "",
      role: "admin" as const,
    }));

    const { data: invites } = await client.invitations.getInvitationList({
      status: "pending",
      limit: 100,
    });

    const adminInvites = (invites || []).filter((i: any) => {
      const md = (i?.publicMetadata || {}) as any;
      const role = String(md.role || "");
      return role === "admin";
    });

    const mappedInvites = adminInvites.map((i: any) => ({
      invitationId: i.id,
      userId: null,
      name: i.emailAddress,
      email: i.emailAddress,
      role: "admin" as const,
    }));

    const combined = [...mappedUsers, ...mappedInvites];

    return { success: true, data: users };
  } catch (e) {
    return { success: false, error: "Failed to fetch pending admins" };
  }
}

export async function approveAdminUser(userId: string) {
  try {
    const client: any = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboarded: true,
        onboardingStatus: "approved",
        role: "admin",
      },
    });

    await Notification.create({
      userId: userId,
      type: "approval_pending",
      title: "Admin access approved",
      message: "Your admin role has been approved. You now have full access.",
      actionUrl: "/admin",
      priority: "high",
      read: false,
    });

    const user = await client.users.getUser(userId);
    const email = (user as any)?.emailAddresses?.[0]?.emailAddress || "";
    await sendApprovalEmail(
      email,
      "Admin access approved",
      "<p>Your admin role has been approved.</p>"
    );

    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to approve admin user" };
  }
}

export async function rejectAdminUser(userId: string, reason: string) {
  try {
    const client: any = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboarded: false,
        onboardingStatus: "rejected",
        role: "admin",
        rejectionReason: reason,
      },
    });

    await Notification.create({
      userId: userId,
      type: "approval_pending",
      title: "Admin access rejected",
      message: `Reason: ${reason}`,
      actionUrl: "/support",
      priority: "high",
      read: false,
    });

    const user = await client.users.getUser(userId);
    const email = (user as any)?.emailAddresses?.[0]?.emailAddress || "";
    await sendApprovalEmail(
      email,
      "Admin access rejected",
      `<p>Your admin role was rejected.</p><p>Reason: ${reason}</p>`
    );

    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to reject admin user" };
  }
}

export async function approveAdminInvitation(invitationId: string) {
  try {
    const client: any = await clerkClient();
    const { data: invites } = await client.invitations.getInvitationList({
      status: "pending",
      limit: 200,
    });
    const inv = (invites || []).find((i: any) => i.id === invitationId);
    if (!inv) return { success: false, error: "Invitation not found" };

    const email = inv.emailAddress;
    const md = (inv.publicMetadata || {}) as any;

    await client.users.createUser({
      emailAddress: [email],
      publicMetadata: {
        ...md,
        onboarded: true,
        onboardingStatus: "approved",
        role: "admin",
      },
    });

    await client.invitations.revokeInvitation({ invitationId });

    await sendApprovalEmail(
      email,
      "Admin access approved",
      "<p>Your admin role has been approved.</p>"
    );

    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to approve admin invitation" };
  }
}

export async function rejectAdminInvitation(
  invitationId: string,
  reason: string
) {
  try {
    const client: any = await clerkClient();
    const { data: invites } = await client.invitations.getInvitationList({
      status: "pending",
      limit: 200,
    });
    const inv = (invites || []).find((i: any) => i.id === invitationId);
    if (!inv) return { success: false, error: "Invitation not found" };

    const email = inv.emailAddress;

    await client.invitations.revokeInvitation({ invitationId });

    await sendApprovalEmail(
      email,
      "Admin access rejected",
      `<p>Your admin invitation was rejected.</p><p>Reason: ${reason}</p>`
    );

    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to reject admin invitation" };
  }
}

export async function getAllSystemUsers(): Promise<
  { success: true; data: SystemUser[] } | { success: false; error: string }
> {
  try {
    console.log("🔍 getAllSystemUsers: Starting...");
    const client: any = await clerkClient();
    const usersResponse = await client.users.getUserList({ limit: 200 });
    console.log(
      "🔍 getAllSystemUsers: Clerk users fetched:",
      usersResponse?.data?.length || 0
    );

    const users = usersResponse?.data || [];

    const mapped: SystemUser[] = users.map((u: any): SystemUser => {
      const md = (u?.publicMetadata || {}) as any;
      const role = String(md.role || "").toLowerCase();
      const approved =
        md.onboarded === true ||
        String(md.onboardingStatus || "") === "approved";
      const email = u.emailAddresses?.[0]?.emailAddress || "";
      const name =
        `${u.firstName || ""} ${u.lastName || ""}`.trim() || email || "Unknown";
      const createdAt = u.createdAt
        ? new Date(u.createdAt).getTime()
        : Date.now();
      const lastSignInAt = u.lastSignInAt
        ? new Date(u.lastSignInAt).getTime()
        : undefined;

      return {
        _id: u.id,
        userId: u.id,
        email,
        name,
        role,
        approved,
        createdAt,
        lastSignInAt,
      };
    });

    console.log("🔍 getAllSystemUsers: Mapped Clerk users:", mapped.length);

    await dbConnect();
    const suppliers = await Supplier.find({}).sort({ createdAt: -1 }).lean();

    console.log(
      "🔍 getAllSystemUsers: Suppliers from DB:",
      suppliers?.length || 0
    );

    const existingIds = new Set<string>(mapped.map((m) => String(m.userId)));
    const combined = [...mapped];


    for (const s of suppliers || []) {
      const userId = String(s.ownerUserId || s.supplierId || "");
      const supplierId = String((s as any).supplierId || "");
      if (!userId) continue;

      const email = String((s as any)?.onboarding?.email || "");

      const supplierUser: SystemUser = {
        _id: String(s._id),
        userId,
        email,
        name: String((s as any).name || "Supplier"),
        role: "supplier",
        approved: !!(s as any).approved,
        createdAt: s.createdAt
          ? new Date(s.createdAt as any).getTime()
          : Date.now(),
        lastSignInAt: undefined,
        onboarding: (s as any).onboarding || null,
        supplierId: supplierId,
      };

      console.log("[v0] Supplier mapped:", {
        name: supplierUser.name,
        userId: supplierUser.userId,
        supplierId: supplierUser.supplierId,
      });

      if (existingIds.has(userId)) {
        const existingIndex = combined.findIndex((u) => u.userId === userId);
        if (existingIndex !== -1) {
          combined[existingIndex] = {
            ...combined[existingIndex],
            onboarding: supplierUser.onboarding,
            supplierId: supplierUser.supplierId,
          };
        }
      } else {
        combined.push(supplierUser);
        existingIds.add(userId);
      }
    }

    console.log("🔍 getAllSystemUsers: Final combined count:", combined.length);

    return { success: true, data: combined };
  } catch (e) {
    console.error("❌ getAllSystemUsers: Error:", e);
    return { success: false, error: "Failed to fetch system users" };
  }
}
