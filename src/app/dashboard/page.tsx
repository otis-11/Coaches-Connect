"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/AuthContext";
import { coaches, feedPosts, opportunities } from "@/data/coaches";
import {
  Eye,
  Search,
  Users,
  TrendingUp,
  Briefcase,
  MessageSquare,
  Bell,
  ChevronRight,
  MapPin,
  Clock,
  Heart,
  Share2,
  Bookmark,
  Rss,
  GitBranch,
  ArrowUpRight,
  EyeOff,
  Compass,
  GraduationCap,
  Network,
} from "lucide-react";

const currentUser = coaches[0];

const careerPaths = [
  { from: "GA / Student Manager", to: "Quality Control / Analyst", level: 1 },
  { from: "Quality Control / Analyst", to: "Position Coach", level: 2 },
  { from: "Position Coach", to: "Coordinator", level: 3 },
  { from: "Coordinator", to: "Head Coach", level: 4 },
];

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const displayName = profile?.first_name || currentUser.firstName;
  const displayInitials = profile
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : currentUser.avatarInitials;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header - Cleaner */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 rounded-2xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-display font-bold text-lg border border-white/20">
                {displayInitials}
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                  Welcome back, {displayName}
                </h1>
                <p className="text-white/60 text-sm mt-0.5">
                  {profile?.title || currentUser.title} · {profile?.institution || currentUser.institution}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/notifications" className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
              </Link>
              <Link href="/messages" className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-400 text-navy-900 text-[10px] font-bold flex items-center justify-center">5</span>
              </Link>
              <Link href="/feed" className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                <Rss className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Eye, label: "Profile Views", value: "2,847", change: "+12%", color: "text-teal-500", bg: "bg-teal-500/10", href: "/profile" },
            { icon: Search, label: "Search Hits", value: "834", change: "+8%", color: "text-blue-500", bg: "bg-blue-500/10", href: "/discover" },
            { icon: Users, label: "Connections", value: "412", change: "+3 new", color: "text-purple-500", bg: "bg-purple-500/10", href: "/network" },
            { icon: TrendingUp, label: "Endorsements", value: "24", change: "+2", color: "text-gold-400", bg: "bg-gold-400/10", href: "/profile" },
          ].map((stat) => (
            <Link key={stat.label} href={stat.href} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md hover:border-slate-300 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-teal-600 bg-teal-500/10 px-2 py-0.5 rounded">{stat.change}</span>
              </div>
              <div className="font-mono text-2xl font-bold text-navy-900">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                {stat.label}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            {/* Quick Nav */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4">
              <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Quick Access</h3>
              <div className="space-y-1">
                {[
                  { href: "/feed", icon: Rss, label: "My Feed" },
                  { href: "/network", icon: Network, label: "Network" },
                  { href: "/messages", icon: MessageSquare, label: "Messages" },
                  { href: "/opportunities", icon: Briefcase, label: "Opportunities" },
                  { href: "/discover", icon: Compass, label: "Discover Coaches" },
                  { href: "/profile", icon: Eye, label: "My Profile" },
                  { href: "/settings", icon: Eye, label: "Settings" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-navy-900 hover:bg-slate-50 transition-all font-medium">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <div className="flex items-center gap-2 mb-3">
                <EyeOff className="w-4 h-4 text-slate-400" />
                <h3 className="font-display font-bold text-sm text-navy-900">Market Status</h3>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">Signal your availability confidentially to hiring programs.</p>
              <select className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30">
                <option value="not_looking">Not actively looking</option>
                <option value="open_position">Open to position coach roles</option>
                <option value="open_coordinator">Open to coordinator roles</option>
                <option value="open_head_coach">Open to head coaching roles</option>
                <option value="open_ga">Open to GA / analyst roles</option>
                <option value="confidentially_exploring">Confidentially exploring</option>
              </select>
              <div className="mt-2 text-[10px] text-teal-600 flex items-center gap-1">
                <EyeOff className="w-3 h-3" /> Only visible to verified hiring contacts
              </div>
            </div>

            {/* Career Path */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-gold-400" />
                <h3 className="font-display font-bold text-sm text-navy-900">Career Ladder</h3>
              </div>
              <div className="space-y-0">
                {careerPaths.map((step, i) => (
                  <div key={i} className="flex items-stretch gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${i <= 1 ? "bg-teal-500" : "bg-slate-200"} shrink-0`} />
                      {i < careerPaths.length - 1 && (
                        <div className={`w-px flex-1 ${i < 1 ? "bg-teal-500" : "bg-slate-200"}`} />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className={`text-xs font-semibold ${i <= 1 ? "text-navy-900" : "text-slate-400"}`}>{step.from}</div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gold-400 shrink-0" />
                  <div className="text-xs font-bold text-gold-400">Head Coach</div>
                </div>
              </div>
              <Link href="/career-paths" className="mt-3 flex items-center gap-1 text-[11px] text-teal-600 hover:text-teal-500 font-medium">
                Explore career paths <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            {/* Feed Preview */}
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-navy-900">Recent Activity</h2>
              <Link href="/feed" className="text-xs text-teal-600 hover:text-teal-500 font-medium flex items-center gap-0.5">
                Full feed <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {feedPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs shrink-0">
                      {post.authorInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-sm text-navy-900">{post.author}</div>
                      <div className="text-xs text-slate-500">{post.authorTitle} · {post.timeAgo}</div>
                    </div>
                    <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      post.type === "announcement" ? "bg-purple-50 text-purple-600"
                        : post.type === "insight" ? "bg-teal-50 text-teal-600"
                        : post.type === "development" ? "bg-blue-50 text-blue-600"
                        : "bg-slate-50 text-slate-500"
                    }`}>
                      {post.type}
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                    <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" /> <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition-colors">
                      <MessageSquare className="w-4 h-4" /> <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-500 transition-colors">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button className="ml-auto text-slate-400 hover:text-gold-400 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/feed" className="block w-full text-center py-3 bg-white rounded-xl border border-slate-200 text-sm font-display font-semibold text-teal-600 hover:bg-teal-50 transition-all">
              View Full Feed →
            </Link>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6 order-3">
            {/* New Opportunities */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-sm text-navy-900">New Opportunities</h3>
                <Link href="/opportunities" className="text-xs text-teal-600 hover:text-teal-500 font-medium flex items-center gap-0.5">
                  View all <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <Link key={opp.id} href="/opportunities" className="block p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors">
                    <div className="font-display font-semibold text-xs text-navy-900">{opp.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {opp.institution} · {opp.location}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {opp.posted}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Coaches You May Know */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-sm text-navy-900">Coaches You May Know</h3>
                <Link href="/discover" className="text-xs text-teal-600 hover:text-teal-500 font-medium flex items-center gap-0.5">
                  See more <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {coaches.slice(1, 5).map((coach) => (
                  <div key={coach.id} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-[10px] shrink-0">
                      {coach.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/coach/${coach.id}`} className="font-display font-semibold text-xs text-navy-900 group-hover:text-teal-600 transition-colors truncate block">
                        {coach.firstName} {coach.lastName}
                      </Link>
                      <div className="text-[11px] text-slate-500 truncate">{coach.title}</div>
                    </div>
                    <button className="shrink-0 px-2.5 py-1 rounded-lg border border-teal-200 text-teal-600 text-[10px] font-semibold hover:bg-teal-50 transition-all">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Trending in Coaching</h3>
              <div className="flex flex-wrap gap-1.5">
                {["Portal Season", "Spring Practice", "Air Raid", "NIL Compliance", "Recruiting", "Analytics", "Player Dev", "Leadership"].map((topic) => (
                  <Link key={topic} href="/feed" className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 font-medium hover:border-teal-200 hover:text-teal-600 transition-colors">
                    #{topic}
                  </Link>
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
