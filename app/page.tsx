import Link from "next/link";
import PublicNavbar from "./components/public-navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-cyanLight/40">
      <PublicNavbar />
      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Company Resource Management System
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-cyanLight md:text-lg">
            A secure platform to manage employees, documents, and approvals with
            role-based access control.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-md bg-turquoise px-5 py-3 text-sm font-semibold text-twilight hover:bg-frosted"
            >
              Admin Login
            </Link>
            <Link
              href="/features"
              className="rounded-md border border-cyanLight px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16" id="features">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-twilight">Features</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Employee Management",
              "Document Upload",
              "Approval Workflow",
              "Audit Logs",
              "Secure Role Access",
            ].map((feature) => (
              <article
                key={feature}
                className="rounded-xl border border-sky-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">{feature}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16" id="about">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-twilight">About</h2>
          <p className="mt-4 text-gray-700">
            CRMS helps organizations manage employee records, document submissions,
            and approval workflows securely with role-based permissions.
          </p>
        </div>
      </section>

    </main>
  );
}
