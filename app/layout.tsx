import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ClientClerkProvider } from "@/components/client-clerk-provider";
import { AppShell } from "@/components/app-shell";
import "./globals.css";
import { ConditionalEdgeStoreProvider } from "@/components/conditional-edgestore-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "E-Procurement System",
  description: "Multi-tenant enterprise procurement management platform",
  icons: {
    icon: [
      {
        url: "/apple-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/apple-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/apple-icon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} font-sans antialiased overflow-x-hidden`}
        >
          <ConditionalEdgeStoreProvider>
            <AppShell>{children}</AppShell>
          </ConditionalEdgeStoreProvider>
          <Analytics />
        </body>
      </html>
    </ClientClerkProvider>
  );
}
