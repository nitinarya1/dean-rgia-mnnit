"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";

export default function SouvenirPage() {
  const [souvenirs, setSouvenirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Convocation");
  const [viewPdf, setViewPdf] = useState(null); // URL of PDF to view

  useEffect(() => {
    apiGet("/souvenirs")
      .then(setSouvenirs)
      .catch(() => setSouvenirs([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredSouvenirs = souvenirs.filter(s => (s.category || "Convocation") === activeTab);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="w-1.5 h-5 bg-purple-500 rounded-full" />
          <h1 className="text-lg font-bold text-slate-900">Souvenirs</h1>
          <span className="text-slate-400 text-sm hidden sm:inline">— Convocation and Global Alumni Meet souvenirs</span>
        </div>
      </div>

      {/* Tabs & Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-slate-200/60 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveTab("Convocation")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "Convocation" 
                    ? "bg-white text-teal-700 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Convocation Souvenir
              </button>
              <button
                onClick={() => setActiveTab("Alumni")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "Alumni" 
                    ? "bg-white text-purple-700 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Alumni Souvenir
              </button>
            </div>
          </div>

          {loading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="glass-card h-80 shimmer" />
               ))}
             </div>
          ) : filteredSouvenirs.length === 0 ? (
            <div className="text-center py-24 glass-card">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-slate-500 text-lg">No souvenirs available for this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredSouvenirs.map((item, index) => (
                <div 
                  key={item._id}
                  className="glass-card p-8 flex flex-col group hover:-translate-y-2 transition-all animate-fade-in-up border border-slate-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    activeTab === "Alumni" ? "bg-purple-50 text-purple-600" : "bg-teal-50 text-teal-600"
                  }`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  
                  <div className="mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md mb-3 inline-block ${
                      activeTab === "Alumni" ? "bg-purple-100 text-purple-800" : "bg-teal-100 text-teal-800"
                    }`}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-8 flex-1">
                    {item.description}
                  </p>
                  
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => setViewPdf(item.pdfLink || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors text-center ${
                      activeTab === "Alumni" 
                        ? "bg-purple-600 hover:bg-purple-700 text-white" 
                        : "bg-teal-600 hover:bg-teal-700 text-white"
                      }`}
                    >
                      View
                    </button>
                    <a 
                      href={item.pdfLink || "#"} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors flex items-center justify-center border border-slate-200"
                      title="Download PDF"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inline PDF Viewer Modal */}
      {viewPdf && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900">Souvenir Viewer</h3>
              <button 
                onClick={() => setViewPdf(null)}
                className="text-slate-500 hover:text-slate-900 p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 w-full bg-slate-200 relative">
              {viewPdf === "#" ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                   <svg className="w-16 h-16 mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium text-slate-600">PDF not available</p>
                  <p className="text-sm">The document link for this souvenir is currently empty.</p>
                </div>
              ) : (
                <iframe 
                  src={`${viewPdf}#toolbar=0`} 
                  className="w-full h-full border-none"
                  title="PDF Viewer"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
