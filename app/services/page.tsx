import PublicNavbar from "../components/public-navbar";

const services = [
  {
    icon: "👥",
    title: "Employee Management",
    description:
      "Create, search, edit, and deactivate employee records across departments. Keep your roster clean and up to date.",
  },
  {
    icon: "📁",
    title: "Document Workflow",
    description:
      "Upload PDFs against employees, with size and type validation. Approve or reject with reasons captured for audit.",
  },
  {
    icon: "🛡️",
    title: "Role-Based Access",
    description:
      "Admins, managers, and employees each see only what they should. Permissions are enforced server-side.",
  },
  {
    icon: "🕵️",
    title: "Audit Trail",
    description:
      "Every sensitive action is logged with actor, target, and timestamp — searchable from the admin dashboard.",
  },
  {
    icon: "🔐",
    title: "Secure Authentication",
    description:
      "Credentials are hashed with bcryptjs and sessions managed via JWT. Inactive accounts are blocked from uploads.",
  },
  {
    icon: "📊",
    title: "Live Dashboard",
    description:
      "At-a-glance counts of employees and document approvals so admins know the state of the org instantly.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cyanLight/40">
      <PublicNavbar />
      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Our Services</h1>
          <p className="mx-auto mt-3 max-w-2xl text-cyanLight">
            Everything you need to run an organization&apos;s people and paperwork in one place.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="text-3xl">{s.icon}</div>
              <h2 className="mt-3 text-lg font-semibold text-twilight">{s.title}</h2>
              <p className="mt-2 text-sm text-gray-700">{s.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
