"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/Toast";
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
  Zap,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const currentUser = coaches[0];

const hiddenMarketAlerts = [
  { id: "hm1", role: "Coordinator", level: "FCS", region: "Southeast", count: 3 },
  { id: "hm2", role: "Position Coach", level: "D2", region: "Midwest", count: 7 },
  { id: "hm3", role: "Graduate Assistant", level: "Power 5", region: "National", count: 12 },
];

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const displayName = profile?.first_name || currentUser.firstName;

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});
  const [postLikes, setPostLikes] = useState<Record<string, number>>(
    Object.fromEntries(feedPosts.map((p) => [p.id, p.likes]))
  );
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [connectedCoaches, setConnectedCoaches] = useState<Record<string, "idle" | "pending" | "connected">>({});
  const [feedFilter, setFeedFilter] = useState("all");

  const handleLike = (postId: string) => {
    const wasLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !wasLiked }));
    setPostLikes((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + (wasLiked ? -1 : 1) }));
  };

  const handleBookmark = (postId: string) => {
    const wasBookmarked = bookmarkedPosts[postId];
    setBookmarkedPosts((prev) => ({ ...prev, [postId]: !wasBookmarked }));
    showToast(wasBookmarked ? "Removed from saved" : "Post saved");
  };

  const handleShare = (postId: string) => {
    navigator.clipboard?.writeText(`${window.location.origin}/feed#${postId}`);
    showToast("Link copied to clipboard");
  };

  const handleConnect = (coachId: string) => {
    setConnectedCoaches((prev) => {
      const current = prev[coachId] || "idle";
      if (current === "idle") {
        showToast("Connection request sent");
        return { ...prev, [coachId]: "pending" };
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900">
              Welcome back, {displayName}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Here&apos;s what&apos;s happening in your coaching network
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/notifications" className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-white hover:shadow-sm transition-all">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </Link>
            <Link href="/messages" className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-white hover:shadow-sm transition-all">
              <MessageSquare className="w-5 h-5 text-slate-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center">
                5
              </span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Eye, label: "Profile Views", value: currentUser.profileViews.toLocaleString(), change: "+12%", color: "text-teal-500", bg: "bg-teal-500/10", href: "/profile" },
            { icon: Search, label: "Search Appearances", value: currentUser.searchAppearances.toString(), change: "+8%", color: "text-blue-500", bg: "bg-blue-500/10", href: "/discover" },
            { icon: Users, label: "Connections", value: currentUser.connections.toString(), change: "+3", color: "text-purple-500", bg: "bg-purple-500/10", href: "/network" },
            { icon: TrendingUp, label: "Endorsements", value: currentUser.endorsements.length.toString(), change: "+2", color: "text-gold-400", bg: "bg-gold-400/10", href: "/profile" },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-teal-600 bg-teal-500/10 px-2 py-0.5 rounded">
                  {stat.change}
                </span>
              </div>
              <div className="font-mono text-2xl font-bold text-navy-900">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Hidden Market Alerts Strip */}
        <div className="bg-gradient-to-r from-gold-400/10 to-teal-500/10 rounded-2xl border border-gold-400/20 p-5 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-gold-400" />
            <h3 className="font-display font-bold text-sm text-navy-900">Hidden Market Alerts</h3>
            <Link href="/hidden-market" className="ml-auto text-xs text-teal-600 hover:text-teal-500 font-medium flex items-center gap-0.5">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {hiddenMarketAlerts.map((alert) => (
              <Link key={alert.id} href="/hidden-market" className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-slate-100 hover:border-teal-200 transition-colors">
                <AlertTriangle className="w-4 h-4 text-gold-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-navy-900">{alert.count} {alert.role} openings</div>
                  <div className="text-[10px] text-slate-500">{alert.level} · {alert.region}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-navy-900">Your Feed</h2>
              <div className="flex items-center gap-2">
                <Link href="/feed" className="text-xs text-teal-600 hover:text-teal-500 font-medium flex items-center gap-0.5 mr-3">
                  Full feed <ArrowRight className="w-3 h-3" />
                </Link>
                <select
                  value={feedFilter}
                  onChange={(e) => setFeedFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                >
                  <option value="all">All Updates</option>
                  <option value="announcement">Announcements</option>
                  <option value="insight">Insights</option>
                  <option value="milestone">Milestones</option>
                </select>
              </div>
            </div>

            {feedPosts
              .filter((p) => feedFilter === "all" || p.type === feedFilter)
              .slice(0, 3)
              .map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Post header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs shrink-0">
                      {post.authorInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-sm text-navy-900">
                        {post.author}
                      </div>
                      <div className="text-xs text-slate-500">
                        {post.authorTitle} · {post.timeAgo}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        post.type === "update"
                          ? "bg-blue-50 text-blue-600"
                          : post.type === "milestone"
                            ? "bg-gold-400/10 text-gold-400"
                            : post.type === "article"
                              ? "bg-purple-50 text-purple-600"
                              : "bg-teal-50 text-teal-600"
                      }`}
                    >
                      {post.type}
                    </span>
                  </div>

                  {/* Post content */}
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    {post.content}
                  </p>

                  {/* Post actions */}
                  <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${
                        likedPosts[post.id] ? "text-red-500" : "text-slate-500 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPosts[post.id] ? "fill-current" : ""}`} />
                      <span>{postLikes[post.id] || post.likes}</span>
                    </button>
                    <button
                      onClick={() => setExpandedComments(expandedComments === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`ml-auto flex items-center gap-1.5 text-xs transition-colors ${
                        bookmarkedPosts[post.id] ? "text-gold-400" : "text-slate-500 hover:text-gold-400"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedPosts[post.id] ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Expanded comments */}
                  {expandedComments === post.id && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="text-xs text-slate-400 italic mb-3">
                        Comments from your network will appear here.
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="Write a comment..."
                          className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && commentInputs[post.id]?.trim()) {
                              showToast("Comment posted");
                              setCommentInputs((prev) => ({ ...prev, [post.id]: "" }));
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            if (commentInputs[post.id]?.trim()) {
                              showToast("Comment posted");
                              setCommentInputs((prev) => ({ ...prev, [post.id]: "" }));
                            }
                          }}
                          className="px-3 py-2 bg-teal-500 text-white text-xs font-semibold rounded-lg hover:bg-teal-400 transition-all"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
              <div className={`h-16 bg-gradient-to-r ${currentUser.bannerColor}`} />
              <div className="px-5 pb-5 -mt-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-sm border-3 border-white shadow-lg mb-2">
                  {profile ? `${profile.first_name[0]}${profile.last_name[0]}` : currentUser.avatarInitials}
                </div>
                <Link href="/profile" className="font-display font-bold text-sm text-navy-900 hover:text-teal-600 transition-colors">
                  {profile ? `${profile.first_name} ${profile.last_name}` : `${currentUser.firstName} ${currentUser.lastName}`}
                </Link>
                <p className="text-xs text-slate-500 mt-0.5">{profile?.title || currentUser.title}</p>
                <p className="text-xs text-slate-400">{profile?.institution || currentUser.institution}</p>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Profile views</span>
                    <span className="font-mono font-semibold text-teal-600">{currentUser.profileViews}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Connections</span>
                    <span className="font-mono font-semibold text-teal-600">{currentUser.connections}</span>
                  </div>
                </div>

                <Link href="/profile" className="block mt-3 text-center py-2 rounded-lg border border-slate-200 text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-all">
                  View Profile
                </Link>
              </div>
            </div>

            {/* Quick Opportunities */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-sm text-navy-900">New Opportunities</h3>
                <Link href="/opportunities" className="text-xs text-teal-600 hover:text-teal-500 font-medium flex items-center gap-0.5">
                  View all <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <Link
                    key={opp.id}
                    href={`/opportunities/${opp.id}`}
                    className="block p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors"
                  >
                    <div className="font-display font-semibold text-xs text-navy-900">{opp.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {opp.institution} · {opp.location}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {opp.posted}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Suggested Connections */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-sm text-navy-900">Coaches You May Know</h3>
                <Link href="/discover" className="text-xs text-teal-600 hover:text-teal-500 font-medium flex items-center gap-0.5">
                  See more <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {coaches.slice(1, 5).map((coach) => {
                  const status = connectedCoaches[coach.id] || "idle";
                  return (
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
                      <button
                        onClick={() => handleConnect(coach.id)}
                        disabled={status !== "idle"}
                        className={`shrink-0 px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          status === "connected"
                            ? "bg-teal-50 text-teal-600 border border-teal-200"
                            : status === "pending"
                              ? "bg-slate-50 text-slate-400 border border-slate-200"
                              : "border border-teal-200 text-teal-600 hover:bg-teal-50"
                        }`}
                      >
                        {status === "connected" ? "Connected" : status === "pending" ? "Pending" : "Connect"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
              <h3 className="font-display font-bold text-sm text-navy-900 mb-3">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Portal Season",
                  "Spring Practice",
                  "Air Raid",
                  "NIL Compliance",
                  "Recruiting",
                  "Analytics",
                  "Player Development",
                  "Leadership",
                ].map((topic) => (
                  <Link
                    key={topic}
                    href={`/feed?tag=${encodeURIComponent(topic)}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 font-medium hover:border-teal-200 hover:text-teal-600 transition-colors"
                  >
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
