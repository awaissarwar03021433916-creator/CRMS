"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function DocumentForm() {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!file) {
        throw new Error("Upload failed");
      }

      const formData = new FormData();
      formData.append("email", email.trim());
      formData.append("file", file);

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message =
          data?.error ||
          (data?.issues &&
            Object.values(data.issues.fieldErrors || {})
              .flat()
              .join(", ")) ||
          "Upload failed";
        throw new Error(message);
      }

      toast.success("Document uploaded successfully");
      window.location.reload();
      setEmail("");
      setFile(null);
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="doc-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Employee Email
            </label>
            <input
              id="doc-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="employee@gmail.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="doc-file"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload File
            </label>
            <input
              id="doc-file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-200 hover:bg-indigo-700 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
    </div>
  );
}

