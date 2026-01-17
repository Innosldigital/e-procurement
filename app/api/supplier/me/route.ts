// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import dbConnect from "@/lib/mongodb";
// import { Supplier } from "@/lib/models/Supplier";

// export async function GET() {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await dbConnect();
//     const supplier = await Supplier.findOne({ ownerUserId: userId }).lean();

//     const client = await clerkClient();
//     const user = await client.users.getUser(userId);
//     const email = user.emailAddresses?.[0]?.emailAddress || "";
//     const phone = user.phoneNumbers?.[0]?.phoneNumber || "";
//     const name = `${String(user.firstName || "").trim()} ${String(
//       user.lastName || ""
//     ).trim()}`.trim();

//     const data = {
//       supplierName: String((supplier as any)?.name || name || ""),
//       contactEmail: String((supplier as any)?.onboarding?.email || email || ""),
//       contactPhone: String((supplier as any)?.onboarding?.phone || phone || ""),
//       productCategories: Array.isArray((supplier as any)?.onboarding?.productCategories)
//         ? ((supplier as any)?.onboarding?.productCategories as string[])
//         : [],
//     };

//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (e: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         error: e?.message || "Failed to fetch supplier details",
//       },
//       { status: 500 }
//     );
//   }
// }

import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { Supplier } from "@/lib/models/Supplier";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const supplier = await Supplier.findOne({ ownerUserId: userId })
      .select([
        "supplierId",
        "name",
        "onboarding.productCategories",
        "onboarding.email",
        "onboarding.phone",
        "approved",
      ])
      .lean();

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    // Normalize categories for client
    const productCategories = Array.isArray(
      (supplier as any)?.onboarding?.productCategories
    )
      ? (supplier as any).onboarding.productCategories.map((cat: string) =>
          String(cat || "")
            .toLowerCase()
            .trim()
        )
      : [];

    console.log("📧 [API /supplier/me] Returning data:", {
      supplierId: (supplier as any).supplierId,
      name: (supplier as any).name,
      productCategories,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...supplier,
        onboarding: {
          ...(supplier as any).onboarding,
          productCategories,
        },
      },
    });
  } catch (error) {
    console.error("❌ [API /supplier/me] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch supplier data" },
      { status: 500 }
    );
  }
}
