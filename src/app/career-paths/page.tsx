"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import {
  GraduationCap,
  ArrowRight,
  ChevronRight,
  Star,
  Target,
  Users,
  Briefcase,
  TrendingUp,
  UserPlus,
  MessageSquare,
  Award,
} from "lucide-react";

const footballPaths = [
  {
    name: "Offensive Track",
    steps: [
      { role: "Student Manager / GA", years: "1–2 yrs", level: "Entry" },
      { role: "Quality Control / Analyst", years: "1–3 yrs", level: "D3/NAIA" },
      { role: "Position Coach (WR/RB/OL)", years: "2–5 yrs", level: "D2/FCS" },
      { role: "Offensive Coordinator / Play Caller", years: "3–7 yrs", level: "FCS/FBS" },
      { role: "Head Coach", years: "5–15 yrs", level: "FBS/P5" },
    ],
  },
  {
    name: "Defensive Track",
    steps: [
      { role: "Student Manager / GA", years: "1–2 yrs", level: "Entry" },
      { role: "Quality Control / Video", years: "1–3 yrs", level: "D3/NAIA" },
      { role: "Position Coach (DB/LB/DL)", years: "2–5 yrs", level: "D2/FCS" },
      { role: "Defensive Coordinator", years: "3–7 yrs", level: "FCS/FBS" },
      { role: "Head Coach", years: "5–15 yrs", level: "FBS/P5" },
    ],
  },
  {
    name: "Operations Track",
    steps: [
      { role: "Student Manager", years: "1–2 yrs", level: "Entry" },
      { role: "Video Coordinator", years: "1–3 yrs", level: "Any" },
      { role: "Director of Football Operations", years: "2–5 yrs", level: "FCS/FBS" },
      { role: "Associate AD / Chief of Staff", years: "3–7 yrs", level: "FBS" },
      { role: "Athletic Director", years: "5–10 yrs", level: "Any" },
    ],
  },
];

const basketballPaths = [
  {
    name: "Coaching Track",
    steps: [
      { role: "Student Manager / GA", years: "1–2 yrs", level: "Entry" },
      { role: "Video Coordinator / Analyst", years: "1–2 yrs", level: "D3/D2" },
      { role: "Assistant Coach", years: "3–5 yrs", level: "D2/Low-Major D1" },
      { role: "Associate Head Coach", years: "3–7 yrs", level: "Mid-Major D1" },
      { role: "Head Coach", years: "5–15 yrs", level: "High-Major D1" },
    ],
  },
  {
    name: "Player Development Track",
    steps: [
      { role: "Skill Trainer / GA", years: "1–2 yrs", level: "Entry" },
      { role: "Director of Player Development", years: "2–4 yrs", level: "D1" },
      { role: "Assistant Coach", years: "3–5 yrs", level: "D1" },
      { role: "Associate Head Coach", years: "3–7 yrs", level: "D1" },
      { role: "Head Coach", years: "5–10 yrs", level: "D1" },
    ],
  },
];

const insights = [
  { icon: Target, title: "Most Common Entry Point", text: "67% of current D1 head coaches started as GAs or student managers" },
  { icon: Users, title: "Network Matters", text: "84% of coaching hires come through existing professional relationships" },
  { icon: TrendingUp, title: "Average Timeline", text: "The median time from GA to first head coaching job is 14 years" },
  { icon: Star, title: "Key Accelerator", text: "Coordinator experience at any level significantly increases HC opportunities" },
];

const mockMentors = [
  { id: "m1", name: "Coach Ray Thompson", initials: "RT", title: "Head Coach, Ohio State", sport: "football", specialty: "Offensive Strategy", experience: "25+ years", match: "95%", reason: "Same coaching tree lineage, overlapping scheme philosophy" },
  { id: "m2", name: "Geno Auriemma", initials: "GA", title: "Head Coach, UConn", sport: "basketball", specialty: "Program Building", experience: "40+ years", match: "88%", reason: "Shared conference connections and player development approach" },
  { id: "m3", name: "Coach Dawn Staley", initials: "DS", title: "Head Coach, South Carolina", sport: "basketball", specialty: "Recruiting & Culture", experience: "20+ years", match: "82%", reason: "Common recruiting region and defensive philosophy" },
  { id: "m4", name: "Coach David Shaw", initials: "DSh", title: "Former HC, Stanford", sport: "football", specialty: "NFL Preparation", experience: "30+ years", match: "79%", reason: "Shared focus on player development and pro-style schemes" },
];

export default function CareerPathsPage() {
  const { showToast } = useToast();
  const [mentorRequested, setMentorRequested] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-400/20 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Career Navigation</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Coaching Career Paths
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Real career maps showing how coaches advance from entry-level roles to head coaching positions.
            Every path is different — these are common progressions based on real coaching careers.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Insights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {insights.map((insight) => (
            <div key={insight.title} className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <insight.icon className="w-5 h-5 text-teal-500 mb-3" />
              <div className="font-display font-bold text-xs text-navy-900 mb-1">{insight.title}</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>

        {/* Football Paths */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">🏈</span>
            <h2 className="font-display text-xl font-bold text-navy-900">Football Coaching Paths</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {footballPaths.map((path) => (
              <div key={path.name} className="bg-white rounded-2xl border border-slate-200/80 p-6">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-5">{path.name}</h3>
                <div className="space-y-0">
                  {path.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${
                          i === path.steps.length - 1 ? "bg-gold-400" : i === 0 ? "bg-teal-500" : "bg-slate-300"
                        }`} />
                        {i < path.steps.length - 1 && <div className="w-px flex-1 bg-slate-200" />}
                      </div>
                      <div className="pb-5">
                        <div className={`text-xs font-bold ${i === path.steps.length - 1 ? "text-gold-400" : "text-navy-900"}`}>
                          {step.role}
                        </div>
                        <div className="text-[10px] text-slate-500">{step.years} · {step.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basketball Paths */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">🏀</span>
            <h2 className="font-display text-xl font-bold text-navy-900">Basketball Coaching Paths</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {basketballPaths.map((path) => (
              <div key={path.name} className="bg-white rounded-2xl border border-slate-200/80 p-6">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-5">{path.name}</h3>
                <div className="space-y-0">
                  {path.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${
                          i === path.steps.length - 1 ? "bg-gold-400" : i === 0 ? "bg-teal-500" : "bg-slate-300"
                        }`} />
                        {i < path.steps.length - 1 && <div className="w-px flex-1 bg-slate-200" />}
                      </div>
                      <div className="pb-5">
                        <div className={`text-xs font-bold ${i === path.steps.length - 1 ? "text-gold-400" : "text-navy-900"}`}>
                          {step.role}
                        </div>
                        <div className="text-[10px] text-slate-500">{step.years} · {step.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship Matching */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-gold-400" />
            <h2 className="font-display text-xl font-bold text-navy-900">Mentorship Matching</h2>
          </div>
          <p className="text-sm text-slate-500 mb-6 max-w-xl">
            Based on your coaching tree, career stage, and philosophy, these experienced coaches are strong mentorship matches.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockMentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-teal-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-400/5 flex items-center justify-center text-gold-400 font-display font-bold text-sm shrink-0">
                    {mentor.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-navy-900">{mentor.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-600 text-[10px] font-bold">{mentor.match} match</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{mentor.title}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{mentor.specialty}</span>
                      <span className="text-[10px] text-slate-400">{mentor.experience}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${mentor.sport === "football" ? "bg-amber-50 text-amber-600" : "bg-orange-50 text-orange-600"}`}>
                        {mentor.sport === "football" ? "🏈" : "🏀"}
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 italic">{mentor.reason}</div>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => { setMentorRequested((p) => ({ ...p, [mentor.id]: true })); showToast(`Mentorship request sent to ${mentor.name}`); }}
                      disabled={mentorRequested[mentor.id]}
                      className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                        mentorRequested[mentor.id]
                          ? "bg-teal-50 text-teal-600 border border-teal-200"
                          : "bg-teal-500 text-white hover:bg-teal-400"
                      }`}
                    >
                      <UserPlus className="w-3 h-3" /> {mentorRequested[mentor.id] ? "Requested" : "Request"}
                    </button>
                    <button
                      onClick={() => showToast(`Opening message to ${mentor.name}...`)}
                      className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      <MessageSquare className="w-3 h-3" /> Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-teal-900 rounded-2xl p-8 text-center text-white">
          <h3 className="font-display text-xl font-bold mb-2">Where are you on the ladder?</h3>
          <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
            Update your profile to reflect your current career stage and let CoachConnect match you with the right opportunities.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/profile" className="px-5 py-2.5 bg-white text-navy-900 font-display font-bold text-sm rounded-xl hover:bg-slate-100 transition-all">
              Update My Profile
            </Link>
            <Link href="/opportunities" className="px-5 py-2.5 bg-white/10 border border-white/20 text-white font-display font-bold text-sm rounded-xl hover:bg-white/20 transition-all">
              Browse Opportunities
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
