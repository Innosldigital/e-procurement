"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, Zap, FileText, Clock, Eye } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* === HEADER === */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Inno-SL Procurement
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#why"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Why
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Workflow
            </a>
            <a
              href="#trust"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Trust
            </a>
          </nav>
          <Link
            href="/sign-in"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Access Platform
          </Link>
        </div>
      </header>

      {/* === HERO SECTION === */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col">
              <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
                <Shield className="h-3.5 w-3.5 text-accent" />
                Secure e-procurement for Innovation SL
              </div>
              <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-6xl">
                Transform procurement with transparency
              </h1>
              <p className="mb-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                A unified platform for tenders, supplier onboarding, approvals,
                and contracts—designed for Innovation SL and its partners.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sign-up"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Get Started
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-8 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Login / Register
                </Link>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                For Innovation SL teams and approved suppliers only
              </p>
            </div>
            <div className="relative lg:order-last">
              <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
                  alt="Procurement Documents"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === WHY SECTION === */}
      <section id="why" className="border-b border-border/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Why Innovation SL Procurement exists
            </h2>
            <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Built to make every procurement decision traceable, efficient, and
              accountable for Innovation SL and its suppliers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group relative flex flex-col items-start rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Eye className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                Transparency
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Real-time visibility into tenders, bids, and approvals across
                the full lifecycle.
              </p>
            </div>

            <div className="group relative flex flex-col items-start rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                Efficiency
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Standardize workflows and reduce manual paperwork with guided
                digital processes.
              </p>
            </div>

            <div className="group relative flex flex-col items-start rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                Accountability
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Complete audit trail of every action, approval, and document
                change.
              </p>
            </div>

            <div className="group relative flex flex-col items-start rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                Speed of Service
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Accelerate vendor onboarding, tender cycles, and payments
                without compromising controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-b border-border/40 bg-muted/30 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Core platform features
            </h2>
            <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Everything Innovation SL needs to manage suppliers, tenders,
              contracts, and payments securely end-to-end.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Vendor Registration & Management",
                description:
                  "Onboard, verify, and maintain supplier profiles with centralized documentation.",
              },
              {
                title: "Tender Publishing & Supplier Bidding",
                description:
                  "Publish opportunities and collect structured bids from approved suppliers in one place.",
              },
              {
                title: "Automated Approval Workflows",
                description:
                  "Route requests, bids, and contracts through configurable approval paths with clear status.",
              },
              {
                title: "Purchase Orders & Invoicing",
                description:
                  "Generate POs, receive invoices, and link them directly to contracts and deliveries.",
              },
              {
                title: "Audit Trail & Reporting",
                description:
                  "Track every action and surface insights on spend, cycle times, and compliance.",
              },
              {
                title: "Secure Document Handling",
                description:
                  "Store, share, and version contracts with enterprise-grade security.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-md"
              >
                <h3 className="mb-2 text-base font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="border-b border-border/40 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              System workflow overview
            </h2>
            <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
              From vendor registration to payment—every step is tracked,
              approved, and auditable.
            </p>
          </div>

          <div className="mb-12 rounded-xl border border-accent/30 bg-accent/5 px-6 py-4 text-center">
            <p className="text-sm font-medium text-foreground">
              Each step is tracked, approved, and auditable for full compliance
              and control.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "Vendor Registers",
                description: "Supplier submits profile and documents.",
              },
              {
                step: "2",
                title: "Admin Approves",
                description: "Innovation SL team reviews and validates.",
              },
              {
                step: "3",
                title: "Tender Published",
                description: "Innovation SL shares requirements to suppliers.",
              },
              {
                step: "4",
                title: "Supplier Bids",
                description: "Vendors submit proposals and pricing.",
              },
              {
                step: "5",
                title: "Committee Evaluates",
                description: "Evaluation panel reviews and scores bids.",
              },
              {
                step: "6",
                title: "Contract Awarded",
                description: "Winning supplier is selected and contracted.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-lg border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="text-pretty text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex gap-4 rounded-lg border-2 border-accent/30 bg-accent/5 p-6 md:col-span-2 lg:col-span-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                ✓
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">
                  Invoicing & Payments
                </h3>
                <p className="text-pretty text-sm text-muted-foreground">
                  Invoice processed and payments tracked to completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="trust"
        className="border-b border-border/40 bg-muted/30 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Trusted by Innovation SL and partners
            </h2>
            <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Designed in collaboration with Innovation SL teams and aligned
              stakeholders to reflect real-world procurement needs.
            </p>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {[
              "Innovation SL",
              "Government Partners",
              "Development Agencies",
              "Registered Suppliers",
            ].map((partner) => (
              <span
                key={partner}
                className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground"
              >
                {partner}
              </span>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Mariama K.",
                role: "Head of Procurement, Innovation SL",
                badge: "Verified",
                quote:
                  "We now have a single source of truth for every tender, evaluation, and contract decision. It has raised the bar for transparency.",
                color: "from-orange-400 to-orange-600",
              },
              {
                name: "Joseph B.",
                role: "Supplier, Infrastructure Services",
                badge: "Supplier",
                quote:
                  "Submitting bids is straightforward and we can clearly see status updates at every stage of the process.",
                color: "from-blue-400 to-blue-600",
              },
              {
                name: "Hawa S.",
                role: "Compliance & Audit Advisor",
                badge: "Verified",
                quote:
                  "The audit trail and reporting capabilities make it much easier to demonstrate compliance and value for money.",
                color: "from-slate-400 to-slate-600",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-border bg-card p-6"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div
                    className={`h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br ${testimonial.color}`}
                  />
                  <div>
                    <h4 className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <span className="mt-1.5 inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                      {testimonial.badge}
                    </span>
                  </div>
                </div>
                <p className="text-pretty text-sm italic leading-relaxed text-muted-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight lg:text-5xl">
            Ready to streamline procurement?
          </h2>
          <p className="mb-8 text-pretty text-lg leading-relaxed opacity-90">
            Empower Innovation SL teams and suppliers with a secure,
            transparent, and efficient digital workflow.
          </p>
          <p className="mb-8 text-sm opacity-75">
            Access is available to Innovation SL staff and registered supplier
            organizations.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/sign-up"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary-foreground px-8 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary-foreground/90"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex h-11 items-center justify-center rounded-lg border-2 border-primary-foreground/20 bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40 hover:bg-primary/90"
            >
              Login / Register
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">
                  Innovation SL
                </span>
              </div>
              <p className="text-pretty text-sm text-muted-foreground">
                Secure, transparent e-procurement platform for Innovation SL and
                its partners.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Platform
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="transition-colors hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#workflow"
                    className="transition-colors hover:text-foreground"
                  >
                    Workflow
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Support
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Legal
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Innovation SL Procurement. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
