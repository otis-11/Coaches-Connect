"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { coaches, recruitingData } from "@/data/coaches";
import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  Users,
  Star,
  Target,
  Trophy,
  TrendingUp,
  Globe,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Award,
  Briefcase,
  Send,
} from "lucide-react";

const strengthColors = {
  primary: "bg-teal-500/10 text-teal-700 border-teal-200",
  secondary: "bg-blue-500/10 text-blue-700 border-blue-200",
  developing: "bg-amber-500/10 text-amber-700 border-amber-200",
};

const strengthLabels = {
  primary: "Primary Territory",
  secondary: "Secondary Territory",
  developing: "Developing",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

export default function RecruitingPage() {
  const params = useParams();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"territories" | "highlights">("territories");
  const [expandedHighlight, setExpandedHighlight] = useState<string | null>(null);
  const [filterStrength, setFilterStrength] = useState<"all" | "primary" | "secondary" | "developing">("all");

  const coach = coaches.find((c) => c.id === params.id);
  if (!coach) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-navy-900 mb-2">Coach Not Found</h2>
          <Link href="/discover" className="text-teal-600 font-semibold text-sm">&larr; Back to Discover</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const data = recruitingData[coach.id];
  if (!data) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-navy-900 mb-2">No Recruiting Data</h2>
          <p className="text-sm text-slate-500 mb-4">Recruiting data for this coach is not yet available.</p>
          <Link href={`/coach/${coach.id}`} className="text-teal-600 font-semibold text-sm">&larr; Back to Profile</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredTerritories = data.territories.filter(
    (t) => filterStrength === "all" || t.strengthLevel === filterStrength
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href={`/coach/${coach.id}`} className="flex items-center gap-1 hover:text-teal-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {coach.firstName} {coach.lastName}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-900 font-medium">Recruiting</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-navy-900">Recruiting</h1>
              <p className="text-sm text-slate-500">{coach.firstName} {coach.lastName}&apos;s recruiting territories, stats, and top finds</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Users className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{data.stats.totalRecruitsSigned}</div>
            <div className="text-[11px] text-slate-500">Recruits Signed</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Globe className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{data.stats.statesCovered}</div>
            <div className="text-[11px] text-slate-500">States Covered</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Star className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{data.stats.avgClassRating.toFixed(1)}</div>
            <div className="text-[11px] text-slate-500">Avg Class Rating</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{data.stats.currentCommits}</div>
            <div className="text-[11px] text-slate-500">Current Commits</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Send className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{data.stats.offersOut}</div>
            <div className="text-[11px] text-slate-500">Offers Out</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <MapPin className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <div className="font-mono text-sm font-bold text-navy-900 leading-tight">{data.stats.topRegion}</div>
            <div className="text-[11px] text-slate-500">Top Region</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("territories")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "territories" ? "bg-navy-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <MapPin className="w-4 h-4" /> Territories ({data.territories.length})
          </button>
          <button
            onClick={() => setActiveTab("highlights")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "highlights" ? "bg-navy-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Trophy className="w-4 h-4" /> Recruiting Highlights ({data.highlights.length})
          </button>
        </div>

        {/* Territories Tab */}
        {activeTab === "territories" && (
          <>
            {/* Strength Filter */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-slate-600">Filter:</span>
              {(["all", "primary", "secondary", "developing"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setFilterStrength(level)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    filterStrength === level
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {level === "all" ? `All (${data.territories.length})` : `${strengthLabels[level]} (${data.territories.filter((t) => t.strengthLevel === level).length})`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {filteredTerritories.map((territory) => (
                <div key={territory.stateAbbr} className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center border border-slate-200">
                        <span className="font-mono font-bold text-lg text-navy-900">{territory.stateAbbr}</span>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-navy-900">{territory.state}</h3>
                        <p className="text-xs text-slate-500">{territory.region}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${strengthColors[territory.strengthLevel]}`}>
                      {strengthLabels[territory.strengthLevel]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="font-mono text-lg font-bold text-navy-900">{territory.recruitsSignedFromHere}</div>
                      <div className="text-[11px] text-slate-500">Recruits Signed</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="font-mono text-lg font-bold text-navy-900">{territory.keyContacts}</div>
                      <div className="text-[11px] text-slate-500">Key Contacts</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key High Schools</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {territory.keyHighSchools.map((hs) => (
                        <span key={hs} className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 font-medium">
                          {hs}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Highlights Tab */}
        {activeTab === "highlights" && (
          <div className="space-y-6 mb-8">
            {data.highlights.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
                <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="font-display font-semibold text-navy-900 mb-1">No highlights yet</p>
                <p className="text-sm text-slate-500">Recruiting highlights will appear here.</p>
              </div>
            ) : (
              data.highlights.map((highlight) => {
                const isExpanded = expandedHighlight === highlight.id;
                return (
                  <div key={highlight.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Player Avatar */}
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
                          {highlight.playerName.split(" ").map((n) => n[0]).join("")}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-display font-bold text-lg text-navy-900">{highlight.playerName}</h3>
                              <p className="text-sm text-slate-600">{highlight.position} — {highlight.highSchool}</p>
                              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3" /> {highlight.city}, {highlight.state}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <StarRating rating={highlight.starRating} />
                              <p className="text-[11px] text-slate-500 mt-1">Class of {highlight.signedYear}</p>
                            </div>
                          </div>

                          {/* Current Status */}
                          <div className="mt-3 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold">
                              <Briefcase className="w-3 h-3" /> {highlight.currentStatus}
                            </span>
                          </div>

                          {/* Achievement */}
                          <div className="mt-3 p-3 rounded-xl bg-gold-400/5 border border-gold-400/20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Award className="w-3.5 h-3.5 text-gold-400" />
                              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Achievement</span>
                            </div>
                            <p className="text-sm text-amber-800 font-medium">{highlight.achievement}</p>
                          </div>

                          {/* Expand/Collapse Story */}
                          <button
                            onClick={() => setExpandedHighlight(isExpanded ? null : highlight.id)}
                            className="flex items-center gap-1 mt-3 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            {isExpanded ? "Hide Recruiting Story" : "Read Recruiting Story"}
                          </button>

                          {isExpanded && (
                            <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                              <div className="flex items-center gap-1.5 mb-2">
                                <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">The Story</span>
                              </div>
                              <p className="text-sm text-slate-700 leading-relaxed">{highlight.story}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 text-center">
          <h2 className="font-display font-bold text-xl text-white mb-2">Interested in {coach.firstName}&apos;s recruiting?</h2>
          <p className="text-sm text-slate-300 mb-5">Connect to discuss recruiting, share film, or explore opportunities.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => showToast(`Connection request sent to ${coach.firstName} ${coach.lastName}`)}
              className="px-6 py-2.5 bg-teal-500 text-white font-display font-semibold text-sm rounded-lg hover:bg-teal-400 transition-all"
            >
              Connect
            </button>
            <button
              onClick={() => showToast(`Opening message thread with ${coach.firstName}...`)}
              className="px-6 py-2.5 border border-white/20 text-white font-display font-semibold text-sm rounded-lg hover:bg-white/10 transition-all"
            >
              Message
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
