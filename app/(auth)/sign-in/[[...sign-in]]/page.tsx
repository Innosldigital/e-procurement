import { SignIn } from "@clerk/nextjs"
import Image from "next/image"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
            <p className="text-gray-600">
              Secure access for procurement officers, suppliers, and administrators.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-100 rounded-lg p-8 lg:p-12">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">ProcureCloud Portal</div>
                    <div className="text-xs text-gray-600">Trusted by public & enterprise buyers</div>
                  </div>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
                  Streamlined e-procurement with end-to-end auditability.
                </h2>
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/vintage-typewriter-with-contract-paper-on-desk.jpg"
                  alt="Contract on typewriter"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                      <span className="text-white font-bold">P</span>
                    </div>
                    <span className="font-semibold text-gray-900">ProcureCloud</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-6">Empowering procurement with transparency and efficiency.</p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign in to your workspace</h3>
                  <p className="text-sm text-gray-600">Use your work email to access tenders, contracts, and approvals.</p>
                </div>

                <SignIn
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none p-0 bg-transparent",
                      formButtonPrimary: "bg-cyan-600 hover:bg-cyan-700 text-white",
                      footerActionLink: "text-cyan-600 hover:text-cyan-700",
                    },
                  }}
                  signUpUrl="/sign-up"
                  afterSignInUrl="/"
                />

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">Need access? Contact your procurement administrator.</p>
                  <p className="text-xs text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Single sign-on supported (OKTA, Azure AD, Google Workspace)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
