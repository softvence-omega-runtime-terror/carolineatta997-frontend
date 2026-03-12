"use client";

import {
  RecentMessage,
  UpcomingEvent,
  useGetDashboardStatsQuery,
  useGetUpcomingEventsQuery,
} from "@/redux/features/player/playerDashboard/playerDashboardApi";
import { useGetMyProfileQuery } from "@/redux/features/player/playerProfileAndEdit/profileAndEditApi";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

// ─── Fallback / Mock Data ─────────────────────────────────────────────────────

const FALLBACK_EVENTS: UpcomingEvent[] = [
  {
    id: 1,
    title: "Elite Youth Trial",
    location: "Madrid, Spain",
    date: "15/09/2025",
    time: "10:00 AM",
    club_logo: "/logos/real-madrid.png", // you can replace with real paths
  },
  {
    id: 2,
    title: "Football Academy Showcase",
    location: "Barcelona, Spain",
    date: "20/09/2025",
    time: "2:00 PM",
    club_logo: "/logos/barcelona.png",
  },
];

const FALLBACK_MESSAGES: RecentMessage[] = [
  {
    id: 1,
    sender_name: "FC Barcelona Youth",
    preview: "We are interested in your profile...",
    time_ago: "2h ago",
    is_unread: true,
    sender_logo: "/logos/barcelona.png",
  },
  {
    id: 2,
    sender_name: "Mike Scout",
    preview: "Great highlight reel! Would love to...",
    time_ago: "5h ago",
    is_unread: true,
  },
  {
    id: 3,
    sender_name: "Real Madrid Academy",
    preview: "Thank you for your interest...",
    time_ago: "1d ago",
    is_unread: false,
    sender_logo: "/logos/real-madrid.png",
  },
];

// ─── Reusable Components ──────────────────────────────────────────────────────

const Avatar = ({ name, logo }: { name: string; logo?: string }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border border-[#1E2554]"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B026FF] to-[#00E5FF] flex items-center justify-center text-white font-bold text-sm border border-[#1E2554]">
      {initials}
    </div>
  );
};

const Check = () => (
  <svg
    className="w-4 h-4 text-[#00E5FF]"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const Cross = () => (
  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function PlayerDashboard() {
  const { data: stats } = useGetDashboardStatsQuery();
  const { data: profile } = useGetMyProfileQuery();
  const { data: upcomingEventsData, isLoading: isEventsLoading } = useGetUpcomingEventsQuery();

  const completeness = profile?.profile_completeness ?? 0;
  const upcomingEvents = upcomingEventsData ?? [];

  const recentMessages = stats?.recent_messages?.length
    ? stats.recent_messages
    : FALLBACK_MESSAGES;

  const profileViews = profile?.insights?.profile_views ?? stats?.profile_views ?? 0;
  const profileViewsWeekly = profile?.insights?.profile_views_this_week ?? 0;

  return (
    <div className="min-h-screen bg-[#080D28] text-white p-6 font-sans">
      <div className=" mx-auto space-y-6">
        {/* Welcome */}
        <h1 className="text-4xl font-bold mb-6 inline-block pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
          Welcome Back,
        </h1>
        {/* Profile Completeness */}
        <div className="bg-[#11163C] rounded-xl p-6 border border-[#1E2554]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Profile Completeness</h2>
            <span className="text-[#00E5FF] font-bold text-xl">
              {completeness}%
            </span>
          </div>

          <div className="h-2 bg-[#1E2554] rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#00E5FF] transition-all duration-1000"
              style={{ width: `${completeness}%` }}
            />
          </div>

          <p className="text-sm text-[#9BA3C8] mb-5">
            Complete your profile to increase visibility to clubs and scouts
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {[
              { label: "Basic Info", done: true },
              { label: "Profile Photo", done: true },
              { label: "Highlight Video", done: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done ? "bg-[#00E5FF]/20" : "bg-red-500/20"}`}
                >
                  {item.done ? <Check /> : <Cross />}
                </div>
                <span className={item.done ? "text-[#9BA3C8]" : "text-red-300"}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#11163C] rounded-xl p-5 border border-[#1E2554] flex items-center gap-4">
            <div className="space-y-3 py-5">
              <IoEyeOutline size={30} className="text-[#00E5FF]" />
              <p className="text-sm text-[#9BA3C8]">Profile Views</p>
              <p className="text-3xl font-bold">
                {profileViews}
              </p>
              <p className="text-xs text-[#00E564]">
                +{profileViewsWeekly} this week
              </p>
            </div>
          </div>

          <div className="bg-[#11163C] rounded-xl p-5 border border-[#1E2554] flex items-center gap-4">
            <div className="space-y-3 py-5">
              <FiMessageSquare size={30} className="text-[#00E5FF]" />
              <p className="text-sm text-[#9BA3C8]">Messages</p>
              <p className="text-3xl font-bold">
                {stats?.messages_count ?? 12}
              </p>
              <p className="text-xs text-[#00E5FF]">
                {stats?.messages_count ? "3 unread" : "No unread"}
              </p>
            </div>
          </div>

          <div className="bg-[#11163C] rounded-xl p-5 border border-[#1E2554] flex items-center gap-4">
            <div className="space-y-3 py-5">
              <SlCalender size={30} className="text-[#00E5FF]" />
              <p className="text-sm text-[#9BA3C8]">Events Registered</p>
              <p className="text-3xl font-bold">
                {stats?.events_registered ?? 5}
              </p>
              <p className="text-xs text-[#00E5FF]">2 upcoming</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-[#11163C] rounded-xl border border-[#1E2554] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1E2554]">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
          </div>

          <div className="divide-y divide-[#1E2554]">
            {isEventsLoading ? (
              [...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="px-6 py-4 flex items-center gap-4 animate-pulse"
                >
                  <div className="w-10 h-10 bg-[#1E2554] rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/5 bg-[#1E2554] rounded" />
                    <div className="h-3 w-2/5 bg-[#1E2554] rounded" />
                  </div>
                </div>
              ))
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event: any) => (
                <div
                  key={event.id}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-[#0A0F2C] transition-colors"
                >
                  <Avatar name={event.event_name || event.title} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.event_name || event.title}</p>
                    <p className="text-sm text-[#9BA3C8] flex items-center gap-1.5 mt-0.5">
                      <span>📍</span> {event.location || event.city || "Online / TBD"}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium text-[#00E5FF]">
                      {event.date || event.event_date}
                    </div>
                    {event.time && <div className="text-[#9BA3C8] mt-0.5">{event.time}</div>}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-10 flex flex-col items-center justify-center text-[#9BA3C8]">
                <SlCalender size={40} className="opacity-20 mb-4" />
                <p className="font-medium">No upcoming events found.</p>
                <p className="text-sm mt-1">When you register for events, they will appear here.</p>
              </div>
            )}
          </div>

          <Link href={"/player/eventsDirectory"}>
            <div className="px-6 py-4 border-t border-[#1E2554] text-center border">
              <button className="text-[#00E5FF] border border-[#00E5FF] w-full p-2 rounded-lg  hover:text-[#B026FF] font-medium transition-colors">
                View All Events
              </button>
            </div>
          </Link>
        </div>

        {/* Recent Messages */}
        <div className="bg-[#11163C] rounded-xl border border-[#1E2554] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1E2554]">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
          </div>

          <div className="divide-y divide-[#1E2554]">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-[#0A0F2C] transition-colors cursor-pointer"
              >
                <div className="relative">
                  <Avatar name={msg.sender_name} logo={msg.sender_logo} />
                  {msg.is_unread && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#00E5FF] rounded-full border-2 border-[#11163C]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{msg.sender_name}</p>
                  <p className="text-sm text-[#9BA3C8] truncate mt-0.5">
                    {msg.preview}
                  </p>
                </div>

                <div className="text-right text-xs text-[#9BA3C8]">
                  {msg.time_ago}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-[#1E2554] text-center">
            <Link href={"/player/messaging"}>
              {" "}
              <button className="text-[#00E5FF] hover:text-[#B026FF]  border border-[#00E5FF] w-full p-2 rounded-lg   font-medium transition-colors">
                View All Messages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
