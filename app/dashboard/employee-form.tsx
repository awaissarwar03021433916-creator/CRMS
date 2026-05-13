"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function EmployeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("HR");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, department }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message =
          data?.error ||
          (data?.issues &&
            Object.values(data.issues.fieldErrors || {})
              .flat()
              .join(", ")) ||
          "Failed to create employee";
        throw new Error(message);
      }
      toast.success("Employee created successfully");
      setName("");
      setEmail("");
      setDepartment("HR");
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="emp-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="emp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label
            htmlFor="emp-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="emp-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="employee@example.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="emp-department"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Department
          </label>
          <select
            id="emp-department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          >
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="LAW">LAW</option>
            <option value="STAFF">STAFF</option>
            <option value="CEO">CEO</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-200 hover:bg-indigo-700 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        {loading ? "Creating..." : "Create Employee"}
      </button>
    </form>
  );
}

