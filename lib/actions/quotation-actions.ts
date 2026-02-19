"use server";

import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { Requisition } from "../models/Requisition";
import { Supplier } from "../models/Supplier";
import { revalidatePath } from "next/cache";

export type QuotationBid = {
  _key: string;
  requisitionId: string;
  requisitionObjectId: string;
  requisitionTitle?: string;
  requester: string;
  supplier: string;
  supplierId: string;
  supplierObjectId?: string;
  amount: number;
  status: string;
  category?: string;
  submittedAt: Date;
  documents: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  contactEmail?: string;
  contactPhone?: string;
};

/**
 * Get all quotations (from requisition attachments)
 * These are quotations uploaded by admins via the admin-upload page
 */
export async function getQuotations(): Promise<{
  success: boolean;
  error?: string;
  data: QuotationBid[];
}> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    // Check if user is admin/superadmin/project lead
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const md = (user?.publicMetadata || {}) as any;
    const rawRole = String(md.role || "");
    const normalizedRole = rawRole.toLowerCase().replace(/[\s_-]/g, "");
    const allowedRoles = ["admin", "superadmin", "projectlead"];

    if (!allowedRoles.includes(normalizedRole)) {
      return {
        success: false,
        error: "Only Admin, Superadmin, and Project Lead can view quotations",
        data: [],
      };
    }

    await connectDB();

    // Get all requisitions with attachments
    const requisitions = await Requisition.find({
      attachments: { $exists: true, $ne: [] },
    })
      .select([
        "requisitionId",
        "requester",
        "amount",
        "status",
        "category",
        "attachments",
        "createdAt",
        "updatedAt",
      ])
      .sort({ updatedAt: -1 })
      .lean();

    const quotationBids: QuotationBid[] = [];
    const supplierCache = new Map<string, { email?: string; phone?: string }>();

    for (const req of requisitions) {
      const reqData = req as any;

      // Each attachment represents a quotation from a supplier
      if (Array.isArray(reqData.attachments)) {
        for (let i = 0; i < reqData.attachments.length; i++) {
          const attachment = reqData.attachments[i];

          // Extract supplier info from filename or metadata
          // Assuming filename format: "SupplierName_quotation.pdf" or similar
          const supplierName =
            attachment.supplierName ||
            attachment.filename?.split("_")?.[0] ||
            "Unknown Supplier";

          // Try to find matching supplier
          let supplierObjectId: string | undefined;
          let contactEmail: string | undefined;
          let contactPhone: string | undefined;

          try {
            const supplier = await Supplier.findOne({
              name: { $regex: new RegExp(`^${supplierName}$`, "i") },
            })
              .select([
                "_id",
                "supplierId",
                "onboarding.email",
                "onboarding.phone",
              ])
              .lean();

            if (supplier) {
              supplierObjectId = String((supplier as any)._id);
              const cached = supplierCache.get(supplierObjectId);

              if (cached) {
                contactEmail = cached.email;
                contactPhone = cached.phone;
              } else {
                contactEmail = (supplier as any)?.onboarding?.email;
                contactPhone = (supplier as any)?.onboarding?.phone;
                supplierCache.set(supplierObjectId, {
                  email: contactEmail,
                  phone: contactPhone,
                });
              }
            }
          } catch (error) {
            console.error("Error fetching supplier:", error);
          }

          const bidKey = `${reqData.requisitionId}:${supplierName}:${i}`;

          quotationBids.push({
            _key: bidKey,
            requisitionId: reqData.requisitionId,
            requisitionObjectId: String(reqData._id),
            requisitionTitle: reqData.title || undefined,
            requester: reqData.requester || "Unknown",
            supplier: supplierName,
            supplierId: attachment.supplierId || supplierObjectId || "",
            supplierObjectId,
            amount: attachment.quotedAmount || reqData.amount || 0,
            status: reqData.status || "Pending",
            category: reqData.category || undefined,
            submittedAt:
              attachment.uploadedAt || reqData.updatedAt || new Date(),
            documents: [
              {
                name: attachment.filename || "Quotation Document",
                url: attachment.url,
                type: attachment.type || "application/pdf",
                size: attachment.size || 0,
              },
            ],
            contactEmail,
            contactPhone,
          });
        }
      }
    }

    console.log(`[getQuotations] Found ${quotationBids.length} quotations`);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(quotationBids)),
    };
  } catch (error) {
    console.error("[getQuotations] Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch quotations",
      data: [],
    };
  }
}

export async function getAllBids(): Promise<{
  success: boolean;
  error?: string;
  data: any[];
}> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    // Check permissions
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const md = (user?.publicMetadata || {}) as any;
    const normalizedRole = String(md.role || "")
      .toLowerCase()
      .replace(/[\s_-]/g, "");
    const allowedRoles = ["admin", "superadmin", "projectlead"];

    if (!allowedRoles.includes(normalizedRole)) {
      return {
        success: false,
        error: "Only Admin, Superadmin, and Project Lead can view bids",
        data: [],
      };
    }

    await connectDB();

    // Import tender actions (you'll need to make this available)
    const { getBidsWithDetails } = await import("./tender-actions");

    // Get tender bids
    const tenderBidsResult = await getBidsWithDetails();
    const tenderBids = tenderBidsResult.success ? tenderBidsResult.data : [];

    // Get quotation bids
    const quotationBidsResult = await getQuotations();
    const quotationBids = quotationBidsResult.success
      ? quotationBidsResult.data
      : [];

    // Combine and normalize
    const allBids = [
      ...tenderBids.map((bid: any) => ({
        ...bid,
        source: "tender",
        type: "Tender Bid",
      })),
      ...quotationBids.map((bid: any) => ({
        ...bid,
        tenderTitle: bid.requisitionTitle || `Requisition ${bid.requisitionId}`,
        tenderId: bid.requisitionId,
        totalPrice: bid.amount,
        stage: bid.status,
        type: "Quotation",
        source: "quotation",
        technicalDocuments: bid.documents,
        technicalDocCount: bid.documents?.length || 0,
        financialDocCount: 0,
      })),
    ];

    console.log(
      `[getAllBids] Combined ${allBids.length} bids (${tenderBids.length} tender + ${quotationBids.length} quotation)`
    );

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allBids)),
    };
  } catch (error) {
    console.error("[getAllBids] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch bids",
      data: [],
    };
  }
}
