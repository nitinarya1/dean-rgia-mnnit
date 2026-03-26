"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import ImageUploader from "@/components/ImageUploader";

const emptyForm = { name: "", role: "", department: "", image: "", profileLink: "" };

export default function AdminTeam() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = () => {
    apiGet("/team").then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiPut(`/team/${editing}`, form);
        setMsg("Team member updated!");
      } else {
        await apiPost("/team", form, true);
        setMsg("Team member added!");
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
    setForm({ name: item.name, role: item.role, department: item.department, image: item.image || "", profileLink: item.profileLink || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await apiDelete(`/team/${id}`);
      load();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Manage Team Members</h1>

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
           <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          {editing ? "Edit Team Member" : "Add Team Member"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role *</label>
            <input type="text" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="Developer" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department *</label>
            <input type="text" required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="Engineering" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Profile Link URL (Optional)</label>
            <input type="url" value={form.profileLink} onChange={(e) => setForm({ ...form, profileLink: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="https://linkedin.com/in/username" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Photo</label>
            <ImageUploader value={form.image} onChange={(val) => setForm({ ...form, image: val })} />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl text-sm hover:bg-teal-700 transition-colors shadow-sm">
              {editing ? "Save Changes" : "Add Member"}
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
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider">Team Member</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Department</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={3} className="text-center py-12 text-slate-500">Loading team...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-12 text-slate-500">No team members found</td></tr>
              ) : items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-300">
                        <img src={item.image || "/placeholder-professor.svg"} alt={item.name} className="w-full h-full object-cover" onError={(e) => e.target.src = "/placeholder-professor.svg"} />
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold text-sm">{item.name}</p>
                        <p className="text-indigo-600 text-xs font-medium">{item.role}</p>
                        <p className="text-slate-500 text-xs sm:hidden mt-1">{item.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden sm:table-cell">
                    <span className="text-slate-600 text-sm">{item.department}</span>
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
