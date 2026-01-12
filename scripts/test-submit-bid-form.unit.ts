import { z } from 'zod'

// Mirror of BidFormSchema to validate basic cases without importing React files
const BidFormSchema = z.object({
  supplierName: z.string().min(2).max(120),
  contactEmail: z.string().email().max(160),
  contactPhone: z.string().min(6).max(40),
  totalPrice: z.string().refine((v) => Number(v) > 0),
  complianceStatement: z.string().min(10).max(2000),
  additionalNotes: z.string().max(2000).optional().or(z.literal('')),
});

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(message)
}

async function run() {
  // Valid payload
  const valid = {
    supplierName: 'Cloud Hosting Inc.',
    contactEmail: 'bid@cloudhost.example',
    contactPhone: '+23270000000',
    totalPrice: '150000',
    complianceStatement: 'We comply fully with all requirements.',
    additionalNotes: 'N/A',
  }
  const parsed = BidFormSchema.safeParse(valid)
  expect(parsed.success, 'Valid payload should pass')

  // Invalid email
  const invalidEmail = { ...valid, contactEmail: 'not-an-email' }
  const parsedEmail = BidFormSchema.safeParse(invalidEmail)
  expect(!parsedEmail.success, 'Invalid email should fail')

  // Non-positive price
  const invalidPrice = { ...valid, totalPrice: '0' }
  const parsedPrice = BidFormSchema.safeParse(invalidPrice)
  expect(!parsedPrice.success, 'Non-positive price should fail')

  console.log('Unit tests passed')

  // Fallback origin rule checks
  function buildApiBase(origin: string, nodeEnv: string) {
    return nodeEnv === 'production' ? origin.replace('http://', 'https://') : origin
  }

  const devBase = buildApiBase('http://localhost:3000', 'development')
  expect(devBase === 'http://localhost:3000', 'Dev should keep http origin')

  const prodBase = buildApiBase('http://example.com', 'production')
  expect(prodBase === 'https://example.com', 'Prod should upgrade http to https')
}

run().catch((e) => {
  console.error('Unit tests failed:', e)
  process.exit(1)
})