"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Tender } from "../models/Tender";
import { Supplier } from "../models/Supplier";
import { createNotification } from "@/lib/actions/notification-actions";
import { Resend } from "resend";

export async function getTenders() {
  try {
    await dbConnect();
    const tenders = await Tender.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tenders)),
    };
  } catch (error) {
    console.error("[v0] Error fetching tenders:", error);
    return { success: false, error: "Failed to fetch tenders" };
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
        evaluationSummary: { recommendedSupplier: supplierId, recommendedSupplierId: supplierId },
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

    await dbConnect();

    // Generate tender ID
    const count = await Tender.countDocuments();
    const tenderId = `RFP-${(count + 2300).toString()}`;

    const tender = await Tender.create({
      tenderId,
      title: data.title,
      type: data.type,
      category: data.category,
      businessUnit: data.businessUnit,
      region: data.region,
      sourcingObjective: data.sourcingObjective,
      estimatedValue: data.estimatedValue,
      contractTerm: data.contractTerm,
      sourcingType: data.sourcingType,
      invitedSuppliers: data.invitedSuppliers,
      closeDate: data.closeDate,
      tenderDocuments: Array.isArray(data.tenderDocuments)
        ? data.tenderDocuments.map((d) => ({
            name: d.name,
            size: d.size,
            type: d.type,
            url: d.url,
          }))
        : [],
      stage: "Planned",
      responses: 0,
      owner: userId,
      keyDates: {
        published: new Date(),
      },
      timeline: [
        {
          event: "Tender created",
          date: new Date().toISOString(),
          owner: userId,
        },
      ],
    });

    const suppliers = await Supplier.find({ approved: true })
      .select(["ownerUserId", "name", "onboarding.email"])
      .lean();

    const apiKey = process.env.RESEND_API_KEY;
    const resend = apiKey ? new Resend(apiKey) : null;

    await Promise.all(
      (suppliers || []).map(async (s: any) => {
        const userId = String(s.ownerUserId || "");
        if (userId) {
          await createNotification({
            userId,
            type: "tender_published",
            title: "New tender published",
            message: `${tender.title} (${tender.tenderId}) has been published`,
            actionUrl: `/tenders/${tender._id}`,
            priority: "medium",
            metadata: {
              tenderId: tender.tenderId,
              category: tender.category,
              region: tender.region,
            },
          });
        }
        const to = String(s?.onboarding?.email || "");
        if (to && resend) {
          try {
            await resend.emails.send({
              from: "no-reply@eprocurement.local",
              to,
              subject: `New Tender: ${tender.title}`,
              html:
                `<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">` +
                `<p>Hello ${s.name || "Supplier"},</p>` +
                `<p>A new tender has been published:</p>` +
                `<p><strong>${tender.title}</strong> (${tender.tenderId})</p>` +
                `<p>Category: ${tender.category || ""} · Region: ${
                  tender.region || ""
                }</p>` +
                `<p>Close date: ${
                  tender.closeDate
                    ? new Date(tender.closeDate).toLocaleDateString()
                    : "TBD"
                }</p>` +
                `<p><a href="${
                  process.env.NEXT_PUBLIC_APP_URL || ""
                }/tenders">View tenders</a></p>` +
                `</div>`,
            });
          } catch {}
        }
      })
    );

    revalidatePath("/tenders");
    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tender)),
    };
  } catch (error) {
    console.error("[v0] Error creating tender:", error);
    return { success: false, error: "Failed to create tender" };
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
    console.error("[v0] Error fetching tender templates:", error);
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

export async function getTenderStats() {
  try {
    await dbConnect();
    const [openCount, evalCount] = await Promise.all([
      Tender.countDocuments({ stage: "Open" }),
      Tender.countDocuments({ stage: "Evaluation" }),
    ]);
    const agg = await Tender.aggregate([
      {
        $project: {
          bidsCount: {
            $size: { $ifNull: ["$bids", []] },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalBids: { $sum: "$bidsCount" },
          tenders: { $sum: 1 },
        },
      },
    ]);
    const totalBids = agg[0]?.totalBids || 0;
    const tenders = agg[0]?.tenders || 0;
    const avgBids = tenders > 0 ? totalBids / tenders : 0;
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
    return { success: false, error: "Failed to fetch tender stats" };
  }
}

export async function submitBid(
  id: string,
  data: {
    supplierName: string;
    contactEmail: string;
    contactPhone: string;
    totalPrice: string;
    deliveryTimeline: string;
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
