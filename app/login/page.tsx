"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const DEMO_EMAIL = "admin@crms.com";
const DEMO_PASSWORD = "admin123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="min-h-[calc(100vh-1px)] flex items-center justify-center bg-gradient-to-br from-cyanLight/60 to-frosted/40 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-sky-100 p-8">
        <div className="text-center">
          <span className="inline-flex rounded-md bg-twilight px-2.5 py-1 text-sm font-bold text-tealBlue">
            CRMS
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-twilight">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Sign in to access the dashboard.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-tealBlue/30 bg-cyanLight/40 p-3 text-xs text-twilight">
          <p className="font-semibold">Demo credentials</p>
          <p className="mt-1">
            Email: <span className="font-mono">{DEMO_EMAIL}</span>
          </p>
          <p>
            Password: <span className="font-mono">{DEMO_PASSWORD}</span>
          </p>
          <button
            type="button"
            onClick={fillDemo}
            className="mt-2 inline-flex items-center rounded-md bg-tealBlue px-3 py-1 text-xs font-semibold text-white hover:bg-turquoise"
          >
            Fill demo credentials
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-twilight mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-sky-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-tealBlue focus:ring-2 focus:ring-tealBlue outline-none"
              placeholder={DEMO_EMAIL}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-twilight mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-sky-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-tealBlue focus:ring-2 focus:ring-tealBlue outline-none"
              placeholder={DEMO_PASSWORD}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center items-center rounded-md bg-tealBlue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-turquoise disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-tealBlue focus:ring-offset-1"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Demo system built by{" "}
          <span className="font-semibold text-tealBlue">Zyverra Labs</span>.
        </p>
      </div>
    </div>
  );
}
