"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { coaches, coachingTreeData } from "@/data/coaches";
import { GitBranch, ArrowLeft, ChevronRight, UserPlus, MessageSquare, Users, Award, Briefcase, MapPin } from "lucide-react";

interface TreeNode {
  name: string;
  title: string;
  institution: string;
  children: TreeNode[];
}

function TreeNodeCard({
  node,
  depth = 0,
  isRoot = false,
  selectedNode,
  onSelect,
}: {
  node: TreeNode;
  depth?: number;
  isRoot?: boolean;
  selectedNode: string | null;
  onSelect: (name: string) => void;
}) {
  const isSelected = selectedNode === node.name;
  const bgClass = isSelected
    ? "bg-teal-500/20 border-teal-500/40 ring-2 ring-teal-500/30"
    : isRoot
      ? "bg-gold-400/20 border-gold-400/30"
      : depth === 1
        ? "bg-teal-500/10 border-teal-500/20"
        : "bg-white border-slate-200";

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => onSelect(node.name)}
        className={`px-5 py-3 rounded-xl border ${bgClass} text-center min-w-[180px] hover:shadow-md transition-all cursor-pointer`}
      >
        <div className="font-display font-bold text-sm text-navy-900">
          {node.name}
        </div>
        <div className="text-xs text-slate-500 mt-0.5">{node.title}</div>
        <div className="text-[11px] text-slate-400">{node.institution}</div>
      </div>

      {node.children.length > 0 && (
        <>
          <div className="w-px h-6 bg-slate-300" />
          <div className="flex gap-8 relative">
            {node.children.length > 1 && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-slate-300"
                style={{
                  width: `calc(100% - 180px)`,
                }}
              />
            )}
            {node.children.map((child, i) => (
              <div key={i} className="flex flex-col items-center">
                {node.children.length > 1 && (
                  <div className="w-px h-4 bg-slate-300" />
                )}
                <TreeNodeCard node={child} depth={depth + 1} selectedNode={selectedNode} onSelect={onSelect} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Count all nodes in a tree
function countNodes(node: TreeNode): number {
  return 1 + node.children.reduce((sum, c) => sum + countNodes(c), 0);
}

// Get max depth
function maxDepth(node: TreeNode, d: number = 0): number {
  if (node.children.length === 0) return d;
  return Math.max(...node.children.map((c) => maxDepth(c, d + 1)));
}

export default function CoachingTreePage() {
  const params = useParams();
  const { showToast } = useToast();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connected, setConnected] = useState<Record<string, boolean>>({});

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

  const totalMentorNodes = countNodes(coachingTreeData.mentorTree);
  const totalStaffNodes = countNodes(coachingTreeData.rootCoach);
  const mentorDepth = maxDepth(coachingTreeData.mentorTree) + 1;
  const staffDepth = maxDepth(coachingTreeData.rootCoach) + 1;

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

        {/* Tree Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Users className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{totalMentorNodes}</div>
            <div className="text-[11px] text-slate-500">Mentor Lineage</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Briefcase className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{totalStaffNodes}</div>
            <div className="text-[11px] text-slate-500">Current Staff</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <Award className="w-5 h-5 text-gold-400 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{mentorDepth}</div>
            <div className="text-[11px] text-slate-500">Generations Deep</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 text-center">
            <MapPin className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="font-mono text-xl font-bold text-navy-900">{staffDepth}</div>
            <div className="text-[11px] text-slate-500">Programs Connected</div>
          </div>
        </div>

        {/* Selected Node Detail Panel */}
        {selectedNode && (
          <div className="bg-white rounded-2xl border border-teal-200 p-5 mb-8 flex items-center justify-between">
            <div>
              <div className="text-xs text-teal-600 font-semibold uppercase tracking-wider mb-1">Selected Coach</div>
              <div className="font-display font-bold text-navy-900">{selectedNode}</div>
              <div className="text-xs text-slate-500 mt-0.5">Click to view profile, connect, or message</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleConnect(selectedNode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  connected[selectedNode]
                    ? "bg-teal-50 text-teal-600 border border-teal-200"
                    : "bg-teal-500 text-white hover:bg-teal-400"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                {connected[selectedNode] ? "Connected" : "Connect"}
              </button>
              <button
                onClick={() => handleMessage(selectedNode)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Message
              </button>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-400 hover:text-slate-600 px-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Mentor Tree */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <h2 className="font-display font-bold text-lg text-navy-900 mb-2">
            Mentor Lineage
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            The coaching tree {coach.firstName} comes from — mentors and peers
            in the same lineage. <span className="text-teal-600 font-medium">Click any node</span> to see details.
          </p>
          <div className="overflow-x-auto pb-4">
            <div className="flex justify-center min-w-[600px]">
              <TreeNodeCard
                node={coachingTreeData.mentorTree}
                isRoot={true}
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
              />
            </div>
          </div>
        </div>

        {/* Current Tree */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <h2 className="font-display font-bold text-lg text-navy-900 mb-2">
            Current Program Tree
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            The coaching staff and connections at {coach.firstName}&apos;s
            current program.
          </p>
          <div className="overflow-x-auto pb-4">
            <div className="flex justify-center min-w-[600px]">
              <TreeNodeCard
                node={coachingTreeData.rootCoach}
                isRoot={true}
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
              />
            </div>
          </div>
        </div>

        {/* Coached Under List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
          <h2 className="font-display font-bold text-lg text-navy-900 mb-4">
            Coached Under
          </h2>
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
