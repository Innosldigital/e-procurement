import React from "react";
import Link from "next/link";
import {
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  Lock,
  Scale,
  Users,
  ClipboardCheck,
  XCircle,
  Award,
  Eye,
  Globe,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:py-20">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300 bg-white px-5 py-2 text-xs font-semibold text-blue-700 shadow-sm">
            <FileText className="h-4 w-4" />
            LEGAL AGREEMENT
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600">
            Official procurement terms for the Inno-SL Procurement platform.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
            <div className="h-1 w-1 rounded-full bg-slate-400"></div>
            <span>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <div className="h-1 w-1 rounded-full bg-slate-400"></div>
          </div>
        </div>

        {/* Important Notice Banner */}
        <div className="mb-10 overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg">
          <div className="flex gap-4 p-6 sm:p-8">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <AlertCircle className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                ⚠️ Binding Agreement
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                By submitting a quotation through the Inno SL Procurement
                platform, you acknowledge that you have read, understood, and
                agree to be legally bound by these Terms and Conditions. Please
                review carefully before proceeding.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections - Grid Layout */}
        <div className="grid gap-6 lg:gap-8">
          {/* Section 1 */}
          <section className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-1">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-inner">
                    <Scale className="h-7 w-7 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                        1
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        General Provisions
                      </h2>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      By submitting a quotation, the bidder agrees to be bound
                      by these Terms and Conditions. Innovation SL reserves the
                      right to accept or reject any bid and is not obligated to
                      award the contract to the lowest-priced bidder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-1">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 shadow-inner">
                    <Users className="h-7 w-7 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-600 text-xs font-bold text-white">
                        2
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Eligibility of Bidders
                      </h2>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                      Business must be legally registered entities in Sierra
                      Leone. At the time of submission bidders may be required
                      to provide:
                    </p>
                    <div className="mb-5 space-y-2">
                      <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                        <span className="text-sm text-slate-700 sm:text-base">
                          Valid Business Registration Certificate
                        </span>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                        <span className="text-sm text-slate-700 sm:text-base">
                          Valid Tax Clearance Certificate (NRA)
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-inner">
                      <div className="mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                          Additional Local Context Provision
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">
                        Innovation SL may, at its discretion, allow
                        participation of informal or semi-formal suppliers where
                        appropriate, subject to verification and conditional
                        approval.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-inner">
                    <FileText className="h-7 w-7 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-xs font-bold text-white">
                        3
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Submission of Quotations Format
                      </h2>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                      All bids must be submitted through the official Inno SL
                      Procurement System. Hard copy or email submission will not
                      be considered unless explicitly stated.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-4 shadow-sm">
                        <h4 className="mb-2 flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600 text-xs text-white">
                            ⏰
                          </div>
                          Deadline
                        </h4>
                        <p className="text-sm text-slate-700">
                          Late submission will be automatically disqualified by
                          the system.
                        </p>
                      </div>
                      <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-4 shadow-sm">
                        <h4 className="mb-2 flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600 text-xs text-white">
                            ✓
                          </div>
                          Accuracy
                        </h4>
                        <p className="text-sm text-slate-700">
                          Once the deadline passes, no modifications to the
                          financial proposal will be permitted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-1">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 shadow-inner">
                    <ClipboardCheck className="h-7 w-7 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                        4
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Evaluation and Selection
                      </h2>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                      Innovation SL will evaluate bids based on a combination
                      of:
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 shadow-sm">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-600 shadow">
                          <span className="text-lg font-bold text-white">
                            1
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-bold text-slate-900 text-sm sm:text-base">
                            Technical Capacity
                          </h4>
                          <p className="text-sm text-slate-600">
                            Ability to meet the specific requirements of the
                            procurement.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 shadow-sm">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-600 shadow">
                          <span className="text-lg font-bold text-white">
                            2
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-bold text-slate-900 text-sm sm:text-base">
                            Financial Value
                          </h4>
                          <p className="text-sm text-slate-600">
                            Cost effectiveness and competitive pricing.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 shadow-sm">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-600 shadow">
                          <span className="text-lg font-bold text-white">
                            3
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-bold text-slate-900 text-sm sm:text-base">
                            Delivery Timeliness
                          </h4>
                          <p className="text-sm text-slate-600">
                            Ability to provide goods or services within the
                            required schedule.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 - Critical Warning */}
          <section className="group overflow-hidden rounded-2xl border-4 border-red-400 bg-white shadow-2xl transition-all hover:shadow-3xl">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-xl">
                  <AlertCircle className="h-9 w-9 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-red-600">
                      5
                    </span>
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      Ethical Conduct & Anti-Corruption
                    </h2>
                  </div>
                  <div className="rounded-xl border-2 border-white/30 bg-white/10 p-4 backdrop-blur">
                    <p className="font-bold text-sm leading-relaxed text-white sm:text-base">
                      ⚠️ ZERO TOLERANCE POLICY: Any attempt by a bidder to
                      influence the evaluation process or offer inducements to
                      Innovation SL staff will result in immediate
                      disqualification and a permanent ban from future
                      procurement opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 shadow-inner">
                    <Award className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
                        6
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Award of Contract
                      </h2>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                        Successful bidders will be notified via the procurement
                        system or official email.
                      </p>
                      <p className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm leading-relaxed text-slate-700">
                        A formal Service Level Agreement (SLA) or Purchase Order
                        (PO) will be issued, detailing the final scope of work
                        and payment terms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 shadow-inner">
                    <Lock className="h-7 w-7 text-cyan-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 text-xs font-bold text-white">
                        7
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Confidentiality
                      </h2>
                    </div>
                    <div className="rounded-xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
                      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                        <span className="font-semibold text-cyan-900">
                          🔒 Protected Information:
                        </span>{" "}
                        All information provided by Innovation SL in the
                        procurement portal (including internal schedules and
                        participant information) must be treated as confidential
                        and used solely for the purpose of preparing the bid.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-1">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 shadow-inner">
                    <XCircle className="h-7 w-7 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-600 text-xs font-bold text-white">
                        8
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Right to Cancel
                      </h2>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      Innovation SL reserves the right to cancel the procurement
                      process at any time without incurring any liability to
                      bidders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9 - Portal Terms */}
          <section className="group overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-xl transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-xl">
                  <Globe className="h-8 w-8 text-slate-700" />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-700">
                      9
                    </span>
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      Website / Portal Terms of Use
                    </h2>
                  </div>
                  <p className="text-sm text-slate-300">
                    Digital platform guidelines and responsibilities
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-5 shadow-lg">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    Account Responsibility
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Bidders are responsible for maintaining the confidentiality
                    of their login credentials.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-lg">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    System Availability
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Innovation SL shall not be liable for technical failures or
                    connectivity issues during submission.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-lg">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <Eye className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    Data Privacy
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Users consent to data processing for procurement and audit
                    purposes per Sierra Leone law.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-indigo-50 shadow-xl">
          <div className="p-8 text-center sm:p-10">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg shadow-lg">
              <img
                src="/apple-icon.png"
                alt="Inno-SL Procurement"
                className="h-8 w-8 text-white"
              />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-slate-900">
              Need Assistance?
            </h3>
            <p className="mx-auto mb-6 max-w-lg text-sm text-slate-600 sm:text-base">
              Our support team is here to help with any questions about these
              Terms and Conditions or the procurement process.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/onboarding/support"
                className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow"
              >
                Contact Support
              </Link>
              <Link
                href="/onboarding"
                className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow"
              >
                Return to Onboarding
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
