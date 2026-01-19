import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border border-border",
            },
          }}
          // afterSignInUrl="/onboarding"
          redirectUrl="/after-signin"
        />
      </div>
    </div>
  );
}
