import PublicNavbar from "../components/public-navbar";

const faqs = [
  {
    q: "How do I log in?",
    a: "Click 'Admin Login' in the top right, enter your email and password. Your administrator provisions accounts.",
  },
  {
    q: "What roles are available?",
    a: "ADMIN, MANAGER, and EMPLOYEE. Admins control employees, documents, users, and audit logs. Managers review documents and view employees. Employees upload their own documents.",
  },
  {
    q: "What file types can I upload?",
    a: "Only PDF files are accepted, and each upload must be under 1MB.",
  },
  {
    q: "How does document approval work?",
    a: "Uploaded documents start as PENDING. Admins or managers approve or reject them. Rejections require a reason that's stored with the document.",
  },
  {
    q: "Can I change a user's role?",
    a: "Yes — admins can change roles inline from the User Management section. The system prevents removing the last admin or demoting yourself.",
  },
  {
    q: "What is the email requirement?",
    a: "All employee and user emails must end with @gmail.com. This is enforced both in the UI and on the server.",
  },
  {
    q: "Is my data secure?",
    a: "Passwords are hashed with bcrypt, sessions use JWT, and all sensitive routes require authentication and role checks.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-cyanLight/40">
      <PublicNavbar />
      <section className="bg-gradient-to-br from-twilight to-tealBlue px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-3 max-w-2xl text-cyanLight">
            Quick answers to the things people ask most.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-sky-100 bg-white p-5 shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-twilight">
                {item.q}
                <span className="ml-4 text-tealBlue transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
