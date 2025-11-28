import mongoose, { Schema, model, models } from 'mongoose'

const InvoiceSchema = new Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  supplier: { type: String, required: true },
  poNumber: { type: String },
  status: { 
    type: String, 
    enum: ['Pending approval', 'Overdue', 'Pending match', 'Paid', 'Closed'],
    default: 'Pending approval'
  },
  dueDate: { type: Date },
  invoiceDate: { type: Date },
  amount: { type: Number, required: true },
  entity: { type: String },
  currency: { type: String, default: 'USD' },
  matching: {
    status: String,
    poMatch: String,
    grnMatch: String,
    priceVariance: Number
  },
  approvalWorkflow: {
    owner: String,
    approvers: [String],
    sla: Number
  },
  coding: {
    costCenter: String,
    gl: String,
    officeSupplies: String,
    taxCode: String
  },
  lineItems: [{
    description: String,
    qty: Number,
    unitPrice: Number,
    tax: Number,
    lineTotal: Number
  }],
  activity: [{
    event: String,
    date: Date,
    details: String
  }],
  notes: String
}, { timestamps: true })

export const Invoice = models.Invoice || model('Invoice', InvoiceSchema)
