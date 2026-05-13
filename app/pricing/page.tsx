import Link from "next/link";
import PublicNavbar from "../components/public-navbar";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with the basics for small teams.",
    features: [
      "Up to 5 employees",
      "10 documents/month",
      "Basic role access",
      "Community support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing organizations that need full workflow control.",
    features: [
      "Unlimited employees",
      "Unlimited documents",
      "Approval workflows",
      "Audit logs",
      "Priority email support",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored for larger teams with compliance needs.",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Custom roles & permissions",
      "Dedicated support",
      "SLA & onboarding",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-cyanLight/40">
      <PublicNavbar />
      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Simple, transparent pricing</h1>
          <p className="mx-auto mt-3 max-w-2xl text-cyanLight">
            Choose a plan that fits your team. Switch anytime.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border bg-white p-8 shadow-sm ${
                plan.highlighted
                  ? "border-tealBlue ring-2 ring-tealBlue/30"
                  : "border-sky-100"
              }`}
            >
              {plan.highlighted && (
                <span className="inline-flex rounded-full bg-tealBlue px-2.5 py-0.5 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h2 className="mt-4 text-xl font-bold text-twilight">{plan.name}</h2>
              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold text-twilight">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-tealBlue">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold ${
                  plan.highlighted
                    ? "bg-tealBlue text-white hover:bg-turquoise"
                    : "border border-tealBlue text-tealBlue hover:bg-tealBlue hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
