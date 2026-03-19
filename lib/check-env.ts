/**
 * Environment variable validation utility
 * Checks if required environment variables are configured
 */

export type EnvStatus = {
  isConfigured: boolean;
  missing: string[];
  configured: string[];
};

export function checkEnvironmentVariables(): EnvStatus {
  const requiredVars = [
    { key: "MONGODB_URI", name: "MongoDB Connection" },
    { key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", name: "Clerk Publishable Key" },
    { key: "CLERK_SECRET_KEY", name: "Clerk Secret Key" },
    { key: "EDGE_STORE_ACCESS_KEY", name: "EdgeStore Access Key" },
    { key: "EDGE_STORE_SECRET_KEY", name: "EdgeStore Secret Key" },
  ];

  const missing: string[] = [];
  const configured: string[] = [];

  for (const { key, name } of requiredVars) {
    const value = process.env[key];
    // Check if variable is set and not a localhost fallback
    if (!value || value.includes("127.0.0.1") || value.includes("localhost")) {
      missing.push(name);
    } else {
      configured.push(name);
    }
  }

  return {
    isConfigured: missing.length === 0,
    missing,
    configured,
  };
}

export function isMongoDBConfigured(): boolean {
  const uri = process.env.MONGODB_URI;
  return !!(uri && !uri.includes("127.0.0.1") && !uri.includes("localhost"));
}

export function isClerkConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY
  );
}

export function isEdgeStoreConfigured(): boolean {
  return !!(
    process.env.EDGE_STORE_ACCESS_KEY && process.env.EDGE_STORE_SECRET_KEY
  );
}
