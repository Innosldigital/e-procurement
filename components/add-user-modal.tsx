"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

interface AddUserModalProps {
  action: (formData: FormData) => Promise<void>
}

export function AddUserModal({ action }: AddUserModalProps) {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<string>("admin")
  const [submitting, setSubmitting] = useState(false)

  const handleAction = async (formData: FormData) => {
    setSubmitting(true)
    try {
      await action(formData)
      setOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <form action={handleAction} className="grid gap-4 py-2">
          <div className="grid gap-2">
            <label className="text-sm">Email</label>
            <Input name="email" type="email" placeholder="user@example.com" required />
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm">First name</label>
              <Input name="firstName" placeholder="First name" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Last name</label>
              <Input name="lastName" placeholder="Last name" />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Role</label>
            <Select value={role} onValueChange={(v) => setRole(v)} name="role">
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="procurement_manager">Procurement Manager</SelectItem>
              <SelectItem value="supplier">Supplier</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="role" value={role} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Create & Invite"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
