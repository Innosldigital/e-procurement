import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Database, Key, Cloud, Mail, Globe } from "lucide-react";

type EnvStatus = {
  isConfigured: boolean;
  missing: string[];
  configured: string[];
};

const envVarDetails = [
  {
    name: "MongoDB Connection",
    key: "MONGODB_URI",
    description: "MongoDB Atlas connection string",
    icon: Database,
    link: "https://www.mongodb.com/atlas",
    linkText: "Get from MongoDB Atlas",
  },
  {
    name: "Clerk Publishable Key",
    key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    description: "Public key for Clerk authentication",
    icon: Key,
    link: "https://clerk.com",
    linkText: "Get from Clerk Dashboard",
  },
  {
    name: "Clerk Secret Key",
    key: "CLERK_SECRET_KEY",
    description: "Secret key for Clerk authentication",
    icon: Key,
    link: "https://clerk.com",
    linkText: "Get from Clerk Dashboard",
  },
  {
    name: "EdgeStore Access Key",
    key: "EDGE_STORE_ACCESS_KEY",
    description: "Access key for file storage",
    icon: Cloud,
    link: "https://edgestore.dev",
    linkText: "Get from EdgeStore Dashboard",
  },
  {
    name: "EdgeStore Secret Key",
    key: "EDGE_STORE_SECRET_KEY",
    description: "Secret key for file storage",
    icon: Cloud,
    link: "https://edgestore.dev",
    linkText: "Get from EdgeStore Dashboard",
  },
];

const optionalVars = [
  {
    name: "Resend API Key",
    key: "RESEND_API_KEY",
    description: "API key for email notifications",
    icon: Mail,
    link: "https://resend.com",
    linkText: "Get from Resend Dashboard",
  },
  {
    name: "App URL",
    key: "NEXT_PUBLIC_APP_URL",
    description: "Public URL of your application",
    icon: Globe,
    linkText: "e.g., https://your-app.vercel.app",
  },
];

export function SetupRequired({ envStatus }: { envStatus: EnvStatus }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/20 mb-4">
            <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            E-Procurement Setup Required
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Configure your environment variables to get started with the
            multi-tenant E-Procurement system.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Required Configuration</CardTitle>
            <CardDescription>
              Add these environment variables in the Settings menu (top right) under the Vars tab.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {envVarDetails.map((item) => {
              const isConfigured = envStatus.configured.includes(item.name);
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="flex items-start gap-4 p-3 rounded-lg border bg-card"
                >
                  <div
                    className={`p-2 rounded-md ${
                      isConfigured
                        ? "bg-green-100 dark:bg-green-900/20"
                        : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isConfigured
                          ? "text-green-600 dark:text-green-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{item.name}</span>
                      {isConfigured ? (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Configured
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Missing</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.description}
                    </p>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                      {item.key}
                    </code>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-primary hover:underline mt-1"
                      >
                        {item.linkText}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Optional Configuration</CardTitle>
            <CardDescription>
              These are recommended but not required to start.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {optionalVars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="flex items-start gap-4 p-3 rounded-lg border bg-card"
                >
                  <div className="p-2 rounded-md bg-muted">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{item.name}</span>
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.description}
                    </p>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                      {item.key}
                    </code>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-primary hover:underline mt-1"
                      >
                        {item.linkText}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            After adding environment variables, refresh the page to continue setup.
          </p>
        </div>
      </div>
    </div>
  );
}
