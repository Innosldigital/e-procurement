'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, FileText, Image, File as FileIcon, Paperclip } from "lucide-react"


interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
}

interface AttachedFile extends File {
  id: string;
  preview?: string;
}

interface CreateRequisitionFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateRequisitionForm({ onClose, onSuccess }: CreateRequisitionFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unit: 'Unit', unitCost: 0 }
  ])

  const [formData, setFormData] = useState({
    title: '',
    requester: '',
    branch: '',
    category: '',
    neededBy: '',
    costCenter: '',
    notes: ''
  })

  const totalAmount = useMemo(() => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0)
  }, [lineItems])

  const addLineItem = useCallback(() => {
    setLineItems(prev => [
      ...prev,
      { id: Date.now().toString(), description: '', quantity: 1, unit: 'Unit', unitCost: 0 }
    ])
  }, [])

  const removeLineItem = useCallback((id: string) => {
    setLineItems(prev => prev.length > 1 ? prev.filter(item => item.id !== id) : prev)
  }, [])

  const updateLineItem = useCallback(<K extends keyof LineItem>(
    id: string,
    field: K,
    value: LineItem[K]
  ) => {
    setLineItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }, [])

  // File handling
  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newFiles: AttachedFile[] = Array.from(files).map(file => ({
      ...file,
      id: `${Date.now()}-${Math.random()}`,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }))

    setAttachedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setAttachedFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file?.preview) URL.revokeObjectURL(file.preview)
      return prev.filter(f => f.id !== id)
    })
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-600" />
    if (type.includes('word') || type.includes('document')) return <FileText className="w-5 h-5 text-blue-600" />
    return <FileIcon className="w-5 h-5" />
  }

  const validateForm = (): boolean => {
    return !!(
      formData.title.trim() &&
      formData.requester.trim() &&
      formData.branch &&
      formData.category &&
      formData.neededBy &&
      formData.costCenter.trim() &&
      lineItems.every(item => 
        item.description.trim() && 
        item.quantity >= 1 && 
        item.unitCost >= 0
      )
    )
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!validateForm()) {
    setError('Please complete all required fields.')
    return
  }

  setLoading(true)
  setError(null)

  try {
    const formDataPayload = new FormData()

    // Auto-generate requisitionId
    const now = new Date()
    const year = now.getFullYear()
    const count = attachedFiles.length > 0 ? 1 : 0 // fallback, real count should come from DB
    const requisitionId = `REQ-${year}-${String(Date.now()).slice(-6)}` // Simple unique ID
    // Or better: fetch count from server (we'll improve this later)

    // Required fields
    formDataPayload.append('requisitionId', requisitionId)
    formDataPayload.append('requester', formData.requester)
    formDataPayload.append('branch', formData.branch)
    formDataPayload.append('category', formData.category)
    formDataPayload.append('amount', totalAmount.toString())
    formDataPayload.append('neededBy', formData.neededBy)
    formDataPayload.append('costCenter', formData.costCenter || '')
    formDataPayload.append('date', new Date().toISOString()) // current date

    // Optional
    formDataPayload.append('notes', formData.notes || '')

    // Line items as JSON string
    const lineItemsPayload = lineItems.map(item => ({
      description: item.description,
      quantity: item.quantity,
      unit: item.unit || 'Unit',
      unitCost: item.unitCost,
      total: item.quantity * item.unitCost
    }))
    formDataPayload.append('lineItems', JSON.stringify(lineItemsPayload))

    // Attach files
    attachedFiles.forEach(file => {
      formDataPayload.append('files', file)
    })

    const resp = await fetch('/api/requisitions', { method: 'POST', body: formDataPayload })
    const result = await resp.json()

    if (result?.success) {
      onSuccess()
    } else {
      setError(result?.error || 'Failed to create requisition')
    }
  } catch (err: any) {
    console.error('Submission error:', err)
    setError(err.message || 'Failed to submit requisition')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <CardHeader className="border-b sticky top-0 bg-background z-10 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create New Requisition</CardTitle>
              <CardDescription>Submit a purchase request with supporting documents</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} disabled={loading}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <CardContent className="flex-1 overflow-y-auto pt-6 space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            {/* Existing form fields (title, requester, etc.) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ... your existing inputs ... */}
              <div className="space-y-2">
                <Label htmlFor="title">Requisition Title <span className="text-destructive">*</span></Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              {/* Repeat for requester, branch, etc. */}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes / Justification</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <Label>Attachments <span className="text-muted-foreground text-sm">(Optional)</span></Label>
              
              <div
                className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleFiles(e.dataTransfer.files)
                }}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, images, documents up to 10MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />

              {/* File Previews */}
              {attachedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Attached Files ({attachedFiles.length})</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {attachedFiles.map(file => (
                      <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg bg-background">
                        <div className="flex-shrink-0">
                          {file.preview ? (
                            <img src={file.preview} alt={file.name} className="w-10 h-10 object-cover rounded" />
                          ) : (
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                              {getFileIcon(file.type)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Line Items & Total (unchanged) */}
            {/* ... your line items code ... */}

            <div className="flex justify-between items-center pt-6 border-t font-semibold text-lg">
              <span>Total Amount:</span>
              <span>${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </CardContent>

          <div className="border-t p-6 flex justify-between items-center sticky bottom-0 bg-background shrink-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Paperclip className="w-4 h-4" />
              <span>{attachedFiles.length} file{attachedFiles.length !== 1 ? 's' : ''} attached</span>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !validateForm()}>
                {loading ? 'Creating...' : 'Create Requisition'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default function RequisitionsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <CardTitle className="text-base">Requisitions</CardTitle>
        <Button size="sm" onClick={() => setOpen(true)}>Create requisition</Button>
      </div>

      {open && (
        <CreateRequisitionForm onClose={() => setOpen(false)} onSuccess={() => setOpen(false)} />
      )}
    </div>
  )
}
