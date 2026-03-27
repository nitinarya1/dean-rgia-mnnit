"use client";

import { useState, useEffect, useMemo } from "react";
import { apiGet } from "@/lib/api";

export default function MouPage() {
  const [mous, setMous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");

  useEffect(() => {
    apiGet("/mous")
      .then(setMous)
      .catch(() => setMous([]))
      .finally(() => setLoading(false));
  }, []);

  // Extract unique countries for the filter dropdown
  const countries = useMemo(() => {
    const c = [...new Set(mous.map((m) => m.country).filter(Boolean))];
    return c.sort();
  }, [mous]);

  // Filtered MoUs
  const filtered = useMemo(() => {
    let result = mous;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.institution.toLowerCase().includes(q) ||
          (m.description && m.description.toLowerCase().includes(q)) ||
          (m.country && m.country.toLowerCase().includes(q))
      );
    }
    if (countryFilter !== "all") {
      result = result.filter((m) => m.country === countryFilter);
    }
    return result;
  }, [mous, search, countryFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="w-1.5 h-5 bg-emerald-500 rounded-full" />
          <h1 className="text-lg font-bold text-slate-900">Memorandum of Understanding</h1>
          <span className="text-slate-400 text-sm hidden sm:inline">— Global academic partnerships and collaborations</span>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by institution, country, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm"
              />
            </div>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm"
            >
              <option value="all">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          {!loading && (
            <p className="text-slate-500 text-xs mb-4 font-medium">
              {filtered.length} MoU{filtered.length !== 1 ? "s" : ""} found
              {search && ` matching "${search}"`}
              {countryFilter !== "all" && ` in ${countryFilter}`}
            </p>
          )}

          {loading ? (
             <div className="space-y-6">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="glass-card p-6 h-32 shimmer" />
               ))}
             </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 glass-card">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-slate-500 text-lg">
                {search || countryFilter !== "all" ? "No MoUs match your filters." : "No MoUs found."}
              </p>
              {(search || countryFilter !== "all") && (
                <button onClick={() => { setSearch(""); setCountryFilter("all"); }} className="mt-3 text-teal-600 text-sm font-semibold hover:underline">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filtered.map((mou, index) => (
                <div 
                  key={mou._id}
                  className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:border-teal-300 transition-colors animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="bg-teal-50 text-teal-700 text-xs font-bold px-2 py-1 rounded-md border border-teal-100">
                         {mou.country}
                       </span>
                       <span className="text-slate-400 text-sm">Valid from: {new Date(mou.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                      {mou.institution}
                    </h3>
                    <p className="text-slate-600 text-sm">{mou.description}</p>
                  </div>
                  
                  <div className="shrink-0 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-slate-700 font-medium text-sm border bg-white border-slate-200 px-3 py-1.5 rounded-full">
                      {mou.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
