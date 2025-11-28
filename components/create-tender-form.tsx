'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-react'
import { createTender } from '@/lib/actions/tender-actions'

interface CreateTenderFormProps {
  onClose: () => void
}

export function CreateTenderForm({ onClose }: CreateTenderFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'RFP',
    category: '',
    businessUnit: '',
    region: '',
    sourcingObjective: '',
    estimatedValue: '',
    contractTerm: '',
    sourcingType: '',
    invitedSuppliers: '',
    closeDate: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createTender({
        ...formData,
        estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : 0,
        invitedSuppliers: formData.invitedSuppliers ? parseInt(formData.invitedSuppliers) : 0,
        closeDate: formData.closeDate ? new Date(formData.closeDate) : undefined,
      })

      if (result.success) {
        router.refresh()
        onClose()
      } else {
        alert(result.error || 'Failed to create tender')
      }
    } catch (error) {
      console.error('[v0] Error creating tender:', error)
      alert('Failed to create tender')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border rounded-lg shadow-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold">Create new tender</h2>
            <p className="text-sm text-muted-foreground">Plan and publish a sourcing event</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Basic information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Tender title *</Label>
              <Input
                id="title"
                placeholder="e.g., Global marketing automation platform"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tender type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RFP">RFP - Request for Proposal</SelectItem>
                    <SelectItem value="RFQ">RFQ - Request for Quotation</SelectItem>
                    <SelectItem value="RFI">RFI - Request for Information</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing & Strategy">Marketing & Strategy</SelectItem>
                    <SelectItem value="IT & Software">IT & Software</SelectItem>
                    <SelectItem value="Facilities & Office">Facilities & Office</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Professional Services">Professional Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sourcing Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Sourcing details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessUnit">Business unit</Label>
                <Input
                  id="businessUnit"
                  placeholder="e.g., Global Marketing"
                  value={formData.businessUnit}
                  onChange={(e) => handleChange('businessUnit', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={formData.region} onValueChange={(value) => handleChange('region', value)}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Global">Global</SelectItem>
                    <SelectItem value="APAC">APAC</SelectItem>
                    <SelectItem value="EMEA">EMEA</SelectItem>
                    <SelectItem value="NA">North America</SelectItem>
                    <SelectItem value="LATAM">LATAM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourcingObjective">Sourcing objective</Label>
              <Textarea
                id="sourcingObjective"
                placeholder="Describe the purpose and goals of this tender..."
                value={formData.sourcingObjective}
                onChange={(e) => handleChange('sourcingObjective', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Estimated contract value ($)</Label>
                <Input
                  id="estimatedValue"
                  type="number"
                  placeholder="450000"
                  value={formData.estimatedValue}
                  onChange={(e) => handleChange('estimatedValue', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractTerm">Contract term</Label>
                <Input
                  id="contractTerm"
                  placeholder="e.g., 3-year term"
                  value={formData.contractTerm}
                  onChange={(e) => handleChange('contractTerm', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Supplier Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Supplier selection</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sourcingType">Sourcing type</Label>
                <Select value={formData.sourcingType} onValueChange={(value) => handleChange('sourcingType', value)}>
                  <SelectTrigger id="sourcingType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Competitive RFP">Competitive RFP - 5 invited suppliers</SelectItem>
                    <SelectItem value="Competitive RFQ">Competitive RFQ - 3 invited suppliers</SelectItem>
                    <SelectItem value="Open">Open tender</SelectItem>
                    <SelectItem value="Negotiated">Negotiated tender</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invitedSuppliers">Number of invited suppliers</Label>
                <Input
                  id="invitedSuppliers"
                  type="number"
                  placeholder="5"
                  value={formData.invitedSuppliers}
                  onChange={(e) => handleChange('invitedSuppliers', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="closeDate">Tender close date</Label>
              <Input
                id="closeDate"
                type="date"
                value={formData.closeDate}
                onChange={(e) => handleChange('closeDate', e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create tender'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
