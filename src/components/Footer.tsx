import Link from "next/link";
import { GitBranch } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Discover Coaches", href: "/discover" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Coaching Trees", href: "/coach/marcus-williams/tree" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Resources: [
    { label: "For New Coaches", href: "/resources/new-coaches" },
    { label: "For Programs", href: "/resources/programs" },
    { label: "Coaching Clinics", href: "/resources/clinics" },
    { label: "Blog", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-navy-900" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Coach<span className="text-teal-400">Connect</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              The professional network built for football and basketball
              coaches. Build credibility, grow your career.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-sm text-slate-300 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2026 CoachConnect. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built for the coaching community.
          </p>
        </div>
      </div>
    </footer>
  );
}
