import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
])
const isOnboardingRoute = createRouteMatcher([
  '/onboarding(.*)'
])
const isApiRoute = createRouteMatcher([
  '/(api|trpc)(.*)'
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
    const { sessionClaims } = await auth()
    const md = (sessionClaims as any)?.publicMetadata || {}
    const role = String(md?.role || '').toLowerCase()
    const onboarded = md?.onboarded === true
    const isSuperAdmin = role === 'super_admin'
    if (!isSuperAdmin && !onboarded && !isOnboardingRoute(request) && !isApiRoute(request)) {
      const url = new URL('/onboarding', request.url)
      return NextResponse.redirect(url)
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
