"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  Users,
  Eye,
  Star,
  MessageSquare,
  Trophy,
  Globe,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  Award,
  Target,
  Briefcase,
  Languages,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Building2,
  ChevronLeft,
} from "lucide-react";

const fakeScouts = [
  {
    id: 1,
    name: "Roberto Martinez",
    title: "Senior Scout - Youth Development",
    location: "Madrid, Spain",
    joined: "January 2020",
    email: "rmartinez@nextgenpros.com",
    phone: "+34 770 900 000",
    website: "www.rmartinezscout.com",
    connections: 234,
    experience: 25,
    playersScouted: "1,200+",
    recommended: 145,
    proPlacements: 89,
    clubsWorkedWith: 25,
    successRate: "61%",
    bio: "Highly experienced and dedicated professional football scout with over 20 years in talent identification and player development. Specialize in meticulous attention to detail, strong networking capabilities, and an exceptional eye for raw talent. Known for discovering numerous players who have gone on to play at the highest levels of European football.",
    specializations: [
      "Youth Scouting",
      "Technical Analysis",
      "Player Development",
      "International Scouting",
    ],
    languages: ["English", "Spanish", "French", "Portuguese", "German"],
    scoutingRegions: [
      { country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", years: 20, coverage: "Full coverage" },
      { country: "Spain", flag: "🇪🇸", years: 15, coverage: "Full coverage" },
      { country: "Germany", flag: "🇩🇪", years: 12, coverage: "Partial coverage" },
      { country: "France", flag: "🇫🇷", years: 18, coverage: "Full coverage" },
      { country: "Portugal", flag: "🇵🇹", years: 10, coverage: "Full coverage" },
    ],
    notableDiscoveries: [
      {
        name: "Carlos Fernandez",
        position: "Midfielder",
        club: "Real Madrid",
        discovered: "2018",
      },
      {
        name: "Lucas Silva",
        position: "Forward",
        club: "Barcelona",
        discovered: "2019",
      },
      {
        name: "Miguel Torres",
        position: "Defender",
        club: "Atletico Madrid",
        discovered: "2020",
      },
      {
        name: "James Wilson",
        position: "Midfielder",
        club: "Manchester United",
        discovered: "2021",
      },
      {
        name: "Pierre Dubois",
        position: "Forward",
        club: "PSG",
        discovered: "2022",
      },
    ],
    professionalHistory: [
      {
        club: "Manchester United Youth Academy",
        role: "Senior Scout",
        duration: "2021 - Present",
        current: true,
      },
      {
        club: "Liverpool FC",
        role: "Youth Development Scout",
        duration: "2018 - 2021",
        current: false,
      },
      {
        club: "England U-18 National Team",
        role: "Talent Scout",
        duration: "2015 - 2018",
        current: false,
      },
      {
        club: "City Football Academy",
        role: "Regional Scout",
        duration: "2012 - 2015",
        current: false,
      },
      {
        club: "Chelsea FC Academy",
        role: "Junior Scout",
        duration: "2008 - 2012",
        current: false,
      },
    ],
    achievements: [
      "Scout of the Year - Premier League Youth Development 2024",
      "Discovered 5 players who went on to represent national teams",
      "Successfully identified talent for 20+ professional clubs",
      "Top 10 Most Influential Scouts in Europe - 2023",
      "Excellence in Youth Development Award - 2022",
    ],
    social: [
      { platform: "Instagram", handle: "@rmartinez_scout", icon: Instagram },
      { platform: "Twitter", handle: "@MTThompsonScout", icon: Twitter },
      { platform: "Facebook", handle: "Michael Thompson", icon: MessageSquare },
      { platform: "YouTube", handle: "MT Scouting Analysis", icon: Youtube },
    ],
    clubAffiliations: [
      "Manchester United Youth Academy",
      "Liverpool FC",
      "Real Madrid Academy",
      "Barcelona La Masia",
      "Chelsea FC Academy",
    ],
  },
];

/* ─── Shared Components ────────────────────────────────────────── */
const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-5 mb-5">
    <h3 className="text-sm font-bold bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent mb-5 uppercase tracking-wide">
      {title}
    </h3>
    {children}
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent mb-5">
    {title}
  </h2>
);

/* ─── Main Component ─────────────────────────────────────────── */
export default function ScoutProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const scout = fakeScouts.find((s) => s.id === Number(id)) || fakeScouts[0];
  if (!scout) return notFound();

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white font-sans pb-12">
      {/* ── Banner & Hero ── */}
      <div className="relative h-[280px] w-full">
        {/* Stadium Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-[#0B0D2C]/60" />
        </div>

        {/* Back Button */}
        <div className="relative z-10 p-6">
          <Link
            href="/scout/scoutDirectory"
            className="flex items-center gap-2 bg-[#0B0D2C]/80 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#0B0D2C] transition-colors w-fit"
          >
            <ChevronLeft size={16} /> Back to Directory
          </Link>
        </div>

        {/* Floating Profile Card */}
        <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[90%] md:w-[800px] z-20">
          <div className="bg-[#12143C] border border-white/[0.08] rounded-3xl p-7 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full border-4 border-white/10 overflow-hidden flex-shrink-0">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt={scout.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                <span className="text-[#00E5FF]">{scout.name.split(" ")[0]} </span>
                <span className="text-[#9C27B0]">{scout.name.split(" ")[1]}</span>
              </h1>
              <p className="text-sm text-white/50 mb-6">{scout.title}</p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <MapPin size={16} className="text-[#00E5FF]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase">Location</p>
                    <p className="text-xs font-semibold">{scout.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <CalendarDays size={16} className="text-[#00E5FF]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase">Joined</p>
                    <p className="text-xs font-semibold">{scout.joined}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <Users size={16} className="text-[#00E5FF]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase">Connections</p>
                    <p className="text-xs font-semibold">{scout.connections}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <Trophy size={16} className="text-[#00E5FF]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase">Experience</p>
                    <p className="text-xs font-semibold">{scout.experience} years</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 px-6 bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-black font-bold rounded-xl text-sm transition-all">
                  Send Message
                </button>
                <button className="flex-1 py-3 px-6 border border-[#233566] hover:bg-white/5 text-white/80 font-semibold rounded-xl text-sm transition-all">
                  Add to Network
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Spacer for Hero ── */}
      <div className="h-[200px]" />

      {/* ── Stats Card Bar ── */}
      <section className="px-6 max-w-7xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Players Viewed", val: 342, sub: "+48 this week", icon: Eye },
          { label: "Shortlisted Players", val: 28, sub: "12 active", icon: Star },
          { label: "Upcoming Events", val: 6, sub: "Next: Sep 15", icon: CalendarDays },
          { label: "Active Conversations", val: 15, sub: "5 unread", icon: MessageSquare },
        ].map((s) => (
          <div key={s.label} className="bg-[#12143A] border border-white/[0.08] rounded-xl p-5">
            <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center mb-4 text-[#00E5FF]">
              <s.icon size={18} />
            </div>
            <p className="text-xs text-white/50 mb-1">{s.label}</p>
            <p className="text-2xl font-bold mb-1">{s.val}</p>
            <p className="text-[10px] text-[#00D4AA]">{s.sub}</p>
          </div>
        ))}
      </section>

      {/* ── Layout Grid ── */}
      <div className="px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About */}
          <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
            <SectionTitle title="About" />
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {scout.bio}
            </p>
            <div>
              <p className="text-xs text-white/30 uppercase mb-3">Specializations</p>
              <div className="flex flex-wrap gap-2">
                {scout.specializations.map((spec) => (
                  <span key={spec} className="px-3 py-1.5 bg-[#00E5FF]/5 border border-[#00E5FF]/20 text-[#00E5FF] text-[11px] font-medium rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scouting Statistics */}
          <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
            <SectionTitle title="Scouting Statistics" />
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Players Scouted", val: "1,200+", icon: Eye },
                { label: "Recommended", val: "145", icon: Star },
                { label: "Pro Placements", val: "89", icon: Trophy },
              ].map((st) => (
                <div key={st.label} className="bg-[#0B0D2C] border border-white/[0.05] rounded-xl p-4">
                  <div className="text-[#00E5FF] mb-2"><st.icon size={16} /></div>
                  <p className="text-[10px] text-white/40 mb-1">{st.label}</p>
                  <p className="text-lg font-bold">{st.val}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Success Rate", val: "61%", icon: Target },
                { label: "Clubs worked with", val: "25", icon: Building2 },
              ].map((st) => (
                <div key={st.label} className="bg-[#0B0D2C] border border-white/[0.05] rounded-xl p-4">
                  <div className="text-[#00E5FF] mb-2"><st.icon size={16} /></div>
                  <p className="text-[10px] text-white/40 mb-1">{st.label}</p>
                  <p className="text-lg font-bold">{st.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notable Discoveries */}
          <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
            <SectionTitle title="Notable Discoveries" />
            <div className="space-y-4">
              {scout.notableDiscoveries.map((p) => (
                <div key={p.name} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{p.name}</p>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]/40 border border-[#00E5FF] shadow-[0_0_5px_rgba(0,229,255,0.5)]" />
                    </div>
                    <p className="text-xs text-white/30">{p.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#00E5FF]">{p.club}</p>
                    <p className="text-[10px] text-white/30">Discovered {p.discovered}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scouting Regions */}
          <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
            <SectionTitle title="Scouting Regions" />
            <div className="grid grid-cols-2 gap-4">
              {scout.scoutingRegions.map((r) => (
                <div key={r.country} className="bg-[#0B0D2C] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{r.flag}</span>
                    <div>
                      <p className="text-sm font-semibold">{r.country}</p>
                      <p className="text-[10px] text-white/30">{r.coverage}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[#00E5FF]">{r.years} years</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional History */}
          <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
            <SectionTitle title="Professional History" />
            <div className="space-y-6">
              {scout.professionalHistory.map((j) => (
                <div key={j.club} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0 text-[#00E5FF]">
                    <Building2 size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold">{j.club}</p>
                      {j.current && (
                        <span className="px-2 py-0.5 bg-[#00D4AA] text-black text-[10px] font-bold rounded-lg uppercase">Current</span>
                      )}
                    </div>
                    <p className="text-xs text-white/50">{j.role}</p>
                    <p className="text-[10px] text-[#00E5FF] mt-1">{j.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div>
          {/* Contact Info */}
          <SidebarSection title="Contact Information">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", val: scout.email },
                { icon: Phone, label: "Phone", val: scout.phone },
                { icon: Globe, label: "Website", val: scout.website, color: "text-[#00E5FF]" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                    <c.icon size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/30 uppercase">{c.label}</p>
                    <p className={`text-[11px] font-medium ${c.color || "text-white"}`}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </SidebarSection>

          {/* Social Media */}
          <SidebarSection title="Social Media">
            <div className="space-y-3">
              {scout.social.map((s) => (
                <div key={s.platform} className="flex items-center gap-3 bg-[#0B0D2C] border border-white/5 p-3 rounded-lg">
                  <s.icon size={14} className="text-[#00E5FF]" />
                  <p className="text-[11px] text-white/70">{s.handle}</p>
                </div>
              ))}
            </div>
          </SidebarSection>

          {/* Languages */}
          <SidebarSection title="Languages">
            <div className="flex flex-wrap gap-2">
              {scout.languages.map((l) => (
                <span key={l} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70">
                  {l}
                </span>
              ))}
            </div>
          </SidebarSection>

          {/* Club Affiliations */}
          <SidebarSection title="Club Affiliations">
            <div className="space-y-2">
              {scout.clubAffiliations.map((c) => (
                <div key={c} className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/60">
                  {c}
                </div>
              ))}
            </div>
          </SidebarSection>

          {/* Achievements */}
          <SidebarSection title="Achievements">
            <div className="space-y-4">
              {scout.achievements.map((a) => (
                <div key={a} className="flex items-start gap-3">
                  <div className="mt-1 text-[#00E5FF]"><Award size={14} /></div>
                  <p className="text-xs text-white/70 leading-relaxed font-normal">{a}</p>
                </div>
              ))}
            </div>
          </SidebarSection>

        </div>
      </div>

      <footer className="text-center py-10 text-white/20 text-[10px]">
        © 2025 NextGen Pros. All rights reserved.
      </footer>
    </div>
  );
}
