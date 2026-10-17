import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const galleryItems = [
  { name: "Epochon 2.0 hackathon", src: "/assets/aiEvents/epochon 2.0.jpeg" },
  { name: "Active Directory workshop", src: "/assets/workshops/active-directory-1.jpeg" },
  { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/2.jpeg" },
  { name: "Agentic AI workshop", src: "/assets/aiEvents/agentic ai workshop.jpeg" },
  { name: "Web SIG exploration", src: "/assets/webexplorations/3.jpeg" },
  { name: "ACM Amritapuri chapter team", src: "/assets/ACM-Pics/team-photo.jpg" },
  { name: "ISEA cybersecurity workshop", src: "/assets/cyberworkshops/1.jpeg" },
  { name: "Active Directory workshop", src: "/assets/workshops/active-directory-2.jpeg" },
  { name: "Cybersecurity exploration", src: "/assets/cyberExplorations/4.jpeg" },
  { name: "Glitch SIG exploration", src: "/assets/glitchExplorations/3.jpg" },
  { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/4.jpeg" },
  { name: "Web SIG exploration", src: "/assets/webexplorations/5.jpeg" },
];

const visibleCards = 4;
const rotationInterval = 2100;
const motionEase = [0.22, 1, 0.36, 1];

export default function SigArchiveGallery() {
  const [stack, setStack] = useState(galleryItems);
  const [movingCard, setMovingCard] = useState(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setStack((current) => {
        setMovingCard(current[0]?.src ?? null);
        return [...current.slice(1), current[0]];
      });
    }, rotationInterval);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="sig-gallery" aria-label="ACM Amritapuri automatically rotating photo gallery">
      <div className="sig-gallery__stage">
        <div className="sig-gallery__stack">
          <AnimatePresence initial={false} mode="sync">
            {stack.slice(0, visibleCards).map((item, index) => {
              const isMoving = item.src === movingCard;
              return (
                <motion.figure
                  className="sig-gallery__stack-card"
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.94, x: 46, rotate: 2 }}
                  animate={{
                    opacity: 1 - index * 0.13,
                    scale: 1 - index * 0.045,
                    x: index === 0 ? (isMoving ? -20 : 0) : index * 9,
                    y: index * 8,
                    rotate: index === 0 ? (isMoving ? -1.5 : 0) : (index % 2 ? 3 : -3),
                  }}
                  exit={{
                    x: 520,
                    opacity: 0,
                    rotate: 5,
                    scale: 0.96,
                    transition: { duration: 0.28, ease: motionEase },
                  }}
                  transition={{
                    x: { duration: 0.48, ease: motionEase },
                    y: { duration: 0.48, ease: motionEase },
                    scale: { duration: 0.48, ease: motionEase },
                    opacity: { duration: 0.38, ease: motionEase },
                    rotate: { duration: 0.48, ease: motionEase },
                  }}
                  style={{ zIndex: visibleCards - index, willChange: "transform, opacity" }}
                >
                  <img src={item.src} alt={item.name} draggable="false" />
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
