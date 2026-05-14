import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Document Unavailable | CRMS by Zyverra Labs",
  description:
    "This legacy document is no longer available following a migration to our new cloud document system.",
};

export default function DocumentUnavailablePage() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-12rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-cyanLight via-white to-white px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-frosted/60 to-transparent blur-2xl"
      />

      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-sky-100 bg-white/90 p-8 shadow-xl shadow-tealBlue/5 backdrop-blur sm:p-12">
          <div className="flex items-center gap-2">
            <span className="inline-flex rounded-md bg-twilight px-2.5 py-1 text-sm font-bold text-tealBlue">
              CRMS
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-tealBlue">
              Demo Environment
            </span>
          </div>

          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cyanLight text-tealBlue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="m9 13 6 6" />
                <path d="m15 13-6 6" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-twilight sm:text-3xl">
                This document is no longer available
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                The file you tried to open was uploaded under our previous
                local-storage system and was not carried over during the recent
                infrastructure upgrade.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-sky-100 bg-cyanLight/40 p-5">
            <h2 className="text-sm font-semibold text-twilight">
              What happened?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              CRMS has migrated from a legacy filesystem-based uploader to a
              modern, cloud-native document store backed by Vercel Blob. Files
              uploaded before the migration lived on ephemeral serverless disk
              and could not be preserved. Every document uploaded after the
              migration is stored durably in the cloud and will continue to be
              available.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-frosted/60 bg-white p-5">
            <h2 className="text-sm font-semibold text-twilight">
              This is a demo environment
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              CRMS is a public demo built by{" "}
              <span className="font-semibold text-tealBlue">Zyverra Labs</span>{" "}
              to showcase a full role-based document workflow. No real customer
              data is affected — this is not a production incident.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-tealBlue px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-twilight focus:outline-none focus:ring-2 focus:ring-tealBlue focus:ring-offset-2"
            >
              Back to dashboard
            </Link>
            <Link
              href="/"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-twilight transition hover:border-tealBlue hover:text-tealBlue focus:outline-none focus:ring-2 focus:ring-tealBlue focus:ring-offset-2"
            >
              Go to homepage
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            New uploads continue to work normally and are stored securely in the
            cloud.
          </p>
        </div>
      </div>
    </main>
  );
}
