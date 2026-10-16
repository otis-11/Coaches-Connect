"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/lib/AuthContext";
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
  UserPlus,
  Loader2,
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

const flaggedPosts = [
  { id: "fp1", author: "Unknown User", content: "Buy coaching playbooks at coachdeals.com — 50% off!", reason: "Spam / Promotional", flaggedBy: "System AutoMod", time: "1h ago" },
  { id: "fp2", author: "Jake Morris", content: "This coach doesn't know what he's talking about. Total fraud.", reason: "Harassment", flaggedBy: "Devon Jackson", time: "3h ago" },
  { id: "fp3", author: "Anonymous", content: "DM me for insider recruiting info — guaranteed results.", reason: "Suspicious Activity", flaggedBy: "System AutoMod", time: "6h ago" },
  { id: "fp4", author: "Test Account", content: "test test test test", reason: "Low Quality / Spam", flaggedBy: "Marcus Williams", time: "8h ago" },
];

const managedOpportunities = [
  { id: "mo1", title: "Quarterbacks Coach", institution: "Sam Houston State", status: "active", applications: 14, source: "CoachConnect", posted: "2 days ago" },
  { id: "mo2", title: "Defensive Line Coach", institution: "Jacksonville State", status: "active", applications: 8, source: "Football Scoop", posted: "4 hours ago" },
  { id: "mo3", title: "Women's Basketball GA", institution: "Clemson University", status: "active", applications: 22, source: "NCAA", posted: "6 hours ago" },
  { id: "mo4", title: "Head Men's Basketball", institution: "Lincoln University", status: "expiring", applications: 31, source: "Hoop Dirt", posted: "1 day ago" },
  { id: "mo5", title: "Wide Receivers Coach", institution: "Coastal Carolina", status: "active", applications: 5, source: "D1Ticker", posted: "3 hours ago" },
  { id: "mo6", title: "Offensive Coordinator", institution: "Lenoir-Rhyne", status: "expired", applications: 19, source: "CoachConnect", posted: "2 weeks ago" },
];

export default function AdminPage() {
  const { profile, session, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "content" | "opportunities" | "reports">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [reports, setReports] = useState(recentReports);
  const [flagged, setFlagged] = useState(flaggedPosts);
  const [opps, setOpps] = useState(managedOpportunities);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  // Create User state
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", password: "", sport: "football", role: "coach", isAdmin: false });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleCreateUser = async () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
      setCreateError("All fields are required");
      return;
    }
    if (newUser.password.length < 6) {
      setCreateError("Password must be at least 6 characters");
      return;
    }
    setCreateLoading(true);
    setCreateError("");
    try {
      const res = await fetch("/api/auth/admin-create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(newUser),
      });
      const result = await res.json();
      if (!res.ok) {
        setCreateError(result.error || "Failed to create user");
        setCreateLoading(false);
        return;
      }
      // Add to local list
      setUsers((prev) => [
        ...prev,
        {
          id: result.userId,
          name: `${newUser.firstName} ${newUser.lastName}`,
          email: newUser.email,
          sport: newUser.sport === "football" ? "Football" : "Basketball",
          role: newUser.role,
          verified: true,
          status: "active",
          joined: new Date().toISOString().split("T")[0],
        },
      ]);
      showToast(`Account created for ${newUser.firstName} ${newUser.lastName}`);
      setNewUser({ firstName: "", lastName: "", email: "", password: "", sport: "football", role: "coach", isAdmin: false });
      setShowCreateUser(false);
    } catch (err: any) {
      setCreateError(err.message || "Network error");
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerify = (userId: string) => {
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, verified: true, status: "active" } : u));
    showToast("User verified successfully");
  };

  const handleDeleteUser = (userId: string) => {
    const userName = users.find((u) => u.id === userId)?.name;
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    showToast(`${userName} has been removed`);
  };

  const handleResolve = (reportId: string) => {
    setReports((prev) => prev.map((r) => r.id === reportId ? { ...r, status: "resolved" } : r));
    showToast("Report resolved");
  };

  const handleRemoveContent = (reportId: string) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
    showToast("Content removed");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Admin Panel</h1>
              <p className="text-slate-300 text-lg mt-1">Manage users, content, and platform settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
                  {reports.map((report) => (
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
              <button
                onClick={() => setShowCreateUser(!showCreateUser)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-500 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Create User
              </button>
            </div>

            {/* Create User Form */}
            {showCreateUser && (
              <div className="p-5 border-b border-slate-100 bg-purple-50/30">
                <h4 className="font-display font-bold text-sm text-navy-900 mb-4">Create New Account</h4>
                {createError && (
                  <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">{createError}</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <input type="text" placeholder="First Name" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30" />
                  <input type="text" placeholder="Last Name" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30" />
                  <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30" />
                  <input type="password" placeholder="Password (min 6 chars)" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30" />
                  <select value={newUser.sport} onChange={(e) => setNewUser({ ...newUser, sport: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                    <option value="football">Football</option>
                    <option value="basketball">Basketball</option>
                  </select>
                  <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                    <option value="coach">Coach</option>
                    <option value="admin">Admin</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input type="checkbox" checked={newUser.isAdmin} onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })} className="rounded" />
                    Grant admin access
                  </label>
                  <div className="flex-1" />
                  <button onClick={() => setShowCreateUser(false)} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-all">Cancel</button>
                  <button onClick={handleCreateUser} disabled={createLoading} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-500 transition-all disabled:opacity-50">
                    {createLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Creating...</> : "Create Account"}
                  </button>
                </div>
              </div>
            )}
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
                    <React.Fragment key={user.id}>
                    <tr className="border-t border-slate-50 hover:bg-slate-50/50">
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
                          <button onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="View">
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                          {!user.verified && (
                            <button onClick={() => handleVerify(user.id)} className="p-1.5 rounded-lg hover:bg-green-50 transition-colors" title="Verify">
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            </button>
                          )}
                          <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedUser === user.id && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={6} className="px-5 py-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                            <div><span className="text-slate-400">Role:</span> <span className="font-semibold text-navy-900">{user.role}</span></div>
                            <div><span className="text-slate-400">Sport:</span> <span className="font-semibold text-navy-900">{user.sport}</span></div>
                            <div><span className="text-slate-400">Joined:</span> <span className="font-semibold text-navy-900">{user.joined}</span></div>
                            <div><span className="text-slate-400">Status:</span> <span className="font-semibold text-navy-900 capitalize">{user.status}</span></div>
                          </div>
                        </td>
                      </tr>
                    )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4">
                <div className="font-mono text-lg font-bold text-navy-900">3,891</div>
                <div className="text-[11px] text-slate-500">Total Posts</div>
              </div>
              <div className="bg-white rounded-2xl border border-yellow-200 p-4">
                <div className="font-mono text-lg font-bold text-yellow-600">{flagged.length}</div>
                <div className="text-[11px] text-yellow-600">Flagged</div>
              </div>
              <div className="bg-white rounded-2xl border border-red-200 p-4">
                <div className="font-mono text-lg font-bold text-red-500">2</div>
                <div className="text-[11px] text-red-500">Removed</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100">
                <h3 className="font-display font-bold text-sm text-navy-900">Flagged Content</h3>
              </div>
              {flagged.length > 0 ? flagged.map((post) => (
                <div key={post.id} className="px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-navy-900">{post.author}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-yellow-50 text-yellow-600 border border-yellow-200">{post.reason}</span>
                      </div>
                      <p className="text-sm text-slate-600 italic">&ldquo;{post.content}&rdquo;</p>
                      <div className="text-[10px] text-slate-400 mt-1">Flagged by {post.flaggedBy} · {post.time}</div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => { setFlagged((p) => p.filter((f) => f.id !== post.id)); showToast("Content approved — flag removed"); }} className="px-3 py-1.5 text-[11px] font-semibold bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all">Approve</button>
                      <button onClick={() => { setFlagged((p) => p.filter((f) => f.id !== post.id)); showToast("Content removed"); }} className="px-3 py-1.5 text-[11px] font-semibold bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all">Remove</button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-500">No flagged content. All clear!</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4">
                <div className="font-mono text-lg font-bold text-navy-900">{opps.filter((o) => o.status === "active").length}</div>
                <div className="text-[11px] text-slate-500">Active</div>
              </div>
              <div className="bg-white rounded-2xl border border-yellow-200 p-4">
                <div className="font-mono text-lg font-bold text-yellow-600">{opps.filter((o) => o.status === "expiring").length}</div>
                <div className="text-[11px] text-yellow-600">Expiring Soon</div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4">
                <div className="font-mono text-lg font-bold text-slate-400">{opps.filter((o) => o.status === "expired").length}</div>
                <div className="text-[11px] text-slate-500">Expired</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Position</th>
                      <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Source</th>
                      <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Apps</th>
                      <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Posted</th>
                      <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opps.map((opp) => (
                      <tr key={opp.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                        <td className="px-5 py-3">
                          <div className="text-xs font-semibold text-navy-900">{opp.title}</div>
                          <div className="text-[11px] text-slate-500">{opp.institution}</div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                            opp.source === "CoachConnect" ? "bg-teal-50 text-teal-600" : "bg-blue-50 text-blue-600"
                          }`}>{opp.source}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                            opp.status === "active" ? "bg-green-50 text-green-600"
                              : opp.status === "expiring" ? "bg-yellow-50 text-yellow-600"
                              : "bg-slate-100 text-slate-400"
                          }`}>{opp.status}</span>
                        </td>
                        <td className="px-5 py-3 text-xs font-mono text-navy-900">{opp.applications}</td>
                        <td className="px-5 py-3 text-xs text-slate-500">{opp.posted}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1">
                            {opp.status === "expired" ? (
                              <button onClick={() => { setOpps((p) => p.map((o) => o.id === opp.id ? { ...o, status: "active" } : o)); showToast("Listing reactivated"); }} className="px-2.5 py-1 text-[10px] font-semibold bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-all">Reactivate</button>
                            ) : (
                              <button onClick={() => { setOpps((p) => p.map((o) => o.id === opp.id ? { ...o, status: "expired" } : o)); showToast("Listing deactivated"); }} className="px-2.5 py-1 text-[10px] font-semibold bg-slate-50 text-slate-500 rounded-md hover:bg-slate-100 transition-all">Deactivate</button>
                            )}
                            <button onClick={() => { setOpps((p) => p.filter((o) => o.id !== opp.id)); showToast("Listing removed"); }} className="px-2.5 py-1 text-[10px] font-semibold bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-all">Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    {report.status !== "resolved" && (
                      <button onClick={() => handleResolve(report.id)} className="px-3 py-1.5 text-xs font-semibold bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all">
                        Resolve
                      </button>
                    )}
                    <button onClick={() => handleRemoveContent(report.id)} className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all">
                      Remove Content
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
