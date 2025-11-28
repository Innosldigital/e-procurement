# E-Procurement Suite

A comprehensive enterprise procurement management system built with Next.js 16, MongoDB, Clerk Authentication, and TypeScript.

## Features

- **Dashboard** - Real-time KPIs, spend tracking, and activity monitoring
- **Requisitions** - Create and manage purchase requisitions with approval workflows
- **Suppliers** - Vendor management, performance tracking, and risk assessment
- **Approvals** - Review and action pending approvals with SLA tracking
- **Purchase Orders** - Track PO issuance, receipts, and invoice matching
- **Invoices** - Manage invoice flow from receipt to payment with 3-way matching
- **Tenders/RFP** - Plan, publish, and evaluate sourcing events
- **Reports** - Analyze spend, compliance, and cycle times
- **Admin** - User management, workflows, integrations, and audit logs

## Tech Stack

- **Framework**: Next.js 16 (App Router with React 19.2)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk for user management and auth
- **UI**: shadcn/ui components with Tailwind CSS v4
- **TypeScript**: Full type safety across the application
- **Server Actions**: All data operations use Next.js server actions

## Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas account)
- Clerk account

### Installation

1. Clone and install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your MongoDB and Clerk credentials:
\`\`\`env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/eprocurement

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
\`\`\`

**Get your Clerk credentials:**
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys from the dashboard

For MongoDB Atlas:
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eprocurement?retryWrites=true&w=majority
\`\`\`

3. Seed the database with sample data:
\`\`\`bash
npm run seed
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

📖 **Need more help?** See [QUICK_START.md](./QUICK_START.md) for detailed setup instructions.

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

2. Start MongoDB service:
\`\`\`bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - runs as a service automatically
\`\`\`

3. Use the connection string in `.env.local`:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/eprocurement
\`\`\`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0 available)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env.local`

## Authentication Setup

This application uses [Clerk](https://clerk.com) for authentication and user management.

### Setting up Clerk

1. Create a free account at [clerk.com](https://clerk.com)

2. Create a new application in the Clerk Dashboard

3. Copy your API keys:
   - Go to **API Keys** in the sidebar
   - Copy the **Publishable Key** and **Secret Key**
   - Add them to your `.env.local` file

4. Configure allowed redirect URLs (if deploying):
   - Go to **Paths** in the sidebar
   - Add your production URL to allowed domains

### Authentication Features

- **Sign In/Sign Up**: Pre-built authentication forms at `/sign-in` and `/sign-up`
- **Protected Routes**: All application routes require authentication
- **User Management**: User profiles, avatars, and account settings via Clerk
- **Session Management**: Automatic token refresh and secure sessions

### User Roles

User roles and permissions are managed through Clerk's metadata:
- **Procurement Manager**: Full access to all features
- **Approver**: Can review and approve requisitions and POs
- **Requester**: Can create requisitions and view their submissions
- **Finance**: Access to invoices, payments, and financial reports
- **Admin**: System configuration and user management

## Database Schema

The application uses the following MongoDB collections:

- **requisitions** - Purchase requisition records with line items
- **suppliers** - Vendor information and performance data
- **approvals** - Approval queue items with decision context
- **invoices** - Invoice records with matching status
- **purchaseorders** - PO records with receipt tracking
- **tenders** - RFP/RFQ/RFI sourcing events with bids

See the Mongoose models in `lib/models/` for detailed schemas.

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard
│   ├── requisitions/      # Requisitions module
│   ├── suppliers/         # Suppliers module
│   ├── approvals/         # Approvals module
│   ├── invoices/          # Invoices module
│   ├── purchase-orders/   # Purchase orders module
│   ├── tenders/           # Tenders/RFP module
│   ├── reports/           # Reports & analytics
│   └── admin/             # Admin settings
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation sidebar
│   ├── header.tsx        # Global header
│   └── status-badge.tsx  # Status indicator component
├── lib/                   # Utility functions and configurations
│   ├── actions/          # Server actions for data operations
│   ├── models/           # Mongoose models
│   ├── mongodb.ts        # MongoDB connection
│   └── utils.ts          # Helper functions
└── scripts/              # Database seeding scripts
\`\`\`

## Server Actions

All data operations use Next.js Server Actions located in `lib/actions/`:

- `requisition-actions.ts` - CRUD operations for requisitions
- `supplier-actions.ts` - Supplier management actions
- `approval-actions.ts` - Approval workflow actions
- `invoice-actions.ts` - Invoice processing actions
- `purchase-order-actions.ts` - PO management actions
- `tender-actions.ts` - Tender/RFP actions

## Environment Variables

Required environment variables:

- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key (public)
- `CLERK_SECRET_KEY` - Clerk secret key (private)

Add these to `.env.local` (never commit this file to git).

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Populate database with sample data
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Make sure to set the `MONGODB_URI`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, and `CLERK_SECRET_KEY` environment variables in your deployment platform.

## Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseServerSelectionError`

**Solutions**:
- Verify MongoDB is running: `mongosh` (should connect)
- Check `MONGODB_URI` in `.env.local`
- For Atlas: Verify IP whitelist and credentials

### Empty Data on Pages

**Issue**: Pages show "No data found"

**Solution**: Run the seed script:
\`\`\`bash
npm run seed
\`\`\`

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**: Use a different port:
\`\`\`bash
PORT=3001 npm run dev
\`\`\`

### Clerk Authentication Issues

**Error**: `Clerk: Missing publishable key`

**Solutions**:
- Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set in `.env.local`
- Restart the dev server after adding environment variables
- Check that the key starts with `pk_test_` or `pk_live_`

**Error**: Redirects not working after sign in

**Solutions**:
- Check `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` in `.env.local`
- Verify middleware configuration in `middleware.ts`
- Clear browser cookies and try again

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
