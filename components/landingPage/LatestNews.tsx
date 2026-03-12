"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

import SectionTitel from "@/components/reuseable/SectionTitel";
import { useAppSelector } from "@/redux/hooks";
import { Lock } from "lucide-react";
import HomeButton from "../reuseable/HomeButton";

export default function LatestNews() {
  const theme = useAppSelector((state) => state.theme);
  const router = useRouter();

  const handleViewAllNews = () => {
    router.push("/view-all-news");
  };

  return (
    <div className="  bg-[#07142b] text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-9">
          <SectionTitel
        
          title="LATEST NEWS"
          subtitle="Stay updated with training tips, nutrition advice, and gear reviews."
          
        />
        </div>

        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* TEXT CONTENT */}
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col h-full justify-between"
              style={{
                backgroundColor: theme.colors.backgroundCard,
              }}
            >
              {/* TOP INFO */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-landing-number text-white text-sm uppercase tracking-wider">
                  Training
                </span>
                <span className="text-landing-number text-white font-medium text-sm">
                  3 min read
                </span>
              </div>

              {/* MAIN TEXT BELOW */}
              <div className="">
                <h2 className="text-xl font-bold mb-2 text-white leading-tight">
                  Top 7 Football Boots for Speed and Control in 2025
                </h2>

                <p className="text-gray-400 mb-2 text-sm leading-relaxed">
                  Compare the best boots trusted by rising stars and pros alike.
                </p>

                {/* BUTTON */}
                <button className="text-sm transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative w-full h-48 md:h-80 lg:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/images/event-banner.jpg"
                alt="Young football player on field"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center mt-10">
            <button className="px-8 py-2 border border-purple-700 rounded-full text-foreground hover:bg-purple/10 transition-colors flex items-center gap-2 text-white ">
              View All Clubs <Lock size={14} />
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
}
