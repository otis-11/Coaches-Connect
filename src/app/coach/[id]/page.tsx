import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { coaches } from "@/data/coaches";
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

            {/* Bio */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
              <h2 className="font-display font-bold text-lg text-navy-900 mb-4">About</h2>
              <p className="text-slate-600 leading-relaxed">{coach.bio}</p>
            </section>

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
