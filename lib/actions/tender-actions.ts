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

// export async function createTender(data: {
//   title: string;
//   type: string;
//   category?: string;
//   businessUnit?: string;
//   region?: string;
//   sourcingObjective?: string;
//   estimatedValue?: number;
//   contractTerm?: string;
//   sourcingType?: string;
//   invitedSuppliers?: number;
//   closeDate?: Date;
//   tenderDocuments?: {
//     name: string;
//     size: number;
//     type: string;
//     url: string;
//   }[];
// }) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return { success: false, error: "Unauthorized" };
//     }

//     await dbConnect();

//     // Generate tender ID
//     const count = await Tender.countDocuments();
//     const tenderId = `RFP-${(count + 2300).toString()}`;

//     const tender = await Tender.create({
//       tenderId,
//       title: data.title,
//       type: data.type,
//       category: data.category,
//       businessUnit: data.businessUnit,
//       region: data.region,
//       sourcingObjective: data.sourcingObjective,
//       estimatedValue: data.estimatedValue,
//       contractTerm: data.contractTerm,
//       sourcingType: data.sourcingType,
//       invitedSuppliers: data.invitedSuppliers,
//       closeDate: data.closeDate,
//       tenderDocuments: Array.isArray(data.tenderDocuments)
//         ? data.tenderDocuments.map((d) => ({
//             name: d.name,
//             size: d.size,
//             type: d.type,
//             url: d.url,
//           }))
//         : [],
//       stage: "Planned",
//       responses: 0,
//       owner: userId,
//       keyDates: {
//         published: new Date(),
//       },
//       timeline: [
//         {
//           event: "Tender created",
//           date: new Date().toISOString(),
//           owner: userId,
//         },
//       ],
//     });

//     const suppliers = await Supplier.find({ approved: true })
//       .select(["ownerUserId", "name", "onboarding.email"])
//       .lean();

//     const apiKey = process.env.RESEND_API_KEY;
//     const resend = apiKey ? new Resend(apiKey) : null;

//     await Promise.all(
//       (suppliers || []).map(async (s: any) => {
//         const userId = String(s.ownerUserId || "");
//         if (userId) {
//           await createNotification({
//             userId,
//             type: "tender_published",
//             title: "New tender published",
//             message: `${tender.title} (${tender.tenderId}) has been published`,
//             actionUrl: `/tenders/${tender._id}`,
//             priority: "medium",
//             metadata: {
//               tenderId: tender.tenderId,
//               category: tender.category,
//               region: tender.region,
//             },
//           });
//         }
//         const to = String(s?.onboarding?.email || "");
//         if (to && resend) {
//           try {
//             await resend.emails.send({
//               from: "no-reply@eprocurement.local",
//               to,
//               subject: `New Tender: ${tender.title}`,
//               html:
//                 `<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">` +
//                 `<p>Hello ${s.name || "Supplier"},</p>` +
//                 `<p>A new tender has been published:</p>` +
//                 `<p><strong>${tender.title}</strong> (${tender.tenderId})</p>` +
//                 `<p>Category: ${tender.category || ""} · Region: ${
//                   tender.region || ""
//                 }</p>` +
//                 `<p>Close date: ${
//                   tender.closeDate
//                     ? new Date(tender.closeDate).toLocaleDateString()
//                     : "TBD"
//                 }</p>` +
//                 `<p><a href="${
//                   process.env.NEXT_PUBLIC_APP_URL || ""
//                 }/tenders">View tenders</a></p>` +
//                 `</div>`,
//             });
//           } catch {}
//         }
//       })
//     );

//     revalidatePath("/tenders");
//     revalidatePath("/");

//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(tender)),
//     };
//   } catch (error) {
//     console.error("[v0] Error creating tender:", error);
//     return { success: false, error: "Failed to create tender" };
//   }
// }
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

    // Send notifications and emails to all approved suppliers
    // const notificationPromises = suppliers.map(async (s: any) => {
    //   try {
    //     const supplierUserId = String(s.ownerUserId || "");
    //     const supplierEmail = String(s?.onboarding?.email || "");
    //     const supplierName = String(s.name || "Supplier");

    //     // Create in-app notification
    //     if (supplierUserId) {
    //       console.log(
    //         `[createTender] Creating notification for user: ${supplierUserId}`
    //       );

    //       await createNotification({
    //         userId: supplierUserId,
    //         type: "tender_published",
    //         title: "New Tender Published",
    //         message: `${tender.title} (${
    //           tender.tenderId
    //         }) has been published. Category: ${tender.category || "General"}`,
    //         actionUrl: `/tenders`,
    //         priority: "medium",
    //         metadata: {
    //           tenderId: tender.tenderId,
    //           tenderTitle: tender.title,
    //           category: tender.category,
    //           region: tender.region,
    //           closeDate: tender.closeDate,
    //           estimatedValue: tender.estimatedValue,
    //         },
    //       });

    //       console.log(
    //         `[createTender] ✅ Notification created for ${supplierName}`
    //       );
    //     }

    //     // Send email notification
    //     if (supplierEmail && resend) {
    //       console.log(`[createTender] Sending email to: ${supplierEmail}`);

    //       const emailResult = await resend.emails.send({
    //         from:
    //           process.env.RESEND_FROM_EMAIL ||
    //           "InnoSL Procurement <no-reply@eprocurement.local>",
    //         to: supplierEmail,
    //         subject: `New Tender Published: ${tender.title}`,
    //         html: `
    //           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
    //             <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    //               <h2 style="color: #1f2937; margin-top: 0;">New Tender Opportunity</h2>

    //               <p style="color: #4b5563; font-size: 16px;">Hello ${supplierName},</p>

    //               <p style="color: #4b5563; font-size: 16px;">
    //                 A new tender has been published that may be of interest to you:
    //               </p>

    //               <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
    //                 <h3 style="color: #1f2937; margin-top: 0; font-size: 18px;">
    //                   ${tender.title}
    //                 </h3>
    //                 <p style="color: #6b7280; margin: 5px 0;">
    //                   <strong>Tender ID:</strong> ${tender.tenderId}
    //                 </p>
    //                 <p style="color: #6b7280; margin: 5px 0;">
    //                   <strong>Type:</strong> ${tender.type}
    //                 </p>
    //                 ${
    //                   tender.category
    //                     ? `<p style="color: #6b7280; margin: 5px 0;">
    //                   <strong>Category:</strong> ${tender.category}
    //                 </p>`
    //                     : ""
    //                 }
    //                 ${
    //                   tender.region
    //                     ? `<p style="color: #6b7280; margin: 5px 0;">
    //                   <strong>Region:</strong> ${tender.region}
    //                 </p>`
    //                     : ""
    //                 }
    //                 ${
    //                   tender.estimatedValue
    //                     ? `<p style="color: #6b7280; margin: 5px 0;">
    //                   <strong>Estimated Value:</strong> $${tender.estimatedValue.toLocaleString()}
    //                 </p>`
    //                     : ""
    //                 }
    //                 ${
    //                   tender.closeDate
    //                     ? `<p style="color: #dc2626; margin: 5px 0; font-weight: bold;">
    //                   <strong>Close Date:</strong> ${new Date(
    //                     tender.closeDate
    //                   ).toLocaleDateString("en-US", {
    //                     weekday: "long",
    //                     year: "numeric",
    //                     month: "long",
    //                     day: "numeric",
    //                   })}
    //                 </p>`
    //                     : ""
    //                 }
    //               </div>

    //               ${
    //                 tender.sourcingObjective
    //                   ? `<div style="margin: 20px 0;">
    //                 <h4 style="color: #1f2937; font-size: 14px; margin-bottom: 8px;">Sourcing Objective:</h4>
    //                 <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
    //                   ${tender.sourcingObjective}
    //                 </p>
    //               </div>`
    //                   : ""
    //               }

    //               <div style="margin-top: 30px; text-align: center;">
    //                 <a href="${process.env.NEXT_PUBLIC_APP_URL || ""}/tenders"
    //                    style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
    //                   View Tender & Submit Bid
    //                 </a>
    //               </div>

    //               <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
    //                 <p style="color: #9ca3af; font-size: 12px; margin: 0;">
    //                   This is an automated notification from InnoSL Procurement System.
    //                   Please log in to your account to submit your bid and view full tender details.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         `,
    //       });

    //       console.log(
    //         `[createTender] ✅ Email sent to ${supplierName}:`,
    //         emailResult.data?.id
    //       );
    //     }
    //   } catch (error) {
    //     console.error(
    //       `[createTender] ❌ Error notifying supplier ${s.name}:`,
    //       error
    //     );
    //     // Continue with other suppliers even if one fails
    //   }
    // });

    // Wait for all notifications to be sent
    // await Promise.allSettled(notificationPromises);
    // In tender-actions.ts, replace the notification creation section:

    const notificationPromises = suppliers.map(async (s: any) => {
      try {
        const supplierUserId = String(s.ownerUserId || "");
        const supplierEmail = String(s?.onboarding?.email || "");
        const supplierName = String(s.name || "Supplier");

        // Create in-app notification
        if (supplierUserId) {
          console.log(
            `[createTender] 🔔 Creating notification for: ${supplierName} (${supplierUserId})`
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
              `[createTender] ✅ Notification created for ${supplierName}:`,
              notifResult.data?._id
            );
          } else {
            console.error(
              `[createTender] ❌ Notification FAILED for ${supplierName}:`,
              notifResult.error
            );
          }
        } else {
          console.warn(`[createTender] ⚠️ No userId for ${supplierName}`);
        }

        // Send email notification
        if (supplierEmail && resend) {
          console.log(`[createTender] 📧 Sending email to: ${supplierEmail}`);

          const emailResult = await resend.emails.send({
            from:
              process.env.RESEND_FROM_EMAIL ||
              "InnoSL Procurement <onboarding@innoslprocurement.com>",
            to: supplierEmail,
            subject: `New Tender Published: ${tender.title}`,
            html: `...`, // your existing HTML
          });

          console.log(
            `[createTender] ✅ Email sent to ${supplierName}:`,
            emailResult.data?.id
          );
        }
      } catch (error) {
        console.error(
          `[createTender] ❌ Error notifying supplier ${s.name}:`,
          error
        );
      }
    });

    await Promise.allSettled(notificationPromises);

    console.log(
      `[createTender] ✅ Notifications sent to ${suppliers.length} suppliers`
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
