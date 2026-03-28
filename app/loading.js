export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        {/* Pulsing Logo Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-teal-100 rounded-2xl animate-ping opacity-75"></div>
          <div className="relative w-20 h-20 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center justify-center overflow-hidden">
            <img 
              src="/mnnitlogo.jpg" 
              alt="Loading" 
              className="w-full h-full object-contain drop-shadow-sm" 
            />
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold tracking-tight text-lg">
            Loading MNNIT RGIA
            <span className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1 h-1 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1 h-1 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </span>
          </div>
          <p className="text-teal-700 text-xs font-semibold uppercase tracking-widest mt-1 opacity-80">
            Please Wait
          </p>
        </div>
      </div>
    </div>
  );
}
