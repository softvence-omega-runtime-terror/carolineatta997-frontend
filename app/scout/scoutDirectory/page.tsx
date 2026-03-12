"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, MessageSquare, ChevronDown } from "lucide-react";

const fakeScouts = [
  {
    id: 1,
    name: "Roberto Martinez",
    title: "Senior Scout - Youth Development",
    location: "Spain, Portugal",
    specializations: ["Youth Scouting", "Technical Analysis"],
    experience: 15,
    connections: 234,
    country: "Spain",
    region: "Europe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    title: "International Scout",
    location: "England, Germany, France",
    specializations: ["International Scouting", "Position-based"],
    experience: 12,
    connections: 189,
    country: "England",
    region: "Europe",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Carlos Mendes",
    title: "South American Scout",
    location: "Brazil, Argentina, Uruguay",
    specializations: ["Youth Scouting", "Talent ID"],
    experience: 10,
    connections: 156,
    country: "Brazil",
    region: "South America",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    name: "Emma Thompson",
    title: "European Scout Network",
    location: "Netherlands, Belgium, Scandinavia",
    specializations: ["International Scouting", "Youth Development"],
    experience: 8,
    connections: 142,
    country: "Netherlands",
    region: "Europe",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 5,
    name: "Ahmed Al-Rashid",
    title: "Middle East & Africa Scout",
    location: "UAE, Egypt, Nigeria",
    specializations: ["Youth Scouting", "Technical Analysis"],
    experience: 11,
    connections: 167,
    country: "UAE",
    region: "Middle East & Africa",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 6,
    name: "Lisa Chen",
    title: "Asian Football Scout",
    location: "China, Japan, South Korea",
    specializations: ["Youth Scouting", "Technical Analysis"],
    experience: 9,
    connections: 128,
    country: "Japan",
    region: "Asia",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
];

const COUNTRIES = ["All Countries", "Spain", "England", "Brazil", "Netherlands", "UAE", "Japan"];
const REGIONS = ["All Regions", "Europe", "South America", "Asia", "Middle East & Africa"];
const SPECS = ["All Specializations", "Youth Scouting", "Technical Analysis", "International Scouting", "Talent ID", "Position-based", "Youth Development"];

interface FilterSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

const FilterSelect = ({ value, onChange, options }: FilterSelectProps) => (
  <div className="relative w-full">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none bg-[#0B0D2C] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5FF] transition-colors cursor-pointer pr-10"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#0B0D2C]">
          {o}
        </option>
      ))}
    </select>
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
      <ChevronDown size={16} />
    </span>
  </div>
);

export default function ScoutDirectoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const scoutsPerPage = 6;

  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [specFilter, setSpecFilter] = useState("All Specializations");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredScouts = fakeScouts.filter((scout) => {
    const matchSearch =
      scout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scout.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCountry = countryFilter === "All Countries" || scout.country === countryFilter;
    const matchRegion = regionFilter === "All Regions" || scout.region === regionFilter;
    const matchSpec =
      specFilter === "All Specializations" ||
      scout.specializations.includes(specFilter);
    return matchSearch && matchCountry && matchRegion && matchSpec;
  });

  const indexOfLast = currentPage * scoutsPerPage;
  const indexOfFirst = indexOfLast - scoutsPerPage;
  const currentScouts = filteredScouts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredScouts.length / scoutsPerPage);

  const handleReset = () => {
    setCountryFilter("All Countries");
    setRegionFilter("All Regions");
    setSpecFilter("All Specializations");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white font-sans p-6 md:p-8">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent inline-block">
          Scout Directory
        </h1>
      </div>

      {/* Search Filters */}
      <div className="bg-[#12143A] border border-[#04B5A3]/30 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Search Filters</h2>
          <button
            onClick={handleReset}
            className="text-sm font-medium text-[#00E5FF] border border-[#00E5FF]/40 rounded-lg px-4 py-2 hover:bg-[#00E5FF]/10 transition-colors"
          >
            Reset Filters
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <FilterSelect value={countryFilter} onChange={setCountryFilter} options={COUNTRIES} />
          <FilterSelect value={regionFilter} onChange={setRegionFilter} options={REGIONS} />
          <FilterSelect value={specFilter} onChange={setSpecFilter} options={SPECS} />

          {/* Search input */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search ..."
              className="w-full bg-[#0B0D2C] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Scouts Grid */}
      {currentScouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#12143A] border border-white/[0.08] rounded-xl">
          <p className="text-base font-semibold text-white mb-2">No scouts found</p>
          <p className="text-sm text-white/50 mb-5">Try adjusting your filters</p>
          <button
            onClick={handleReset}
            className="text-sm text-[#00E5FF] border border-[#00E5FF]/40 rounded-lg px-5 py-2 hover:bg-[#00E5FF]/10 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentScouts.map((scout) => (
            <div
              key={scout.id}
              className="bg-[#12143A] border border-[#04B5A3]/30  rounded-xl p-6 flex flex-col  transition-all duration-200"
            >
              {/* Header Box (Avatar + Info) */}
              <div className="flex items-start gap-4 mb-5">
                <img
                  src={scout.image}
                  alt={scout.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="text-base font-medium text-white">{scout.name}</h3>
                  <p className="text-xs text-white/60 mb-2">{scout.title}</p>
                  <p className="text-xs text-[#00E5FF] flex items-center gap-1.5 font-medium">
                    <MapPin size={12} /> {scout.location}
                  </p>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-6">
                <p className="text-xs text-white/50 mb-3">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {scout.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-[#00E5FF] bg-white/[0.04] px-3 py-1.5 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience and Connections Grid */}
              <div className="flex items-center justify-between mt-auto mb-6">
                <div>
                  <p className="text-xs text-white/50 mb-1">Experience</p>
                  <p className="text-sm text-white font-medium">{scout.experience} years</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-1">Connections</p>
                  <p className="text-sm text-white font-medium">{scout.connections}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/scout/scoutDirectory/${scout.id}`}
                  className="flex-1 py-2.5 rounded-lg bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-black text-sm font-semibold transition-all duration-200 text-center"
                >
                  View Profile
                </Link>
                <button className="w-[42px] h-[42px] rounded-lg border border-white/[0.08] flex items-center justify-center hover:bg-white/5 transition-colors flex-shrink-0">
                  <MessageSquare size={18} className="text-[#00E5FF]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-lg border border-[#00E5FF]/40 text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-white/75">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-lg border border-[#00E5FF]/40 text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}