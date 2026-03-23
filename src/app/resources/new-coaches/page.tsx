"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ChevronRight, Users, Target, Award, Briefcase } from "lucide-react";

const guides = [
  { title: "Building Your Coaching Resume", desc: "Learn how to structure your experience, highlight key achievements, and present yourself professionally to hiring committees.", icon: Briefcase, color: "bg-teal-50 text-teal-600" },
  { title: "Networking 101 for Coaches", desc: "How to build meaningful connections at clinics, conventions, and through CoachConnect's platform.", icon: Users, color: "bg-blue-50 text-blue-600" },
  { title: "Understanding the Hiring Cycle", desc: "When positions open, how search firms operate, and how to position yourself for the right opportunity.", icon: Target, color: "bg-purple-50 text-purple-600" },
  { title: "Getting Your First GA Position", desc: "Tips from coaches who've been there — how to stand out when applying for graduate assistant roles.", icon: Award, color: "bg-gold-400/10 text-gold-400" },
];

export default function NewCoachesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">For New Coaches</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Resources and guides to help you launch your coaching career with confidence.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <div key={guide.title} className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl ${guide.color} flex items-center justify-center mb-4`}>
                <guide.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-navy-900 mb-2">{guide.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{guide.desc}</p>
              <span className="text-xs text-teal-600 font-semibold flex items-center gap-1">
                Read Guide <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-teal-500 to-teal-400 rounded-2xl p-8 text-white">
          <h3 className="font-display font-bold text-xl mb-2">Ready to get started?</h3>
          <p className="text-teal-50 text-sm mb-4">Create your CoachConnect profile and start building your coaching network today.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-teal-600 font-display font-semibold text-sm rounded-xl hover:bg-teal-50 transition-all">
            Create Your Profile <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
