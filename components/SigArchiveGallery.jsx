import { useEffect, useRef } from "react";

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

export default function SigArchiveGallery() {
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const section = stage.closest(".sig-gallery");
    let progress = 0;
    let targetProgress = 0;
    let frame = 0;
    let isVisible = false;
    let lastWheel = 0;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (entry.intersectionRatio >= 0.25) {
        section?.classList.add("sig-gallery--entered");
      }
    }, { threshold: [0, 0.25, 0.6] });
    observer.observe(section || stage);

    const updateCards = () => {
      progress += (targetProgress - progress) * 0.09;
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const offset = index - progress;
        const abs = Math.abs(offset);
        const visible = abs < 3.2;
        const side = Math.sign(offset);
        const x = offset * 39;
        const y = Math.abs(offset) * 5.5;
        const z = -abs * 150;
        const rotateY = side * -27;
        const rotateZ = side * (Math.min(abs, 2) * 2.8);
        const scale = Math.max(0.58, 1 - abs * 0.13);
        card.style.opacity = visible ? String(Math.max(0, 1 - abs * 0.27)) : "0";
        card.style.visibility = visible ? "visible" : "hidden";
        card.style.zIndex = String(100 - Math.round(abs * 10));
        card.style.transform = `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}px), ${z}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        card.style.pointerEvents = abs < 0.48 ? "auto" : "none";
      });

      if (hintRef.current) {
        hintRef.current.style.opacity = targetProgress >= galleryItems.length - 1 ? "0" : "";
      }
      frame = requestAnimationFrame(updateCards);
    };

    const onWheel = (event) => {
      if (!isVisible) return;
      const rect = stage.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const direction = Math.sign(event.deltaY);
      const atStart = targetProgress <= 0 && direction < 0;
      const atEnd = targetProgress >= galleryItems.length - 1 && direction > 0;
      if (atStart || atEnd) return;

      event.preventDefault();
      const now = performance.now();
      const delta = Math.max(-120, Math.min(120, event.deltaY));
      targetProgress = Math.max(0, Math.min(galleryItems.length - 1, targetProgress + delta * 0.004));
      lastWheel = now;
    };

    const onKeyDown = (event) => {
      if (!isVisible) return;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        targetProgress = Math.min(galleryItems.length - 1, targetProgress + 0.35);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        targetProgress = Math.max(0, targetProgress - 0.35);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    frame = requestAnimationFrame(updateCards);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <section className="sig-gallery" aria-label="ACM Amritapuri angled image gallery">
      <div className="sig-gallery__stage" ref={stageRef}>
        <div className="sig-gallery__intro" aria-hidden="true">
          <h2 className="sig-gallery__title"><span ref={titleRef}>GALLERY</span></h2>
        </div>
        <div className="sig-gallery__angled-scene">
          {galleryItems.map((item, index) => (
            <figure
              className="sig-gallery__angled-card"
              key={item.src}
              ref={(node) => { cardsRef.current[index] = node; }}
            >
              <img src={item.src} alt={item.name} draggable="false" />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="sig-gallery__hint" ref={hintRef}>SCROLL TO EXPLORE <span aria-hidden="true">/</span> ACM AMRITAPURI</p>
      </div>
    </section>
  );
}
