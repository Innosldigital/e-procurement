import mongoose, { Schema, model, models } from 'mongoose'

const TenderSchema = new Schema({
  tenderId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['RFP', 'RFQ', 'RFI'],
    required: true
  },
  stage: { 
    type: String, 
    enum: ['Evaluation', 'Open', 'Planned', 'Awarded', 'Closed']
  },
  closeDate: { type: Date },
  responses: { type: Number, default: 0 },
  owner: { type: String },
  category: { type: String },
  businessUnit: { type: String },
  region: { type: String },
  sourcingObjective: { type: String },
  estimatedValue: { type: Number },
  contractTerm: { type: String },
  sourcingType: { type: String },
  invitedSuppliers: { type: Number },
  tenderDocuments: [{ name: String, size: Number, type: String, url: String }],
  keyDates: {
    published: Date,
    closed: Date
  },
  evaluationSummary: {
    recommendedSupplier: String,
    recommendedSupplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    score: Number,
    totalBids: Number,
    disqualified: Number
  },
  bids: [{
    supplier: String,
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    totalPrice: Number,
    score: Number,
    compliance: String,
    highlights: String,
    technicalDocuments: [{ name: String, size: Number, type: String, url: String }],
    financialDocuments: [{ name: String, size: Number, type: String, url: String }]
  }],
  timeline: [{
    event: String,
    date: String,
    owner: String
  }],
  notes: String
}, { timestamps: true })

export const Tender = models.Tender || model('Tender', TenderSchema)
