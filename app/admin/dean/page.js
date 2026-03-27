"use client";

import { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import ImageUploader from "@/components/ImageUploader";

const emptyForm = { name: "", designation: "Dean (R G & IA)", department: "", tenure: "", image: "", bio: "", profileLink: "", order: 0 };

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
      profileLink: item.profileLink || "",
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

  const handleSeedDeans = async () => {
    if (!confirm("WARNING: This will delete ALL current deans and insert the 10 deans from the official historical list. Are you sure?")) return;
    setLoading(true);
    setMsg("Seeding database... please wait.");
    
    try {
      // 1. Delete all current deans
      for (const item of items) {
        await apiDelete(`/deans/${item._id}`);
      }
      
      // 2. Insert new deans
      const deansList = [
        { order: 10, name: "Prof. M. M. Gore", tenure: "31.12.2025 to Present", designation: "Dean (R G & IA)" },
        { order: 9, name: "Prof. Shubhi Purwar", tenure: "31.12.2023 to 30.12.2025", designation: "Dean (R G & IA)" },
        { order: 8, name: "Prof. Mukul Shukla", tenure: "12.09.2023 to 30.12.2023", designation: "Dean (R G & IA)" },
        { order: 7, name: "Prof. Geetika", tenure: "12.03.2021 to 11.09.2023", designation: "Dean (R G & IA)" },
        { order: 6, name: "Prof. Geetika", tenure: "01.08.2020 to 11.03.2021", designation: "Dean (R G & IA) (अतिरिक्त प्रभार)" },
        { order: 5, name: "Prof. A. K. Singh", tenure: "01.08.2018 to 31.07.2020", designation: "Dean (R G & IA)" },
        { order: 4, name: "Prof. M. M. Gore", tenure: "01.08.2016 to 31.07.2018", designation: "Dean (R G & IA)" },
        { order: 3, name: "Prof. N. D. Pandey", tenure: "01.08.2014 to 31.07.2016", designation: "Dean (R G & IA)" },
        { order: 2, name: "Prof. Dinesh Chandra", tenure: "01.08.2012 to 31.07.2014", designation: "Dean (R G & IA)" },
        { order: 1, name: "Prof. Sudarshan Tiwari", tenure: "11.08.2011 to 31.07.2012", designation: "Dean (R G & IA)" },
      ];

      for (const dean of deansList) {
        await apiPost("/deans", dean, true);
      }
      
      setMsg("Database successfully seeded with 10 deans!");
      load();
    } catch (err) {
      setMsg("Error seeding database: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header (Optional inside layout) */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Manage Dean Directory</h1>
        <button 
          onClick={handleSeedDeans} 
          disabled={loading}
          className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-bold rounded-lg hover:bg-indigo-100 transition-colors"
        >
          {loading ? "Processing..." : "Auto-Fill Historical List"}
        </button>
      </div>

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
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Profile Link URL (Optional)</label>
            <input type="text" value={form.profileLink} onChange={(e) => setForm({ ...form, profileLink: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50" placeholder="example.com/profile or https://example.com" />
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
                        <p className="text-slate-900 font-semibold text-sm flex items-center gap-2">
                          {item.name}
                          {item.profileLink && (
                            <a href={item.profileLink.startsWith('http') ? item.profileLink : `https://${item.profileLink}`} target="_blank" className="text-blue-500 hover:text-blue-700" title="View Profile">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          )}
                        </p>
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
