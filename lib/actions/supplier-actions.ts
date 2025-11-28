'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '@/lib/mongodb'
import { Supplier } from '../models/Supplier'

export async function getSuppliers() {
  try {
    await dbConnect()
    const suppliers = await Supplier.find({ approved: true })
      .sort({ performanceScore: -1 })
      .limit(50)
      .lean()
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(suppliers))
    }
  } catch (error) {
    console.error('[v0] Error fetching suppliers:', error)
    return { success: false, error: 'Failed to fetch suppliers' }
  }
}

export async function getSupplierById(id: string) {
  try {
    await dbConnect()
    const supplier = await Supplier.findById(id).lean()
    
    if (!supplier) {
      return { success: false, error: 'Supplier not found' }
    }
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(supplier))
    }
  } catch (error) {
    console.error('[v0] Error fetching supplier:', error)
    return { success: false, error: 'Failed to fetch supplier' }
  }
}

export async function createSupplier(data: any) {
  try {
    await dbConnect()
    
    const supplier = await Supplier.create(data)
    revalidatePath('/suppliers')
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(supplier))
    }
  } catch (error) {
    console.error('[v0] Error creating supplier:', error)
    return { success: false, error: 'Failed to create supplier' }
  }
}

export async function updateSupplier(id: string, updates: any) {
  try {
    await dbConnect()
    
    const supplier = await Supplier.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).lean()
    
    if (!supplier) {
      return { success: false, error: 'Supplier not found' }
    }
    
    revalidatePath('/suppliers')
    revalidatePath(`/suppliers/${id}`)
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(supplier))
    }
  } catch (error) {
    console.error('[v0] Error updating supplier:', error)
    return { success: false, error: 'Failed to update supplier' }
  }
}

export async function deleteSupplier(id: string) {
  try {
    await dbConnect()
    
    const supplier = await Supplier.findByIdAndDelete(id)
    
    if (!supplier) {
      return { success: false, error: 'Supplier not found' }
    }
    
    revalidatePath('/suppliers')
    
    return { success: true }
  } catch (error) {
    console.error('[v0] Error deleting supplier:', error)
    return { success: false, error: 'Failed to delete supplier' }
  }
}
