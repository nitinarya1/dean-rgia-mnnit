"use client";

import { useState, useEffect } from "react";
import { apiGet, apiDelete } from "@/lib/api";

const ACTION_COLORS = {
  CREATE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  UPDATE: "bg-blue-50 text-blue-700 border-blue-200",
  DELETE: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminActivity() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const load = () => {
    setLoading(true);
    apiGet("/activity")
      .then(setLogs)
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleClear = async () => {
    if (!confirm("Clear all activity logs? This cannot be undone.")) return;
    await apiDelete("/activity");
    setLogs([]);
  };

  const filtered = filter === "ALL" ? logs : logs.filter(l => l.action === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Activity Log</h1>
        <div className="flex items-center gap-3 flex-wrap">
          {["ALL", "CREATE", "UPDATE", "DELETE"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                filter === f
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-teal-400"
              }`}
            >
              {f}
            </button>
          ))}
          <button
            onClick={load}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-all"
          >
            ↻ Refresh
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-16 text-slate-500">Loading logs...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3>No activity logs</h3>
            <p>Admin actions (create, update, delete) will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Action</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Resource</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Details</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">User</th>
                  <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${ACTION_COLORS[log.action] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{log.resource}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{log.details}</td>
                    <td className="py-3 px-4 text-slate-500">{log.username}</td>
                    <td className="py-3 px-4 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
