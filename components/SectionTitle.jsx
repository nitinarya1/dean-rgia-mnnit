export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-widest mb-4 border border-teal-100">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
        {title}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mt-6" />
    </div>
  );
}
