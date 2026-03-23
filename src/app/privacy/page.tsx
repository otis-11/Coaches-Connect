"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-slate-300 text-lg">Last updated: March 1, 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 prose prose-sm prose-slate max-w-none">
          <h2 className="font-display font-bold text-lg text-navy-900">1. Information We Collect</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            We collect information you provide directly, including your name, email address, coaching history, institution, sport, and professional credentials. We also collect usage data such as pages visited, features used, and interaction patterns.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">2. How We Use Your Information</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Your information is used to provide and improve the CoachConnect platform, match you with relevant opportunities, connect you with other coaches, and personalize your experience. We never sell your data to third parties.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">3. Data Sharing</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Your profile information is visible to other CoachConnect users based on your privacy settings. We may share anonymized, aggregated data for analytics purposes. We share data with service providers who help operate our platform under strict data protection agreements.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">4. Data Security</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            We implement industry-standard security measures including encryption in transit and at rest, regular security audits, and access controls. Your coaching credentials and personal information are stored securely.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">5. Your Rights</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            You may access, update, or delete your personal information at any time through your account settings. You can request a full export of your data or request account deletion by contacting privacy@coachconnect.com.
          </p>

          <h2 className="font-display font-bold text-lg text-navy-900">6. Contact Us</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            For privacy-related questions, contact us at <span className="text-teal-600 font-medium">privacy@coachconnect.com</span>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
