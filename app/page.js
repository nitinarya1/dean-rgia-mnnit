"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch Homepage data
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

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. Slideshow Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden bg-slate-900 group">
        {slides.length > 0 ? (
          <>
            {slides.map((slide, index) => (
              <div
                key={slide._id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-10" />
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
                
                <img
                  src={slide.imageUrl}
                  alt={slide.caption || "MNNIT"}
                  className="w-full h-full object-cover object-center transform scale-105"
                  // A subtle zoom animation could be added here
                />
                
                <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight animate-fade-in-up">
                    {slide.caption || "Resource Generation & International Affairs"}
                  </h1>
                </div>
              </div>
            ))}
            
            {/* Slideshow Controls */}
            <div className="absolute bottom-6 right-6 z-30 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-8 bg-teal-400" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          // Fallback if no slides
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
            <p className="text-slate-500">Loading slideshow...</p>
          </div>
        )}
      </section>

      {/* 2. Announcements Marquee */}
      {announcements.length > 0 && (
        <section className="bg-teal-700 py-3 border-y border-teal-800 relative z-30 overflow-hidden flex items-center shadow-md">
          <div className="px-4 py-1 bg-teal-900 text-teal-100 font-bold text-sm uppercase tracking-wider absolute left-0 z-10 h-full flex items-center shadow-[10px_0_15px_-3px_rgba(0,0,0,0.3)]">
            <span className="animate-pulse mr-2">●</span> Announcements
          </div>
          <div className="flex-1 overflow-hidden ml-40 md:ml-48">
            <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] inline-block text-white">
              {announcements.map((ann, idx) => (
                <span key={ann._id} className="mx-8 inline-flex items-center gap-3">
                  <span className="text-teal-300 text-sm">{new Date(ann.date).toLocaleDateString()}</span>
                  <span className="font-medium text-white">{ann.title}</span>
                  {ann.isNew && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                      New
                    </span>
                  )}
                  {idx < announcements.length - 1 && <span className="mx-4 text-teal-500">•</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Welcome / Info Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle 
            title="Dean RGIA" 
            subtitle="Fostering Global Partnerships & Resource Mobilization" 
          />
          
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Nav Card 1 */}
            <Link href="/dean-rgia" className="glass-card p-8 group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dean RGIA Board</h3>
              <p className="text-slate-600 mb-6">Explore the history and tenure of Deans who have guided our Resource Generation and International Affairs over the years.</p>
              <span className="text-teal-600 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Meet the Deans <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>

            {/* Nav Card 2 */}
            <Link href="/publications" className="glass-card p-8 group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Publications</h3>
              <p className="text-slate-600 mb-6">Discover insightful books and research materials published by our esteemed faculty members and distinguished alumni.</p>
              <span className="text-blue-600 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Read More <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>

            {/* Nav Card 3 */}
            <Link href="/souvenir" className="glass-card p-8 group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Souvenirs</h3>
              <p className="text-slate-600 mb-6">Revisit cherished memories with our Annual Convocation and Global Alumni Meet souvenirs available for download.</p>
              <span className="text-purple-600 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                View Souvenirs <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Keyframes (Added via arbitrary values but defining here is cleaner) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
