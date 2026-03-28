import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-xl w-full text-center space-y-8 animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-center">
            <img src="/mnnitlogo.jpg" alt="MNNIT Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-4">
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-slate-800 drop-shadow-sm">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Page Not Found
          </h2>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return Home
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold rounded-xl shadow-sm transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
