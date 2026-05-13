import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-sky-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-md bg-twilight px-2.5 py-1 text-sm font-bold text-tealBlue">
                CRMS
              </span>
              <span className="text-sm font-semibold text-twilight">
                Company Resource Management System
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              This system is a demo project built by{" "}
              <span className="font-semibold text-tealBlue">Zyverra Labs</span>{" "}
              and is displayed publicly as a demo to website visitors.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-twilight">Explore</h4>
            <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
              <li><Link href="/" className="hover:text-tealBlue">Home</Link></li>
              <li><Link href="/features" className="hover:text-tealBlue">Features</Link></li>
              <li><Link href="/services" className="hover:text-tealBlue">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-tealBlue">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-twilight">Company</h4>
            <ul className="mt-3 space-y-1.5 text-xs text-gray-700">
              <li><Link href="/about" className="hover:text-tealBlue">About</Link></li>
              <li><Link href="/contact" className="hover:text-tealBlue">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-tealBlue">FAQ</Link></li>
              <li><Link href="/testimonials" className="hover:text-tealBlue">Testimonials</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-sky-100 pt-4 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} CRMS Demo &mdash; Built by{" "}
            <span className="font-semibold text-tealBlue">Zyverra Labs</span>.
          </p>
          <p className="italic">For demonstration purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
