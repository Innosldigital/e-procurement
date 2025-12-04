"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import { Supplier } from "../models/Supplier";

export async function getSuppliers() {
  try {
    await dbConnect();
    const suppliers = await Supplier.find({ approved: true })
      .sort({ performanceScore: -1 })
      .limit(50)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(suppliers)),
    };
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return { success: false, error: "Failed to fetch suppliers" };
  }
}

export async function getSupplierById(id: string) {
  try {
    await dbConnect();
    const supplier = await Supplier.findById(id).lean();

    if (!supplier) {
      return { success: false, error: "Supplier not found" };
    }
    console.log("getSupplierById:", supplier);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(supplier)),
    };
  } catch (error) {
    console.error("Error fetching supplier:", error);
    return { success: false, error: "Failed to fetch supplier" };
  }
}

export async function getSupplierOnboardingByUserId(userId: string) {
  try {
    await dbConnect();
    const supplier = await Supplier.findOne({ ownerUserId: userId }).lean();
    if (!supplier) {
      return { success: false, error: "Supplier not found for user" };
    }
    const data = {
      supplierId: (supplier as any).supplierId,
      name: (supplier as any).name,
      approved: (supplier as any).approved === true,
      onboarding: (supplier as any).onboarding || {},
    };
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error fetching supplier onboarding:", error);
    return { success: false, error: "Failed to fetch supplier onboarding" };
  }
}

export async function getAllSupplierOnboardings() {
  try {
    await dbConnect();
    const suppliers = await Supplier.find(
      {},
      {
        supplierId: 1,
        name: 1,
        approved: 1,
        ownerUserId: 1,
        onboarding: 1,
      }
    )
      .sort({ createdAt: -1 })
      .lean();

    const data = (suppliers || []).map((s: any) => ({
      supplierId: s?.supplierId,
      name: s?.name,
      approved: s?.approved === true,
      ownerUserId: s?.ownerUserId,
      onboarding: s?.onboarding || {},
    }));

    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error fetching all vendor onboarding:", error);
    return { success: false, error: "Failed to fetch vendor onboarding data" };
  }
}

export async function createSupplier(data: any) {
  try {
    await dbConnect();

    const supplier = await Supplier.create(data);
    revalidatePath("/suppliers");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(supplier)),
    };
  } catch (error) {
    console.error("Error creating supplier:", error);
    return { success: false, error: "Failed to create supplier" };
  }
}

export async function updateSupplier(id: string, updates: any) {
  try {
    await dbConnect();

    const supplier = await Supplier.findByIdAndUpdate(id, updates, {
      new: true,
    }).lean();

    if (!supplier) {
      return { success: false, error: "Supplier not found" };
    }

    revalidatePath("/suppliers");
    revalidatePath(`/suppliers/${id}`);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(supplier)),
    };
  } catch (error) {
    console.error("Error updating supplier:", error);
    return { success: false, error: "Failed to update supplier" };
  }
}

export async function deleteSupplier(id: string) {
  try {
    await dbConnect();

    const supplier = await Supplier.findByIdAndDelete(id);

    if (!supplier) {
      return { success: false, error: "Supplier not found" };
    }

    revalidatePath("/suppliers");

    return { success: true };
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return { success: false, error: "Failed to delete supplier" };
  }
}
