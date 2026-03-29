"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/AuthContext";
import {
  GitBranch,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Briefcase,
  BookOpen,
  Shield,
} from "lucide-react";

const steps = [
  { label: "Basics", icon: User },
  { label: "Experience", icon: Briefcase },
  { label: "Philosophy", icon: BookOpen },
  { label: "Verify", icon: Shield },
];

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [sport, setSport] = useState<"football" | "basketball" | "">("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !sport) {
      setError("Please fill in all required fields in step 1.");
      setCurrentStep(0);
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSignupLoading(true);
    setError("");
    const { error } = await signUp(email, password, firstName, lastName, sport);
    if (error) {
      setError(error.message);
      setSignupLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-navy-900" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">
              Coach<span className="text-teal-400">Connect</span>
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-3">
            Build your coaching profile
          </h1>
          <p className="text-slate-400">
            Join thousands of coaches building their professional identity.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  i === currentStep
                    ? "bg-teal-500 text-white"
                    : i < currentStep
                      ? "bg-teal-500/20 text-teal-400"
                      : "bg-white/5 text-slate-500"
                }`}
              >
                {i < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-px ${i < currentStep ? "bg-teal-500/40" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl mb-6">
                Tell us about yourself
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Marcus"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Williams"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="marcus@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Primary Sport
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSport("football")}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      sport === "football"
                        ? "border-teal-500 bg-teal-500/10 text-teal-400"
                        : "border-white/20 bg-white/5 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    <div className="text-2xl mb-1">🏈</div>
                    <div className="font-display font-semibold text-sm">
                      Football
                    </div>
                  </button>
                  <button
                    onClick={() => setSport("basketball")}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      sport === "basketball"
                        ? "border-teal-500 bg-teal-500/10 text-teal-400"
                        : "border-white/20 bg-white/5 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    <div className="text-2xl mb-1">🏀</div>
                    <div className="font-display font-semibold text-sm">
                      Basketball
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current Title / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Offensive Coordinator, Assistant Coach"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Institution
                </label>
                <input
                  type="text"
                  placeholder="e.g. Central State University"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl mb-6">
                Your coaching experience
              </h2>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Competition Level
                </label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all">
                  <option value="" className="bg-navy-900">Select level</option>
                  <option value="high-school" className="bg-navy-900">High School</option>
                  <option value="naia" className="bg-navy-900">NAIA</option>
                  <option value="d3" className="bg-navy-900">Division III</option>
                  <option value="d2" className="bg-navy-900">Division II</option>
                  <option value="fcs" className="bg-navy-900">FCS</option>
                  <option value="fbs" className="bg-navy-900">FBS / Division I</option>
                  <option value="pro" className="bg-navy-900">Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Years of Coaching Experience
                </label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all">
                  <option value="" className="bg-navy-900">Select range</option>
                  <option value="0-2" className="bg-navy-900">0-2 years (GA / Entry Level)</option>
                  <option value="3-5" className="bg-navy-900">3-5 years</option>
                  <option value="6-10" className="bg-navy-900">6-10 years</option>
                  <option value="11-20" className="bg-navy-900">11-20 years</option>
                  <option value="20+" className="bg-navy-900">20+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Primary Role / Specialty
                </label>
                <input
                  type="text"
                  placeholder="e.g. Quarterbacks Coach, Defensive Coordinator"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Key Coaches You&apos;ve Worked Under
                </label>
                <textarea
                  placeholder="List the head coaches or coordinators who have mentored you..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
                <input type="checkbox" id="open" className="rounded" />
                <label htmlFor="open" className="text-sm text-teal-400 font-medium cursor-pointer">
                  I&apos;m open to new coaching opportunities
                </label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl mb-6">
                Your coaching identity
              </h2>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Coaching Philosophy
                </label>
                <textarea
                  placeholder="Describe your approach to coaching, your values, and what sets you apart..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Schemes & Systems Experience
                </label>
                <textarea
                  placeholder="e.g. Air Raid, RPO Heavy, Pack-Line Defense, Motion Offense..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Player Development Focus
                </label>
                <textarea
                  placeholder="How do you approach developing players? What are your key areas of focus?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-display font-bold text-xl mb-6">
                Almost there — verify your profile
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-display font-semibold text-sm text-white mb-1">
                    Education & Certifications
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Add your degrees, coaching certifications, and professional development.
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-white/10 text-sm text-slate-300 hover:bg-white/20 transition-all">
                    + Add Education
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-display font-semibold text-sm text-white mb-1">
                    Upload Resume / CV
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Optional — upload a PDF of your coaching resume.
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-white/10 text-sm text-slate-300 hover:bg-white/20 transition-all">
                    Choose File
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-display font-semibold text-sm text-white mb-1">
                    Request Endorsements
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Invite coaches you&apos;ve worked with to endorse your profile.
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-white/10 text-sm text-slate-300 hover:bg-white/20 transition-all">
                    + Invite by Email
                  </button>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-teal-500/10 to-gold-400/10 border border-teal-500/20 text-center">
                <Check className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  Your profile is ready!
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  You can always update your profile later. Start connecting with
                  coaches and exploring opportunities.
                </p>
                <button
                  onClick={handleSignUp}
                  disabled={signupLoading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-display font-bold text-sm rounded-lg hover:bg-teal-400 transition-all disabled:opacity-50"
                >
                  {signupLoading ? "Creating account..." : "Create Account & Go to Dashboard"}
                  {!signupLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          {currentStep < 3 && (
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  currentStep === 0
                    ? "opacity-0 pointer-events-none"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-white font-display font-semibold text-sm rounded-lg hover:bg-teal-400 transition-all"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sign-in link */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-400 hover:text-teal-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
