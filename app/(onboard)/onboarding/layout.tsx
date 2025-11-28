import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | E-Procurement Suite",
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
        <div className="px-4 sm:px-8 py-4 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary font-semibold">EP</div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">E-Procurement Suite</span>
              <span className="text-xs text-muted-foreground">Onboarding</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Need help? <a href="/support" className="text-primary hover:underline">Contact support</a>
          </div>
        </div>
      </header>
      <main className="relative z-10 min-h-[calc(100vh-80px)]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-8 py-8">{children}</div>
      </main>
      <footer className="relative z-10 py-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="px-4 sm:px-8 mx-auto text-sm text-center text-muted-foreground">
          <p>© 2025 E-Procurement Suite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
