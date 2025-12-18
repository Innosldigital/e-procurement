"use server";

import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Supplier } from "../models/Supplier";
import { Resend } from "resend";

// Type definition for upload objects from API
type UploadObject = {
  name: string;
  size: number;
  type: string;
  url: string;
};

// export async function submitSupplierOnboarding(data: any) {
//   try {
//     console.log("submitSupplierOnboarding: Starting...");

//     const { userId } = await auth();
//     if (!userId) {
//       console.error("❌ No userId found");
//       return { success: false, error: "Unauthorized" };
//     }

//     console.log("User authenticated:", userId);

//     await dbConnect();
//     console.log("Database connected");

//     const count = await Supplier.countDocuments();
//     const supplierId = `SUP-${(count + 5000).toString()}`;
//     console.log("Generated supplierId:", supplierId);

//     // Extract URLs from upload objects - Mongoose schema expects array of strings (URLs)
//     function extractUrls(input: any): string[] {
//       try {
//         // Handle null/undefined
//         if (!input) {
//           return [];
//         }

//         // Already an array
//         if (Array.isArray(input)) {
//           return input
//             .filter((item) => {
//               // If item is an object with url property
//               if (item && typeof item === "object" && item.url) {
//                 return true;
//               }
//               // If item is already a string (URL)
//               if (typeof item === "string" && item.trim()) {
//                 return true;
//               }
//               return false;
//             })
//             .map((item) => {
//               // Extract URL from object or return string as-is
//               if (typeof item === "object" && item.url) {
//                 return String(item.url).trim();
//               }
//               return String(item).trim();
//             });
//         }

//         // If it's a string, it might be JSON - try parsing
//         if (typeof input === "string" && input.trim()) {
//           try {
//             const parsed = JSON.parse(input);
//             if (Array.isArray(parsed)) {
//               return extractUrls(parsed);
//             }
//           } catch {
//             // Not valid JSON, check if it's a single URL
//             if (input.startsWith("http")) {
//               return [input.trim()];
//             }
//             return [];
//           }
//         }

//         // Unknown type
//         return [];
//       } catch (e) {
//         console.error("Error extracting URLs:", e);
//         return [];
//       }
//     }

//     // Process all upload fields - extract URLs only
//     const businessRegistrationCertificateUploads = extractUrls(
//       data.businessRegistrationCertificateUploads
//     );
//     const taxClearanceCertificateUploads = extractUrls(
//       data.taxClearanceCertificateUploads
//     );
//     const gstVatRegistrationCertificateUploads = extractUrls(
//       data.gstVatRegistrationCertificateUploads
//     );
//     const businessLicenseUploads = extractUrls(data.businessLicenseUploads);
//     const nassitCertificateUploads = extractUrls(data.nassitCertificateUploads);
//     const sectorSpecificCertificateUploads = extractUrls(
//       data.sectorSpecificCertificateUploads
//     );
//     const businessDurationDocuments = extractUrls(
//       data.businessDurationDocuments
//     );

//     // Combine all registration certificates
//     const registrationCertUploads = [
//       ...businessRegistrationCertificateUploads,
//       ...taxClearanceCertificateUploads,
//       ...gstVatRegistrationCertificateUploads,
//       ...businessLicenseUploads,
//       ...nassitCertificateUploads,
//       ...sectorSpecificCertificateUploads,
//     ];

//     const supplierData = {
//       supplierId,
//       name: data.name,
//       approved: false,
//       ownerUserId: userId,
//       category: data.category || "General",
//       region: data.region || "Global",
//       segment: data.segment || "Standard",
//       commercialTerms: {
//         paymentTerms: (
//           data.vendorPaymentTerms || "Payment for 20% upfront"
//         ).trim(),
//         diversityStatus: "",
//       },
//       onboarding: {
//         contactPerson: data.contactPerson || "",
//         phone: data.phone || "",
//         email: data.email || "",
//         goodsType: data.goodsType || "",
//         productCategories: Array.isArray(data.productCategories)
//           ? data.productCategories
//           : [],
//         supplyAreas: Array.isArray(data.supplyAreas) ? data.supplyAreas : [],
//         deliveryTimeline: data.deliveryTimeline || "",
//         priceListUploads: extractUrls(data.priceListUploads),
//         registrationCertificateUploads: registrationCertUploads,
//         businessRegistrationCertificateUploads,
//         taxClearanceCertificateUploads,
//         gstVatRegistrationCertificateUploads,
//         businessLicenseUploads,
//         nassitCertificateUploads,
//         sectorSpecificCertificateUploads,
//         businessDurationDocuments,
//         paymentMethods: Array.isArray(data.paymentMethods)
//           ? data.paymentMethods
//           : [],
//         bankDetails: {
//           bankName: data.bankDetails?.bankName || "",
//           accountName: data.bankDetails?.accountName || "",
//           accountNumber: data.bankDetails?.accountNumber || "",
//           prefersCash: Boolean(data.bankDetails?.prefersCash),
//         },
//         businessLeadGender: data.businessLeadGender || "",
//         inBusinessMoreThan3Years: Boolean(data.inBusinessMoreThan3Years),
//         dateOfIncorporation: data.dateOfIncorporation || "",
//         averageTurnover: data.averageTurnover || "",
//         vendorPaymentTerms: data.vendorPaymentTerms || "",
//         declarations: {
//           infoAccurate: Boolean(data.declarations?.infoAccurate),
//           agreeRules: Boolean(data.declarations?.agreeRules),
//         },
//       },
//       performanceScore: 0,
//       riskRating: "Low",
//       totalSpend: 0,
//     };

//     console.log("📋 Creating supplier...");
//     console.log("Upload counts:", {
//       businessReg: businessRegistrationCertificateUploads.length,
//       taxClearance: taxClearanceCertificateUploads.length,
//       gstVat: gstVatRegistrationCertificateUploads.length,
//       businessLicense: businessLicenseUploads.length,
//       nassit: nassitCertificateUploads.length,
//       sectorCert: sectorSpecificCertificateUploads.length,
//       businessDuration: businessDurationDocuments.length,
//       totalRegistration: registrationCertUploads.length,
//     });
//     console.log("Sample URLs:", {
//       businessReg: businessRegistrationCertificateUploads[0] || "none",
//       gstVat: gstVatRegistrationCertificateUploads[0] || "none",
//     });

//     const supplier = await Supplier.create(supplierData);
//     console.log("✅ Supplier created:", supplier._id);

//     const client = await clerkClient();

//     try {
//       await client.users.updateUser(userId, {
//         publicMetadata: {
//           role: "supplier",
//           supplierId,
//           onboardingStatus: "pending_admin_approval",
//           onboarded: true,
//         },
//       });
//       console.log("Clerk user metadata updated");
//     } catch (clerkError) {
//       console.error("❌ Clerk update failed:", clerkError);
//     }

//     revalidatePath("/onboarding");
//     revalidatePath("/suppliers");
//     revalidatePath(`/onboarding/supplier/${supplier._id}`);

//     console.log("Supplier onboarding completed successfully");

//     return {
//       success: true,
//       data: {
//         _id: supplier._id.toString(),
//         id: supplier._id.toString(),
//         supplierId: supplier.supplierId,
//         name: supplier.name,
//       },
//     };
//   } catch (error) {
//     console.error("❌ submitSupplierOnboarding error:", error);
//     return {
//       success: false,
//       error:
//         error instanceof Error
//           ? error.message
//           : "Failed to submit supplier onboarding",
//     };
//   }
// }

// Email template for supplier confirmation
// Replace your existing submitSupplierOnboarding function in onboarding-actions.ts with this updated version

export async function submitSupplierOnboarding(data: any) {
  try {
    console.log("submitSupplierOnboarding: Starting...");

    const { userId } = await auth();
    if (!userId) {
      console.error("❌ No userId found");
      return { success: false, error: "Unauthorized" };
    }

    console.log("User authenticated:", userId);

    await dbConnect();
    console.log("Database connected");

    const count = await Supplier.countDocuments();
    const supplierId = `SUP-${(count + 5000).toString()}`;
    console.log("Generated supplierId:", supplierId);

    // Extract URLs from upload objects - Mongoose schema expects array of strings (URLs)
    function extractUrls(input: any): string[] {
      try {
        if (!input) {
          return [];
        }

        if (Array.isArray(input)) {
          return input
            .filter((item) => {
              if (item && typeof item === "object" && item.url) {
                return true;
              }
              if (typeof item === "string" && item.trim()) {
                return true;
              }
              return false;
            })
            .map((item) => {
              if (typeof item === "object" && item.url) {
                return String(item.url).trim();
              }
              return String(item).trim();
            });
        }

        if (typeof input === "string" && input.trim()) {
          try {
            const parsed = JSON.parse(input);
            if (Array.isArray(parsed)) {
              return extractUrls(parsed);
            }
          } catch {
            if (input.startsWith("http")) {
              return [input.trim()];
            }
            return [];
          }
        }

        return [];
      } catch (e) {
        console.error("Error extracting URLs:", e);
        return [];
      }
    }

    // Process all upload fields - extract URLs only
    const businessRegistrationCertificateUploads = extractUrls(
      data.businessRegistrationCertificateUploads
    );
    const taxClearanceCertificateUploads = extractUrls(
      data.taxClearanceCertificateUploads
    );
    const gstVatRegistrationCertificateUploads = extractUrls(
      data.gstVatRegistrationCertificateUploads
    );
    const businessLicenseUploads = extractUrls(data.businessLicenseUploads);
    const nassitCertificateUploads = extractUrls(data.nassitCertificateUploads);
    const sectorSpecificCertificateUploads = extractUrls(
      data.sectorSpecificCertificateUploads
    );
    const businessDurationDocuments = extractUrls(
      data.businessDurationDocumentsUploads
    );

    // Combine all registration certificates
    const registrationCertUploads = [
      ...businessRegistrationCertificateUploads,
      ...taxClearanceCertificateUploads,
      ...gstVatRegistrationCertificateUploads,
      ...businessLicenseUploads,
      ...nassitCertificateUploads,
      ...sectorSpecificCertificateUploads,
    ];

    const supplierData = {
      supplierId,
      name: data.name,
      approved: false,
      ownerUserId: userId,
      category: data.category || "General",
      region: data.region || "Global",
      segment: data.segment || "Standard",
      commercialTerms: {
        paymentTerms: (
          data.vendorPaymentTerms || "Payment for 20% upfront"
        ).trim(),
        diversityStatus: "",
      },
      onboarding: {
        contactPerson: data.contactPerson || "",
        phone: data.phone || "",
        email: data.email || "",
        goodsType: data.goodsType || "",
        productCategories: Array.isArray(data.productCategories)
          ? data.productCategories
          : [],
        supplyAreas: Array.isArray(data.supplyAreas) ? data.supplyAreas : [],
        deliveryTimeline: data.deliveryTimeline || "",
        priceListUploads: extractUrls(data.priceListUploads),
        registrationCertificateUploads: registrationCertUploads,
        businessRegistrationCertificateUploads,
        taxClearanceCertificateUploads,
        gstVatRegistrationCertificateUploads,
        businessLicenseUploads,
        nassitCertificateUploads,
        sectorSpecificCertificateUploads,
        businessDurationDocuments,
        paymentMethods: Array.isArray(data.paymentMethods)
          ? data.paymentMethods
          : [],
        bankDetails: {
          bankName: data.bankDetails?.bankName || "",
          accountName: data.bankDetails?.accountName || "",
          accountNumber: data.bankDetails?.accountNumber || "",
          prefersCash: Boolean(data.bankDetails?.prefersCash),
        },
        businessLeadGender: data.businessLeadGender || "",
        inBusinessMoreThan3Years: Boolean(data.inBusinessMoreThan3Years),
        dateOfIncorporation: data.dateOfIncorporation || "",
        averageTurnover: data.averageTurnover || "",
        vendorPaymentTerms: data.vendorPaymentTerms || "",
        declarations: {
          infoAccurate: Boolean(data.declarations?.infoAccurate),
          agreeRules: Boolean(data.declarations?.agreeRules),
        },
      },
      performanceScore: 0,
      riskRating: "Low",
      totalSpend: 0,
    };

    console.log("📋 Creating supplier...");
    console.log("Upload counts:", {
      businessReg: businessRegistrationCertificateUploads.length,
      taxClearance: taxClearanceCertificateUploads.length,
      gstVat: gstVatRegistrationCertificateUploads.length,
      businessLicense: businessLicenseUploads.length,
      nassit: nassitCertificateUploads.length,
      sectorCert: sectorSpecificCertificateUploads.length,
      businessDuration: businessDurationDocuments.length,
      totalRegistration: registrationCertUploads.length,
    });

    const supplier = await Supplier.create(supplierData);
    console.log("✅ Supplier created:", supplier._id);

    // Update Clerk user metadata
    const client = await clerkClient();
    try {
      await client.users.updateUser(userId, {
        publicMetadata: {
          role: "supplier",
          supplierId,
          onboardingStatus: "pending_admin_approval",
          onboarded: true,
        },
      });
      console.log("✅ Clerk user metadata updated");
    } catch (clerkError) {
      console.error("❌ Clerk update failed:", clerkError);
    }

    // ==================== SEND EMAILS ====================
    console.log("📧 Sending email notifications...");

    // Send confirmation email to supplier
    const supplierEmailResult = await sendSupplierConfirmationEmail(
      data.email,
      data.name,
      data.contactPerson
    );

    if (supplierEmailResult.success) {
      console.log("✅ Supplier confirmation email sent successfully");
    } else {
      console.warn(
        "⚠️ Failed to send supplier confirmation email:",
        supplierEmailResult.error
      );
    }

    // Send notification emails to all admins
    const adminEmailResult = await sendAdminNotificationEmails(
      data.name,
      data.contactPerson,
      data.email,
      data.category || "General",
      data.region || "Global",
      supplierId
    );

    if (adminEmailResult.success) {
      console.log(
        `✅ Admin notifications sent to ${adminEmailResult.sent} admin(s)`
      );
    } else {
      console.warn("⚠️ Failed to send admin notifications");
    }

    // Log email sending summary
    const emailSummary = [];
    if (supplierEmailResult.success) {
      emailSummary.push("Confirmation email sent to supplier");
    }
    if (adminEmailResult.success) {
      emailSummary.push(`${adminEmailResult.sent} admin(s) notified`);
    }

    console.log(
      `📧 Email Summary: ${emailSummary.join(", ") || "No emails sent"}`
    );
    // ======================================================

    // Revalidate paths
    revalidatePath("/onboarding");
    revalidatePath("/suppliers");
    revalidatePath(`/onboarding/supplier/${supplier._id}`);
    revalidatePath("/admin/users");

    console.log("✅ Supplier onboarding completed successfully");

    return {
      success: true,
      data: {
        _id: supplier._id.toString(),
        id: supplier._id.toString(),
        supplierId: supplier.supplierId,
        name: supplier.name,
      },
      emailStatus: {
        supplierEmailSent: supplierEmailResult.success,
        adminEmailsSent: adminEmailResult.sent,
        adminEmailsFailed: adminEmailResult.failed,
      },
    };
  } catch (error) {
    console.error("❌ submitSupplierOnboarding error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to submit supplier onboarding",
    };
  }
}

function renderSupplierConfirmationEmail(
  supplierName: string,
  contactPerson: string
) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Application Submitted Successfully</title>
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
              <div style="font-size:20px;font-weight:600;margin-bottom:16px;color:#111827">
                Application Received! 🎉
              </div>
              <div style="font-size:14px;line-height:1.6;color:#374151">
                <p>Hello ${contactPerson},</p>
                <p>Thank you for submitting your supplier application for <strong>${supplierName}</strong>.</p>
                
                <div style="background:#f3f4f6;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #2563eb">
                  <p style="margin:0;font-weight:600;color:#111827;margin-bottom:8px">What happens next?</p>
                  <ol style="margin:0;padding-left:20px">
                    <li style="margin-bottom:8px">Our admin team will review your application and documents</li>
                    <li style="margin-bottom:8px">We'll verify all submitted information</li>
                    <li style="margin-bottom:8px">You'll receive an email notification once your application is approved</li>
                  </ol>
                </div>

                <p><strong>Review Timeline:</strong> Applications are typically reviewed within 2-3 business days.</p>
                
                <p style="background:#fef3c7;padding:12px;border-radius:6px;border-left:4px solid #f59e0b;margin:20px 0">
                  <strong>⏳ Please note:</strong> You won't be able to access all features until your account is approved by our admin team.
                </p>

                <p>If you have any questions or need to update your application, please contact our support team.</p>

                <p style="margin-top:24px">
                  Best regards,<br>
                  <strong>E-Procurement Suite Team</strong>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px;background:#f9fafb;border-top:1px solid #e5e7eb">
              <p style="margin:0;font-size:12px;color:#6b7280;text-align:center">
                © ${new Date().getFullYear()} E‑Procurement Suite. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Email template for admin notification
function renderAdminNotificationEmail(
  supplierName: string,
  contactPerson: string,
  email: string,
  category: string,
  region: string,
  supplierId: string,
  adminName: string
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Supplier Application Pending Approval</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f8;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827">
  <table role="presentation" style="width:100%;border-collapse:collapse">
    <tr>
      <td align="center" style="padding:24px">
        <table role="presentation" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
          <tr>
            <td style="padding:20px 24px;background:#111827;color:#ffffff;font-weight:700;font-size:18px">
              E‑Procurement Suite - Admin Notification
            </td>
          </tr>
          <tr>
            <td style="padding:24px">
              <div style="background:#dbeafe;padding:16px;border-radius:8px;border-left:4px solid #2563eb;margin-bottom:20px">
                <div style="font-size:18px;font-weight:600;color:#1e40af;margin-bottom:4px">
                  🔔 New Supplier Application
                </div>
                <div style="font-size:14px;color:#1e3a8a">
                  Action Required: Review and Approve
                </div>
              </div>

              <div style="font-size:14px;line-height:1.6;color:#374151">
                <p>Hello ${adminName},</p>
                <p>A new supplier has completed their onboarding application and is awaiting approval.</p>
                
                <div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb">
                  <h3 style="margin:0 0 16px 0;color:#111827;font-size:16px">Supplier Details</h3>
                  
                  <table style="width:100%;border-collapse:collapse">
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-weight:600;width:40%">Supplier ID:</td>
                      <td style="padding:8px 0;color:#111827">${supplierId}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-weight:600">Company Name:</td>
                      <td style="padding:8px 0;color:#111827;font-weight:600">${supplierName}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-weight:600">Contact Person:</td>
                      <td style="padding:8px 0;color:#111827">${contactPerson}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-weight:600">Email:</td>
                      <td style="padding:8px 0;color:#111827">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-weight:600">Category:</td>
                      <td style="padding:8px 0;color:#111827">${
                        category || "Not specified"
                      }</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-weight:600">Region:</td>
                      <td style="padding:8px 0;color:#111827">${
                        region || "Not specified"
                      }</td>
                    </tr>
                  </table>
                </div>

                <div style="text-align:center;margin:30px 0">
                  <a href="${appUrl}/admin/users" 
                     style="display:inline-block;padding:14px 32px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
                    Review Application →
                  </a>
                </div>

                <div style="background:#fef3c7;padding:16px;border-radius:8px;border-left:4px solid #f59e0b;margin:20px 0">
                  <p style="margin:0;font-weight:600;color:#92400e;margin-bottom:8px">⚠️ Action Required</p>
                  <p style="margin:0;color:#92400e;font-size:13px">
                    Please review this application promptly. The supplier is waiting for approval to access the platform.
                  </p>
                </div>

                <p style="margin-top:24px;font-size:13px;color:#6b7280">
                  This is an automated notification. To manage your notification preferences, visit your admin settings.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px;background:#f9fafb;border-top:1px solid #e5e7eb">
              <p style="margin:0;font-size:12px;color:#6b7280;text-align:center">
                © ${new Date().getFullYear()} E‑Procurement Suite. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Function to send supplier confirmation email
export async function sendSupplierConfirmationEmail(
  supplierEmail: string,
  supplierName: string,
  contactPerson: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured - skipping email send");
    return { success: false, error: "Email service not configured" };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "E-Procurement Suite <no-reply@yourdomain.com>",
      replyTo: process.env.RESEND_REPLY_TO_EMAIL,
      to: supplierEmail,
      subject: "Application Received - Pending Admin Approval",
      html: renderSupplierConfirmationEmail(supplierName, contactPerson),
    });

    console.log(`✅ Confirmation email sent to supplier: ${supplierEmail}`);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Failed to send supplier confirmation email:", error);
    return {
      success: false,
      error: error?.message || "Failed to send confirmation email",
    };
  }
}

// Function to get all admin and superadmin users
async function getAdminUsers(): Promise<
  Array<{ email: string; firstName: string; lastName: string }>
> {
  try {
    const client = await clerkClient();
    const allUsers = await client.users.getUserList({ limit: 500 });

    const adminUsers = allUsers.data
      .filter((user: any) => {
        const role = String(
          (user.publicMetadata as any)?.role || ""
        ).toLowerCase();
        return (
          role === "admin" || role === "superadmin" || role === "super admin"
        );
      })
      .map((user: any) => ({
        email: user.emailAddresses?.[0]?.emailAddress || "",
        firstName: String(user.firstName || "Admin"),
        lastName: String(user.lastName || "User"),
      }))
      .filter((u) => u.email);

    return adminUsers;
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return [];
  }
}

// Function to send admin notification emails
export async function sendAdminNotificationEmails(
  supplierName: string,
  contactPerson: string,
  email: string,
  category: string,
  region: string,
  supplierId: string
): Promise<{ success: boolean; sent: number; failed: number }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured - skipping email send");
    return { success: false, sent: 0, failed: 0 };
  }

  const resend = new Resend(apiKey);
  const adminUsers = await getAdminUsers();

  if (adminUsers.length === 0) {
    console.warn("No admin users found to notify");
    return { success: false, sent: 0, failed: 0 };
  }

  let sent = 0;
  let failed = 0;

  // Send emails to all admins
  const emailPromises = adminUsers.map(async (admin) => {
    try {
      await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          "E-Procurement Suite <no-reply@yourdomain.com>",
        replyTo: process.env.RESEND_REPLY_TO_EMAIL,
        to: admin.email,
        subject: `New Supplier Application: ${supplierName}`,
        html: renderAdminNotificationEmail(
          supplierName,
          contactPerson,
          email,
          category,
          region,
          supplierId,
          `${admin.firstName} ${admin.lastName}`.trim()
        ),
      });

      console.log(`✅ Admin notification sent to: ${admin.email}`);
      sent++;
    } catch (error: any) {
      console.error(
        `❌ Failed to send admin notification to ${admin.email}:`,
        error
      );
      failed++;
    }
  });

  await Promise.allSettled(emailPromises);

  return {
    success: sent > 0,
    sent,
    failed,
  };
}

// Main function to call when supplier submits onboarding
export async function handleSupplierOnboardingSubmission(
  supplierEmail: string,
  supplierName: string,
  contactPerson: string,
  category: string,
  region: string,
  supplierId: string
): Promise<{ success: boolean; message: string }> {
  // Send confirmation email to supplier
  const supplierEmailResult = await sendSupplierConfirmationEmail(
    supplierEmail,
    supplierName,
    contactPerson
  );

  // Send notification emails to all admins
  const adminEmailResult = await sendAdminNotificationEmails(
    supplierName,
    contactPerson,
    supplierEmail,
    category,
    region,
    supplierId
  );

  if (supplierEmailResult.success && adminEmailResult.success) {
    return {
      success: true,
      message: `Confirmation email sent to supplier. ${adminEmailResult.sent} admin(s) notified.`,
    };
  } else if (supplierEmailResult.success) {
    return {
      success: true,
      message: `Confirmation email sent to supplier. Warning: Only ${adminEmailResult.sent} admin(s) notified.`,
    };
  } else if (adminEmailResult.success) {
    return {
      success: true,
      message: `${adminEmailResult.sent} admin(s) notified. Warning: Supplier confirmation email failed.`,
    };
  } else {
    return {
      success: false,
      message: "Failed to send notification emails. Please contact support.",
    };
  }
}
