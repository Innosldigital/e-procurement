"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateTenderForm } from "@/components/create-tender-form"
import { CreateRequisitionForm } from "@/components/create-requisition-form"

export function DashboardClient() {
  const [showTenderForm, setShowTenderForm] = useState(false)
  const [showRequisitionForm, setShowRequisitionForm] = useState(false)

  return (
    <>
      <div className="flex gap-2 md:gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none bg-transparent"
          onClick={() => setShowTenderForm(true)}
        >
          Create tender
        </Button>
        <Button size="sm" className="flex-1 sm:flex-none" onClick={() => setShowRequisitionForm(true)}>
          Create requisition
        </Button>
      </div>

      {showTenderForm && <CreateTenderForm onClose={() => setShowTenderForm(false)} />}

      {showRequisitionForm && <CreateRequisitionForm onClose={() => setShowRequisitionForm(false)} />}
    </>
  )
}

export default DashboardClient
