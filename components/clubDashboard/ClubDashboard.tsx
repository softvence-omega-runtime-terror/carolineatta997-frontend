// src/components/ClubDashboard.tsx
import React from "react";
import {
  Eye,
  CalendarDays,
  Users,
  Mail,
  Star,
  MoreVertical,
} from "lucide-react";

const ClubDashboard: React.FC = () => {
  return (
    <div className="min-h-screen  text-white p-6 md:p-2">
      <div className="mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="inline-block text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00e5ff] to-[#9C27B0] bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <div className="text-sm text-slate-400">
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 ">
          <StatCard
            icon={<Eye size={26} />}
            label="Profile Views"
            value="1,842"
            change="+158 this week"
            changeColor="text-emerald-400"
          />
          <StatCard
            icon={<CalendarDays size={26} />}
            label="Events"
            value="8"
            change="3 upcoming"
            changeColor="text-cyan-400"
          />
          <StatCard
            icon={<Users size={26} />}
            label="Player Applications"
            value="234"
            change="52 pending"
            changeColor="text-amber-400"
          />
          <StatCard
            icon={<Mail size={26} />}
            label="Messages"
            value="45"
            change="12 unread"
            changeColor="text-rose-400"
          />
        </div>

        {/* Active Events */}
        <section className="space-y-5 bg-[#12143A] p-8 rounded-lg border border-[#04B5A3]/30">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Active Events</h2>
            <button className="bg-[#04B5A3] hover:bg-[#04B5A3]/80 px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
              + Create Event
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 ">
            <EventCard
              title="Youth Trial - Summer 2025"
              date="15/08/2025"
              location="Barcelona, Spain"
              registrations={45}
              max={100}
              isFeatured={true}
            />

            <EventCard
              title="Academy Showcase"
              date="20/02/2026"
              location="Barcelona, Spain"
              registrations={87}
              max={80}
              isHighlighted={true}
            />

            <EventCard
              title="Talent Scouting Day"
              date="25/09/2025"
              location="Madrid, Spain"
              registrations={23}
              max={50}
            />
          </div>
        </section>

        {/* Recent Messages */}
        <section className="space-y-5 bg-[#12143A] border border-[#04B5A3]/30 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold">Recent Messages</h2>

          <div className="space-y-3">
            <MessageItem
              sender="FC Barcelona Youth"
              message="We are interested in your profile..."
              time="2h ago"
              unread
            />
            <MessageItem
              sender="Mike Scout"
              message="Great highlight reel! Would love to..."
              time="3h ago"
            />
            <MessageItem
              sender="Real Madrid Academy"
              message="Thank you for your interest..."
              time="1d ago"
            />
          </div>

          <button className="w-full py-3.5  border border-[#00E5FF]/30 text-[#00E5FF]  rounded-xl  font-medium transition-colors ">
            View All Messages
          </button>
        </section>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────
   Reusable sub-components
───────────────────────────────────────────────── */

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  changeColor: string;
};

function StatCard({ icon, label, value, change, changeColor }: StatCardProps) {
  return (
    <div className="bg-[#12143A] border border-[#04B5A3]/30 rounded-xl p-5 shadow-lg backdrop-blur-sm hover:border-slate-700 transition-colors">
      <div className="mb-3 text-cyan-400">{icon}</div>
      <div className="text-sm text-slate-400">{label}</div>
      <div className="text-2xl font-bold mt-0.5">{value}</div>
      <div className={`text-sm mt-1 ${changeColor}`}>{change}</div>
    </div>
  );
}

type EventCardProps = {
  title: string;
  date: string;
  location: string;
  registrations: number;
  max: number;
  isFeatured?: boolean;
  isHighlighted?: boolean;
};

function EventCard({
  title,
  date,
  location,
  registrations,
  max,
  isFeatured = false,
  isHighlighted = false,
}: EventCardProps) {
  const percent = Math.min(100, Math.round((registrations / max) * 100));

  return (
    <div
      className={`
        bg-slate-900/70 border rounded-xl p-5 shadow-lg transition-all duration-200
        ${isHighlighted ? "border-cyan-700/60 hover:border-cyan-600" : "border-slate-800 hover:border-slate-600"}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          {title}
          {isFeatured && (
            <Star size={18} className="text-yellow-400 fill-yellow-400" />
          )}
        </h3>
        <button className="text-slate-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <p className="text-sm text-slate-400 mb-5">
        {date} • {location}
      </p>

      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Registrations</span>
          <span className="text-slate-400">
            {registrations}/{max}
          </span>
        </div>
        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <button className="mt-6 w-full py-2.5  border border-[#00E5FF]/30 text-[#00E5FF] rounded-lg text-sm font-medium transition-colors">
        View Details
      </button>
    </div>
  );
}

type MessageItemProps = {
  sender: string;
  message: string;
  time: string;
  unread?: boolean;
};

function MessageItem({
  sender,
  message,
  time,
  unread = false,
}: MessageItemProps) {
  return (
    <div
      className={`
        flex gap-4 p-4 rounded-xl border transition-colors
        ${
          unread
            ? "bg-indigo-950/30 border-indigo-900/50"
            : "bg-slate-900/50 border-slate-800"
        }
        hover:bg-slate-800/70
      `}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-lg font-bold flex-shrink-0">
        {sender[0]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline gap-2">
          <p
            className={`font-medium truncate ${unread ? "text-white" : "text-slate-200"}`}
          >
            {sender}
          </p>
          <span className="text-xs text-slate-500 whitespace-nowrap">
            {time}
          </span>
        </div>
        <p
          className={`text-sm mt-0.5 truncate ${unread ? "text-slate-300" : "text-slate-400"}`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default ClubDashboard;
