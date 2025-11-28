import mongoose, { Schema, model, models } from 'mongoose'

const CompanySchema = new Schema({
  companyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  approved: { type: Boolean, default: false },
  industry: { type: String },
  region: { type: String },
  size: { type: String },
  contactEmail: { type: String },
  ownerUserId: { type: String, required: true, index: true },
  onboarding: {
    companyInformation: {
      organizationType: String,
      address: String,
      officialEmail: String,
      phone: String,
      website: String,
    },
    contactPerson: {
      name: String,
      role: String,
      phone: String,
      email: String,
    },
    businessOperations: {
      description: String,
      hasBranches: Boolean,
      numberOfBranches: Number,
      branchLocations: String,
      centralStore: String,
    },
    procurementStructure: {
      currentMethod: String,
      requiresApprovalWorkflows: Boolean,
      approvalLevels: [String],
      manager: {
        name: String,
        position: String,
        email: String,
      }
    },
    userSetup: {
      employeeAccessCount: String,
      departments: [String],
      otherDepartment: String,
    },
    documents: {
      registrationUploads: [{ name: String, size: Number, type: String }],
      tin: String,
      logoUploads: [{ name: String, size: Number, type: String }],
    },
    systemConfiguration: {
      vendorsSelfOnboard: String,
      tenderingEnabled: Boolean,
      eInvoicingEnabled: Boolean,
      analyticsEnabled: Boolean,
    },
    responsibilities: {
      systemManagerName: String,
      systemManagerRole: String,
      invoicesApprover: String,
      poApprover: String,
      goodsReceiver: String,
    },
    teamMembers: {
      projectLead: String,
      trainingOfficer: String,
    },
    declarations: {
      infoAccurate: Boolean,
      agreeOnboarding: Boolean,
    }
  },
}, { timestamps: true })

export const Company = models.Company || model('Company', CompanySchema)
