import mongoose, { Schema, model, models } from "mongoose";

const PurchaseOrderSchema = new Schema(
  {
    poNumber: { type: String, required: true, unique: true },
    supplier: { type: String, required: true },
    supplierRef: { type: Schema.Types.ObjectId, ref: "Supplier" },
    status: {
      type: String,
      enum: [
        "Partially received",
        "Pending receipt",
        "Pending invoice",
        "Closed",
        "Delivered",
        "Shipped",
        "Issued",
        "In transit",
        "Invoiced",
      ],
      default: "Issued",
    },
    total: { type: Number, required: true },
    requester: { type: String },
    department: { type: String },
    linkedRequisition: { type: String },
    currency: { type: String, default: "USD" },
    purpose: { type: String },
    paymentTerms: { type: String },
    keyDates: {
      issued: Date,
      requestedDelivery: Date,
    },
    lineItems: [
      {
        line: Number,
        description: String,
        ordered: Number,
        received: Number,
        remaining: Number,
        lineTotal: Number,
      },
    ],
    delivery: {
      shipTo: String,
      invoiceTo: String,
    },
    receiptStatus: {
      status: String,
      details: String,
    },
    invoiceStatus: {
      status: String,
      details: String,
    },
    approvalHistory: [
      {
        event: String,
        date: String,
        actor: String,
      },
    ],
    notes: String,
  },
  { timestamps: true }
);

export const PurchaseOrder =
  models.PurchaseOrder || model("PurchaseOrder", PurchaseOrderSchema);
