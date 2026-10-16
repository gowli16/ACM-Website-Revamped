
import { useEffect, useState } from "react";

const missions = [
  {
    number: "01",
    name: "Artificial Intelligence",
    label: "AI SPECIAL INTEREST GROUP",
    description:
      "Explore machine learning, intelligent systems, and the ideas shaping how we build the future.",
    details: "LEARN / EXPERIMENT / BUILD",
    monitor: "ai",
  },
  {
    number: "02",
    name: "Web Development",
    label: "WEB SPECIAL INTEREST GROUP",
    description:
      "Design and build for the web. Explore frontend development, backend systems, and full-stack applications.",
    details: "DESIGN / DEVELOP / DEPLOY",
    monitor: "web",
  },
  {
    number: "03",
    name: "Cyber Security",
    label: "CYBER SECURITY SPECIAL INTEREST GROUP",
    description:
      "Understand vulnerabilities, explore network security, and learn how to build and defend secure systems.",
    details: "ANALYSE / DEFEND / SECURE",
    monitor: "cyber",
  },
  {
    number: "04",
    name: "Glitch Gaming",
    label: "GLITCH GAMING SPECIAL INTEREST GROUP",
    description:
      "Explore game development, interactive experiences, creative coding, and the technology behind games.",
    details: "PLAY / CREATE / EXPLORE",
    monitor: "glitch",
  },
];

export default function SIGPage() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = document.querySelector(".sig-page .sig-scroll-track");
    if (!track) return;

    let frame = null;

    const update = () => {
      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        const rect = track.getBoundingClientRect();
        const scrollable = track.offsetHeight - window.innerHeight;

        const travelled = Math.max(
          0,
          Math.min(scrollable, -rect.top)
        );

        const amount = scrollable > 0 ? travelled / scrollable : 0;
        const index = Math.min(
          missions.length - 1,
          Math.floor(amount * missions.length)
        );

        setProgress(amount);
        setActive(index);
        frame = null;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  const mission = missions[active];

  return (
    <main className="sig-page">
      <section className="sig-scroll-track">
        <div className="sig-sticky-scene">
          <div
            className="sig-stars"
            style={{
              transform: `translate3d(0, ${progress * -70}px, 0)`,
            }}
          />

          <div className="sig-space-glow" />

          <div
            className="sig-room"
            style={{
              transform: `translate3d(0, ${progress * 24}px, 0) scale(${1 + progress * 0.025})`,
            }}
          >
            <div className="sig-window">
              <div className="sig-window-stars" />

              <div className="sig-window-planet">
                <div className="sig-planet-light" />
              </div>

              <div className="sig-window-grid" />
            </div>

            <div className="sig-room-frame sig-frame-top" />
            <div className="sig-room-frame sig-frame-left" />
            <div className="sig-room-frame sig-frame-right" />

            <div className="sig-side-console sig-console-left">
              <span className="sig-console-label">ACM / CONTROL</span>
              <div className="sig-console-screen">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="sig-console-lights">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="sig-workstation">
              <div className="sig-monitor monitor-main">
                <div className="sig-monitor-top">
                  <span>MISSION DISPLAY</span>
                  <span>ONLINE</span>
                </div>

                <div className={`sig-monitor-content content-${mission.monitor}`}>
                  {active === 0 && (
                    <div className="sig-neural-network">
                      {Array.from({ length: 15 }, (_, i) => (
                        <i key={i} style={{ "--i": i }} />
                      ))}
                      <span>MODEL / 01</span>
                    </div>
                  )}

                  {active === 1 && (
                    <div className="sig-code-display">
                      <span>01 &nbsp; const future =</span>
                      <span>02 &nbsp; buildSomething();</span>
                      <span>03 &nbsp; deploy(project);</span>
                      <span>04 &nbsp; // make it real</span>
                    </div>
                  )}

                  {active === 2 && (
                    <div className="sig-security-display">
                      <div className="sig-security-ring">
                        <span>SECURE</span>
                      </div>
                      <div className="sig-security-bars">
                        {Array.from({ length: 8 }, (_, i) => (
                          <i key={i} style={{ "--i": i }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {active === 3 && (
                    <div className="sig-game-display">
                      <div className="sig-game-grid" />
                      <div className="sig-game-object" />
                      <span>PLAYER 01 / READY</span>
                    </div>
                  )}
                </div>

                <div className="sig-monitor-bottom">
                  <i />
                  CHANNEL {mission.number}
                </div>
              </div>

              <div className="sig-monitor monitor-small">
                <span>STATUS</span>
                <div className="sig-small-bars">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="sig-desk">
                <div className="sig-desk-edge" />
                <div className="sig-keyboard">
                  {Array.from({ length: 4 }, (_, row) => (
                    <div key={row}>
                      {Array.from({ length: 12 }, (_, col) => (
                        <i key={col} />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="sig-desk-light" />
              </div>

              <div className="sig-desk-leg" />
            </div>
          </div>

          <div className="sig-top-label">
            <span>ACM AMRITAPURI</span>
            <span className="sig-top-divider" />
            <span>SPECIAL INTEREST GROUPS</span>
            <span className="sig-live">
              <i /> SYSTEM ONLINE
            </span>
          </div>

          <div className="sig-content-panel">
            <div className="sig-intro">
              <span className="sig-eyebrow">EXPLORE / EXPERIMENT / BUILD</span>

              <h1>
                Four labs.
                <br />
                <span>Infinite directions.</span>
              </h1>

              <p>
                Find your people, explore new ideas, and turn curiosity
                into something real.
              </p>
            </div>

            <div className="sig-active-content" key={mission.number}>
              <div className="sig-active-meta">
                <span>{mission.label}</span>
                <span className="sig-live-tag">LIVE SIGNAL</span>
              </div>

              <h2>{mission.name}</h2>
              <p>{mission.description}</p>

              <div className="sig-mission-details">
                {mission.details}
              </div>
            </div>

            <div className="sig-selector">
              {missions.map((item, index) => (
                <button
                  key={item.number}
                  className={
                    index === active ? "sig-selector-active" : ""
                  }
                  onClick={() => {
                    const track = document.querySelector(
                      ".sig-page .sig-scroll-track"
                    );

                    if (!track) return;

                    const start =
                      track.getBoundingClientRect().top + window.scrollY;

                    const range =
                      track.offsetHeight - window.innerHeight;

                    window.scrollTo({
                      top:
                        start +
                        (range * (index + 0.03)) / missions.length,
                      behavior: "smooth",
                    });
                  }}
                  aria-label={`View ${item.name}`}
                  aria-current={index === active ? "step" : undefined}
                >
                  <span>{item.number}</span>
                  <i />
                </button>
              ))}
            </div>

            <div className="sig-scroll-hint">
              <span className="sig-scroll-mouse">
                <i />
              </span>
              <span>SCROLL TO EXPLORE</span>
            </div>
          </div>

          <div className="sig-side-status">
            <span>AMRITAPURI / INDIA</span>
            <span>MISSION {mission.number} / 04</span>
            <div>
              <i style={{ width: `${progress * 100}%` }} />
            </div>
          </div>

          <div className="sig-bottom-line">
            <span>ACM STUDENT CHAPTER</span>
            <span>INDEPENDENT THINKING. COLLECTIVE BUILDING.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
