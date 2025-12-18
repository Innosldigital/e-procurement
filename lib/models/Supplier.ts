// import mongoose, { Schema, model, models } from "mongoose";

// const SupplierSchema = new Schema(
//   {
//     supplierId: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     approved: { type: Boolean, default: false },
//     ownerUserId: { type: String, required: true, index: true },
//     segment: { type: String },
//     category: { type: String },
//     region: { type: String },
//     onboarding: {
//       contactPerson: String,
//       phone: String,
//       email: String,
//       goodsType: String,
//       productCategories: [String],
//       supplyAreas: [String],
//       deliveryTimeline: String,
//       priceListUploads: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       registrationCertificateUploads: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       businessRegistrationCertificateUploads: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       taxClearanceCertificateUploads: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       gstVatRegistrationCertificateUploads: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       businessLicenseUploads: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       nassitCertificateUploads: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       sectorSpecificCertificateUploads: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       businessDurationDocuments: [
//         { name: String, size: Number, type: String, url: String },
//       ],
//       paymentMethods: [String],
//       bankDetails: {
//         bankName: String,
//         accountName: String,
//         accountNumber: String,
//         prefersCash: Boolean,
//       },
//       vendorPaymentTerms: String,
//       businessLeadGender: String,
//       inBusinessMoreThan3Years: Boolean,
//       dateOfIncorporation: String,
//       averageTurnover: String,
//       declarations: {
//         infoAccurate: Boolean,
//         agreeRules: Boolean,
//       },
//     },
//     risk: {
//       type: String,
//       enum: ["Low", "Medium", "High", "Under review"],
//     },
//     onTimePerformance: { type: Number },
//     fy24Spend: { type: Number },
//     performanceScore: { type: Number },
//     riskStatus: { type: String },
//     riskRating: { type: String },
//     totalSpend: { type: Number },
//     primaryCategory: { type: String },
//     commercialTerms: {
//       paymentTerms: String,
//       diversityStatus: String,
//     },
//     performanceMetrics: {
//       deliveryPerformance: {
//         onTime: Number,
//         avgLeadTime: Number,
//         lateDeliveries: Number,
//       },
//       qualityMetrics: {
//         returnRate: Number,
//         qualityIncidents: Number,
//         criticalEvents: Number,
//       },
//       financialMetrics: {
//         externalRating: String,
//         creditLimit: Number,
//         overdueInvoices: Boolean,
//         paymentAge: Number,
//       },
//       complianceStatus: {
//         kyc: String,
//         aml: String,
//         insuranceCerts: Boolean,
//         sanctions: String,
//       },
//     },
//     contacts: [
//       {
//         role: String,
//         name: String,
//         email: String,
//         phone: String,
//       },
//     ],
//     documents: [
//       {
//         name: String,
//         type: String,
//         size: String,
//         signedDate: String,
//         expiresDate: String,
//         owner: String,
//       },
//     ],
//     recentActivity: [
//       {
//         event: String,
//         date: String,
//         owner: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export const Supplier = models.Supplier || model("Supplier", SupplierSchema);

import mongoose, { Schema, model, models } from "mongoose";

const SupplierSchema = new Schema(
  {
    supplierId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    approved: { type: Boolean, default: false },
    ownerUserId: { type: String, required: true, index: true },
    segment: { type: String },
    category: { type: String },
    region: { type: String },
    onboarding: {
      contactPerson: String,
      phone: String,
      email: String,
      goodsType: String,
      productCategories: [String],
      supplyAreas: [String],
      deliveryTimeline: String,
      priceListUploads: [
        { name: String, size: Number, type: String, url: String },
      ],
      registrationCertificateUploads: [
        { name: String, size: Number, type: String, url: String },
      ],
      businessRegistrationCertificateUploads: [
        { name: String, size: Number, type: String, url: String },
      ],
      taxClearanceCertificateUploads: [
        { name: String, size: Number, type: String, url: String },
      ],
      gstVatRegistrationCertificateUploads: [
        { name: String, size: Number, type: String, url: String },
      ],
      businessLicenseUploads: [
        { name: String, size: Number, type: String, url: String },
      ],
      nassitCertificateUploads: [
        { name: String, size: Number, type: String, url: String },
      ],
      sectorSpecificCertificateUploads: [
        { name: String, size: Number, type: String, url: String },
      ],
      businessDurationDocuments: [
        { name: String, size: Number, type: String, url: String },
      ],
      paymentMethods: [String],
      bankDetails: {
        bankName: String,
        accountName: String,
        accountNumber: String,
        prefersCash: Boolean,
      },
      vendorPaymentTerms: String,
      businessLeadGender: String,
      inBusinessMoreThan3Years: Boolean,
      dateOfIncorporation: String,
      averageTurnover: String,
      declarations: {
        infoAccurate: Boolean,
        agreeRules: Boolean,
        agreeTerms: Boolean, // NEW: Added Terms & Conditions agreement
      },
    },
    risk: {
      type: String,
      enum: ["Low", "Medium", "High", "Under review"],
    },
    onTimePerformance: { type: Number },
    fy24Spend: { type: Number },
    performanceScore: { type: Number },
    riskStatus: { type: String },
    riskRating: { type: String },
    totalSpend: { type: Number },
    primaryCategory: { type: String },
    commercialTerms: {
      paymentTerms: String,
      diversityStatus: String,
    },
    performanceMetrics: {
      deliveryPerformance: {
        onTime: Number,
        avgLeadTime: Number,
        lateDeliveries: Number,
      },
      qualityMetrics: {
        returnRate: Number,
        qualityIncidents: Number,
        criticalEvents: Number,
      },
      financialMetrics: {
        externalRating: String,
        creditLimit: Number,
        overdueInvoices: Boolean,
        paymentAge: Number,
      },
      complianceStatus: {
        kyc: String,
        aml: String,
        insuranceCerts: Boolean,
        sanctions: String,
      },
    },
    contacts: [
      {
        role: String,
        name: String,
        email: String,
        phone: String,
      },
    ],
    documents: [
      {
        name: String,
        type: String,
        size: String,
        signedDate: String,
        expiresDate: String,
        owner: String,
      },
    ],
    recentActivity: [
      {
        event: String,
        date: String,
        owner: String,
      },
    ],
  },
  { timestamps: true }
);

export const Supplier = models.Supplier || model("Supplier", SupplierSchema);
