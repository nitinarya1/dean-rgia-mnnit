"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import ImageUploader from "@/components/ImageUploader";

const emptyForm = { name: "", designation: "Dean (R G & IA)", department: "", tenure: "", image: "", bio: "", order: 0 };

export default function AdminDeans() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = () => {
    apiGet("/deans").then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiPut(`/deans/${editing}`, form);
        setMsg("Dean updated successfully!");
      } else {
        await apiPost("/deans", form, true);
        setMsg("Dean added successfully!");
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
      name: item.name, 
      designation: item.designation, 
      department: item.department || "", 
      tenure: item.tenure, 
      image: item.image || "", 
      bio: item.bio || "", 
      order: item.order || 0 
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this dean record?")) return;
    try {
      await apiDelete(`/deans/${id}`);
      load();
      setMsg("Dean record deleted!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div>
      {/* Page Header (Optional inside layout) */}
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Manage Dean Directory</h1>

      {msg && (
        <div className={`mb-6 p-4 rounded-xl text-sm border flex items-center gap-3 ${
          msg.startsWith("Error") 
            ? "bg-red-50 text-red-800 border-red-200" 
            : "bg-emerald-50 text-emerald-800 border-emerald-200"
        }`}>
          {msg}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {editing ? "Edit Dean Record" : "Add New Dean"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="Prof. John Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tenure *</label>
            <input type="text" required value={form.tenure} onChange={(e) => setForm({ ...form, tenure: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="01.08.2018 to 31.07.2020" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Designation</label>
            <input type="text" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
            <input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="MNNIT Allahabad" />
          </div>
          <div className="md:col-span-2 grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Photo</label>
              <ImageUploader value={form.image} onChange={(val) => setForm({ ...form, image: val })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Display Order (Sorting)</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Biography</label>
            <textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none" placeholder="Short biography or achievements..." />
          </div>
          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-xl text-sm hover:bg-teal-700 transition-colors shadow-sm">
              {editing ? "Save Changes" : "Add Dean"}
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
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider">Dean Details</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Tenure</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider text-center hidden md:table-cell">Order</th>
                <th className="py-4 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={4} className="text-center py-12 text-slate-500">Loading directory...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-slate-500">No dean records found</td></tr>
              ) : items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-300">
                        <img src={item.image || "/placeholder-professor.svg"} alt={item.name} className="w-full h-full object-cover" onError={(e) => e.target.src = "/placeholder-professor.svg"} />
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold text-sm">{item.name}</p>
                        <p className="text-teal-600 text-xs font-medium">{item.designation}</p>
                        <p className="text-slate-500 text-xs md:hidden mt-1">{item.tenure}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {item.tenure}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center hidden md:table-cell">
                    <span className="text-slate-500 text-sm font-medium">{item.order}</span>
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
