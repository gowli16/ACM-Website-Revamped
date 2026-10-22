import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiCornerDownLeft } from "react-icons/fi";

// Geometric vector paths for the ACM Student Chapter diamond chevrons
const TOP_CHEVRON = "M 145 135 L 230 50 L 315 135 L 292 158 L 230 96 L 168 158 Z";
const LEFT_CHEVRON = "M 125 155 L 40 240 L 125 325 L 148 302 L 86 240 L 148 178 Z";
const BOTTOM_CHEVRON = "M 145 345 L 230 430 L 315 345 L 292 322 L 230 384 L 168 322 Z";

const SEARCH_QUERY = "ACM Amritapuri";

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState("search"); // "search" -> "trace"
  const [typedText, setTypedText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Stage 1: Slower typing -> 3 blue dots loading pause -> transition to trace
  useEffect(() => {
    let currentIndex = 0;
    let stageTimeout;

    const typeInterval = setInterval(() => {
      if (currentIndex <= SEARCH_QUERY.length) {
        setTypedText(SEARCH_QUERY.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsSearching(true);
        // Hold for 1.4 seconds to show the three blue dots pulsing
        stageTimeout = setTimeout(() => {
          setStage("trace");
        }, 1400);
      }
    }, 110); // Slower typing speed

    return () => {
      clearInterval(typeInterval);
      if (stageTimeout) clearTimeout(stageTimeout);
    };
  }, []);

  // Stage 2: Allow slow trace + slow fill to finish before entering homepage
  useEffect(() => {
    if (stage !== "trace") return;

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4600);

    return () => clearTimeout(completeTimer);
  }, [stage, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050506] overflow-hidden select-none"
      style={{
        perspective: "1200px",
        // Black + grey mix: lighter grey in the centre fading to near-black at the edges
        background: "radial-gradient(ellipse at center, #232326 0%, #141416 42%, #060607 100%)",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes traceTextSlow {
          0% {
            stroke-dasharray: 900;
            stroke-dashoffset: 900;
            fill: rgba(27, 92, 162, 0);
            stroke: rgba(0, 136, 198, 0.75);
          }
          58% {
            stroke-dasharray: 900;
            stroke-dashoffset: 0;
            fill: rgba(27, 92, 162, 0);
            stroke: rgba(0, 136, 198, 0.75);
          }
          100% {
            stroke-dasharray: 900;
            stroke-dashoffset: 0;
            fill: rgba(27, 92, 162, 0.9);
            stroke: rgba(27, 92, 162, 0.9);
          }
        }

        @keyframes traceSubtextSlow {
          0% {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            fill: rgba(0, 136, 198, 0);
            stroke: rgba(0, 136, 198, 0.7);
          }
          58% {
            stroke-dasharray: 400;
            stroke-dashoffset: 0;
            fill: rgba(0, 136, 198, 0);
            stroke: rgba(0, 136, 198, 0.7);
          }
          100% {
            stroke-dasharray: 400;
            stroke-dashoffset: 0;
            fill: rgba(0, 136, 198, 0.88);
            stroke: rgba(0, 136, 198, 0.88);
          }
        }

        .acm-main-text {
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          font-weight: 800;
          font-size: 138px;
          letter-spacing: -6px;
          stroke-width: 2px;
          animation: traceTextSlow 3.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
          stroke-dasharray: 900;
          stroke-dashoffset: 900;
          fill: transparent;
        }

        .acm-sub-text {
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          font-weight: 700;
          font-size: 36px;
          stroke-width: 1px;
          animation: traceSubtextSlow 3.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.6s;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          fill: transparent;
        }

        .acm-3d-back {
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          font-weight: 800;
          font-size: 138px;
          letter-spacing: -6px;
          stroke: rgba(0, 136, 198, 0.14);
          stroke-width: 1.2px;
          fill: transparent;
        }
      `}} />

      {/* Soft, subtle ambient radial glow (toned down) */}
      <div 
        className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(190, 190, 200, 0.07) 0%, rgba(120, 120, 130, 0.03) 45%, transparent 70%)",
          filter: "blur(30px)"
        }}
      />

      <AnimatePresence mode="wait">
        {/* STAGE 1: SEARCH ANIMATION + THREE BLUE DOTS */}
        {stage === "search" && (
          <motion.div
            key="search-stage"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: isSearching ? 0.98 : 1 
            }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-10 w-[90%] max-w-md flex flex-col items-center"
          >
            <div 
              className={`w-full flex items-center justify-between px-6 py-4 rounded-full bg-[#18181B]/90 border transition-all duration-500 ${
                isSearching 
                  ? "border-[#009BDE]/60 shadow-[0_0_20px_rgba(0,155,222,0.2)]" 
                  : "border-[#009BDE]/30 shadow-[0_0_15px_rgba(0,155,222,0.1)]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <FiSearch className="text-[#009BDE]/80 text-xl flex-shrink-0" />
                <span className="text-white/95 text-lg md:text-xl font-medium tracking-wide">
                  {typedText}
                  {!isSearching && (
                    <span className="inline-block w-[2px] h-5 ml-1 align-middle bg-[#009BDE]/80 animate-pulse" />
                  )}
                </span>
              </div>

              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isSearching 
                    ? "bg-[#009BDE]/85 text-[#0A0A0B] scale-105" 
                    : "bg-[#009BDE]/15 text-[#009BDE]/80"
                }`}
              >
                <FiCornerDownLeft className="text-sm" />
              </div>
            </div>

            {/* THREE BLUE DOTS AFTER SEARCHING */}
            <div className="h-10 mt-5 flex items-center justify-center">
              {isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5"
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="w-2.5 h-2.5 rounded-full bg-[#009BDE]/85"
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 0.75,
                        repeat: Infinity,
                        delay: dot * 0.18,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* STAGE 2: SLOW, SOFT 3D TRACED ACM LOGO */}
        {stage === "trace" && (
          <motion.div
            key="trace-stage"
            initial={{ rotateX: 24, rotateY: -20, scale: 0.9, opacity: 0 }}
            animate={{ 
              rotateX: [24, 8, 0], 
              rotateY: [-20, 8, 0], 
              scale: [0.9, 1, 1],
              opacity: 1 
            }}
            transition={{ duration: 3.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* SUBTLE BACK 3D EXTRUSION LAYER */}
            <svg
              viewBox="0 0 540 480"
              className="w-[320px] sm:w-[420px] md:w-[480px] h-auto absolute inset-0 pointer-events-none opacity-25"
              style={{ transform: "translateZ(-24px) translateX(-6px) translateY(6px)" }}
            >
              <path d={TOP_CHEVRON} fill="none" stroke="#0088C6" strokeWidth="1.2" strokeDasharray="4 4" />
              <path d={LEFT_CHEVRON} fill="none" stroke="#0088C6" strokeWidth="1.2" strokeDasharray="4 4" />
              <path d={BOTTOM_CHEVRON} fill="none" stroke="#0088C6" strokeWidth="1.2" strokeDasharray="4 4" />
              <text x="155" y="256" className="acm-3d-back" textLength="315" lengthAdjust="spacingAndGlyphs">
                acm
              </text>
            </svg>

            {/* FRONT LOGO LAYER (No harsh filter flash, smooth slow fill) */}
            <svg
              viewBox="0 0 540 480"
              className="w-[320px] sm:w-[420px] md:w-[480px] h-auto relative z-10 overflow-visible"
              style={{ transform: "translateZ(16px)" }}
            >
              {/* 1. TOP CHEVRON (Softened ACM Blue) */}
              <motion.path
                d={TOP_CHEVRON}
                stroke="rgba(0, 136, 198, 0.75)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, fill: "rgba(0, 136, 198, 0)" }}
                animate={{
                  pathLength: [0, 1, 1],
                  fill: ["rgba(0, 136, 198, 0)", "rgba(0, 136, 198, 0)", "rgba(0, 136, 198, 0.88)"]
                }}
                transition={{
                  duration: 3.8,
                  times: [0, 0.6, 1],
                  ease: "easeInOut"
                }}
              />

              {/* 2. LEFT CHEVRON (Deep ACM Navy-Blue) */}
              <motion.path
                d={LEFT_CHEVRON}
                stroke="rgba(27, 92, 162, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, fill: "rgba(27, 92, 162, 0)" }}
                animate={{
                  pathLength: [0, 1, 1],
                  fill: ["rgba(27, 92, 162, 0)", "rgba(27, 92, 162, 0)", "rgba(27, 92, 162, 0.92)"]
                }}
                transition={{
                  duration: 3.8,
                  delay: 0.2,
                  times: [0, 0.6, 1],
                  ease: "easeInOut"
                }}
              />

              {/* 3. BOTTOM CHEVRON (Softened ACM Blue) */}
              <motion.path
                d={BOTTOM_CHEVRON}
                stroke="rgba(0, 136, 198, 0.75)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, fill: "rgba(0, 136, 198, 0)" }}
                animate={{
                  pathLength: [0, 1, 1],
                  fill: ["rgba(0, 136, 198, 0)", "rgba(0, 136, 198, 0)", "rgba(0, 136, 198, 0.88)"]
                }}
                transition={{
                  duration: 3.8,
                  delay: 0.4,
                  times: [0, 0.6, 1],
                  ease: "easeInOut"
                }}
              />

              {/* 4. "acm" LOWERCASE BOLD TEXT TRACE */}
              <text
                x="155"
                y="256"
                className="acm-main-text"
                textLength="315"
                lengthAdjust="spacingAndGlyphs"
              >
                acm
              </text>

              {/* 5. "Student Chapter" SUBTITLE TRACE */}
              <text
                x="158"
                y="302"
                className="acm-sub-text"
                textLength="310"
                lengthAdjust="spacing"
              >
                Student Chapter
              </text>
            </svg>

            {/* Subtle Bottom Progress Bar */}
            <div className="mt-8 w-44 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#0088C6]/80"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}