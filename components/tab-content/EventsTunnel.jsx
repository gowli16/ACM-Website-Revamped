import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiArrowLeft, FiClock, FiCheckCircle } from "react-icons/fi";

const events = [
  {
    id: "01",
    year: "2024",
    title: "EvoLUMIN",
    type: "National Tech Hackathon",
    date: "26-27 October 2024",
    format: "36-hour grand finale",
    audience: "Students across India",
    text: "A national innovation challenge built around meaningful real-world problems. More than 250 teams registered, 65 ideas were submitted, and 25 finalist teams came together at Amritapuri for an intense offline build.",
    tags: ["Healthcare", "Agriculture", "Sustainable Development"],
    href: "https://evo-lumin.vercel.app/",
    image: "/latestNews/openHouse.jpg",
    featured: true,
    status: "past",
  },
  {
    id: "02",
    year: "2025",
    title: "ACM Summer School",
    type: "Technology Outreach Program",
    date: "Summer 2025",
    format: "Immersive hands-on program",
    audience: "Young technology learners",
    text: "A beginner-friendly technology adventure designed around learning by doing, connecting with experts, and building alongside other curious students.",
    tags: ["AI & ML", "Cybersecurity", "Web & App", "Game Development", "Robotics & Aerospace"],
    href: "https://aseam.acm.org/summerschool/",
    image: "/latestNews/coding.jpg",
    status: "upcoming",
  },
  {
    id: "03",
    year: "2025",
    title: "OLabs Hackathon",
    type: "National Education Hackathon",
    date: "28 February-1 March 2025",
    format: "36-hour offline finale",
    audience: "Students & industry professionals",
    text: "A national hackathon focused on reimagining virtual education through creative, practical, and scalable technology for the OLabs learning platform.",
    tags: ["AI", "Cybersecurity", "VR / AR", "Data Science", "IoT", "LLMs"],
    href: "https://www.amrita.edu/events/olabs-hackathon/",
    image: "/latestNews/unity.jpg",
    status: "past",
  },
  {
    id: "04",
    year: "2024",
    title: "Bridge Course",
    type: "First-Year Foundation Program",
    date: "Two-month program",
    format: "Theory + practical sessions",
    audience: "First-year engineering students",
    text: "A guided transition from school to college that helps new students explore technical fields, build foundational skills, and discover the direction they want to pursue.",
    tags: ["Artificial Intelligence", "Cybersecurity", "Competitive Programming", "Web Development"],
    href: "/bridge_course",
    image: "/latestNews/fpv.jpg",
    status: "past",
  },
  {
    id: "05",
    year: "2025",
    title: "Agentic AI Workshop",
    type: "Hands-on Workshop",
    date: "December 2025",
    format: "Interactive session",
    audience: "AI SIG members & enthusiasts",
    text: "A practical workshop exploring agentic AI workflows — building, deploying, and experimenting with autonomous AI agents and LLM-powered systems.",
    tags: ["LLMs", "Agents", "RAG", "LangChain"],
    href: null,
    image: "/assets/aiEvents/agentic ai workshop.jpeg",
    status: "upcoming",
  },
  {
    id: "06",
    year: "2025",
    title: "EpochOn 2.0",
    type: "Hackathon",
    date: "February 2025",
    format: "Competitive build event",
    audience: "AI SIG members",
    text: "The second edition of the AI SIG's flagship hackathon — teams competed to build innovative AI-powered solutions over an intense building session.",
    tags: ["AI", "ML", "Hackathon"],
    href: null,
    image: "/assets/aiEvents/epochon 2.0.jpeg",
    status: "past",
  },
  {
    id: "07",
    year: "2024",
    title: "Active Directory Workshop",
    type: "Cybersecurity Workshop",
    date: "Completed",
    format: "Hands-on lab session",
    audience: "Cyber SIG members",
    text: "A hands-on session on Active Directory — covering identity, security principals, group policy scope and precedence, and how Windows authenticates users under the hood.",
    tags: ["Active Directory", "Identity", "Windows Security"],
    href: null,
    image: "/assets/workshops/active-directory-hero.jpeg",
    status: "past",
  },
  {
    id: "08",
    year: "2024",
    title: "ISEA MeitY Cybersecurity Workshop",
    type: "Cybersecurity Workshop",
    date: "Completed",
    format: "Expert-led training",
    audience: "Students & faculty",
    text: "Hosted with CISAI under the ISEA Phase-III, MeitY initiative. Key takeaways included hands-on cybersecurity training, interactive discussions on emerging threats, and live demonstrations on digital safety.",
    tags: ["Cybersecurity", "ISEA", "MeitY"],
    href: null,
    image: "/assets/cyberworkshops/hero.jpeg",
    status: "past",
  },
];

export default function EventsTunnel({ navigate, openTab }) {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const isScrollingRef = useRef(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  const filteredEvents = events.filter((e) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return e.status === "upcoming";
    if (filter === "past") return e.status === "past";
    return true;
  });

  // On mobile or reduced motion, use the fallback list
  const [useFallback, setUseFallback] = useState(false);
  useEffect(() => {
    const check = () => {
      setUseFallback(
        window.innerWidth <= 768 || reducedMotion
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [reducedMotion]);

  // Tunnel scroll handler — maps scroll position to active index
  const handleScroll = useCallback(
    (e) => {
      if (useFallback) return;
      const el = e.target;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      const progress = el.scrollTop / maxScroll;
      const idx = Math.round(progress * (filteredEvents.length - 1));
      if (idx !== activeIndex) {
        setActiveIndex(idx);
      }
    },
    [filteredEvents.length, activeIndex, useFallback]
  );

  // Click to focus a card — scroll to its position
  const focusCard = useCallback(
    (index) => {
      if (useFallback) return;
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const targetProgress =
        filteredEvents.length > 1 ? index / (filteredEvents.length - 1) : 0;
      el.scrollTo({
        top: maxScroll * targetProgress,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [filteredEvents.length, useFallback, reducedMotion]
  );

  // Open event detail
  const openEvent = useCallback(
    (event) => {
      if (event.href) {
        if (event.href.startsWith("http")) {
          window.open(event.href, "_blank", "noreferrer");
        } else if (event.href.startsWith("/")) {
          // Internal route — open in new tab if it's a real route
          openTab(event.href);
        }
      }
    },
    [openTab]
  );

  // Total scroll height for the tunnel
  const tunnelHeight = useFallback ? "auto" : `${filteredEvents.length * 80}vh`;

  return (
    <div className="events-tunnel">
      {/* Filter tabs */}
      {!useFallback && (
        <div className="tunnel-filters">
          {[
            { key: "all", label: "All Events" },
            { key: "upcoming", label: "Upcoming" },
            { key: "past", label: "Past" },
          ].map((f) => (
            <button
              key={f.key}
              className={`tunnel-filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => {
                setFilter(f.key);
                setActiveIndex(0);
                if (scrollRef.current) scrollRef.current.scrollTop = 0;
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {useFallback ? (
        /* Mobile/reduced-motion fallback: vertical card list */
        <div className="tunnel-mobile-list" style={{ display: "flex" }}>
          <div style={{ width: "100%", marginBottom: 24 }}>
            <div className="subpage-kicker" style={{ marginBottom: 8 }}>
              [ Chapter events / archive ]
            </div>
            <h1 className="subpage-title">
              Ideas became<br />
              <span className="outlined">experiences.</span>
            </h1>
            <p className="subpage-intro" style={{ marginBottom: 24 }}>
              Hackathons, outreach programs, and learning experiences designed to
              turn curiosity into confident action.
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[
                { key: "all", label: "All" },
                { key: "upcoming", label: "Upcoming" },
                { key: "past", label: "Past" },
              ].map((f) => (
                <button
                  key={f.key}
                  className={`tunnel-filter-btn ${filter === f.key ? "active" : ""}`}
                  onClick={() => setFilter(f.key)}
                  style={{ position: "static", transform: "none" }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          {filteredEvents.map((event, i) => (
            <EventCard key={event.id} event={event} onClick={() => openEvent(event)} index={i} />
          ))}
        </div>
      ) : (
        <>
          {/* 3D Tunnel viewport */}
          <div
            className="events-tunnel-viewport"
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {/* Spacer to create scroll distance */}
            <div style={{ height: tunnelHeight, position: "relative" }}>
              <div
                className="events-tunnel-stage"
                ref={stageRef}
                style={{
                  position: "sticky",
                  top: 0,
                  height: "100vh",
                  transformStyle: "preserve-3d",
                }}
              >
                {filteredEvents.map((event, i) => {
                  const distance = i - activeIndex;
                  const absDist = Math.abs(distance);
                  const isActive = i === activeIndex;

                  // 3D transform: cards recede into depth
                  const z = -absDist * 280;
                  const y = distance * 60;
                  const x = distance * 40;
                  const opacity = Math.max(0, 1 - absDist * 0.28);
                  const scale = isActive ? 1 : Math.max(0.7, 1 - absDist * 0.08);
                  const blur = isActive ? 0 : Math.min(6, absDist * 2);

                  return (
                    <div
                      key={event.id}
                      className="tunnel-card"
                      style={{
                        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                        opacity,
                        filter: blur > 0 ? `blur(${blur}px)` : "none",
                        zIndex: 100 - absDist,
                        pointerEvents: isActive ? "auto" : "none",
                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.5s ease",
                      }}
                      onClick={() => {
                        if (isActive) {
                          openEvent(event);
                        } else {
                          focusCard(i);
                        }
                      }}
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="tunnel-card-image"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="tunnel-card-body">
                        <div className="tunnel-card-meta">
                          <span className="tunnel-card-badge">
                            {event.status === "upcoming" ? (
                              <FiClock size={9} style={{ display: "inline", marginRight: 4 }} />
                            ) : null}
                            {event.type}
                          </span>
                          <span className="tunnel-card-year">{event.year}</span>
                        </div>
                        <h3 className="tunnel-card-title">{event.title}</h3>
                        <p className="tunnel-card-type">{event.date} · {event.format}</p>
                        <p className="tunnel-card-text">{event.text}</p>
                        <div className="tunnel-card-tags">
                          {event.tags.slice(0, 4).map((tag) => (
                            <span className="tunnel-card-tag" key={tag}>{tag}</span>
                          ))}
                        </div>
                        {isActive && event.href && (
                          <div
                            style={{
                              marginTop: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              color: "var(--acm-red)",
                            }}
                          >
                            Open event <FiArrowUpRight size={14} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* HUD: progress + hint */}
          <div className="tunnel-hud">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <div className="tunnel-progress">
              <div
                className="tunnel-progress-fill"
                style={{
                  width: `${((activeIndex + 1) / filteredEvents.length) * 100}%`,
                }}
              />
            </div>
            <span>{String(filteredEvents.length).padStart(2, "0")}</span>
            <span className="tunnel-hint">Scroll to navigate</span>
          </div>
        </>
      )}
    </div>
  );
}

/* Reusable event card for mobile fallback */
function EventCard({ event, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--charcoal-800)",
        border: "1px solid var(--border)",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span className="tunnel-card-badge">{event.type}</span>
          <span className="tunnel-card-year">{event.year}</span>
        </div>
        <h3 style={{ fontSize: 18, marginBottom: 6 }}>{event.title}</h3>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>
          {event.date} · {event.format}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {event.text}
        </p>
        <div className="tunnel-card-tags">
          {event.tags.slice(0, 4).map((tag) => (
            <span className="tunnel-card-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
