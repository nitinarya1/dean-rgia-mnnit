"use client";

/**
 * ExportButton — converts an array of objects to CSV and downloads it.
 * Pure JS, no external dependencies.
 *
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Base filename (without extension)
 * @param {Array} columns - Optional array of { key, label } to control column order and headers
 * @param {string} label - Optional text to display on the button (defaults to 'Export CSV')
 */
export default function ExportButton({ data, filename = "export", columns, label = "Export CSV", className = "" }) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export.");
      return;
    }

    // Determine columns
    const cols = columns || Object.keys(data[0])
      .filter((k) => !k.startsWith("_") && k !== "__v")
      .map((k) => ({ key: k, label: k.charAt(0).toUpperCase() + k.slice(1) }));

    // Build CSV
    const header = cols.map((c) => `"${c.label}"`).join(",");
    const rows = data.map((row) =>
      cols
        .map((c) => {
          let val = row[c.key] ?? "";
          // Clean up values
          if (typeof val === "boolean") val = val ? "Yes" : "No";
          if (val instanceof Date || (typeof val === "string" && /^\d{4}-\d{2}-\d{2}/.test(val))) {
            try { val = new Date(val).toLocaleDateString(); } catch {}
          }
          // Escape quotes
          val = String(val).replace(/"/g, '""');
          return `"${val}"`;
        })
        .join(",")
    );

    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200 hover:bg-emerald-100 transition-colors ${className}`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {label}
    </button>
  );
}
