import { resourceGenerationContent } from "@/data/siteData";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Resource Generation | RGIA - MNNIT Allahabad",
  description: "Resource Generation initiatives by RGIA, MNNIT Allahabad, Prayagraj",
};

export default function ResourceGenerationPage() {
  const content = resourceGenerationContent;

  return (
    <div className="min-h-screen">
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="w-1.5 h-5 bg-teal-500 rounded-full" />
          <h1 className="text-lg font-bold text-slate-900">Resource Generation</h1>
          <span className="text-slate-400 text-sm hidden sm:inline">— Supporting the growth of MNNIT through resource mobilization</span>
        </div>
      </div>

      {/* Preamble */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="glass-card p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
          <span className="text-teal-600 font-bold">1</span> {/* Changed from teal-400 to teal-600 */}
        </div>
        {/* Changed text-white to text-slate-900 for a dark, professional heading */}
        <h2 className="text-2xl font-bold text-slate-900">Preamble</h2> 
      </div>
      {/* Changed text-slate-300 to text-slate-700 for a darker, high-contrast body text */}
      <p className="text-slate-700 leading-relaxed text-base">
        {content.preamble}
      </p>
    </div>
  </div>
</section>

     {/* Objectives */}
<section className="py-16 bg-slate-50"> 
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
          <span className="text-teal-600 font-bold">2</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Objectives</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {content.objectives.map((obj, i) => (
          <div 
            key={i} 
            className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-200 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
              {String.fromCharCode(105 + i)}
            </span>
            <p className="text-slate-800 text-sm font-medium leading-relaxed">
              {obj}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
{/* Resource Info */}
<section className="py-16 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
          <span className="text-teal-600 font-bold">3</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Resource Generation</h2>
      </div>
      <p className="text-slate-600 leading-relaxed text-base mb-8">
        {content.resourceInfo}
      </p>

      {/* Donation Details */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-100">
        <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Account Details for Donations
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Account Name", value: content.accountDetails.accountName },
            { label: "Bank Name", value: content.accountDetails.bankName },
            { label: "Branch", value: content.accountDetails.branch },
            { label: "Account No.", value: content.accountDetails.accountNo },
            { label: "IFSC Code", value: content.accountDetails.ifscCode },
          ].map((item, i) => (
            <div key={i} className="bg-white/80 rounded-lg p-3 border border-teal-100/50 shadow-sm">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-1">
                {item.label}
              </p>
              <p className="text-slate-900 font-semibold text-sm">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}
