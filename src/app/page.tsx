import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GitBranch,
  Search,
  Shield,
  Briefcase,
  Users,
  Award,
  ChevronRight,
  ArrowRight,
  Star,
  TrendingUp,
  MapPin,
} from "lucide-react";

const stats = [
  { value: "12,000+", label: "Coaches Connected" },
  { value: "850+", label: "Programs Represented" },
  { value: "2,400+", label: "Opportunities Posted" },
  { value: "94%", label: "Profile Completion Rate" },
];

const features = [
  {
    icon: GitBranch,
    title: "Coaching Tree Visualization",
    description:
      "Map your coaching lineage and see how your network connects across programs, levels, and decades of the game.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    icon: Shield,
    title: "Verified Credibility",
    description:
      "Endorsements, certifications, and verified experience markers that build trust with hiring programs.",
    color: "text-gold-400",
    bg: "bg-gold-400/10",
  },
  {
    icon: Search,
    title: "Smart Discovery",
    description:
      "Find coaches by sport, level, scheme, geography, and coaching tree. Get discovered by the programs that need you.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Briefcase,
    title: "Opportunity Board",
    description:
      "Curated coaching positions from GA roles to head coaching jobs. Signal your interest with an 'Open to Opportunities' badge.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Users,
    title: "Mentor Matching",
    description:
      "Connect with experienced coaches in your tree, your scheme, or your aspired level. Build relationships that build careers.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Award,
    title: "Sport-Specific Profiles",
    description:
      "Showcase your schemes, philosophy, player development record, and career timeline in a format built for coaching.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const testimonials = [
  {
    quote:
      "CoachConnect helped me land my first full-time position. Programs could see my coaching tree, my scheme experience, and the endorsements from coaches I'd worked under. It made all the difference.",
    name: "Tyler Brooks",
    title: "OL Coach, Grand View University",
    initials: "TB",
  },
  {
    quote:
      "As a head coach, I use CoachConnect to find quality assistants. The coaching tree feature lets me see who mentored a candidate and what systems they've been in. It's like a background check built for coaching.",
    name: "David Patterson",
    title: "Head Coach, Central State University",
    initials: "DP",
  },
  {
    quote:
      "I've been coaching 12 years and never had a platform that truly represented what I do. CoachConnect understands the coaching profession in a way LinkedIn never will.",
    name: "Michelle Okafor",
    title: "Assoc. HC, Howard University",
    initials: "MO",
  },
];

const risingCoaches = [
  {
    name: "Marcus Williams",
    title: "OC / QB Coach",
    institution: "Central State",
    sport: "Football",
    initials: "MW",
    href: "/coach/marcus-williams",
  },
  {
    name: "Devon Jackson",
    title: "DB Coach / RC",
    institution: "Tennessee State",
    sport: "Football",
    initials: "DJ",
    href: "/coach/devon-jackson",
  },
  {
    name: "Antonio Reyes",
    title: "Asst. Coach / PD",
    institution: "RGV Vipers",
    sport: "Basketball",
    initials: "AR",
    href: "/coach/antonio-reyes",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        {/* Gradient accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-8">
                <Star className="w-4 h-4" />
                The Professional Network for Coaches
              </div>
            </div>

            <h1 className="animate-fade-up stagger-1 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
              Where coaching
              <br />
              careers are{" "}
              <span className="text-gradient">discovered</span>
            </h1>

            <p className="animate-fade-up stagger-2 mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Build your professional coaching identity. Showcase your tree,
              your schemes, your philosophy. Get found by programs that need
              what you bring.
            </p>

            <div className="animate-fade-up stagger-3 mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-400 text-navy-900 font-display font-bold text-base rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5"
              >
                Build Your Profile
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-display font-semibold text-base rounded-xl hover:bg-white/10 transition-all"
              >
                Discover Coaches
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-up stagger-4 mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-3xl lg:text-4xl text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Built for how coaches actually build careers
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Every feature is designed around the realities of coaching career
              advancement — relationships, credibility, and visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Tree Preview */}
      <section className="py-24 lg:py-32 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-400 text-sm font-medium mb-6">
                <GitBranch className="w-4 h-4" />
                Signature Feature
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Your coaching tree,
                <br />
                <span className="text-gold-400">visualized</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Every great coach stands on the shoulders of mentors. Map your
                coaching lineage, see how your network connects across the
                profession, and let programs understand your pedigree at a
                glance.
              </p>
              <Link
                href="/coach/marcus-williams/tree"
                className="inline-flex items-center gap-2 text-teal-400 font-display font-semibold hover:text-teal-300 transition-colors"
              >
                See an example coaching tree
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mini tree visualization */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex flex-col items-center">
                  {/* Root */}
                  <div className="px-6 py-3 rounded-xl bg-gold-400/20 border border-gold-400/30 text-center">
                    <div className="font-display font-bold text-sm">
                      Coach Bill McEntire
                    </div>
                    <div className="text-xs text-slate-400">
                      HC, Walsh University
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div className="flex gap-12">
                    <div className="flex flex-col items-center">
                      <div className="px-5 py-2.5 rounded-xl bg-teal-500/20 border border-teal-500/30 text-center">
                        <div className="font-display font-semibold text-sm">
                          Coach Ray Thompson
                        </div>
                        <div className="text-xs text-slate-400">
                          OC, Youngstown St
                        </div>
                      </div>
                      <div className="w-px h-6 bg-white/20" />
                      <div className="flex gap-6">
                        <div className="px-4 py-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-center">
                          <div className="font-display font-medium text-xs">
                            Marcus Williams
                          </div>
                          <div className="text-[10px] text-slate-400">
                            OC, Central State
                          </div>
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
                          <div className="font-display font-medium text-xs">
                            Ryan Cooper
                          </div>
                          <div className="text-[10px] text-slate-400">
                            WR, Youngstown St
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="font-display font-semibold text-sm">
                          Coach Jim Hargrove
                        </div>
                        <div className="text-xs text-slate-400">
                          DC, Malone Univ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rising Coaches */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-teal-600 text-sm font-medium mb-3">
                <TrendingUp className="w-4 h-4" />
                Trending
              </div>
              <h2 className="font-display text-3xl font-bold text-navy-900 tracking-tight">
                Rising coaches to watch
              </h2>
            </div>
            <Link
              href="/discover"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {risingCoaches.map((coach) => (
              <Link
                key={coach.name}
                href={coach.href}
                className="group p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-sm">
                    {coach.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-navy-900 group-hover:text-teal-600 transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-sm text-slate-500">{coach.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-3 h-3" />
                  {coach.institution}
                  <span className="mx-1">·</span>
                  <span className={coach.sport === "Football" ? "text-amber-700" : "text-orange-600"}>
                    {coach.sport}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-900 tracking-tight text-center mb-16">
            Trusted by coaches at every level
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm"
              >
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-navy-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
            Your next coaching opportunity
            <br />
            <span className="text-teal-500">starts with your profile</span>
          </h2>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Join thousands of coaches building their professional identity,
            expanding their network, and getting discovered by programs at
            every level.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-navy-900 to-navy-700 text-white font-display font-bold text-base rounded-xl hover:from-navy-800 hover:to-navy-600 transition-all shadow-lg shadow-navy-900/20 hover:shadow-navy-900/30 hover:-translate-y-0.5"
            >
              Create Free Profile
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-300 text-navy-900 font-display font-semibold text-base rounded-xl hover:bg-slate-50 transition-all"
            >
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
