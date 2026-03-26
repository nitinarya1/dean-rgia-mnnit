"use client";

import { useRef } from "react";

/**
 * ImageUploader - Replaces text URL input with a file upload button + preview.
 * @param {string} value - Current image URL or base64 string
 * @param {function} onChange - Called with new base64 image string
 * @param {string} placeholder - Optional placeholder text
 */
export default function ImageUploader({ value, onChange, placeholder = "No photo selected" }) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large! Please choose an image smaller than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result); // base64 data URL
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Preview */}
      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center">
        {value ? (
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
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {value ? "Change Photo" : "Upload Photo"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="mt-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            Remove photo
          </button>
        )}
        <p className="text-xs text-slate-400 mt-1">Max size: 2MB. JPG, PNG, WebP supported.</p>
      </div>
    </div>
  );
}
