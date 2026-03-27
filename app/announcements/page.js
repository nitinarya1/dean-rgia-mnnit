"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    apiGet("/announcements")
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]))
      .finally(() => setLoading(false));
  }, []);

  // Extract unique years for filter dropdown
  const years = useMemo(() => {
    const y = [...new Set(announcements.map((a) => new Date(a.date).getFullYear()))];
    return y.sort((a, b) => b - a);
  }, [announcements]);

  // Filter announcements
  const filtered = useMemo(() => {
    let result = announcements;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.content && a.content.toLowerCase().includes(q))
      );
    }
    if (yearFilter !== "all") {
      result = result.filter(
        (a) => new Date(a.date).getFullYear() === parseInt(yearFilter)
      );
    }
    return result;
  }, [announcements, search, yearFilter]);

  // Paginate filtered results
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [search, yearFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="w-1.5 h-5 bg-red-500 rounded-full" />
          <h1 className="text-lg font-bold text-slate-900">All Announcements</h1>
          <span className="text-slate-400 text-sm hidden sm:inline">— Latest news, events, and notices from Dean RGIA</span>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search announcements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm"
              />
            </div>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm"
            >
              <option value="all">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          {!loading && (
            <p className="text-slate-500 text-xs mb-4 font-medium">
              Showing {paginated.length} of {filtered.length} announcements
              {search && ` matching "${search}"`}
            </p>
          )}

          {loading ? (
             <div className="space-y-6">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="glass-card h-32 shimmer rounded-2xl" />
               ))}
             </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-2xl">
              <p className="text-slate-500 text-lg">
                {search || yearFilter !== "all" ? "No announcements match your filters." : "No announcements found at this time."}
              </p>
              {(search || yearFilter !== "all") && (
                <button onClick={() => { setSearch(""); setYearFilter("all"); }} className="mt-3 text-teal-600 text-sm font-semibold hover:underline">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {paginated.map((ann, index) => {
                  const url = ann.link ? (ann.link.startsWith('http') ? ann.link : `https://${ann.link}`) : null;
                  return (
                  <div 
                    key={ann._id}
                    className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 hover:shadow-md transition-shadow relative overflow-hidden animate-fade-in-up ${url ? 'cursor-pointer hover:border-teal-300' : ''}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => { if (url) window.open(url, '_blank', 'noopener,noreferrer'); }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-500" />
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-semibold tracking-wide text-teal-600 uppercase">
                            {new Date(ann.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                          {ann.isNew && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase animate-pulse">
                              New
                            </span>
                          )}
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                          {ann.title}
                        </h2>
                        
                        {ann.content && (
                          <p className="text-slate-600 leading-relaxed mb-5">
                            {ann.content}
                          </p>
                        )}
                      </div>

                      {url && (
                        <div className="shrink-0 pt-1">
                          <span className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
                            Open Link
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    ← Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                      .map((p, idx, arr) => (
                        <span key={p}>
                          {idx > 0 && arr[idx - 1] !== p - 1 && (
                            <span className="text-slate-400 px-1">…</span>
                          )}
                          <button
                            onClick={() => setPage(p)}
                            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                              p === page
                                ? "bg-teal-600 text-white shadow-sm"
                                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {p}
                          </button>
                        </span>
                      ))}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
