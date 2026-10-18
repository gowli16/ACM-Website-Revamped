import { useCallback, useEffect, useRef, useState } from "react";
import ControlRoom from "../../components/ControlRoom";
import SpaceShooter from "../../components/SpaceShooter";
import Navbar from "../../components/Navbar";
import SigArchiveGallery from "../../components/SigArchiveGallery";
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
  const explorerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const lastWheelChangeRef = useRef(0);

  const chooseDomain = useCallback((index) => {
    const nextIndex = Math.max(0, Math.min(domains.length - 1, index));
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, [domains.length]);

  useEffect(() => {
    activeIndexRef.current = 0;
    setActiveIndex(0);
  }, [mission.id]);

  useEffect(() => {
    if (domains.length < 2) return undefined;

    const handleWheel = (event) => {
      const explorer = explorerRef.current;
      if (!explorer || Math.abs(event.deltaY) < 8) return;
      const rect = explorer.getBoundingClientRect();
      const inExplorer = rect.top <= window.innerHeight * 0.55 &&
        rect.bottom >= window.innerHeight * 0.45;
      if (!inExplorer) return;

      const currentIndex = activeIndexRef.current;
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;
      const canChange = nextIndex >= 0 && nextIndex < domains.length;
      if (!canChange) return;

      // Prevent the document from moving while changing between domain topics.
      event.preventDefault();
      const now = Date.now();
      if (now - lastWheelChangeRef.current < 420) return;
      lastWheelChangeRef.current = now;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [domains.length]);

  if (!domains.length) return null;
  const activeDomain = domains[activeIndex] || domains[0];
  const activeValues = Array.isArray(activeDomain)
    ? activeDomain
    : [activeDomain.title, activeDomain.description, activeDomain.tags];
  const activeTags = Array.isArray(activeValues[2]) ? activeValues[2] : [];

  return (
    <div className="sigc-domain-explorer" ref={explorerRef}>
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
              onClick={() => chooseDomain(index)}
            >
              <span className="sigc-domain-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="sigc-domain-topic-title">{values[0]}</span>
            </button>
          );
        })}
      </div>
      <aside className="sigc-domain-detail" aria-live="polite" aria-atomic="true">
        <p className="sigc-eyebrow">DOMAIN / {String(activeIndex + 1).padStart(2, "0")}</p>
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
      <span className="sigc-mission-marker" data-sigc-marker={mission.id} />
      <div className="sigc-mission-inner">
        <header className="sigc-mission-header">
          <p className="sigc-eyebrow">{mission.station} <span>{data.heroEyebrow || mission.signal}</span></p>
          <h2 id={`${mission.id}-title`}>{mission.title}</h2>
          {overview?.title && <p className="sigc-overview-title">{overview.title}</p>}
          <p className="sigc-mission-tagline">{data.tagline}</p>
          {overview?.lines?.map((line, index) => <p className="sigc-overview-copy" key={index}>{line}</p>)}
          {overview?.closing && <p className="sigc-overview-closing">{overview.closing}</p>}
          {data.description && <p className="sigc-overview-copy">{data.description}</p>}
        </header>

        {mission.id === "glitch" && (
          <div className="sigc-glitch-game" aria-label="Glitch Gaming arcade">
            <SpaceShooter />
          </div>
        )}

        <StorySection mission={mission} />

        {Array.isArray(data.domains) && data.domains.length > 0 && (
          <section className="sigc-content-section sigc-domain-section" id={`${mission.id}-domains`}>
            <SectionHeading
              title="Domains"
              description={data.domainsDescription}
            />
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

        <section className="sigc-contact" id={`${mission.id}-contact`}>
          <div>
            <p className="sigc-eyebrow">NEXT TRANSMISSION</p>
            <h3>Build with {mission.label}.</h3>
            <p>Get in touch with ACM Amritapuri to learn more about this SIG.</p>
            {data.email && <a className="sigc-email" href={`mailto:${data.email}`}>{data.email}</a>}
          </div>
          <nav className="sigc-social-links" aria-label="ACM Amritapuri social links">
            {contactLinks.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label}</a>
            ))}
          </nav>
        </section>
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedHeading(fullHeading);
      return undefined;
    }

    let index = 0;
    let timeoutId;
    const typeNextCharacter = () => {
      index += 1;
      setTypedHeading(fullHeading.slice(0, index));
      if (index < fullHeading.length) {
        timeoutId = window.setTimeout(typeNextCharacter, 95);
      }
    };

    timeoutId = window.setTimeout(typeNextCharacter, 220);
    return () => window.clearTimeout(timeoutId);
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
