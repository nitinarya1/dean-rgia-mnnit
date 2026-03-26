"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";

export default function DeanList() {
  const [deans, setDeans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/deans")
      .then(setDeans)
      .catch(() => setDeans([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative py-24 bg-white border-b border-slate-200">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle 
            title="Dean RGIA Directory" 
            subtitle="Honoring the leadership and vision of our past and present Deans"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="glass-card h-80 shimmer" />
               ))}
             </div>
          ) : deans.length === 0 ? (
            <div className="text-center py-24 glass-card">
              <p className="text-slate-500 text-lg">No dean records found.</p>
            </div>
          ) : (
            <div>
              {/* Current Dean Section */}
              {(() => {
                const currentDean = deans.find(d => d.tenure && d.tenure.toLowerCase().includes('present')) || deans[deans.length - 1];
                const pastDeans = deans.filter(d => d._id !== currentDean?._id).sort((a,b) => (b.order || 0) - (a.order || 0));

                return (
                  <>
                    {currentDean && (
                      <div className="mb-24">
                        <div className="text-center mb-12 animate-fade-in-up">
                          <h2 className="text-3xl border-b-4 border-teal-500 inline-block pb-3 font-extrabold text-slate-900 tracking-tight">
                            Current Dean, RGIA
                          </h2>
                        </div>
                        <div className="max-w-4xl mx-auto">
                          <Link 
                            href={`/dean-rgia/${currentDean._id}`} 
                            className="bg-white rounded-3xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 animate-fade-in-up flex flex-col md:flex-row items-center relative border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(20,184,166,0.2)]"
                          >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-500 md:hidden" />
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-400 via-emerald-500 to-teal-500 hidden md:block" />
                            
                            <div className="p-10 md:w-2/5 flex justify-center bg-slate-50/50 w-full md:h-full items-center">
                              <div className="w-56 h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-amber-50 group-hover:scale-105 transition-transform duration-500 relative ring-4 ring-teal-100/50">
                                <img 
                                  src={currentDean.image || "/placeholder-professor.svg"} 
                                  alt={currentDean.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { e.target.src = "/placeholder-professor.svg"; }}
                                />
                              </div>
                            </div>
                            <div className="p-8 md:p-12 md:w-3/5 flex flex-col text-center md:text-left flex-1 relative bg-white">
                              <div className="absolute top-8 right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none hidden md:block">
                                <svg className="w-32 h-32 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                              </div>
                              
                              <p className="text-teal-600 font-bold tracking-wider text-sm mb-3 uppercase flex items-center justify-center md:justify-start gap-2">
                                <span className="w-8 h-px bg-teal-600 hidden md:inline-block"></span>
                                {currentDean.designation}
                              </p>
                              <h3 className="text-4xl font-black text-slate-900 mb-6 group-hover:text-teal-700 transition-colors tracking-tight">
                                {currentDean.name}
                              </h3>
                              
                              <div className="space-y-4 mb-8">
                                  <p className="text-slate-600 text-lg leading-relaxed line-clamp-3 font-medium">
                                      {currentDean.bio || "Leading the Resource Generation and International Affairs initiatives at MNNIT Allahabad."}
                                  </p>
                              </div>
                              
                              <div className="mt-auto pt-6 border-t border-slate-100 w-full flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-xl border border-slate-100">
                                  <div className="w-10 h-10 rounded-full bg-teal-100/50 flex items-center justify-center text-teal-600">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                  <div className="text-left">
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Tenure</p>
                                    <p className="text-slate-800 font-bold">{currentDean.tenure}</p>
                                  </div>
                                </div>
                                
                                {currentDean.email && (
                                  <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-xl border border-slate-100">
                                    <div className="w-10 h-10 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-600">
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                    <div className="text-left">
                                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Contact</p>
                                      <p className="text-slate-800 font-bold">{currentDean.email}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Past Deans */}
                    {pastDeans.length > 0 && (
                      <div className="mt-16 sm:mt-24">
                        <div className="text-center mb-12 animate-fade-in-up">
                          <h2 className="text-3xl border-b-4 border-slate-200 inline-block pb-3 font-extrabold text-slate-800 tracking-tight">
                            Past Deans
                          </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                          {pastDeans.map((dean, index) => (
                            <Link 
                              href={`/dean-rgia/${dean._id}`} 
                              key={dean._id}
                              className="glass-card overflow-hidden group hover:-translate-y-2 transition-all duration-300 animate-fade-in-up flex flex-col border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <div className="h-2 bg-gradient-to-r from-slate-300 to-slate-400 group-hover:from-teal-400 group-hover:to-emerald-400 transition-all duration-500" />
                              <div className="p-8 flex flex-col items-center text-center flex-1 bg-white">
                                <div className="w-36 h-36 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md bg-slate-50 group-hover:scale-105 transition-transform duration-500 relative group-hover:shadow-xl">
                                  <img 
                                    src={dean.image || "/placeholder-professor.svg"} 
                                    alt={dean.name}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                    onError={(e) => { e.target.src = "/placeholder-professor.svg"; }}
                                  />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                                  {dean.name}
                                </h3>
                                <p className="text-slate-500 font-medium text-sm mb-4 uppercase tracking-wide group-hover:text-teal-600 transition-colors">{dean.designation}</p>
                                
                                <div className="mt-auto pt-5 border-t border-slate-100 w-full">
                                  <p className="text-slate-600 text-sm font-semibold flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {dean.tenure}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
