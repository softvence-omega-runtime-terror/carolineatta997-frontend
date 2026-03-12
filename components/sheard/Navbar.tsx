"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import gsap from "gsap";
import Link from "next/link";
import { logout } from "@/redux/features/auth/authSlice";
import { UserRole } from "@/types/auth";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Membership", href: "#" },
  { name: "Academies", href: "#" },
  { name: "Clubs", href: "#" },
  { name: "Players", href: "/player" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const getDashboardHref = (role?: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "/admin";
      case "PLAYER":
        return "/player";
      case "SCOUT_AGENT":
        return "/scout";
      case "CLUB_ACADEMY":
        return "/club";
      default:
        return "/";
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    });

    return () => ctx.revert(); // Cleanup for React 18 strict mode
  }, []);

  useEffect(() => {
    if (!userMenuOpen || !auth.user) return;

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (target && userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [userMenuOpen, auth.user]);

  return (
    <nav ref={navRef} className="fixed top-8 left-0 right-0 w-full z-50 ">
      <div className="container mx-auto px-4 lg:px-6 relative  bg-white/10 backdrop-blur-md rounded-xl">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="NextGen Pros Logo"
              width={70}
              height={40}
              className="w-[120px] lg:w-[150px] h-auto opacity-90 hover:opacity-100 transition-opacity"
              priority
            />
          </div>

          {/* Desktop Nav Links - Center */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#B0B0B0] hover:text-white transition-colors font-medium text-[15px] whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {auth.user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium"
                >
                  <span>
                    {auth.user.first_name} {auth.user.last_name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  role="menu"
                  className={`absolute right-0 mt-2 w-40 rounded-xl bg-[#050B14] border border-white/10 shadow-lg transition origin-top-right ${
                    userMenuOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link
                    href={getDashboardHref(auth.user?.role)}
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      dispatch(logout());
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="login" className="px-6"  >
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="login" className="px-6">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-[#00E5FF]/90 hover:bg-[#00cce6] transition-colors">
              <Globe className="w-4 h-4 text-black" />
              <span className="text-black font-medium text-sm">EN</span>
              <ChevronDown className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-7 rounded-xl border-t border-white/10 bg-blur backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-[#00E5FF] text-base font-medium py-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                {auth.user ? (
                  <>
                    <button
                      className="w-full px-4 py-3 rounded-md bg-white/10 text-white text-sm font-medium"
                    >
                      {auth.user.first_name} {auth.user.last_name}
                    </button>
                    <Link
                      href={getDashboardHref(auth.user?.role)}
                      className="w-full px-4 py-3 rounded-md bg-white/5 text-center text-sm text-gray-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="nav"
                      size="default"
                      className="w-full"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="nav" size="default" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        variant="navFilled"
                        size="default"
                        className="w-full"
                      >
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md bg-[#00E5FF]/90 hover:bg-[#00cce6] transition-colors">
                  <Globe className="w-4 h-4 text-black" />
                  <span className="text-black font-medium">English</span>
                  <ChevronDown className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
