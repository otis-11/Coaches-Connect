"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { coaches, filmClips, type FilmClip } from "@/data/coaches";
import {
  ArrowLeft,
  ChevronRight,
  Play,
  Clock,
  Eye,
  Heart,
  Filter,
  Upload,
  Film,
  Target,
  Zap,
  BookOpen,
  Clapperboard,
  Search,
  Share2,
  X,
} from "lucide-react";

const categoryConfig: Record<FilmClip["category"], { label: string; icon: typeof Play; color: string }> = {
  play: { label: "Play", icon: Target, color: "bg-teal-500/10 text-teal-700 border-teal-200" },
  scheme: { label: "Scheme", icon: BookOpen, color: "bg-blue-500/10 text-blue-700 border-blue-200" },
  drill: { label: "Drill", icon: Zap, color: "bg-amber-500/10 text-amber-700 border-amber-200" },
  "game-film": { label: "Game Film", icon: Film, color: "bg-red-500/10 text-red-700 border-red-200" },
  breakdown: { label: "Breakdown", icon: Clapperboard, color: "bg-purple-500/10 text-purple-700 border-purple-200" },
};

export default function FilmRoomPage() {
  const params = useParams();
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState<FilmClip["category"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClip, setSelectedClip] = useState<FilmClip | null>(null);
  const [likedClips, setLikedClips] = useState<Record<string, boolean>>({});

  const coach = coaches.find((c) => c.id === params.id);
  if (!coach) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <Film className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-navy-900 mb-2">Coach Not Found</h2>
          <Link href="/discover" className="text-teal-600 font-semibold text-sm">&larr; Back to Discover</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const coachClips = filmClips.filter((c) => c.coachId === coach.id);
  const filteredClips = coachClips
    .filter((c) => activeCategory === "all" || c.category === activeCategory)
    .filter((c) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q)) || c.description.toLowerCase().includes(q);
    });

  const totalViews = coachClips.reduce((s, c) => s + c.views, 0);
  const totalLikes = coachClips.reduce((s, c) => s + c.likes, 0);

  const handleLike = (clipId: string) => {
    setLikedClips((prev) => ({ ...prev, [clipId]: !prev[clipId] }));
    showToast(likedClips[clipId] ? "Removed like" : "Clip liked!");
  };

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
          <span className="text-navy-900 font-medium">Film Room</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center">
                <Film className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-navy-900">Film Room</h1>
                <p className="text-sm text-slate-500">{coach.firstName} {coach.lastName}&apos;s plays, schemes, drills, and game film</p>
              </div>
            </div>
            <button
              onClick={() => showToast("Upload feature coming soon — film uploads will be available in the next release.")}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-sm font-display font-semibold rounded-lg hover:bg-teal-400 transition-all"
            >
              <Upload className="w-4 h-4" /> Upload Clip
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Film className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{coachClips.length}</div>
            <div className="text-[11px] text-slate-500">Total Clips</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Eye className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{totalViews.toLocaleString()}</div>
            <div className="text-[11px] text-slate-500">Total Views</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{totalLikes}</div>
            <div className="text-[11px] text-slate-500">Total Likes</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{new Set(coachClips.map((c) => c.category)).size}</div>
            <div className="text-[11px] text-slate-500">Categories</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  activeCategory === "all" ? "bg-navy-900 text-white border-navy-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                All ({coachClips.length})
              </button>
              {(Object.keys(categoryConfig) as FilmClip["category"][]).map((cat) => {
                const count = coachClips.filter((c) => c.category === cat).length;
                if (count === 0) return null;
                const cfg = categoryConfig[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      activeCategory === cat ? "bg-navy-900 text-white border-navy-900" : `${cfg.color} border`
                    }`}
                  >
                    {cfg.label} ({count})
                  </button>
                );
              })}
            </div>
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search clips or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50"
              />
            </div>
          </div>
        </div>

        {/* Clips Grid */}
        {filteredClips.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
            <Film className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-display font-semibold text-navy-900 mb-1">No clips found</p>
            <p className="text-sm text-slate-500">Try a different filter or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredClips.map((clip) => {
              const cfg = categoryConfig[clip.category];
              const CatIcon = cfg.icon;
              return (
                <div
                  key={clip.id}
                  onClick={() => setSelectedClip(clip)}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <div className={`h-40 bg-gradient-to-br ${clip.thumbnailColor} relative flex items-center justify-center`}>
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-white ml-1" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 ${cfg.color.split(" ")[1]}`}>
                        <CatIcon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-mono">
                      {clip.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display font-bold text-sm text-navy-900 mb-1 line-clamp-2">{clip.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{clip.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {clip.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">{tag}</span>
                      ))}
                      {clip.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-500">+{clip.tags.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {clip.views.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {clip.likes}</span>
                      </div>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {clip.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Clip Detail Modal */}
        {selectedClip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedClip(null)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Video area */}
              <div className={`h-56 bg-gradient-to-br ${selectedClip.thumbnailColor} relative flex items-center justify-center rounded-t-2xl`}>
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-mono">{selectedClip.duration}</div>
                <button onClick={() => setSelectedClip(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${categoryConfig[selectedClip.category].color} mb-2`}>
                      {categoryConfig[selectedClip.category].label}
                    </span>
                    <h2 className="font-display font-bold text-lg text-navy-900">{selectedClip.title}</h2>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">{selectedClip.description}</p>

                {selectedClip.formation && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Formation:</span>
                    <span className="text-sm text-navy-900 font-medium">{selectedClip.formation}</span>
                  </div>
                )}

                {selectedClip.result && (
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 mb-4">
                    <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Result:</span>
                    <p className="text-sm text-teal-800 font-medium mt-0.5">{selectedClip.result}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedClip.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 font-medium">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {selectedClip.views.toLocaleString()} views</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedClip.uploadedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(selectedClip.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        likedClips[selectedClip.id]
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-white text-slate-600 border border-slate-200 hover:border-red-200 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedClips[selectedClip.id] ? "fill-red-500" : ""}`} />
                      {likedClips[selectedClip.id] ? "Liked" : "Like"}
                    </button>
                    <button
                      onClick={() => showToast("Link copied to clipboard!")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
