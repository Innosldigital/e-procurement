"use client"

import { useState, useEffect } from "react"
import { Search, Settings, Menu } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { SettingsModal } from "./settings-modal"
import { useRouter, usePathname } from "next/navigation"
import { getRequisitions } from "@/lib/actions/requisition-actions"
import { getPurchaseOrders } from "@/lib/actions/purchase-order-actions"
import { getSuppliers } from "@/lib/actions/supplier-actions"
import { getInvoices } from "@/lib/actions/invoice-actions"
import { getApprovals } from "@/lib/actions/approval-actions"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useUser()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  useEffect(() => {
    const onboarded = (user?.publicMetadata as any)?.onboarded === true
    if (user && !onboarded && pathname !== "/onboarding") {
      router.push("/onboarding")
    }
  }, [user, pathname, router])

  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setResults([])
      setShowResults(false)
      return
    }
    setShowResults(true)
    setLoadingSearch(true)
    setSearchError(null)
    const handle = setTimeout(async () => {
      const [reqs, pos, sups, invs, appr] = await Promise.all([
        getRequisitions().catch(() => ({ success: false, data: [] })),
        getPurchaseOrders().catch(() => ({ success: false, data: [] })),
        getSuppliers().catch(() => ({ success: false, data: [] })),
        getInvoices().catch(() => ({ success: false, data: [] })),
        getApprovals().catch(() => ({ success: false, data: [] })),
      ])
      const rq = (reqs.success ? reqs.data : []).map((r: any) => ({
        id: r.requisitionId,
        title: r.requisitionId,
        sub: `${r.requester} • ${r.branch}`,
        href: "/requisitions",
        type: "Requisition",
      }))
      const po = (pos.success ? pos.data : []).map((p: any) => ({
        id: p.poNumber,
        title: p.poNumber,
        sub: p.supplier,
        href: "/purchase-orders",
        type: "PO",
      }))
      const sp = (sups.success ? sups.data : []).map((s: any) => ({
        id: s.supplierId || s._id,
        title: s.name,
        sub: s.segment || "Supplier",
        href: "/suppliers",
        type: "Supplier",
      }))
      const iv = (invs.success ? invs.data : []).map((i: any) => ({
        id: i.invoiceNumber,
        title: i.invoiceNumber,
        sub: i.supplier,
        href: "/invoices",
        type: "Invoice",
      }))
      const ap = (appr.success ? appr.data : []).map((a: any) => ({
        id: a.approvalId,
        title: a.approvalId,
        sub: `${a.type} • ${a.requester}`,
        href: "/approvals",
        type: "Approval",
      }))
      const all = [...rq, ...po, ...sp, ...iv, ...ap]
      const qq = q.toLowerCase()
      const filtered = all
        .filter(
          (x) =>
            (x.title || "").toLowerCase().includes(qq) ||
            (x.sub || "").toLowerCase().includes(qq) ||
            (x.id || "").toLowerCase().includes(qq)
        )
        .slice(0, 8)
      setResults(filtered)
      setLoadingSearch(false)
      if (!reqs.success && !pos.success && !sups.success && !invs.success && !appr.success) {
        setSearchError("Failed to fetch search data")
      }
    }, 250)
    return () => clearTimeout(handle)
  }, [query])

  return (
    <>
      <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
        <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -ml-2 hover:bg-accent"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">EP</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search requisitions, POs, suppliers..."
                className="pl-9 bg-muted/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-md z-50">
                  <div className="p-2 text-xs text-muted-foreground">
                    {loadingSearch
                      ? "Searching..."
                      : searchError
                      ? searchError
                      : results.length === 0
                      ? "No matches"
                      : `${results.length} result(s)`}
                  </div>
                  {results.length > 0 && (
                    <div className="max-h-60 overflow-y-auto divide-y">
                      {results.map((r, i) => (
                        <button
                          key={r.type + r.id + i}
                          className="w-full text-left p-3 hover:bg-accent"
                          onClick={() => {
                            setShowResults(false)
                            setQuery("")
                            router.push(r.href)
                          }}
                        >
                          <div className="text-sm font-medium">
                            {r.type}: {r.title}
                          </div>
                          <div className="text-xs text-muted-foreground">{r.sub}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <Badge variant="secondary" className="hidden sm:flex bg-primary/10 text-primary hover:bg-primary/20">
              Role: Procurement Manager
            </Badge>

            <NotificationsDropdown />

            <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setSettingsOpen(true)}>
              <Settings className="w-4 h-4" />
            </Button>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </header>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}
