"use server";

import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Supplier } from "../models/Supplier";

// Type definition for upload objects from API
type UploadObject = {
  name: string;
  size: number;
  type: string;
  url: string;
};

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
        // Handle null/undefined
        if (!input) {
          return [];
        }

        // Already an array
        if (Array.isArray(input)) {
          return input
            .filter((item) => {
              // If item is an object with url property
              if (item && typeof item === "object" && item.url) {
                return true;
              }
              // If item is already a string (URL)
              if (typeof item === "string" && item.trim()) {
                return true;
              }
              return false;
            })
            .map((item) => {
              // Extract URL from object or return string as-is
              if (typeof item === "object" && item.url) {
                return String(item.url).trim();
              }
              return String(item).trim();
            });
        }

        // If it's a string, it might be JSON - try parsing
        if (typeof input === "string" && input.trim()) {
          try {
            const parsed = JSON.parse(input);
            if (Array.isArray(parsed)) {
              return extractUrls(parsed);
            }
          } catch {
            // Not valid JSON, check if it's a single URL
            if (input.startsWith("http")) {
              return [input.trim()];
            }
            return [];
          }
        }

        // Unknown type
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
      data.businessDurationDocuments
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
    console.log("Sample URLs:", {
      businessReg: businessRegistrationCertificateUploads[0] || "none",
      gstVat: gstVatRegistrationCertificateUploads[0] || "none",
    });

    const supplier = await Supplier.create(supplierData);
    console.log("✅ Supplier created:", supplier._id);

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
      console.log("Clerk user metadata updated");
    } catch (clerkError) {
      console.error("❌ Clerk update failed:", clerkError);
    }

    revalidatePath("/onboarding");
    revalidatePath("/suppliers");
    revalidatePath(`/onboarding/supplier/${supplier._id}`);

    console.log("Supplier onboarding completed successfully");

    return {
      success: true,
      data: {
        _id: supplier._id.toString(),
        id: supplier._id.toString(),
        supplierId: supplier.supplierId,
        name: supplier.name,
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
