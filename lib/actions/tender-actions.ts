"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Tender } from "../models/Tender";
import { Supplier } from "../models/Supplier";
import { createNotification } from "@/lib/actions/notification-actions";
import { Resend } from "resend";

export async function getTenders() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const md = (user?.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const role = rawRole.toLowerCase().replace(/[\s_-]/g, "");

    console.log("🔍 [getTenders] User role:", { userId, role });

    await dbConnect();

    let tenders: any[] = [];

    // Admins and superadmins see ALL tenders
    if (["admin", "superadmin"].includes(role)) {
      console.log("✅ [getTenders] Admin/Superadmin - fetching all tenders");

      tenders = await Tender.find({}).sort({ createdAt: -1 }).limit(50).lean();

      console.log(`✅ [getTenders] Admin found ${tenders.length} tenders`);

      return {
        success: true,
        data: JSON.parse(JSON.stringify(tenders)),
      };
    }

    // Suppliers only see tenders matching their categories
    if (role === "supplier") {
      console.log("🔍 [getTenders] Supplier - filtering by categories");

      // Get supplier's product categories
      const supplier = await Supplier.findOne({ ownerUserId: userId })
        .select(["onboarding.productCategories", "name"])
        .lean();

      if (!supplier) {
        console.warn("⚠️ [getTenders] No supplier found for user:", userId);
        return { success: true, data: [] };
      }

      const categories: string[] = Array.isArray(
        (supplier as any)?.onboarding?.productCategories
      )
        ? ((supplier as any).onboarding.productCategories as string[])
        : [];

      console.log("🔍 [getTenders] Raw supplier categories:", categories);

      // Normalize categories to lowercase and trim whitespace
      const normalizedCategories = categories
        .map((c) =>
          String(c || "")
            .toLowerCase()
            .trim()
        )
        .filter(Boolean);

      console.log(
        "🔍 [getTenders] Normalized supplier categories:",
        normalizedCategories
      );

      if (normalizedCategories.length === 0) {
        console.warn("⚠️ [getTenders] Supplier has no categories");
        return { success: true, data: [] };
      }

      // Build case-insensitive regex query for each category
      const categoryQueries = normalizedCategories.map((category) => {
        // Escape special regex characters
        const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return {
          category: {
            $regex: new RegExp(`^${escapedCategory}$`, "i"),
          },
        };
      });

      console.log(
        "🔍 [getTenders] Category queries:",
        JSON.stringify(categoryQueries, null, 2)
      );

      // Find tenders matching any of the supplier's categories
      tenders = await Tender.find({
        $or: categoryQueries,
      })
        .sort({ createdAt: -1 })
        .limit(50)
        .lean();

      console.log(
        `✅ [getTenders] Supplier found ${tenders.length} matching tenders`
      );

      // Log detailed results for debugging
      tenders.forEach((t: any) => {
        console.log(`  - Tender: ${t.tenderId} | Category: "${t.category}"`);
      });

      return {
        success: true,
        data: JSON.parse(JSON.stringify(tenders)),
      };
    }

    // Other roles see no tenders by default
    console.warn(
      "⚠️ [getTenders] Unknown role or insufficient permissions:",
      role
    );
    return { success: true, data: [] };
  } catch (error) {
    console.error("❌ [getTenders] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch tenders",
    };
  }
}

export async function getTenderById(id: string) {
  try {
    await dbConnect();
    const tender = await Tender.findById(id).lean();

    if (!tender) {
      return { success: false, error: "Tender not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tender)),
    };
  } catch (error) {
    console.error("[v0] Error fetching tender:", error);
    return { success: false, error: "Failed to fetch tender" };
  }
}

export async function awardTender(id: string, supplierId: string) {
  try {
    await dbConnect();

    const now = new Date();
    const tender = await Tender.findByIdAndUpdate(
      id,
      {
        stage: "Awarded",
        keyDates: { closed: now },
        evaluationSummary: {
          recommendedSupplier: supplierId,
          recommendedSupplierId: supplierId,
        },
        status: "awarded",
      },
      { new: true }
    ).lean();

    if (!tender) {
      return { success: false, error: "Tender not found" };
    }

    revalidatePath("/tenders");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tender)),
    };
  } catch (error) {
    console.error("[v0] Error awarding tender:", error);
    return { success: false, error: "Failed to award tender" };
  }
}

export async function requestRevisedBids(id: string) {
  try {
    await dbConnect();

    const tender = await Tender.findByIdAndUpdate(
      id,
      {
        status: "revision_requested",
      },
      { new: true }
    ).lean();

    if (!tender) {
      return { success: false, error: "Tender not found" };
    }

    revalidatePath("/tenders");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tender)),
    };
  } catch (error) {
    console.error("[v0] Error requesting revised bids:", error);
    return { success: false, error: "Failed to request revised bids" };
  }
}

export async function createTender(data: {
  title: string;
  type: string;
  category?: string;
  businessUnit?: string;
  region?: string;
  sourcingObjective?: string;
  estimatedValue?: number;
  contractTerm?: string;
  sourcingType?: string;
  invitedSuppliers?: number;
  closeDate?: Date;
  tenderDocuments?: {
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
}) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // 🔍 ADD DIAGNOSTIC LOGGING HERE
    console.log("=== ENVIRONMENT CHECK ===");
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
    console.log("RESEND_API_KEY length:", process.env.RESEND_API_KEY?.length);
    console.log("NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL);
    console.log("RESEND_FROM_EMAIL:", process.env.RESEND_FROM_EMAIL);
    console.log("========================");

    await dbConnect();

    // Generate tender ID
    const count = await Tender.countDocuments();
    const tenderId = `${data.type}-${(count + 2300).toString()}`;

    // Ensure tenderDocuments is properly formatted
    const tenderDocuments = Array.isArray(data.tenderDocuments)
      ? data.tenderDocuments.map((doc) => ({
          name: String(doc.name || ""),
          size: Number(doc.size || 0),
          type: String(doc.type || ""),
          url: String(doc.url || ""),
        }))
      : [];

    // Create tender object with all fields explicitly set
    const tenderData = {
      tenderId,
      title: data.title,
      type: data.type,
      category: data.category || "",
      businessUnit: data.businessUnit || "",
      region: data.region || "",
      sourcingObjective: data.sourcingObjective || "",
      estimatedValue: data.estimatedValue || 0,
      contractTerm: data.contractTerm || "",
      sourcingType: data.sourcingType || "",
      invitedSuppliers: data.invitedSuppliers || 0,
      closeDate: data.closeDate,
      publishedDate: new Date(),
      tenderDocuments: tenderDocuments,
      stage: "Open", // Changed from "Planned" to "Open" so suppliers can bid immediately
      status: "published", // Changed from "draft" to "published"
      responses: 0,
      owner: userId,
      keyDates: {
        published: new Date(),
      },
      bids: [],
      timeline: [
        {
          event: "Tender created and published",
          date: new Date().toISOString(),
          owner: userId,
        },
      ],
    };

    console.log(
      "[createTender] Creating tender with data:",
      JSON.stringify(tenderData, null, 2)
    );

    const tender = await Tender.create(tenderData);

    console.log("[createTender] Tender created successfully:", tender._id);

    // Fetch all approved suppliers
    const suppliers = await Supplier.find({ approved: true })
      .select(["ownerUserId", "name", "onboarding.email", "category", "region"])
      .lean();

    // 🔍 ADD THIS LOGGING
    console.log("=== SUPPLIERS CHECK ===");
    console.log(`Total approved suppliers found: ${suppliers.length}`);
    suppliers.forEach((s: any, idx: number) => {
      console.log(`Supplier ${idx + 1}:`, {
        name: s.name,
        hasUserId: !!s.ownerUserId,
        userId: s.ownerUserId,
        hasEmail: !!s?.onboarding?.email,
        email: s?.onboarding?.email,
      });
    });
    console.log("========================");

    console.log(`[createTender] Found ${suppliers.length} approved suppliers`);

    // Initialize Resend if API key exists
    const apiKey = process.env.RESEND_API_KEY;
    const resend = apiKey ? new Resend(apiKey) : null;

    if (!resend) {
      console.warn(
        "[createTender] ⚠️ RESEND_API_KEY not found - emails will not be sent"
      );
    }

    const notificationPromises = suppliers.map(async (s: any) => {
      try {
        const supplierUserId = String(s.ownerUserId || "");
        const supplierEmail = String(s?.onboarding?.email || "");
        const supplierName = String(s.name || "Supplier");

        // Create in-app notification
        if (supplierUserId) {
          console.log(
            `[createTender] Creating notification for: ${supplierName} (${supplierUserId})`
          );

          const notifResult = await createNotification({
            userId: supplierUserId,
            type: "tender_published",
            title: "New Tender Published",
            message: `${tender.title} (${
              tender.tenderId
            }) has been published. Category: ${tender.category || "General"}`,
            actionUrl: `/tenders`,
            priority: "medium",
            metadata: {
              tenderId: tender.tenderId,
              tenderTitle: tender.title,
              category: tender.category,
              region: tender.region,
              closeDate: tender.closeDate,
              estimatedValue: tender.estimatedValue,
            },
          });

          // CHECK THE RESULT
          if (notifResult.success) {
            console.log(
              `[createTender] Notification created for ${supplierName}:`,
              notifResult.data?._id
            );
          } else {
            console.error(
              `[createTender] Notification FAILED for ${supplierName}:`,
              notifResult.error
            );
          }
        } else {
          console.warn(`[createTender] No userId for ${supplierName}`);
        }

        // Send email notification
        if (supplierEmail && resend) {
          console.log(`[createTender] Sending email to: ${supplierEmail}`);

          const emailResult = await resend.emails.send({
            from:
              process.env.RESEND_FROM_EMAIL ||
              "InnoSL Procurement <onboarding@innoslprocurement.com>",
            to: supplierEmail,
            subject: `New Tender Published: ${tender.title}`,
            html: `...`, // your existing HTML
          });

          console.log(
            `[createTender] Email sent to ${supplierName}:`,
            emailResult.data?.id
          );
        }
      } catch (error) {
        console.error(
          `[createTender] Error notifying supplier ${s.name}:`,
          error
        );
      }
    });

    await Promise.allSettled(notificationPromises);

    console.log(
      `[createTender] Notifications sent to ${suppliers.length} suppliers`
    );

    revalidatePath("/tenders");
    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tender)),
      message: `Tender created successfully. ${suppliers.length} suppliers notified.`,
    };
  } catch (error) {
    console.error("[createTender] ❌ Error creating tender:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create tender",
    };
  }
}

export async function getTenderTemplates() {
  try {
    await dbConnect();
    const tenders = await Tender.find({}).sort({ createdAt: -1 }).lean();
    const templates = (tenders || []).map((t: any) => ({
      id: String(t._id),
      name: String(t.title || t.tenderId || "Untitled"),
      type: String(t.type || "RFP"),
      category: String(t.category || ""),
      description: String(t.sourcingObjective || t.notes || ""),
      scoringCriteria: [],
      mandatoryQuestions: [],
      evaluationWeights: {},
      usageCount: Number(
        t.responses || (Array.isArray(t.bids) ? t.bids.length : 0) || 0
      ),
    }));
    return { success: true, data: JSON.parse(JSON.stringify(templates)) };
  } catch (error) {
    console.error("Error fetching tender templates:", error);
    return { success: false, error: "Failed to fetch tender templates" };
  }
}

export async function getEvaluationRules() {
  try {
    await dbConnect();
    const rules: any[] = [];
    return { success: true, data: rules };
  } catch (error) {
    console.error("[v0] Error fetching evaluation rules:", error);
    return { success: false, error: "Failed to fetch evaluation rules" };
  }
}

export async function submitBid(
  id: string,
  data: {
    supplierName: string;
    contactEmail: string;
    contactPhone: string;
    totalPrice: string;
    technicalProposal?: string;
    complianceStatement: string;
    additionalNotes: string;
    technicalProposalUploads?: {
      name: string;
      size: number;
      type: string;
      url?: string;
    }[];
    financialProposalUploads?: {
      name: string;
      size: number;
      type: string;
      url?: string;
    }[];
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    let supplierRef: any = undefined;
    try {
      const s = await Supplier.findOne({
        $or: [{ name: data.supplierName }, { supplierId: data.supplierName }],
      }).select(["_id"]);
      supplierRef = s?._id || undefined;
    } catch {}

    const bid = {
      supplier: data.supplierName,
      supplierId: supplierRef,
      totalPrice: Number(data.totalPrice || 0),
      score: undefined,
      compliance: data.complianceStatement || "",
      highlights: data.additionalNotes || data.technicalProposal || "",
      technicalDocuments: Array.isArray(data.technicalProposalUploads)
        ? data.technicalProposalUploads.map((d) => ({
            name: d.name,
            size: d.size,
            type: d.type,
            url: d.url || "",
          }))
        : [],
      financialDocuments: Array.isArray(data.financialProposalUploads)
        ? data.financialProposalUploads.map((d) => ({
            name: d.name,
            size: d.size,
            type: d.type,
            url: d.url || "",
          }))
        : [],
    };

    const updated = await Tender.findByIdAndUpdate(
      id,
      {
        $push: {
          bids: bid,
          timeline: {
            event: "Bid submitted",
            date: new Date().toISOString(),
            owner: userId,
          },
        },
        $inc: { responses: 1 },
      },
      { new: true }
    ).lean();

    if (!updated) {
      return { success: false, error: "Tender not found" };
    }

    revalidatePath("/tenders");
    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("[v0] Error submitting bid:", error);
    return { success: false, error: "Failed to submit bid" };
  }
}

// Add this function to your lib/actions/tender-actions.ts file

export async function getTenderStats() {
  try {
    await dbConnect();

    const tenders = await Tender.find({}).lean();

    // Count open tenders (stage is "Open" or "Planned" or "Published")
    const openCount = tenders.filter((t: any) => {
      const stage = String(t.stage || t.status || "").toLowerCase();
      return stage === "open" || stage === "planned" || stage === "published";
    }).length;

    // Count tenders in final evaluation (stage is "Evaluation")
    const evalCount = tenders.filter((t: any) => {
      const stage = String(t.stage || t.status || "").toLowerCase();
      return stage === "evaluation";
    }).length;

    // Calculate average bids per tender
    const totalBids = tenders.reduce((sum: number, t: any) => {
      return sum + (Array.isArray(t.bids) ? t.bids.length : t.responses || 0);
    }, 0);

    const avgBids = tenders.length > 0 ? totalBids / tenders.length : 0;

    return {
      success: true,
      data: {
        openCount,
        evalCount,
        avgBids,
      },
    };
  } catch (error) {
    console.error("[v0] Error fetching tender stats:", error);
    return {
      success: false,
      error: "Failed to fetch tender stats",
      data: null,
    };
  }
}

export async function updateTender(
  id: string,
  data: {
    title?: string;
    type?: string;
    category?: string;
    businessUnit?: string;
    region?: string;
    sourcingObjective?: string;
    estimatedValue?: number;
    contractTerm?: string;
    sourcingType?: string;
    invitedSuppliers?: number;
    closeDate?: Date;
    tenderDocuments?: {
      name: string;
      size: number;
      type: string;
      url: string;
    }[];
  }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();

    // First, get the tender to check ownership
    const existingTender = await Tender.findById(id).lean();

    if (!existingTender) {
      return { success: false, error: "Tender not found" };
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const rawRole = String(((user.publicMetadata as any) || {}).role || "");
    const normalizedRole = rawRole.toLowerCase().replace(/[\s_-]+/g, "");
    const allowedRoles = [
      "admin",
      "superadmin",
      "projectlead",
      "procurementofficer",
    ];
    const isOwner = String((existingTender as any)?.owner || "") === userId;
    if (!isOwner && !allowedRoles.includes(normalizedRole)) {
      return {
        success: false,
        error: "You do not have permission to edit this tender",
      };
    }

    // Prepare update data
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.businessUnit !== undefined)
      updateData.businessUnit = data.businessUnit;
    if (data.region !== undefined) updateData.region = data.region;
    if (data.sourcingObjective !== undefined)
      updateData.sourcingObjective = data.sourcingObjective;
    if (data.estimatedValue !== undefined)
      updateData.estimatedValue = data.estimatedValue;
    if (data.contractTerm !== undefined)
      updateData.contractTerm = data.contractTerm;
    if (data.sourcingType !== undefined)
      updateData.sourcingType = data.sourcingType;
    if (data.invitedSuppliers !== undefined)
      updateData.invitedSuppliers = data.invitedSuppliers;
    if (data.closeDate !== undefined) updateData.closeDate = data.closeDate;

    if (data.tenderDocuments !== undefined) {
      updateData.tenderDocuments = Array.isArray(data.tenderDocuments)
        ? data.tenderDocuments.map((doc) => ({
            name: String(doc.name || ""),
            size: Number(doc.size || 0),
            type: String(doc.type || ""),
            url: String(doc.url || ""),
          }))
        : [];
    }

    // Add timeline entry
    updateData.$push = {
      timeline: {
        event: "Tender updated",
        date: new Date().toISOString(),
        owner: userId,
      },
    };

    const updatedTender = await Tender.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();

    if (!updatedTender) {
      return { success: false, error: "Failed to update tender" };
    }

    console.log(`[updateTender] ✅ Tender ${id} updated successfully`);

    revalidatePath("/tenders");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedTender)),
      message: "Tender updated successfully",
    };
  } catch (error) {
    console.error("[updateTender] ❌ Error updating tender:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update tender",
    };
  }
}

export type BidWithDetails = {
  _id?: string;
  _key: string; // 🔥 ADD THIS FIELD
  tenderObjectId: string;
  tenderId: string;
  tenderTitle: string;
  type: string;
  category: string;
  stage: string;
  supplier: string;
  supplierId?: string;
  totalPrice: number;
  score?: number;
  compliance?: string;
  highlights?: string;
  technicalDocCount: number;
  financialDocCount: number;
  createdAt: string | Date;
  technicalDocuments?: Array<{
    name: string;
    size: number;
    type: string;
    url?: string;
  }>;
  financialDocuments?: Array<{
    name: string;
    size: number;
    type: string;
    url?: string;
  }>;
  contactEmail?: string;
  contactPhone?: string;
};

// export async function getBidsWithDetails(): Promise<{
//   success: boolean;
//   error?: string;
//   data: BidWithDetails[];
// }> {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return { success: false, error: "Unauthorized", data: [] };
//     }

//     const client = await clerkClient();
//     const user = await client.users.getUser(userId);
//     const md = (user?.publicMetadata || {}) as any;
//     const rawRole = String(md.role || "");
//     const normalizedRole = rawRole.toLowerCase().replace(/[\s_-]/g, "");
//     const allowedRoles = ["admin", "superadmin", "projectlead"];
//     if (!allowedRoles.includes(normalizedRole)) {
//       return {
//         success: false,
//         error: "Only Admin, Superadmin, and Project Lead can view bids",
//         data: [],
//       };
//     }

//     await dbConnect();

//     const tenders = await Tender.find({
//       $or: [{ bids: { $exists: true, $ne: [] } }, { responses: { $gt: 0 } }],
//     })
//       .select([
//         "_id",
//         "tenderId",
//         "title",
//         "type",
//         "category",
//         "stage",
//         "status",
//         "bids",
//         "updatedAt",
//         "createdAt",
//       ])
//       .sort({ updatedAt: -1 })
//       .lean();

//     const rows: BidWithDetails[] = [];
//     const supplierCache = new Map<string, { email?: string; phone?: string }>();
//     for (const t of tenders || []) {
//       const bids = Array.isArray((t as any).bids) ? (t as any).bids : [];
//       for (const b of bids) {
//         let contactEmail: string | undefined = undefined;
//         let contactPhone: string | undefined = undefined;
//         const sid = (b as any).supplierId ? String((b as any).supplierId) : "";
//         if (sid) {
//           const cached = supplierCache.get(sid);
//           if (cached) {
//             contactEmail = cached.email || undefined;
//             contactPhone = cached.phone || undefined;
//           } else {
//             try {
//               const sup = await Supplier.findById(sid)
//                 .select(["onboarding.email", "onboarding.phone"])
//                 .lean();
//               const email = (sup as any)?.onboarding?.email
//                 ? String((sup as any).onboarding.email)
//                 : undefined;
//               const phone = (sup as any)?.onboarding?.phone
//                 ? String((sup as any).onboarding.phone)
//                 : undefined;
//               supplierCache.set(sid, { email, phone });
//               contactEmail = email;
//               contactPhone = phone;
//             } catch {}
//           }
//         }
//         rows.push({
//           tenderObjectId: String((t as any)._id),
//           tenderId: String((t as any).tenderId || ""),
//           tenderTitle: String((t as any).title || "Untitled"),
//           type: String((t as any).type || ""),
//           category: String((t as any).category || ""),
//           stage: String((t as any).stage || (t as any).status || ""),
//           supplier: String((b as any).supplier || ""),
//           supplierId: (b as any).supplierId
//             ? String((b as any).supplierId)
//             : undefined,
//           totalPrice: Number((b as any).totalPrice || 0),
//           score:
//             (b as any).score !== undefined
//               ? Number((b as any).score)
//               : undefined,
//           compliance: String((b as any).compliance || ""),
//           highlights: String((b as any).highlights || ""),
//           technicalDocCount: Array.isArray((b as any).technicalDocuments)
//             ? (b as any).technicalDocuments.length
//             : 0,
//           financialDocCount: Array.isArray((b as any).financialDocuments)
//             ? (b as any).financialDocuments.length
//             : 0,
//           createdAt: (t as any).updatedAt || (t as any).createdAt || new Date(),
//           technicalDocuments: Array.isArray((b as any).technicalDocuments)
//             ? (b as any).technicalDocuments
//             : [],
//           financialDocuments: Array.isArray((b as any).financialDocuments)
//             ? (b as any).financialDocuments
//             : [],
//           contactEmail,
//           contactPhone,
//         });
//       }
//     }

//     return { success: true, data: JSON.parse(JSON.stringify(rows)) };
//   } catch (error) {
//     console.error("[v0] Error fetching bids:", error);
//     return { success: false, error: "Failed to fetch bids", data: [] };
//   }
// }

export async function getBidsWithDetails(): Promise<{
  success: boolean;
  error?: string;
  data: BidWithDetails[];
}> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const md = (user?.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const normalizedRole = rawRole.toLowerCase().replace(/[\s_-]/g, "");
    const allowedRoles = ["admin", "superadmin", "projectlead"];
    if (!allowedRoles.includes(normalizedRole)) {
      return {
        success: false,
        error: "Only Admin, Superadmin, and Project Lead can view bids",
        data: [],
      };
    }

    await dbConnect();

    const tenders = await Tender.find({
      $or: [{ bids: { $exists: true, $ne: [] } }, { responses: { $gt: 0 } }],
    })
      .select([
        "_id",
        "tenderId",
        "title",
        "type",
        "category",
        "stage",
        "status",
        "bids",
        "updatedAt",
        "createdAt",
      ])
      .sort({ updatedAt: -1 })
      .lean();

    const rows: BidWithDetails[] = [];
    const supplierCache = new Map<string, { email?: string; phone?: string }>();

    for (const t of tenders || []) {
      const bids = Array.isArray((t as any).bids) ? (t as any).bids : [];

      for (let bidIndex = 0; bidIndex < bids.length; bidIndex++) {
        const b = bids[bidIndex];

        // Generate consistent key
        const tenderObjId = String((t as any)._id);
        const supplierName = String((b as any).supplier || "");
        const bidKey = `${tenderObjId}:${supplierName}:${bidIndex}`;

        console.log(`[getBidsWithDetails] Creating bid with key: ${bidKey}`);

        let contactEmail: string | undefined = undefined;
        let contactPhone: string | undefined = undefined;
        const sid = (b as any).supplierId ? String((b as any).supplierId) : "";

        if (sid) {
          const cached = supplierCache.get(sid);
          if (cached) {
            contactEmail = cached.email || undefined;
            contactPhone = cached.phone || undefined;
          } else {
            try {
              const sup = await Supplier.findById(sid)
                .select(["onboarding.email", "onboarding.phone"])
                .lean();
              const email = (sup as any)?.onboarding?.email
                ? String((sup as any).onboarding.email)
                : undefined;
              const phone = (sup as any)?.onboarding?.phone
                ? String((sup as any).onboarding.phone)
                : undefined;
              supplierCache.set(sid, { email, phone });
              contactEmail = email;
              contactPhone = phone;
            } catch {}
          }
        }

        rows.push({
          _key: bidKey,
          tenderObjectId: tenderObjId,
          tenderId: String((t as any).tenderId || ""),
          tenderTitle: String((t as any).title || "Untitled"),
          type: String((t as any).type || ""),
          category: String((t as any).category || ""),
          stage: String((t as any).stage || (t as any).status || ""),
          supplier: supplierName,
          supplierId: (b as any).supplierId
            ? String((b as any).supplierId)
            : undefined,
          totalPrice: Number((b as any).totalPrice || 0),
          score:
            (b as any).score !== undefined
              ? Number((b as any).score)
              : undefined,
          compliance: String((b as any).compliance || ""),
          highlights: String((b as any).highlights || ""),
          technicalDocCount: Array.isArray((b as any).technicalDocuments)
            ? (b as any).technicalDocuments.length
            : 0,
          financialDocCount: Array.isArray((b as any).financialDocuments)
            ? (b as any).financialDocuments.length
            : 0,
          createdAt: (t as any).updatedAt || (t as any).createdAt || new Date(),
          technicalDocuments: Array.isArray((b as any).technicalDocuments)
            ? (b as any).technicalDocuments
            : [],
          financialDocuments: Array.isArray((b as any).financialDocuments)
            ? (b as any).financialDocuments
            : [],
          contactEmail,
          contactPhone,
        });
      }
    }

    console.log(`[getBidsWithDetails] Returning ${rows.length} bids`);
    return { success: true, data: JSON.parse(JSON.stringify(rows)) };
  } catch (error) {
    console.error("[getBidsWithDetails] Error:", error);
    return { success: false, error: "Failed to fetch bids", data: [] };
  }
}
