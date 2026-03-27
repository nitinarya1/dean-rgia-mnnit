"use client";

import { useRef, useState } from "react";
import { compressImage, formatBytes } from "@/lib/imageUtils";

/**
 * ImageUploader - Replaces text URL input with a file upload button + preview.
 * Now includes automatic image compression.
 * @param {string} value - Current image URL or base64 string
 * @param {function} onChange - Called with new base64 image string
 * @param {string} placeholder - Optional placeholder text
 */
export default function ImageUploader({ value, onChange, placeholder = "No photo selected" }) {
  const inputRef = useRef(null);
  const [compInfo, setCompInfo] = useState(null);
  const [compressing, setCompressing] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Image too large! Please choose an image smaller than 10MB.");
      return;
    }

    setCompressing(true);
    try {
      const result = await compressImage(file, 800, 0.7);
      onChange(result.base64);
      setCompInfo({
        original: formatBytes(result.originalSize),
        compressed: formatBytes(result.compressedSize),
        saved: Math.round((1 - result.compressedSize / result.originalSize) * 100),
      });
    } catch (err) {
      // Fallback to raw file if compression fails
      const reader = new FileReader();
      reader.onloadend = () => onChange(reader.result);
      reader.readAsDataURL(file);
      setCompInfo(null);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Preview */}
      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center">
        {compressing ? (
          <div className="w-6 h-6 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
        ) : value ? (
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      {/* Upload area */}
      <div className="flex-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={compressing}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 transition-colors text-sm font-medium disabled:opacity-60"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {compressing ? "Compressing..." : value ? "Change Photo" : "Upload Photo"}
        </button>
        {value && !compressing && (
          <button
            type="button"
            onClick={() => { onChange(""); setCompInfo(null); }}
            className="mt-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            Remove photo
          </button>
        )}
        {compInfo && (
          <p className="text-xs text-emerald-600 mt-1 font-medium">
            ✓ Compressed: {compInfo.original} → {compInfo.compressed} ({compInfo.saved}% smaller)
          </p>
        )}
        <p className="text-xs text-slate-400 mt-1">Auto-compressed. Up to 10MB input accepted.</p>
      </div>
    </div>
  );
}
