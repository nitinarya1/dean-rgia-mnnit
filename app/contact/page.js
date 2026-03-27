"use client";

import { useState } from "react";
import { siteInfo } from "@/data/siteData";
import { apiPost } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await apiPost("/contacts", form);
      setStatus({ type: "success", message: "Message sent successfully! We will get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
          <h1 className="text-lg font-bold text-slate-900">Contact Us</h1>
          <span className="text-slate-400 text-sm hidden sm:inline">— Get in touch with the RGIA office</span>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8 animate-slide-in-left">
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Office Address</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{siteInfo.address}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Email Us</p>
                      <a href={`mailto:${siteInfo.email}`} className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                        {siteInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Call Us</p>
                      <p className="text-slate-600 text-sm">{siteInfo.phone}</p>
                      <p className="text-slate-600 text-sm mt-1">{siteInfo.phone2}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Map */}
              <div className="glass-card p-2 h-64 overflow-hidden relative group">
                <iframe 
                  src="https://maps.google.com/maps?q=Motilal%20Nehru%20National%20Institute%20of%20Technology%20Allahabad&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '0.5rem' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  title="MNNIT Allahabad Location Map"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass-card p-8 md:p-12 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h3>
                <p className="text-slate-500 mb-8">Fill out the form below and our team will get back to you.</p>

                {status.message && (
                  <div className={`mb-8 p-4 rounded-xl text-sm flex items-start gap-3 ${
                    status.type === "success" 
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}>
                    <svg className={`w-5 h-5 shrink-0 ${status.type === 'success' ? 'text-emerald-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {status.type === 'success' 
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      }
                    </svg>
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
