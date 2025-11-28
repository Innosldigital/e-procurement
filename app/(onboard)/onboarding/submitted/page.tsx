"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"

function SubmittedContent() {
  const params = useSearchParams()
  const router = useRouter()
  const type = params.get("type") || "company"
  const title = type === "supplier" ? "Supplier submission received" : "Company submission received"
  const desc =
    type === "supplier"
      ? "Your supplier onboarding details have been submitted. Our admin team will review your information. You will receive an email notification once approved and then gain full access to the system."
      : "Your company onboarding details have been submitted. Our admin team will review your information. You will receive an email notification once approved and then gain full access to the system."
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs">{desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => router.push("/")}>Go to dashboard</Button>
              <Button variant="ghost" onClick={() => router.push("/support")}>Contact support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function OnboardingSubmittedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-4"><Card><CardContent>Loading…</CardContent></Card></div>}>
      <SubmittedContent />
    </Suspense>
  )
}
