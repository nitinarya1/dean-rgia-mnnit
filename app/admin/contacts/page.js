"use client";

import { useState, useEffect } from "react";
import { apiGet, apiDelete } from "@/lib/api";

export default function AdminContacts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = () => {
    apiGet("/contacts").then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await apiDelete(`/contacts/${id}`);
      load();
      setMsg("Message deleted!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Contact Messages</h1>

      {msg && (
        <div className={`mb-6 p-4 rounded-xl text-sm ${msg.startsWith("Error") ? "bg-red-500/15 border border-red-500/30 text-red-400" : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"}`}>
          {msg}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 h-32 shimmer" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-400 text-lg">No messages yet</p>
          <p className="text-slate-500 text-sm mt-1">Contact form submissions will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-teal-400 text-sm">{item.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs">
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 text-sm">
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-slate-300 text-sm font-medium mb-2">Subject: {item.subject}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{item.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
