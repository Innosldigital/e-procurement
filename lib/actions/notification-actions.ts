'use server'

import { auth } from '@clerk/nextjs/server'
import dbConnect from '@/lib/mongodb'
import { Notification } from '../models/Notification'
import { revalidatePath } from 'next/cache'

export async function getNotifications(limit = 20) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('Unauthorized')
    }

    await dbConnect()
    
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notifications))
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

export async function getNotificationsPublic(limit = 20) {
  try {
    await dbConnect()
    const notifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notifications))
    }
  } catch (error: any) {
    return {
      success: false,
      error: 'Failed to fetch notifications'
    }
  }
}

export async function getUnreadCount() {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('Unauthorized')
    }

    await dbConnect()
    
    const count = await Notification.countDocuments({ 
      userId, 
      read: false 
    })

    return {
      success: true,
      count
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      count: 0
    }
  }
}

export async function markAsRead(notificationId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('Unauthorized')
    }

    await dbConnect()
    
    await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { read: true }
    )

    revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

export async function markAllAsRead() {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('Unauthorized')
    }

    await dbConnect()
    
    await Notification.updateMany(
      { userId, read: false },
      { read: true }
    )

    revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('Unauthorized')
    }

    await dbConnect()
    
    await Notification.findOneAndDelete({ 
      _id: notificationId, 
      userId 
    })

    revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

export async function createNotification(data: {
  userId: string
  type: string
  title: string
  message: string
  actionUrl?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  metadata?: any
  expiresAt?: Date
}) {
  try {
    await dbConnect()
    
    const notification = await Notification.create(data)

    return {
      success: true,
      data: JSON.parse(JSON.stringify(notification))
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}
