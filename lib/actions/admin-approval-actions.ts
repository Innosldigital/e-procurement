'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '@/lib/mongodb'
import { Supplier } from '@/lib/models/Supplier'
import { Company } from '@/lib/models/Company'
import { clerkClient } from '@clerk/nextjs/server'
import { Notification } from '@/lib/models/Notification'
import { Resend } from 'resend'

async function sendApprovalEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !to) return
  const resend = new Resend(apiKey)
  try {
    await resend.emails.send({
      from: 'no-reply@eprocurement.local',
      to,
      subject,
      html,
    })
  } catch {}
}

export async function approveSupplierOnboarding(supplierId: string) {
  try {
    await dbConnect()
    const supplierDoc = await Supplier.findOneAndUpdate(
      { supplierId },
      { approved: true },
      { new: true }
    )
    if (!supplierDoc) return { success: false, error: 'Supplier not found' }

    const client = await clerkClient()
    await client.users.updateUser(String(supplierDoc.ownerUserId), {
      publicMetadata: { onboarded: true, onboardingStatus: 'approved' }
    })
    await Notification.create({
      userId: String(supplierDoc.ownerUserId),
      type: 'supplier_update',
      title: 'Your supplier account has been approved',
      message: 'You now have full access to the system.',
      actionUrl: '/suppliers',
      priority: 'medium',
      read: false,
    })
    const user = await client.users.getUser(String(supplierDoc.ownerUserId))
    const email = (user as any)?.emailAddresses?.[0]?.emailAddress || ''
    await sendApprovalEmail(
      email,
      'Supplier account approved',
      `<p>Your supplier account has been approved. You now have full access to the system.</p>`
    )

    revalidatePath('/suppliers')
    return { success: true, data: JSON.parse(JSON.stringify(supplierDoc.toObject())) }
  } catch (e) {
    return { success: false, error: 'Failed to approve supplier onboarding' }
  }
}

export async function approveCompanyOnboarding(companyId: string) {
  try {
    await dbConnect()
    const companyDoc = await Company.findOneAndUpdate(
      { companyId },
      { approved: true },
      { new: true }
    )
    if (!companyDoc) return { success: false, error: 'Company not found' }

    const client = await clerkClient()
    await client.users.updateUser(String(companyDoc.ownerUserId), {
      publicMetadata: { onboarded: true, onboardingStatus: 'approved' }
    })
    await Notification.create({
      userId: String(companyDoc.ownerUserId),
      type: 'supplier_update',
      title: 'Your company has been approved',
      message: 'You now have full access to the system.',
      actionUrl: '/',
      priority: 'medium',
      read: false,
    })
    const user = await client.users.getUser(String(companyDoc.ownerUserId))
    const email = (user as any)?.emailAddresses?.[0]?.emailAddress || ''
    await sendApprovalEmail(
      email,
      'Company onboarding approved',
      `<p>Your company has been approved. You now have full access to the system.</p>`
    )

    revalidatePath('/')
    return { success: true, data: JSON.parse(JSON.stringify(companyDoc.toObject())) }
  } catch (e) {
    return { success: false, error: 'Failed to approve company onboarding' }
  }
}

export async function getPendingCompanies() {
  try {
    await dbConnect()
    const companies = await Company.find({ approved: false }).sort({ createdAt: -1 }).lean()
    return { success: true, data: JSON.parse(JSON.stringify(companies)) }
  } catch (e) {
    return { success: false, error: 'Failed to fetch pending companies' }
  }
}

export async function getPendingSuppliers() {
  try {
    await dbConnect()
    const suppliers = await Supplier.find({ approved: false }).sort({ createdAt: -1 }).lean()
    return { success: true, data: JSON.parse(JSON.stringify(suppliers)) }
  } catch (e) {
    return { success: false, error: 'Failed to fetch pending suppliers' }
  }
}

export async function getAllCompanies() {
  try {
    await dbConnect()
    const companies = await Company.find({}).sort({ createdAt: -1 }).lean()
    return { success: true, data: JSON.parse(JSON.stringify(companies)) }
  } catch (e) {
    return { success: false, error: 'Failed to fetch companies' }
  }
}

export async function getAllSuppliers() {
  try {
    await dbConnect()
    const suppliers = await Supplier.find({}).sort({ createdAt: -1 }).lean()
    return { success: true, data: JSON.parse(JSON.stringify(suppliers)) }
  } catch (e) {
    return { success: false, error: 'Failed to fetch suppliers' }
  }
}
