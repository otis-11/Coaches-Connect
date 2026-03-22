"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/AuthContext";
import {
  Bell,
  UserPlus,
  Heart,
  MessageSquare,
  Briefcase,
  Star,
  CheckCircle,
  Trash2,
  Check,
} from "lucide-react";

const mockNotifications = [
  { id: "n1", type: "connection_request", title: "Devon Jackson wants to connect", body: "DB Coach at Tennessee State University", link: "/network", read: false, time: "5m ago", icon: UserPlus, color: "text-teal-500 bg-teal-50" },
  { id: "n2", type: "post_like", title: "Marcus Williams liked your post", body: "\"Film study tip for young DB coaches...\"", link: "/feed", read: false, time: "1h ago", icon: Heart, color: "text-red-500 bg-red-50" },
  { id: "n3", type: "message", title: "New message from Sarah Chen", body: "\"I'd love to connect about your pack-line defense...\"", link: "/messages", read: false, time: "2h ago", icon: MessageSquare, color: "text-blue-500 bg-blue-50" },
  { id: "n4", type: "opportunity_match", title: "New opportunity matches your profile", body: "Defensive Coordinator — Alabama A&M University", link: "/opportunities", read: true, time: "5h ago", icon: Briefcase, color: "text-purple-500 bg-purple-50" },
  { id: "n5", type: "endorsement", title: "Coach Ray Thompson endorsed your skill", body: "\"Defensive Scheme Design\" — now at 28 endorsements", link: "/profile", read: true, time: "1d ago", icon: Star, color: "text-gold-400 bg-gold-400/10" },
  { id: "n6", type: "connection_accepted", title: "Tyler Brooks accepted your connection", body: "OL Coach at Grand View University", link: "/network", read: true, time: "1d ago", icon: CheckCircle, color: "text-green-500 bg-green-50" },
  { id: "n7", type: "post_comment", title: "Antonio Reyes commented on your post", body: "\"Great insight about the zone-read progression...\"", link: "/feed", read: true, time: "2d ago", icon: MessageSquare, color: "text-teal-500 bg-teal-50" },
  { id: "n8", type: "opportunity_match", title: "New opportunity matches your profile", body: "Secondary Coach — Howard University", link: "/opportunities", read: true, time: "3d ago", icon: Briefcase, color: "text-purple-500 bg-purple-50" },
];

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900">Notifications</h1>
            <p className="text-sm text-slate-500 mt-0.5">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-all">
              <Check className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 w-fit">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "all" ? "bg-navy-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
            All
          </button>
          <button onClick={() => setFilter("unread")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "unread" ? "bg-navy-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-xl border overflow-hidden transition-all hover:shadow-sm ${
                notif.read ? "border-slate-200/80" : "border-teal-200 bg-teal-50/20"
              }`}
            >
              <Link href={notif.link} onClick={() => markAsRead(notif.id)} className="flex items-start gap-4 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.color}`}>
                  <notif.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`text-sm font-medium ${notif.read ? "text-slate-700" : "text-navy-900 font-semibold"}`}>
                      {notif.title}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400">{notif.time}</span>
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-teal-500" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{notif.body}</p>
                </div>
              </Link>
              <div className="px-4 pb-3 flex justify-end gap-2">
                {!notif.read && (
                  <button onClick={() => markAsRead(notif.id)} className="text-[11px] text-teal-600 hover:text-teal-500 font-medium">
                    Mark read
                  </button>
                )}
                <button onClick={() => deleteNotification(notif.id)} className="text-[11px] text-slate-400 hover:text-red-500 font-medium">
                  Remove
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-display font-semibold text-navy-900 text-lg mb-2">All caught up!</h3>
              <p className="text-slate-500 text-sm">No {filter === "unread" ? "unread " : ""}notifications right now.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
