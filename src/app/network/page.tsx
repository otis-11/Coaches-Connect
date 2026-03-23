"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/lib/AuthContext";
import {
  Users,
  GitBranch,
  Search,
  UserPlus,
  Check,
  ChevronDown,
  ChevronRight,
  Handshake,
  ArrowRight,
  Network,
  MapPin,
} from "lucide-react";

// Mock network data showing connections and their connections
const myConnections = [
  {
    id: "marcus-williams",
    name: "Marcus Williams",
    initials: "MW",
    title: "OC / QB Coach",
    institution: "Central State University",
    sport: "football",
    mutualConnections: 12,
    sharedMentor: "Coach Ray Thompson",
    connected: true,
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    initials: "SC",
    title: "Head Coach",
    institution: "Pacific Lutheran University",
    sport: "basketball",
    mutualConnections: 5,
    sharedMentor: null,
    connected: true,
  },
  {
    id: "devon-jackson",
    name: "Devon Jackson",
    initials: "DJ",
    title: "DB Coach",
    institution: "Tennessee State University",
    sport: "football",
    mutualConnections: 8,
    sharedMentor: "Coach Eddie George",
    connected: true,
  },
  {
    id: "antonio-reyes",
    name: "Antonio Reyes",
    initials: "AR",
    title: "Assistant Coach",
    institution: "UT Arlington",
    sport: "basketball",
    mutualConnections: 3,
    sharedMentor: null,
    connected: true,
  },
  {
    id: "tyler-brooks",
    name: "Tyler Brooks",
    initials: "TB",
    title: "OL Coach",
    institution: "Grand View University",
    sport: "football",
    mutualConnections: 2,
    sharedMentor: null,
    connected: true,
  },
];

// Network tree - connections of connections
const networkTree = {
  center: { name: "You", initials: "ME" },
  branches: [
    {
      connection: myConnections[0],
      theirConnections: [
        { name: "Coach Ray Thompson", initials: "RT", title: "Head Coach, Ohio State", degree: "2nd" },
        { name: "Coach James Franklin", initials: "JF", title: "Head Coach, Penn State", degree: "2nd" },
        { name: "Darnell Washington", initials: "DW", title: "WR Coach, Morgan State", degree: "2nd" },
      ],
    },
    {
      connection: myConnections[2],
      theirConnections: [
        { name: "Coach Eddie George", initials: "EG", title: "Former HC, Tennessee State", degree: "2nd" },
        { name: "Coach Deion Sanders", initials: "DS", title: "Head Coach, Colorado", degree: "2nd" },
      ],
    },
    {
      connection: myConnections[1],
      theirConnections: [
        { name: "Geno Auriemma", initials: "GA", title: "Head Coach, UConn", degree: "2nd" },
        { name: "Tara VanDerveer", initials: "TV", title: "Former HC, Stanford", degree: "2nd" },
      ],
    },
  ],
};

// Suggested connections (warm intros)
const suggestedConnections = [
  {
    id: "s1",
    name: "Coach Ray Thompson",
    initials: "RT",
    title: "Head Coach, Ohio State",
    sport: "football",
    warmIntro: "Marcus Williams coached under Ray Thompson at Ohio State (2016-2019)",
    mutualStaff: 3,
    degree: "2nd",
  },
  {
    id: "s2",
    name: "Coach Eddie George",
    initials: "EG",
    title: "Former HC, Tennessee State",
    sport: "football",
    warmIntro: "Devon Jackson worked under Eddie George at Tennessee State",
    mutualStaff: 2,
    degree: "2nd",
  },
  {
    id: "s3",
    name: "Geno Auriemma",
    initials: "GA",
    title: "Head Coach, UConn",
    sport: "basketball",
    warmIntro: "Sarah Chen attended Auriemma's coaching clinic (2023)",
    mutualStaff: 1,
    degree: "2nd",
  },
  {
    id: "s4",
    name: "Mark Reynolds",
    initials: "MR",
    title: "DC, Florida A&M",
    sport: "football",
    warmIntro: "You both attended the AFCA Convention 2024",
    mutualStaff: 0,
    degree: "3rd",
  },
];

export default function NetworkPage() {
  const { user, profile } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"connections" | "tree" | "suggested">("connections");
  const [searchQuery, setSearchQuery] = useState("");
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [introRequested, setIntroRequested] = useState<Record<string, boolean>>({});
  const [directConnected, setDirectConnected] = useState<Record<string, boolean>>({});

  const filteredConnections = myConnections.filter(
    (c) => !removedIds.includes(c.id) && (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            My Network
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            {myConnections.length} connections · Manage your coaching network and discover warm intros.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="flex justify-end mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your network..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 w-fit">
          {[
            { key: "connections" as const, label: "Connections", icon: Users },
            { key: "tree" as const, label: "Network Tree", icon: GitBranch },
            { key: "suggested" as const, label: "Warm Intros", icon: Handshake },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-navy-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Connections Tab */}
        {activeTab === "connections" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConnections.map((conn) => (
              <div key={conn.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
                    {conn.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/coach/${conn.id}`} className="font-display font-bold text-sm text-navy-900 hover:text-teal-600 transition-colors">
                      {conn.name}
                    </Link>
                    <div className="text-xs text-slate-500 mt-0.5">{conn.title}</div>
                    <div className="text-xs text-slate-400">{conn.institution}</div>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-[11px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md font-medium">
                        {conn.mutualConnections} mutual
                      </span>
                      {conn.sharedMentor && (
                        <span className="text-[11px] text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded-md font-medium">
                          Shared: {conn.sharedMentor}
                        </span>
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${conn.sport === "football" ? "bg-amber-50 text-amber-600" : "bg-orange-50 text-orange-600"}`}>
                        {conn.sport === "football" ? "🏈" : "🏀"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <Link href={`/messages`} className="px-3 py-1.5 text-[11px] font-semibold border border-teal-200 text-teal-600 rounded-lg hover:bg-teal-50 transition-all">
                      Message
                    </Link>
                    <button
                      onClick={() => { setRemovedIds((p) => [...p, conn.id]); showToast(`Removed ${conn.name} from connections`); }}
                      className="px-3 py-1.5 text-[11px] font-semibold border border-slate-200 text-slate-500 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Network Tree Tab */}
        {activeTab === "tree" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
            <div className="text-center mb-8">
              <h3 className="font-display font-bold text-lg text-navy-900 mb-1">Your Coaching Network Map</h3>
              <p className="text-sm text-slate-500">See how your connections extend through the coaching world</p>
            </div>

            {/* Visual tree */}
            <div className="space-y-8">
              {/* Center: You */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white font-display font-bold text-lg shadow-lg shadow-teal-500/30">
                  {profile ? `${profile.first_name[0]}${profile.last_name[0]}` : "ME"}
                </div>
              </div>

              {/* Branches */}
              {networkTree.branches.map((branch, i) => (
                <div key={i} className="relative">
                  {/* Connecting line */}
                  <div className="absolute left-1/2 -top-4 w-px h-4 bg-slate-200" />

                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                    {/* 1st degree connection */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs">
                        {branch.connection.initials}
                      </div>
                      <div>
                        <Link href={`/coach/${branch.connection.id}`} className="font-display font-semibold text-sm text-navy-900 hover:text-teal-600">
                          {branch.connection.name}
                        </Link>
                        <div className="text-[11px] text-slate-500">{branch.connection.title}, {branch.connection.institution}</div>
                      </div>
                      <span className="ml-auto px-2 py-0.5 bg-teal-50 text-teal-600 text-[10px] font-bold rounded">1st</span>
                    </div>

                    {/* 2nd degree connections */}
                    <div className="ml-6 pl-6 border-l-2 border-slate-200 space-y-2.5">
                      {branch.theirConnections.map((tc, j) => (
                        <div key={j} className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600 font-display font-bold text-[10px] group-hover:bg-navy-900 group-hover:text-white transition-colors">
                            {tc.initials}
                          </div>
                          <div className="flex-1">
                            <div className="font-display font-semibold text-xs text-navy-900">{tc.name}</div>
                            <div className="text-[10px] text-slate-500">{tc.title}</div>
                          </div>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{tc.degree}</span>
                          <button
                            onClick={() => { setIntroRequested((p) => ({ ...p, [tc.initials]: true })); showToast(`Intro request sent via ${branch.connection.name}`); }}
                            className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all opacity-0 group-hover:opacity-100 ${
                              introRequested[tc.initials]
                                ? "bg-teal-50 text-teal-600 border border-teal-200"
                                : "border border-teal-200 text-teal-600 hover:bg-teal-50"
                            }`}
                          >
                            {introRequested[tc.initials] ? "Requested ✓" : "Get Intro"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warm Intros / Suggested Tab */}
        {activeTab === "suggested" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-teal-500/10 to-gold-400/10 rounded-2xl border border-teal-200/50 p-5 mb-6">
              <div className="flex items-start gap-3">
                <Handshake className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-sm text-navy-900 mb-1">Warm Intro Engine</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instead of cold outreach, we show you the <strong>strongest path</strong> to any coach through shared staffs,
                    mutual connections, common clinics, and coaching tree overlaps. The coaching world runs on relationships — we help you see them.
                  </p>
                </div>
              </div>
            </div>

            {suggestedConnections.map((sc) => (
              <div key={sc.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-teal-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-display font-bold text-sm shrink-0">
                    {sc.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-navy-900">{sc.name}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        sc.degree === "2nd" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                      }`}>
                        {sc.degree} degree
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{sc.title}</div>

                    {/* Warm intro path */}
                    <div className="mt-3 p-3 rounded-xl bg-gold-400/5 border border-gold-400/20">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-medium text-navy-900">Path to introduction:</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{sc.warmIntro}</div>
                        </div>
                      </div>
                    </div>

                    {sc.mutualStaff > 0 && (
                      <div className="mt-2 text-[11px] text-teal-600">
                        <Users className="w-3 h-3 inline mr-1" />
                        {sc.mutualStaff} mutual staff member{sc.mutualStaff > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => { setIntroRequested((p) => ({ ...p, [sc.id]: true })); showToast(`Warm intro request sent for ${sc.name}`); }}
                      disabled={introRequested[sc.id]}
                      className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                        introRequested[sc.id]
                          ? "bg-teal-50 text-teal-600 border border-teal-200"
                          : "bg-teal-500 text-white hover:bg-teal-400"
                      }`}
                    >
                      <UserPlus className="w-3 h-3" /> {introRequested[sc.id] ? "Requested ✓" : "Request Intro"}
                    </button>
                    <button
                      onClick={() => { setDirectConnected((p) => ({ ...p, [sc.id]: true })); showToast(`Connection request sent to ${sc.name}`); }}
                      disabled={directConnected[sc.id]}
                      className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                        directConnected[sc.id]
                          ? "bg-slate-50 text-slate-400 border border-slate-200"
                          : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {directConnected[sc.id] ? "Pending" : "Connect Direct"}
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
