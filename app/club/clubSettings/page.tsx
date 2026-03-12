"use client";

import React, { useState, useEffect } from "react";
import { Bell, Shield, Cog, Lock, Globe, Clock, X } from "lucide-react";
import {
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useGetPrivacySettingsQuery,
  useUpdatePrivacySettingsMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useChangePasswordMutation,
  useSignOutAllSessionsMutation,
} from "@/redux/features/club/clubSettingsApi";
import { toast } from "react-hot-toast";

type Tab = "security" | "notifications" | "preferences";

const ClubSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("security");

  // RTK Query Hooks
  const { data: generalData, isLoading: generalLoading } = useGetGeneralSettingsQuery();
  const [updateGeneral] = useUpdateGeneralSettingsMutation();

  const { data: privacyData, isLoading: privacyLoading } = useGetPrivacySettingsQuery();
  const [updatePrivacy] = useUpdatePrivacySettingsMutation();

  const { data: notifData, isLoading: notifLoading } = useGetNotificationSettingsQuery();
  const [updateNotif] = useUpdateNotificationSettingsMutation();

  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [signOutAll] = useSignOutAllSessionsMutation();

  // Local State for Toggles
  const [privacy, setPrivacy] = useState<Record<string, boolean>>({
    public_profile: true,
    show_contact_info: true,
    accept_player_applications: true,
    scout_access: true,
    show_statistics: false,
  });

  const [notif, setNotif] = useState<Record<string, any>>({
    email_new_applications: true,
    email_event_updates: true,
    email_scout_inquiries: true,
    email_messages: true,
    email_payment_confirmations: true,
    email_event_reminders: true,
    email_monthly_reports: false,
    email_platform_updates: false,
    email_marketing: false,

    push_instant_messages: true,
    push_application_alerts: true,
    push_event_updates: true,
    push_system_alerts: true,

    sms_security_alerts: true,
    sms_login_verification: true,
    sms_event_reminders: false,

    quiet_hours_start: "",
    quiet_hours_end: "",
  });

  const [general, setGeneral] = useState<Record<string, any>>({
    platform_language: "English (UK)",
    time_zone: "GMT+1 (Madrid, Barcelona)",
    date_format: "DD/MM/YYYY",
    currency: "EUR",
    default_event_duration: "2 hours",
    auto_approve_applications: "Manual approval",
    send_confirmation_emails: true,
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Sync APIs with local state
  useEffect(() => {
    if (privacyData?.data || privacyData) {
      setPrivacy((prev) => ({ ...prev, ...(privacyData.data || privacyData) }));
    }
  }, [privacyData]);

  useEffect(() => {
    if (notifData?.data || notifData) {
      setNotif((prev) => ({ ...prev, ...(notifData.data || notifData) }));
    }
  }, [notifData]);

  useEffect(() => {
    if (generalData?.data || generalData) {
      setGeneral((prev) => ({ ...prev, ...(generalData.data || generalData) }));
    }
  }, [generalData]);

  // Handle Toggles
  const handlePrivacyToggle = async (key: string) => {
    const newVal = !privacy[key];
    setPrivacy((prev) => ({ ...prev, [key]: newVal }));
    try {
      await updatePrivacy({ ...privacy, [key]: newVal }).unwrap();
      toast.success("Privacy settings updated");
    } catch (err) {
      setPrivacy((prev) => ({ ...prev, [key]: !newVal })); // revert
      toast.error("Failed to update privacy settings");
    }
  };

  const handleNotifToggle = async (key: string) => {
    const newVal = !notif[key];
    setNotif((prev) => ({ ...prev, [key]: newVal }));
    try {
      await updateNotif({ ...notif, [key]: newVal }).unwrap();
      toast.success("Notification settings updated");
    } catch (err) {
      setNotif((prev) => ({ ...prev, [key]: !newVal })); // revert
      toast.error("Failed to update notifications");
    }
  };

  const handleGeneralChange = async (key: string, val: any) => {
    setGeneral((prev) => ({ ...prev, [key]: val }));
    try {
      await updateGeneral({ ...general, [key]: val }).unwrap();
      toast.success("Preferences updated");
    } catch (err) {
      toast.error("Failed to update preferences");
    }
  };

  // Password Update
  const handleUpdatePassword = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
      toast.error("New passwords do not match!");
      return;
    }
    if (!passwords.current_password || !passwords.new_password) {
      toast.error("Please fill required fields");
      return;
    }
    try {
      await changePassword({
        old_password: passwords.current_password,
        new_password: passwords.new_password,
      }).unwrap();
      toast.success("Password updated successfully");
      setPasswords({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err: any) {
      toast.error(err?.data?.error || err?.data?.message || "Failed to update password");
    }
  };

  // Logout All
  const handleSignOutAll = async () => {
    try {
      await signOutAll().unwrap();
      toast.success("Signed out of all other sessions");
    } catch (err) {
      toast.error("Failed to sign out other sessions");
    }
  };

  const isLoadingScreen = generalLoading || privacyLoading || notifLoading;

  if (isLoadingScreen) {
    return (
      <div className="min-h-screen bg-[#070B24] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-[3px] border-[#1A2160] border-t-[#00D9FF] animate-spin" />
      </div>
    );
  }

  // Common UI Elements
  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
      className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${
        checked ? "bg-[#00D9FF]" : "bg-[#1A2160]"
      }`}
      onClick={onChange}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070B24] text-white p-6 md:p-10 font-sans pb-20">
      <div className=" w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 inline-block pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-[#5B6397] text-sm mt-1">Manage your club account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[#1A2160] mb-6">
          {(
            [
              { id: "security", label: "Security & Privacy", icon: Shield },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "preferences", label: "Preferences", icon: Cog },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-colors ${
                activeTab === id
                  ? "text-white bg-gradient-to-r from-[#00E5FF33] to-[#9C27B033] border-b-2 border-[#00E5FF]"
                  : "text-[#5B6397] hover:text-[#8891BB]"
              }`}
            >
              <Icon size={16} className={activeTab === id ? (id === "notifications" ? "text-purple-400" : "text-cyan-400") : ""} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Security & Privacy Tab ── */}
        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-[#12143A] border border-[#1A2160] rounded-xl p-6 md:p-8 flex flex-col items-center">
              <div className="w-full ">
                <h2 className="text-white font-bold flex items-center gap-2 mb-6">
                  <Lock size={16} className="text-cyan-400" />
                  Change Password
                </h2>
                <div className="space-y-4 w-full">
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Current Password</label>
                  <input
                    type="password"
                    value={passwords.current_password}
                    onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">New Password</label>
                  <input
                    type="password"
                    value={passwords.new_password}
                    onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Enter new password"
                  />
                  <p className="text-[9px] text-[#5B6397] mt-1.5">Must be at least 8 characters with uppercase, lowercase, and numbers</p>
                </div>
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwords.confirm_password}
                    onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  onClick={handleUpdatePassword}
                  disabled={isChangingPassword}
                  className="w-full py-2.5 bg-[#00D9FF] text-[#070B24] rounded-lg font-bold text-sm hover:bg-cyan-300 transition-colors mt-2"
                >
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#1A2160]">
                <h2 className="text-white font-bold">Privacy Settings</h2>
              </div>
              <div className="divide-y divide-[#1A2160]">
                {[
                  {
                    key: "public_profile",
                    title: "Public Profile",
                    desc: "Allow your club to be discovered in searches",
                  },
                  {
                    key: "show_contact_info",
                    title: "Show Contact Information",
                    desc: "Display phone and email on public profile",
                  },
                  {
                    key: "accept_player_applications",
                    title: "Accept Player Applications",
                    desc: "Allow players to apply directly to your events",
                  },
                  {
                    key: "scout_access",
                    title: "Scout Access",
                    desc: "Allow scouts to view your events and contact you",
                  },
                  {
                    key: "show_statistics",
                    title: "Show Statistics",
                    desc: "Display event attendance and success metrics",
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-[11px] text-[#5B6397] mt-1">{item.desc}</p>
                    </div>
                    <ToggleSwitch checked={!!privacy[item.key]} onChange={() => handlePrivacyToggle(item.key)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#1A2160]">
                <h2 className="text-white font-bold">Active Sessions</h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between bg-[#070B24] border border-[#1A2160] rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#111640] border border-[#1A2160] flex items-center justify-center text-cyan-400">
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-2">
                        Chrome on Windows
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[9px] rounded font-bold uppercase">Current</span>
                      </p>
                      <p className="text-[11px] text-[#5B6397]">Barcelona, Spain • Active now</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#070B24] border border-[#1A2160] rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#111640] border border-[#1A2160] flex items-center justify-center text-cyan-400">
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Safari on MacBook</p>
                      <p className="text-[11px] text-[#5B6397]">Barcelona, Spain • 3 hours ago</p>
                    </div>
                  </div>
                  <button className="text-red-400 hover:text-red-300 p-2"><X size={16} /></button>
                </div>
                <button
                  onClick={handleSignOutAll}
                  className="w-full mt-4 py-3 border border-red-500/20 text-red-400 font-bold text-sm rounded-xl hover:bg-red-500/10 transition-colors"
                >
                  Sign Out All Other Sessions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Notifications Tab ── */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#1A2160]">
                <h2 className="text-white font-bold flex items-center gap-2">
                  <Bell size={16} className="text-cyan-400" /> Email Notifications
                </h2>
              </div>
              <div className="divide-y divide-[#1A2160]">
                {[
                  { key: "email_new_applications", title: "New Player Applications", desc: "Get notified when players apply to your events" },
                  { key: "email_event_updates", title: "Event Registration Updates", desc: "Receive updates about event registrations" },
                  { key: "email_scout_inquiries", title: "Scout Inquiries", desc: "Know when scouts contact you or view your events" },
                  { key: "email_messages", title: "Message Notifications", desc: "Get notified about new messages" },
                  { key: "email_payment_confirmations", title: "Payment Confirmations", desc: "Receive payment and transaction confirmations" },
                  { key: "email_event_reminders", title: "Event Reminders", desc: "Reminders about upcoming events" },
                  { key: "email_monthly_reports", title: "Monthly Reports", desc: "Receive monthly performance and analytics reports" },
                  { key: "email_platform_updates", title: "Platform Updates", desc: "Stay informed about new features and updates" },
                  { key: "email_marketing", title: "Marketing Communications", desc: "Promotional offers and tips" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-200">{item.title}</h3>
                      <p className="text-[11px] text-[#5B6397] mt-1">{item.desc}</p>
                    </div>
                    <ToggleSwitch checked={!!notif[item.key]} onChange={() => handleNotifToggle(item.key)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#1A2160]">
                <h2 className="text-white font-bold flex items-center gap-2">
                  <Bell size={16} className="text-cyan-400" /> Push Notifications
                </h2>
              </div>
              <div className="divide-y divide-[#1A2160]">
                {[
                  { key: "push_instant_messages", title: "Instant Messages", desc: "Real-time notifications for new messages" },
                  { key: "push_application_alerts", title: "Application Alerts", desc: "Immediate alerts for new applications" },
                  { key: "push_event_updates", title: "Event Updates", desc: "Updates about your events" },
                  { key: "push_system_alerts", title: "System Alerts", desc: "Important system and security notifications" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-200">{item.title}</h3>
                      <p className="text-[11px] text-[#5B6397] mt-1">{item.desc}</p>
                    </div>
                    <ToggleSwitch checked={!!notif[item.key]} onChange={() => handleNotifToggle(item.key)} />
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#1A2160]">
                <h2 className="text-white font-bold flex items-center gap-2">
                  <Bell size={16} className="text-cyan-400" /> SMS Notifications
                </h2>
              </div>
              <div className="divide-y divide-[#1A2160]">
                {[
                  { key: "sms_security_alerts", title: "Security Alerts", desc: "Critical security notifications" },
                  { key: "sms_login_verification", title: "Login Verification", desc: "Two-factor authentication codes" },
                  { key: "sms_event_reminders", title: "Event Reminders", desc: "SMS reminders for your events" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-200">{item.title}</h3>
                      <p className="text-[11px] text-[#5B6397] mt-1">{item.desc}</p>
                    </div>
                    <ToggleSwitch checked={!!notif[item.key]} onChange={() => handleNotifToggle(item.key)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-6">
              <h2 className="text-white font-bold flex items-center gap-2 mb-2">
                <Clock size={16} className="text-cyan-400" /> Quiet Hours
              </h2>
              <p className="text-[11px] text-[#5B6397] mb-6">Set times when you don't want to receive non-urgent notifications</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Start Time</label>
                  <input
                    type="time"
                    value={notif.quiet_hours_start}
                    onChange={(e) => {
                      setNotif({ ...notif, quiet_hours_start: e.target.value });
                    }}
                    onBlur={() => handleNotifToggle("quiet_hours_start")} // fake trigger to save
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">End Time</label>
                  <input
                    type="time"
                    value={notif.quiet_hours_end}
                    onChange={(e) => {
                      setNotif({ ...notif, quiet_hours_end: e.target.value });
                    }}
                    onBlur={() => handleNotifToggle("quiet_hours_end")} // fake trigger to save
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── Preferences Tab ── */}
        {activeTab === "preferences" && (
          <div className="space-y-6">
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-6">
              <h2 className="text-white font-bold flex items-center gap-2 mb-6">
                <Globe size={16} className="text-cyan-400" /> Language & Region
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Platform Language</label>
                  <select
                    value={general.platform_language}
                    onChange={(e) => handleGeneralChange("platform_language", e.target.value)}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option>English (UK)</option>
                    <option>English (US)</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Time Zone</label>
                  <select
                    value={general.time_zone}
                    onChange={(e) => handleGeneralChange("time_zone", e.target.value)}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option>GMT+1 (Madrid, Barcelona)</option>
                    <option>GMT (London)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Date Format</label>
                  <select
                    value={general.date_format}
                    onChange={(e) => handleGeneralChange("date_format", e.target.value)}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Currency</label>
                  <select
                    value={general.currency}
                    onChange={(e) => handleGeneralChange("currency", e.target.value)}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="EUR">€ EUR</option>
                    <option value="USD">$ USD</option>
                    <option value="GBP">£ GBP</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-6">
              <h2 className="text-white font-bold mb-6">Event Preferences</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Default Event Duration</label>
                  <select
                    value={general.default_event_duration}
                    onChange={(e) => handleGeneralChange("default_event_duration", e.target.value)}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-[#5B6397] font-bold mb-1.5 block">Auto-approve Applications</label>
                  <select
                    value={general.auto_approve_applications}
                    onChange={(e) => handleGeneralChange("auto_approve_applications", e.target.value)}
                    className="w-full bg-[#070B24] border border-[#1A2160] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option>Manual approval</option>
                    <option>Auto-approve all</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#070B24] border border-[#1A2160] rounded-lg mt-2">
                  <div>
                    <h3 className="text-sm font-semibold">Send Confirmation Emails</h3>
                    <p className="text-[11px] text-[#5B6397] mt-1">Automatically send confirmation to applicants</p>
                  </div>
                  <ToggleSwitch
                    checked={!!general.send_confirmation_emails}
                    onChange={() => handleGeneralChange("send_confirmation_emails", !general.send_confirmation_emails)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClubSettingsPage;
