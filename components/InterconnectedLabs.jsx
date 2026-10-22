import Link from "next/link";
import { motion, useTransform, useMotionValue } from "framer-motion";

// Palette: solid colors only - NO red, NO gradients.
// Entrance is driven by the `progress` prop (0 -> 1, linked to the tunnel scroll
// position in index.js), so all 4 cards slide in together, in sync with scrolling.
// `drift` (0 -> 1) drives the gentle parallax afterwards.

const labs = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    text: "Intelligent systems, research, and ambitious experiments turned into real products.",
    borderClass: "border-[#1993C6]",
    tagClass: "bg-[#1E1E1E] text-[#1993C6] border-[#1993C6]/30",
    shadowClass: "shadow-[0_0_24px_rgba(25,147,198,0.22)]",
    tags: ["ML Models", "Vision", "Agents"],
    desktopStyle: {
      left: "calc(50% - 175px)",
      top: "calc(50% - 280px)",
      width: "350px",
      height: "205px",
      zIndex: 20,
    },
    from: { x: -350, y: 0 }, // comes from the left
    parallax: { axis: "y", dir: 1 },
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    text: "Offensive and defensive security through CTFs, workshops, and hands-on challenges.",
    borderClass: "border-[#38A1CE]",
    tagClass: "bg-[#1E1E1E] text-[#38A1CE] border-[#38A1CE]/40",
    shadowClass: "shadow-[0_0_24px_rgba(56,161,206,0.25)]",
    tags: ["CTFs", "Web Security", "Labs"],
    desktopStyle: {
      left: "calc(50% + 205px)",
      top: "calc(50% - 102.5px)",
      width: "350px",
      height: "205px",
      zIndex: 20,
    },
    from: { x: 350, y: 0 }, // comes from the right
    parallax: { axis: "x", dir: -1 },
  },
  {
    id: "web",
    title: "Web & App",
    text: "Useful digital experiences built with modern tools and a product-first mindset.",
    borderClass: "border-[#00B4D8]",
    tagClass: "bg-[#1E1E1E] text-[#00B4D8] border-[#00B4D8]/40",
    shadowClass: "shadow-[0_0_24px_rgba(0,180,216,0.25)]",
    tags: ["Fullstack", "Cloud", "Mobile"],
    desktopStyle: {
      left: "calc(50% - 175px)",
      top: "calc(50% + 75px)",
      width: "350px",
      height: "205px",
      zIndex: 20,
    },
    from: { x: 0, y: 350 }, // comes from below
    parallax: { axis: "y", dir: -1 },
  },
  {
    id: "glitch",
    title: "Game Development",
    text: "Stories and mechanics brought to life through game jams and creative code.",
    borderClass: "border-[#1684B2]",
    tagClass: "bg-[#1E1E1E] text-[#38A1CE] border-[#1684B2]/40",
    shadowClass: "shadow-[0_0_24px_rgba(22,132,178,0.22)]",
    tags: ["Game Jams", "Unity", "Graphics"],
    desktopStyle: {
      left: "calc(50% - 555px)",
      top: "calc(50% - 102.5px)",
      width: "350px",
      height: "205px",
      zIndex: 20,
    },
    from: { x: -350, y: 0 }, // comes from the left
    parallax: { axis: "x", dir: 1 },
  },
];

function DesktopCard({ lab, progress, drift }) {
  const enterX = useTransform(progress, [0, 1], [lab.from.x, 0]);
  const enterY = useTransform(progress, [0, 1], [lab.from.y, 0]);
  const enterOpacity = useTransform(progress, [0, 0.7], [0, 1]);

  const amount = lab.parallax.dir * 16;
  const par = useTransform(drift, [0, 1], [-amount, amount]);
  const parallaxStyle = lab.parallax.axis === "x" ? { x: par } : { y: par };

  return (
    <div className="absolute" style={lab.desktopStyle}>
      {/* Scroll-linked entrance: all four cards move together */}
      <motion.div
        style={{ x: enterX, y: enterY, opacity: enterOpacity }}
        className="w-full h-full"
      >
        {/* Parallax + hover */}
        <motion.div
          style={parallaxStyle}
          whileHover={{ scale: 1.035 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full group"
        >
          <Link
            href={`/sigs/${lab.id}`}
            className={`block w-full h-full rounded-[26px] border-[3px] ${lab.borderClass} ${lab.shadowClass} bg-[#2A2A2A] p-7 transition-all duration-300 group-hover:z-50 cursor-pointer flex flex-col justify-between`}
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-2.5 leading-snug">
                {lab.title}
              </h3>
              <p className="font-body text-[13px] text-[#A8A8A8] leading-relaxed line-clamp-2">
                {lab.text}
              </p>
            </div>

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
}

function MobileCard({ lab, progress }) {
  const fromX = lab.from.x === 0 ? 0 : lab.from.x < 0 ? -120 : 120;
  const fromY = lab.from.y === 0 ? 0 : 100;
  const enterX = useTransform(progress, [0, 1], [fromX, 0]);
  const enterY = useTransform(progress, [0, 1], [fromY, 0]);
  const enterOpacity = useTransform(progress, [0, 0.7], [0, 1]);

  return (
    <motion.div
      className="w-full max-w-[420px]"
      style={{ x: enterX, y: enterY, opacity: enterOpacity }}
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
}

export default function InterconnectedLabs({ progress, drift }) {
  // Fallbacks so the component still renders fully if used without props.
  const fullProgress = useMotionValue(1);
  const midDrift = useMotionValue(0.5);
  const p = progress ?? fullProgress;
  const d = drift ?? midDrift;

  const nodeScale = useTransform(p, [0.2, 1], [0.2, 1]);
  const nodeOpacity = useTransform(p, [0.2, 0.8], [0, 1]);

  return (
    <div className="w-full py-6 overflow-visible">
      {/* DESKTOP 4-CARD COMPASS LAYOUT (>= 1024px) */}
      <div className="hidden lg:block relative w-full max-w-[1140px] mx-auto h-[600px] my-4 select-none">
        {/* Connecting lines */}
        <div
          className="absolute w-[2px] bg-[#1993C6]/30 pointer-events-none"
          style={{ left: "calc(50% - 1px)", top: "calc(50% - 75px)", height: "25px" }}
        />
        <div
          className="absolute w-[2px] bg-[#1993C6]/30 pointer-events-none"
          style={{ left: "calc(50% - 1px)", top: "calc(50% + 50px)", height: "25px" }}
        />
        <div
          className="absolute h-[2px] bg-[#1993C6]/25 pointer-events-none"
          style={{ left: "calc(50% - 205px)", top: "calc(50% - 1px)", width: "155px" }}
        />
        <div
          className="absolute h-[2px] bg-[#1993C6]/25 pointer-events-none"
          style={{ left: "calc(50% + 50px)", top: "calc(50% - 1px)", width: "155px" }}
        />

        {labs.map((lab) => (
          <DesktopCard key={lab.id} lab={lab} progress={p} drift={d} />
        ))}

        {/* Central node */}
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
            style={{ scale: nodeScale, opacity: nodeOpacity }}
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

      {/* TABLET & MOBILE STACKED LAYOUT (< 1024px) */}
      <div className="lg:hidden flex flex-col items-center gap-5 w-full px-4 py-4 select-none">
        {labs.map((lab) => (
          <MobileCard key={lab.id} lab={lab} progress={p} />
        ))}
      </div>
    </div>
  );
}