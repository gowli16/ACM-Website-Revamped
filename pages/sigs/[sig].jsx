import { useCallback, useEffect, useRef, useState } from "react";
import ControlRoom from "../../components/ControlRoom";
import SpaceShooter from "../../components/SpaceShooter";
import Navbar from "../../components/Navbar";
import SigArchiveGallery from "../../components/SigArchiveGallery";
import SigSpaceExploration from "../../components/SigSpaceExploration";
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

        <StorySection mission={mission} />

        {Array.isArray(data.domains) && data.domains.length > 0 && (
          <section className="sigc-content-section" id={`${mission.id}-domains`}>
            <SectionHeading
              eyebrow="AREAS OF PRACTICE"
              title={[data.domainsHeadingPlain, data.domainsHeadingHighlight].filter(Boolean).join(" ") || "Domains"}
              description={data.domainsDescription}
            />
            <RecordCards records={data.domains} type="domains" />
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
            <p className="sigc-eyebrow">ACM AMRITAPURI <span>/</span> SPECIAL INTEREST GROUPS</p>
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
          <SpaceShooter />
        </section>

        <div ref={galleryRef}>
          <SigArchiveGallery />
        </div>

        <SigSpaceExploration
          galleryRef={galleryRef}
          onPlanetChange={setActiveSigId}
        />

        <div className="sigc-sequence-heading">
          <p className="sigc-eyebrow">MISSION SEQUENCE</p>
          <p>Explore the work, the people, and the paths forward.</p>
        </div>

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
