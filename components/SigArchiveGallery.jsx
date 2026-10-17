import { useEffect, useRef, useState } from "react";

const galleryColumns = [
  [
    { name: "Epochon 2.0 hackathon", src: "/assets/aiEvents/epochon 2.0.jpeg", shape: "landscape" },
    { name: "Active Directory workshop", src: "/assets/workshops/active-directory-1.jpeg", shape: "portrait" },
    { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/2.jpeg", shape: "landscape" },
    { name: "Agentic AI workshop", src: "/assets/aiEvents/agentic ai workshop.jpeg", shape: "portrait" },
    { name: "Web SIG exploration", src: "/assets/webexplorations/3.jpeg", shape: "landscape" },
    { name: "ACM Amritapuri chapter team", src: "/assets/ACM-Pics/team-photo.jpg", shape: "landscape" },
  ],
  [
    { name: "ISEA cybersecurity workshop", src: "/assets/cyberworkshops/1.jpeg", shape: "landscape" },
    { name: "Active Directory workshop", src: "/assets/workshops/active-directory-2.jpeg", shape: "portrait" },
    { name: "Cybersecurity exploration", src: "/assets/cyberExplorations/4.jpeg", shape: "landscape" },
    { name: "Glitch SIG exploration", src: "/assets/glitchExplorations/3.jpg", shape: "portrait" },
    { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/4.jpeg", shape: "landscape" },
    { name: "Epochon 2.0 hackathon", src: "/assets/aiEvents/epochon 2.0.jpeg", shape: "landscape" },
  ],
  [
    { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/hero.jpeg", shape: "landscape" },
    { name: "Active Directory workshop", src: "/assets/workshops/active-directory-3.jpeg", shape: "portrait" },
    { name: "Web SIG exploration", src: "/assets/webexplorations/5.jpeg", shape: "landscape" },
    { name: "Agentic AI workshop", src: "/assets/aiEvents/agentic ai workshop.jpeg", shape: "portrait" },
    { name: "Cybersecurity exploration", src: "/assets/cyberExplorations/6.jpeg", shape: "landscape" },
    { name: "ACM Amritapuri chapter team", src: "/assets/ACM-Pics/team-photo.jpg", shape: "landscape" },
  ],
];
const photos = galleryColumns.flat();

export default function SigArchiveGallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;
        const available = Math.max(1, track.scrollWidth - window.innerWidth);
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        const travelled = Math.min(distance, Math.max(0, -section.getBoundingClientRect().top));
        setProgress(Math.min(1, travelled / distance));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="sig-gallery" aria-label="ACM Amritapuri event photo gallery">
      <div className="sig-gallery__sticky">
        <h2 className="sig-gallery__title">GALLERY</h2>
        <div className="sig-gallery__viewport">
          <div
            ref={trackRef}
            className="sig-gallery__track"
            style={{ transform: `translate3d(${-progress * Math.max(0, (photos.length * 310) - window.innerWidth)}px, 0, 0)` }}
          >
            {photos.map((photo, index) => (
              <figure className={`sig-gallery__frame sig-gallery__frame--${photo.shape}`} key={`${photo.src}-${index}`}>
                <div className="sig-gallery__image">
                  <img alt={photo.name} decoding="async" draggable="false" loading={index > 2 ? "lazy" : "eager"} src={photo.src} />
                </div>
              </figure>
            ))}
          </div>
        </div>
        <p className="sig-gallery__hint">SCROLL TO EXPLORE <span aria-hidden="true">→</span></p>
      </div>
    </section>
  );
}