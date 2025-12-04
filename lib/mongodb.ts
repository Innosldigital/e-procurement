import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Use global to avoid re-creating connections in Next.js
let cached = global.mongoose as MongooseCache

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      cached.conn = mongoose
      cached.promise = Promise.resolve(mongoose as any)
    } else {
      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
    }
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }

  return cached.conn
}
