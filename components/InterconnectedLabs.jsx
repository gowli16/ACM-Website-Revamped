import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Modern palette derived from the user's reference:
// - Deep Charcoal: #222222 / #2A2A2A
// - Signature Cerulean: #1993C6
// - Sky Blue: #38A1CE
// - Electric Cyan / Ocean: #00B4D8 (Web card changed from red)
// - Steel Blue: #1684B2
// Solid colors only - NO red, NO gradients.

const labs = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    text: "Intelligent systems, research, and ambitious experiments turned into real products.",
    borderClass: "border-[#1993C6]",
    tagClass: "bg-[#1E1E1E] text-[#1993C6] border-[#1993C6]/30",
    shadowClass: "shadow-[0_0_24px_rgba(25,147,198,0.22)]",
    tags: ["ML Models", "Vision", "Agents"],
    // Symmetrical 12 o'clock (Top) position with clean spacing
    desktopStyle: {
      left: "calc(50% - 175px)",
      top: "calc(50% - 280px)",
      width: "350px",
      height: "205px",
      zIndex: 20,
    },
    // Directional slow-motion entrance: glides from left
    motionInitial: { x: -350, opacity: 0 },
    motionInView: { x: 0, opacity: 1 },
    parallaxAxis: "y",
    isLeftEntry: true,
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    text: "Offensive and defensive security through CTFs, workshops, and hands-on challenges.",
    borderClass: "border-[#38A1CE]",
    tagClass: "bg-[#1E1E1E] text-[#38A1CE] border-[#38A1CE]/40",
    shadowClass: "shadow-[0_0_24px_rgba(56,161,206,0.25)]",
    tags: ["CTFs", "Web Security", "Labs"],
    // Symmetrical 3 o'clock (Right) position with clean spacing
    desktopStyle: {
      left: "calc(50% + 205px)",
      top: "calc(50% - 102.5px)",
      width: "350px",
      height: "205px",
      zIndex: 20,
    },
    // Directional slow-motion entrance: glides up from down
    motionInitial: { y: 350, opacity: 0 },
    motionInView: { y: 0, opacity: 1 },
    parallaxAxis: "x",
    isLeftEntry: false,
  },
  {
    id: "web",
    title: "Web & App",
    text: "Useful digital experiences built with modern tools and a product-first mindset.",
    borderClass: "border-[#00B4D8]", // Replaced red/maroon with vibrant ocean cyan
    tagClass: "bg-[#1E1E1E] text-[#00B4D8] border-[#00B4D8]/40",
    shadowClass: "shadow-[0_0_24px_rgba(0,180,216,0.25)]",
    tags: ["Fullstack", "Cloud", "Mobile"],
    // Symmetrical 6 o'clock (Bottom) position with clean spacing
    desktopStyle: {
      left: "calc(50% - 175px)",
      top: "calc(50% + 75px)",
      width: "350px",
      height: "205px",
      zIndex: 20,
    },
    // Directional slow-motion entrance: glides up from down
    motionInitial: { y: 400, opacity: 0 },
    motionInView: { y: 0, opacity: 1 },
    parallaxAxis: "y",
    isLeftEntry: false,
  },
  {
    id: "glitch",
    title: "Game Development",
    text: "Stories and mechanics brought to life through game jams and creative code.",
    borderClass: "border-[#1684B2]",
    tagClass: "bg-[#1E1E1E] text-[#38A1CE] border-[#1684B2]/40",
    shadowClass: "shadow-[0_0_24px_rgba(22,132,178,0.22)]",
    tags: ["Game Jams", "Unity", "Graphics"],
    // Symmetrical 9 o'clock (Left) position with clean spacing
    desktopStyle: {
      left: "calc(50% - 555px)",
      top: "calc(50% - 102.5px)",
      width: "350px",
      height: "205px",
      zIndex: 20,
    },
    // Directional slow-motion entrance: glides from left
    motionInitial: { x: -400, opacity: 0 },
    motionInView: { x: 0, opacity: 1 },
    parallaxAxis: "x",
    isLeftEntry: true,
  }
];

export default function InterconnectedLabs() {
  const containerRef = useRef(null);

  // Smooth scroll parallax transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTopParallax = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const yBottomParallax = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const xLeftParallax = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const xRightParallax = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const centerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.94]);

  return (
    <div ref={containerRef} className="w-full py-6 overflow-visible">
      {/* DESKTOP SPACED 4-CARD COMPASS LAYOUT (>= 1024px) */}
      <div className="hidden lg:block relative w-full max-w-[1140px] mx-auto h-[600px] my-4 select-none">
        
        {/* Subtle Connecting Lines between Center Hub and 4 Cards */}
        {/* Vertical Top Line */}
        <div 
          className="absolute w-[2px] bg-[#1993C6]/30 pointer-events-none"
          style={{ left: "calc(50% - 1px)", top: "calc(50% - 75px)", height: "25px" }}
        />
        {/* Vertical Bottom Line */}
        <div 
          className="absolute w-[2px] bg-[#1993C6]/30 pointer-events-none"
          style={{ left: "calc(50% - 1px)", top: "calc(50% + 50px)", height: "25px" }}
        />
        {/* Horizontal Left Line */}
        <div 
          className="absolute h-[2px] bg-[#1993C6]/25 pointer-events-none"
          style={{ left: "calc(50% - 205px)", top: "calc(50% - 1px)", width: "155px" }}
        />
        {/* Horizontal Right Line */}
        <div 
          className="absolute h-[2px] bg-[#1993C6]/25 pointer-events-none"
          style={{ left: "calc(50% + 50px)", top: "calc(50% - 1px)", width: "155px" }}
        />

        {/* 4 Spaced Cards with Zero Overlap */}
        {labs.map((lab, index) => {
          // Parallax transform based on compass position
          let parallaxTransform = {};
          if (lab.id === "ai") parallaxTransform = { y: yTopParallax };
          else if (lab.id === "web") parallaxTransform = { y: yBottomParallax };
          else if (lab.id === "glitch") parallaxTransform = { x: xLeftParallax };
          else if (lab.id === "cyber") parallaxTransform = { x: xRightParallax };

          return (
            <div
              key={lab.id}
              className="absolute"
              style={lab.desktopStyle}
            >
              {/* SLOW MOTION ENTRANCE: 1.8s duration with graceful easing */}
              <motion.div
                initial={lab.motionInitial}
                whileInView={lab.motionInView}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1.8,
                  delay: index * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full h-full"
              >
                {/* SCROLL PARALLAX + HOVER ELEVATION */}
                <motion.div
                  style={parallaxTransform}
                  whileHover={{ scale: 1.035 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full h-full group"
                >
                  <Link
                    href={`/sigs/${lab.id}`}
                    className={`block w-full h-full rounded-[26px] border-[3px] ${lab.borderClass} ${lab.shadowClass} bg-[#2A2A2A] p-7 transition-all duration-300 group-hover:z-50 cursor-pointer flex flex-col justify-between`}
                  >
                    <div>
                      {/* Title (No small icons, no numbers) */}
                      <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-2.5 leading-snug">
                        {lab.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-[13px] text-[#A8A8A8] leading-relaxed line-clamp-2">
                        {lab.text}
                      </p>
                    </div>

                    {/* Domain Tags */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      {lab.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-body text-xs font-medium px-3 py-1 rounded-md border ${lab.tagClass}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          );
        })}

        {/* Central Interconnection Node - Unites the 4 cards with clear spacing */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "calc(50% - 50px)",
            top: "calc(50% - 50px)",
            width: "100px",
            height: "100px",
            zIndex: 30,
          }}
        >
          <motion.div
            style={{ scale: centerScale }}
            initial={{ scale: 0.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full rounded-full bg-[#1E1E1E] border-2 border-[#1993C6] flex flex-col items-center justify-center shadow-[0_0_35px_rgba(25,147,198,0.35)]"
          >
            <div className="w-4 h-4 rotate-45 border-2 border-[#1993C6] bg-[#1684B2]/40 mb-1 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#1993C6]" />
            </div>
            <span className="font-display text-xs uppercase tracking-widest text-[#1993C6] font-bold">ACM</span>
            <span className="font-body text-[9px] uppercase tracking-wider text-white font-semibold">AMRITA</span>
            <span className="font-body text-[8px] uppercase tracking-wider text-[#A8A8A8]">4 SIGS</span>
          </motion.div>
        </div>

      </div>

      {/* TABLET & MOBILE SPACED CARDS LAYOUT (< 1024px) */}
      <div className="lg:hidden flex flex-col items-center gap-5 w-full px-4 py-4 select-none">
        {labs.map((lab, index) => {
          const isLeft = lab.isLeftEntry;

          return (
            <motion.div
              key={lab.id}
              className="w-full max-w-[420px]"
              initial={{ x: isLeft ? -120 : 0, y: isLeft ? 0 : 100, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.4, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/sigs/${lab.id}`}
                className={`block w-full rounded-[24px] border-[3px] ${lab.borderClass} ${lab.shadowClass} bg-[#2A2A2A] p-6 transition-transform active:scale-98 cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{lab.title}</h3>
                  <p className="font-body text-xs text-[#A8A8A8] leading-relaxed mb-4">{lab.text}</p>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {lab.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`font-body text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${lab.tagClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
