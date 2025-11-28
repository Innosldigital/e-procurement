import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-4">
            <span className="text-xl font-bold">EP</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            E-Procurement Suite
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account to get started
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border border-border",
            }
          }}
          redirectUrl="/onboarding"
        />
      </div>
    </div>
  )
}
