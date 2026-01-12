// Simple integration test to verify API endpoint responds
async function run() {
  const origin = process.env.TEST_BASE_URL || 'http://localhost:3000'
  const url = `${origin.replace('http://', 'http://')}/api/bids/submit`

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tenderId: '', payload: {} }),
  })

  if (![200, 400, 401].includes(resp.status)) {
    throw new Error(`Unexpected status: ${resp.status}`)
  }
  console.log('Integration test API communication status', resp.status)
}

run().catch((e) => {
  console.error('Integration test failed:', e)
  process.exit(1)
})