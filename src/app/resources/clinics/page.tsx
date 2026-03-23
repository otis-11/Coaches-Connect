"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const clinics = [
  { name: "AFCA Annual Convention", date: "January 12-15, 2025", location: "Nashville, TN", sport: "Football", url: "#" },
  { name: "WBCA National Convention", date: "March 28-31, 2025", location: "Tampa, FL", sport: "Basketball", url: "#" },
  { name: "Glazier Clinics — Midwest", date: "February 7-8, 2025", location: "Indianapolis, IN", sport: "Football", url: "#" },
  { name: "Nike Championship Basketball Clinic", date: "May 16-18, 2025", location: "Las Vegas, NV", sport: "Basketball", url: "#" },
  { name: "MEAC Coaches Summit", date: "June 5-7, 2025", location: "Norfolk, VA", sport: "Football & Basketball", url: "#" },
  { name: "CoachConnect Virtual Clinic", date: "Monthly — 3rd Thursday", location: "Virtual", sport: "All Sports", url: "#" },
];

export default function ClinicsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">Coaching Clinics</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Upcoming clinics, conventions, and professional development events for coaches.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {clinics.map((clinic) => (
            <div key={clinic.name} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-navy-900 mb-1">{clinic.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {clinic.date}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {clinic.location}</span>
                  </div>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-50 text-slate-600 border border-slate-100">
                    {clinic.sport}
                  </span>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-all shrink-0">
                  <ExternalLink className="w-3 h-3" /> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
