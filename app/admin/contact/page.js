"use client";

import { useState, useEffect } from "react";
import { apiGet, apiDelete } from "@/lib/api";

export default function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = () => {
    apiGet("/contacts").then(setMessages).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await apiDelete(`/contacts/${id}`);
      load();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Contact Messages</h1>

      {msg && (
        <div className={`mb-6 p-4 rounded-xl text-sm border flex items-center gap-3 ${
          msg.startsWith("Error") ? "bg-red-50 text-red-800 border-red-200" : "bg-emerald-50 text-emerald-800 border-emerald-200"
        }`}>
          {msg}
        </div>
      )}

      {/* List Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
           <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             </svg>
             User Inquiries
           </h2>
           <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
             {messages.length} Total
           </span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No messages found.</div>
          ) : (
            messages.map((item) => (
              <div key={item._id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.subject}</h3>
                    <p className="text-sm font-medium text-slate-600 mt-1">
                      From: <span className="text-slate-900">{item.name}</span> (<a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">{item.email}</a>)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-slate-400 font-medium bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                       {new Date(item.date).toLocaleString()}
                    </span>
                    <button 
                      onClick={() => handleDelete(item._id)} 
                      className="text-slate-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete Message"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-slate-700 text-sm whitespace-pre-wrap">
                  {item.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
