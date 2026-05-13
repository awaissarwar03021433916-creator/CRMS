import Link from "next/link";
import PublicNavbar from "../components/public-navbar";

const featureGroups = [
  {
    title: "People",
    items: [
      {
        icon: "👥",
        title: "Employee Management",
        description:
          "Create, search, edit, and deactivate employee records. Keep your roster clean across HR, IT, LAW, STAFF, and CEO departments.",
      },
      {
        icon: "🛡️",
        title: "Role-Based Access",
        description:
          "Three built-in roles — ADMIN, MANAGER, EMPLOYEE — with permissions enforced both on the UI and server.",
      },
      {
        icon: "🔐",
        title: "Secure Authentication",
        description:
          "Passwords are hashed with bcrypt. Sessions use JWT via NextAuth. Inactive employees are blocked automatically.",
      },
    ],
  },
  {
    title: "Documents",
    items: [
      {
        icon: "📁",
        title: "PDF Document Upload",
        description:
          "Upload PDFs against any active employee. Files are validated (type + size) before being stored.",
      },
      {
        icon: "✅",
        title: "Approval Workflow",
        description:
          "Documents move through PENDING → APPROVED / REJECTED. Rejections require a reason that's captured for everyone to see.",
      },
      {
        icon: "🕵️",
        title: "Audit Trail",
        description:
          "Every sensitive action (create, update, approve, reject, deactivate) is recorded with actor, target, and timestamp.",
      },
    ],
  },
  {
    title: "Experience",
    items: [
      {
        icon: "📊",
        title: "Live Dashboard",
        description:
          "Animated stat cards show total employees, active employees, pending and approved documents at a glance.",
      },
      {
        icon: "🔍",
        title: "Search & Pagination",
        description:
          "Find employees by name, email, or department. Lists are paginated so the dashboard stays fast as you scale.",
      },
      {
        icon: "🔔",
        title: "Toast Notifications",
        description:
          "Friendly, non-blocking confirmations and errors via react-hot-toast keep the workflow smooth.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-cyanLight/40">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Everything CRMS does</h1>
          <p className="mx-auto mt-4 max-w-2xl text-cyanLight">
            From employee records to document approvals, CRMS covers the people
            and paperwork side of running an organization — without the
            spreadsheet sprawl.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="rounded-md bg-turquoise px-5 py-3 text-sm font-semibold text-twilight hover:bg-frosted"
            >
              Try the Demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-md border border-cyanLight px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {featureGroups.map((group) => (
        <section key={group.title} className="px-6 py-12 odd:bg-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-twilight">{group.title}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-3 text-lg font-semibold text-twilight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Ready to explore the demo?
          </h2>
          <p className="mt-3 text-cyanLight">
            Sign in with the demo admin credentials on the login page to see
            every feature in action.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-md bg-turquoise px-6 py-3 text-sm font-semibold text-twilight hover:bg-frosted"
          >
            Go to Login
          </Link>
        </div>
      </section>
    </main>
  );
}
