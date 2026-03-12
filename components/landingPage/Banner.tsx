"use client";

import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Banner = () => {
  const theme = useAppSelector((state) => state.theme);

  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
      })
        .from(
          textRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4",
        )
        .from(
          btnRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3",
        );
    });

    return () => ctx.revert(); // clean up animation context
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center ">
      {/* Background Image with Enhanced Overlay for Better Readability */}
      <div className="absolute inset-0 ">
        <Image
          src="/images/banner.png"
          alt="Stadium Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <div className="flex items-center">
          <Image
            src="/images/banner-log.png"
            alt="NextGen Pros Logo"
            width={200}
            height={200}
            priority
          />
        </div>
        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-black tracking-tight mb-4 md:mb-6 uppercase leading-tight text-white drop-shadow-lg"
        >
          <span style={{ color: theme.colors.primaryCyan }}>LEVEL UP </span>
          <span style={{ color: theme.colors.primaryMagenta }}>YOUR PLAY</span>
        </h1>

        {/* Subtitle/Description */}
        <p
          ref={textRef}
          className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 px-4 drop-shadow"
        >
          Connect with top clubs, showcase your skills, and accelerate your
          football joumey. The future of youth football scouting starts here.
        </p>

        {/* Buttons */}
        <div
          ref={btnRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
        >
          <button className="w-full sm:w-auto px-8 py-3 bg-[#00E5FF] hover:bg-[#00cce6] text-black font-bold rounded-full text-base md:text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#00E5FF]/20">
            Start Free Trial
          </button>
          <div className="relative w-full sm:w-auto rounded-full ">
            <button className="w-full  text-white font-bold rounded-full px-7 py-3 border border-[#9C27B0] text-base md:text-lg transition-all transform hover:scale-105">
              Join Community
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050B14] to-transparent" />
    </section>
  );
};

export default Banner;
