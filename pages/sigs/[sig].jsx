
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import TataBreach from "../../components/Tatabreach";
import Domains from "../../components/Domains";
import Works from "../../components/Works";
import CyberWorks from "../../components/CyberWorks";
import Explorations from "../../components/Explorations";
import Members from "../../components/Members";
import Web3DBackground from "../../components/Web3DBackground";
import Events from "../../components/Events";
import Stats from "../../components/Stats";
import Achievements from "../../components/Achievements";
import InternshipsAndPapers from "../../components/papersandinternship";
import WhyJoin from "../../components/WhyJoin";
import Manifesto from "../../components/Manifesto";
import Contact from "../../components/Contact";
import Spores from "../../components/Spores";
import StrangerWidgets from "../../components/StrangerWidgets";
import { ai } from "../../data/sigs/ai";
import { web } from "../../data/sigs/web";
import { cyber } from "../../data/sigs/cyber";
import { glitch } from "../../data/sigs/glitch";

const sigs = [
  {
    ...ai,
    id: "ai",
    code: "AI / 01",
    title: "Artificial Intelligence",
    text: ai.description || ai.tagline,
    focus: ["ML foundations", "Applied AI", "Research"],
  },
  {
    ...web,
    id: "web",
    code: "DEV / 02",
    title: "Web & App",
    text: web.description || web.tagline,
    focus: ["Frontend", "Backend", "Mobile"],
  },
  {
    ...cyber,
    id: "cyber",
    code: "CYBER / 03",
    title: "Cybersecurity",
    text: cyber.description || cyber.tagline,
    focus: ["CTFs", "Web security", "Forensics"],
  },
  {
    ...glitch,
    id: "glitch",
    code: "GAME / 04",
    title: "Glitch",
    text: glitch.description || glitch.tagline,
    focus: ["Unity", "Design", "Creative code"],
  },
];

function ControlRoom({ mission, index, progress }) {
  return (
    <div className={`sigc-room sigc-room-${mission.id}`} aria-hidden="true">
      <div className="sigc-starfield" />

      <div className="sigc-window">
        <div className="sigc-window-grid" />
        <div className="sigc-horizon" />
      </div>

      <div className="sigc-room-beam sigc-beam-left" />
      <div className="sigc-room-beam sigc-beam-right" />

      <div className="sigc-console sigc-console-left">
        <span className="sigc-console-caption">ACM / CONTROL</span>
        <div className="sigc-console-lines">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="sigc-status-lights">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="sigc-console sigc-console-right">
        <span className="sigc-console-caption">MISSION STATUS</span>
        <div className="sigc-mini-display">
          <div className="sigc-mini-ring">
            <span>{mission.code}</span>
          </div>
        </div>
        <div className="sigc-console-lines">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="sigc-workstation">
        <div className="sigc-monitor sigc-monitor-main">
          <div className="sigc-monitor-header">
            <span>MISSION DISPLAY</span>
            <span>CHANNEL {mission.code}</span>
          </div>

          <div className="sigc-monitor-screen">
            <div className="sigc-screen-grid" />

            {mission.id === "ai" && (
              <div className="sigc-neural">
                {Array.from({ length: 15 }, (_, i) => (
                  <i key={i} className={`sigc-node sigc-node-${i + 1}`} />
                ))}
                <span>NEURAL NETWORK / 01</span>
              </div>
            )}

            {mission.id === "web" && (
              <div className="sigc-code">
                <span>01 &nbsp; const project = createApp();</span>
                <span>02 &nbsp; project.design();</span>
                <span>03 &nbsp; project.build();</span>
                <span>04 &nbsp; project.deploy();</span>
                <span>05 &nbsp; // shipped successfully</span>
              </div>
            )}

            {mission.id === "cyber" && (
              <div className="sigc-security">
                <div className="sigc-security-ring">
                  <span>SECURE</span>
                </div>
                <div className="sigc-security-bars">
                  {Array.from({ length: 8 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
              </div>
            )}

            {mission.id === "glitch" && (
              <div className="sigc-game">
                <div className="sigc-game-grid" />
                <div className="sigc-game-object" />
                <span>PLAYER 01 / READY</span>
              </div>
            )}
          </div>

          <div className="sigc-monitor-footer">
            <i />
            SYSTEM ONLINE
          </div>
        </div>

        <div className="sigc-monitor sigc-monitor-small">
          <div className="sigc-monitor-header">
            <span>TELEMETRY</span>
            <span>LIVE</span>
          </div>
          <div className="sigc-telemetry">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>

        <div className="sigc-desk">
          <div className="sigc-desk-edge" />
          <div className="sigc-keyboard">
            {Array.from({ length: 3 }, (_, row) => (
              <div key={row}>
                {Array.from({ length: 12 }, (_, col) => (
                  <i key={col} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sigc-hud">
        <span>ACM AMRITAPURI</span>
        <span className="sigc-hud-divider" />
        <span>SPECIAL INTEREST GROUPS</span>
        <span className="sigc-hud-live">
          <i />
          LIVE SIGNAL
        </span>
      </div>

      <div className="sigc-hud-bottom">
        <span>MISSION {String(index + 1).padStart(2, "0")} / 04</span>
        <div>
          <i style={{ width: `${progress * 100}%` }} />
        </div>
        <span>{Math.round(progress * 100)}%</span>
      </div>
    </div>
  );
}

function MissionContent({ sig, index, onEnter }) {
  const markerRef = useRef(null);
  const missionSig = { ...sig, continuous: true };

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onEnter(index);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0,
      }
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, [index, onEnter]);

  return (
    <section
      className="sigc-mission"
      data-sig-id={sig.id}
      id={`sigc-${sig.id}`}
      aria-label={sig.title}
    >
      <div ref={markerRef} className="sigc-mission-marker">
        <span>{sig.code}</span>
        <span>{sig.title}</span>
      </div>

      <div className="sigc-existing-content">
        <div className="sigc-existing-hero">
          <Hero sig={missionSig} />
        </div>

        <TataBreach sig={missionSig} />
        <Domains sig={missionSig} />
        <WhyJoin sig={missionSig} />

        {sig.id === "cyber" ? (
          <CyberWorks sig={missionSig} />
        ) : (
          <Works sig={missionSig} />
        )}

        <Explorations sig={missionSig} />

        {sig.internships?.length > 0 && (
          <InternshipsAndPapers sig={missionSig} />
        )}

        {sig.events?.length > 0 && <Events sig={missionSig} />}

        <Achievements sig={missionSig} />
        <Manifesto sig={missionSig} />
        <Members sig={missionSig} />
        <Stats sig={missionSig} />
        <Contact sig={missionSig} />
      </div>
    </section>
  );
}

export default function RecruitmentPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTelekinesisActive, setIsTelekinesisActive] = useState(false);
  const [isUpsideDown, setIsUpsideDown] = useState(false);

  const [progress, setProgress] = useState(0);
  const activeSig = sigs[activeIndex];

  useEffect(() => {
    if (!router.isReady) return;

    // Every SIG route enters the same continuous experience at AI.
    window.scrollTo(0, 0);
    setActiveIndex(0);
    setProgress(0);
  }, [router.asPath, router.isReady]);

  useEffect(() => {
    let frame = null;

    const updateProgress = () => {
      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        setProgress(
          maxScroll > 0
            ? Math.max(0, Math.min(1, window.scrollY / maxScroll))
            : 0
        );

        frame = null;
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const handleMissionEnter = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const toggleTelekinesis = () => {
    setIsTelekinesisActive((value) => !value);
  };

  const jumpToMission = (index) => {
    const target = document.querySelector(
      `.sigc-mission[data-sig-id="${sigs[index].id}"]`
    );

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!router.isReady) return null;

  return (
    <div className={`sigc-page ${isUpsideDown ? "sigc-upside-down" : ""}`}>
      <div className="sigc-fixed-environment">
        <ControlRoom
          mission={activeSig}
          index={activeIndex}
          progress={progress}
        />
        <Web3DBackground sig={activeSig} />
      </div>

      <div className="sigc-top-navigation">
        <Navbar activeSection="home" continuous sigId={activeSig.id} />
        <Spores />
        <StrangerWidgets
          isTelekinesisActive={isTelekinesisActive}
          onToggleTelekinesis={toggleTelekinesis}
          isUpsideDown={isUpsideDown}
          onTogglePortal={() => setIsUpsideDown((value) => !value)}
        />
      </div>

      <main className="sigc-main">
        <section className="sigc-intro">
          <div className="sigc-intro-copy">
            <span>ACM AMRITAPURI / SIG OPERATIONS</span>
            <h1>
              Four labs.
              <br />
              <span>Infinite directions.</span>
            </h1>
            <p>
              Explore the people, projects, and ideas shaping our
              technology community.
            </p>

            <button
              type="button"
              className="sigc-enter-button"
              onClick={() => jumpToMission(0)}
            >
              ENTER OPERATIONS <span>↘</span>
            </button>
          </div>

          <div className="sigc-intro-index">
            <span>01 — 04</span>
            <span>AI / WEB / CYBER / GLITCH</span>
          </div>
        </section>

        <nav className="sigc-mission-nav" aria-label="SIG missions">
          {sigs.map((sig, index) => (
            <button
              type="button"
              key={sig.id}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => jumpToMission(index)}
            >
              <span>{sig.code}</span>
              <span>{sig.title}</span>
              <i />
            </button>
          ))}
        </nav>

        {sigs.map((sig, index) => (
          <MissionContent
            key={sig.id}
            sig={sig}
            index={index}
            onEnter={handleMissionEnter}
          />
        ))}
      </main>
    </div>
  );
}
