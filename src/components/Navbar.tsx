"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import {
  Search,
  Briefcase,
  LayoutDashboard,
  User,
  Menu,
  X,
  GitBranch,
  MessageSquare,
  Bell,
  Rss,
  LogOut,
  Settings,
  Shield,
  ChevronDown,
  Network,
} from "lucide-react";

const publicLinks = [
  { href: "/discover", label: "Discover", icon: Search },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase },
];

const authLinks = [
  { href: "/feed", label: "Feed", icon: Rss },
  { href: "/discover", label: "Discover", icon: Search },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/network", label: "Network", icon: Network },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

export default function Navbar() {
  const { user, profile, signOut, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = user ? authLinks : publicLinks;
  const initials = profile
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : "?";

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-navy-900 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
              <GitBranch className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-navy-900 tracking-tight">
              Coach<span className="text-teal-500">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100/80 transition-all"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/notifications" className="relative p-2 rounded-lg hover:bg-slate-100 transition-all">
                  <Bell className="w-5 h-5 text-slate-500" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
                </Link>
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs">
                      {initials}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <div className="font-display font-semibold text-sm text-navy-900">
                          {profile?.first_name} {profile?.last_name}
                        </div>
                        <div className="text-xs text-slate-500">{profile?.title}</div>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors" onClick={() => setDropdownOpen(false)}>
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors" onClick={() => setDropdownOpen(false)}>
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors" onClick={() => setDropdownOpen(false)}>
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                      {profile?.is_admin && (
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-purple-600 hover:bg-purple-50 transition-colors" onClick={() => setDropdownOpen(false)}>
                          <Shield className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => { signOut(); setDropdownOpen(false); }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 bg-gradient-to-r from-navy-900 to-navy-700 text-white text-sm font-display font-semibold rounded-lg hover:from-navy-800 hover:to-navy-600 transition-all shadow-lg shadow-navy-900/20 hover:shadow-navy-900/30 hover:-translate-y-0.5"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100/80 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100/80 transition-all" onClick={() => setMobileOpen(false)}>
                  <User className="w-4 h-4" /> My Profile
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100/80 transition-all" onClick={() => setMobileOpen(false)}>
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                {profile?.is_admin && (
                  <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all" onClick={() => setMobileOpen(false)}>
                    <Shield className="w-4 h-4" /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100/80 transition-all" onClick={() => setMobileOpen(false)}>
                  <User className="w-4 h-4" /> Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center mt-2 px-5 py-2.5 bg-gradient-to-r from-navy-900 to-navy-700 text-white text-sm font-display font-semibold rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
