"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { coaches, coachingTreeData, type TreeNode } from "@/data/coaches";
import {
  GitBranch, ArrowLeft, ChevronRight, ChevronDown, UserPlus, MessageSquare,
  Users, Award, Briefcase, MapPin, Trophy, Clock, ArrowRight, Lightbulb,
  Shield, Swords, Crown, Star, X, GraduationCap, Globe,
} from "lucide-react";

const sideOfBallConfig: Record<string, { label: string; color: string; icon: typeof Shield }> = {
  offense: { label: "Offense", color: "bg-blue-50 text-blue-600 border-blue-200", icon: Swords },
  defense: { label: "Defense", color: "bg-red-50 text-red-600 border-red-200", icon: Shield },
  "head coach": { label: "Head Coach", color: "bg-gold-400/10 text-gold-400 border-gold-400/30", icon: Crown },
  "special teams": { label: "Special Teams", color: "bg-purple-50 text-purple-600 border-purple-200", icon: Star },
};

const relationshipConfig: Record<string, { label: string; color: string }> = {
  mentor: { label: "Mentor", color: "bg-gold-400/10 text-gold-400" },
  peer: { label: "Peer", color: "bg-slate-100 text-slate-600" },
  protege: { label: "Protégé", color: "bg-teal-50 text-teal-600" },
  colleague: { label: "Colleague", color: "bg-blue-50 text-blue-600" },
  root: { label: "Root", color: "bg-navy-900/10 text-navy-900" },
};

const statusConfig: Record<string, { label: string; dot: string }> = {
  active: { label: "Active", dot: "bg-green-500" },
  retired: { label: "Retired", dot: "bg-slate-400" },
  moved: { label: "Moved On", dot: "bg-amber-500" },
};

function TreeNodeCard({
  node,
  depth = 0,
  isRoot = false,
  selectedNode,
  onSelect,
  collapsedNodes,
  onToggleCollapse,
  filterSide,
}: {
  node: TreeNode;
  depth?: number;
  isRoot?: boolean;
  selectedNode: string | null;
  onSelect: (name: string) => void;
  collapsedNodes: Record<string, boolean>;
  onToggleCollapse: (name: string) => void;
  filterSide: string | null;
}) {
  const isSelected = selectedNode === node.name;
  const isCollapsed = collapsedNodes[node.name] || false;
  const side = sideOfBallConfig[node.sideOfBall || ""];
  const status = statusConfig[node.status];
  const SideIcon = side?.icon;

  const filteredChildren = filterSide
    ? node.children.filter((c) => c.sideOfBall === filterSide || c.sideOfBall === "head coach" || c.sideOfBall === null)
    : node.children;

  const bgClass = isSelected
    ? "bg-teal-500/20 border-teal-500/40 ring-2 ring-teal-500/30"
    : isRoot
      ? "bg-gold-400/20 border-gold-400/30"
      : depth === 1
        ? "bg-teal-500/10 border-teal-500/20"
        : "bg-white border-slate-200";

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div
          onClick={() => onSelect(node.name)}
          className={`px-5 py-3 rounded-xl border ${bgClass} text-center min-w-[200px] hover:shadow-md transition-all cursor-pointer relative`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${
              isRoot ? "bg-gold-400/20 text-gold-400" : "bg-slate-100 text-slate-600"
            }`}>
              {node.initials}
            </div>
          </div>
          <div className="font-display font-bold text-sm text-navy-900">
            {node.name}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{node.title}</div>
          <div className="text-[11px] text-slate-400">{node.institution}</div>
          <div className="flex items-center justify-center gap-1.5 mt-2 flex-wrap">
            {side && (
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${side.color}`}>
                {SideIcon && <SideIcon className="w-2.5 h-2.5" />}
                {side.label}
              </span>
            )}
            {status && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-slate-500 bg-slate-50 border border-slate-100">
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            )}
          </div>
          {node.yearsTogether && (
            <div className="text-[10px] text-slate-400 mt-1.5 font-mono">{node.yearsTogether}</div>
          )}
        </div>
        {node.children.length > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleCollapse(node.name); }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all z-10 shadow-sm"
          >
            <ChevronDown className={`w-3 h-3 transition-transform ${isCollapsed ? "-rotate-90" : ""}`} />
          </button>
        )}
      </div>

      {filteredChildren.length > 0 && !isCollapsed && (
        <>
          <div className="w-px h-6 bg-slate-300 mt-1" />
          <div className="flex gap-8 relative">
            {filteredChildren.length > 1 && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-slate-300"
                style={{ width: `calc(100% - 200px)` }}
              />
            )}
            {filteredChildren.map((child, i) => (
              <div key={i} className="flex flex-col items-center">
                {filteredChildren.length > 1 && (
                  <div className="w-px h-4 bg-slate-300" />
                )}
                <TreeNodeCard
                  node={child}
                  depth={depth + 1}
                  selectedNode={selectedNode}
                  onSelect={onSelect}
                  collapsedNodes={collapsedNodes}
                  onToggleCollapse={onToggleCollapse}
                  filterSide={filterSide}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function countNodes(node: TreeNode): number {
  return 1 + node.children.reduce((sum, c) => sum + countNodes(c), 0);
}

function maxDepth(node: TreeNode, d: number = 0): number {
  if (node.children.length === 0) return d;
  return Math.max(...node.children.map((c) => maxDepth(c, d + 1)));
}

function findNode(node: TreeNode, name: string): TreeNode | null {
  if (node.name === name) return node;
  for (const child of node.children) {
    const found = findNode(child, name);
    if (found) return found;
  }
  return null;
}

function collectAllNodes(node: TreeNode): TreeNode[] {
  return [node, ...node.children.flatMap((c) => collectAllNodes(c))];
}

export default function CoachingTreePage() {
  const params = useParams();
  const { showToast } = useToast();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [activeView, setActiveView] = useState<"mentor" | "program" | "protege">("mentor");
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [filterSide, setFilterSide] = useState<string | null>(null);

  const coach = coaches.find((c) => c.id === params.id);
  if (!coach) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <GitBranch className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-navy-900 mb-2">Coach Not Found</h2>
          <Link href="/discover" className="text-teal-600 font-semibold text-sm">&larr; Back to Discover</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleConnect = (name: string) => {
    const was = connected[name];
    setConnected((prev) => ({ ...prev, [name]: !was }));
    showToast(was ? `Disconnected from ${name}` : `Connection request sent to ${name}`);
  };

  const handleMessage = (name: string) => {
    showToast(`Opening message thread with ${name}...`);
  };

  const onToggleCollapse = (name: string) => {
    setCollapsedNodes((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const collapseAll = () => {
    const currentTree = activeView === "mentor" ? coachingTreeData.mentorTree
      : activeView === "program" ? coachingTreeData.rootCoach
      : coachingTreeData.protegeTree;
    const all = collectAllNodes(currentTree);
    const collapsed: Record<string, boolean> = {};
    all.forEach((n) => { if (n.children.length > 0) collapsed[n.name] = true; });
    setCollapsedNodes(collapsed);
  };

  const expandAll = () => setCollapsedNodes({});

  const selectedNodeData = useMemo(() => {
    if (!selectedNode) return null;
    return findNode(coachingTreeData.mentorTree, selectedNode)
      || findNode(coachingTreeData.rootCoach, selectedNode)
      || findNode(coachingTreeData.protegeTree, selectedNode);
  }, [selectedNode]);

  const selectedInfluence = useMemo(() => {
    if (!selectedNode) return [];
    return coachingTreeData.influenceMap.filter(
      (m) => m.from === selectedNode || m.to === selectedNode
    );
  }, [selectedNode]);

  const totalMentorNodes = countNodes(coachingTreeData.mentorTree);
  const totalStaffNodes = countNodes(coachingTreeData.rootCoach);
  const totalProtegeNodes = countNodes(coachingTreeData.protegeTree);
  const mentorDepth = maxDepth(coachingTreeData.mentorTree) + 1;
  const { legacyStats } = coachingTreeData;

  const views = [
    { key: "mentor" as const, label: "Mentor Lineage", count: totalMentorNodes },
    { key: "program" as const, label: "Current Program", count: totalStaffNodes },
    { key: "protege" as const, label: "Protégés", count: totalProtegeNodes },
  ];

  const currentTree = activeView === "mentor" ? coachingTreeData.mentorTree
    : activeView === "program" ? coachingTreeData.rootCoach
    : coachingTreeData.protegeTree;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link
            href={`/coach/${coach.id}`}
            className="flex items-center gap-1 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {coach.firstName} {coach.lastName}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-900 font-medium">Coaching Tree</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-400/5 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-navy-900">
                Coaching Tree
              </h1>
              <p className="text-sm text-slate-500">
                {coach.firstName} {coach.lastName}&apos;s coaching lineage and
                network
              </p>
            </div>
          </div>
        </div>

        {/* Legacy Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Users className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{legacyStats.totalCoaches}</div>
            <div className="text-[11px] text-slate-500">Total Coaches</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Briefcase className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{legacyStats.programs}</div>
            <div className="text-[11px] text-slate-500">Programs</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Award className="w-5 h-5 text-gold-400 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{mentorDepth}</div>
            <div className="text-[11px] text-slate-500">Generations</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Trophy className="w-5 h-5 text-gold-400 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{legacyStats.championships}</div>
            <div className="text-[11px] text-slate-500">Championships</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Crown className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{legacyStats.activeHeadCoaches}</div>
            <div className="text-[11px] text-slate-500">Head Coaches</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <MapPin className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{legacyStats.statesReached.length}</div>
            <div className="text-[11px] text-slate-500">States</div>
          </div>
        </div>

        {/* Selected Node Detail Panel */}
        {selectedNodeData && (
          <div className="bg-white rounded-2xl border border-teal-200 p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                  selectedNodeData.relationship === "root" ? "bg-gold-400/20 text-gold-400" : "bg-teal-50 text-teal-600"
                }`}>
                  {selectedNodeData.initials}
                </div>
                <div>
                  <div className="text-xs text-teal-600 font-semibold uppercase tracking-wider mb-0.5">Selected Coach</div>
                  <div className="font-display font-bold text-lg text-navy-900">{selectedNodeData.name}</div>
                  <div className="text-sm text-slate-500">{selectedNodeData.title} · {selectedNodeData.institution}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleConnect(selectedNodeData.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    connected[selectedNodeData.name]
                      ? "bg-teal-50 text-teal-600 border border-teal-200"
                      : "bg-teal-500 text-white hover:bg-teal-400"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  {connected[selectedNodeData.name] ? "Connected" : "Connect"}
                </button>
                <button
                  onClick={() => handleMessage(selectedNodeData.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Message
                </button>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {selectedNodeData.sideOfBall && sideOfBallConfig[selectedNodeData.sideOfBall] && (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium border ${sideOfBallConfig[selectedNodeData.sideOfBall].color}`}>
                    {selectedNodeData.sideOfBall.charAt(0).toUpperCase() + selectedNodeData.sideOfBall.slice(1)}
                  </span>
                )}
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium ${relationshipConfig[selectedNodeData.relationship]?.color || ""}`}>
                  {relationshipConfig[selectedNodeData.relationship]?.label}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-slate-50 text-slate-500 border border-slate-100">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[selectedNodeData.status]?.dot}`} />
                  {statusConfig[selectedNodeData.status]?.label}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-slate-50 text-slate-500 border border-slate-100">
                  <GraduationCap className="w-3 h-3" /> {selectedNodeData.level}
                </span>
              </div>

              {/* Achievements */}
              {selectedNodeData.achievements.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Achievements</div>
                  <div className="space-y-1">
                    {selectedNodeData.achievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <Trophy className="w-3 h-3 text-gold-400 mt-0.5 shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Snapshot */}
              {selectedNodeData.careerSnapshot.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Career Path</div>
                  <div className="space-y-1">
                    {selectedNodeData.careerSnapshot.map((c, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-mono text-slate-400">{c.year}</span>
                        <span className="text-slate-600"> · {c.role}</span>
                        <span className="text-slate-400"> — {c.institution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Influence connections for this node */}
            {selectedInfluence.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Coaching Influence</div>
                <div className="space-y-2">
                  {selectedInfluence.map((inf, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <Lightbulb className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-navy-900">
                          {inf.from === selectedNodeData.name ? (
                            <>{inf.from} <ArrowRight className="w-3 h-3 inline text-teal-500 mx-1" /> {inf.to}</>
                          ) : (
                            <>{inf.from} <ArrowRight className="w-3 h-3 inline text-teal-500 mx-1" /> {inf.to}</>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {inf.lessons.map((l, j) => (
                            <span key={j} className="px-2 py-0.5 rounded text-[10px] bg-white text-slate-500 border border-slate-200">
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tree View Tabs + Controls */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex gap-1">
              {views.map((v) => (
                <button
                  key={v.key}
                  onClick={() => { setActiveView(v.key); setSelectedNode(null); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === v.key
                      ? "bg-navy-900 text-white"
                      : "text-slate-500 hover:text-navy-900 hover:bg-slate-100"
                  }`}
                >
                  {v.label}
                  <span className={`ml-1.5 text-[11px] font-mono ${activeView === v.key ? "text-white/60" : "text-slate-400"}`}>
                    {v.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {/* Side of Ball Filter */}
              <div className="flex gap-1">
                {[
                  { key: null, label: "All" },
                  { key: "offense", label: "OFF" },
                  { key: "defense", label: "DEF" },
                ].map((f) => (
                  <button
                    key={f.label}
                    onClick={() => setFilterSide(f.key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      filterSide === f.key
                        ? "bg-teal-500 text-white"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="w-px h-5 bg-slate-200" />
              <button onClick={expandAll} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 transition-all">
                Expand All
              </button>
              <button onClick={collapseAll} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 transition-all">
                Collapse All
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-8">
            {activeView === "mentor" && (
              <>The coaching tree {coach.firstName} comes from — mentors and peers in the same lineage.</>
            )}
            {activeView === "program" && (
              <>The coaching staff and connections at {coach.firstName}&apos;s current program.</>
            )}
            {activeView === "protege" && (
              <>Coaches that {coach.firstName} has directly mentored and developed.</>
            )}
            {" "}<span className="text-teal-600 font-medium">Click any node</span> to see details.
          </p>

          <div className="overflow-x-auto pb-4">
            <div className="flex justify-center min-w-[700px]">
              <TreeNodeCard
                node={currentTree}
                isRoot={true}
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                collapsedNodes={collapsedNodes}
                onToggleCollapse={onToggleCollapse}
                filterSide={filterSide}
              />
            </div>
          </div>
        </div>

        {/* Coaching Influence Chain */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-gold-400" />
            <h2 className="font-display font-bold text-lg text-navy-900">
              Coaching Influence Chain
            </h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            How coaching philosophies and knowledge have been passed down through generations in this tree.
          </p>
          <div className="space-y-3">
            {coachingTreeData.influenceMap.map((inf, i) => (
              <div
                key={i}
                onClick={() => setSelectedNode(inf.to)}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 shrink-0 min-w-[280px]">
                  <div className="w-8 h-8 rounded-full bg-gold-400/10 text-gold-400 flex items-center justify-center text-[11px] font-bold shrink-0">
                    {inf.from.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="text-xs font-semibold text-navy-900 truncate">{inf.from}</div>
                  <ArrowRight className="w-4 h-4 text-teal-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-[11px] font-bold shrink-0">
                    {inf.to.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="text-xs font-semibold text-navy-900 truncate">{inf.to}</div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {inf.lessons.map((l, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-[10px] bg-white text-slate-500 border border-slate-200">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conference & Geographic Reach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-teal-500" />
              <h2 className="font-display font-bold text-lg text-navy-900">Conferences Represented</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {legacyStats.conferences.map((conf, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-50 text-teal-600 border border-teal-100">
                  {conf}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-purple-500" />
              <h2 className="font-display font-bold text-lg text-navy-900">Geographic Reach</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {legacyStats.statesReached.map((state, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-purple-50 text-purple-600 border border-purple-100">
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Coached Under List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-teal-500" />
            <h2 className="font-display font-bold text-lg text-navy-900">
              Coached Under
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coach.coachedUnder.map((mentor, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-gold-200 transition-colors"
              >
                <div className="font-display font-semibold text-sm text-navy-900">
                  {mentor.name}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {mentor.title}
                </div>
                <div className="text-xs text-slate-400">
                  {mentor.institution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
