"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, ChevronRight, Search, Shield, BarChart3, Users } from "lucide-react";

const features = [
  { title: "Talent Pipeline Access", desc: "Search our verified database of coaches by sport, level, scheme expertise, and coaching tree lineage.", icon: Search, color: "bg-teal-50 text-teal-600" },
  { title: "Verified Credentials", desc: "Every coach on CoachConnect goes through our verification process — certifications, experience, and references.", icon: Shield, color: "bg-blue-50 text-blue-600" },
  { title: "Analytics & Insights", desc: "Track engagement with your postings, see who's interested, and measure your program's reach.", icon: BarChart3, color: "bg-purple-50 text-purple-600" },
  { title: "Staff Management", desc: "Organize your coaching staff, visualize coaching trees, and manage internal succession planning.", icon: Users, color: "bg-gold-400/10 text-gold-400" },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">For Programs</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Tools and features designed for athletic departments and coaching programs.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-navy-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-display font-bold text-lg text-navy-900 mb-2">Interested in CoachConnect for your program?</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">Contact us to learn about institutional accounts and AD-level tools.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white font-display font-semibold text-sm rounded-xl hover:bg-teal-400 transition-all">
            Get Started <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
