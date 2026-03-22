"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Briefcase,
  LayoutDashboard,
  User,
  Menu,
  X,
  GitBranch,
} from "lucide-react";

const navLinks = [
  { href: "/discover", label: "Discover", icon: Search },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/coach/marcus-williams", label: "Profile", icon: User },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-gradient-to-r from-navy-900 to-navy-700 text-white text-sm font-display font-semibold rounded-lg hover:from-navy-800 hover:to-navy-600 transition-all shadow-lg shadow-navy-900/20 hover:shadow-navy-900/30 hover:-translate-y-0.5"
            >
              Join Now
            </Link>
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
            <Link
              href="/signup"
              className="block w-full text-center mt-2 px-5 py-2.5 bg-gradient-to-r from-navy-900 to-navy-700 text-white text-sm font-display font-semibold rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
