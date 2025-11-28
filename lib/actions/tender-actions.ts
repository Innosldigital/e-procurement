'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import dbConnect from '@/lib/mongodb'
import { Tender } from '../models/Tender'


export async function getTenders() {
  try {
    await dbConnect()
    const tenders = await Tender.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(tenders))
    }
  } catch (error) {
    console.error('[v0] Error fetching tenders:', error)
    return { success: false, error: 'Failed to fetch tenders' }
  }
}

export async function getTenderById(id: string) {
  try {
    await dbConnect()
    const tender = await Tender.findById(id).lean()
    
    if (!tender) {
      return { success: false, error: 'Tender not found' }
    }
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(tender))
    }
  } catch (error) {
    console.error('[v0] Error fetching tender:', error)
    return { success: false, error: 'Failed to fetch tender' }
  }
}

export async function awardTender(id: string, supplierId: string) {
  try {
    await dbConnect()
    
    const now = new Date()
    const tender = await Tender.findByIdAndUpdate(
      id,
      { 
        stage: 'Awarded',
        keyDates: { closed: now },
        evaluationSummary: { recommendedSupplier: supplierId },
        status: 'awarded'
      },
      { new: true }
    ).lean()
    
    if (!tender) {
      return { success: false, error: 'Tender not found' }
    }
    
    revalidatePath('/tenders')
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(tender))
    }
  } catch (error) {
    console.error('[v0] Error awarding tender:', error)
    return { success: false, error: 'Failed to award tender' }
  }
}

export async function requestRevisedBids(id: string) {
  try {
    await dbConnect()
    
    const tender = await Tender.findByIdAndUpdate(
      id,
      { 
        status: 'revision_requested'
      },
      { new: true }
    ).lean()
    
    if (!tender) {
      return { success: false, error: 'Tender not found' }
    }
    
    revalidatePath('/tenders')
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(tender))
    }
  } catch (error) {
    console.error('[v0] Error requesting revised bids:', error)
    return { success: false, error: 'Failed to request revised bids' }
  }
}

export async function createTender(data: {
  title: string
  type: string
  category?: string
  businessUnit?: string
  region?: string
  sourcingObjective?: string
  estimatedValue?: number
  contractTerm?: string
  sourcingType?: string
  invitedSuppliers?: number
  closeDate?: Date
}) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    await dbConnect()
    
    // Generate tender ID
    const count = await Tender.countDocuments()
    const tenderId = `RFP-${(count + 2300).toString()}`
    
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
      stage: 'Planned',
      responses: 0,
      owner: userId,
      keyDates: {
        published: new Date(),
      },
      timeline: [{
        event: 'Tender created',
        date: new Date().toISOString(),
        owner: userId,
      }],
    })
    
    revalidatePath('/tenders')
    revalidatePath('/')
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(tender))
    }
  } catch (error) {
    console.error('[v0] Error creating tender:', error)
    return { success: false, error: 'Failed to create tender' }
  }
}
