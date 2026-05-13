"use client";

import { useCallback, useEffect, useState } from "react";
import { SkeletonRow } from "@/components/ui/skeleton";

type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
};

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search.trim()) {
        params.set("search", search.trim());
      }
      const res = await fetch(`/api/employees?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to load employees");
      }
      const data = (await res.json()) as {
        employees: Employee[];
        totalCount: number;
        page: number;
        totalPages: number;
      };
      setEmployees(data.employees);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [limit, page, search]);
  const runSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };


  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleEdit = async (employee: Employee) => {
    const name = window.prompt("Edit name", employee.name);
    if (name === null) return;

    const email = window.prompt("Edit email", employee.email);
    if (email === null) return;

    const department = window.prompt("Edit department", employee.department);
    if (department === null) return;

    try {
      setActionId(employee.id);
      setError(null);
      const res = await fetch("/api/employees", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: employee.id,
          name: name.trim(),
          email: email.trim(),
          department: department.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to update employee");
      }

      const updated = (await res.json()) as Employee;
      setEmployees((prev) => prev.map((emp) => (emp.id === updated.id ? updated : emp)));
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setActionId(null);
    }
  };

  const handleDeactivate = async (employee: Employee) => {
    if (employee.status === "INACTIVE") return;
    const confirmed = window.confirm(`Deactivate ${employee.name}?`);
    if (!confirmed) return;

    try {
      setActionId(employee.id);
      setError(null);
      const res = await fetch("/api/employees", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: employee.id }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to deactivate employee");
      }

      const updated = (await res.json()) as Employee;
      setEmployees((prev) => prev.map((emp) => (emp.id === updated.id ? updated : emp)));
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        {error}
      </p>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="mt-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Employees</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                runSearch();
              }
            }}
            placeholder="Search by name, email, department"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="button"
            onClick={runSearch}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <div className="text-3xl">👥</div>
          <p className="mt-2 text-sm font-medium text-gray-700">No employees yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Employees
      </h3>
      <div className="mb-3 flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              runSearch();
            }
          }}
          placeholder="Search by name, email, department"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          type="button"
          onClick={runSearch}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-200 hover:bg-indigo-700 hover:scale-105"
        >
          Search
        </button>
      </div>
      <div className="min-h-[420px] flex flex-col justify-between">
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Department
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-right font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 whitespace-nowrap text-gray-900">
                  {emp.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                  {emp.email}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                  {emp.department}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      emp.status === "ACTIVE"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(emp)}
                    disabled={actionId === emp.id}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-md transition duration-200 hover:bg-indigo-700 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeactivate(emp)}
                    disabled={actionId === emp.id || emp.status === "INACTIVE"}
                    className="inline-flex items-center rounded-md bg-gray-700 px-3 py-1.5 text-xs font-medium text-white shadow-md transition duration-200 hover:bg-gray-800 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing page {page} of {totalPages} ({totalCount} total)
          </p>
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md transition duration-200 hover:bg-gray-50 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md transition duration-200 hover:bg-gray-50 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

