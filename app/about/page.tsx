import Link from "next/link";
import PublicNavbar from "../components/public-navbar";

const stack = [
  "Next.js 14 (App Router)",
  "TypeScript",
  "Prisma + PostgreSQL",
  "NextAuth (JWT)",
  "TailwindCSS",
  "bcrypt",
  "Zod",
  "Framer Motion",
];

const pillars = [
  {
    icon: "🎯",
    title: "Our Mission",
    body: "Give small and mid-sized teams an easy way to manage their people and paperwork without stitching together five tools.",
  },
  {
    icon: "🧭",
    title: "Our Approach",
    body: "Sensible defaults, strict server-side validation, and clear role boundaries. Nothing is hidden behind plugins or premium add-ons.",
  },
  {
    icon: "🤝",
    title: "Our Audience",
    body: "Built for HR teams, operations managers, and admins who need clean workflows and an audit trail they can trust.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cyanLight/40">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl">About CRMS</h1>
          <p className="mx-auto mt-4 max-w-3xl text-cyanLight">
            CRMS is a Company Resource Management System designed to centralise
            employee records, document submissions, and approval workflows
            behind clear, role-based permissions.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-twilight">Why we built this</h2>
          <p className="mt-4 max-w-3xl text-gray-700">
            Most organizations still run their HR processes through email
            threads and shared drives. That works until it doesn&apos;t — when
            something is missed, when audits start, or when a manager needs
            to know what was approved and why. CRMS replaces that mess with a
            simple, secure dashboard.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{p.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-twilight">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-twilight">Built with</h2>
            <p className="mt-3 text-gray-700">
              CRMS is a modern web app built on a focused, well-supported stack
              that any small team can run.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-sky-100 bg-cyanLight/30 px-3 py-2 text-twilight"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-cyanLight/30 p-8">
            <h2 className="text-3xl font-bold text-twilight">Demo project</h2>
            <p className="mt-3 text-gray-700">
              This site is a public <span className="font-semibold">demo build by Zyverra Labs</span>.
              It is intended to show what a clean, role-aware HR/document
              workflow can feel like — not for production data.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-md bg-tealBlue px-5 py-2.5 text-sm font-semibold text-white hover:bg-turquoise"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
