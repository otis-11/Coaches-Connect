"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, MapPin, Clock } from "lucide-react";

const openings = [
  { title: "Senior Full-Stack Engineer", team: "Engineering", location: "Remote", type: "Full-time", desc: "Build the features that connect coaches across the country. React, Next.js, TypeScript." },
  { title: "Product Designer", team: "Design", location: "Remote", type: "Full-time", desc: "Design intuitive experiences for coaches navigating their careers." },
  { title: "Community Manager", team: "Operations", location: "Remote", type: "Full-time", desc: "Build and nurture the CoachConnect coaching community across social platforms and events." },
  { title: "Content & Partnerships Lead", team: "Growth", location: "Remote", type: "Full-time", desc: "Partner with coaching organizations, conferences, and media to expand our reach." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">Careers at CoachConnect</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Join our team and help build the future of coaching networks.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {openings.map((job) => (
            <div key={job.title} className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-navy-900 mb-1">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.team}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{job.desc}</p>
                </div>
                <button className="px-4 py-2 bg-teal-500 text-white text-xs font-semibold rounded-lg hover:bg-teal-400 transition-all shrink-0">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
          <h3 className="font-display font-bold text-lg text-navy-900 mb-2">Don&apos;t see a role that fits?</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">We&apos;re always looking for passionate people. Send your resume to <span className="text-teal-600 font-medium">careers@coachconnect.com</span></p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
