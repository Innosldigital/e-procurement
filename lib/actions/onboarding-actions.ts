"use server";

import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Supplier } from "../models/Supplier";

export async function submitSupplierOnboarding(data: {
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  goodsType?: string;
  productCategories?: string[];
  supplyAreas?: string[];
  deliveryTimeline?: string;
  priceListUploads?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  registrationCertificateUploads?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  businessRegistrationCertificateUploads?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  taxClearanceCertificateUploads?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  gstVatRegistrationCertificateUploads?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  businessLicenseUploads?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  nassitCertificateUploads?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  sectorSpecificCertificateUploads?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  paymentMethods?: string[];
  bankDetails?: {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    prefersCash?: boolean;
  };
  vendorPaymentTerms?: string;
  businessLeadGender?: string;
  inBusinessMoreThan3Years?: boolean;
  businessDurationDocuments?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  dateOfIncorporation?: string;
  averageTurnover?: string;
  declarations?: { infoAccurate?: boolean; agreeRules?: boolean };
  category?: string;
  region?: string;
  segment?: string;
}) {
  try {
    console.log("🔍 submitSupplierOnboarding: Starting...");
    console.log("📦 Data received:", { name: data.name, email: data.email });

    const { userId } = await auth();
    if (!userId) {
      console.error("❌ No userId found");
      return { success: false, error: "Unauthorized" };
    }

    console.log("✅ User authenticated:", userId);

    await dbConnect();
    console.log("✅ Database connected");

    const count = await Supplier.countDocuments();
    const supplierId = `SUP-${(count + 5000).toString()}`;
    console.log("✅ Generated supplierId:", supplierId);

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
          data.vendorPaymentTerms || "initial payment for 20%"
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
        priceListUploads: Array.isArray(data.priceListUploads)
          ? data.priceListUploads
          : [],
        registrationCertificateUploads: [
          ...(Array.isArray(data.registrationCertificateUploads)
            ? data.registrationCertificateUploads
            : []),
          ...(Array.isArray((data as any).businessDurationDocuments)
            ? (data as any).businessDurationDocuments
            : []),
        ],
        businessRegistrationCertificateUploads: Array.isArray(
          data.businessRegistrationCertificateUploads
        )
          ? data.businessRegistrationCertificateUploads
          : [],
        taxClearanceCertificateUploads: Array.isArray(
          data.taxClearanceCertificateUploads
        )
          ? data.taxClearanceCertificateUploads
          : [],
        gstVatRegistrationCertificateUploads: Array.isArray(
          data.gstVatRegistrationCertificateUploads
        )
          ? data.gstVatRegistrationCertificateUploads
          : [],
        businessLicenseUploads: Array.isArray(data.businessLicenseUploads)
          ? data.businessLicenseUploads
          : [],
        nassitCertificateUploads: Array.isArray(data.nassitCertificateUploads)
          ? data.nassitCertificateUploads
          : [],
        sectorSpecificCertificateUploads: Array.isArray(
          data.sectorSpecificCertificateUploads
        )
          ? data.sectorSpecificCertificateUploads
          : [],
        paymentMethods: Array.isArray(data.paymentMethods)
          ? data.paymentMethods
          : [],
        bankDetails: {
          bankName: data.bankDetails?.bankName || "",
          accountName: data.bankDetails?.accountName || "",
          accountNumber: data.bankDetails?.accountNumber || "",
          prefersCash: Boolean(data.bankDetails?.prefersCash),
        },
        declarations: {
          infoAccurate: Boolean(data.declarations?.infoAccurate),
          agreeRules: Boolean(data.declarations?.agreeRules),
        },
      },
      performanceScore: 0,
      riskRating: "Low",
      totalSpend: 0,
    };

    console.log("📋 Creating supplier with data:", supplierData);

    const supplier = await Supplier.create(supplierData);
    console.log("✅ Supplier created:", supplier._id);

    // FIXED: Added await for clerkClient()
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
      // Continue even if Clerk update fails
    }

    revalidatePath("/onboarding");
    revalidatePath("/suppliers");

    console.log("✅ Supplier onboarding completed successfully");

    // FIXED: Return the proper data structure
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
