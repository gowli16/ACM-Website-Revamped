import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { label: "SIGs", href: "/sigs/ai" },
  { label: "Events", href: "/events" },
  { label: "Achievements", href: "/achievements" },
  { label: "Core", href: "/core" },
  { label: "Alumni", href: "/alumni" },
  { label: "Faculty", href: "/faculty" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        /* Prevent duplicate headers if rendered in both _app.js and page */
        header.acm-main-header ~ header.acm-main-header {
          display: none !important;
        }
        /* Kill any pseudo-element text duplication from globals.css */
        header.acm-main-header nav a::before,
        header.acm-main-header nav a::after {
          content: none !important;
          display: none !important;
        }
      `}</style>

      <header
        className="acm-main-header fixed top-0 left-0 right-0 z-[1000] bg-transparent border-0 shadow-none"
        style={{
          backgroundColor: "transparent",
          background: "transparent",
          backdropFilter: "none",
          borderBottom: "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between bg-transparent">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center h-full py-2 focus:outline-none bg-transparent"
            aria-label="ACM Amritapuri home"
          >
            <div className="relative h-[95px] w-auto flex items-center bg-transparent">
              <Image
                src="/Logo.png"
                alt="ACM Logo"
                width={400}
                height={120}
                priority
                className="h-[95px] w-auto object-contain filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none bg-transparent"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            <span className={`w-6 h-0.5 bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {/* NAVIGATION LINKS */}
          <nav
            className={`absolute md:relative top-32 md:top-0 left-0 right-0 bg-black/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b md:border-0 border-white/10 p-6 md:p-0 flex flex-col md:flex-row items-center gap-2 md:gap-4 transition-all duration-300 ${
              open ? "flex" : "hidden md:flex"
            }`}
            style={{ backgroundColor: open ? "rgba(6, 6, 10, 0.92)" : "transparent" }}
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <Link
                className={`px-4 py-2.5 rounded-full text-base md:text-lg font-medium transition-all outline-none focus:outline-none focus:ring-0 active:outline-none ${
                  (link.href === "/sigs/ai"
                    ? router.pathname === "/sigs/[sig]" || router.pathname === "/sigs/ai"
                    : router.pathname === link.href)
                    ? "bg-[#1993C6] text-white font-semibold"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
                style={{ textShadow: "none" }}
                href={link.href}
                key={link.label}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}