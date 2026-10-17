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
const rotationInterval = 3200;

export default function SigArchiveGallery() {
  const [stack, setStack] = useState(galleryItems);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setStack((current) => [...current.slice(1), current[0]]);
    }, rotationInterval);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="sig-gallery" aria-label="ACM Amritapuri automatically rotating photo gallery">
      <div className="sig-gallery__stage">
        <div className="sig-gallery__stack">
          <AnimatePresence initial={false}>
            {stack.slice(0, visibleCards).map((item, index) => (
              <motion.figure
                className="sig-gallery__stack-card"
                key={item.src}
                initial={{ opacity: 0, scale: 0.9, x: 38, rotate: 5 }}
                animate={{
                  opacity: 1 - index * 0.13,
                  scale: 1 - index * 0.045,
                  x: index * 9,
                  y: index * 8,
                  rotate: index === 0 ? 0 : (index % 2 ? 3 : -3),
                }}
                exit={{
                  x: 560,
                  opacity: 0,
                  rotate: 12,
                  scale: 0.92,
                  transition: { duration: 0.42, ease: "easeInOut" },
                }}
                transition={{ type: "spring", stiffness: 210, damping: 24 }}
                style={{ zIndex: visibleCards - index }}
              >
                <img src={item.src} alt={item.name} draggable="false" />
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
