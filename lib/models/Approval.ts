import mongoose, { Schema, model, models } from 'mongoose'

const ApprovalSchema = new Schema({
  approvalId: { type: String, required: true, unique: true },
  itemId: { type: String },
  type: { 
    type: String, 
    enum: ['Requisition', 'Purchase Order'],
    required: true
  },
  requester: { type: String, required: true },
  dueDate: { type: Date },
  status: { 
    type: String, 
    enum: [
      'Awaiting your approval',
      'Pending review',
      'Parallel approval',
      'SLA breached',
      'approved',
      'rejected',
      'changes_requested'
    ],
    default: 'Awaiting your approval'
  },
  priority: { 
    type: String, 
    enum: ['High', 'Medium', 'Low', 'Critical']
  },
  amount: { type: Number, required: true },
  costCenter: { type: String },
  branch: { type: String },
  approvedAt: { type: Date },
  approvedBy: { type: String },
  rejectedAt: { type: Date },
  rejectedBy: { type: String },
  requestedBy: { type: String },
  decisionContext: {
    totalAmount: Number,
    budgetImpact: Number,
    riskPolicy: String,
    sla: String,
    category: String,
    neededBy: Date,
    supplierPreference: String,
    approvalRoute: String
  },
  reason: { type: String },
  summary: {
    items: [{
      description: String,
      qty: Number,
      unit: String,
      unitCost: Number,
      total: Number
    }]
  },
  timeline: [{
    event: String,
    timestamp: Date,
    actor: String,
    details: String
  }],
  comments: [{
    author: String,
    text: String,
    date: Date
  }]
}, { timestamps: true })

export const Approval = models.Approval || model('Approval', ApprovalSchema)
