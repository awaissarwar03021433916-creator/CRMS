"use client";

import { useEffect, useState } from "react";
import { Role } from "@prisma/client";
import toast from "react-hot-toast";
import { SkeletonRow } from "@/components/ui/skeleton";

type DocumentRow = {
  id: string;
  employeeId: string;
  filePath: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason?: string | null;
  createdAt: string;
  employee?: {
    name: string;
    email: string;
  };
};

type Props = {
  role: Role;
};

export default function DocumentList({ role }: Props) {
  const [docs, setDocs] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("/api/documents");
      if (!res.ok) throw new Error("Failed to load documents");
      const data = (await res.json()) as DocumentRow[];
      setDocs(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const canModerate = role === "ADMIN" || role === "MANAGER";

  const updateStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      setError(null);
      setActionId(id);
      let reason: string | undefined;

      if (status === "REJECTED") {
        const promptValue = window.prompt("Enter rejection reason");
        if (promptValue === null) {
          setActionId(null);
          return;
        }

        reason = promptValue.trim();
        if (!reason) {
          throw new Error("Rejection reason is required");
        }
      }

      const res = await fetch("/api/documents", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, reason }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to update status");
      }

      setDocs((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                status,
                rejectionReason: status === "REJECTED" ? reason ?? null : null,
              }
            : d
        )
      );
      toast.success(`Document ${status.toLowerCase()}`);
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Update failed");
    } finally {
      setActionId(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-md transition duration-200 hover:bg-gray-50 hover:scale-105"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="space-y-2">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {!loading && !error && docs.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <div className="text-3xl">📄</div>
          <p className="mt-2 text-sm font-medium text-gray-700">No documents yet</p>
        </div>
      )}

      {!loading && !error && docs.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Employee Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Employee Email
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Document
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Created At
                </th>
                {canModerate && (
                  <th className="px-4 py-2 text-right font-medium text-gray-700">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {docs.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 font-mono text-xs text-gray-700">
                    {d.employee?.name ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-900">{d.employee?.email ?? "-"}</td>
                  <td className="px-4 py-2 text-gray-900">
                    <a
                      href={`/${d.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 underline"
                    >
                      Open File
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <div className="space-y-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          d.status === "APPROVED"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : d.status === "REJECTED"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-yellow-50 text-yellow-800 border border-yellow-200"
                        }`}
                      >
                        {d.status}
                      </span>
                      {d.status === "REJECTED" && d.rejectionReason && (
                        <p className="text-xs text-red-700">
                          Reason: {d.rejectionReason}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {new Date(d.createdAt).toLocaleString()}
                  </td>
                  {canModerate && (
                    <td className="px-4 py-2 text-right whitespace-nowrap space-x-2">
                      <button
                        type="button"
                        onClick={() => updateStatus(d.id, "APPROVED")}
                        disabled={actionId === d.id || d.status === "APPROVED"}
                        className="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white shadow-md transition duration-200 hover:bg-green-700 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(d.id, "REJECTED")}
                        disabled={actionId === d.id || d.status === "REJECTED"}
                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-md transition duration-200 hover:bg-red-700 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

