import PublicNavbar from "../components/public-navbar";

const testimonials = [
  {
    name: "Sarah Khan",
    role: "HR Manager, Linq Co.",
    initials: "SK",
    quote:
      "CRMS replaced three spreadsheets and a folder of emails. Approvals that used to take days happen in minutes.",
  },
  {
    name: "Daniyal Ahmed",
    role: "IT Lead, Northwave",
    initials: "DA",
    quote:
      "Role-based access was a hard requirement for us. The audit log made our compliance review painless.",
  },
  {
    name: "Maria Lopez",
    role: "Operations, BlueBridge",
    initials: "ML",
    quote:
      "The dashboard is clean and the document workflow is exactly what our team needed. Setup took an afternoon.",
  },
  {
    name: "Hamza Sheikh",
    role: "CEO, Stackform",
    initials: "HS",
    quote:
      "Finally a tool our managers actually use. The approve/reject flow with reasons keeps everyone accountable.",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-cyanLight/40">
      <PublicNavbar />
      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">What teams say</h1>
          <p className="mx-auto mt-3 max-w-2xl text-cyanLight">
            Real feedback from organizations running on CRMS.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"
            >
              <p className="text-base italic text-gray-700">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tealBlue text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-twilight">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
