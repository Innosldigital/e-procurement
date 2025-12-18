import React from "react";
import {
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  Lock,
  Scale,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700">
            <FileText className="h-3.5 w-3.5" />
            Legal Document
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Terms and Conditions
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Procurement Terms for Innovation SL Platform
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" />
            <div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Important Notice
              </h3>
              <p className="text-sm leading-relaxed text-slate-700">
                By submitting a quotation through the Innovation SL Procurement
                platform, you agree to be bound by these Terms and Conditions.
                Please read them carefully before proceeding.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                  1. General Provisions
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  By submitting a quotation, the bidder agrees to be bound by
                  these Terms and Conditions. Innovation SL reserves the right
                  to accept or reject any bid and is not obligated to award the
                  contract to the lowest-priced bidder.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                  2. Eligibility of Bidders
                </h2>
                <p className="mb-4 text-sm sm:text-base leading-relaxed text-slate-600">
                  Bidders must be legally registered business entities in Sierra
                  Leone. At the time of submission, you may be required to
                  provide:
                </p>
                <ul className="ml-5 space-y-2 text-sm sm:text-base text-slate-600 list-disc">
                  <li>Valid Business Registration Certificate</li>
                  <li>Valid Tax Clearance Certificate (NRA)</li>
                  <li>
                    Proof of experience in the relevant category (Catering,
                    Logistics, etc.)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                  3. Submission of Quotations Format
                </h2>
                <p className="mb-4 text-sm sm:text-base leading-relaxed text-slate-600">
                  All bids must be submitted through the official procurement
                  system. Hard copy or email submissions will not be considered
                  unless explicitly stated.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 font-semibold text-slate-900 text-sm sm:text-base">
                      Deadline
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      Late submissions will be automatically disqualified by the
                      system.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-slate-900 text-sm sm:text-base">
                      Accuracy
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      Bidders are responsible for the accuracy of their pricing.
                      Once the deadline passes, no modifications to the
                      financial proposal will be permitted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                  4. Evaluation and Selection
                </h2>
                <p className="mb-4 text-sm sm:text-base leading-relaxed text-slate-600">
                  Innovation SL will evaluate bids based on a combination of:
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 font-semibold text-slate-900 text-sm sm:text-base">
                      Technical Capacity
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      Ability to meet the specific requirements of the
                      Dare2Aspire program.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-slate-900 text-sm sm:text-base">
                      Financial Value
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      Cost effectiveness and competitive pricing.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-slate-900 text-sm sm:text-base">
                      Delivery Timeliness
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      Ability to provide services within the program's schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 - Warning */}
          <section className="rounded-xl border border-red-200 bg-red-50 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                  5. Ethical Conduct & Anti-Corruption
                </h2>
                <p className="font-medium text-sm sm:text-base leading-relaxed text-slate-900">
                  Any attempt by a bidder to influence the evaluation process or
                  offer inducements to Innovation SL staff will result in
                  immediate disqualification and a ban from future procurement
                  opportunities.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                  6. Award of Contract
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  The successful bidders will be notified via the procurement
                  system or official email. A formal Service Level Agreement
                  (SLA) or Purchase Order (PO) will be issued to the winner,
                  detailing the final scope of work and payment terms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                  7. Confidentiality
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  All information provided by Innovation SL in the procurement
                  portal (e.g., participant numbers, internal schedules) must be
                  treated as confidential and used solely for the purpose of
                  preparing the bid.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                  8. Right to Cancel
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  Innovation SL reserves the right to cancel the procurement
                  process at any time without incurring any liability to the
                  bidders.
                </p>
              </div>
            </div>
          </section>

          {/* Portal Terms */}
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-6 sm:p-8 shadow-sm">
            <h2 className="mb-2 text-xl sm:text-2xl font-bold text-slate-900">
              Website/Portal Terms of Use
            </h2>
            <p className="mb-6 text-sm sm:text-base text-slate-600">
              For the digital procurement system
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="mb-2 text-base sm:text-lg font-semibold text-slate-900">
                  Account Responsibility
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  Bidders are responsible for maintaining the confidentiality of
                  their login credentials.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base sm:text-lg font-semibold text-slate-900">
                  System Availability
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  While we strive for 100% uptime, Innovation SL is not liable
                  for technical failures or internet connectivity issues on the
                  bidder's end during the submission window.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-base sm:text-lg font-semibold text-slate-900">
                  Data Privacy
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  By using this portal, you consent to Innovation SL storing and
                  processing your business data for the purpose of this
                  procurement exercise.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm">
          <h3 className="mb-3 text-lg sm:text-xl font-semibold text-slate-900">
            Questions or Concerns?
          </h3>
          <p className="mb-6 text-sm sm:text-base text-slate-600">
            If you have any questions about these Terms and Conditions, please
            contact our support team.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Contact Support
            </button>
            <button className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
              Return Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
