import PublicNavbar from "../components/public-navbar";

const channels = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@zyverralabs.demo",
    hint: "We usually reply within one business day.",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+92 300 0000000",
    hint: "Mon – Fri, 9:00 AM to 6:00 PM (PKT).",
  },
  {
    icon: "📍",
    label: "Office",
    value: "Zyverra Labs, Lahore, Pakistan",
    hint: "Remote-first. Visits by appointment only.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cyanLight/40">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-cyanLight">
            Questions about CRMS, the demo, or how to deploy it for your team?
            Reach out — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <article
              key={c.label}
              className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl">{c.icon}</div>
              <h2 className="mt-3 text-sm font-semibold uppercase tracking-wide text-tealBlue">
                {c.label}
              </h2>
              <p className="mt-1 text-base font-semibold text-twilight break-all">
                {c.value}
              </p>
              <p className="mt-2 text-sm text-gray-600">{c.hint}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-twilight">Send us a message</h2>
            <p className="mt-3 text-gray-700">
              Fill in the form and we&apos;ll get back to you shortly. This form
              is for demo purposes and does not deliver mail.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-tealBlue">✓</span>
                Demo access and admin credentials
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tealBlue">✓</span>
                Custom roles or workflow questions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tealBlue">✓</span>
                Deployment and self-hosting help
              </li>
            </ul>
          </div>

          <form className="rounded-2xl border border-sky-100 bg-cyanLight/30 p-6 shadow-sm">
            <div className="grid gap-4">
              <div>
                <label
                  htmlFor="c-name"
                  className="block text-sm font-medium text-twilight mb-1"
                >
                  Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  placeholder="Your name"
                  className="block w-full rounded-md border border-sky-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-tealBlue focus:ring-2 focus:ring-tealBlue outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="c-email"
                  className="block text-sm font-medium text-twilight mb-1"
                >
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="you@example.com"
                  className="block w-full rounded-md border border-sky-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-tealBlue focus:ring-2 focus:ring-tealBlue outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="c-message"
                  className="block text-sm font-medium text-twilight mb-1"
                >
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={4}
                  placeholder="How can we help?"
                  className="block w-full rounded-md border border-sky-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-tealBlue focus:ring-2 focus:ring-tealBlue outline-none"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-tealBlue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-turquoise"
              >
                Send Message
              </button>
              <p className="text-xs text-gray-500">
                Demo form &mdash; submissions are not stored or delivered.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
