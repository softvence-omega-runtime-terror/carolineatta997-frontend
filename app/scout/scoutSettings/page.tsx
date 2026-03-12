"use client";

import React, { useState } from "react";
import {

  Globe,
  Bell,
  Shield,
  Lock,
  Clock,
  Cog,
} from "lucide-react";
import { MdSecurity } from "react-icons/md";

type Tab = "security" | "notifications" | "preferences";

const ScoutSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("security");

  // Toggle states – you can later connect to real data / API
  const [toggles, setToggles] = useState({
    profileVisibility: true,
    contactRequests: true,
    showOnlineStatus: false,
    activityHistory: true,

    // Notifications
    emailNewMatches: true,
    emailEventUpdates: true,
    emailPlayerViews: false,
    emailMessages: true,
    emailWeeklySummary: true,
    emailPlatformUpdates: false,

    pushInstantMessages: true,
    pushEventReminders: true,
    pushShortlistUpdates: false,

    smsSecurityAlerts: true,
    smsLoginVerification: true,

    // Preferences
    saveSearchHistory: true,
    searchSuggestions: true,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen  text-slate-100 pb-12 font-sans">
      <div className=" mx-auto px-5 sm:px-6 lg:px-2 py-8">
        {/* Top bar with title + Edit button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="inline-block text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00e5ff] to-[#9C27B0] bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-slate-400 mt-1">
              Manage your account and preferences
            </p>
          </div>
          <button className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2">
            Edit
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-800 mb-10">
          <div className="flex gap-8 text-sm font-medium">
            <button
              onClick={() => setActiveTab("security")}
              className={`pb-4 px-1 relative flex gap-2 items-center ${
                activeTab === "security"
                  ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 bg-gradient-to-r from-[#00e5ff57] to-[#9b27b06d] p-3 after:bg-teal-500"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Shield size={20} className="" /> Security & Privacy
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`pb-4 flex items-center gap-2 px-1 relative ${
                activeTab === "notifications"
                  ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 bg-gradient-to-r from-[#00e5ff57] to-[#9b27b06d] p-3 after:bg-teal-500"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Bell size={20} /> Notifications
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`pb-4 flex items-center gap-2 px-1 relative ${
                activeTab === "preferences"
                  ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-500 bg-gradient-to-r from-[#00e5ff57] to-[#9b27b06d] p-3"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Cog size={20} />
              Preferences
            </button>
          </div>
        </div>

        {/* SECURITY & PRIVACY TAB */}
        {activeTab === "security" && (
          <div className="space-y-10">
            {/* Change Password */}
            <div className="bg-[#12143A] border border-slate-800/70 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Lock size={20} className="text-teal-400" />
                Change Password
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full bg-[#0B0D2C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full bg-[#0B0D2C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/60"
                  />
                  <p className="text-slate-500 text-xs mt-2">
                    Must be 8+ characters with uppercase, lowercase, numbers,
                    and symbols
                  </p>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-[#0B0D2C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/60"
                  />
                </div>

                <button className="w-full md:w-auto bg-teal-600 hover:bg-teal-500 text-white font-medium px-8 py-3 rounded-lg transition-colors mt-4">
                  Update Password
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-[#12143A] border border-slate-800/70 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-800/70">
                <h2 className="text-xl font-semibold mb-1">Privacy Settings</h2>
              </div>

              <div className="divide-y divide-slate-800/70">
                {[
                  {
                    title: "Profile Visibility",
                    desc: "Allow other users to view your profile",
                    key: "profileVisibility",
                  },
                  {
                    title: "Contact Requests",
                    desc: "Allow users and clubs to message you",
                    key: "contactRequests",
                  },
                  {
                    title: "Show Online Status",
                    desc: "Let others see when you're active",
                    key: "showOnlineStatus",
                  },
                  {
                    title: "Activity History and player views",
                    desc: "Track platform activity and player views",
                    key: "activityHistory",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between px-6 md:px-8 py-5"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-slate-400 text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={toggles[item.key as keyof typeof toggles]}
                        onChange={() =>
                          toggle(item.key as keyof typeof toggles)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-[#12143A] border border-slate-800/70 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-800/70">
                <h2 className="text-xl font-semibold mb-1">Active Sessions</h2>
              </div>

              <div className="p-6 md:p-8 space-y-5">
                {[
                  {
                    device: "MacBook Pro",
                    location: "London, UK • active now",
                    icon: "laptop",
                  },
                  {
                    device: "Chrome on Windows",
                    location: "Manchester, UK • 3 days ago",
                    icon: "monitor",
                  },
                ].map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-[#0B0D2C] border border-slate-800 rounded-lg px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400">
                        {session.icon === "laptop" ? (
                          <Clock size={20} />
                        ) : (
                          <Clock size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-slate-400 text-sm">
                          {session.location}
                        </p>
                      </div>
                    </div>
                    {i === 1 && (
                      <button className="text-red-400 hover:text-red-300 text-sm">
                        ×
                      </button>
                    )}
                  </div>
                ))}

                <button className="w-full mt-4 py-3 
                 text-red-600 rounded-lg transition-colors border border-red-600">
                  Sign Out All Other Sessions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === "notifications" && (
          <div className="space-y-10">
            {/* Email Notifications */}
            <div className="bg-[#12143A] border border-slate-800/70 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-800/70">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Bell size={20} className="text-teal-400" />
                  Email Notifications
                </h2>
              </div>
              <div className="divide-y divide-slate-800/70">
                {[
                  {
                    label: "New Player Matches",
                    desc: "Get notified when new players match your search criteria",
                    key: "emailNewMatches",
                  },
                  {
                    label: "Event Updates",
                    desc: "Receive updates about upcoming scouting events",
                    key: "emailEventUpdates",
                  },
                  {
                    label: "Player Profile Views",
                    desc: "Know when players view your profile",
                    key: "emailPlayerViews",
                  },
                  {
                    label: "Message Notifications",
                    desc: "Get notified about new messages",
                    key: "emailMessages",
                  },
                  {
                    label: "Weekly Summary",
                    desc: "Receive a weekly summary of your activity",
                    key: "emailWeeklySummary",
                  },
                  {
                    label: "Platform Updates",
                    desc: "Stay informed about new features and updates",
                    key: "emailPlatformUpdates",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-6 md:px-8 py-5"
                  >
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-slate-400 text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={toggles[item.key as keyof typeof toggles]}
                        onChange={() =>
                          toggle(item.key as keyof typeof toggles)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-[#12143A] border border-slate-800/70 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-800/70">
                <h2 className="text-xl font-semibold">Push Notifications</h2>
              </div>
              <div className="divide-y divide-slate-800/70">
                {[
                  {
                    label: "Instant Messages",
                    desc: "Real-time notifications for new messages",
                    key: "pushInstantMessages",
                  },
                  {
                    label: "Event Reminders",
                    desc: "Reminders before scouting events",
                    key: "pushEventReminders",
                  },
                  {
                    label: "Shortlist Updates",
                    desc: "When shortlisted players update their profiles",
                    key: "pushShortlistUpdates",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-6 md:px-8 py-5"
                  >
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-slate-400 text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={toggles[item.key as keyof typeof toggles]}
                        onChange={() =>
                          toggle(item.key as keyof typeof toggles)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="bg-[#12143A] border border-slate-800/70 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-800/70">
                <h2 className="text-xl font-semibold">SMS Notifications</h2>
              </div>
              <div className="divide-y divide-slate-800/70">
                {[
                  {
                    label: "Security Alerts",
                    desc: "Important security notifications",
                    key: "smsSecurityAlerts",
                  },
                  {
                    label: "Login Verification",
                    desc: "Two-factor authentication codes",
                    key: "smsLoginVerification",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-6 md:px-8 py-5"
                  >
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-slate-400 text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={toggles[item.key as keyof typeof toggles]}
                        onChange={() =>
                          toggle(item.key as keyof typeof toggles)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && (
          <div className="space-y-10">
            {/* Language & Region */}
            <div className="bg-[#12143A] border border-slate-800/70 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Globe size={20} className="text-teal-400" />
                Language & Region
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    Platform language
                  </label>
                  <select className="w-full bg-[#0B0D2C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/60">
                    <option>English (UK)</option>
                    <option>English (US)</option>
                    <option>Español</option>
                    <option>Português</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    Time Zone
                  </label>
                  <select className="w-full bg-[#0B0D2C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/60">
                    <option>GMT+1 (Madrid, Barcelona)</option>
                    <option>GMT (London)</option>
                    <option>GMT-5 (New York)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    Date Format
                  </label>
                  <select className="w-full bg-[#0B0D2C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/60">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    Currency
                  </label>
                  <select className="w-full bg-[#0B0D2C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/60">
                    <option>€ EUR</option>
                    <option>£ GBP</option>
                    <option>$ USD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Preferences */}
            <div className="bg-[#12143A] border border-slate-800/70 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-800/70">
                <h2 className="text-xl font-semibold">Search Preferences</h2>
              </div>
              <div className="divide-y divide-slate-800/70">
                <div className="flex items-center justify-between px-6 md:px-8 py-5">
                  <div>
                    <p className="font-medium">Save Search History</p>
                    <p className="text-slate-400 text-sm mt-0.5">
                      Remember your recent searches and filters
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.saveSearchHistory}
                      onChange={() => toggle("saveSearchHistory")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between px-6 md:px-8 py-5">
                  <div>
                    <p className="font-medium">
                      Search Suggestions based on activity
                    </p>
                    <p className="text-slate-400 text-sm mt-0.5">
                      Show suggested players based on your activity
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.searchSuggestions}
                      onChange={() => toggle("searchSuggestions")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <footer className="text-center text-slate-600 text-sm py-8 border-t border-slate-800/40 mt-12">
        © 2025 NextGen Pros. All rights reserved.
      </footer> */}
    </div>
  );
};

export default ScoutSettingsPage;
