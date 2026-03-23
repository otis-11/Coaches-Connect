"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { opportunities } from "@/data/coaches";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  ExternalLink,
  ChevronLeft,
  CheckCircle,
  Users,
  BookOpen,
  Star,
  Share2,
  Bookmark,
  Send,
  Calendar,
  Award,
} from "lucide-react";

// Same external listings from opportunities page
const externalListings = [
  {
    id: "ext-1", title: "Assistant Basketball Coach", institution: "Morehouse College", location: "Atlanta, GA", sport: "basketball", type: "Full-Time", level: "D2", source: "Hoop Dirt", sourceUrl: "https://hoopdirt.com", posted: "2 hours ago",
    description: "Seeking an experienced assistant coach to join the Morehouse College men's basketball program. Responsibilities include recruiting, player development, and game preparation.",
    requirements: ["Bachelor's degree required", "2+ years of college coaching experience", "Strong recruiting network in the Southeast"],
    tags: ["HBCU", "Recruiting", "Player Development"],
    salary: "$45,000 - $55,000",
    deadline: "April 15, 2025",
    contact: "athletics@morehouse.edu",
  },
  {
    id: "ext-2", title: "Defensive Line Coach", institution: "Jacksonville State University", location: "Jacksonville, AL", sport: "football", type: "Full-Time", level: "FBS (CUSA)", source: "Football Scoop", sourceUrl: "https://footballscoop.com", posted: "4 hours ago",
    description: "Jacksonville State is looking for a defensive line coach to develop the DL unit. The ideal candidate will have FBS or FCS experience coaching the defensive front.",
    requirements: ["3+ years coaching defensive line at the college level", "Film breakdown and scheme design experience", "Recruiting responsibilities included"],
    tags: ["FBS", "DL", "Defensive Front"],
    salary: "$60,000 - $75,000",
    deadline: "April 20, 2025",
    contact: "footballops@jsu.edu",
  },
  {
    id: "ext-3", title: "Women's Basketball Graduate Assistant", institution: "Clemson University", location: "Clemson, SC", sport: "basketball", type: "Graduate Assistant", level: "ACC", source: "NCAA", sourceUrl: "https://ncaamarket.ncaa.org", posted: "6 hours ago",
    description: "Clemson women's basketball program is seeking a graduate assistant. This is an excellent entry-level opportunity to learn from a Power 5 coaching staff.",
    requirements: ["Enrollment in Clemson graduate program", "Playing or coaching experience preferred", "Strong work ethic and attention to detail"],
    tags: ["Power 5", "GA", "Women's Basketball"],
    salary: "Stipend + Tuition",
    deadline: "May 1, 2025",
    contact: "wbb@clemson.edu",
  },
  {
    id: "ext-4", title: "Offensive Quality Control", institution: "North Carolina A&T", location: "Greensboro, NC", sport: "football", type: "Full-Time", level: "FCS (CAA)", source: "Football Scoop", sourceUrl: "https://footballscoop.com", posted: "8 hours ago",
    description: "NC A&T football seeks a quality control analyst for the offensive staff. Responsibilities include film breakdown, opponent scouting, and practice preparation.",
    requirements: ["Bachelor's degree required", "Experience with Hudl or similar video platforms", "Knowledge of spread offensive systems"],
    tags: ["HBCU", "QC", "Offense"],
    salary: "$35,000 - $42,000",
    deadline: "April 10, 2025",
    contact: "football@ncat.edu",
  },
  {
    id: "ext-5", title: "Head Men's Basketball Coach", institution: "Lincoln University", location: "Jefferson City, MO", sport: "basketball", type: "Full-Time", level: "D2", source: "Hoop Dirt", sourceUrl: "https://hoopdirt.com", posted: "1 day ago",
    description: "Lincoln University is conducting a national search for their next head men's basketball coach. Looking for a visionary leader to build a competitive D2 program.",
    requirements: ["5+ years of head coaching or associate head coaching experience", "Proven track record of player development and academic success", "Strong ability to recruit student-athletes"],
    tags: ["Head Coach", "D2", "HBCU"],
    salary: "$65,000 - $80,000",
    deadline: "April 30, 2025",
    contact: "search@lincolnu.edu",
  },
  {
    id: "ext-6", title: "Wide Receivers Coach", institution: "Coastal Carolina University", location: "Conway, SC", sport: "football", type: "Full-Time", level: "FBS (Sun Belt)", source: "D1Ticker", sourceUrl: "https://d1ticker.com", posted: "3 hours ago",
    description: "Coastal Carolina football is searching for a wide receivers coach to develop the WR room and contribute to the passing game design. Strong recruiting ties in the Carolinas and Southeast are a plus.",
    requirements: ["2+ years coaching receivers at the college level", "Experience with RPO and spread concepts", "Recruiting responsibilities in the Southeast"],
    tags: ["FBS", "WR Coach", "Sun Belt"],
    salary: "$55,000 - $65,000",
    deadline: "April 25, 2025",
    contact: "football@coastal.edu",
  },
  {
    id: "ext-7", title: "Associate Head Coach — Women's Basketball", institution: "George Mason University", location: "Fairfax, VA", sport: "basketball", type: "Full-Time", level: "Division I (A-10)", source: "CoachingSearch", sourceUrl: "https://coachingsearch.com", posted: "5 hours ago",
    description: "George Mason women's basketball seeks an associate head coach to oversee day-to-day operations, assist with recruiting, and serve as the lead assistant during games.",
    requirements: ["7+ years of D1 coaching experience", "Head coaching or associate HC experience preferred", "Strong recruiting network in the Mid-Atlantic"],
    tags: ["Associate HC", "D1", "Women's Basketball"],
    salary: "$75,000 - $90,000",
    deadline: "May 5, 2025",
    contact: "wbbsearch@gmu.edu",
  },
  {
    id: "ext-8", title: "Safeties Coach / Recruiting Coordinator", institution: "Kennesaw State University", location: "Kennesaw, GA", sport: "football", type: "Full-Time", level: "FBS (CUSA)", source: "Football Scoop", sourceUrl: "https://footballscoop.com", posted: "12 hours ago",
    description: "KSU is looking for a safeties coach who will also serve as the recruiting coordinator. This is a dual-role position requiring strong organizational skills and recruiting acumen in the state of Georgia.",
    requirements: ["4+ years coaching secondary at the college level", "Recruiting coordinator experience preferred", "Knowledge of Cover 3 / pattern-match concepts"],
    tags: ["Safeties", "Recruiting Coordinator", "FBS"],
    salary: "$58,000 - $68,000",
    deadline: "April 18, 2025",
    contact: "footballops@kennesaw.edu",
  },
];

// Enrich internal opportunities with extra detail fields
const allOpportunities = [
  ...opportunities.map((o) => ({
    ...o,
    source: "CoachConnect" as string,
    sourceUrl: "",
    salary: o.type === "Graduate Assistant" ? "Stipend + Tuition" : "$50,000 - $70,000",
    deadline: "Rolling",
    contact: "hiring@coachconnect.com",
  })),
  ...externalListings,
];

export default function OpportunityDetailPage() {
  const params = useParams();
  const { showToast } = useToast();
  const [interested, setInterested] = useState(false);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  const opp = allOpportunities.find((o) => o.id === params.id);

  if (!opp) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-navy-900 mb-2">Opportunity Not Found</h2>
          <p className="text-slate-500 text-sm mb-4">This opportunity may have been filled or removed.</p>
          <Link href="/opportunities" className="text-teal-600 font-semibold text-sm hover:text-teal-500">
            &larr; Back to Opportunities
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similar = allOpportunities
    .filter((o) => o.id !== opp.id && o.sport === opp.sport)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/opportunities" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Opportunities
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{opp.title}</h1>
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                  opp.type === "Graduate Assistant"
                    ? "bg-purple-500/20 text-purple-200 border border-purple-400/30"
                    : "bg-teal-500/20 text-teal-200 border border-teal-400/30"
                }`}>
                  {opp.type}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1.5 text-sm"><Building2 className="w-4 h-4" /> {opp.institution}</span>
                <span className="flex items-center gap-1.5 text-sm"><MapPin className="w-4 h-4" /> {opp.location}</span>
                <span className="flex items-center gap-1.5 text-sm"><Clock className="w-4 h-4" /> Posted {opp.posted}</span>
              </div>
            </div>
            {opp.source !== "CoachConnect" && (
              <span className={`shrink-0 px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 ${
                opp.source === "Hoop Dirt" ? "bg-orange-500/20 text-orange-200" : opp.source === "Football Scoop" ? "bg-blue-500/20 text-blue-200" : opp.source === "D1Ticker" ? "bg-purple-500/20 text-purple-200" : opp.source === "CoachingSearch" ? "bg-amber-500/20 text-amber-200" : "bg-green-500/20 text-green-200"
              }`}>
                <ExternalLink className="w-3 h-3" /> via {opp.source}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">About This Position</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{opp.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Requirements</h3>
              <ul className="space-y-2">
                {opp.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Skills & Tags</h3>
              <div className="flex flex-wrap gap-2">
                {opp.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Application Form */}
            {opp.source === "CoachConnect" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-4">Quick Apply</h3>
                {applied ? (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-teal-50 border border-teal-200">
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                    <div>
                      <div className="text-sm font-semibold text-teal-700">Application Submitted</div>
                      <div className="text-xs text-teal-600">Your profile and resume have been sent to the hiring committee.</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Cover Note</label>
                      <textarea rows={4} placeholder="Briefly introduce yourself and your interest in this position..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/30 transition-all" />
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { setApplied(true); showToast("Application submitted successfully!"); }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-display font-semibold text-sm rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all shadow-sm"
                      >
                        <Send className="w-4 h-4" /> Submit Application
                      </button>
                      <span className="text-xs text-slate-400">Your CoachConnect profile will be attached automatically.</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3">
              {opp.source === "CoachConnect" ? (
                <button
                  onClick={() => { setInterested(!interested); showToast(interested ? "Interest withdrawn" : "Interest sent! The program has been notified."); }}
                  className={`w-full px-4 py-2.5 font-display font-semibold text-sm rounded-xl transition-all ${
                    interested
                      ? "bg-teal-50 text-teal-600 border border-teal-200"
                      : "bg-gradient-to-r from-teal-500 to-teal-400 text-white hover:from-teal-400 hover:to-teal-300 shadow-sm"
                  }`}
                >
                  {interested ? "Interest Sent ✓" : "Express Interest"}
                </button>
              ) : (
                <a
                  href={opp.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-display font-semibold text-sm rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all shadow-sm"
                >
                  Apply on {opp.source} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => { setSaved(!saved); showToast(saved ? "Removed from saved" : "Opportunity saved"); }}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 font-display font-medium text-sm rounded-xl transition-all ${
                  saved
                    ? "bg-gold-400/10 text-gold-400 border border-gold-400/30"
                    : "border border-slate-200 text-navy-900 hover:bg-slate-50"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                {saved ? "Saved ✓" : "Save Opportunity"}
              </button>
              <button
                onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast("Link copied to clipboard"); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 font-display font-medium text-sm rounded-xl hover:bg-slate-50 transition-all"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Position Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sport</span>
                  <span className="font-medium text-navy-900">{opp.sport === "football" ? "🏈 Football" : "🏀 Basketball"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Level</span>
                  <span className="font-medium text-navy-900">{opp.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Type</span>
                  <span className="font-medium text-navy-900">{opp.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Salary Range</span>
                  <span className="font-medium text-navy-900">{opp.salary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Deadline</span>
                  <span className="font-medium text-navy-900">{opp.deadline}</span>
                </div>
                {opp.source !== "CoachConnect" && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Source</span>
                    <span className="font-medium text-navy-900">{opp.source}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Opportunities */}
            {similar.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Similar Opportunities</h3>
                <div className="space-y-3">
                  {similar.map((s) => (
                    <Link key={s.id} href={`/opportunities/${s.id}`} className="block p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-all">
                      <div className="text-xs font-semibold text-navy-900">{s.title}</div>
                      <div className="text-[11px] text-slate-500">{s.institution} · {s.location}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
