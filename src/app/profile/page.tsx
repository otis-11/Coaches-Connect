"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/AuthContext";
import { coaches } from "@/data/coaches";
import {
  MapPin,
  Briefcase,
  Calendar,
  Award,
  BookOpen,
  Users,
  Eye,
  Search,
  Edit,
  ChevronRight,
  CheckCircle,
  Star,
  GitBranch,
  Shield,
  GraduationCap,
  Target,
  Globe,
} from "lucide-react";

const fallbackCoach = coaches[0];

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "experience" | "endorsements" | "tree">("overview");

  const displayName = profile ? `${profile.first_name} ${profile.last_name}` : `${fallbackCoach.firstName} ${fallbackCoach.lastName}`;
  const initials = profile ? `${profile.first_name[0]}${profile.last_name[0]}` : fallbackCoach.avatarInitials;
  const displayTitle = profile?.title || fallbackCoach.title;
  const displayInstitution = profile?.institution || fallbackCoach.institution;
  const displayLocation = profile?.location || fallbackCoach.location;
  const displayBio = profile?.bio || fallbackCoach.bio;
  const displayPhilosophy = profile?.philosophy || fallbackCoach.philosophy;
  const displaySport = profile?.sport || fallbackCoach.sport;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            My Profile
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Your professional coaching profile and career history.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden mb-6">
          <div className={`h-32 bg-gradient-to-r ${profile?.banner_color || fallbackCoach.bannerColor}`} />
          <div className="px-6 pb-6 -mt-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-2xl border-4 border-white shadow-lg">
                  {initials}
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-xl font-bold text-navy-900">{displayName}</h1>
                    {(profile?.is_verified || true) && <CheckCircle className="w-5 h-5 text-teal-500" />}
                  </div>
                  <p className="text-sm text-slate-600">{displayTitle}</p>
                  <p className="text-sm text-slate-400">{displayInstitution}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
                  <Edit className="w-4 h-4" /> Edit Profile
                </Link>
                <Link href={`/coach/${fallbackCoach.id}`} className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl text-sm font-semibold hover:bg-teal-400 transition-all">
                  <Eye className="w-4 h-4" /> Public View
                </Link>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="w-4 h-4" /> {displayLocation}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <Briefcase className="w-4 h-4" /> {displaySport === "football" ? "🏈 Football" : "🏀 Basketball"}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <Users className="w-4 h-4" /> 412 connections
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <Eye className="w-4 h-4" /> 2,847 profile views
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 overflow-x-auto">
          {[
            { key: "overview" as const, label: "Overview" },
            { key: "experience" as const, label: "Experience" },
            { key: "endorsements" as const, label: "Endorsements" },
            { key: "tree" as const, label: "Coaching Tree" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key ? "bg-navy-900 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                {/* Bio */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                  <h3 className="font-display font-bold text-sm text-navy-900 mb-3">About</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{displayBio}</p>
                </div>

                {/* Philosophy */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                  <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Coaching Philosophy</h3>
                  <p className="text-sm text-slate-600 leading-relaxed italic">&ldquo;{displayPhilosophy}&rdquo;</p>
                </div>

                {/* Scheme & Systems */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                  <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Systems & Schemes</h3>
                  <div className="flex flex-wrap gap-2">
                    {(profile?.systems || fallbackCoach.systems).map((sys) => (
                      <span key={sys} className="px-3 py-1.5 rounded-lg bg-navy-900/5 border border-navy-900/10 text-xs text-navy-900 font-medium">
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Roles */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                  <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Roles & Responsibilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {(profile?.roles || fallbackCoach.roles).map((role) => (
                      <span key={role} className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-700 font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "experience" && (
              <>
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                  <h3 className="font-display font-bold text-sm text-navy-900 mb-4">Career Timeline</h3>
                  <div className="space-y-0">
                    {fallbackCoach.timeline.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-teal-500" : "bg-slate-200"} shrink-0`} />
                          {i < fallbackCoach.timeline.length - 1 && <div className="w-px flex-1 bg-slate-200" />}
                        </div>
                        <div className="pb-6">
                          <div className="text-xs font-bold text-navy-900">{item.role}</div>
                          <div className="text-[11px] text-slate-500">{item.institution} · {item.level}</div>
                          <div className="text-[11px] text-slate-400">{item.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                  <h3 className="font-display font-bold text-sm text-navy-900 mb-4">Education</h3>
                  <div className="space-y-3">
                    {fallbackCoach.education.map((edu, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-navy-900">{edu.degree}</div>
                          <div className="text-[11px] text-slate-500">{edu.institution} · {edu.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                  <h3 className="font-display font-bold text-sm text-navy-900 mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {(profile?.certifications || fallbackCoach.certifications).map((cert, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Shield className="w-3.5 h-3.5 text-teal-500" /> {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "endorsements" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-4">Endorsements & Recommendations</h3>
                <div className="space-y-4">
                  {fallbackCoach.endorsements.map((end, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-sm text-slate-700 italic leading-relaxed mb-3">&ldquo;{end.text}&rdquo;</p>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-[9px]">
                          {end.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-navy-900">{end.author}</div>
                          <div className="text-[10px] text-slate-500">{end.authorTitle} · {end.relationship}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href={`/coach/${fallbackCoach.id}/recommendations`} className="mt-4 flex items-center gap-1 text-xs text-teal-600 hover:text-teal-500 font-medium">
                  View full recommendations page <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {activeTab === "tree" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-4">My Coaching Tree</h3>
                <p className="text-sm text-slate-500 mb-4">Coaches I&apos;ve worked under and learned from.</p>
                <div className="space-y-3">
                  {fallbackCoach.coachedUnder.map((mentor, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <GitBranch className="w-5 h-5 text-teal-500 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-navy-900">{mentor.name}</div>
                        <div className="text-[11px] text-slate-500">{mentor.title}, {mentor.institution}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href={`/coach/${fallbackCoach.id}/tree`} className="mt-4 flex items-center gap-1 text-xs text-teal-600 hover:text-teal-500 font-medium">
                  View full coaching tree <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Top Skills</h3>
              <div className="space-y-3">
                {fallbackCoach.skills.slice(0, 5).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-navy-900">{skill.name}</span>
                      <span className="text-slate-500">{skill.endorsementCount}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${Math.min(100, (skill.endorsementCount / 30) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            {fallbackCoach.awards.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Awards</h3>
                <div className="space-y-2">
                  {fallbackCoach.awards.map((award, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <Award className="w-3.5 h-3.5 text-gold-400" /> {award}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scheme Tags */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Scheme Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {(profile?.scheme_tags || fallbackCoach.systems).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-navy-900/5 border border-navy-900/10 text-[11px] text-navy-900 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Conferences */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Conferences & Clinics</h3>
              <div className="space-y-2">
                {fallbackCoach.conferences.map((conf, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <Globe className="w-3.5 h-3.5 text-slate-400" /> {conf}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
