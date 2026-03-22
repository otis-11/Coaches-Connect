"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { opportunities } from "@/data/coaches";
import {
  Briefcase,
  MapPin,
  Clock,
  Filter,
  ChevronDown,
  Building2,
  Tag,
} from "lucide-react";

const sportFilters = ["All", "Football", "Basketball"];
const typeFilters = ["All Types", "Full-Time", "Graduate Assistant"];

export default function OpportunitiesPage() {
  const [sportFilter, setSportFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filtered = opportunities.filter((opp) => {
    const matchesSport =
      sportFilter === "All" ||
      opp.sport.toLowerCase() === sportFilter.toLowerCase();
    const matchesType =
      typeFilter === "All Types" || opp.type === typeFilter;
    return matchesSport && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Coaching Opportunities
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Curated coaching positions from GA roles to head coaching jobs.
            Find your next opportunity.
          </p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-6">
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
                Type
              </label>
              <div className="flex gap-2">
                {typeFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setTypeFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      typeFilter === f
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
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-slate-500 mb-6">
          <span className="font-semibold text-navy-900">{filtered.length}</span>{" "}
          opportunities available
        </p>

        <div className="space-y-4">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-100/20 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-bold text-lg text-navy-900 group-hover:text-teal-600 transition-colors">
                      {opp.title}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        opp.type === "Graduate Assistant"
                          ? "bg-purple-50 text-purple-600 border border-purple-200"
                          : "bg-teal-50 text-teal-600 border border-teal-200"
                      }`}
                    >
                      {opp.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {opp.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {opp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {opp.posted}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {opp.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Requirements
                    </h4>
                    <ul className="space-y-1">
                      {opp.requirements.map((req, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-500 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {opp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 sm:ml-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                      opp.sport === "football"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-orange-50 text-orange-700 border border-orange-200"
                    }`}
                  >
                    {opp.sport === "football" ? "Football" : "Basketball"}
                  </span>
                  <div className="mt-2 text-xs text-slate-400 text-right">
                    {opp.level}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 flex gap-3">
                <button className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-display font-semibold text-sm rounded-lg hover:from-teal-400 hover:to-teal-300 transition-all shadow-sm">
                  Express Interest
                </button>
                <button className="px-5 py-2.5 border border-slate-300 text-navy-900 font-display font-medium text-sm rounded-lg hover:bg-slate-50 transition-all">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-navy-900 text-lg mb-2">
              No opportunities match your filters
            </h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
