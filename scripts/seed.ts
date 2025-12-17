// scripts/seed.ts
// Database seeding script for Inno-SL Procurement
// Run with: npx tsx scripts/seed.ts

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";

import { Supplier } from "../lib/models/Supplier";
import { Approval } from "../lib/models/Approval";
import { Invoice } from "../lib/models/Invoice";
import { PurchaseOrder } from "../lib/models/PurchaseOrder";
import { Tender } from "../lib/models/Tender";
import { Notification } from "../lib/models/Notification";
import { Requisition } from "../lib/models/Requisition";
import { IReport } from "../lib/models/Report";

const MONGODB_URI = process.env.MONGODB_URI;
const DEMO_USER_ID = "user_demo_procurement_manager";

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    if (!MONGODB_URI)
      throw new Error("❌ MONGODB_URI is not defined in environment variables");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Promise.all([
      Requisition.deleteMany({}),
      Supplier.deleteMany({}),
      Approval.deleteMany({}),
      Invoice.deleteMany({}),
      PurchaseOrder.deleteMany({}),
      Tender.deleteMany({}),
      Notification.deleteMany({}),
      // Report.deleteMany({})
    ]);
    console.log("Cleared existing data");

    // --------------------- Suppliers ---------------------
    console.log("Seeding suppliers...");
    const suppliers = await Supplier.create([
      {
        supplierId: "SUP-2045",
        name: "Global Office Supplies Ltd",
        category: "Facilities & Office",
        region: "Global HQ & North America",
        segment: "Strategic",
        performanceScore: 94,
        riskRating: "Low",
        totalSpend: 1280000,
        contracts: {
          masterServiceAgreement: {
            status: "Active",
            expiryDate: new Date("2026-06-30"),
            autoRenew: true,
          },
        },
      },
      {
        supplierId: "SUP-1829",
        name: "APAC Logistics Co.",
        category: "Logistics",
        region: "APAC",
        segment: "Preferred",
        performanceScore: 89,
        riskRating: "Medium",
        totalSpend: 980500,
        deliveryPerformance: { onTimePercentage: 89, averageLeadTime: 5.2 },
      },
      {
        supplierId: "SUP-3104",
        name: "Cloud Hosting Inc.",
        category: "IT & Cloud",
        region: "Global",
        segment: "Strategic",
        performanceScore: 96,
        riskRating: "Low",
        totalSpend: 1540300,
        deliveryPerformance: { onTimePercentage: 99, averageLeadTime: 0.5 },
      },
      {
        supplierId: "SUP-2891",
        name: "Northwind Furniture",
        category: "Facilities & Furniture",
        region: "North America",
        segment: "Preferred",
        performanceScore: 82,
        riskRating: "Under review",
        totalSpend: 460200,
        deliveryPerformance: { onTimePercentage: 82, averageLeadTime: 14.3 },
      },
      {
        supplierId: "SUP-4502",
        name: "Metro Print Services",
        category: "Marketing & Print",
        region: "North America",
        segment: "Standard",
        performanceScore: 71,
        riskRating: "High",
        totalSpend: 320800,
        deliveryPerformance: { onTimePercentage: 71, averageLeadTime: 8.5 },
      },
    ]);
    console.log(`Created ${suppliers.length} suppliers`);

    // --------------------- Requisitions ---------------------
    console.log("Seeding requisitions...");
    const requisitions = await Requisition.create([
      {
        requisitionId: "REQ-1044",
        requester: "David Kim",
        branch: "APAC",
        department: "Marketing",
        category: "Marketing & events",
        amount: 62800,
        status: "Pending approval",
        priority: "high",
        date: new Date("2025-03-10"),
        neededBy: new Date("2025-04-01"),
        description:
          "APAC Marketing Campaign - Q2 digital advertising and event sponsorship",
        lineItems: [
          {
            description: "Digital ads package (Q2)",
            quantity: 1,
            unit: "Package",
            unitCost: 32000,
            total: 32000,
          },
          {
            description: "Event sponsorship - Singapore summit",
            quantity: 1,
            unit: "Event",
            unitCost: 24000,
            total: 24000,
          },
          {
            description: "Creative agency support",
            quantity: 40,
            unit: "Hours",
            unitCost: 170,
            total: 6800,
          },
        ],
      },
      {
        requisitionId: "REQ-1045",
        requester: "Maria Rossi",
        branch: "NA",
        department: "Operations",
        category: "Office Supplies",
        amount: 9120,
        status: "In review",
        priority: "medium",
        date: new Date("2025-03-12"),
        neededBy: new Date("2025-03-25"),
        description: "Office supplies replenishment for Q2",
        lineItems: [
          {
            description: "Printer paper - A4 (boxes)",
            quantity: 50,
            unit: "Box",
            unitCost: 45,
            total: 2250,
          },
          {
            description: "Toner cartridges",
            quantity: 12,
            unit: "Unit",
            unitCost: 380,
            total: 4560,
          },
          {
            description: "Office stationery bundle",
            quantity: 8,
            unit: "Bundle",
            unitCost: 290,
            total: 2320,
          },
        ],
      },
      {
        requisitionId: "REQ-1046",
        requester: "John Lee",
        branch: "LATAM",
        department: "IT",
        category: "IT & Software",
        amount: 4980,
        status: "Rejected",
        priority: "low",
        date: new Date("2025-03-14"),
        neededBy: new Date("2025-04-15"),
        description: "Software licenses renewal",
        lineItems: [
          {
            description: "Design software licenses (5 users)",
            quantity: 5,
            unit: "License",
            unitCost: 996,
            total: 4980,
          },
        ],
      },
      {
        requisitionId: "REQ-1047",
        requester: "Ana Silva",
        branch: "EMEA",
        department: "Facilities",
        category: "Facilities & Office",
        amount: 18240,
        status: "Approved",
        priority: "medium",
        date: new Date("2025-03-16"),
        neededBy: new Date("2025-03-30"),
        description: "Office furniture for new hires",
        lineItems: [
          {
            description: "Ergonomic office chairs",
            quantity: 12,
            unit: "Unit",
            unitCost: 450,
            total: 5400,
          },
          {
            description: "Standing desks",
            quantity: 12,
            unit: "Unit",
            unitCost: 820,
            total: 9840,
          },
          {
            description: "Monitor arms (dual)",
            quantity: 12,
            unit: "Unit",
            unitCost: 250,
            total: 3000,
          },
        ],
      },
    ]);
    console.log(`Created ${requisitions.length} requisitions`);

    // --------------------- Approvals ---------------------
    console.log("Seeding approvals...");
    const approvals = await Approval.create([
      {
        approvalId: "APR-1001",
        itemId: "REQ-1044",
        type: "Requisition",
        requester: "David Kim",
        amount: 62800,
        status: "Awaiting your approval",
        priority: "High",
        dueDate: new Date("2025-03-20"),
        approver: "Procurement Manager",
        costCenter: "MKT-APAC-042",
        branch: "APAC",
      },
      {
        approvalId: "APR-1002",
        itemId: "PO-7682",
        type: "Purchase Order",
        requester: "Maria Rossi",
        amount: 18450,
        status: "Pending review",
        priority: "Medium",
        dueDate: new Date("2025-03-21"),
        approver: "Finance Controller",
        costCenter: "OPS-NA-015",
        branch: "NA",
      },
      {
        approvalId: "APR-1003",
        itemId: "REQ-1048",
        type: "Requisition",
        requester: "John Lee",
        amount: 7200,
        status: "Parallel approval",
        priority: "Medium",
        dueDate: new Date("2025-03-22"),
        approver: "Department Head",
        costCenter: "IT-LATAM-008",
        branch: "LATAM",
      },
    ]);
    console.log(`Created ${approvals.length} approvals`);

    // --------------------- Invoices ---------------------
    console.log("Seeding invoices...");
    const invoices = await Invoice.create([
      {
        invoiceNumber: "INV-10452",
        supplier: "Global Office Supplies Ltd",
        poNumber: "PO-88032",
        amount: 42780,
        status: "Pending approval",
        invoiceDate: new Date("2025-02-28"),
        dueDate: new Date("2025-03-22"),
        currency: "USD",
        entity: "Global HQ",
        lineItems: [
          {
            description: "Standard office stationery bundle",
            qty: 250,
            unitPrice: 110,
            tax: 5500,
            lineTotal: 27500,
          },
          {
            description: "Printer toner cartridges (HQ)",
            qty: 60,
            unitPrice: 145,
            tax: 1305,
            lineTotal: 8700,
          },
          {
            description: "Cleaning & janitorial consumables",
            qty: 40,
            unitPrice: 160,
            tax: 2280,
            lineTotal: 6580,
          },
        ],
      },
      {
        invoiceNumber: "INV-10437",
        supplier: "APAC Logistics Co.",
        poNumber: "PO-87990",
        amount: 128400,
        status: "Overdue",
        invoiceDate: new Date("2025-02-05"),
        dueDate: new Date("2025-03-05"),
        currency: "USD",
        entity: "APAC Regional",
      },
      {
        invoiceNumber: "INV-10421",
        supplier: "Cloud Hosting Inc.",
        poNumber: "PO-87910",
        amount: 96120,
        status: "Pending match",
        invoiceDate: new Date("2025-02-28"),
        dueDate: new Date("2025-03-28"),
        currency: "USD",
        entity: "Global HQ",
      },
    ]);
    console.log(`Created ${invoices.length} invoices`);

    // --------------------- Purchase Orders ---------------------
    console.log("Seeding purchase orders...");
    const purchaseOrders = await PurchaseOrder.create([
      {
        poNumber: "PO-10432",
        supplier: "Global Office Supplies Ltd",
        total: 28450,
        status: "Partially received",
        requester: "Daniel Lee",
        department: "Global HQ Operations",
        linkedRequisition: "REQ-7821",
        currency: "USD",
        purpose: "FY25 office consumables for Global HQ floors 10-18",
        paymentTerms: "Net 30 days · 2% discount if paid in 10 days",
        keyDates: {
          issued: new Date("2025-03-02"),
          requestedDelivery: new Date("2025-03-22"),
        },
        delivery: {
          shipTo: "Global HQ · 12 Market Street, Level 15, New York, NY 10005",
          invoiceTo: "Corporate Finance · AP@company.com",
        },
        receiptStatus: {
          status: "Partial",
          details: "2 partial receipts logged · No discrepancies reported",
        },
        invoiceStatus: {
          status: "Matched",
          details:
            "1 invoice matched ($12,300) · Next invoice expected on final delivery",
        },
        notes:
          "Supplier confirmed remaining delivery will be split into two shipments due to stock constraints. No price changes expected.",
        lineItems: [
          {
            line: 1,
            description: "A4 copy paper, 80gsm (carton of 5,000 sheets)",
            ordered: 120,
            received: 80,
            remaining: 40,
            lineTotal: 9600,
          },
          {
            line: 2,
            description: "Standard black ballpoint pens (box of 50)",
            ordered: 300,
            received: 300,
            remaining: 0,
            lineTotal: 4200,
          },
          {
            line: 3,
            description: "Recycled notebooks, A5 size",
            ordered: 800,
            received: 440,
            remaining: 360,
            lineTotal: 6000,
          },
          {
            line: 4,
            description: "Desk organizers",
            ordered: 300,
            received: 0,
            remaining: 300,
            lineTotal: 3750,
          },
          {
            line: 5,
            description: "Assorted printer toner cartridges",
            ordered: 45,
            received: 18,
            remaining: 27,
            lineTotal: 4900,
          },
        ],
        approvalHistory: [
          {
            event: "PO issued to Global Office Supplies Ltd",
            date: "2025-03-02",
            actor: "Daniel Lee",
          },
          {
            event: "Approved within budget threshold",
            date: "2025-03-02",
            actor: "Facilities Director",
          },
          {
            event: "First partial delivery received",
            date: "2025-03-10",
            actor: "GRN-5521",
          },
          {
            event: "Second partial delivery received",
            date: "2025-03-15",
            actor: "GRN-5533",
          },
        ],
      },
      {
        poNumber: "PO-10421",
        supplier: "MarTech One",
        total: 120000,
        status: "Pending receipt",
        requester: "Sarah Chen",
        department: "Marketing",
        linkedRequisition: "REQ-7809",
        currency: "USD",
        purpose: "Marketing automation platform subscription - Annual",
        paymentTerms: "Net 60 days",
        keyDates: {
          issued: new Date("2025-03-05"),
          requestedDelivery: new Date("2025-03-25"),
        },
        delivery: {
          shipTo: "N/A - Software subscription",
          invoiceTo: "Corporate Finance · AP@company.com",
        },
        receiptStatus: {
          status: "Pending",
          details: "Pending service activation",
        },
        invoiceStatus: { status: "None", details: "No invoices received" },
        notes:
          "Waiting for implementation kickoff call scheduled for 2025-03-20",
        lineItems: [
          {
            line: 1,
            description: "Marketing automation platform - Annual license",
            ordered: 1,
            received: 0,
            remaining: 1,
            lineTotal: 120000,
          },
        ],
        approvalHistory: [
          {
            event: "PO issued to MarTech One",
            date: "2025-03-05",
            actor: "Sarah Chen",
          },
          { event: "Approved by CFO", date: "2025-03-05", actor: "CFO" },
        ],
      },
    ]);
    console.log(`Created ${purchaseOrders.length} purchase orders`);

    // --------------------- Tenders ---------------------
    console.log("Seeding tenders...");
    const tenders = await Tender.create([
      {
        tenderId: "RFP-2308",
        title: "Global marketing automation platform",
        type: "RFP",
        status: "evaluation",
        owner: "Sarah Chen",
        category: "Marketing & Strategy",
        businessUnit: "Global Marketing",
        region: "Global",
        sourcingObjective:
          "Consolidate marketing automation tools into a single global platform",
        estimatedContractValue: "$450,000 / year · 3-year term",
        sourcingType: "Competitive RFP · 5 invited suppliers",
        publishedDate: new Date("2025-02-10"),
        closeDate: new Date("2025-03-15"),
        recommendedSupplier: "MarTech One",
        recommendedSupplierScore: 88,
        bestOfferPrice: "$430,000",
        infoRisks: "2 info risks",
        criticalIssues: 0,
        disqualifiedBids: 0,
        notes:
          "MarTech One offers strongest integration with our CRM stack and clear migration plan. Recommend proceeding pending final security review.",
        bids: [
          {
            supplier: "MarTech One",
            price: "$430,000",
            score: 88,
            compliance: "Fully compliant",
            highlights: "Best fit with global data residency & integrations.",
          },
        ],
      },
      {
        tenderId: "RFQ-1192",
        title: "APAC office furniture refresh",
        type: "RFQ",
        status: "open",
        owner: "Michael Tang",
        category: "Facilities",
        businessUnit: "APAC Operations",
        region: "APAC",
        sourcingObjective: "Refresh office furniture across 3 APAC locations",
        estimatedContractValue: "$280,000",
        sourcingType: "Request for Quote · 7 suppliers",
        publishedDate: new Date("2025-03-10"),
        closeDate: new Date("2025-03-23"),
        disqualifiedBids: 0,
        bids: [],
      },
    ]);
    console.log(`Created ${tenders.length} tenders`);

    // --------------------- Notifications ---------------------
    console.log("Seeding notifications...");
    const notifications = await Notification.create([
      {
        userId: DEMO_USER_ID,
        type: "approval_pending",
        title: "3 invoices overdue for approval",
        message: "Finance - Oldest overdue: 7 days - Total: $84,320",
        actionUrl: "/invoices?filter=overdue",
        priority: "urgent",
        read: false,
        metadata: { count: 3, totalAmount: 84320 },
      },
      {
        userId: DEMO_USER_ID,
        type: "contract_expiring",
        title: "Contract threshold reached for Supplier A",
        message: "Compliance - 95% of annual contract value consumed",
        actionUrl: "/suppliers/SUP-2045",
        priority: "high",
        read: false,
        metadata: { supplierId: "SUP-2045", percentage: 95 },
      },
      {
        userId: DEMO_USER_ID,
        type: "requisition_submitted",
        title: "Requisition REQ-1044 awaiting approval",
        message:
          "David Kim submitted requisition for $62,800 - Marketing campaign",
        actionUrl: "/requisitions/REQ-1044",
        priority: "high",
        read: false,
        metadata: {
          requisitionId: "REQ-1044",
          amount: 62800,
          requester: "David Kim",
        },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        userId: DEMO_USER_ID,
        type: "po_issued",
        title: "PO-10432 partially received",
        message: "Global Office Supplies Ltd - 2 of 5 lines fully received",
        actionUrl: "/purchase-orders/PO-10432",
        priority: "low",
        read: true,
        metadata: {
          poNumber: "PO-10432",
          supplier: "Global Office Supplies Ltd",
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`Created ${notifications.length} notifications`);
    console.log("Seeding complete!");

    // Disconnect
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
  }
}

seed();
