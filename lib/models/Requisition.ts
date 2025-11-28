import mongoose, { Schema, model, models } from 'mongoose'

const RequisitionSchema = new Schema({
  requisitionId: { type: String, required: true, unique: true },
  requester: { type: String, required: true },
  createdBy: { type: String },
  branch: { type: String, required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Pending approval', 'In review', 'Approved', 'Rejected'],
    default: 'Pending approval'
  },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  neededBy: { type: Date },
  costCenter: { type: String },
  approvalRoute: { type: String },
  lineItems: [{
    description: String,
    quantity: Number,
    unit: String,
    unitCost: Number,
    total: Number
  }],
  comments: [{ 
    author: String,
    text: String,
    date: Date
  }],
  timeline: [{
    event: String,
    timestamp: Date,
    actor: String,
    details: String
  }],
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true })

export const Requisition = models.Requisition || model('Requisition', RequisitionSchema)
