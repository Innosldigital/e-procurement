// import mongoose, { Schema, model, models } from 'mongoose'

// const NotificationSchema = new Schema({
//   userId: { type: String, required: true, index: true },
//   type: {
//     type: String,
//     enum: [
//       'requisition_submitted',
//       'requisition_approved',
//       'requisition_rejected',
//       'approval_pending',
//       'invoice_overdue',
//       'po_issued',
//       'tender_response',
//       'contract_expiring',
//       'budget_threshold',
//       'supplier_update'
//     ],
//     required: true
//   },
//   title: { type: String, required: true },
//   message: { type: String, required: true },
//   actionUrl: { type: String },
//   priority: {
//     type: String,
//     enum: ['low', 'medium', 'high', 'urgent'],
//     default: 'medium'
//   },
//   read: { type: Boolean, default: false },
//   metadata: { type: Schema.Types.Mixed },
//   expiresAt: { type: Date }
// }, { timestamps: true })

// // Index for efficient queries
// NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 })
// NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

// export const Notification = models.Notification || model('Notification', NotificationSchema)

// In lib/models/Notification.ts (or wherever your Notification model is)

import mongoose, { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: [
        "requisition_submitted",
        "requisition_approved",
        "requisition_rejected",
        "approval_pending",
        "invoice_overdue",
        "po_issued",
        "tender_response",
        "tender_published",
        "contract_expiring",
        "budget_threshold",
        "supplier_update",
      ],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    actionUrl: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    read: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

// Index for efficient queries
NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Notification =
  models.Notification || model("Notification", NotificationSchema);
