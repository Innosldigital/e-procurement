"use client";

import type React from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reversed =
    (pathname || "").includes("sign-out") ||
    (pathname || "").includes("signout");

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {reversed ? (
        <>
          <div className="hidden bg-gray-100 dark:bg-gray-800 md:block">
            <div className="relative w-full h-full">
              <Image
                src="/public/Innosl-Procurement.png"
                alt="Login background"
                fill
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
                priority
                quality={85}
              />
            </div>
          </div>
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 md:px-8 lg:px-10">
            {children}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 md:px-8 lg:px-10">
            {children}
          </div>
          <div className="hidden bg-gray-100 dark:bg-gray-800 md:block">
            <div className="relative w-full h-full">
              <Image
                src="/images/startupslbg.webp"
                alt="Login background"
                fill
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="/images/startupslbg-blur.webp"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
