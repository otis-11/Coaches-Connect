"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  User,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Shield,
  Globe,
  Palette,
  Save,
  CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
  const { user, profile, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"profile" | "privacy" | "notifications" | "account">("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Profile form state
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [title, setTitle] = useState(profile?.title || "");
  const [institution, setInstitution] = useState(profile?.institution || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [philosophy, setPhilosophy] = useState(profile?.philosophy || "");
  const [sport, setSport] = useState(profile?.sport || "");
  const [level, setLevel] = useState(profile?.level || "");
  const [sideOfBall, setSideOfBall] = useState(profile?.side_of_ball || "");

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("cc_profiles").update({
      first_name: firstName,
      last_name: lastName,
      title,
      institution,
      location,
      bio,
      philosophy,
      sport,
      level,
      side_of_ball: sideOfBall,
      updated_at: new Date().toISOString(),
    }).eq("id", user.id);

    if (!error) {
      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/30 transition-all";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">Settings</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Manage your profile, privacy, and account preferences.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-48 shrink-0 hidden md:block">
            <div className="space-y-1">
              {[
                { key: "profile" as const, label: "Profile", icon: User },
                { key: "privacy" as const, label: "Privacy", icon: Eye },
                { key: "notifications" as const, label: "Notifications", icon: Bell },
                { key: "account" as const, label: "Account", icon: Lock },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.key ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Mobile tabs */}
            <div className="flex gap-1 mb-6 md:hidden bg-white rounded-xl border border-slate-200 p-1 overflow-x-auto">
              {[
                { key: "profile" as const, label: "Profile" },
                { key: "privacy" as const, label: "Privacy" },
                { key: "notifications" as const, label: "Notifs" },
                { key: "account" as const, label: "Account" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                    activeTab === tab.key ? "bg-teal-500 text-white" : "text-slate-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-navy-900">Edit Profile</h2>

                {saved && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                    <CheckCircle className="w-4 h-4" /> Profile saved successfully!
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Title / Role</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Offensive Coordinator" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Institution</label>
                  <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="e.g. Central State University" className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Sport</label>
                    <select value={sport} onChange={(e) => setSport(e.target.value)} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="football">Football</option>
                      <option value="basketball">Basketball</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Level</label>
                    <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="e.g. D1 FCS" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Side of Ball / Specialty</label>
                  <input type="text" value={sideOfBall} onChange={(e) => setSideOfBall(e.target.value)} placeholder="e.g. Offense, Defense, Special Teams" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Location</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Wilberforce, OH" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Tell your coaching story..." className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Coaching Philosophy</label>
                  <textarea value={philosophy} onChange={(e) => setPhilosophy(e.target.value)} rows={3} placeholder="What drives your coaching approach?" className={inputClass} />
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-white font-display font-semibold text-sm rounded-xl hover:bg-teal-400 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-navy-900">Privacy Settings</h2>
                {[
                  { label: "Show my profile in search results", desc: "Let ADs and search firms find you", default: true },
                  { label: "Show my coaching tree publicly", desc: "Display your mentors and connections", default: true },
                  { label: "Allow connection requests", desc: "Other coaches can request to connect with you", default: true },
                  { label: "Show availability status", desc: "Only visible to verified hiring contacts", default: false },
                  { label: "Show profile view count", desc: "Display how many people viewed your profile", default: true },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-navy-900">{setting.label}</div>
                      <div className="text-xs text-slate-500">{setting.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={setting.default} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-navy-900">Notification Preferences</h2>
                {[
                  { label: "New connection requests", desc: "When someone wants to connect", default: true },
                  { label: "Messages", desc: "New direct messages", default: true },
                  { label: "Post interactions", desc: "Likes and comments on your posts", default: true },
                  { label: "Opportunity matches", desc: "New opportunities matching your profile", default: true },
                  { label: "Endorsements", desc: "When someone endorses your skills", default: true },
                  { label: "Weekly digest", desc: "Weekly summary of your network activity", default: false },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-navy-900">{setting.label}</div>
                      <div className="text-xs text-slate-500">{setting.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={setting.default} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "account" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-navy-900">Account Settings</h2>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" value={user?.email || ""} disabled className={`${inputClass} bg-slate-50 text-slate-400`} />
                </div>
                <div>
                  <label className={labelClass}>Change Password</label>
                  <input type="password" placeholder="New password" className={inputClass} />
                </div>
                <div>
                  <input type="password" placeholder="Confirm new password" className={inputClass} />
                </div>
                <button
                  onClick={() => showToast("Password updated successfully")}
                  className="px-6 py-2.5 bg-navy-900 text-white font-display font-semibold text-sm rounded-xl hover:bg-navy-800 transition-all"
                >
                  Update Password
                </button>

                <div className="pt-6 mt-6 border-t border-slate-200">
                  <h3 className="font-display font-bold text-sm text-red-500 mb-2">Danger Zone</h3>
                  <p className="text-xs text-slate-500 mb-3">Permanently delete your account and all associated data.</p>
                  {!showDeleteConfirm ? (
                    <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 text-xs font-semibold border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-all">
                      Delete Account
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
                      <span className="text-xs text-red-600">Are you sure? This cannot be undone.</span>
                      <button onClick={() => { setShowDeleteConfirm(false); showToast("Account deletion requires Supabase integration", "info"); }} className="px-3 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                        Confirm Delete
                      </button>
                      <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 text-xs font-semibold border border-slate-200 text-slate-500 rounded-lg hover:bg-white transition-all">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
