"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, ChevronRight } from "lucide-react";

const posts = [
  { title: "The Evolution of the RPO in College Football", excerpt: "How run-pass options have changed offensive philosophy at every level of college football, and what it means for coaching staffs.", category: "Strategy", date: "Mar 15, 2025", readTime: "8 min" },
  { title: "Building a Culture of Player Development", excerpt: "Three head coaches share their frameworks for developing athletes beyond the X's and O's.", category: "Leadership", date: "Mar 10, 2025", readTime: "6 min" },
  { title: "How to Stand Out in the Coaching Carousel", excerpt: "Insights from search firm executives on what makes a coaching candidate memorable during hiring season.", category: "Career", date: "Mar 5, 2025", readTime: "5 min" },
  { title: "Analytics in Basketball: Beyond the Box Score", excerpt: "How mid-major basketball programs are leveraging data analytics with limited budgets.", category: "Analytics", date: "Feb 28, 2025", readTime: "7 min" },
  { title: "The Hidden Value of Coaching Trees", excerpt: "Why your coaching lineage matters more than ever in today's hiring landscape.", category: "Networking", date: "Feb 20, 2025", readTime: "4 min" },
];

const categoryColors: Record<string, string> = {
  Strategy: "bg-blue-50 text-blue-600",
  Leadership: "bg-purple-50 text-purple-600",
  Career: "bg-teal-50 text-teal-600",
  Analytics: "bg-orange-50 text-orange-600",
  Networking: "bg-gold-400/10 text-gold-400",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">Blog</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Insights, strategy breakdowns, and career advice for the coaching community.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.title} className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${categoryColors[post.category] || "bg-slate-50 text-slate-500"}`}>
                  {post.category}
                </span>
                <span className="text-[11px] text-slate-400">{post.date}</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h3 className="font-display font-bold text-navy-900 group-hover:text-teal-600 transition-colors mb-2">{post.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">{post.excerpt}</p>
              <span className="text-xs text-teal-600 font-semibold flex items-center gap-1">
                Read Article <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
