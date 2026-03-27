"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(username, password);
      router.push("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-900">
      {/* Left side - Image / Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-slate-900 items-center justify-center p-12 overflow-hidden shrink-0">
        {/* Background Image (Uses the primary slideshow image) */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-[url('/home-slides/1.JPG')] bg-cover bg-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-900/90 via-slate-900/90 to-slate-900" />
        
        <div className="relative z-10 w-full max-w-lg text-white">
          <div className="w-20 h-20 mb-10 bg-white rounded-2xl p-2.5 shadow-2xl flex items-center justify-center">
             <img src="/mnnitlogo.jpg" alt="MNNIT Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
            Resource Generation <br/>& International Affairs
          </h1>
          <p className="text-teal-50/90 text-lg leading-relaxed mb-10 border-l-2 border-teal-500/50 pl-5">
            Welcome to the secure administrative portal. Manage global partnerships, institutional directories, and official announcements for MNNIT Allahabad.
          </p>
          <div className="flex items-center gap-3 text-sm font-medium text-teal-200/80 bg-slate-900/50 w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            Secure Connection
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
          <div className="w-full max-w-md animate-fade-in-up">
            
            <div className="lg:hidden text-center mb-10">
               <img src="/mnnitlogo.jpg" alt="MNNIT Logo" className="w-16 h-16 mx-auto mb-4 drop-shadow-sm" />
               <h2 className="text-2xl font-bold text-slate-900 tracking-tight">RGIA Admin Portal</h2>
            </div>
            
            <div className="mb-10 lg:text-left text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Sign in</h2>
              <p className="text-slate-500 font-medium">Please enter your administrative credentials.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3 animate-slide-in-left">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  {error}
                </div>
              )}
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none bg-white py-1 pl-2"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-4 bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 text-white rounded-xl font-bold tracking-wide transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10"
              >
                {loading ? (
                  <>
                     <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                     Authenticating...
                  </>
                ) : (
                  <>
                     Sign In to Dashboard
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-14 pt-8 border-t border-slate-200 flex items-center justify-center">
              <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-700 font-semibold transition-colors group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Return to Public Website
              </a>
            </div>
            
          </div>
      </div>
    </div>
  );
}
