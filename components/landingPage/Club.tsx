"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@/redux/hooks';

const clubs = [
  {
    name: "Arsenal",
    league: "EPL",
    team: "Arsenal",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  },
  {
    name: "Benfica FC",
    league: "Liga Portugal",
    team: "Benfica",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg",
  },
  {
    name: "Atlético de Madrid",
    league: "La Liga",
    team: "Atlético de Madrid",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  },
  {
    name: "Porto",
    league: "Liga Portugal",
    team: "Porto",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg",
  },
  {
    name: "Chelsea",
    league: "EPL",
    team: "Chelsea",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  },
  {
    name: "Real Madrid",
    league: "La Liga",
    team: "Real Madrid",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  },
];

export default function Club() {
  const [activeTab, setActiveTab] = useState("clubs");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [mounted, setMounted] = useState(false);

  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update visibleCount based on screen width
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  if (!mounted) return null;

  // Make sure maxIndex is never negative
  const maxIndex = Math.max(clubs.length - visibleCount, 0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
  };

  // Always return an array
  const visibleClubs = clubs.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="py-16 bg-[#07142b] text-white">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-center mb-6 text-white">
          <div className="flex bg-navy-800 rounded-lg overflow-hidden border border-[#1D1445] px-2">
            <button
              onClick={() => setActiveTab("clubs")}
              className={`px-6 py-2 text-sm font-medium transition-colors  ${
                activeTab === "clubs"
                  ? "bg-navy-700 text-white border-b-2 rounded-md border-[#1D1445] m-2"
                  : "text-white hover:text-foreground"
              }`}
            >
              Clubs
            </button>
            <button
              onClick={() => setActiveTab("academies")}
              className={`px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === "academies"
                  ? "bg-navy-700 text-white border-b border-[#1D1445] m-2  rounded-md"
                  : "text-white hover:text-foreground"
              }`}
            >
              Academies
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-landing mb-10">
          Connect with top clubs and academies from around the world.
        </p>

        {/* Carousel */}
        <div className="relative flex items-center">
          {maxIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-10 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-white transition-colors bg-slate-900 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="flex gap-4 justify-center mx-4 w-full overflow-hidden">
            {visibleClubs.map((club, i) => (
              <div
                key={i}
                className="flex-1 min-w-[150px] sm:min-w-[180px] bg-[#12143A] md:min-w-[220px] bg-navy-800 rounded-xl p-4 sm:p-6 text-center transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="font-display text-cyan text-sm mb-1">
                  {club.name}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {club.league} • {club.team}
                </p>
              </div>
            ))}
          </div>

          {maxIndex > 0 && (
            <button
              onClick={nextSlide}
              className="absolute right-10 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-white transition-colors bg-slate-900 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <button className="px-8 py-2 border border-purple-700 rounded-full text-foreground hover:bg-purple/10 transition-colors flex items-center gap-2 text-white ">
            View All Clubs <Lock size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
