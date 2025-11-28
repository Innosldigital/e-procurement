'use server'

import { revalidatePath } from 'next/cache'
import { auth, clerkClient } from '@clerk/nextjs/server'
import dbConnect from '@/lib/mongodb'
import { Supplier } from '../models/Supplier'
import { Company } from '../models/Company'

export async function submitCompanyOnboarding(data: {
  companyName: string
  industry?: string
  region?: string
  size?: string
  contactEmail?: string
  organizationType?: string
  address?: string
  officialEmail?: string
  companyPhone?: string
  website?: string
  contactPersonName?: string
  contactPersonRole?: string
  contactPersonPhone?: string
  contactPersonEmail?: string
  businessDescription?: string
  hasBranches?: boolean
  numberOfBranches?: number
  branchLocations?: string
  centralStore?: string
  procurementMethod?: string
  requiresApprovalWorkflows?: boolean
  approvalLevels?: string[]
  managerName?: string
  managerPosition?: string
  managerEmail?: string
  employeeAccessCount?: string
  departments?: string[]
  otherDepartment?: string
  registrationUploads?: { name: string; size: number; type: string }[]
  tin?: string
  logoUploads?: { name: string; size: number; type: string }[]
  vendorsSelfOnboard?: string
  tenderingEnabled?: boolean
  eInvoicingEnabled?: boolean
  analyticsEnabled?: boolean
  systemManagerName?: string
  systemManagerRole?: string
  invoicesApprover?: string
  poApprover?: string
  goodsReceiver?: string
  projectLead?: string
  trainingOfficer?: string
  declarationInfoAccurate?: boolean
  declarationAgreeOnboarding?: boolean
}) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    await dbConnect()
    const count = await Company.countDocuments()
    const companyId = `COMP-${(count + 1000).toString()}`

    await Company.create({
      companyId,
      name: data.companyName,
      approved: false,
      industry: data.industry || '',
      region: data.region || '',
      size: data.size || '',
      contactEmail: data.contactEmail || '',
      ownerUserId: userId,
      onboarding: {
        companyInformation: {
          organizationType: data.organizationType || '',
          address: data.address || '',
          officialEmail: data.officialEmail || '',
          phone: data.companyPhone || '',
          website: data.website || '',
        },
        contactPerson: {
          name: data.contactPersonName || '',
          role: data.contactPersonRole || '',
          phone: data.contactPersonPhone || '',
          email: data.contactPersonEmail || '',
        },
        businessOperations: {
          description: data.businessDescription || '',
          hasBranches: Boolean(data.hasBranches),
          numberOfBranches: typeof data.numberOfBranches === 'number' ? data.numberOfBranches : 0,
          branchLocations: data.branchLocations || '',
          centralStore: data.centralStore || '',
        },
        procurementStructure: {
          currentMethod: data.procurementMethod || '',
          requiresApprovalWorkflows: Boolean(data.requiresApprovalWorkflows),
          approvalLevels: Array.isArray(data.approvalLevels) ? data.approvalLevels : [],
          manager: {
            name: data.managerName || '',
            position: data.managerPosition || '',
            email: data.managerEmail || '',
          },
        },
        userSetup: {
          employeeAccessCount: data.employeeAccessCount || '',
          departments: Array.isArray(data.departments) ? data.departments : [],
          otherDepartment: data.otherDepartment || '',
        },
        documents: {
          registrationUploads: Array.isArray(data.registrationUploads) ? data.registrationUploads : [],
          tin: data.tin || '',
          logoUploads: Array.isArray(data.logoUploads) ? data.logoUploads : [],
        },
        systemConfiguration: {
          vendorsSelfOnboard: data.vendorsSelfOnboard || '',
          tenderingEnabled: Boolean(data.tenderingEnabled),
          eInvoicingEnabled: Boolean(data.eInvoicingEnabled),
          analyticsEnabled: Boolean(data.analyticsEnabled),
        },
        responsibilities: {
          systemManagerName: data.systemManagerName || '',
          systemManagerRole: data.systemManagerRole || '',
          invoicesApprover: data.invoicesApprover || '',
          poApprover: data.poApprover || '',
          goodsReceiver: data.goodsReceiver || '',
        },
        teamMembers: {
          projectLead: data.projectLead || '',
          trainingOfficer: data.trainingOfficer || '',
        },
        declarations: {
          infoAccurate: Boolean(data.declarationInfoAccurate),
          agreeOnboarding: Boolean(data.declarationAgreeOnboarding),
        },
      },
    })

    const client = await clerkClient()
    await client.users.updateUser(userId, {
      publicMetadata: {
        role: 'company',
        companyId,
        onboardingStatus: 'pending_admin_approval',
        company: {
          name: data.companyName,
          industry: data.industry || '',
          region: data.region || '',
          size: data.size || '',
          contactEmail: data.contactEmail || '',
        },
        onboarded: false,
      },
    })

    revalidatePath('/onboarding')
    return { success: true, data: { companyId } }
  } catch (error) {
    return { success: false, error: 'Failed to submit company onboarding' }
  }
}

export async function submitSupplierOnboarding(data: {
  name: string
  contactPerson?: string
  phone?: string
  email?: string
  goodsType?: string
  productCategories?: string[]
  supplyAreas?: string[]
  deliveryTimeline?: string
  priceListUploads?: { name: string; size: number; type: string }[]
  registrationCertificateUploads?: { name: string; size: number; type: string }[]
  businessRegistrationCertificateUploads?: { name: string; size: number; type: string }[]
  taxClearanceCertificateUploads?: { name: string; size: number; type: string }[]
  gstVatRegistrationCertificateUploads?: { name: string; size: number; type: string }[]
  businessLicenseUploads?: { name: string; size: number; type: string }[]
  nassitCertificateUploads?: { name: string; size: number; type: string }[]
  sectorSpecificCertificateUploads?: { name: string; size: number; type: string }[]
  paymentMethods?: string[]
  bankDetails?: { bankName?: string; accountName?: string; accountNumber?: string; prefersCash?: boolean }
  declarations?: { infoAccurate?: boolean; agreeRules?: boolean }
  category?: string
  region?: string
  segment?: string
}) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: 'Unauthorized' }
    await dbConnect()
    const count = await Supplier.countDocuments()
    const supplierId = `SUP-${(count + 5000).toString()}`
    const supplier = await Supplier.create({
      supplierId,
      name: data.name,
      approved: false,
      ownerUserId: userId,
      category: data.category || 'General',
      region: data.region || 'Global',
      segment: data.segment || 'Standard',
      onboarding: {
        contactPerson: data.contactPerson || '',
        phone: data.phone || '',
        email: data.email || '',
        goodsType: data.goodsType || '',
        productCategories: Array.isArray(data.productCategories) ? data.productCategories : [],
        supplyAreas: Array.isArray(data.supplyAreas) ? data.supplyAreas : [],
        deliveryTimeline: data.deliveryTimeline || '',
        priceListUploads: Array.isArray(data.priceListUploads) ? data.priceListUploads : [],
        registrationCertificateUploads: Array.isArray(data.registrationCertificateUploads) ? data.registrationCertificateUploads : [],
        businessRegistrationCertificateUploads: Array.isArray(data.businessRegistrationCertificateUploads) ? data.businessRegistrationCertificateUploads : [],
        taxClearanceCertificateUploads: Array.isArray(data.taxClearanceCertificateUploads) ? data.taxClearanceCertificateUploads : [],
        gstVatRegistrationCertificateUploads: Array.isArray(data.gstVatRegistrationCertificateUploads) ? data.gstVatRegistrationCertificateUploads : [],
        businessLicenseUploads: Array.isArray(data.businessLicenseUploads) ? data.businessLicenseUploads : [],
        nassitCertificateUploads: Array.isArray(data.nassitCertificateUploads) ? data.nassitCertificateUploads : [],
        sectorSpecificCertificateUploads: Array.isArray(data.sectorSpecificCertificateUploads) ? data.sectorSpecificCertificateUploads : [],
        paymentMethods: Array.isArray(data.paymentMethods) ? data.paymentMethods : [],
        bankDetails: {
          bankName: data.bankDetails?.bankName || '',
          accountName: data.bankDetails?.accountName || '',
          accountNumber: data.bankDetails?.accountNumber || '',
          prefersCash: Boolean(data.bankDetails?.prefersCash),
        },
        declarations: {
          infoAccurate: Boolean(data.declarations?.infoAccurate),
          agreeRules: Boolean(data.declarations?.agreeRules),
        },
      },
      performanceScore: 0,
      riskRating: 'Low',
      totalSpend: 0,
    })

    const client2 = await clerkClient()
    await client2.users.updateUser(userId, {
      publicMetadata: {
        role: 'supplier',
        supplierId,
        onboardingStatus: 'pending_admin_approval',
        onboarded: false,
      },
    })

    revalidatePath('/onboarding')
    return { success: true, data: JSON.parse(JSON.stringify(supplier)) }
  } catch (error) {
    return { success: false, error: 'Failed to submit supplier onboarding' }
  }
}
