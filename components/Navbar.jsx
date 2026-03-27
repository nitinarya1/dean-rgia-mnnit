"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteInfo, navLinks } from "@/data/siteData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Top Tier: Institutional Logo & Full Name (Visible on lg+) */}
      <div className="hidden lg:block bg-slate-50 border-b border-slate-200 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="flex items-center gap-5 shrink-0 group hover:opacity-90 transition-opacity">
            <img 
              src="/mnnitlogo.jpg" 
              alt="MNNIT Logo" 
              className="w-16 h-16 xl:w-20 xl:h-20 object-contain shrink-0 drop-shadow-sm"
            />
            <div className="flex flex-col justify-center gap-[2px]">
              <h1 className="text-slate-900 font-bold text-[13px] xl:text-[15px] tracking-wide uppercase">
                Dean, Resource Generation and International Affairs
              </h1>
              <h2 className="text-teal-800 font-bold text-xs xl:text-[14px] tracking-wide">
                Motilal Nehru National Institute of Technology Allahabad, Prayagraj
              </h2>
              <p className="text-slate-700 font-semibold text-[11px] xl:text-[13px] tracking-wider">
                मोतीलाल नेहरू राष्ट्रीय प्रौद्योगिकी संस्थान इलाहाबाद, प्रयागराज
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Tier: Navigation Links */}
      <div className="bg-white/95 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Mobile/Tablet Compact Logo (Hidden on lg+) */}
            <Link href="/" className="lg:hidden flex items-center gap-3 shrink-0">
              <img 
                src="/mnnitlogo.jpg" 
                alt="MNNIT Logo" 
                className="w-10 h-10 object-contain shrink-0"
              />
              <div>
                <h1 className="text-slate-900 font-bold text-lg tracking-wide leading-tight">
                  Dean RGIA
                </h1>
                <p className="text-teal-700 text-[10px] font-semibold leading-tight tracking-wide">
                  MNNIT Allahabad
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-wrap">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent
                      ${isActive
                        ? "bg-teal-50 text-teal-800 border-teal-100 shadow-sm"
                        : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Admin Login Button - Desktop (Pushed to Right) */}
            <div className="hidden lg:flex items-center ml-auto">
              <Link
                href="/admin/login"
                className="px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-sm transition-all"
              >
                Admin Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[500px] opacity-100 border-t border-slate-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 space-y-1 bg-white">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="pt-2 mt-2 border-t border-slate-100">
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-bold bg-amber-500 text-white text-center hover:bg-amber-600 shadow-sm transition-all"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
