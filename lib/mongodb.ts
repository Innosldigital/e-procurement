import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend global type - ONLY ONCE
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize cached with proper type handling
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Check if MongoDB is properly configured
 */
export function isMongoDBConfigured(): boolean {
  const uri = MONGODB_URI;
  return !!(uri && !uri.includes("127.0.0.1") && !uri.includes("localhost"));
}

export default async function connectDB() {
  // Check if MongoDB URI is configured
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI environment variable is not set");
    throw new Error("Database not configured. Please set MONGODB_URI environment variable.");
  }

  // Check if using localhost (not allowed in production/preview)
  if (MONGODB_URI.includes("127.0.0.1") || MONGODB_URI.includes("localhost")) {
    console.warn("MONGODB_URI is pointing to localhost. Please configure a remote MongoDB instance.");
    throw new Error("Database not configured. Please set a valid MONGODB_URI (not localhost).");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 45000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      retryReads: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("Failed to establish MongoDB connection:", err);
    throw err;
  }

  return cached.conn;
}
