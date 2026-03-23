"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GitBranch, Users, Briefcase, Shield, Heart, ChevronRight } from "lucide-react";

const values = [
  { title: "Community First", desc: "We believe coaching is about relationships. Every feature we build strengthens the bonds between coaches.", icon: Users, color: "bg-teal-50 text-teal-600" },
  { title: "Equal Access", desc: "Whether you're at a D1 powerhouse or a NAIA program, every coach deserves the same tools and visibility.", icon: Heart, color: "bg-red-50 text-red-500" },
  { title: "Verified Trust", desc: "Credentials matter. We verify coaching backgrounds so you can trust who you're connecting with.", icon: Shield, color: "bg-blue-50 text-blue-600" },
  { title: "Career Growth", desc: "From your first GA role to a head coaching position, we're here for every step of the journey.", icon: Briefcase, color: "bg-purple-50 text-purple-600" },
];

const stats = [
  { value: "1,200+", label: "Coaches on Platform" },
  { value: "67", label: "Active Opportunities" },
  { value: "15,000+", label: "Connections Made" },
  { value: "48", label: "States Represented" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-navy-900" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">
              Coach<span className="text-teal-400">Connect</span>
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">About CoachConnect</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            CoachConnect is the professional network built exclusively for football and basketball coaches. We connect coaches across all levels — from graduate assistants to head coaches — to share knowledge, find opportunities, and grow their careers.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200/80 p-5 text-center">
              <div className="font-mono text-2xl font-bold text-navy-900">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="font-display font-bold text-xl text-navy-900 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <div className={`w-10 h-10 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-navy-900 mb-2">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 text-white text-center">
          <h3 className="font-display font-bold text-xl mb-2">Join the coaching community</h3>
          <p className="text-slate-300 text-sm mb-4">Build your network, find your next role, and grow as a coach.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white font-display font-semibold text-sm rounded-xl hover:bg-teal-400 transition-all">
            Get Started <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
