"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Image,
  Send,
  MoreHorizontal,
  TrendingUp,
  Filter,
  ChevronDown,
  X,
  Repeat2,
  UserPlus,
  UserCheck,
} from "lucide-react";

interface Post {
  id: string;
  author_id: string;
  content: string;
  post_type: string;
  tags: string[];
  image_url: string | null;
  created_at: string;
  author: {
    first_name: string;
    last_name: string;
    title: string | null;
    institution: string | null;
    sport: string | null;
    avatar_url: string | null;
  } | null;
  likes_count: number;
  comments_count: number;
  user_liked: boolean;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: {
    first_name: string;
    last_name: string;
    title: string | null;
  } | null;
}

const postTypes = [
  { value: "update", label: "Update", color: "bg-blue-50 text-blue-600" },
  { value: "insight", label: "Insight", color: "bg-teal-50 text-teal-600" },
  { value: "announcement", label: "Announcement", color: "bg-purple-50 text-purple-600" },
  { value: "milestone", label: "Milestone", color: "bg-gold-400/10 text-gold-400" },
  { value: "article", label: "Article", color: "bg-orange-50 text-orange-600" },
];

// Mock feed data for demo (used when no Supabase posts exist yet)
const mockComments: Record<string, { id: string; author: string; initials: string; title: string; content: string; timeAgo: string }[]> = {
  "mock-1": [
    { id: "c1", author: "Devon Jackson", initials: "DJ", title: "DB Coach, Tennessee State", content: "This is amazing! Would love to attend. Is there a limit on spots?", timeAgo: "2h ago" },
    { id: "c2", author: "Marcus Williams", initials: "MW", title: "OC, Central State", content: "Howard always puts on a great clinic. Highly recommend for young coaches.", timeAgo: "1h ago" },
  ],
  "mock-2": [
    { id: "c3", author: "Sarah Chen", initials: "SC", title: "Head Coach, Pacific Lutheran", content: "This applies to basketball too. Simplicity in your sets builds confidence.", timeAgo: "5h ago" },
    { id: "c4", author: "Antonio Reyes", initials: "AR", title: "Assistant Coach, UT Arlington", content: "Coach Thompson's influence runs deep. Great insight.", timeAgo: "4h ago" },
    { id: "c5", author: "Tyler Brooks", initials: "TB", title: "OL Coach, Grand View", content: "We run the same philosophy with our run game install. Less is more.", timeAgo: "3h ago" },
  ],
  "mock-3": [
    { id: "c6", author: "Michelle Okafor", initials: "MO", title: "Assoc. HC, Howard", content: "That panel was incredible! Glad you made it out.", timeAgo: "20h ago" },
  ],
  "mock-4": [
    { id: "c7", author: "Marcus Williams", initials: "MW", title: "OC, Central State", content: "This is gold. QB eyes tell you everything before the snap.", timeAgo: "1d ago" },
    { id: "c8", author: "Michelle Okafor", initials: "MO", title: "Assoc. HC, Howard", content: "Same concept applies to reading the point guard in transition defense.", timeAgo: "1d ago" },
  ],
  "mock-5": [
    { id: "c9", author: "Sarah Chen", initials: "SC", title: "Head Coach, Pacific Lutheran", content: "Congratulations! Player development is the real scoreboard.", timeAgo: "2d ago" },
  ],
};

const mockFeed: Post[] = [
  {
    id: "mock-1",
    author_id: "mock",
    content: "Thrilled to announce that Howard women's basketball will be hosting our annual coaching clinic this summer! Great opportunity for aspiring coaches to learn from some of the best minds in the MEAC. Registration opens next week.",
    post_type: "announcement",
    tags: ["clinic", "MEAC", "womensbasketball"],
    image_url: null,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    author: { first_name: "Michelle", last_name: "Okafor", title: "Associate Head Coach", institution: "Howard University", sport: "basketball", avatar_url: null },
    likes_count: 47,
    comments_count: 12,
    user_liked: false,
  },
  {
    id: "mock-2",
    author_id: "mock",
    content: "One thing I learned early from Coach Thompson: the best play callers aren't the ones with the most plays — they're the ones who know which 15 plays to call in the right moment. Simplicity creates confidence. Confidence creates execution.",
    post_type: "insight",
    tags: ["playcalling", "coaching", "football"],
    image_url: null,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    author: { first_name: "Marcus", last_name: "Williams", title: "OC / QB Coach", institution: "Central State University", sport: "football", avatar_url: null },
    likes_count: 89,
    comments_count: 23,
    user_liked: true,
  },
  {
    id: "mock-3",
    author_id: "mock",
    content: "Just returned from the WBCA Convention — so many incredible sessions on building defensive culture. The panel on pack-line defense adaptations for smaller rosters was exactly what I needed. Grateful for this coaching community.",
    post_type: "update",
    tags: ["WBCA", "defense", "basketball"],
    image_url: null,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    author: { first_name: "Sarah", last_name: "Chen", title: "Head Coach", institution: "Pacific Lutheran University", sport: "basketball", avatar_url: null },
    likes_count: 62,
    comments_count: 8,
    user_liked: false,
  },
  {
    id: "mock-4",
    author_id: "mock",
    content: "Film study tip for young DB coaches: don't just watch the receiver — watch the QB's eyes and shoulders. Teach your guys to read the same pre-snap cues the QB is reading. It changes everything about how they play the ball.",
    post_type: "insight",
    tags: ["filmStudy", "DBcoach", "football"],
    image_url: null,
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    author: { first_name: "Devon", last_name: "Jackson", title: "DB Coach", institution: "Tennessee State University", sport: "football", avatar_url: null },
    likes_count: 134,
    comments_count: 31,
    user_liked: false,
  },
  {
    id: "mock-5",
    author_id: "mock",
    content: "Excited to share that three of our players from the 2023 class have earned All-Conference honors this season. Player development is a process, not an event. Proud of these young men and the work they've put in.",
    post_type: "milestone",
    tags: ["playerDevelopment", "AllConference", "proud"],
    image_url: null,
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    author: { first_name: "Antonio", last_name: "Reyes", title: "Assistant Coach", institution: "UT Arlington", sport: "basketball", avatar_url: null },
    likes_count: 201,
    comments_count: 42,
    user_liked: true,
  },
];

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
  const [posts, setPosts] = useState<Post[]>(mockFeed);
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState("update");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [posting, setPosting] = useState(false);
  const [filter, setFilter] = useState("all");
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [reposted, setReposted] = useState<Record<string, boolean>>({});
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [localComments, setLocalComments] = useState<Record<string, { id: string; author: string; initials: string; title: string; content: string; timeAgo: string }[]>>(mockComments);
  const { showToast } = useToast();

  const handleShare = (postId: string) => {
    navigator.clipboard?.writeText(`${window.location.origin}/feed#${postId}`);
    showToast("Link copied to clipboard");
  };

  const handleBookmark = (postId: string) => {
    const was = bookmarked[postId];
    setBookmarked((prev) => ({ ...prev, [postId]: !was }));
    showToast(was ? "Removed from saved" : "Post saved");
  };

  const handleRepost = (postId: string) => {
    const was = reposted[postId];
    setReposted((prev) => ({ ...prev, [postId]: !was }));
    showToast(was ? "Repost removed" : "Reposted to your profile");
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
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p));
      setCommentText("");
      showToast("Comment posted");
    }
  };

  // Load posts from Supabase on mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("cc_posts")
      .select(`*, author:cc_profiles!author_id(first_name, last_name, title, institution, sport, avatar_url)`)
      .order("created_at", { ascending: false })
      .limit(50);

    if (data && data.length > 0) {
      const enriched = await Promise.all(
        data.map(async (post: any) => {
          const { count: likesCount } = await supabase
            .from("cc_post_likes")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);

          const { count: commentsCount } = await supabase
            .from("cc_post_comments")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);

          let userLiked = false;
          if (user) {
            const { data: likeData } = await supabase
              .from("cc_post_likes")
              .select("id")
              .eq("post_id", post.id)
              .eq("user_id", user.id)
              .single();
            userLiked = !!likeData;
          }

          return {
            ...post,
            likes_count: likesCount || 0,
            comments_count: commentsCount || 0,
            user_liked: userLiked,
          };
        })
      );
      setPosts([...enriched, ...mockFeed]);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim() || !user) return;
    setPosting(true);

    const { error } = await supabase.from("cc_posts").insert({
      author_id: user.id,
      content: newPost.trim(),
      post_type: postType,
      tags,
    });

    if (!error) {
      setNewPost("");
      setTags([]);
      setPostType("update");
      await loadPosts();
    }
    setPosting(false);
  };

  const handleLike = async (postId: string) => {
    if (!user || postId.startsWith("mock")) return;

    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (post.user_liked) {
      await supabase.from("cc_post_likes").delete().eq("post_id", postId).eq("user_id", user.id);
    } else {
      await supabase.from("cc_post_likes").insert({ post_id: postId, user_id: user.id });
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, user_liked: !p.user_liked, likes_count: p.user_liked ? p.likes_count - 1 : p.likes_count + 1 }
          : p
      )
    );
  };

  const handleMockLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, user_liked: !p.user_liked, likes_count: p.user_liked ? p.likes_count - 1 : p.likes_count + 1 }
          : p
      )
    );
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const initials = (first: string, last: string) =>
    `${first?.[0] || ""}${last?.[0] || ""}`;

  const filteredPosts = filter === "all" ? posts : posts.filter((p) => p.post_type === filter);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Your Feed
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Insights, updates, and conversations from your coaching network.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Compose */}
        {user && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs shrink-0">
                {profile ? initials(profile.first_name, profile.last_name) : "?"}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share an insight, update, or coaching tip..."
                  rows={3}
                  className="w-full bg-transparent text-navy-900 placeholder-slate-400 text-sm resize-none focus:outline-none"
                />

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-50 text-teal-600 text-xs font-medium">
                        #{tag}
                        <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <select
                      value={postType}
                      onChange={(e) => setPostType(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    >
                      {postTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        placeholder="Add tag..."
                        className="w-24 text-xs px-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handlePost}
                    disabled={!newPost.trim() || posting}
                    className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 text-white font-display font-semibold text-xs rounded-lg hover:bg-teal-400 transition-all disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {posting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === "all" ? "bg-navy-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Posts
          </button>
          {postTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filter === t.value ? "bg-navy-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs shrink-0">
                    {post.author ? initials(post.author.first_name, post.author.last_name) : "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm text-navy-900">
                        {post.author ? `${post.author.first_name} ${post.author.last_name}` : "Unknown"}
                      </span>
                      {post.author?.sport && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                          {post.author.sport === "football" ? "🏈" : "🏀"}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      {post.author?.title}{post.author?.institution ? `, ${post.author.institution}` : ""} · {timeAgo(post.created_at)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      postTypes.find((t) => t.value === post.post_type)?.color || "bg-slate-50 text-slate-500"
                    }`}>
                      {post.post_type}
                    </span>
                    {post.author && (() => {
                      const authorName = `${post.author.first_name} ${post.author.last_name}`;
                      return (
                        <button
                          onClick={() => handleFollow(authorName)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                            following[authorName]
                              ? "bg-teal-50 text-teal-600 border border-teal-200"
                              : "border border-slate-200 text-slate-500 hover:border-teal-200 hover:text-teal-600"
                          }`}
                        >
                          {following[authorName] ? <UserCheck className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
                          {following[authorName] ? "Following" : "Follow"}
                        </button>
                      );
                    })()}
                  </div>
                </div>

                {/* Content */}
                <p className="text-slate-700 text-sm leading-relaxed mb-3">{post.content}</p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-slate-50 text-slate-500 border border-slate-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => post.id.startsWith("mock") ? handleMockLike(post.id) : handleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      post.user_liked ? "text-red-500" : "text-slate-500 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.user_liked ? "fill-current" : ""}`} />
                    <span>{post.likes_count}</span>
                  </button>
                  <button
                    onClick={() => setExpandedComments(expandedComments === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments_count}</span>
                  </button>
                  <button
                    onClick={() => handleRepost(post.id)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      reposted[post.id] ? "text-green-500" : "text-slate-500 hover:text-green-500"
                    }`}
                  >
                    <Repeat2 className="w-4 h-4" /> {reposted[post.id] ? "Reposted" : "Repost"}
                  </button>
                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`ml-auto transition-colors ${bookmarked[post.id] ? "text-gold-400" : "text-slate-400 hover:text-gold-400"}`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked[post.id] ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Comments section */}
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
                          No comments yet. Be the first to respond.
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleReply(post.id)}
                        placeholder="Write a comment..."
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
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-navy-900 text-lg mb-2">No posts yet</h3>
            <p className="text-slate-500 text-sm">Be the first to share an insight with the coaching community.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
