# Quick Start Guide - Inno-SL Procurement

Get your Inno-SL Procurement running in 5 minutes!

## Prerequisites

- **Node.js 18+** installed ([download here](https://nodejs.org/))
- **MongoDB** running locally OR a **MongoDB Atlas** account ([sign up free](https://www.mongodb.com/cloud/atlas))

## Step 1: Install Dependencies

\`\`\`bash
npm install
\`\`\`

## Step 2: Set Up MongoDB

### Option A: Local MongoDB (Recommended for Development)

1. Install MongoDB Community Edition:

   - **macOS**: `brew install mongodb-community`
   - **Windows**: [Download installer](https://www.mongodb.com/try/download/community)
   - **Linux**: [Follow guide](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

2. Start MongoDB:
   \`\`\`bash

   # macOS

   brew services start mongodb-community

   # Linux

   sudo systemctl start mongod

   # Windows (runs automatically after installation)

   \`\`\`

3. Create `.env.local` file:
   \`\`\`bash
   echo "MONGODB_URI=mongodb://localhost:27017/eprocurement" > .env.local
   \`\`\`

### Option B: MongoDB Atlas (Cloud - Free Tier Available)

1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier available)
3. Create database user with password
4. Whitelist your IP (0.0.0.0/0 for development)
5. Get connection string and create `.env.local`:
   \`\`\`bash
   echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eprocurement?retryWrites=true&w=majority" > .env.local
   \`\`\`

## Step 3: Seed Sample Data

\`\`\`bash
npm run seed
\`\`\`

This will populate your database with:

- 5 Suppliers
- 4 Requisitions
- 3 Approvals
- 3 Invoices
- 2 Purchase Orders
- 2 Tenders

## Step 4: Start the Application

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎉 You're Done!

Explore the different modules:

- **Dashboard** - Overview of procurement activity and KPIs
- **Requisitions** - Manage purchase requests
- **Suppliers** - Vendor management and performance tracking
- **Approvals** - Review and approve pending requests
- **Purchase Orders** - Track PO status and receipts
- **Invoices** - Manage invoice processing and payments
- **Tenders** - RFP/RFQ sourcing events
- **Reports** - Analytics and spend reporting
- **Admin** - User management and system settings

## Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseServerSelectionError`

**Solution**:

- Check MongoDB is running: `mongosh` (should connect)
- Verify `MONGODB_URI` in `.env.local`
- For Atlas: Check IP whitelist and credentials

### Empty Data on Pages

**Error**: "No data found" messages

**Solution**:
\`\`\`bash

# Re-run the seed script

npm run seed
\`\`\`

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
\`\`\`bash

# Kill the process or use a different port

PORT=3001 npm run dev
\`\`\`

## Next Steps

### Customize Your Installation

1. **Modify Schemas**: Edit files in `lib/models/` to match your needs
2. **Add Fields**: Update Mongoose models and UI components
3. **Create Reports**: Build custom analytics in the Reports module
4. **Configure Workflows**: Set up approval rules in Admin settings

### Deploy to Production

See [README.md](./README.md#deployment) for deployment instructions.

### Need Help?

- Check [README.md](./README.md) for detailed documentation
- Review the code in `lib/actions/` to understand data operations
- Explore the UI components in `components/`

## Sample Credentials

The seed script creates sample data with these entities:

- **Suppliers**: Global Office Supplies, APAC Logistics, Cloud Hosting Inc.
- **Requisitions**: REQ-1044 (Pending), REQ-1045 (In Review), etc.
- **Approvals**: 3 pending approvals ready for action
- **Purchase Orders**: PO-10432 (Partially received)
- **Invoices**: INV-10452 (Pending approval)

All data is for demonstration purposes and can be modified or deleted.

---

**Happy Procuring! 🚀**
