import { useState, useEffect, useRef, createContext, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";

import LoadingScreen from "../components/LoadingScreen";
import InterconnectedLabs from "../components/InterconnectedLabs";
import PhotoStackGallery from "../components/PhotoStackGallery";

const achievements = [
  { value: "08", label: "Hackathon awards" },
  { value: "100+", label: "Projects shipped" },
  { value: "26", label: "Events hosted" },
  { value: "08", label: "Research papers" },
];

const highlights = [
  { tag: "National stage", title: "Adversary CTF winners at c0c0n", meta: "SIG Cyber · 2023", accent: "01" },
  { tag: "Competitive coding", title: "ICPC Asia-West regional finalists", meta: "Team ACM Amritapuri", accent: "02" },
  { tag: "Innovation", title: "Two teams awarded at Smart India Hackathon", meta: "Student Projects · 2022", accent: "03" },
];

const galleryPhotos = [
  {
    src: "/assets/ACM-Pics/team-photo.jpg",
    alt: "ACM Amritapuri students and mentors together at a chapter gathering",
    caption: "ACM Amritapuri chapter gathering",
  },
  {
    src: "/assets/aiEvents/agentic ai workshop.jpeg",
    alt: "Students attending an Agentic AI workshop",
    caption: "Agentic AI Workshop",
  },
  {
    src: "/assets/aiEvents/epochon 2.0.jpeg",
    alt: "Students gathered for the EpochOn event",
    caption: "EpochOn 2.0 Hackathon",
  },
  {
    src: "/assets/cyberworkshops/hero.jpeg",
    alt: "A student presenting a cybersecurity workshop",
    caption: "Offensive Security Hands-on Lab",
  },
  {
    src: "/pastEvents/1.jpg",
    alt: "ACM Amritapuri representatives at an ACM India event",
    caption: "ACM India Annual Flagship Event",
  },
];

// Font: Black Ops One (loaded from Google Fonts in <Head>)
const SANS_STACK = '"Black Ops One", system-ui, sans-serif';

const SECTION_SPACING = 1500;
const TOTAL_SECTIONS = 7;

// Extra scroll distance a stop can "hold" before it exits.
// Stop 4 (Four Labs) needs room for two steps: heading first, then the cards.
const LABS_HOLD = 800;
const HOLD = [0, 0, 0, 0, LABS_HOLD, 0, 0];

// Camera position of every stop (a stop's hold pushes the following stops further on).
const STOP_Z = [];
HOLD.reduce((z, hold, i) => {
  STOP_Z[i] = z;
  return z + SECTION_SPACING + hold;
}, 0);
const MAX_CAMERA_Z = STOP_Z[TOTAL_SECTIONS - 1];
const SCROLL_VH = Math.round(MAX_CAMERA_Z * 0.0867); // same scroll "feel" as before

const TEXT_SHADOW = "drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]";

// Shares the scroll "camera" with every Reveal, so we don't pass it down by hand.
const CameraContext = createContext(null);

function TunnelStop({ index, cameraZ, children }) {
  const targetZ = STOP_Z[index];
  const hold = HOLD[index];
  // While a stop "holds" it stays fully in view; its exit only starts after the hold.
  const relZ = useTransform(cameraZ, (c) => {
    const rel = targetZ - c;
    return rel < 0 ? Math.min(0, rel + hold) : rel;
  });

  const scale = useTransform(
    relZ,
    [-950, -250, 0, 250, 1400, 2400],
    [2.35, 1.04, 1, 0.96, 0.22, 0.05]
  );

  const opacity = useTransform(
    relZ,
    [-750, -260, 0, 260, 1150, 1750],
    [0, 1, 1, 1, 0.12, 0]
  );

  const blur = useTransform(
    relZ,
    [-750, -220, 0, 220, 1200],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  const pointerEvents = useTransform(relZ, (z) =>
    z > -420 && z < 420 ? "auto" : "none"
  );

  const zIndex = useTransform(relZ, (z) => Math.round(10000 - z));

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter: blur,
        pointerEvents,
        zIndex,
      }}
      className="fixed inset-0 flex items-center justify-center px-6 pt-24 pb-10 overflow-hidden will-change-transform"
    >
      <div className="w-full max-w-6xl mx-auto max-h-[82vh] flex flex-col justify-center">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Scroll-linked LINE-BY-LINE reveal.
 * Every line / block gets its own `order`. Order 0 appears first, then 1, 2, 3 ...
 * Each one fades in and rises a little, so text arrives line by line as you scroll.
 * Scrolling back reverses it.
 *
 * from: "bottom" (default) | "left" | "right" | "scale"
 * as:   "div" (default) | "span"  (use span for lines inside a heading)
 */
function Reveal({ stopIndex, order = 0, from = "bottom", as = "div", className = "", children }) {
  const cameraZ = useContext(CameraContext);
  const target = STOP_Z[stopIndex];

  // How far ahead of the camera this line starts / finishes appearing.
  const startRel = 650 - order * 40;
  const endRel = startRel - 240;

  const p = useTransform(cameraZ, [target - startRel, target - endRel], [0, 1]);

  const opacity = useTransform(p, [0, 0.8], [0, 1]);
  const x = useTransform(p, [0, 1], [from === "left" ? -70 : from === "right" ? 70 : 0, 0]);
  const y = useTransform(p, [0, 1], [from === "bottom" ? 28 : 0, 0]);
  const scale = useTransform(p, [0, 1], [from === "scale" ? 0.8 : 1, 1]);

  const Comp = as === "span" ? motion.span : motion.div;

  return (
    <Comp
      style={{ opacity, x, y, scale }}
      className={as === "span" ? `block ${className}` : className}
    >
      {children}
    </Comp>
  );
}

// Hero entrance: plays once, line by line, right after the loading screen.
const heroItem = (delay) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    mass: 0.45,
  });

  const cameraZ = useTransform(smoothProgress, [0, 1], [0, MAX_CAMERA_Z]);

  // "Four labs" (stop 4) plays in steps while the camera holds there:
  //  1) heading sits centered  2) heading flies up and away  3) the four cards come in
  const LABS_Z = STOP_Z[4];
  const headExit = useTransform(cameraZ, [LABS_Z + 120, LABS_Z + 420], [0, 1]);
  const headY = useTransform(headExit, [0, 1], [0, -300]);
  const headOpacity = useTransform(headExit, [0, 0.75], [1, 0]);
  const headScale = useTransform(headExit, [0, 1], [1, 0.92]);
  const labsProgress = useTransform(cameraZ, [LABS_Z + 380, LABS_Z + 680], [0, 1]);
  const labsDrift = useTransform(cameraZ, [LABS_Z + 380, LABS_Z + 1200], [0, 1]);
  const labsPointer = useTransform(labsProgress, (v) => (v > 0.6 ? "auto" : "none"));

  useEffect(() => {
    const unsubscribe = cameraZ.on("change", (latestZ) => {
      let idx = 0;
      STOP_Z.forEach((z, i) => {
        if (Math.abs(latestZ - z) < Math.abs(latestZ - STOP_Z[idx])) idx = i;
      });
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [cameraZ]);

  // 60fps 3D Rectangular Wireframe Corridor Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = nx * 55;
      mouseRef.current.targetY = ny * 35;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let idleDrift = 0;

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      idleDrift += 0.55;
      const currentCamZ = cameraZ.get() * 1.15 + idleDrift;

      ctx.fillStyle = "#040406";
      ctx.fillRect(0, 0, w, h);

      const vx = w / 2 + mouseRef.current.x;
      const vy = h / 2 + mouseRef.current.y;

      const wallGlow = ctx.createRadialGradient(vx, vy, 20, vx, vy, Math.max(w, h) * 0.65);
      wallGlow.addColorStop(0, "rgba(0, 0, 0, 1)");
      wallGlow.addColorStop(0.32, "rgba(14, 14, 16, 0.92)");
      wallGlow.addColorStop(0.68, "rgba(160, 160, 170, 0.06)");
      wallGlow.addColorStop(1, "rgba(4, 4, 6, 1)");
      ctx.fillStyle = wallGlow;
      ctx.fillRect(0, 0, w, h);

      const fov = 420;
      const corridorW = Math.max(w * 1.35, 1500);
      const corridorH = Math.max(h * 1.35, 960);
      const numRings = 28;
      const ringStep = 140;
      const maxTunnelZ = numRings * ringStep;

      const nearScale = fov / 60;
      const farScale = fov / maxTunnelZ;
      const subdivisions = 6;
      ctx.lineWidth = 1;

      for (let s = 0; s <= subdivisions; s++) {
        const t = -0.5 + s / subdivisions;
        const isCorner = s === 0 || s === subdivisions;
        ctx.strokeStyle = isCorner
          ? "rgba(200, 200, 210, 0.22)"
          : "rgba(255, 255, 255, 0.055)";

        [-0.5, 0.5].forEach((ySide) => {
          ctx.beginPath();
          ctx.moveTo(vx + t * corridorW * farScale, vy + ySide * corridorH * farScale);
          ctx.lineTo(vx + t * corridorW * nearScale, vy + ySide * corridorH * nearScale);
          ctx.stroke();
        });

        [-0.5, 0.5].forEach((xSide) => {
          ctx.beginPath();
          ctx.moveTo(vx + xSide * corridorW * farScale, vy + t * corridorH * farScale);
          ctx.lineTo(vx + xSide * corridorW * nearScale, vy + t * corridorH * nearScale);
          ctx.stroke();
        });
      }

      const offset = ((currentCamZ % ringStep) + ringStep) % ringStep;

      for (let i = numRings; i >= 0; i--) {
        const z = i * ringStep - offset;
        if (z <= 15) continue;

        const scale = fov / z;
        const rw = corridorW * scale;
        const rh = corridorH * scale;
        const rx = vx - rw / 2;
        const ry = vy - rh / 2;

        const depthRatio = 1 - z / maxTunnelZ;
        const alpha = Math.pow(Math.max(0, depthRatio), 1.65) * 0.42;
        const isAccentRing = Math.round((currentCamZ + z) / ringStep) % 4 === 0;

        ctx.save();
        ctx.beginPath();
        ctx.rect(rx, ry, rw, rh);

        if (isAccentRing) {
          ctx.strokeStyle = `rgba(215, 215, 225, ${alpha * 0.85})`;
          ctx.lineWidth = Math.min(2.2, Math.max(0.8, scale * 1.3));
        } else {
          ctx.strokeStyle = `rgba(150, 150, 158, ${alpha * 0.55})`;
          ctx.lineWidth = Math.min(1.4, Math.max(0.6, scale * 0.9));
        }
        ctx.stroke();
        ctx.restore();
      }

      const centerVoid = ctx.createRadialGradient(vx, vy, 5, vx, vy, 150);
      centerVoid.addColorStop(0, "rgba(2, 2, 4, 0.98)");
      centerVoid.addColorStop(0.6, "rgba(4, 4, 4, 0.75)");
      centerVoid.addColorStop(1, "rgba(4, 4, 4, 0)");
      ctx.fillStyle = centerVoid;
      ctx.beginPath();
      ctx.arc(vx, vy, 150, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cameraZ]);

  const scrollToSection = (index) => {
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (STOP_Z[index] / MAX_CAMERA_Z) * totalScrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div
      className="home-sans-root bg-[#040406] min-h-screen relative text-white font-sans overflow-x-hidden"
      style={{ fontFamily: SANS_STACK }}
    >
      <Head>
        <title>ACM Amritapuri — Fueling curiosity</title>
        <meta
          name="description"
          content="ACM Amritapuri is where curious students build, research, compete, and shape what comes next."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        :root,
        html,
        body,
        #__next,
        .home-sans-root {
          background-color: #040406 !important;
          color: #ffffff !important;
        }
        html,
        body,
        #__next,
        .home-sans-root,
        .home-sans-root * {
          font-family: ${SANS_STACK} !important;
          font-synthesis: none;
        }
      `}</style>

      {/* FIXED 3D WIREFRAME CORRIDOR CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      <AnimatePresence>
        {showLoading && (
          <LoadingScreen key="loading" onComplete={() => setShowLoading(false)} />
        )}
      </AnimatePresence>

      {!showLoading && (
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
          {Array.from({ length: TOTAL_SECTIONS }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              aria-label={`Jump to tunnel stop ${idx + 1}`}
              className={`w-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "h-7 bg-[#009BDE] shadow-[0_0_12px_#009BDE]"
                  : "h-2 bg-white/25 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {!showLoading && (
        <CameraContext.Provider value={cameraZ}>
          <div className="relative z-10" style={{ height: `${SCROLL_VH}vh` }}>

            {/* ───────── STOP 0 · HERO (line by line on load) ───────── */}
            <TunnelStop index={0} cameraZ={cameraZ}>
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">

                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.06] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                  <motion.span className="block" {...heroItem(0.1)}>
                    Fueling <span className="text-[#009BDE]">curiosity.</span>
                  </motion.span>
                  <motion.span className="block" {...heroItem(0.35)}>
                    Igniting ideas.
                  </motion.span>
                </h1>

                <motion.p
                  {...heroItem(0.6)}
                  className={`text-base sm:text-lg md:text-xl text-[#B8B8C2] max-w-2xl mx-auto mb-8 leading-relaxed ${TEXT_SHADOW}`}
                >
                  We’re the campus community for people who want to build the future, break things intelligently, and learn alongside a seriously talented crew.
                </motion.p>

                <motion.div
                  {...heroItem(0.85)}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Link
                    href="https://aseam.acm.org/join"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#009BDE] hover:bg-[#0082be] text-white font-semibold text-base transition-all shadow-[0_4px_25px_rgba(0,155,222,0.45)]"
                  >
                    Enter the community <HiArrowRight className="text-lg" />
                  </Link>
                  <Link
                    href="/achievements"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/20 hover:border-[#009BDE] text-white font-semibold text-base transition-all"
                  >
                    See our impact <FiArrowUpRight className="text-lg text-[#009BDE]" />
                  </Link>
                </motion.div>

                <motion.span
                  {...heroItem(1.1)}
                  className="mt-10 text-xs uppercase tracking-[0.25em] text-white/45 animate-pulse"
                >
                  Scroll to travel through the corridor ↓
                </motion.span>
              </div>
            </TunnelStop>

            {/* ───────── STOP 1 · MOMENTS ───────── */}
            <TunnelStop index={1} cameraZ={cameraZ}>
              <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
                <div className="max-w-xl">
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight drop-shadow-xl">
                    <Reveal as="span" stopIndex={1} order={0}>People make</Reveal>
                    <Reveal as="span" stopIndex={1} order={1}>
                      <span className="text-[#009BDE]">the moments.</span>
                    </Reveal>
                  </h2>
                  <Reveal stopIndex={1} order={2}>
                    <p className={`text-[#C0C0C8] text-base sm:text-lg leading-relaxed ${TEXT_SHADOW}`}>
                      Workshops, chapter gatherings, hackathons, and shared projects—these are a few moments from our community learning and building together.
                    </p>
                  </Reveal>
                </div>
                {/* Photo gallery: keeps its own entrance */}
                <Reveal stopIndex={1} order={3} from="right" className="w-full flex justify-center">
                  <PhotoStackGallery photos={galleryPhotos} />
                </Reveal>
              </div>
            </TunnelStop>

            {/* ───────── STOP 2 · LAUNCHPAD ───────── */}
            <TunnelStop index={2} cameraZ={cameraZ}>
              <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.12] text-white drop-shadow-2xl">
                  <Reveal as="span" stopIndex={2} order={0}>Not another club.</Reveal>
                  <Reveal as="span" stopIndex={2} order={1}>
                    A <span className="text-[#009BDE]">launchpad</span> for the relentlessly curious.
                  </Reveal>
                </h2>
                <Reveal stopIndex={2} order={2}>
                  <p className={`text-[#C0C0C8] text-base sm:text-lg max-w-2xl leading-relaxed mb-8 ${TEXT_SHADOW}`}>
                    From a first line of code to a nationally recognized build, we give students the mentorship, tools, and creative room to explore computer science on their own terms.
                  </p>
                </Reveal>
                <Reveal stopIndex={2} order={3} from="scale">
                  <div className="w-20 h-1 bg-[#009BDE] rounded-full shadow-[0_0_15px_#009BDE]" />
                </Reveal>
              </div>
            </TunnelStop>

            {/* ───────── STOP 3 · STATS ───────── */}
            <TunnelStop index={3} cameraZ={cameraZ}>
              <div className="w-full">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
                  {achievements.map((item, index) => (
                    <Reveal
                      key={item.label}
                      stopIndex={3}
                      order={index}
                      className="flex flex-col items-center text-center"
                    >
                      <strong className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight my-1 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                        {item.value}
                      </strong>
                      <span className={`text-[#009BDE] text-xs sm:text-sm font-medium uppercase tracking-wider mt-2 ${TEXT_SHADOW}`}>
                        {item.label}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>
            </TunnelStop>

            {/* ───────── STOP 4 · FOUR LABS ───────── */}
            <TunnelStop index={4} cameraZ={cameraZ}>
              <div className="relative w-full h-[82vh]">

                {/* STEP 1 - heading, centered. It flies up and away as you keep scrolling. */}
                <motion.div
                  style={{ y: headY, opacity: headOpacity, scale: headScale }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                >
                  <Reveal stopIndex={4} order={0}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#009BDE]/15 border border-[#009BDE]/40 text-[#009BDE] text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009BDE]" />
                      Student Interest Groups
                    </div>
                  </Reveal>
                  <h2 className="text-white text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6 drop-shadow-2xl">
                    <Reveal as="span" stopIndex={4} order={1}>Four labs.</Reveal>
                    <Reveal as="span" stopIndex={4} order={2}>
                      <span className="text-[#009BDE]">Infinite directions.</span>
                    </Reveal>
                  </h2>
                  <Reveal stopIndex={4} order={3}>
                    <p className={`text-[#C0C0C8] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${TEXT_SHADOW}`}>
                      Focused student-led communities learning by doing—interconnected labs exploring every layer of modern computing.
                    </p>
                  </Reveal>
                </motion.div>

                {/* STEP 2 - the four SIG cards come in after the heading has left. */}
                <motion.div
                  style={{ pointerEvents: labsPointer }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-full">
                    <InterconnectedLabs progress={labsProgress} drift={labsDrift} />
                  </div>
                </motion.div>
              </div>
            </TunnelStop>

            {/* ───────── STOP 5 · TRACK RECORD ───────── */}
            <TunnelStop index={5} cameraZ={cameraZ}>
              <div className="w-full">
                <div className="grid lg:grid-cols-2 gap-6 items-end mb-8">
                  <div>
                    <Reveal stopIndex={5} order={0}>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#009BDE]/15 border border-[#009BDE]/40 text-[#009BDE] text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#009BDE]" />
                        Proven Track Record
                      </div>
                    </Reveal>
                    <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                      <Reveal as="span" stopIndex={5} order={1}>We don’t just participate.</Reveal>
                      <Reveal as="span" stopIndex={5} order={2}>
                        <span className="text-[#009BDE]">We show up.</span>
                      </Reveal>
                    </h2>
                  </div>
                  <Reveal stopIndex={5} order={3}>
                    <p className={`text-[#C0C0C8] text-sm sm:text-base leading-relaxed max-w-xl ${TEXT_SHADOW}`}>
                      Our members compete, publish, ship, and represent the chapter on national and global stages.
                    </p>
                  </Reveal>
                </div>

                <div>
                  {highlights.map((item, i) => (
                    <Reveal key={item.title} stopIndex={5} order={4 + i}>
                      <article className="py-5 flex items-center justify-between border-b border-white/10 hover:border-[#009BDE] transition-colors">
                        <span className="text-[#009BDE] font-bold text-2xl mr-5">{item.accent}</span>
                        <div className="flex-1">
                          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-white/5 text-[#009BDE] border border-[#009BDE]/30 mb-1.5 uppercase tracking-wider">
                            {item.tag}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                            {item.title}
                          </h3>
                          <p className={`text-xs sm:text-sm text-[#C0C0C8] ${TEXT_SHADOW}`}>{item.meta}</p>
                        </div>
                        <FiArrowUpRight className="text-[#009BDE] text-2xl ml-4 shrink-0" />
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </TunnelStop>

            {/* ───────── STOP 6 · EVENTS + JOIN ───────── */}
            <TunnelStop index={6} cameraZ={cameraZ}>
              <div className="grid md:grid-cols-2 gap-10 items-center w-full">
                <div>
                  <Reveal stopIndex={6} order={0}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#009BDE]/15 border border-[#009BDE]/40 text-[#009BDE] text-xs font-semibold tracking-wider uppercase mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009BDE]" />
                      Hands-on Experiences & Community
                    </div>
                  </Reveal>
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-xl">
                    <Reveal as="span" stopIndex={6} order={1}>Show up curious.</Reveal>
                    <Reveal as="span" stopIndex={6} order={2}>
                      <span className="text-[#009BDE]">Leave electric.</span>
                    </Reveal>
                  </h2>
                  <Reveal stopIndex={6} order={3}>
                    <p className={`text-[#C0C0C8] text-base leading-relaxed mb-6 ${TEXT_SHADOW}`}>
                      Workshops, open houses, hackathons, tech talks, and community nights—built to turn passive interest into real hands-on experience.
                    </p>
                  </Reveal>
                  <Reveal stopIndex={6} order={4}>
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2.5 text-[#009BDE] hover:text-white font-semibold tracking-wide text-base transition-colors"
                    >
                      Explore all events <HiArrowRight className="text-lg" />
                    </Link>
                  </Reveal>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-white/15 pt-6 md:pt-0 md:pl-10">
                  <Reveal stopIndex={6} order={5}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#009BDE]/15 border border-[#009BDE]/40 text-[#009BDE] text-xs font-semibold tracking-wider uppercase mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009BDE]" />
                      Get Involved
                    </div>
                  </Reveal>
                  <h3 className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-4 drop-shadow-xl">
                    <Reveal as="span" stopIndex={6} order={6}>Your next big idea</Reveal>
                    <Reveal as="span" stopIndex={6} order={7}>
                      starts <span className="text-[#009BDE]">here.</span>
                    </Reveal>
                  </h3>
                  <Reveal stopIndex={6} order={8}>
                    <p className={`text-[#C0C0C8] text-base leading-relaxed mb-6 ${TEXT_SHADOW}`}>
                      You don’t need to be an expert. Bring your curiosity, your ambitious ideas, and the drive to build something meaningful.
                    </p>
                  </Reveal>
                  <Reveal stopIndex={6} order={9}>
                    <Link
                      href="https://aseam.acm.org/join"
                      target="_blank"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#009BDE] hover:bg-[#0082be] text-white font-semibold text-base transition-all shadow-[0_4px_25px_rgba(0,155,222,0.45)]"
                    >
                      Join ACM Amritapuri <HiArrowRight className="text-lg" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </TunnelStop>

          </div>
        </CameraContext.Provider>
      )}
    </div>
  );
}