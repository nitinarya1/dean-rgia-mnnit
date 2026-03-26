"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";

export default function MouPage() {
  const [mous, setMous] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/mous")
      .then(setMous)
      .catch(() => setMous([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative py-24 bg-white border-b border-slate-200">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle 
            title="Memorandum of Understanding" 
            subtitle="Global academic partnerships and collaborations"
          />
        </div>
      </section>

      {/* MoUs List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="space-y-6">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="glass-card p-6 h-32 shimmer" />
               ))}
             </div>
          ) : mous.length === 0 ? (
            <div className="text-center py-24 glass-card">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-slate-500 text-lg">No MoUs found.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {mous.map((mou, index) => (
                <div 
                  key={mou._id}
                  className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:border-teal-300 transition-colors animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
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
