"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";

export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/publications")
      .then(setPublications)
      .catch(() => setPublications([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative py-24 bg-white border-b border-slate-200">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            title="Publications"
            subtitle="Books authored by our distinguished alumni and faculty"
          />
        </div>
      </section>

      {/* Publications List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-8 h-44 shimmer" />
              ))}
            </div>
          ) : publications.length === 0 ? (
            <div className="text-center py-24 glass-card">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-slate-500 text-lg">No publications found.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {publications.map((pub, index) => (
                <div
                  key={pub._id}
                  className="glass-card p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start animate-fade-in-up group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Top accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Book Image Placeholder / Actual Image */}
                  <div className="w-full md:w-36 h-48 md:h-52 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                    {pub.image ? (
                      <img src={pub.image} alt={pub.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-blue-50 flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Book Info</p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg uppercase tracking-widest shrink-0 border border-blue-100">
                        Book
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {pub.title}
                    </h3>
                    {pub.link && (
                      <a 
                        href={pub.link.startsWith('http') ? pub.link : `https://${pub.link}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-sm mb-4 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100"
                      >
                        Read / View Book
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                        <img 
                          src="/placeholder-professor.svg" 
                          alt={pub.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-slate-900 text-sm font-medium">{pub.author}</p>
                        <p className="text-slate-500 text-xs">Author</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pub.description}
                    </p>
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
