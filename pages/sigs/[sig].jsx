import { useCallback, useEffect, useRef, useState } from "react";
import GlitchTitle from "../../components/GlitchTitle";
import ControlRoom from "../../components/ControlRoom";
import SpaceShooter from "../../components/SpaceShooter";
import Navbar from "../../components/Navbar";
import SigArchiveGallery from "../../components/SigArchiveGallery";
import NeuralNetworkBackground from "../../components/NeuralNetworkBackground";
import { ai } from "../../data/sigs/ai";
import { web } from "../../data/sigs/web";
import { cyber } from "../../data/sigs/cyber";
import { glitch } from "../../data/sigs/glitch";

const missions = [
  { id: "ai", index: 0, label: "AI", title: "Artificial Intelligence", station: "AI / 01", signal: ai.signal, data: ai },
  { id: "web", index: 1, label: "Web", title: "Web & App", station: "WEB / 02", signal: web.signal, data: web },
  { id: "cyber", index: 2, label: "Cyber", title: "Cybersecurity", station: "CYBER / 03", signal: cyber.signal, data: cyber },
  { id: "glitch", index: 3, label: "Glitch", title: "Glitch Gaming", station: "GLITCH / 04", signal: glitch.signal, data: glitch },
];

const contactLinks = [
  { label: "GitHub", href: "https://github.com/ACM-Amrita-Amritapuri" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/acm-student-chapter-amrita-amritapuri/" },
  { label: "Instagram", href: "https://www.instagram.com/acm.amrita/" },
  { label: "Facebook", href: "https://www.facebook.com/acm.amrita" },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="sigc-section-heading">
      {eyebrow && <p className="sigc-eyebrow">{eyebrow}</p>}
      <h3>{title}</h3>
      {description && <p className="sigc-section-description">{description}</p>}
    </header>
  );
}

function AIAnimatedTitle() {
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = titleRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const links = Array.from({ length: 112 }, (_, index) => {
    const x1 = 4 + (index % 15) * 20;
    const y1 = 6 + (Math.floor(index / 15) % 6) * 21;
    const x2 = Math.max(3, Math.min(297, x1 + (((index * 7) % 49) - 24)));
    const y2 = Math.max(3, Math.min(117, y1 + ((index % 7) - 3) * 13));
    return { x1, y1, x2, y2, delay: (index * 0.055).toFixed(3) };
  });
  const nodes = Array.from({ length: 78 }, (_, index) => ({
    x: 4 + ((index * 47) % 292),
    y: 4 + ((index * 31) % 112),
    delay: ((index % 26) * 0.035).toFixed(3),
    radius: index % 5 === 0 ? 1.9 : 1.2,
  }));

  return (
    <div ref={titleRef} className={`sigc-ai-network-wordmark${isVisible ? " is-visible" : ""}`} role="img" aria-label="Artificial Intelligence">
      <svg viewBox="0 0 300 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <mask id="sigc-ai-title-mask">
            <rect width="300" height="120" fill="black" />
            <text x="150" y="52" textAnchor="middle" className="sigc-ai-title-mask-text">ARTIFICIAL</text>
            <text x="150" y="101" textAnchor="middle" className="sigc-ai-title-mask-text">INTELLIGENCE</text>
          </mask>
          <linearGradient id="sigc-ai-network-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#398DFF" />
            <stop offset="52%" stopColor="#56DCE0" />
            <stop offset="100%" stopColor="#D9FAFF" />
          </linearGradient>
        </defs>
        <g className="sigc-ai-title-particles" aria-hidden="true">
          {nodes.map((node, index) => {
            const startX = (index * 71 + 19) % 300;
            const startY = (index * 43 + 7) % 120;
            return (
              <circle key={`particle-${index}`} cx={startX} cy={startY} r={node.radius}
                className="sigc-ai-title-particle">
                <animate attributeName="cx" from={startX} to={node.x} dur="1.5s" begin={`${(index % 18) * 0.05}s`} fill="freeze" />
                <animate attributeName="cy" from={startY} to={node.y} dur="1.5s" begin={`${(index % 18) * 0.05}s`} fill="freeze" />
                <animate attributeName="opacity" values="0;0.95;0.45" keyTimes="0;0.7;1" dur="1.5s" begin={`${(index % 18) * 0.05}s`} fill="freeze" />
              </circle>
            );
          })}
        </g>
        <g mask="url(#sigc-ai-title-mask)" className="sigc-ai-network-ink">
          <rect width="300" height="120" fill="#e9fcff" opacity="0.035" />
          {links.map((link, index) => (
            <line key={`link-${index}`} x1={link.x1} y1={link.y1} x2={link.x2} y2={link.y2}
              pathLength="1" className="sigc-ai-title-link" style={{ "--title-delay": `${link.delay}s` }} />
          ))}
          {nodes.map((node, index) => (
            <circle key={`node-${index}`} cx={node.x} cy={node.y} r={node.radius}
              className="sigc-ai-title-node" style={{ "--title-delay": `${node.delay}s` }} />
          ))}
          <rect className="sigc-ai-title-scan" x="-300" y="0" width="300" height="120" fill="url(#sigc-ai-network-gradient)" />
        </g>
        <g className="sigc-ai-title-outline" aria-hidden="true">
          <text x="150" y="52" textAnchor="middle" className="sigc-ai-title-outline-text">ARTIFICIAL</text>
          <text x="150" y="101" textAnchor="middle" className="sigc-ai-title-outline-text">INTELLIGENCE</text>
        </g>
      </svg>
      <span className="sigc-ai-network-wordmark__accessible">Artificial Intelligence</span>
    </div>
  );
}

function isMediaReference(value) {
  return typeof value === "string" &&
    (/^['"]?\$\{BASE\}/.test(value) ||
      /\/assets\//i.test(value) ||
      /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i.test(value));
}

function RecordCards({ records, type }) {
  if (!Array.isArray(records) || records.length === 0) return null;

  return (
    <div className={`sigc-record-grid sigc-record-grid-${type}`}>
      {records.map((record, index) => {
        const values = Array.isArray(record)
          ? record
          : [record.title, record.description, record.tags];
        const title = values[0];
        const description = type === "events" ? values[4] : values[1];
        const metadata = type === "members"
          ? values.slice(2)
          : type === "events"
            ? values.slice(1, 3)
            : type === "papers"
              ? values.slice(1)
              : type === "internships"
                ? values.slice(1, 3)
                : values[2];
        const tags = Array.isArray(metadata) && type !== "members" &&
          type !== "events" && type !== "papers" && type !== "internships"
          ? metadata
          : [];
        const details = Array.isArray(metadata) && tags.length === 0
          ? metadata.filter((value) => typeof value === "string" && !isMediaReference(value))
          : [];
        const detailText = typeof metadata === "string" ? metadata : null;
        const visibleDescription =
          typeof description === "string" && !isMediaReference(description)
            ? description
            : null;

        return (
          <article className="sigc-record" key={`${type}-${index}`}>
            {title && <h4>{title}</h4>}
            {visibleDescription && <p>{visibleDescription}</p>}
            {detailText && <p className="sigc-record-detail">{detailText}</p>}
            {details.length > 0 && (
              <p className="sigc-record-detail">{details.join(" / ")}</p>
            )}
            {tags.length > 0 && (
              <ul className="sigc-tags">
                {tags.filter((tag) => typeof tag === "string").map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}

function DomainExplorer({ mission }) {
  const domains = Array.isArray(mission.data.domains) ? mission.data.domains : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef(null);
  const screenRef = useRef(null);
  const activeIndexRef = useRef(0);
  const triggerRef = useRef(null);

  const setActiveDomain = useCallback((index) => {
    const nextIndex = Math.max(0, Math.min(domains.length - 1, index));
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, [domains.length]);

  const setDomain = useCallback((index) => {
    const nextIndex = Math.max(0, Math.min(domains.length - 1, index));
    const trigger = triggerRef.current;
    if (!trigger || domains.length < 2) {
      setActiveDomain(nextIndex);
      return;
    }
    const startY = trigger.start;
    const travel = trigger.end - trigger.start;
    const targetY = startY + (nextIndex / (domains.length - 1)) * travel;
    window.scrollTo({
      top: targetY,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [domains.length, setActiveDomain]);

  useEffect(() => {
    activeIndexRef.current = 0;
    setActiveIndex(0);
  }, [mission.id]);

  useEffect(() => {
    const stage = stageRef.current;
    const screen = screenRef.current;
    if (!stage || !screen || domains.length < 2) return undefined;

    let disposed = false;
    let trigger;

    const setup = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      trigger = ScrollTrigger.create({
        trigger: stage,
        pin: screen,
        start: "top top",
        end: () => "+=" + window.innerHeight * 0.6 * (domains.length - 1),
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            domains.length - 1,
            Math.round(self.progress * (domains.length - 1))
          );
          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        },
      });
      triggerRef.current = trigger;
      ScrollTrigger.refresh();
    };

    setup();
    return () => {
      disposed = true;
      trigger?.kill();
      triggerRef.current = null;
    };
  }, [domains.length, mission.id]);

  if (!domains.length) return null;
  const activeDomain = domains[activeIndex] || domains[0];
  const activeValues = Array.isArray(activeDomain)
    ? activeDomain
    : [activeDomain.title, activeDomain.description, activeDomain.tags];
  const activeTags = Array.isArray(activeValues[2]) ? activeValues[2] : [];

  return (
    <div className="sigc-domain-scroll-stage" ref={stageRef}>
      <div className="sigc-domain-scroll-screen" ref={screenRef}>
        <SectionHeading title="Domains" />
        <div className="sigc-domain-explorer">
          <div className="sigc-domain-list" aria-label="Domain topics">
            {domains.map((domain, index) => {
              const values = Array.isArray(domain)
                ? domain
                : [domain.title, domain.description, domain.tags];
              const isActive = index === activeIndex;
              return (
                <button
                  className={`sigc-domain-topic${isActive ? " is-active" : ""}`}
                  key={values[0] || index}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setDomain(index)}
                >
                  <span className="sigc-domain-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="sigc-domain-topic-title">{values[0]}</span>
                </button>
              );
            })}
          </div>
          <aside className="sigc-domain-detail" aria-live="polite" aria-atomic="true">
            <h4 key={activeValues[0]}>{activeValues[0]}</h4>
            <p className="sigc-domain-description">{activeValues[1]}</p>
            {activeTags.length > 0 && (
              <div className="sigc-domain-tools">
                <p className="sigc-domain-tools-label">TOOLS & CONCEPTS</p>
                <ul className="sigc-tags">
                  {activeTags.filter((tag) => typeof tag === "string").map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function StructuredData({ value }) {
  if (value == null || value === "") return null;

  if (Array.isArray(value)) {
    const entries = value.filter((entry) => entry != null && entry !== "");
    if (entries.length === 0) return null;

    return (
      <ul className="sigc-structured-list">
        {entries.map((entry, index) => (
          <li key={`entry-${index}`}>
            {Array.isArray(entry)
              ? entry.filter((part) => !isMediaReference(part)).join(" — ")
              : typeof entry === "object"
                ? <StructuredData value={entry} />
                : String(entry)}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value).filter(([, entry]) => {
      if (entry == null || entry === "") return false;
      return !Array.isArray(entry) || entry.length > 0;
    });
    if (entries.length === 0) return null;

    return (
      <div className="sigc-structured-grid">
        {entries.map(([key, entry]) => (
          <div className="sigc-structured-item" key={key}>
            <h4>{key.replace(/([A-Z])/g, " $1").replace(/^\w/, (char) => char.toUpperCase())}</h4>
            <StructuredData value={entry} />
          </div>
        ))}
      </div>
    );
  }

  return <p>{String(value)}</p>;
}

function StorySection({ mission }) {
  const story = mission.data.breachStory;
  if (!story) return null;

  return (
    <section className="sigc-content-section" id={`${mission.id}-briefing`}>
      <SectionHeading
        eyebrow={story.eyebrow || "FIELD BRIEFING"}
        title={story.title}
      />
      {Array.isArray(story.questions) && story.questions.length > 0 && (
        <ul className="sigc-briefing-list">
          {story.questions.map((question, index) => <li key={index}>{question}</li>)}
        </ul>
      )}
      {Array.isArray(story.paragraphs) && story.paragraphs.length > 0 && (
        <div className="sigc-briefing-copy">
          {story.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      )}
      {Array.isArray(story.stats) && story.stats.length > 0 && (
        <RecordCards records={story.stats} type="briefing" />
      )}
    </section>
  );
}

function MissionContent({ mission }) {
  const { data } = mission;
  const overview = data.heroStory;
  const achievements = data.achievements || data.metrics;

  return (
    <section
      className="sigc-mission"
      id={`sigc-mission-${mission.id}`}
      data-sigc-mission={mission.id}
      aria-labelledby={`${mission.id}-title`}
    >
      {mission.id === "glitch" && <div className="sigc-glitch-star-animation" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>}
      <span className="sigc-mission-marker" data-sigc-marker={mission.id} />
      <div className="sigc-mission-inner">
        <header className="sigc-mission-header">
          {mission.id === "ai" && <NeuralNetworkBackground />}
          {mission.id === "ai" ? <div id="ai-title" className="sigc-ai-title-heading"><AIAnimatedTitle /></div> : <h2 id={`${mission.id}-title`}>{mission.id === "glitch" ? <GlitchTitle>{mission.title}</GlitchTitle> : mission.title}</h2>}
          {mission.id === "glitch" && <div className="sigc-glitch-title-game-background" aria-hidden="true"><SpaceShooter /></div>}
          {mission.id !== "glitch" && (
            <>
              {overview?.title && <p className="sigc-overview-title">{overview.title}</p>}
              <p className="sigc-mission-tagline">{data.tagline}</p>
              {overview?.lines?.map((line, index) => <p className="sigc-overview-copy" key={index}>{line}</p>)}
              {overview?.closing && <p className="sigc-overview-closing">{overview.closing}</p>}
              {data.description && <p className="sigc-overview-copy">{data.description}</p>}
            </>
          )}
        </header>

        <StorySection mission={mission} />

        {Array.isArray(data.domains) && data.domains.length > 0 && (
          <section className="sigc-content-section sigc-domain-section" id={`${mission.id}-domains`}>
            <DomainExplorer key={mission.id} mission={mission} />
          </section>
        )}

        {Array.isArray(data.projects) && data.projects.filter(Boolean).length > 0 && (
          <section className="sigc-content-section" id={`${mission.id}-projects`}>
            <SectionHeading
              eyebrow={data.worksEyebrow || "BUILDS & RESEARCH"}
              title={[data.worksHeadingPlain, data.worksHeadingHighlight].filter(Boolean).join(" ") || "Projects"}
              description={data.worksDescription}
            />
            <RecordCards records={data.projects.filter(Boolean)} type="projects" />
          </section>
        )}

        {Array.isArray(data.explorations) && data.explorations.filter(Boolean).length > 0 && (
          <section className="sigc-content-section" id={`${mission.id}-explorations`}>
            <SectionHeading
              eyebrow={data.explorationsEyebrow || "LAB NOTES"}
              title={[data.explorationsHeadingPlain, data.explorationsHeadingHighlight].filter(Boolean).join(" ") || "Explorations"}
              description={data.explorationsDescription}
            />
            <RecordCards records={data.explorations.filter(Boolean)} type="explorations" />
          </section>
        )}

        {Array.isArray(data.events) && data.events.length > 0 && (
          <section className="sigc-content-section" id={`${mission.id}-events`}>
            <SectionHeading
              eyebrow="GATHERINGS & WORKSHOPS"
              title={[data.eventsHeadingPlain, data.eventsHeadingHighlight].filter(Boolean).join(" ") || "Events"}
              description={data.eventsDescription}
            />
            <RecordCards records={data.events} type="events" />
          </section>
        )}

        {achievements && (
          <section className="sigc-content-section" id={`${mission.id}-achievements`}>
            <SectionHeading
              eyebrow={achievements.eyebrow || "FIELD RECORD"}
              title={[achievements.headingPlain, achievements.headingHighlight].filter(Boolean).join(" ") || "Achievements"}
              description={achievements.description}
            />
            <StructuredData value={achievements} />
          </section>
        )}

        {((data.internships?.length || 0) > 0 || (data.papers?.length || 0) > 0) && (
          <section className="sigc-content-section" id={`${mission.id}-experience`}>
            <SectionHeading eyebrow="CAREER & RESEARCH" title="Internships & papers" />
            {data.internships?.length > 0 && (
              <>
                <h4 className="sigc-subheading">Internships</h4>
                <RecordCards records={data.internships} type="internships" />
              </>
            )}
            {data.papers?.length > 0 && (
              <>
                <h4 className="sigc-subheading">Papers & publications</h4>
                <RecordCards records={data.papers} type="papers" />
              </>
            )}
          </section>
        )}

        {Array.isArray(data.benefits) && data.benefits.length > 0 && (
          <section className="sigc-content-section" id={`${mission.id}-why-join`}>
            <SectionHeading
              eyebrow={data.whyJoinHeading || "WHY JOIN"}
              title={data.whyJoinTitle || "Build with us"}
              description={data.whyJoinDescription}
            />
            <RecordCards records={data.benefits} type="benefits" />
          </section>
        )}

        {data.manifesto && (
          <section className="sigc-content-section" id={`${mission.id}-manifesto`}>
            <SectionHeading
              eyebrow={data.manifesto.eyebrow}
              title={[data.manifesto.headingPlain, data.manifesto.headingHighlight].filter(Boolean).join(" ") || "Our philosophy"}
            />
            <StructuredData value={data.manifesto} />
          </section>
        )}

        {Array.isArray(data.members) && data.members.length > 0 && (
          <section className="sigc-content-section" id={`${mission.id}-members`}>
            <SectionHeading eyebrow="THE PEOPLE" title="Meet the members" />
            {Array.isArray(data.classes) && data.classes.length > 0 && (
              <ul className="sigc-tags sigc-member-classes">
                {data.classes.map((role) => <li key={role}>{role}</li>)}
              </ul>
            )}
            <RecordCards records={data.members} type="members" />
          </section>
        )}


      </div>
    </section>
  );
}

export default function RecruitmentPage() {
  const [typedHeading, setTypedHeading] = useState("");
  const [activeSigId, setActiveSigId] = useState("ai");
  const [rocketFlight, setRocketFlight] = useState(false);
  const rocketTimeoutRef = useRef(null);

  useEffect(() => {
    const fullHeading = "WELCOME TO OUR SIGs.";
    const intro = document.querySelector("#sigc-intro");
    if (!intro || !("IntersectionObserver" in window)) {
      setTypedHeading(fullHeading);
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timeoutId = null;

    const replayWelcomeAnimation = () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (reducedMotion) {
        setTypedHeading(fullHeading);
        return;
      }

      let index = 0;
      setTypedHeading("");
      const typeNextCharacter = () => {
        index += 1;
        setTypedHeading(fullHeading.slice(0, index));
        if (index < fullHeading.length) {
          timeoutId = window.setTimeout(typeNextCharacter, 95);
        } else {
          timeoutId = null;
        }
      };
      timeoutId = window.setTimeout(typeNextCharacter, 220);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) replayWelcomeAnimation();
    }, { threshold: 0.2 });

    observer.observe(intro);
    return () => {
      observer.disconnect();
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);
  const galleryRef = useRef(null);
  const pendingMissionRef = useRef(null);
  const pendingMissionTimeoutRef = useRef(null);
  const selectMission = useCallback((id) => {
    const mission = missions.find((item) => item.id === id);
    if (!mission) return;

    if (id !== activeSigId && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRocketFlight(true);
      window.clearTimeout(rocketTimeoutRef.current);
      rocketTimeoutRef.current = window.setTimeout(() => setRocketFlight(false), 1150);
    }
    setActiveSigId(id);
    pendingMissionRef.current = id;
    window.clearTimeout(pendingMissionTimeoutRef.current);
    pendingMissionTimeoutRef.current = window.setTimeout(() => {
      pendingMissionRef.current = null;
    }, 2500);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`sigc-mission-${id}`)?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "start",
    });
  }, [activeSigId]);

  useEffect(() => () => window.clearTimeout(rocketTimeoutRef.current), []);

  useEffect(() => {
    // Replay each SIG's entrance animations whenever its section enters the viewport,
    // whether the user arrives by scrolling down or back up.
    const missions = Array.from(document.querySelectorAll(".sigc-mission-header"));
    if (!("IntersectionObserver" in window)) return undefined;

    const replayObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const header = entry.target;
        const section = header.closest(".sigc-mission");
        if (!section) return;
        section.dispatchEvent(new CustomEvent("sigc:mission-enter", { bubbles: true }));
        section.querySelectorAll("*").forEach((element) => {
          element.getAnimations().forEach((animation) => {
            try {
              animation.cancel();
              animation.play();
            } catch {
              // Ignore animations that cannot be restarted by the browser.
            }
          });
        });
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -18% 0px" });

    missions.forEach((section) => replayObserver.observe(section));

    return () => replayObserver.disconnect();
  }, []);

  useEffect(() => {
    const markers = document.querySelectorAll("[data-sigc-marker]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleMarkers = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        const visible = pendingMissionRef.current
          ? visibleMarkers.find((entry) => entry.target.dataset.sigcMarker === pendingMissionRef.current)
          : visibleMarkers[0];
        if (!visible) return;
        if (pendingMissionRef.current) {
          window.clearTimeout(pendingMissionTimeoutRef.current);
          pendingMissionRef.current = null;
        }
        setActiveSigId(visible.target.dataset.sigcMarker);
      },
      { rootMargin: "0px 0px -82% 0px", threshold: 0 }
    );

    markers.forEach((marker) => observer.observe(marker));
    const clearPendingSelection = () => {
      window.clearTimeout(pendingMissionTimeoutRef.current);
      pendingMissionRef.current = null;
    };
    window.addEventListener("wheel", clearPendingSelection, { passive: true });
    window.addEventListener("touchstart", clearPendingSelection, { passive: true });
    window.addEventListener("keydown", clearPendingSelection);
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", clearPendingSelection);
      window.removeEventListener("touchstart", clearPendingSelection);
      window.removeEventListener("keydown", clearPendingSelection);
      window.clearTimeout(pendingMissionTimeoutRef.current);
    };
  }, []);

  const enterOperations = () => selectMission("ai");

  return (
    <>
      {rocketFlight && (
        <div className="sigc-rocket-transition" aria-hidden="true">
          <span className="sigc-rocket-transition__trail" />
          <svg viewBox="0 0 64 64" role="presentation">
            <path d="M32 5C21 16 18 29 20 40l12 10 12-10C46 29 43 16 32 5Z" fill="#DDE4E8" />
            <circle cx="32" cy="27" r="6" fill="#0A1D2B" stroke="#7E9AA9" strokeWidth="2" />
            <path d="m20 34-10 9 1 10 13-7M44 34l10 9-1 10-13-7" fill="#9AAEB9" />
            <path d="M27 48h10l-5 12Z" fill="#FF914D" />
            <path d="M30 49h4l-2 7Z" fill="#FFF1C7" />
          </svg>
        </div>
      )}
      <Navbar
        sigMissionNavigation
        activeSigId={activeSigId}
        onSigSelect={selectMission}
      />
      <div className="sigc-page">
        <ControlRoom />
        <div className="sigc-page-content">
        <section className="sigc-intro" id="sigc-intro" aria-labelledby="sigc-intro-title">
          <div className="sigc-intro-copy">
            <h1 id="sigc-intro-title" aria-label="WELCOME TO OUR SIGs.">
              {typedHeading.length <= 7 ? (
                <>{typedHeading}<span className="sigc-typing-cursor" aria-hidden="true" /></>
              ) : (
                <>
                  WELCOME<br />
                  <span>{typedHeading.slice(8)}</span><span className="sigc-typing-cursor" aria-hidden="true" />
                </>
              )}
            </h1>
            <p className="sigc-intro-summary">
              Four student communities. One shared workspace for learning, research, and building technology together.
            </p>
            <button className="sigc-enter-button" onClick={enterOperations} type="button">
              Enter operations <span aria-hidden="true">↓</span>
            </button>
          </div>
          <div className="sigc-intro-gallery" ref={galleryRef}>
            <SigArchiveGallery />
          </div>
        </section>

        {missions.map((mission) => (
          <MissionContent key={mission.id} mission={mission} />
        ))}

        <footer className="sigc-page-footer">
          <span>ACM AMRITAPURI</span>
          <span>LEARN / BUILD / SHARE</span>
        </footer>
        </div>
      </div>
    </>
  );
}
