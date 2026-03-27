"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { apiGet } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/team")
      .then(setTeamMembers)
      .catch(() => setTeamMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="w-1.5 h-5 bg-teal-500 rounded-full" />
          <h1 className="text-lg font-bold text-slate-900">Our Team</h1>
          <span className="text-slate-400 text-sm hidden sm:inline">— The dedicated professionals leading RGIA initiatives</span>
        </div>
      </div>

      {/* Team Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="glass-card h-80 shimmer" />
               ))}
             </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-24 glass-card">
              <p className="text-slate-500 text-lg">No team members found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member._id}
                  className="glass-card overflow-hidden group hover:-translate-y-2 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-2 bg-gradient-to-r from-teal-400 to-blue-500" />
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-white bg-slate-100 relative group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={member.image || "/placeholder-professor.svg"} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "/placeholder-professor.svg"; }}
                      />
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-teal-600 font-medium text-sm mb-3">{member.role}</p>
                    
                    <div className="w-full pt-4 border-t border-slate-100 mt-2 flex flex-col items-center">
                      <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-3">
                        {member.department}
                      </p>
                      {member.profileLink && (
                        <a 
                          href={member.profileLink.startsWith('http') ? member.profileLink : `https://${member.profileLink}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-600 hover:text-white transition-colors border border-teal-200 hover:border-teal-600 flex items-center gap-1"
                        >
                          View Profile
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
