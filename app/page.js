"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiGet } from "@/lib/api";

// Helper to ensure external URLs have https://
function formatUrl(url) {
  if (!url) return "#";
  return url.startsWith("http") ? url : `https://${url}`;
}

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    apiGet("/slideshow").then(setSlides).catch(() => {});
    apiGet("/announcements").then(setAnnouncements).catch(() => {});
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ========== MNNIT-Style: Slideshow LEFT + Announcements RIGHT ========== */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid lg:grid-cols-5 gap-6">

            {/* LEFT: Slideshow with arrows */}
            <div className="lg:col-span-3 relative rounded-xl overflow-hidden bg-slate-900 aspect-[16/10] group">
              {slides.length > 0 ? (
                <>
                  {slides.map((slide, index) => (
                    <div
                      key={slide._id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <img
                        src={slide.imageUrl}
                        alt={slide.caption || "MNNIT RGIA"}
                        className="w-full h-full object-cover"
                      />
                      {/* Caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-semibold text-sm md:text-base drop-shadow">
                          {slide.caption || "Resource Generation & International Affairs"}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Left/Right Arrows */}
                  {slides.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Previous slide"
                      >
                        <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Next slide"
                      >
                        <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Dot indicators */}
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <p className="text-slate-400">Loading slideshow...</p>
                </div>
              )}
            </div>

            {/* RIGHT: Announcements List */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-red-500 text-xs animate-pulse">●</span>
                  ANNOUNCEMENTS
                </h2>
                <Link
                  href="/announcements"
                  className="text-xs text-teal-600 hover:text-teal-800 font-semibold flex items-center gap-1 transition-colors"
                >
                  View All
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="flex-1 border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                  {announcements.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      No announcements yet.
                    </div>
                  ) : (
                    announcements.map((ann) => (
                      <div key={ann._id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                        {ann.link ? (
                          <a
                            href={formatUrl(ann.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-800 hover:text-teal-700 text-sm leading-relaxed transition-colors block group"
                          >
                            <span className="group-hover:underline">{ann.title}</span>
                            {ann.isNew && (
                              <span className="ml-2 inline-block bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase animate-pulse align-middle">
                                New
                              </span>
                            )}
                            <span className="block text-slate-400 text-xs mt-0.5">
                              {new Date(ann.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </a>
                        ) : (
                          <div className="text-slate-800 text-sm leading-relaxed">
                            {ann.title}
                            {ann.isNew && (
                              <span className="ml-2 inline-block bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase animate-pulse align-middle">
                                New
                              </span>
                            )}
                            <span className="block text-slate-400 text-xs mt-0.5">
                              {new Date(ann.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== Quick Links Section (compact) ========== */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            <Link href="/dean-rgia" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Dean RGIA</h3>
              </div>
              <p className="text-slate-500 text-xs">Past and present Deans of RGIA</p>
            </Link>

            <Link href="/publications" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Publications</h3>
              </div>
              <p className="text-slate-500 text-xs">Books and research by our faculty</p>
            </Link>

            <Link href="/souvenir" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Souvenirs</h3>
              </div>
              <p className="text-slate-500 text-xs">Convocation and Alumni Meet souvenirs</p>
            </Link>

            <Link href="/contact" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Contact Us</h3>
              </div>
              <p className="text-slate-500 text-xs">Get in touch with RGIA office</p>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
