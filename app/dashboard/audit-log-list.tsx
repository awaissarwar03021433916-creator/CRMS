"use client";

import { useEffect, useState } from "react";

type AuditLogRow = {
  id: string;
  userEmail: string;
  action: string;
  entity: string;
  entityId?: string | null;
  createdAt: string;
};

export default function AuditLogList() {
  const [logs, setLogs] = useState<AuditLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/audit", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to load audit logs");
      }
      const data = (await res.json()) as AuditLogRow[];
      setLogs(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading audit logs...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (logs.length === 0) {
    return <p className="text-sm text-gray-500">No audit logs found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">User</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Action</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Entity</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="px-4 py-2 whitespace-nowrap text-gray-900">{log.userEmail}</td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-700">{log.action}</td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-700">{log.entity}</td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
