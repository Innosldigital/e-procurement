"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Package,
  ShoppingCart,
  Building2,
  Receipt,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/requisitions", icon: FileText, label: "Requisitions" },
  { href: "/approvals", icon: CheckSquare, label: "Approvals" },
  { href: "/tenders", icon: Package, label: "Tenders" },
  { href: "/purchase-orders", icon: ShoppingCart, label: "Purchase Orders" },
  { href: "/suppliers", icon: Building2, label: "Suppliers" },
  { href: "/invoices", icon: Receipt, label: "Invoices" },
  { href: "/reports", icon: BarChart3, label: "Reports" },
  { href: "/admin", icon: Settings, label: "Admin" },
];

interface NavigationProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export function Navigation({
  mobileOpen = false,
  setMobileOpen,
}: NavigationProps) {
  const pathname = usePathname();
  const [localMobileOpen, setLocalMobileOpen] = useState(false);
  const { user } = useUser();
  const role =
    String((user?.publicMetadata as any)?.role || "")
      .toLowerCase()
      .replace(/[\s_-]/g, "") || "";
  const items = navItems.filter((n) => {
    if (n.href === "/admin") return role === "admin" || role === "superadmin";
    if (n.href === "/reports") return role !== "supplier";
    if (n.href === "/tenders") return role !== "supplier";
    if (n.href === "/approvals") return role !== "supplier";
    return true;
  });

  const isOpen = setMobileOpen ? mobileOpen : localMobileOpen;
  const handleToggle = setMobileOpen || setLocalMobileOpen;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => handleToggle(false)}
        />
      )}

      <nav
        className={cn(
          "w-64 bg-background border-r border-border h-screen fixed md:sticky top-0 z-50 transition-all duration-300 ease-out shadow-xl md:shadow-none",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border md:border-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
              <img
                src="/apple-icon.png"
                alt="Inno-SL Procurement"
                className="w-6 h-6"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight">
                Inno-SL Procurement
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Suite
              </span>
            </div>
          </div>

          <button
            onClick={() => handleToggle(false)}
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground px-3 mb-3 uppercase tracking-wider">
              Navigation
            </p>
            {items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleToggle(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <p className="font-medium">Version 1.0.0</p>
            <p className="mt-1">© 2025 Inno-SL Procurement</p>
          </div>
        </div>
      </nav>
    </>
  );
}
