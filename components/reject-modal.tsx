"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface RejectModalProps {
  userType: "company" | "supplier"
  entityId: string
  userName: string
  onReject: (entityId: string, userType: "company" | "supplier", reason: string) => Promise<void>
}

export function RejectModal({ userType, entityId, userName, onReject }: RejectModalProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReject = async () => {
    if (!reason.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onReject(entityId, userType, reason)
      setOpen(false)
      setReason("")
    } catch (error) {
      console.error("Failed to reject:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject User</DialogTitle>
          <DialogDescription>
            Provide a reason for rejecting <span className="font-medium">{userName}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for rejection</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a detailed reason for the rejection..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false)
              setReason("")
            }}
          >
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleReject} disabled={!reason.trim() || isSubmitting}>
            {isSubmitting ? "Rejecting..." : "Reject User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
