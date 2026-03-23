"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/lib/AuthContext";
import {
  Search,
  Send,
  MoreHorizontal,
  Phone,
  Video,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Circle,
} from "lucide-react";

// Mock conversation data for demo
const mockConversations = [
  {
    id: "conv-1",
    name: "Marcus Williams",
    initials: "MW",
    title: "OC / QB Coach, Central State",
    lastMessage: "That Air Raid clinic in March was incredible. Did you attend the Leach session?",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "conv-2",
    name: "Sarah Chen",
    initials: "SC",
    title: "Head Coach, Pacific Lutheran",
    lastMessage: "I'd love to connect about your pack-line defense adaptations. Coffee at WBCA?",
    time: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: "conv-3",
    name: "Devon Jackson",
    initials: "DJ",
    title: "DB Coach, Tennessee State",
    lastMessage: "Thanks for sharing those film breakdowns. My guys are already seeing the difference.",
    time: "3h ago",
    unread: 0,
    online: false,
  },
  {
    id: "conv-4",
    name: "Tyler Brooks",
    initials: "TB",
    title: "OL Coach, Grand View",
    lastMessage: "Any tips for the AFCA Convention? First time attending.",
    time: "1d ago",
    unread: 1,
    online: false,
  },
  {
    id: "conv-5",
    name: "Antonio Reyes",
    initials: "AR",
    title: "Assistant Coach, UT Arlington",
    lastMessage: "Great point about analytics integration. Let me send you that spreadsheet.",
    time: "2d ago",
    unread: 0,
    online: false,
  },
];

const mockMessages: Record<string, Array<{ id: string; sender: string; content: string; time: string; read: boolean }>> = {
  "conv-1": [
    { id: "m1", sender: "them", content: "Hey! I saw your post about the RPO concepts. Really insightful stuff.", time: "10:30 AM", read: true },
    { id: "m2", sender: "me", content: "Thanks Marcus! I've been studying a lot of the Air Raid principles and adapting them for our talent level.", time: "10:32 AM", read: true },
    { id: "m3", sender: "them", content: "That's smart. What adjustments have you made for the smaller roster?", time: "10:33 AM", read: true },
    { id: "m4", sender: "me", content: "Mainly simplifying the route tree but keeping the spacing concepts. We run about 70% of our offense out of 4 core formations.", time: "10:35 AM", read: true },
    { id: "m5", sender: "them", content: "That Air Raid clinic in March was incredible. Did you attend the Leach session?", time: "10:40 AM", read: false },
    { id: "m6", sender: "them", content: "They had some great stuff on adapting the mesh concept for the run game.", time: "10:41 AM", read: false },
  ],
  "conv-2": [
    { id: "m1", sender: "them", content: "Hi! I really enjoyed your article on defensive culture building.", time: "Yesterday", read: true },
    { id: "m2", sender: "me", content: "Thank you Sarah! It's something I'm really passionate about.", time: "Yesterday", read: true },
    { id: "m3", sender: "them", content: "I'd love to connect about your pack-line defense adaptations. Coffee at WBCA?", time: "1h ago", read: true },
  ],
  "conv-3": [
    { id: "m1", sender: "me", content: "Devon, here are those film clips I mentioned. Focus on the safety's eyes pre-snap.", time: "Yesterday", read: true },
    { id: "m2", sender: "them", content: "This is gold. My guys struggle with reading the QB's shoulders.", time: "Yesterday", read: true },
    { id: "m3", sender: "them", content: "Thanks for sharing those film breakdowns. My guys are already seeing the difference.", time: "3h ago", read: true },
  ],
};

export default function MessagesPage() {
  const { user, profile } = useAuth();
  const [selectedConv, setSelectedConv] = useState<string | null>("conv-1");
  const [messageInput, setMessageInput] = useState("");
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [localMessages, setLocalMessages] = useState(mockMessages);

  const filteredConvos = mockConversations.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConvo = mockConversations.find((c) => c.id === selectedConv);
  const currentMessages = selectedConv ? (localMessages[selectedConv] || []) : [];

  const handleSend = () => {
    if (!messageInput.trim() || !selectedConv) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: "me",
      content: messageInput.trim(),
      time: "Just now",
      read: false,
    };
    setLocalMessages((prev) => ({
      ...prev,
      [selectedConv]: [...(prev[selectedConv] || []), newMsg],
    }));
    setMessageInput("");
  };

  const myInitials = profile
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : "ME";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Messages
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Connect and collaborate with coaches in your network.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden" style={{ height: "70vh" }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-full sm:w-80 lg:w-96 border-r border-slate-200/80 flex flex-col ${selectedConv ? "hidden sm:flex" : "flex"}`}>
              <div className="p-4 border-b border-slate-100">
                <h2 className="font-display font-bold text-lg text-navy-900 mb-3">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredConvos.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConv(conv.id)}
                    className={`w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50 transition-colors border-b border-slate-50 ${
                      selectedConv === conv.id ? "bg-teal-50/50 border-l-2 border-l-teal-500" : ""
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-xs">
                        {conv.initials}
                      </div>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-semibold text-sm text-navy-900 truncate">
                          {conv.name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{conv.title}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-slate-400 truncate">{conv.lastMessage}</span>
                        {conv.unread > 0 && (
                          <span className="shrink-0 ml-2 w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {selectedConv && currentConvo ? (
              <div className="flex-1 flex flex-col">
                {/* Chat header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedConv(null)}
                      className="sm:hidden p-1 rounded hover:bg-slate-100 text-slate-500"
                    >
                      ←
                    </button>
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center text-white font-display font-bold text-[10px]">
                        {currentConvo.initials}
                      </div>
                      {currentConvo.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-navy-900">{currentConvo.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {currentConvo.online ? "Online" : "Offline"} · {currentConvo.title}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => showToast("Voice calling coming soon", "info")} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Phone className="w-4 h-4 text-slate-500" />
                    </button>
                    <button onClick={() => showToast("Video calling coming soon", "info")} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Video className="w-4 h-4 text-slate-500" />
                    </button>
                    <button onClick={() => showToast("More options coming soon", "info")} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {/* Mutual connection badge */}
                  <div className="flex justify-center">
                    <span className="px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-[11px] text-teal-600 font-medium">
                      You both worked under Coach Ray Thompson · Mutual connection
                    </span>
                  </div>

                  {currentMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] ${msg.sender === "me" ? "order-2" : ""}`}>
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === "me"
                              ? "bg-teal-500 text-white rounded-br-md"
                              : "bg-slate-100 text-navy-900 rounded-bl-md"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${msg.sender === "me" ? "justify-end" : ""}`}>
                          <span className="text-[10px] text-slate-400">{msg.time}</span>
                          {msg.sender === "me" && (
                            msg.read
                              ? <CheckCheck className="w-3 h-3 text-teal-500" />
                              : <Check className="w-3 h-3 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="px-5 py-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button onClick={() => showToast("File attachments coming soon", "info")} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Paperclip className="w-4 h-4 text-slate-500" />
                    </button>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    />
                    <button onClick={() => showToast("Emoji picker coming soon", "info")} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Smile className="w-4 h-4 text-slate-500" />
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={!messageInput.trim()}
                      className="p-2.5 bg-teal-500 text-white rounded-xl hover:bg-teal-400 transition-all disabled:opacity-40"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 hidden sm:flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-slate-400" />
                  </div>
                  <h3 className="font-display font-bold text-navy-900 mb-1">Your Messages</h3>
                  <p className="text-sm text-slate-500">Select a conversation to start chatting</p>
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
