"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real scenario we'd use an endpoint that fetches all past ones.
    // Assuming /announcements on backend gives all active ones, we fetch them here.
    apiGet("/announcements")
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="w-1.5 h-5 bg-red-500 rounded-full" />
          <h1 className="text-lg font-bold text-slate-900">All Announcements</h1>
          <span className="text-slate-400 text-sm hidden sm:inline">— Latest news, events, and notices from Dean RGIA</span>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="space-y-6">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="glass-card h-32 shimmer rounded-2xl" />
               ))}
             </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-2xl">
              <p className="text-slate-500 text-lg">No announcements found at this time.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {announcements.map((ann, index) => (
                <div 
                  key={ann._id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 hover:shadow-md transition-shadow relative overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
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

                    {ann.link && (
                      <div className="shrink-0 pt-1">
                        <a 
                          href={ann.link.startsWith('http') ? ann.link : `https://${ann.link}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
                        >
                          View Details
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
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
