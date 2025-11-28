"use client"

import { useState, useTransition } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createPurchaseOrder } from '@/lib/actions/purchase-order-actions'

interface CreatePurchaseOrderFormProps {
  onClose: () => void
  onCreated?: () => void
}

interface LineItem {
  id: string
  description: string
  qty: number
  unitPrice: number
  total: number
}

export function CreatePurchaseOrderForm({ onClose, onCreated }: CreatePurchaseOrderFormProps) {
  const [isPending, startTransition] = useTransition()
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', qty: 1, unitPrice: 0, total: 0 }
  ])

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      qty: 1,
      unitPrice: 0,
      total: 0
    }
    setLineItems([...lineItems, newItem])
  }

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id))
    }
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        if (field === 'qty' || field === 'unitPrice') {
          updated.total = (Number(updated.qty) || 0) * (Number(updated.unitPrice) || 0)
        }
        return updated
      }
      return item
    }))
  }

  const totalAmount = lineItems.reduce((sum, item) => sum + (Number(item.total) || 0), 0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const supplier = String(fd.get('supplier') || '')
    const requester = String(fd.get('requester') || '')
    const department = String(fd.get('department') || '')
    const linkedRequisition = String(fd.get('linkedRequisition') || '')
    const currency = String(fd.get('currency') || 'USD')
    const purpose = String(fd.get('purpose') || '')
    const paymentTerms = String(fd.get('paymentTerms') || '')
    const requestedDeliveryStr = String(fd.get('requestedDelivery') || '')
    const requestedDelivery = requestedDeliveryStr ? new Date(requestedDeliveryStr) : undefined

    startTransition(async () => {
      const result = await createPurchaseOrder({
        supplier,
        requester,
        department,
        linkedRequisition,
        currency,
        purpose,
        paymentTerms,
        requestedDelivery,
        lineItems: lineItems.map(i => ({ description: i.description, qty: i.qty, unitPrice: i.unitPrice }))
      })

      if ((result as any).success) {
        if (onCreated) onCreated()
        onClose()
      } else {
        alert((result as any).error || 'Failed to create purchase order')
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Create Purchase Order</h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Issue a new purchase order to a supplier
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Input id="supplier" name="supplier" required placeholder="Enter supplier name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requester">Requester</Label>
                  <Input id="requester" name="requester" placeholder="Requester name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" placeholder="Department" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedRequisition">Linked Requisition</Label>
                  <Input id="linkedRequisition" name="linkedRequisition" placeholder="REQ-xxxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select name="currency" defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestedDelivery">Requested Delivery</Label>
                  <Input id="requestedDelivery" name="requestedDelivery" type="date" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Commercial terms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Textarea id="purpose" name="purpose" rows={3} placeholder="Describe the purpose of this PO" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment terms</Label>
                  <Input id="paymentTerms" name="paymentTerms" placeholder="e.g., Net 30" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Line items</h3>
                <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-3">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-3 items-start p-3 md:p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
                      <div className="col-span-1 sm:col-span-2 lg:col-span-3 space-y-2">
                        <Label className="text-xs">Description</Label>
                        <Input
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateLineItem(item.id, 'qty', Number(e.target.value))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Unit Price ($)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Total</Label>
                        <Input value={item.total} readOnly />
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeLineItem(item.id)} aria-label="Remove item">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="font-semibold">${totalAmount.toLocaleString()}</div>
            </div>
          </div>

          <div className="p-4 md:p-6 border-t flex items-center justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? 'Issuing...' : 'Issue PO'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

