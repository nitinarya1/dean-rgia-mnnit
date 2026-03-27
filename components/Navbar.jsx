"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteInfo, navLinks } from "@/data/siteData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 shrink-0 overflow-hidden max-w-[70%] xl:max-w-none">
            {/* MNNIT Logo image (Placeholder from Wikipedia) */}
            <img 
              src="/mnnitlogo.jpg" 
              alt="MNNIT Logo" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain shrink-0"
            />
            {/* Mobile/Tablet Compact View */}
            <div className="xl:hidden">
              <h1 className="text-slate-900 font-bold text-base sm:text-lg md:text-xl tracking-wide leading-tight">
                Dean RGIA
              </h1>
              <p className="text-teal-700 text-[10px] sm:text-xs font-semibold leading-tight tracking-wide">
                MNNIT Allahabad
              </p>
            </div>

            {/* Desktop Full View */}
            <div className="hidden xl:flex flex-col justify-center">
              <h1 className="text-slate-900 font-bold text-[13px] tracking-wide leading-tight">
                Dean, Resource Generation and International Affairs
              </h1>
              <h2 className="text-teal-800 text-[11px] font-bold leading-tight mt-0.5">
                Motilal Nehru National Institute of Technology Allahabad, Prayagraj
              </h2>
              <p className="text-slate-600 text-[11px] font-semibold leading-tight mt-0.5">
                मोतीलाल नेहरू राष्ट्रीय प्रौद्योगिकी संस्थान इलाहाबाद, प्रयागराज
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isAdmin = link.name === "Admin";
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "bg-teal-50 text-teal-700 shadow-sm"
                      : isAdmin
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="h-6 w-px bg-slate-200 mx-2 hidden lg:block" />
            
            <Link
              href="/admin/login"
              className="px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-sm transition-all ml-1"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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

      {/* Mobile Navigation */}
      <div
        className={`xl:hidden transition-all duration-300 overflow-hidden ${
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
    </nav>
  );
}
