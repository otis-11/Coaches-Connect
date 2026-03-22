import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { coaches, coachingTreeData } from "@/data/coaches";
import { GitBranch, ArrowLeft, ChevronRight } from "lucide-react";

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
}: {
  node: TreeNode;
  depth?: number;
  isRoot?: boolean;
}) {
  const bgClass = isRoot
    ? "bg-gold-400/20 border-gold-400/30"
    : depth === 1
      ? "bg-teal-500/10 border-teal-500/20"
      : "bg-white border-slate-200";

  return (
    <div className="flex flex-col items-center">
      <div
        className={`px-5 py-3 rounded-xl border ${bgClass} text-center min-w-[180px] hover:shadow-md transition-shadow cursor-default`}
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
                <TreeNodeCard node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return coaches.map((coach) => ({ id: coach.id }));
}

export default function CoachingTreePage({
  params,
}: {
  params: { id: string };
}) {
  const coach = coaches.find((c) => c.id === params.id);
  if (!coach) return notFound();

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

        {/* Mentor Tree */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <h2 className="font-display font-bold text-lg text-navy-900 mb-2">
            Mentor Lineage
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            The coaching tree {coach.firstName} comes from — mentors and peers
            in the same lineage.
          </p>
          <div className="overflow-x-auto pb-4">
            <div className="flex justify-center min-w-[600px]">
              <TreeNodeCard
                node={coachingTreeData.mentorTree}
                isRoot={true}
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
