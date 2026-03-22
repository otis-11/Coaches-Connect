"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Shield,
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Bell,
} from "lucide-react";

// Mock admin stats
const adminStats = [
  { label: "Total Users", value: "1,247", change: "+38 this week", icon: Users, color: "text-teal-500", bg: "bg-teal-500/10" },
  { label: "Active Posts", value: "3,891", change: "+124 today", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Open Positions", value: "67", change: "+12 new", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Pending Verifications", value: "23", change: "Needs review", icon: AlertTriangle, color: "text-gold-400", bg: "bg-gold-400/10" },
];

const mockUsers = [
  { id: "1", name: "Marcus Williams", email: "marcus@csu.edu", sport: "Football", role: "coach", verified: true, status: "active", joined: "2024-01-15" },
  { id: "2", name: "Sarah Chen", email: "sarah@plu.edu", sport: "Basketball", role: "coach", verified: true, status: "active", joined: "2024-02-03" },
  { id: "3", name: "Devon Jackson", email: "devon@tnstate.edu", sport: "Football", role: "coach", verified: false, status: "pending", joined: "2024-03-20" },
  { id: "4", name: "Antonio Reyes", email: "antonio@uta.edu", sport: "Basketball", role: "coach", verified: true, status: "active", joined: "2024-01-28" },
  { id: "5", name: "Tyler Brooks", email: "tyler@grandview.edu", sport: "Football", role: "coach", verified: false, status: "pending", joined: "2024-03-22" },
  { id: "6", name: "Michelle Okafor", email: "michelle@howard.edu", sport: "Basketball", role: "coach", verified: true, status: "active", joined: "2024-02-10" },
];

const recentReports = [
  { id: "r1", type: "Spam post", reporter: "Marcus Williams", content: "Promotional content in feed", status: "pending", time: "2h ago" },
  { id: "r2", type: "Fake profile", reporter: "Sarah Chen", content: "Suspected fake coaching credentials", status: "reviewing", time: "5h ago" },
  { id: "r3", type: "Inappropriate", reporter: "Devon Jackson", content: "Offensive comment on post", status: "resolved", time: "1d ago" },
];

export default function AdminPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "content" | "opportunities" | "reports">("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(
    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900">Admin Panel</h1>
            <p className="text-sm text-slate-500">Manage users, content, and platform settings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 overflow-x-auto">
          {[
            { key: "overview" as const, label: "Overview", icon: BarChart3 },
            { key: "users" as const, label: "Users", icon: Users },
            { key: "content" as const, label: "Content", icon: FileText },
            { key: "opportunities" as const, label: "Opportunities", icon: Briefcase },
            { key: "reports" as const, label: "Reports", icon: AlertTriangle },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {adminStats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-slate-200/80 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="font-mono text-2xl font-bold text-navy-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  <div className="text-[11px] text-teal-600 mt-1">{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-4">Recent Signups</h3>
                <div className="space-y-3">
                  {mockUsers.slice(0, 4).map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-[10px]">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-navy-900">{user.name}</div>
                        <div className="text-[11px] text-slate-500">{user.email}</div>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        user.verified ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                      }`}>
                        {user.verified ? "Verified" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
                <h3 className="font-display font-bold text-sm text-navy-900 mb-4">Reports</h3>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div key={report.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-navy-900">{report.type}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          report.status === "pending" ? "bg-yellow-50 text-yellow-600"
                            : report.status === "reviewing" ? "bg-blue-50 text-blue-600"
                            : "bg-green-50 text-green-600"
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{report.content}</div>
                      <div className="text-[10px] text-slate-400 mt-1">By {report.reporter} · {report.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sport</th>
                    <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verified</th>
                    <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                    <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-[10px]">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-navy-900">{user.name}</div>
                            <div className="text-[11px] text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-600">{user.sport}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          user.status === "active" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {user.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-300" />
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-500">{user.joined}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="View">
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                          {!user.verified && (
                            <button className="p-1.5 rounded-lg hover:bg-green-50 transition-colors" title="Verify">
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            </button>
                          )}
                          <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-navy-900 mb-2">Content Moderation</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Review and moderate posts, comments, and profile content. Flag inappropriate content and manage community guidelines.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-mono text-lg font-bold text-navy-900">3,891</div>
                <div className="text-[11px] text-slate-500">Total Posts</div>
              </div>
              <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                <div className="font-mono text-lg font-bold text-yellow-600">7</div>
                <div className="text-[11px] text-yellow-600">Flagged</div>
              </div>
              <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                <div className="font-mono text-lg font-bold text-red-500">2</div>
                <div className="text-[11px] text-red-500">Removed</div>
              </div>
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-navy-900 mb-2">Manage Opportunities</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Review posted opportunities, manage external feed integrations (Hoop Dirt, Football Scoop), and handle expired listings.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-mono text-lg font-bold text-navy-900">67</div>
                <div className="text-[11px] text-slate-500">Active</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="font-mono text-lg font-bold text-blue-600">23</div>
                <div className="text-[11px] text-blue-600">External Feeds</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-mono text-lg font-bold text-slate-400">12</div>
                <div className="text-[11px] text-slate-500">Expired</div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="bg-white rounded-2xl border border-slate-200/80 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="font-display font-bold text-sm text-navy-900">{report.type}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        report.status === "pending" ? "bg-yellow-50 text-yellow-600"
                          : report.status === "reviewing" ? "bg-blue-50 text-blue-600"
                          : "bg-green-50 text-green-600"
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{report.content}</p>
                    <div className="text-xs text-slate-400 mt-1">Reported by {report.reporter} · {report.time}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="px-3 py-1.5 text-xs font-semibold bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all">
                      Resolve
                    </button>
                    <button className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all">
                      Remove Content
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
