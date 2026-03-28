"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isLoggedIn, logout } from "@/lib/api";

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { name: "Announcements", href: "/admin/announcement", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
  { name: "Slideshow", href: "/admin/slideshow", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { name: "Deans", href: "/admin/dean", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { name: "Team", href: "/admin/team", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { name: "Publications", href: "/admin/publications", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { name: "MoU", href: "/admin/mou", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { name: "Souvenir", href: "/admin/souvenir", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
  { name: "Contacts", href: "/admin/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setAuthChecked(true);
      return;
    }
    
    if (!isLoggedIn()) {
      router.push("/admin/login");
    } else {
      setAuthChecked(true);
    }

    // Secure logout on tab close or page refresh
    const handleUnload = () => {
      if (isLoggedIn()) {
        sessionStorage.setItem("refresh_logout", "Logged out for privacy and security reasons due to page refresh.");
        logout();
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [pathname, router]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  // Implement 2-minute activity timeout (MUST BE ABOVE EARLY RETURNS)
  useEffect(() => {
    if (!authChecked || pathname === "/admin/login") return;

    let timeoutId;
    const TIMEOUT_DURATION = 2 * 60 * 1000; // 2 minutes

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLogout();
      }, TIMEOUT_DURATION);
    };

    // Events that indicate user activity
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    
    // Also reset or handle visibility change (tab change)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // start timer when hidden, or keep it running
        resetTimer();
      } else {
        resetTimer();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial start
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [authChecked, pathname, router]);

  if (!authChecked) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Light Theme */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col shrink-0 z-20">
        <div className="h-20 flex items-center px-6 border-b border-slate-200 shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100">
              <span className="text-teal-600 font-bold">R</span>
            </div>
            <span className="text-slate-900 font-bold tracking-wide">RGIA Admin</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? "admin-link-active" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full relative">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center px-8 justify-between shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            {adminLinks.find(l => l.href === pathname)?.name || "Dashboard"} Management
          </h2>
          <div className="flex items-center gap-4">
            <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full border border-teal-100">
              Admin Session Active
            </span>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-8 pb-32">
          {children}
        </div>
      </main>
    </div>
  );
}
