import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { ai } from "../data/sigs/ai";
import { cyber } from "../data/sigs/cyber";
import { web } from "../data/sigs/web";
import { glitch } from "../data/sigs/glitch";

const missions = [
  { data: ai, image: "/assets/aiBg.png", station: "01 / INTELLIGENCE" },
  { data: cyber, image: "/assets/cyberBg.png", station: "02 / SECURITY" },
  { data: web, image: "/assets/webBg.png", station: "03 / DIGITAL SYSTEMS" },
  { data: glitch, image: "/assets/glitchBg.png", station: "04 / INTERACTIVE WORLDS" },
];

function MissionDetails({ mission, index }) {
  const reduceMotion = useReducedMotion();
  const { data } = mission;
  const description = data.description || data.tagline;

  return (
    <motion.div
      className="mission-sigs__details"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
    >
      <p className="mission-sigs__eyebrow">{mission.station}</p>
      <p className="mission-sigs__signal">{data.signal}</p>
      <h3>{data.fullName}</h3>
      <p className="mission-sigs__description">{description}</p>
      <Link className="mission-sigs__profile" href={`/sigs/${data.id}`}>
        Explore this SIG <FiArrowUpRight aria-hidden="true" />
      </Link>
      <span className="mission-sigs__readout">CHANNEL {String(index + 1).padStart(2, "0")} / 04</span>
    </motion.div>
  );
}

export default function SigMissionExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    let observer;
    const observeTriggers = () => {
      observer?.disconnect();
      observer = undefined;
      if (!desktop.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActiveIndex(Number(visible.target.dataset.missionIndex));
        },
        { rootMargin: "-44% 0px -44% 0px", threshold: 0 }
      );
      document.querySelectorAll(".mission-sigs__trigger").forEach((trigger) => {
        observer.observe(trigger);
      });
    };

    observeTriggers();
    desktop.addEventListener("change", observeTriggers);
    return () => {
      desktop.removeEventListener("change", observeTriggers);
      observer?.disconnect();
    };
  }, []);

  const selectMission = (index) => {
    document
      .querySelector(`[data-mission-index="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="mission-sigs" id="what-we-do" aria-labelledby="mission-sigs-title">
      <div className="mission-sigs__stage">
        <div className="mission-sigs__room" aria-hidden="true">
          <div className="mission-sigs__stars mission-sigs__stars--distant" />
          <div className="mission-sigs__stars mission-sigs__stars--near" />
          <div className="mission-sigs__window">
            <AnimatePresence initial={false}>
              <motion.img
                animate={{ opacity: 0.62, scale: 1 }}
                alt=""
                exit={{ opacity: 0 }}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
                key={missions[activeIndex].data.id}
                src={missions[activeIndex].image}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
              />
            </AnimatePresence>
            <div className="mission-sigs__window-wash" />
            <svg viewBox="0 0 800 420" preserveAspectRatio="none">
              <path d="M0 28H800M0 392H800M26 0V420M774 0V420M0 28 46 0M754 0 800 28M0 392 46 420M754 420 800 392" />
              <path d="M400 0V420M0 210H800" className="mission-sigs__crosshair" />
            </svg>
          </div>
          <div className="mission-sigs__console">
            <span />
            <span />
            <span />
          </div>
          <div className="mission-sigs__room-label">AMRITAPURI / OBSERVATION BAY</div>
        </div>

        <div className="mission-sigs__content section-shell">
          <div className="mission-sigs__heading">
            <p className="mission-sigs__kicker">[ SIG FIELD GUIDE / 2026 ]</p>
            <h2 id="mission-sigs-title">Four labs.<br /><span>Infinite directions.</span></h2>
            <p>Small, focused communities where students learn by building, researching, and sharing what they discover.</p>
          </div>

          <div className="mission-sigs__display" aria-live="polite" aria-atomic="true">
            <div className="mission-sigs__display-rule">
              <span>ACM AMRITAPURI / SPECIAL INTEREST GROUPS</span>
              <span>LIVE SIGNAL</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <MissionDetails
                key={missions[activeIndex].data.id}
                mission={missions[activeIndex]}
                index={activeIndex}
              />
            </AnimatePresence>
            <nav className="mission-sigs__index" aria-label="Select a special interest group">
              {missions.map((mission, index) => (
                <button
                  aria-current={index === activeIndex ? "step" : undefined}
                  aria-label={`Show ${mission.data.fullName}`}
                  className={index === activeIndex ? "is-active" : ""}
                  key={mission.data.id}
                  onClick={() => selectMission(index)}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i />
                </button>
              ))}
            </nav>
          </div>

          <p className="mission-sigs__scroll-note"><span /> SCROLL TO MOVE THROUGH THE LABS</p>
        </div>

        <div className="mission-sigs__frame" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="mission-sigs__triggers" aria-hidden="true">
        {missions.map((mission, index) => (
          <div
            className="mission-sigs__trigger"
            data-mission-index={index}
            key={mission.data.id}
          />
        ))}
      </div>

      <div className="mission-sigs__mobile section-shell">
        <p className="mission-sigs__kicker">[ SIG FIELD GUIDE / 2026 ]</p>
        <h2>Four labs.<br /><span>Infinite directions.</span></h2>
        <p className="mission-sigs__mobile-intro">Small, focused communities where students learn by building, researching, and sharing what they discover.</p>
        {missions.map((mission, index) => (
          <article className="mission-sigs__mobile-card" key={mission.data.id}>
            <img src={mission.image} alt="" loading="lazy" />
            <div>
              <p className="mission-sigs__eyebrow">{mission.station}</p>
              <h3>{mission.data.fullName}</h3>
              <p>{mission.data.description || mission.data.tagline}</p>
              <Link className="mission-sigs__profile" href={`/sigs/${mission.data.id}`}>
                Explore this SIG <FiArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <span className="mission-sigs__mobile-number">{String(index + 1).padStart(2, "0")}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
