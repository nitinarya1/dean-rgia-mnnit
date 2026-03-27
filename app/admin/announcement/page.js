"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";

const emptyForm = { title: "", content: "", link: "", isActive: true, isNew: true };

export default function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = () => {
    // We fetch all including inactive for admin
    apiGet("/announcements/all").then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiPut(`/announcements/${editing}`, form);
        setMsg("Announcement updated!");
      } else {
        await apiPost("/announcements", form, true);
        setMsg("Announcement added!");
      }
      setForm(emptyForm);
      setEditing(null);
      load();
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setForm({ 
      title: item.title, 
      content: item.content || "", 
      link: item.link || "",
      isActive: item.isActive, 
      isNew: item.isNew 
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await apiDelete(`/announcements/${id}`);
      load();
      setMsg("Announcement deleted!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Manage Announcements</h1>

      {msg && (
        <div className={`mb-6 p-4 rounded-xl text-sm border flex items-center gap-3 ${
          msg.startsWith("Error") ? "bg-red-50 text-red-800 border-red-200" : "bg-emerald-50 text-emerald-800 border-emerald-200"
        }`}>
          {msg}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
           <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          {editing ? "Edit Announcement" : "Add Announcement"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Announcement Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="e.g. Annual Convocation Date Announced" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Content / Description</label>
            <textarea rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none" placeholder="Provide details about the announcement..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Link URL (Optional)</label>
            <input type="text" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="example.com/document.pdf or https://example.com" />
          </div>
          
          <div className="flex items-center gap-6 md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
              <span className="text-sm font-medium text-slate-700">Display globally (Active)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="w-5 h-5 text-red-600 rounded border-slate-300 focus:ring-red-500" />
              <span className="text-sm font-medium text-slate-700">Display "NEW" badge</span>
            </label>
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl text-sm hover:bg-teal-700 transition-colors shadow-sm">
              {editing ? "Save Changes" : "Create Announcement"}
            </button>
            {editing && (
              <button type="button" onClick={() => { setForm(emptyForm); setEditing(null); }} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider">Announcement</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={3} className="text-center py-12 text-slate-500">Loading announcements...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-12 text-slate-500">No announcements yet</td></tr>
              ) : items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-slate-900 font-semibold text-sm flex items-center gap-2">
                        {item.title}
                        {item.link && (
                          <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" className="text-blue-500 hover:text-blue-700" title="View Link">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        )}
                      </p>
                      {item.isNew && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs truncate max-w-sm">{item.content}</p>
                    <p className="text-teal-600 text-xs mt-1">{new Date(item.date).toLocaleDateString()}</p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}>
                      {item.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
