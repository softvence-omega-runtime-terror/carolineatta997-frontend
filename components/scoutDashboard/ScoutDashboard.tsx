"use client";

import React from "react";
import { Eye, Star, CalendarDays, MessageSquare } from "lucide-react";

/* ─── Fake Data ─────────────────────────────────────────────── */
const shortlistedPlayers = [
  {
    name: "John Doe",
    position: "Midfielder",
    nationality: "Spain",
    flag: "🇪🇸",
    age: 19,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Player",
    position: "Forward",
    nationality: "Portugal",
    flag: "🇵🇹",
    age: 18,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mike Johnson",
    position: "Defender",
    nationality: "France",
    flag: "🇫🇷",
    age: 20,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const upcomingEvents = [
  {
    title: "Elite Youth Trial",
    club: "Elite Football Academy",
    location: "Madrid, Spain",
    date: "15/09/2025",
    time: "10:00 AM",
    logo: "https://ui-avatars.com/api/?name=EFA&background=1a1a3e&color=00e5ff&size=48&bold=true",
  },
  {
    title: "Football Academy Showcase",
    club: "FC Barcelona Youth",
    location: "Barcelona, Spain",
    date: "20/09/2025",
    time: "2:00 PM",
    logo: "https://ui-avatars.com/api/?name=FCB&background=a50044&color=fff&size=48&bold=true",
  },
  {
    title: "Talent Scouting Day",
    club: "Portuguese FA",
    location: "Lisbon, Portugal",
    date: "25/09/2025",
    time: "9:00 AM",
    logo: "https://ui-avatars.com/api/?name=FPF&background=006600&color=fff&size=48&bold=true",
  },
];

const recentViews = [
  { name: "Player 1", position: "Midfielder", nationality: "Spain", time: "2h ago", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Player 2", position: "Midfielder", nationality: "Spain", time: "2h ago", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Player 3", position: "Midfielder", nationality: "Spain", time: "2h ago", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
  { name: "Player 4", position: "Midfielder", nationality: "Spain", time: "2h ago", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
];

const recentMessages = [
  {
    name: "John Doe",
    preview: "Thank you for reaching out...",
    time: "2h ago",
    unread: true,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "FC Barcelona Youth",
    preview: "We have updated the event...",
    time: "5h ago",
    unread: true,
    avatar: "https://ui-avatars.com/api/?name=FCB&background=a50044&color=fff&size=48&bold=true",
  },
  {
    name: "Sarah Player",
    preview: "I appreciate your interest...",
    time: "1d ago",
    unread: false,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

/* ─── Stat Card ─────────────────────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: string;
  iconColor: string;
  subColor: string;
}

const StatCard = ({ icon, label, value, sub, iconColor, subColor }: StatCardProps) => (
  <div className="bg-[#12143A] border border-white/[0.07] rounded-xl p-5 flex flex-col gap-1">
    <div className={`mb-1 ${iconColor}`}>{icon}</div>
    <p className="text-xs text-white/50 uppercase tracking-wide">{label}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
    <p className={`text-xs font-medium ${subColor}`}>{sub}</p>
  </div>
);

/* ─── Main Component ─────────────────────────────────────────── */
const ScoutDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white font-sans pb-12">

      {/* Welcome Heading */}
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold">
          Welcome Back,{" "}
          <span className="bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
            Mike!
          </span>
        </h1>
      </div>

      {/* ── Stats ── */}
      <section className="px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye size={24} />}
          label="Players Viewed"
          value={342}
          sub="+48 this week"
          iconColor="text-[#00E5FF]"
          subColor="text-[#00E5FF]"
        />
        <StatCard
          icon={<Star size={24} />}
          label="Shortlisted Players"
          value={28}
          sub="12 active"
          iconColor="text-[#9C27B0]"
          subColor="text-[#9C27B0]"
        />
        <StatCard
          icon={<CalendarDays size={24} />}
          label="Upcoming Events"
          value={6}
          sub="Next: Sep 15"
          iconColor="text-[#00E5FF]"
          subColor="text-[#00E5FF]"
        />
        <StatCard
          icon={<MessageSquare size={24} />}
          label="Active Conversations"
          value={15}
          sub="5 unread"
          iconColor="text-[#00E5FF]"
          subColor="text-[#00E5FF]"
        />
      </section>

      {/* ── Shortlisted Players ── */}
      <section className="px-6 mb-6">
        <div className="bg-[#12143A] border border-white/[0.07] rounded-xl p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-yellow-400" fill="currentColor" />
              <h2 className="text-base font-bold text-white">Shortlisted Players</h2>
            </div>
            <button className="text-xs text-[#00E5FF] border border-[#00E5FF]/40 px-3 py-1 rounded-md hover:bg-[#00E5FF]/10 transition-colors">
              View All
            </button>
          </div>

          {/* Player Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {shortlistedPlayers.map((player) => (
              <div
                key={player.name}
                className="bg-[#0B0D2C] border border-white/[0.07] rounded-xl p-4"
              >
                {/* Avatar + Star */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <p className="font-semibold text-sm text-white">{player.name}</p>
                      <p className="text-xs text-white/50">{player.position}</p>
                    </div>
                  </div>
                  <Star size={14} className="text-yellow-400 mt-1 flex-shrink-0" fill="currentColor" />
                </div>

                {/* Details */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/45">Nationality:</span>
                    <span className="text-white/75">
                      {player.flag} {player.nationality}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/45">Age:</span>
                    <span className="text-white/75">{player.age} years</span>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full py-2 rounded-lg border border-[#00E5FF]/50 text-[#00E5FF] text-xs font-medium hover:bg-[#00E5FF]/10 transition-colors">
                  View Full Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Scouting Events ── */}
      <section className="px-6 mb-6">
        <div className="bg-[#12143A] border border-white/[0.07] rounded-xl p-5">
          <h2 className="text-base font-bold text-white mb-5">
            Upcoming Scouting Events
          </h2>

          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-4 bg-[#0B0D2C] border border-white/[0.06] rounded-xl p-4"
              >
                {/* Logo */}
                <img
                  src={event.logo}
                  alt={event.club}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white">{event.title}</p>
                  <p className="text-xs text-white/50">{event.club}</p>
                  <p className="text-xs text-white/40 mt-0.5">{event.location}</p>
                </div>

                {/* Date & Time */}
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-[#00E5FF] font-medium">{event.date}</p>
                  <p className="text-xs text-white/45">{event.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Events */}
          <div className="mt-4 text-center">
            <button className="text-xs text-[#00E5FF] border border-[#00E5FF]/40 px-5 py-2 rounded-lg hover:bg-[#00E5FF]/10 transition-colors w-full">
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* ── Recent Views + Messages ── */}
      <section className="px-6 grid md:grid-cols-2 gap-5">

        {/* Recent Player Views */}
        <div className="bg-[#12143A] border border-white/[0.07] rounded-xl p-5">
          <h2 className="text-base font-bold text-white mb-4">Recent Player Views</h2>

          <div className="space-y-3">
            {recentViews.map((player, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#0B0D2C] border border-white/[0.06] rounded-xl p-3"
              >
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{player.name}</p>
                  <p className="text-xs text-white/45">
                    {player.position} • {player.nationality}
                  </p>
                </div>
                <span className="text-xs text-white/40 whitespace-nowrap">{player.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-[#12143A] border border-white/[0.07] rounded-xl p-5">
          <h2 className="text-base font-bold text-white mb-4">Recent Messages</h2>

          <div className="space-y-3">
            {recentMessages.map((msg, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[#0B0D2C] border border-white/[0.06] rounded-xl p-3"
              >
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{msg.name}</p>
                  <p className="text-xs text-white/45 truncate">{msg.preview}</p>
                  <p className="text-xs text-white/30 mt-0.5">{msg.time}</p>
                </div>
                {msg.unread && (
                  <span className="w-2 h-2 bg-[#9C27B0] rounded-full mt-1.5 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="text-xs text-[#00E5FF] border border-[#00E5FF]/40 px-5 py-2 rounded-lg hover:bg-[#00E5FF]/10 transition-colors w-full">
              View All Messages
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-white/25 text-xs">
        © 2025 NextGen Pros. All rights reserved.
      </footer>
    </div>
  );
};

export default ScoutDashboard;