import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { coaches, filmClips, recruitingData, recruitingDNAData, scoutingInsights, systemFitProfiles, coachClassifications } from "@/data/coaches";
import {
  MapPin,
  Briefcase,
  Users,
  Eye,
  Search,
  GitBranch,
  Award,
  GraduationCap,
  BookOpen,
  Calendar,
  Shield,
  ChevronRight,
  Star,
  Clock,
  MessageSquare,
  BadgeCheck,
  TrendingUp,
  CheckCircle,
  Film,
  Target,
  Trophy,
  Play,
  Heart,
  Globe,
  Zap,
  ArrowUpRight,
  Crosshair,
  Lightbulb,
  BarChart3,
  Repeat2,
} from "lucide-react";

export function generateStaticParams() {
  return coaches.map((coach) => ({ id: coach.id }));
}

export default function CoachProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const coach = coaches.find((c) => c.id === params.id);
  if (!coach) return notFound();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Banner */}
      <div className={`h-48 sm:h-56 bg-gradient-to-r ${coach.bannerColor} relative`}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 sm:px-8 pt-4 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              {/* Avatar */}
              <div className="w-28 h-28 -mt-16 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-3xl border-4 border-white shadow-xl">
                {coach.avatarInitials}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 flex items-center gap-2">
                    {coach.firstName} {coach.lastName}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold uppercase tracking-wider" title="Verified Coach">
                      <BadgeCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  </h1>
                  {coach.openToOpportunities && (
                    <span className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 text-xs font-bold uppercase tracking-wider pulse-badge w-fit">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      Open to Opportunities
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mt-1">{coach.title}</p>
                <p className="text-slate-500 text-sm">{coach.institution}</p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {coach.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    {coach.yearsExperience} years experience
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {coach.connections} connections
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${
                    coach.sport === "football"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-orange-50 text-orange-700 border border-orange-200"
                  }`}>
                    {coach.sport === "football" ? "Football" : "Basketball"} · {coach.level}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 sm:flex-col">
                <button className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-display font-semibold text-sm rounded-lg hover:from-teal-400 hover:to-teal-300 transition-all shadow-sm">
                  Connect
                </button>
                <button className="px-5 py-2.5 border border-slate-300 text-navy-900 font-display font-semibold text-sm rounded-lg hover:bg-slate-50 transition-all">
                  Message
                </button>
              </div>
            </div>

            {/* Profile stats */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex gap-8">
              <div className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-navy-900 font-semibold">{coach.profileViews.toLocaleString()}</span>
                <span className="text-slate-500">profile views</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Search className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-navy-900 font-semibold">{coach.searchAppearances}</span>
                <span className="text-slate-500">search appearances</span>
              </div>
            </div>

            {/* Credibility Signals */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50/50 border border-teal-100">
                <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-teal-700 font-bold uppercase tracking-wider">Identity</div>
                  <div className="text-[11px] text-teal-600">Verified</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
                <Shield className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">Credentials</div>
                  <div className="text-[11px] text-blue-600">{coach.certifications.length} Verified</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gold-400/5 border border-gold-400/20">
                <TrendingUp className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Credibility</div>
                  <div className="text-[11px] text-amber-600">{Math.min(99, 60 + coach.endorsements.length * 5 + coach.skills.reduce((s, sk) => s + sk.endorsementCount, 0) / 10)}%</div>
                </div>
              </div>
            </div>

            {/* Coach DNA Classification */}
            {(() => {
              const cls = coachClassifications[coach.id];
              if (!cls) return null;
              const identityColors: Record<string, string> = {
                Recruiter: "bg-purple-500/10 text-purple-700 border-purple-200",
                Developer: "bg-teal-500/10 text-teal-700 border-teal-200",
                Strategist: "bg-blue-500/10 text-blue-700 border-blue-200",
                "Program Builder": "bg-amber-500/10 text-amber-700 border-amber-200",
              };
              const tagColors: Record<string, string> = {
                "Culture Builder": "bg-rose-50 text-rose-600",
                Tactician: "bg-slate-100 text-slate-600",
                Innovator: "bg-violet-50 text-violet-600",
                "Relationship Coach": "bg-pink-50 text-pink-600",
                "Pro Pipeline": "bg-green-50 text-green-700",
                "High Retention": "bg-teal-50 text-teal-600",
                "Wide Network": "bg-blue-50 text-blue-600",
                "Film-First": "bg-red-50 text-red-600",
                Coordinator: "bg-indigo-50 text-indigo-600",
                "Head Coach Ready": "bg-gold-400/10 text-amber-700",
                "Athlete Converter": "bg-orange-50 text-orange-600",
              };
              return (
                <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80">
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${identityColors[cls.primaryIdentity] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                      {cls.primaryIdentity}
                    </span>
                    {cls.coachingDNATags.slice(1).map((tag) => (
                      <span key={tag} className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${tagColors[tag] || "bg-slate-50 text-slate-500"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-navy-900">Why hire {coach.firstName}?</span>{" "}
                      {cls.whyHireThisCoach}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Sub-nav */}
            <div className="mt-5 flex gap-1 overflow-x-auto">
              <span className="px-4 py-2 rounded-lg text-sm font-medium bg-navy-900 text-white">
                Overview
              </span>
              <Link href={`/coach/${coach.id}/tree`} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-all">
                Coaching Tree
              </Link>
              <Link href={`/coach/${coach.id}/recommendations`} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-all">
                Recommendations
              </Link>
              <Link href={`/coach/${coach.id}/film`} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-all flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" /> Film Room
              </Link>
              <Link href={`/coach/${coach.id}/recruiting`} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-all flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Recruiting
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Philosophy */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
              <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-teal-500" />
                Coaching Philosophy
              </h2>
              <p className="text-slate-600 leading-relaxed">{coach.philosophy}</p>
            </section>

            {/* Bio + Personal Record */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
              <h2 className="font-display font-bold text-lg text-navy-900 mb-4">About</h2>
              <p className="text-slate-600 leading-relaxed">{coach.bio}</p>

              {/* Personal Win/Loss Record */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-gold-400" />
                  <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider">Personal Record</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-6 px-5 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200">
                    <div className="text-center">
                      <div className="font-mono text-2xl font-bold text-teal-600">{coach.personalRecord.wins}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Wins</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-center">
                      <div className="font-mono text-2xl font-bold text-slate-500">{coach.personalRecord.losses}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Losses</div>
                    </div>
                    {coach.personalRecord.ties !== undefined && (
                      <>
                        <div className="w-px h-10 bg-slate-200" />
                        <div className="text-center">
                          <div className="font-mono text-2xl font-bold text-amber-500">{coach.personalRecord.ties}</div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ties</div>
                        </div>
                      </>
                    )}
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-center">
                      <div className="font-mono text-2xl font-bold text-navy-900">
                        {((coach.personalRecord.wins / (coach.personalRecord.wins + coach.personalRecord.losses + (coach.personalRecord.ties ?? 0))) * 100).toFixed(0)}%
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Win %</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* School Records */}
            {coach.schoolRecords.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
                <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-5">
                  <Shield className="w-5 h-5 text-teal-500" />
                  School Records
                </h2>
                <div className="space-y-3">
                  {coach.schoolRecords.map((rec, i) => {
                    const total = rec.wins + rec.losses + (rec.ties ?? 0);
                    const winPct = total > 0 ? (rec.wins / total) * 100 : 0;
                    return (
                      <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <div className="font-display font-semibold text-navy-900">{rec.institution}</div>
                            <div className="font-mono text-xs text-slate-400 mt-0.5">{rec.years}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 font-mono text-sm">
                              <span className="text-teal-600 font-bold">{rec.wins}W</span>
                              <span className="text-slate-300">-</span>
                              <span className="text-slate-500 font-bold">{rec.losses}L</span>
                              {rec.ties !== undefined && (
                                <>
                                  <span className="text-slate-300">-</span>
                                  <span className="text-amber-500 font-bold">{rec.ties}T</span>
                                </>
                              )}
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              winPct >= 60
                                ? "bg-teal-500/10 text-teal-600"
                                : winPct >= 50
                                ? "bg-blue-500/10 text-blue-600"
                                : "bg-slate-100 text-slate-500"
                            }`}>
                              {winPct.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        {rec.note && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600">
                            <Award className="w-3 h-3" />
                            {rec.note}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}


            {/* Timeline */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
              <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-teal-500" />
                Career Timeline
              </h2>
              <div className="space-y-0">
                {coach.timeline.map((entry, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-teal-500' : 'bg-slate-300'} mt-1.5`} />
                      {i < coach.timeline.length - 1 && (
                        <div className="w-px flex-1 bg-slate-200 my-1" />
                      )}
                    </div>
                    <div className={`pb-6 ${i === coach.timeline.length - 1 ? 'pb-0' : ''}`}>
                      <div className="font-mono text-xs text-slate-400 mb-1">{entry.year}</div>
                      <div className="font-display font-semibold text-navy-900">{entry.role}</div>
                      <div className="text-sm text-slate-500">{entry.institution}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[11px] bg-slate-50 text-slate-500 border border-slate-200">
                        {entry.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Coached Under */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
              <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-4">
                <GitBranch className="w-5 h-5 text-gold-400" />
                Coached Under
              </h2>
              <div className="space-y-3">
                {coach.coachedUnder.map((mentor, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-gold-200 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-400/5 flex items-center justify-center text-gold-400">
                      <Star className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-navy-900">{mentor.name}</div>
                      <div className="text-xs text-slate-500">{mentor.title} · {mentor.institution}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href={`/coach/${coach.id}/tree`} className="inline-flex items-center gap-1 mt-4 text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors">
                View full coaching tree <ChevronRight className="w-4 h-4" />
              </Link>
            </section>

            {/* Film Highlights */}
            {(() => {
              const coachClips = filmClips.filter((c) => c.coachId === coach.id).slice(0, 3);
              if (coachClips.length === 0) return null;
              return (
                <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
                  <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-2">
                    <Film className="w-5 h-5 text-red-500" />
                    Film Room
                    <span className="ml-auto text-sm font-normal text-slate-400">{filmClips.filter((c) => c.coachId === coach.id).length} clips</span>
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">Plays, schemes, and drills from {coach.firstName}&apos;s playbook.</p>
                  <div className="space-y-3">
                    {coachClips.map((clip) => (
                      <div key={clip.id} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className={`w-20 h-14 rounded-lg bg-gradient-to-br ${clip.thumbnailColor} flex items-center justify-center shrink-0`}>
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold text-sm text-navy-900 truncate">{clip.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{clip.description}</div>
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                            <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {clip.views.toLocaleString()}</span>
                            <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" /> {clip.likes}</span>
                            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {clip.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/coach/${coach.id}/film`} className="inline-flex items-center gap-1 mt-4 text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors">
                    View all film <ChevronRight className="w-4 h-4" />
                  </Link>
                </section>
              );
            })()}

            {/* Recruiting Territories */}
            {(() => {
              const data = recruitingData[coach.id];
              if (!data) return null;
              return (
                <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
                  <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Recruiting
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">{coach.firstName}&apos;s recruiting footprint across the U.S.</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div className="font-mono text-lg font-bold text-navy-900">{data.stats.totalRecruitsSigned}</div>
                      <div className="text-[10px] text-slate-500">Signed</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div className="font-mono text-lg font-bold text-navy-900">{data.stats.statesCovered}</div>
                      <div className="text-[10px] text-slate-500">States</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div className="font-mono text-lg font-bold text-navy-900">{data.stats.avgClassRating.toFixed(1)}★</div>
                      <div className="text-[10px] text-slate-500">Avg Rating</div>
                    </div>
                  </div>

                  {/* Territory Map */}
                  <div className="space-y-2 mb-4">
                    {data.territories.map((t) => (
                      <div key={t.stateAbbr} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                          <span className="font-mono font-bold text-sm text-navy-900">{t.stateAbbr}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-semibold text-sm text-navy-900">{t.state}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                              t.strengthLevel === "primary" ? "bg-teal-500/10 text-teal-700 border-teal-200" :
                              t.strengthLevel === "secondary" ? "bg-blue-500/10 text-blue-700 border-blue-200" :
                              "bg-amber-500/10 text-amber-700 border-amber-200"
                            }`}>{t.strengthLevel}</span>
                          </div>
                          <div className="text-[11px] text-slate-500">{t.recruitsSignedFromHere} recruits · {t.region}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top Find */}
                  {data.highlights.length > 0 && (
                    <div className="p-3 rounded-xl bg-gold-400/5 border border-gold-400/20 mb-4">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Trophy className="w-3.5 h-3.5 text-gold-400" />
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Top Recruiting Find</span>
                      </div>
                      <div className="font-display font-semibold text-sm text-navy-900">{data.highlights[0].playerName}</div>
                      <div className="text-xs text-slate-500">{data.highlights[0].position} — {data.highlights[0].highSchool}, {data.highlights[0].state}</div>
                      <div className="text-xs text-amber-700 font-medium mt-1">{data.highlights[0].achievement}</div>
                    </div>
                  )}

                  <Link href={`/coach/${coach.id}/recruiting`} className="inline-flex items-center gap-1 text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors">
                    View full recruiting profile <ChevronRight className="w-4 h-4" />
                  </Link>
                </section>
              );
            })()}

            {/* Recruiting DNA */}
            {(() => {
              const dna = recruitingDNAData[coach.id];
              if (!dna) return null;
              const stageColors: Record<string, string> = {
                Redshirt: "bg-slate-200 text-slate-600",
                Bench: "bg-slate-200 text-slate-600",
                "Scout Team": "bg-slate-200 text-slate-600",
                Learning: "bg-slate-200 text-slate-600",
                Backup: "bg-slate-300 text-slate-700",
                Rotation: "bg-blue-100 text-blue-700",
                "6th Man": "bg-blue-100 text-blue-700",
                "6th Woman": "bg-blue-100 text-blue-700",
                Scholarship: "bg-blue-100 text-blue-700",
                Starter: "bg-teal-100 text-teal-700",
                "All-Conference": "bg-amber-100 text-amber-700",
                "All-American HM": "bg-orange-100 text-orange-700",
                "NFL Camp": "bg-green-100 text-green-700",
                "NFL PS": "bg-green-100 text-green-700",
                "G-League": "bg-green-100 text-green-700",
                "NBA 2-Way": "bg-green-100 text-green-700",
                Pro: "bg-green-100 text-green-700",
                "WNBA Prospect": "bg-green-100 text-green-700",
                "Walk-On": "bg-slate-200 text-slate-600",
              };
              return (
                <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
                  <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-violet-500" />
                    Recruiting DNA
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">Player development outcomes — not just who was recruited, but what happened next.</p>

                  {/* Keystone metric */}
                  <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 mb-4">
                    <div className="text-xs font-bold text-violet-700">{dna.keystoneMetric}</div>
                  </div>

                  {/* Quick stats row */}
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="font-mono text-base font-bold text-navy-900">{dna.retentionRate}%</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">Retention</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="font-mono text-base font-bold text-navy-900">{dna.starUpgrade.avgRecruitedStar}★→{dna.starUpgrade.avgPeakEquivalent}★</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">Dev Delta</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="font-mono text-base font-bold text-navy-900">{dna.proPlayersProduced.count}</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">Pro Players</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="font-mono text-base font-bold text-navy-900">{dna.transferRecord.incoming}/{dna.transferRecord.outgoing}</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">Transfer In/Out</div>
                    </div>
                  </div>

                  {/* Development Pipeline */}
                  <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-500" />
                    Development Pipeline
                  </h3>
                  <div className="space-y-3">
                    {dna.developmentPipeline.map((player) => (
                      <div key={player.playerName} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-display font-semibold text-sm text-navy-900">{player.playerName}</span>
                            <span className="text-xs text-slate-400 ml-2">{player.position}</span>
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">Recruited as {player.recruitedAs}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          {player.stages.map((stage, si) => (
                            <div key={si} className="flex items-center gap-1">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${stageColors[stage.label] || "bg-slate-100 text-slate-600"}`}>
                                {stage.label}
                              </span>
                              {si < player.stages.length - 1 && (
                                <ChevronRight className="w-3 h-3 text-slate-300" />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-1.5 text-[11px] text-teal-600 font-medium">{player.peakAchievement}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pro players */}
                  {dna.proPlayersProduced.count > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Trophy className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Pro Pipeline</span>
                      </div>
                      <div className="text-xs text-green-700">{dna.proPlayersProduced.names.join(" · ")}</div>
                    </div>
                  )}
                </section>
              );
            })()}

            {/* Scouting Eye */}
            {(() => {
              const data = recruitingData[coach.id];
              if (!data || data.highlights.length === 0) return null;
              const insights = data.highlights.slice(0, 2).map(h => {
                const insight = scoutingInsights.find(s => s.recruitHighlightId === h.id);
                return { highlight: h, insight };
              }).filter(x => x.insight);
              if (insights.length === 0) return null;
              return (
                <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
                  <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-2">
                    <Crosshair className="w-5 h-5 text-indigo-500" />
                    Scouting Eye
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">What {coach.firstName} saw that other coaches missed.</p>
                  <div className="space-y-4">
                    {insights.map(({ highlight, insight }) => (
                      <div key={highlight.id} className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/50 to-white border border-indigo-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-display font-semibold text-sm text-navy-900">{highlight.playerName}</span>
                          <span className="text-xs text-slate-400">{highlight.position} · {highlight.highSchool}</span>
                          <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700">{highlight.starRating}★</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Eye className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-0.5">What I Saw</div>
                              <p className="text-xs text-slate-600 leading-relaxed">{insight!.whatISaw}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">What Others Missed</div>
                              <p className="text-xs text-slate-600 leading-relaxed">{insight!.whatOthersMissed}</p>
                            </div>
                          </div>
                        </div>
                        {insight!.linkedClipId && (
                          <Link href={`/coach/${coach.id}/film`} className="inline-flex items-center gap-1 mt-2.5 px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-[10px] font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors">
                            <Film className="w-3 h-3" /> Watch linked film
                          </Link>
                        )}
                        <div className="mt-2 text-[11px] text-teal-600 font-medium flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />
                          Now: {highlight.currentStatus}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })()}

            {/* Endorsements preview */}
            {coach.endorsements.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
                <h2 className="font-display font-bold text-lg text-navy-900 flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-teal-500" />
                  Recommendations
                  <span className="ml-auto text-sm font-normal text-slate-400">{coach.endorsements.length}</span>
                </h2>
                <div className="space-y-4">
                  {coach.endorsements.slice(0, 2).map((end, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed italic mb-3">
                        &ldquo;{end.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-navy-900/10 flex items-center justify-center text-navy-900 font-display font-bold text-[10px]">
                          {end.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-display font-semibold text-xs text-navy-900">{end.author}</div>
                          <div className="text-[11px] text-slate-500">{end.authorTitle} · {end.relationship}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {coach.endorsements.length > 2 && (
                  <Link href={`/coach/${coach.id}/recommendations`} className="inline-flex items-center gap-1 mt-4 text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors">
                    View all recommendations <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Fit */}
            {(() => {
              const fit = systemFitProfiles[coach.id];
              if (!fit) return null;
              const allSchemes = [
                ...fit.offensiveSchemes.map(s => ({ ...s, side: "OFF" })),
                ...fit.defensiveSchemes.map(s => ({ ...s, side: "DEF" })),
              ].sort((a, b) => b.proficiency - a.proficiency);
              return (
                <section className="bg-white rounded-2xl border border-slate-200/80 p-6">
                  <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    System Fit
                  </h3>
                  <div className="space-y-2.5 mb-4">
                    {allSchemes.slice(0, 5).map((s) => (
                      <div key={s.scheme}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600">{s.scheme}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${s.side === "OFF" ? "bg-teal-50 text-teal-600" : "bg-red-50 text-red-600"}`}>{s.side}</span>
                            <span className="font-mono text-xs font-bold text-navy-900">{s.proficiency}%</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${s.proficiency >= 90 ? "bg-teal-500" : s.proficiency >= 75 ? "bg-blue-500" : "bg-slate-400"}`}
                            style={{ width: `${s.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Player Archetypes */}
                  <div className="mb-4">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Player Archetypes</div>
                    <div className="flex flex-wrap gap-1.5">
                      {fit.playerArchetypes.map((a) => (
                        <span key={a} className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-medium">{a}</span>
                      ))}
                    </div>
                  </div>

                  {/* Best Fit For */}
                  <div className="mb-3">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Best Fit For</div>
                    <div className="space-y-1.5">
                      {fit.bestFitFor.map((b) => (
                        <div key={b} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <CheckCircle className="w-3 h-3 text-teal-500 shrink-0 mt-0.5" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Program Needs */}
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Program Needs</div>
                    <div className="space-y-1.5">
                      {fit.programNeeds.map((n) => (
                        <div key={n} className="flex items-start gap-1.5 text-xs text-slate-500">
                          <Repeat2 className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                          {n}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* Roles */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3">
                Roles & Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {coach.roles.map((role) => (
                  <span key={role} className="px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-700 text-xs font-medium">
                    {role}
                  </span>
                ))}
              </div>
            </section>

            {/* Systems */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3">
                Schemes & Systems
              </h3>
              <div className="flex flex-wrap gap-2">
                {coach.systems.map((sys) => (
                  <span key={sys} className="px-3 py-1.5 rounded-lg bg-navy-900/5 text-navy-700 text-xs font-medium">
                    {sys}
                  </span>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3">
                Skills & Endorsements
              </h3>
              <div className="space-y-2.5">
                {coach.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{skill.name}</span>
                    <span className="font-mono text-xs text-teal-600 font-semibold bg-teal-500/10 px-2 py-0.5 rounded">
                      {skill.endorsementCount}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                Education
              </h3>
              <div className="space-y-3">
                {coach.education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-display font-semibold text-sm text-navy-900">{edu.degree}</div>
                    <div className="text-xs text-slate-500">{edu.institution} · {edu.year}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                Certifications
              </h3>
              <ul className="space-y-2">
                {coach.certifications.map((cert) => (
                  <li key={cert} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </section>

            {/* Awards */}
            {coach.awards.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200/80 p-6">
                <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold-400" />
                  Awards
                </h3>
                <ul className="space-y-2">
                  {coach.awards.map((award) => (
                    <li key={award} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                      {award}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Conferences */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <h3 className="font-display font-bold text-sm text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Conferences & Clinics
              </h3>
              <ul className="space-y-2">
                {coach.conferences.map((conf) => (
                  <li key={conf} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    {conf}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
