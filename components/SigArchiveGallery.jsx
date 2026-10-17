import { useState } from "react";
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

export default function SigArchiveGallery() {
  const [stack, setStack] = useState(galleryItems);

  const sendToBack = (draggedItem, info) => {
    const distance = Math.abs(info.offset.x);
    const speed = Math.abs(info.velocity.x);
    if (distance < 65 && speed < 450) return;

    setStack((current) => {
      if (current[0]?.src !== draggedItem.src) return current;
      return [...current.slice(1), current[0]];
    });
  };

  return (
    <section className="sig-gallery" aria-label="ACM Amritapuri draggable photo stack">
      <div className="sig-gallery__stage">
        <div className="sig-gallery__stack">
          <AnimatePresence initial={false}>
            {stack.slice(0, visibleCards).map((item, index) => {
              const isTop = index === 0;
              return (
                <motion.figure
                  className="sig-gallery__stack-card"
                  key={item.src}
                  drag={isTop ? "x" : false}
                  dragDirectionLock
                  dragMomentum={false}
                  dragElastic={0.72}
                  onDragEnd={(_, info) => sendToBack(item, info)}
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
                    transition: { duration: 0.24, ease: "easeIn" },
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  style={{ zIndex: visibleCards - index, touchAction: isTop ? "pan-y" : "auto" }}
                  whileDrag={isTop ? { scale: 1.035, rotate: 3, cursor: "grabbing" } : undefined}
                  aria-label={isTop ? "Drag this image sideways to send it to the back of the stack" : item.name}
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
