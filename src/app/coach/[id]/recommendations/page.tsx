import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { coaches } from "@/data/coaches";
import { ArrowLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";

export function generateStaticParams() {
  return coaches.map((coach) => ({ id: coach.id }));
}

export default function RecommendationsPage({
  params,
}: {
  params: { id: string };
}) {
  const coach = coaches.find((c) => c.id === params.id);
  if (!coach) return notFound();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <span className="text-navy-900 font-medium">Recommendations</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-teal-500" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-navy-900">
                Recommendations & Endorsements
              </h1>
              <p className="text-sm text-slate-500">
                {coach.endorsements.length} recommendations for{" "}
                {coach.firstName} {coach.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Endorsements */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 mb-8">
          <h2 className="font-display font-bold text-lg text-navy-900 mb-4">
            Skill Endorsements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coach.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <span className="text-sm text-navy-900 font-medium">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-2 rounded-full bg-teal-500/20 w-24 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{
                        width: `${Math.min(100, (skill.endorsementCount / 35) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs text-teal-600 font-semibold min-w-[28px] text-right">
                    {skill.endorsementCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Written Recommendations */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-lg text-navy-900">
            Written Recommendations
          </h2>

          {coach.endorsements.map((end, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-teal-200 transition-colors"
            >
              <div className="flex gap-4">
                <div className="shrink-0">
                  <Quote className="w-8 h-8 text-teal-500/30" />
                </div>
                <div>
                  <p className="text-slate-600 leading-relaxed text-base italic mb-6">
                    &ldquo;{end.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-sm">
                      {end.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-navy-900">
                        {end.author}
                      </div>
                      <div className="text-xs text-slate-500">
                        {end.authorTitle}
                      </div>
                      <div className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gold-400/10 text-gold-400 border border-gold-400/20">
                        {end.relationship}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-navy-900 to-navy-700 rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-xl text-white mb-2">
            Want to recommend {coach.firstName}?
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            Write a recommendation to help {coach.firstName} stand out to
            programs and peers.
          </p>
          <button className="px-6 py-3 bg-teal-500 text-white font-display font-semibold text-sm rounded-lg hover:bg-teal-400 transition-all">
            Write a Recommendation
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
