import mongoose, { Schema, model, models } from "mongoose";

const TenderSchema = new Schema(
  {
    tenderId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["RFP", "RFQ", "RFI"],
      required: true,
    },
    stage: {
      type: String,
      enum: ["Evaluation", "Open", "Planned", "Awarded", "Closed"],
      default: "Planned",
    },
    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "open",
        "evaluation",
        "awarded",
        "closed",
        "revision_requested",
      ],
      default: "draft",
    },
    closeDate: { type: Date },
    publishedDate: { type: Date },
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
    tenderDocuments: {
      type: [
        {
          name: { type: String },
          size: { type: Number },
          type: { type: String },
          url: { type: String },
        },
      ],
      default: [],
    },
    keyDates: {
      published: Date,
      closed: Date,
    },
    evaluationSummary: {
      recommendedSupplier: String,
      recommendedSupplierId: { type: Schema.Types.ObjectId, ref: "Supplier" },
      score: Number,
      totalBids: Number,
      disqualified: Number,
    },
    bids: {
      type: [
        new Schema(
          {
            supplier: { type: String },
            supplierId: { type: Schema.Types.ObjectId, ref: "Supplier" },
            totalPrice: { type: Number },
            score: { type: Number },
            compliance: { type: String },
            highlights: { type: String },

            technicalDocuments: {
              type: [
                {
                  name: String,
                  size: Number,
                  type: String,
                  url: String,
                },
              ],
              default: [],
            },

            financialDocuments: {
              type: [
                {
                  name: String,
                  size: Number,
                  type: String,
                  url: String,
                },
              ],
              default: [],
            },
          },
          { _id: true }
        ),
      ],
      default: [],
    },

    timeline: {
      type: [
        {
          event: { type: String },
          date: { type: String },
          owner: { type: String },
        },
      ],
      default: [],
    },
    notes: String,
  },
  { timestamps: true }
);

export const Tender = models.Tender || model("Tender", TenderSchema);
