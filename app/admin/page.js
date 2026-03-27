"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import ExportButton from "@/components/ExportButton";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    deans: 0,
    announcements: 0,
    slides: 0,
    publications: 0,
    mou: 0,
    team: 0,
    souvenirs: 0,
    messages: 0
  });

  const [allData, setAllData] = useState({
    deans: [],
    announcements: [],
    publications: [],
    mous: [],
    team: [],
    souvenirs: [],
    messages: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [deans, announcements, slides, pubs, mous, team, souvenirs, msgs] = await Promise.all([
          apiGet("/deans").catch(() => []),
          apiGet("/announcements/all").catch(() => []),
          apiGet("/slideshow").catch(() => []),
          apiGet("/publications").catch(() => []),
          apiGet("/mous").catch(() => []),
          apiGet("/team").catch(() => []),
          apiGet("/souvenirs").catch(() => []),
          apiGet("/contacts").catch(() => [])
        ]);

        setStats({
          deans: deans.length,
          announcements: announcements.length,
          slides: slides.length,
          publications: pubs.length,
          mou: mous.length,
          team: team.length,
          souvenirs: souvenirs.length,
          messages: msgs.length
        });

        setAllData({ deans, announcements, publications: pubs, mous, team, souvenirs, messages: msgs });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { title: "Announcements", count: stats.announcements, color: "bg-purple-50 text-purple-600", link: "/admin/announcement" },
    { title: "Slides", count: stats.slides, color: "bg-blue-50 text-blue-600", link: "/admin/slideshow" },
    { title: "Deans", count: stats.deans, color: "bg-teal-50 text-teal-600", link: "/admin/dean" },
    { title: "Team Members", count: stats.team, color: "bg-indigo-50 text-indigo-600", link: "/admin/team" },
    { title: "Publications", count: stats.publications, color: "bg-rose-50 text-rose-600", link: "/admin/publications" },
    { title: "MoUs", count: stats.mou, color: "bg-amber-50 text-amber-600", link: "/admin/mou" },
    { title: "Souvenirs", count: stats.souvenirs, color: "bg-emerald-50 text-emerald-600", link: "/admin/souvenir" },
    { title: "Messages", count: stats.messages, color: "bg-orange-50 text-orange-600", link: "/admin/contact" },
  ];

  // Export column configs
  const exportConfigs = {
    announcements: {
      data: allData.announcements,
      filename: "announcements",
      columns: [
        { key: "title", label: "Title" },
        { key: "content", label: "Content" },
        { key: "link", label: "Link" },
        { key: "date", label: "Date" },
        { key: "isActive", label: "Active" },
      ],
      label: "Export Announcements CSV",
    },
    team: {
      data: allData.team,
      filename: "team_members",
      columns: [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "department", label: "Department" },
        { key: "profileLink", label: "Profile Link" },
      ],
      label: "Export Team Members CSV",
    },
    deans: {
      data: allData.deans,
      filename: "deans",
      columns: [
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "department", label: "Department" },
        { key: "tenure", label: "Tenure" },
        { key: "profileLink", label: "Profile Link" },
      ],
      label: "Export Deans CSV",
    },
    publications: {
      data: allData.publications,
      filename: "publications",
      columns: [
        { key: "title", label: "Title" },
        { key: "author", label: "Author" },
        { key: "description", label: "Description" },
        { key: "link", label: "Link" },
      ],
      label: "Export Publications CSV",
    },
    mous: {
      data: allData.mous,
      filename: "mous",
      columns: [
        { key: "institution", label: "Institution" },
        { key: "country", label: "Country" },
        { key: "date", label: "Date" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status" },
      ],
      label: "Export MoUs CSV",
    },
    souvenirs: {
      data: allData.souvenirs,
      filename: "souvenirs",
      columns: [
        { key: "title", label: "Title" },
        { key: "year", label: "Year" },
        { key: "description", label: "Description" },
        { key: "pdfLink", label: "PDF Link" },
      ],
      label: "Export Souvenirs CSV",
    },
    messages: {
      data: allData.messages,
      filename: "contact_messages",
      columns: [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "subject", label: "Subject" },
        { key: "message", label: "Message" },
        { key: "createdAt", label: "Received On" },
      ],
      label: "Export Messages CSV",
    },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome to RGIA Admin</h1>
        <p className="text-slate-500">Manage all website content, deans, and announcements from one central hub.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] relative overflow-hidden group hover:border-teal-200 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
            </div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-slate-800">{card.count}</span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-slate-500 font-medium text-sm mb-3">{card.title}</h3>
              <Link href={card.link} className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                Manage <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Data Export Section */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Data Backup & Export</h2>
        <p className="text-slate-500 text-sm mb-6">Download any section's data as a CSV file for record-keeping.</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(exportConfigs).map(([key, config]) => (
            <ExportButton
              key={key}
              data={config.data}
              filename={config.filename}
              columns={config.columns}
              label={config.label}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Start Guide</h2>
        <div className="grid md:grid-cols-2 gap-8 text-slate-600">
          <div>
             <h3 className="font-semibold text-slate-900 mb-2">1. Homepage Customization</h3>
             <p className="text-sm mb-4">Update the main slideshow images and captions from the <strong>Slideshow</strong> tab. Global urgent news can be added via the <strong>Announcements</strong> tab to show in the scrolling marquee.</p>
             
             <h3 className="font-semibold text-slate-900 mb-2">2. Dean Directory</h3>
             <p className="text-sm">Manage the historical list of Deans in the <strong>Deans</strong> section. You can sort them chronologically using the Display Order field.</p>
          </div>
          <div>
             <h3 className="font-semibold text-slate-900 mb-2">3. Team & Publications</h3>
             <p className="text-sm mb-4">Keep your active staff list up to date in the <strong>Team</strong> tab. Published resources and books can be added through the <strong>Publications</strong> tab.</p>
             
             <h3 className="font-semibold text-slate-900 mb-2">4. Support & Feedback</h3>
             <p className="text-sm">Monitor public inquiries sent from the Contact Us page via the <strong>Contacts</strong> tab.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
