// components/scoutDashboard/profile/ProfileView.tsx
import {
  MapPin,
  Globe,
  Twitter,
  Facebook,
  Youtube,
  CheckCircle,
  Flag,
  Trophy,
  Calendar,
} from "lucide-react";
import { ScoutProfile } from "@/types/scout/profileType";

const Divider = () => <div className="h-px bg-[#1A2160] my-3" />;

const SLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5B6397] mb-2">
    {children}
  </p>
);

const StatPill = ({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) => (
  <div className="flex flex-col items-center bg-[#111640] border border-[#1A2160] rounded-lg py-2 px-1">
    <span className="text-white font-bold text-sm leading-none">{value}</span>
    <span className="text-[#5B6397] text-[8px] mt-1 text-center leading-tight">
      {label}
    </span>
  </div>
);

const fmtDate = (iso?: string) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
};

const urlHandle = (url?: string) =>
  url?.replace(/\/$/, "").split("/").pop() ?? url ?? "";

export default function ProfileView({ profile }: { profile: ScoutProfile }) {
  const stats = profile.dashboard_stats;
  const specialization = profile.specialization ?? [];

  return (
    <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl px-4 pb-4">
      {/* Cover */}
      <div className="relative h-[120px] rounded-xl overflow-hidden mb-4">
        {profile.cover_image ? (
          <img
            src={profile.cover_image}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0B2040] via-[#0A1530] to-[#070B24]" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#08092F] to-transparent" />
      </div>

      {/* Avatar + Name */}
      <div className="flex items-end gap-3 -mt-8 mb-3">
        <div className="relative w-[60px] h-[60px] rounded-full border-[3px] border-[#08092F] bg-[#111640] overflow-hidden flex-shrink-0">
          {profile.profile_image ? (
            <img
              src={profile.profile_image}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#2D3568]">
              {/* Placeholder icon if needed */}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 pb-1">
          <div className="flex items-center gap-1">
            <h2 className="text-[#00D9FF] font-bold text-sm truncate">
              {profile.first_name} {profile.last_name}
            </h2>
            <CheckCircle size={11} className="text-[#00D9FF] flex-shrink-0" />
          </div>
          {specialization.length > 0 && (
            <p className="text-[#5B6397] text-[9px] truncate">
              {specialization.join(" · ")}
            </p>
          )}
          <div className="flex flex-wrap gap-x-2 mt-0.5">
            {profile.location && (
              <span className="flex items-center gap-0.5 text-[#5B6397] text-[9px]">
                <MapPin size={8} /> {profile.location}
              </span>
            )}
            {profile.joined && (
              <span className="flex items-center gap-0.5 text-[#5B6397] text-[9px]">
                <Calendar size={8} /> {fmtDate(profile.joined)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        <StatPill value={profile.connections ?? 0} label="Conn." />
        <StatPill value={stats?.players_viewed ?? 0} label="Viewed" />
        <StatPill value={stats?.shortlisted_players ?? 0} label="Listed" />
        <StatPill value={profile.experience_years ?? 0} label="Yrs Exp." />
      </div>

      <Divider />

      {/* About + Contact */}
      <div className="flex gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <SLabel>About</SLabel>
          <p className="text-[#8891BB] text-[10px] leading-relaxed line-clamp-4">
            {profile.about || profile.bio || (
              <span className="text-[#2D3568] italic">No bio added.</span>
            )}
          </p>
        </div>
        <div className="w-[90px] flex-shrink-0">
          <SLabel>Contact</SLabel>
          {[
            { icon: <Globe size={9} />, val: profile.website },
            { icon: <Twitter size={9} />, val: profile.twitter },
            { icon: <Facebook size={9} />, val: profile.facebook },
            { icon: <Youtube size={9} />, val: profile.youtube },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1 mb-1">
              <span className="text-[#00D9FF] flex-shrink-0">{s.icon}</span>
              <span className="text-[#5B6397] text-[9px] truncate">
                {s.val ? urlHandle(s.val) : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social links */}
      <div className="flex gap-1.5 mb-3">
        {[
          { icon: <Globe size={11} />, href: profile.website },
          { icon: <Twitter size={11} />, href: profile.twitter },
          { icon: <Facebook size={11} />, href: profile.facebook },
          { icon: <Youtube size={11} />, href: profile.youtube },
        ]
          .filter((s) => s.href)
          .map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-[#111640] border border-[#1A2160] flex items-center justify-center text-[#5B6397] hover:text-[#00D9FF] hover:border-[#00D9FF]/30 transition-all"
            >
              {s.icon}
            </a>
          ))}
      </div>

      <Divider />

      {/* Scouting Options */}
      {specialization.length > 0 && (
        <div className="mb-3">
          <SLabel>Scouting Options</SLabel>
          <div className="flex flex-wrap gap-1.5">
            {specialization.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded text-[9px] bg-[#111640] border border-[#1A2160] text-[#8891BB]"
              >
                {tag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      <Divider />

      {/* Notable Observations */}
      <div className="mb-3">
        <SLabel>Notable Observations</SLabel>
        {[
          { label: "Availability", value: profile.availability },
          { label: "Contact Status", value: profile.contact_status },
          { label: "Pref. Leagues", value: profile.preferred_leagues },
          { label: "Visibility", value: profile.profile_visibility },
        ]
          .filter((r) => r.value)
          .map((r) => (
            <div key={r.label} className="flex justify-between gap-2 mb-1.5">
              <span className="text-[#5B6397] text-[9px]">{r.label}</span>
              <span className="text-[#00D9FF] text-[9px] font-medium text-right truncate max-w-[120px]">
                {r.value}
              </span>
            </div>
          ))}
      </div>

      <Divider />

      {/* Scouting Region */}
      <div className="mb-3">
        <SLabel>Scouting Region</SLabel>
        {profile.preferred_leagues ? (
          profile.preferred_leagues
            .split(",")
            .map((r, i) => (
              <div key={i} className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded bg-[#111640] border border-[#1A2160] flex items-center justify-center flex-shrink-0">
                  <Flag size={9} className="text-[#5B6397]" />
                </div>
                <span className="text-[#8891BB] text-[10px]">{r.trim()}</span>
              </div>
            ))
        ) : (
          <p className="text-[#2D3568] text-[9px] italic">No regions set.</p>
        )}
      </div>

      <Divider />

      {/* Professional History */}
      <div>
        <SLabel>Professional History</SLabel>
        {profile.achievements?.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {profile.achievements.map((ach) => (
              <div key={ach.id} className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#111640] border border-[#1A2160] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy size={11} className="text-[#00D9FF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-white text-[11px] font-semibold truncate">
                      {ach.club_name}
                    </p>
                    <span className="text-[#3A4580] text-[8px] flex-shrink-0">
                      {ach.year}
                    </span>
                  </div>
                  <p className="text-[#5B6397] text-[9px] truncate">
                    {ach.achievement}
                  </p>
                  <p className="text-[#2D3568] text-[8px] truncate">
                    {ach.affiliation_type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#2D3568] text-[9px] italic">No history added.</p>
        )}
      </div>
    </div>
  );
}