"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-slate-300 text-lg">Last updated: March 1, 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 prose prose-sm prose-slate max-w-none">
          <h2 className="font-display font-bold text-lg text-navy-900">1. Acceptance of Terms</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            By accessing or using CoachConnect, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the platform.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">2. Account Responsibilities</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate coaching credentials and professional information. Misrepresentation of qualifications may result in account suspension.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">3. Acceptable Use</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            CoachConnect is designed for professional coaching networking. You agree not to use the platform for spam, harassment, or any illegal activity. Job postings must be legitimate and from authorized representatives.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">4. Content Ownership</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            You retain ownership of content you post on CoachConnect. By posting content, you grant CoachConnect a non-exclusive license to display and distribute that content within the platform.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">5. Termination</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time through your account settings.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">6. Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            For questions about these terms, contact <span className="text-teal-600 font-medium">legal@coachconnect.com</span>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
