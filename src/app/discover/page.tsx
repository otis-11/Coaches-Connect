"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { coaches, coachClassifications, recruitingDNAData, systemFitProfiles } from "@/data/coaches";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  ChevronDown,
  Eye,
  Users,
  Award,
  Zap,
  BarChart3,
  ArrowUpRight,
  Trophy,
} from "lucide-react";

const sportFilters = ["All", "Football", "Basketball"];
const levelFilters = [
  "All Levels",
  "NAIA",
  "Division III",
  "Division II",
  "FCS",
  "Division I",
  "Professional",
];
const coachTypeFilters = ["All Types", "Recruiter", "Developer", "Strategist", "Program Builder"];

const identityColors: Record<string, string> = {
  Recruiter: "bg-purple-500/10 text-purple-700 border-purple-200",
  Developer: "bg-teal-500/10 text-teal-700 border-teal-200",
  Strategist: "bg-blue-500/10 text-blue-700 border-blue-200",
  "Program Builder": "bg-amber-500/10 text-amber-700 border-amber-200",
};

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [showFilters, setShowFilters] = useState(false);
  const [coachTypeFilter, setCoachTypeFilter] = useState("All Types");

  const filtered = coaches.filter((coach) => {
    const matchesSearch =
      searchQuery === "" ||
      `${coach.firstName} ${coach.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      coach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.systems.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      coach.roles.some((r) =>
        r.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesSport =
      sportFilter === "All" ||
      coach.sport.toLowerCase() === sportFilter.toLowerCase();
    const matchesLevel =
      levelFilter === "All Levels" || coach.level === levelFilter;
    const matchesCoachType =
      coachTypeFilter === "All Types" ||
      coachClassifications[coach.id]?.primaryIdentity === coachTypeFilter;
    return matchesSearch && matchesSport && matchesLevel && matchesCoachType;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Discover Coaches
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Find coaches by sport, level, scheme, role, and location. Explore
            coaching trees and build your network.
          </p>

          {/* Search */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, role, scheme, institution..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all font-body"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all font-display font-medium text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Filter pills */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-6">
              <div>
                <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">
                  Sport
                </label>
                <div className="flex gap-2">
                  {sportFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSportFilter(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        sportFilter === f
                          ? "bg-teal-500 text-white"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">
                  Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {levelFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setLevelFilter(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        levelFilter === f
                          ? "bg-teal-500 text-white"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">
                  Coach Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {coachTypeFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setCoachTypeFilter(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        coachTypeFilter === f
                          ? "bg-teal-500 text-white"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-navy-900">
              {filtered.length}
            </span>{" "}
            coaches found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((coach) => (
            <Link
              key={coach.id}
              href={`/coach/${coach.id}`}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/30 transition-all duration-300"
            >
              {/* Banner */}
              <div
                className={`h-20 bg-gradient-to-r ${coach.bannerColor} relative`}
              >
                {coach.openToOpportunities && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-teal-500/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Open to Opportunities
                  </div>
                )}
              </div>

              <div className="px-6 pb-6 -mt-8">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-lg border-4 border-white shadow-lg mb-3">
                  {coach.avatarInitials}
                </div>

                <h3 className="font-display font-bold text-navy-900 group-hover:text-teal-600 transition-colors">
                  {coach.firstName} {coach.lastName}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">{coach.title}</p>
                <p className="text-sm text-slate-400 mt-0.5">
                  {coach.institution}
                </p>

                {/* Meta */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                      coach.sport === "football"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-orange-50 text-orange-700 border border-orange-200"
                    }`}
                  >
                    {coach.sport === "football" ? "Football" : "Basketball"}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-200">
                    {coach.level}
                  </span>
                </div>

                {/* Coach DNA Tags */}
                {(() => {
                  const cls = coachClassifications[coach.id];
                  if (!cls) return null;
                  return (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${identityColors[cls.primaryIdentity] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {cls.primaryIdentity}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-500">{cls.style}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-500">{cls.strengthSide}</span>
                    </div>
                  );
                })()}

                {/* Recruiting DNA Quick Stats */}
                {(() => {
                  const dna = recruitingDNAData[coach.id];
                  const fit = systemFitProfiles[coach.id];
                  if (!dna) return null;
                  const topScheme = fit ? [...fit.offensiveSchemes, ...fit.defensiveSchemes].sort((a, b) => b.proficiency - a.proficiency)[0] : null;
                  return (
                    <div className="mt-3 grid grid-cols-3 gap-1.5">
                      <div className="p-1.5 rounded-lg bg-violet-50 text-center">
                        <div className="font-mono text-xs font-bold text-violet-700">{dna.starUpgrade.avgRecruitedStar}★→{dna.starUpgrade.avgPeakEquivalent}★</div>
                        <div className="text-[8px] text-violet-500 uppercase">Dev Delta</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-teal-50 text-center">
                        <div className="font-mono text-xs font-bold text-teal-700">{dna.retentionRate}%</div>
                        <div className="text-[8px] text-teal-500 uppercase">Retention</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-green-50 text-center">
                        <div className="font-mono text-xs font-bold text-green-700">{dna.proPlayersProduced.count}</div>
                        <div className="text-[8px] text-green-500 uppercase">Pro Players</div>
                      </div>
                    </div>
                  );
                })()}

                {/* Top Scheme */}
                {(() => {
                  const fit = systemFitProfiles[coach.id];
                  if (!fit) return null;
                  const topScheme = [...fit.offensiveSchemes, ...fit.defensiveSchemes].sort((a, b) => b.proficiency - a.proficiency)[0];
                  if (!topScheme) return null;
                  return (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-600">
                      <BarChart3 className="w-3 h-3" />
                      <span className="font-medium">{topScheme.scheme}</span>
                      <span className="font-mono font-bold">{topScheme.proficiency}%</span>
                    </div>
                  );
                })()}

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {coach.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {coach.yearsExperience}yr
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {coach.connections}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-navy-900 text-lg mb-2">
              No coaches found
            </h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
