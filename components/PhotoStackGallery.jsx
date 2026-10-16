import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoStackGallery({ photos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through photos like a stacked slideshow
  useEffect(() => {
    if (!photos || photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos.length]);

  if (!photos || photos.length === 0) return null;

  // Display the active photo and a couple stacked underneath for depth
  const visibleCount = Math.min(photos.length, 3);
  const stackIndices = [];
  for (let i = 0; i < visibleCount; i++) {
    stackIndices.push((currentIndex - i + photos.length) % photos.length);
  }
  stackIndices.reverse(); // oldest at bottom, newest on top

  return (
    <div className="relative w-full h-[340px] sm:h-[400px] flex items-center justify-center select-none">
      {/* Ambient background glow */}
      <div 
        className="absolute w-[75%] h-[75%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(25,147,198,0.18) 0%, transparent 70%)",
          filter: "blur(35px)"
        }}
      />

      <div className="relative w-[300px] sm:w-[360px] md:w-[400px] aspect-[4/3] flex items-center justify-center">
        <AnimatePresence>
          {stackIndices.map((photoIdx, stackPos) => {
            const photo = photos[photoIdx];
            const isTop = stackPos === stackIndices.length - 1;

            // Slight random rotations and offsets for the stacked framed look
            const rotations = [-4, 3.5, -2, 4.5, -3];
            const xOffsets = [-10, 8, -6, 12, -4];
            const yOffsets = [6, -5, 3, -4, 2];
            
            const rot = rotations[photoIdx % rotations.length];
            const xOff = xOffsets[photoIdx % xOffsets.length];
            const yOff = yOffsets[photoIdx % yOffsets.length];

            return (
              <motion.div
                key={photo.src + photoIdx}
                initial={{ opacity: 0, scale: 0.88, y: -35, rotate: rot + 7 }}
                animate={{ 
                  opacity: isTop ? 1 : 0.65 - (stackIndices.length - 1 - stackPos) * 0.2, 
                  scale: isTop ? 1 : 0.94 + stackPos * 0.02,
                  x: xOff,
                  y: yOff,
                  rotate: rot,
                }}
                exit={{ opacity: 0, scale: 0.92, y: 35, transition: { duration: 0.3 } }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: stackPos + 1 }}
                className="absolute inset-0 bg-[#F4F1EA] p-3 sm:p-4 rounded-[6px] shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex flex-col justify-between border border-white/20"
              >
                <div className="relative w-full h-[82%] overflow-hidden bg-[#1E1E1E] rounded-[2px]">
                  <img
                    src={photo.src}
                    alt={photo.alt || "ACM Event"}
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div className="h-[15%] flex items-center justify-between px-1">
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#222222] truncate">
                    {photo.caption || "ACM Amritapuri Moment"}
                  </span>
                  <span className="font-mono text-[10px] text-[#666666]">
                    0{photoIdx + 1} / 0{photos.length}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute -bottom-6 flex items-center gap-2 z-20">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "w-6 bg-[#1993C6]"
                : "w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}