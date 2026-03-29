"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/lib/AuthContext";
import { filmClips, coaches, scoutingInsights, coachClassifications, type FilmClip } from "@/data/coaches";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Send,
  TrendingUp,
  X,
  UserPlus,
  UserCheck,
  Play,
  Film,
  Eye,
  Clock,
  Target,
  BookOpen,
  Zap,
  Clapperboard,
  Filter,
  Crosshair,
} from "lucide-react";

interface FeedPost {
  id: string;
  clipId: string;
  coachId: string;
  coachName: string;
  coachInitials: string;
  coachTitle: string;
  coachInstitution: string;
  coachSport: string;
  caption: string;
  clip: FilmClip;
  postedAt: string;
  likes: number;
  comments: number;
  userLiked: boolean;
}

const categoryConfig: Record<FilmClip["category"], { label: string; icon: typeof Play; color: string }> = {
  play: { label: "Play", icon: Target, color: "bg-teal-50 text-teal-700" },
  scheme: { label: "Scheme", icon: BookOpen, color: "bg-blue-50 text-blue-700" },
  drill: { label: "Drill", icon: Zap, color: "bg-amber-50 text-amber-700" },
  "game-film": { label: "Game Film", icon: Film, color: "bg-red-50 text-red-700" },
  breakdown: { label: "Breakdown", icon: Clapperboard, color: "bg-purple-50 text-purple-700" },
};

const mockComments: Record<string, { id: string; author: string; initials: string; title: string; content: string; timeAgo: string }[]> = {
  "fp-1": [
    { id: "c1", author: "Devon Jackson", initials: "DJ", title: "DB Coach, Tennessee State", content: "That glance route is money. We see a lot of Cover 3 in our conference too — going to rep this.", timeAgo: "2h ago" },
    { id: "c2", author: "Tyler Brooks", initials: "TB", title: "OL Coach, Grand View", content: "What's the protection look like on this? Slide or BOB?", timeAgo: "1h ago" },
  ],
  "fp-2": [
    { id: "c3", author: "Michelle Okafor", initials: "MO", title: "Assoc. HC, Howard", content: "This is exactly what we needed for our press break. The spacing is perfect.", timeAgo: "4h ago" },
    { id: "c4", author: "Antonio Reyes", initials: "AR", title: "Player Dev, RGV Vipers", content: "Same reads we teach in our PnR offense. Great teaching tape.", timeAgo: "3h ago" },
  ],
  "fp-3": [
    { id: "c5", author: "Marcus Williams", initials: "MW", title: "OC, Central State", content: "Coach, this reroute technique is elite. Can you share the individual drill progression?", timeAgo: "6h ago" },
  ],
  "fp-4": [
    { id: "c6", author: "Sarah Chen", initials: "SC", title: "Head Coach, Pacific Lutheran", content: "Pack-line principles translate everywhere. Love seeing this broken down step by step.", timeAgo: "1d ago" },
    { id: "c7", author: "Devon Jackson", initials: "DJ", title: "DB Coach, Tennessee State", content: "The help-side rotation here is textbook. Saving this for our film session.", timeAgo: "20h ago" },
  ],
  "fp-5": [
    { id: "c8", author: "Sarah Chen", initials: "SC", title: "Head Coach, Pacific Lutheran", content: "Pick-and-roll reads are the foundation. This is excellent player dev content.", timeAgo: "2d ago" },
  ],
  "fp-6": [
    { id: "c9", author: "Antonio Reyes", initials: "AR", title: "Player Dev, RGV Vipers", content: "Converting athletes is an underrated skill. This is how programs are built.", timeAgo: "1d ago" },
  ],
};

// Build feed from film clips — coaches sharing their best plays
function buildFilmFeed(): FeedPost[] {
  const captions: Record<string, string> = {
    "clip-1": "Our bread-and-butter RPO that accounted for 14 TDs this season. If you're seeing a lot of Cover 3, this glance concept is a cheat code. Film breakdown + play call included. 🎯",
    "clip-7": "Here's our primary half-court action from the NWC Tournament run. 5-out to ball screen with 3 reads. Created layup-line looks against every switching defense we saw. 1.12 PPP. 🏀",
    "clip-8": "Teaching our DBs to pattern-match in Cover 3. This is the reroute-and-rally technique that got us 3 INTs this season. Full film from TSU vs. SEMO. 🎬",
    "clip-6": "Full teaching progression for our pack-line defense. This is how we held opponents to 38% FG in conference play. Help-side rotation and closeout technique breakdown. 🛡️",
    "clip-10": "Breaking down ball-handler reads in our primary pick-and-roll. When to turn the corner, when to hit the roller, when to skip. This is how we got top 5 PnR efficiency in the G-League. 📊",
    "clip-12": "Teaching tape for our inside zone double-team. Hip-to-hip landmark, vertical displacement, and when to climb. This is how we develop OL at the NAIA level. 💪",
    "clip-4": "Full 4th quarter cut-up from our comeback win over Tuskegee. Down 17, we scored 24 unanswered with our tempo package. Every play annotated. This is what we preach — NEXT PLAY mentality. 🔥",
    "clip-11": "We got pressed out of the gym by Delaware State. So we installed this 1-4 flat press break and broke it 14 straight possessions in the rematch. Adjustments win games. ♟️",
    "clip-5": "Whiteboard + film breakdown of how we attack Cover 2. Four-verticals, smash, and the sail route that gave us 3 TDs in the SIAC championship. Coaches, steal this. 📋",
    "clip-9": "Spring ball drill tape — press-bail technique, off-man footwork, and transition. This is the progression that developed two all-conference corners. Individual work matters. 🏋️",
  };

  const clipOrder = ["clip-1", "clip-7", "clip-8", "clip-6", "clip-10", "clip-12", "clip-4", "clip-11", "clip-5", "clip-9"];
  const hoursAgo = [2, 5, 8, 14, 26, 34, 48, 72, 96, 120];

  return clipOrder.map((clipId, i) => {
    const clip = filmClips.find((c) => c.id === clipId)!;
    const coach = coaches.find((c) => c.id === clip.coachId);
    return {
      id: `fp-${i + 1}`,
      clipId: clip.id,
      coachId: clip.coachId,
      coachName: coach ? `${coach.firstName} ${coach.lastName}` : "Coach",
      coachInitials: coach?.avatarInitials || "??",
      coachTitle: coach?.title || "",
      coachInstitution: coach?.institution || "",
      coachSport: coach?.sport || "football",
      caption: captions[clipId] || clip.description,
      clip,
      postedAt: new Date(Date.now() - hoursAgo[i] * 60 * 60 * 1000).toISOString(),
      likes: clip.likes + Math.floor(Math.random() * 50),
      comments: Object.keys(mockComments).includes(`fp-${i + 1}`) ? (mockComments[`fp-${i + 1}`]?.length || 0) : 0,
      userLiked: i === 1 || i === 4,
    };
  });
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function FeedPage() {
  const { user, profile } = useAuth();
  const { showToast } = useToast();
  const [posts, setPosts] = useState<FeedPost[]>(buildFilmFeed);
  const [filter, setFilter] = useState<FilmClip["category"] | "all">("all");
  const [sportFilter, setSportFilter] = useState<"all" | "football" | "basketball">("all");
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [localComments, setLocalComments] = useState<Record<string, { id: string; author: string; initials: string; title: string; content: string; timeAgo: string }[]>>(mockComments);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, userLiked: !p.userLiked, likes: p.userLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleShare = (postId: string) => {
    navigator.clipboard?.writeText(`${window.location.origin}/feed#${postId}`);
    showToast("Link copied to clipboard");
  };

  const handleBookmark = (postId: string) => {
    const was = bookmarked[postId];
    setBookmarked((prev) => ({ ...prev, [postId]: !was }));
    showToast(was ? "Removed from saved" : "Film saved to your collection");
  };

  const handleFollow = (authorName: string) => {
    const was = following[authorName];
    setFollowing((prev) => ({ ...prev, [authorName]: !was }));
    showToast(was ? `Unfollowed ${authorName}` : `Following ${authorName}`);
  };

  const handleReply = (postId: string) => {
    if (commentText.trim()) {
      const newComment = {
        id: `local-${Date.now()}`,
        author: profile ? `${profile.first_name} ${profile.last_name}` : "You",
        initials: profile ? `${profile.first_name[0]}${profile.last_name[0]}` : "Y",
        title: profile?.title || "Coach",
        content: commentText.trim(),
        timeAgo: "just now",
      };
      setLocalComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      }));
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, comments: p.comments + 1 } : p));
      setCommentText("");
      showToast("Comment posted");
    }
  };

  const filteredPosts = posts
    .filter((p) => filter === "all" || p.clip.category === filter)
    .filter((p) => sportFilter === "all" || p.clip.sport === sportFilter);

  const categories = Object.keys(categoryConfig) as FilmClip["category"][];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <Film className="w-8 h-8 text-teal-400" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Film Feed
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Coaches sharing their best plays, schemes, and breakdowns. Watch, learn, and connect.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">Type:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === "all" ? "bg-navy-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                All
              </button>
              {categories.map((cat) => {
                const cfg = categoryConfig[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filter === cat ? "bg-navy-900 text-white" : `bg-white border border-slate-200 text-slate-600 hover:bg-slate-50`
                    }`}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
            <div className="sm:ml-auto flex gap-1.5">
              {(["all", "football", "basketball"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSportFilter(s)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    sportFilter === s ? "bg-navy-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {s === "all" ? "All" : s === "football" ? "🏈" : "🏀"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Film Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const cfg = categoryConfig[post.clip.category];
            const CatIcon = cfg.icon;
            return (
              <div key={post.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Coach Header */}
                <div className="p-4 pb-3">
                  <div className="flex items-start gap-3">
                    <Link href={`/coach/${post.coachId}`}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs shrink-0 hover:ring-2 hover:ring-teal-500/50 transition-all">
                        {post.coachInitials}
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link href={`/coach/${post.coachId}`} className="font-display font-semibold text-sm text-navy-900 hover:text-teal-600 transition-colors">
                          {post.coachName}
                        </Link>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                          {post.coachSport === "football" ? "🏈" : "🏀"}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {post.coachTitle}, {post.coachInstitution} · {timeAgo(post.postedAt)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollow(post.coachName)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all shrink-0 ${
                        following[post.coachName]
                          ? "bg-teal-50 text-teal-600 border border-teal-200"
                          : "border border-slate-200 text-slate-500 hover:border-teal-200 hover:text-teal-600"
                      }`}
                    >
                      {following[post.coachName] ? <UserCheck className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
                      {following[post.coachName] ? "Following" : "Follow"}
                    </button>
                  </div>
                </div>

                {/* Scouting Decision Badge */}
                {(() => {
                  const linkedInsight = scoutingInsights.find(s => s.linkedClipId === post.clipId);
                  const cls = coachClassifications[post.coachId];
                  if (!linkedInsight && !cls) return null;
                  return (
                    <div className="px-4 pb-2 flex flex-wrap items-center gap-2">
                      {linkedInsight && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                          <Crosshair className="w-3 h-3" /> Scouting Decision Linked
                        </span>
                      )}
                      {cls && (
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          cls.primaryIdentity === "Recruiter" ? "bg-purple-50 text-purple-600" :
                          cls.primaryIdentity === "Developer" ? "bg-teal-50 text-teal-600" :
                          cls.primaryIdentity === "Strategist" ? "bg-blue-50 text-blue-600" :
                          "bg-amber-50 text-amber-600"
                        }`}>
                          {cls.primaryIdentity}
                        </span>
                      )}
                    </div>
                  );
                })()}

                {/* Caption */}
                <div className="px-4 pb-3">
                  <p className="text-slate-700 text-sm leading-relaxed">{post.caption}</p>
                </div>

                {/* Film Thumbnail */}
                <div className={`relative h-52 sm:h-64 bg-gradient-to-br ${post.clip.thumbnailColor} flex items-center justify-center cursor-pointer group`}>
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-700">
                      <CatIcon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-mono">
                    {post.clip.duration}
                  </div>
                  <div className="absolute bottom-3 left-3 max-w-[70%]">
                    <div className="px-2.5 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm">
                      <div className="font-display font-bold text-white text-sm truncate">{post.clip.title}</div>
                      {post.clip.formation && (
                        <div className="text-white/70 text-[10px] mt-0.5">{post.clip.formation}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Result badge */}
                {post.clip.result && (
                  <div className="mx-4 mt-3 p-2.5 rounded-xl bg-teal-50 border border-teal-100">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-xs font-semibold text-teal-700">Result:</span>
                      <span className="text-xs text-teal-600">{post.clip.result}</span>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="px-4 pt-3 flex flex-wrap gap-1.5">
                  {post.clip.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-slate-50 text-slate-500 border border-slate-100">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats + Actions */}
                <div className="px-4 py-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.clip.views.toLocaleString()} views</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.clip.uploadedAt}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        post.userLiked ? "text-red-500" : "text-slate-500 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.userLiked ? "fill-current" : ""}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setExpandedComments(expandedComments === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-600 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments + (localComments[post.id]?.length || 0) - (mockComments[post.id]?.length || 0)}</span>
                    </button>
                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                    <Link
                      href={`/coach/${post.coachId}/film`}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-600 transition-colors"
                    >
                      <Film className="w-4 h-4" /> Film Room
                    </Link>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`ml-auto transition-colors ${bookmarked[post.id] ? "text-gold-400" : "text-slate-400 hover:text-gold-400"}`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked[post.id] ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Comments */}
                  {expandedComments === post.id && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="space-y-3 mb-3">
                        {(localComments[post.id] || []).length > 0 ? (
                          (localComments[post.id] || []).map((comment) => (
                            <div key={comment.id} className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-[9px] shrink-0">
                                {comment.initials}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-navy-900">{comment.author}</span>
                                  <span className="text-[10px] text-slate-400">{comment.timeAgo}</span>
                                </div>
                                <p className="text-xs text-slate-600 mt-0.5">{comment.content}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-slate-400 italic">
                            No comments yet. Be the first to break down this film.
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleReply(post.id)}
                          placeholder="Drop a comment on this film..."
                          className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                        />
                        <button
                          onClick={() => handleReply(post.id)}
                          className="px-3 py-2 bg-teal-500 text-white text-xs font-semibold rounded-lg hover:bg-teal-400 transition-all"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <Film className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-navy-900 text-lg mb-2">No film posts found</h3>
            <p className="text-slate-500 text-sm">Try a different filter to see more plays and breakdowns.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
