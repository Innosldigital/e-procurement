import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
// import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Innovation SL Procurement | Secure E-Procurement Platform",
  description:
    "Transform procurement with transparency. Unified platform for tenders, supplier onboarding, approvals, and contracts for Innovation SL and partners.",
  generator: "v0.app",
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
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
