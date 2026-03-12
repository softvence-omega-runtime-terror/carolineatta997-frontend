"use client";

import { Lock, Clock, MapPin, Users, Mail, Phone } from "lucide-react";

import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import SectionTitel from "../reuseable/SectionTitel";
import Link from "next/link";

export default function UpcomingEvent() {
  const theme = useAppSelector((state) => state.theme);
  const events = [
    {
      id: 1,
      category: "Training",
      categoryColor: "text-[#06A295]",
      date: "10 sept 2025",
      dateColor: "text-[#06A295]",
      title: "Youth Championship Finals",
      time: "14:00",
      location: "Wembley Stadium, London",
      capacity: "50",
      email: "johndue@gmail.com",
      phone: "24966-7486",
    },
    {
      id: 2,
      category: "Nutrition",
      categoryColor: "text-yellow-500",
      date: "18 sept 2025",
      dateColor: "text-[#06A295]",
      title: "Premier League Trials",
      time: "08:30",
      location: "Manchester, UK",
      capacity: "50",
      email: "davidbackham@gmail.com",
      phone: "685699-5654",
    },
  ];

  return (
    <div className="py-16 bg-[#07142b] text-white">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="text-center mb-9">
          <SectionTitel
        
          title="LATEST NEWS"
          subtitle="Stay updated with training tips, nutrition advice, and gear reviews."
          
        />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              className=" rounded-2xl p-8 "
              style={{
                backgroundColor: theme.colors.backgroundCard,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`${event.categoryColor} font-semibold text-sm uppercase tracking-wider`}
                >
                  {event.category}
                </span>
                <span className={`${event.dateColor} font-medium text-sm`}>
                  {event.date}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-bold mb-8 text-white leading-tight">
                {event.title}
              </h2>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Clock
                    className="w-5 h-5 text-cyan-400 flex-shrink-0"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <span className=" text-[#06A295]">{event.time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin
                    className="w-5 h-5 text-cyan-400 flex-shrink-0"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <span className="text-[#06A295]">{event.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users
                    className="w-5 h-5 text-cyan-400 flex-shrink-0"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <span className="text-[#06A295]">{event.capacity}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-gray-400 font-semibold mb-4">
                  Contact information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail
                      className="w-4 h-4 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295] text-sm">
                      {event.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone
                      className="w-4 h-4 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295] text-sm">
                      {event.phone}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="common"
                className="w-full  text-white font-semibold py-3 rounded-md transition-colors duration-200"
              >
                See more details
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="flex justify-center mt-10">
            <button className="px-8 py-2 border border-purple-700 rounded-full text-foreground hover:bg-purple/10 transition-colors flex items-center gap-2 text-white ">
              View All Clubs <Lock size={14} />
            </button>
          </div>
        </div>

        {/*  go pro*/}
        <div className="min-h-screen flex items-center justify-center p-6 ">
          <div
            className="
          w-full max-w-md 
          bg-gradient-to-br from-[#00E5FF]/20 via-[#00E5FF]/5 to-[#9C27B0]/30 
           p-8 
          border border-indigo-500/20 
          shadow-2xl shadow-indigo-950/40 rounded-xl
        "
          >
            <div className="bg-[#171D36]/90 p-8">
              {/* Header */}
              <div className="  gap-4 mb-6">
                <div className="flex justify-center mb-3">
                  <div
                    className="
              w-12 h-12 rounded-xl 
              bg-gradient-to-br from-indigo-500 to-purple-600 
              flex items-center justify-center 
              text-2xl font-black text-white 
              shadow-lg
            "
                  >
                    ♔
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-6  pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent text-center ">
                  GO PRO
                </h2>
              </div>

              {/* Subtitle */}
              <div className="text-center">
                <p className="text-[#7FB6B6] text-base leading-relaxed mb-8 font-bold">
                  Unlock premium features and accelerate your football career
                  with NextGen Pro membership
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10 text-[#7FB6B6] text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>Exclusive scout network access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>Refined direct messaging system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>Exclusive scout & agent network access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>
                    Newsletter with pre-season training content and priority
                    event access
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>
                    Full access to all events with direct contact options
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>
                    Enhanced player profile creation with photos & videos to get
                    noticed by clubs
                  </span>
                </li>
              </ul>

              {/* Pricing */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-baseline text-[#9CFFF0]">
                  <span className="text-4xl font-black ">$</span>
                  <span className="text-5xl font-black tracking-tight">
                    9.99
                  </span>
                  <span className="text-xl font-bold ml-2">/year</span>
                </div>

                <div className="bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] text-white text-xs font-bold px-4 py-3 rounded-lg uppercase tracking-wide">
                  Save 50%
                </div>
              </div>

              <p className="text-[#7FB6B6] text-sm text-center mb-8">
                (introductory offer — usually $19.99/year)
              </p>

              {/* CTA Button */}
              <div className="flex justify-center">
                <Link href={"/login"} className="text-center bg-[#00F6FF] text-black px-3 py-2 font-bold rounded-full">
                  Sign Up
                </Link>
              </div>

              {/* Promo link */}
              <p className="text-center mt-6 text-[#7FB6B6] hover:text-blue-300 text-sm cursor-pointer transition-colors">
                Have a promo code?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
