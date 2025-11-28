// models/Report.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReport extends Document {
  title: string;
  description?: string;

  category: "finance" | "procurement" | "leadership" | "other";

  type: "saved" | "scheduled" | "recent";

  filters: Record<string, any>;    // Example: { dateFrom, dateTo, supplierId, status }
  exportFormat: "pdf" | "xlsx" | "csv";

  schedule?: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly";
    nextRun: Date;
  };

  createdBy: mongoose.Types.ObjectId;
  sharedWith: mongoose.Types.ObjectId[];

  lastRun?: {
    runAt: Date;
    params: Record<string, any>;
    exportedFile?: string;  // path to exported output
  };

  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    title: { type: String, required: true },
    description: { type: String },

    category: {
      type: String,
      enum: ["finance", "procurement", "leadership", "other"],
      default: "other",
    },

    type: {
      type: String,
      enum: ["saved", "scheduled", "recent"],
      required: true,
    },

    filters: {
      type: Schema.Types.Mixed,
      default: {},
    },

    exportFormat: {
      type: String,
      enum: ["pdf", "xlsx", "csv"],
      default: "pdf",
    },

    schedule: {
      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "quarterly"],
      },
      nextRun: Date,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sharedWith: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    lastRun: {
      runAt: Date,
      params: Schema.Types.Mixed,
      exportedFile: String,
    },
  },
  { timestamps: true }
);

const Report: Model<IReport> =
  mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);

export default Report;
