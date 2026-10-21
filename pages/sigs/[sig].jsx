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

function AIAnimatedTitle({ onComplete }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    let raf = 0;
    let disposed = false;
    let started = 0;
    let completionSent = false;
    let particles = [];
    let connections = [];
    let stars = [];
    let width = 0;
    let height = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const buildScene = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(180, Math.floor(rect.width * 0.26));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      let fontSize = Math.min(width * 0.105, 142);
      octx.font = "500 " + fontSize + "px Arial, Helvetica, sans-serif";
      while (octx.measureText("INTELLIGENCE").width > width * 0.94 && fontSize > 24) { fontSize -= 2; octx.font = "500 " + fontSize + "px Arial, Helvetica, sans-serif"; }
      octx.fillText("ARTIFICIAL", width / 2, height * 0.34);
      octx.fillText("INTELLIGENCE", width / 2, height * 0.76);
      const pixels = octx.getImageData(0, 0, width, height).data;
      const step = width < 520 ? 5 : 6;
      const targets = [];
      for (let y = 2; y < height - 2; y += step) {
        for (let x = 2; x < width - 2; x += step) {
          if (pixels[(y * width + x) * 4 + 3] > 80) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.max(width * 0.38, height * 1.2) * (0.65 + Math.random() * 0.7);
            targets.push({ x: x + step / 2 + (Math.random() - 0.5) * step * 0.72, y: y + step / 2 + (Math.random() - 0.5) * step * 0.72, sx: width / 2 + Math.cos(angle) * distance, sy: height / 2 + Math.sin(angle) * distance, r: Math.random() < 0.18 ? 1.8 : 1.35, delay: Math.random() * 0.48, twinkle: Math.random() * Math.PI * 2 });
          }
        }
      }
      particles = targets;
      connections = [];
      const cellSize = step * 3.1;
      const cells = new Map();
      targets.forEach((point, index) => {
        const key = Math.floor(point.x / cellSize) + "," + Math.floor(point.y / cellSize);
        if (!cells.has(key)) cells.set(key, []);
        cells.get(key).push(index);
      });
      const connected = new Set();
      targets.forEach((point, index) => {
        const gx = Math.floor(point.x / cellSize);
        const gy = Math.floor(point.y / cellSize);
        const nearby = [];
        for (let cy = gy - 1; cy <= gy + 1; cy++) {
          for (let cx = gx - 1; cx <= gx + 1; cx++) {
            (cells.get(cx + "," + cy) || []).forEach((otherIndex) => {
              if (otherIndex === index) return;
              const other = targets[otherIndex];
              const distance = Math.hypot(other.x - point.x, other.y - point.y);
              if (distance > step * 0.8 && distance < step * 3.05) nearby.push({ index: otherIndex, distance });
            });
          }
        }
        nearby.sort((a, b) => a.distance - b.distance);
        nearby.slice(0, 3).forEach((neighbor) => {
          const a = Math.min(index, neighbor.index);
          const b = Math.max(index, neighbor.index);
          const key = a + ":" + b;
          if (!connected.has(key)) {
            connected.add(key);
            connections.push({ a, b });
          }
        });
      });
      stars = Array.from({ length: Math.max(90, Math.floor(width / 3.5)) }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() < 0.08 ? 1.15 : 0.48 + Math.random() * 0.3, alpha: 0.16 + Math.random() * 0.38, phase: Math.random() * Math.PI * 2 }));
      ctx.clearRect(0, 0, width, height);
      started = 0;
    };
    const draw = (now) => {
      if (disposed) return;
      if (!started) started = now;
      const elapsed = (now - started) / 1000;
      const progress = reducedMotion ? 1 : Math.max(0, Math.min(1, elapsed / 2.8));
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        const twinkle = 0.72 + Math.sin(elapsed * 1.7 + star.phase) * 0.28;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(224,226,227," + (star.alpha * twinkle * (1 - progress * 0.82)) + ")"; ctx.fill();
      });
      const particleProgress = (point) => reducedMotion ? 1 : Math.max(0, Math.min(1, (progress - point.delay) / (1 - point.delay)));
      ctx.lineWidth = 0.9;
      connections.forEach((edge) => {
        const a = particles[edge.a];
        const b = particles[edge.b];
        const localA = particleProgress(a);
        const localB = particleProgress(b);
        const local = Math.min(localA, localB);
        if (local <= 0.06) return;
        const easeA = 1 - Math.pow(1 - localA, 3);
        const easeB = 1 - Math.pow(1 - localB, 3);
        const ax = a.sx + (a.x - a.sx) * easeA;
        const ay = a.sy + (a.y - a.sy) * easeA;
        const bx = b.sx + (b.x - b.sx) * easeB;
        const by = b.sy + (b.y - b.sy) * easeB;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
        ctx.strokeStyle = "rgba(176,182,188," + (local * 0.62) + ")";
        ctx.stroke();
      });
      particles.forEach((point) => {
        const local = particleProgress(point);
        const eased = 1 - Math.pow(1 - local, 3);
        const x = point.sx + (point.x - point.sx) * eased;
        const y = point.sy + (point.y - point.sy) * eased;
        const alpha = 0.1 + local * 0.86;
        ctx.beginPath(); ctx.arc(x, y, point.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245,245,241," + alpha + ")"; ctx.fill();
      });
      if (progress < 1) { raf = requestAnimationFrame(draw); return; }
      if (!completionSent) { completionSent = true; onCompleteRef.current?.(); }
      particles.forEach((point) => {
        const pulse = 0.78 + Math.sin(elapsed * 1.2 + point.twinkle) * 0.12;
        ctx.beginPath(); ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239,239,236," + pulse + ")"; ctx.fill();
      });
    };
    buildScene();
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) { raf = requestAnimationFrame(draw); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(wrap);
    const resize = () => { cancelAnimationFrame(raf); buildScene(); if (wrap.getBoundingClientRect().top < window.innerHeight) raf = requestAnimationFrame(draw); };
    window.addEventListener("resize", resize);
    return () => { disposed = true; observer.disconnect(); window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={wrapRef} className="sigc-ai-network-wordmark" role="img" aria-label="Artificial Intelligence">
      <canvas ref={canvasRef} className="sigc-ai-network-canvas" aria-hidden="true" />
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
  const [aiTitleComplete, setAiTitleComplete] = useState(false);
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
          {mission.id === "ai" ? <div id="ai-title" className="sigc-ai-title-heading"><AIAnimatedTitle onComplete={() => setAiTitleComplete(true)} /></div> : <h2 id={`${mission.id}-title`}>{mission.id === "glitch" ? <GlitchTitle>{mission.title}</GlitchTitle> : mission.title}</h2>}
          {mission.id === "glitch" && <div className="sigc-glitch-title-game-background" aria-hidden="true"><SpaceShooter /></div>}
          {mission.id !== "glitch" && mission.id !== "ai" && (
            <>
              {overview?.title && <p className="sigc-overview-title">{overview.title}</p>}
              <p className="sigc-mission-tagline">{data.tagline}</p>
              {overview?.lines?.map((line, index) => <p className="sigc-overview-copy" key={index}>{line}</p>)}
              {overview?.closing && <p className="sigc-overview-closing">{overview.closing}</p>}
              {data.description && <p className="sigc-overview-copy">{data.description}</p>}
            </>
          )}
          {mission.id === "ai" && (
            <div className={"sigc-ai-intro-copy" + (aiTitleComplete ? " is-revealed" : "")} aria-hidden={!aiTitleComplete}>
              {overview?.title && <p className="sigc-overview-title">{overview.title}</p>}
              <p className="sigc-mission-tagline">{data.tagline}</p>
              {overview?.lines?.map((line, index) => <p className="sigc-overview-copy" key={index}>{line}</p>)}
              {overview?.closing && <p className="sigc-overview-closing">{overview.closing}</p>}
              {data.description && <p className="sigc-overview-copy">{data.description}</p>}
            </div>
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
