import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | Inno-SL Procurement",
  description: "Complete your onboarding to unlock all features",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/apple-icon.png"
              alt="Inno-SL Procurement"
              className="w-8 h-8"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-semibold">
                Inno-SL Procurement
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                Onboarding
              </span>
            </div>
          </div>
          <div className="hidden sm:block text-sm text-muted-foreground">
            Need help?{" "}
            <a
              href="/onboarding/support"
              className="text-primary hover:underline"
            >
              Contact support
            </a>
          </div>
        </div>
      </header>
      <main className="relative z-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]">
        <div className="mx-auto w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>
      <footer className="relative z-10 py-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 text-sm text-center text-muted-foreground">
          <p>© 2025 Inno-SL Procurement. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
