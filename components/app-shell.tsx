"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Navigation } from './navigation'
import { Header } from './header'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  if (pathname.startsWith('/onboarding')) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={mobileOpen ? 'block' : 'hidden md:block'}>
        <Navigation mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
