"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import {
  Bell,
  Eye,
  EyeOff,
  Clock,
  MapPin,
  Shield,
  TrendingUp,
  Bookmark,
  Filter,
  Zap,
  Lock,
} from "lucide-react";

type AlertLevel = "hot" | "warm" | "early";

interface HiddenAlert {
  id: string;
  title: string;
  institution: string;
  location: string;
  sport: "football" | "basketball";
  level: AlertLevel;
  category: string;
  timeAgo: string;
  summary: string;
  source: string;
  confidence: number;
  tags: string[];
}

const alertLevelConfig: Record<AlertLevel, { label: string; color: string; bg: string }> = {
  hot: { label: "Hot Lead", color: "text-red-600", bg: "bg-red-50 border-red-200" },
  warm: { label: "Warm Intel", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  early: { label: "Early Signal", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
};

const mockAlerts: HiddenAlert[] = [
  {
    id: "alert-1",
    title: "OC Position Opening — Power 4 Program",
    institution: "Undisclosed ACC Program",
    location: "Southeast",
    sport: "football",
    level: "hot",
    category: "Coaching Change",
    timeAgo: "2 hours ago",
    summary: "Sources indicate the current offensive coordinator is expected to accept a position elsewhere within the week. Internal candidates are being considered but external search is likely.",
    source: "Verified coaching network source",
    confidence: 85,
    tags: ["OC", "ACC", "Power 4", "Imminent"],
  },
  {
    id: "alert-2",
    title: "Head Women's Basketball Coach Search",
    institution: "Mid-Major Conference Program",
    location: "Midwest",
    sport: "basketball",
    level: "hot",
    category: "Head Coach Search",
    timeAgo: "4 hours ago",
    summary: "A mid-major program in the Midwest is quietly beginning a head coaching search after the current HC indicated plans to retire at the end of the season. Search firm has been engaged.",
    source: "Search firm connection",
    confidence: 90,
    tags: ["Head Coach", "Women's Basketball", "Search Firm"],
  },
  {
    id: "alert-3",
    title: "Defensive Staff Shakeup — FCS Program",
    institution: "CAA Conference School",
    location: "Mid-Atlantic",
    sport: "football",
    level: "warm",
    category: "Staff Restructuring",
    timeAgo: "8 hours ago",
    summary: "Multiple defensive staff positions may open at a CAA program following scheme changes. DC staying, but position coaches may rotate. Look for postings in 2-3 weeks.",
    source: "Program insider",
    confidence: 70,
    tags: ["Defensive Staff", "FCS", "CAA", "Multiple Openings"],
  },
  {
    id: "alert-4",
    title: "Assistant Basketball Coach — HBCU D1",
    institution: "SWAC Program",
    location: "Deep South",
    sport: "basketball",
    level: "warm",
    category: "New Position",
    timeAgo: "12 hours ago",
    summary: "An SWAC basketball program is adding an assistant coach position due to increased recruiting budget. Position will focus on guard development and Southeast recruiting.",
    source: "Conference contact",
    confidence: 75,
    tags: ["HBCU", "SWAC", "New Position", "Guard Development"],
  },
  {
    id: "alert-5",
    title: "GA Positions — Big 12 Football",
    institution: "Big 12 Program",
    location: "Central US",
    sport: "football",
    level: "early",
    category: "Graduate Assistant",
    timeAgo: "1 day ago",
    summary: "A Big 12 football program is expected to post 2-3 GA positions after spring practice concludes. Offensive side of the ball. Program values analytics background.",
    source: "Former staff member",
    confidence: 60,
    tags: ["GA", "Big 12", "Offense", "Analytics"],
  },
  {
    id: "alert-6",
    title: "Director of Player Development — SEC Basketball",
    institution: "SEC Program",
    location: "Southeast",
    sport: "basketball",
    level: "early",
    category: "Support Staff",
    timeAgo: "1 day ago",
    summary: "An SEC men's basketball program is exploring the creation of a Director of Player Development role. Budget approval pending. Former players with coaching interest preferred.",
    source: "Athletic department source",
    confidence: 55,
    tags: ["Player Development", "SEC", "Support Staff"],
  },
  {
    id: "alert-7",
    title: "Linebackers Coach — Group of 5 Program",
    institution: "Sun Belt School",
    location: "Southeast",
    sport: "football",
    level: "warm",
    category: "Coaching Change",
    timeAgo: "6 hours ago",
    summary: "Current LB coach at a Sun Belt program expected to follow departing DC to new school. Position should open formally within 10 days. Program runs 3-4 base.",
    source: "Agent network",
    confidence: 72,
    tags: ["LB Coach", "Sun Belt", "3-4 Defense"],
  },
  {
    id: "alert-8",
    title: "Women's Basketball Recruiting Coordinator",
    institution: "A-10 Program",
    location: "Northeast",
    sport: "basketball",
    level: "early",
    category: "New Position",
    timeAgo: "2 days ago",
    summary: "An Atlantic 10 women's basketball program is restructuring their staff to add a dedicated recruiting coordinator role. Strong international recruiting ties would be a differentiator.",
    source: "Conference coaching circle",
    confidence: 50,
    tags: ["Recruiting Coordinator", "A-10", "Women's Basketball"],
  },
];

const sportFilters = ["All", "Football", "Basketball"];
const levelFilters = ["All Levels", "Hot Lead", "Warm Intel", "Early Signal"];

export default function AlertsPage() {
  const { showToast } = useToast();
  const [sportFilter, setSportFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [savedAlerts, setSavedAlerts] = useState<Record<string, boolean>>({});
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const handleSave = (id: string) => {
    const was = savedAlerts[id];
    setSavedAlerts((prev) => ({ ...prev, [id]: !was }));
    showToast(was ? "Alert removed from watchlist" : "Alert added to watchlist");
  };

  const filtered = mockAlerts.filter((a) => {
    const matchSport = sportFilter === "All" || a.sport.toLowerCase() === sportFilter.toLowerCase();
    const matchLevel =
      levelFilter === "All Levels" ||
      (levelFilter === "Hot Lead" && a.level === "hot") ||
      (levelFilter === "Warm Intel" && a.level === "warm") ||
      (levelFilter === "Early Signal" && a.level === "early");
    return matchSport && matchLevel;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-navy-900" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Hidden Market Alerts
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Early intelligence on coaching changes, upcoming openings, and staff moves before they hit the public job boards.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <Shield className="w-3.5 h-3.5" />
            <span>All sources are verified through our coaching network. Identities are protected.</span>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Sport</label>
              <div className="flex gap-2">
                {sportFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSportFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      sportFilter === f ? "bg-teal-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Signal Strength</label>
              <div className="flex gap-2">
                {levelFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setLevelFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      levelFilter === f ? "bg-teal-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-slate-500 mb-6">
          <span className="font-semibold text-navy-900">{filtered.length}</span> active alerts
        </p>

        <div className="space-y-4">
          {filtered.map((alert) => {
            const config = alertLevelConfig[alert.level];
            const isExpanded = expandedAlert === alert.id;

            return (
              <div
                key={alert.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${config.bg}`}>
                          {config.label}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-slate-100">
                          {alert.category}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {alert.timeAgo}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-navy-900">{alert.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><EyeOff className="w-3 h-3" /> {alert.institution}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.location}</span>
                        <span className={`font-medium ${alert.sport === "football" ? "text-amber-600" : "text-orange-600"}`}>
                          {alert.sport === "football" ? "🏈" : "🏀"} {alert.sport === "football" ? "Football" : "Basketball"}
                        </span>
                      </div>
                    </div>

                    {/* Confidence meter */}
                    <div className="shrink-0 text-center">
                      <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center relative">
                        <span className={`text-sm font-mono font-bold ${
                          alert.confidence >= 80 ? "text-red-500" : alert.confidence >= 65 ? "text-orange-500" : "text-blue-500"
                        }`}>
                          {alert.confidence}
                        </span>
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1">CONF %</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{alert.summary}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {alert.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-slate-50 text-slate-500 border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Shield className="w-3.5 h-3.5 text-teal-500" />
                        <span>Source: <span className="font-medium text-slate-700">{alert.source}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>This alert is based on verified insider information. Details are intentionally vague to protect sources.</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-3">
                    <button
                      onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition-colors"
                    >
                      {isExpanded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {isExpanded ? "Hide Details" : "View Details"}
                    </button>
                    <button
                      onClick={() => handleSave(alert.id)}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${
                        savedAlerts[alert.id] ? "text-gold-400" : "text-slate-500 hover:text-gold-400"
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${savedAlerts[alert.id] ? "fill-current" : ""}`} />
                      {savedAlerts[alert.id] ? "Watching" : "Watch"}
                    </button>
                    <button
                      onClick={() => { navigator.clipboard?.writeText(`${window.location.origin}/alerts#${alert.id}`); showToast("Alert link copied"); }}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-500 transition-colors ml-auto"
                    >
                      Share Tip
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-navy-900 text-lg mb-2">No alerts match your filters</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters or check back soon for new intel.</p>
          </div>
        )}

        {/* Info card */}
        <div className="mt-8 bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-teal-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-display font-bold mb-1">How Hidden Market Alerts Work</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our coaching network surfaces upcoming openings and staff changes before they become public. Alerts are verified by at least one trusted source and assigned a confidence score. Program names are obscured until positions are officially posted. This gives CoachConnect members a head start in their job search.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
