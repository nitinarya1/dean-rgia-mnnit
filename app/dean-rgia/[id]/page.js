"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiGet } from "@/lib/api";

export default function DeanProfile() {
  const params = useParams();
  const router = useRouter();
  const [dean, setDean] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/deans/${params.id}`)
      .then(setDean)
      .catch((err) => {
        console.error(err);
        router.push("/dean-rgia"); // redirect to list if not found
      })
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-24 px-4">
        <div className="max-w-4xl mx-auto glass-card h-[60vh] shimmer" />
      </div>
    );
  }

  if (!dean) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/dean-rgia" 
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Directory
        </Link>

        <div className="glass-card overflow-hidden animate-fade-in-up">
          <div className="h-32 md:h-48 bg-teal-800 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-teal-700 opacity-90" />
            <div className="absolute inset-0 hero-pattern opacity-30" />
          </div>
          
          <div className="px-6 md:px-12 pb-12">
            <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-end -mt-16 md:-mt-24 mb-8">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white shrink-0 z-10">
                <img 
                  src={dean.image || "/placeholder-professor.svg"} 
                  alt={dean.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "/placeholder-professor.svg"; }}
                />
              </div>
              <div className="flex-1 pt-16 md:pt-0 z-10">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">{dean.name}</h1>
                <p className="text-xl text-teal-700 font-medium mb-2">{dean.designation}</p>
                {dean.department && (
                  <p className="text-slate-600 text-sm">{dean.department}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Biography & Contributions
                  </h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {dean.bio || "No biography details available for this profile."}
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Tenure Information</h3>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Service Period</p>
                      <p className="text-slate-900 font-medium text-sm">{dean.tenure}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
