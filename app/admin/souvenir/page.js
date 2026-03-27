"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";

const emptyForm = { title: "", year: "", description: "", pdfLink: "", category: "Convocation" };
const categories = ["Convocation", "Alumni"];

export default function AdminSouvenir() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = () => {
    apiGet("/souvenirs").then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiPut(`/souvenirs/${editing}`, form);
        setMsg("Souvenir updated!");
      } else {
        await apiPost("/souvenirs", form, true);
        setMsg("Souvenir added!");
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
      year: item.year, 
      description: item.description, 
      pdfLink: item.pdfLink || "",
      category: item.category || "Convocation" 
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await apiDelete(`/souvenirs/${id}`);
      load();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Manage Souvenirs</h1>

      {msg && (
        <div className={`mb-6 p-4 rounded-xl text-sm border flex items-center gap-3 ${
          msg.startsWith("Error") ? "bg-red-50 text-red-800 border-red-200" : "bg-emerald-50 text-emerald-800 border-emerald-200"
        }`}>
          {msg}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
           <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          {editing ? "Edit Souvenir" : "Add New Souvenir"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="E.g. 19th Annual Convocation 2023" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Year *</label>
            <input type="text" required value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="2023" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category *</label>
            <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">PDF Link / URL</label>
            <input type="text" value={form.pdfLink} onChange={(e) => setForm({ ...form, pdfLink: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="drive.google.com/file/... or https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none" placeholder="Brief description of the souvenir..." />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl text-sm hover:bg-teal-700 transition-colors shadow-sm">
              {editing ? "Save Changes" : "Add Souvenir"}
            </button>
            {editing && (
              <button type="button" onClick={() => { setForm(emptyForm); setEditing(null); }} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider">Souvenir Detail</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell text-center">Category</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={3} className="text-center py-12 text-slate-500">Loading souvenirs...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-12 text-slate-500">No souvenirs found</td></tr>
              ) : items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold border border-slate-200">
                        {item.year}
                      </span>
                      <p className="text-slate-900 font-semibold text-sm">{item.title}</p>
                    </div>
                    <p className="text-slate-500 text-xs truncate max-w-sm mt-2">{item.description}</p>
                    <p className="sm:hidden text-xs font-semibold text-emerald-600 mt-1 uppercase tracking-wider">{item.category}</p>
                  </td>
                  <td className="py-4 px-6 hidden sm:table-cell text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.category === 'Alumni' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-teal-50 text-teal-700 border-teal-200'
                    }`}>
                      {item.category || "Convocation"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors">Delete</button>
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
