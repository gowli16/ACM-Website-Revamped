import { motion } from "framer-motion";
import {
  FiLayers,
  FiCalendar,
  FiCode,
  FiUsers,
  FiArrowRight,
  FiBookOpen,
  FiInfo,
  FiTrendingUp,
} from "react-icons/fi";
import { socialData } from "../Socials";

const stats = [
  { value: "08", label: "Hackathon Awards" },
  { value: "100+", label: "Projects Shipped" },
  { value: "26", label: "Events Hosted" },
  { value: "08", label: "Research Papers" },
];

const tiles = [
  { icon: FiLayers, label: "SIGs", sub: "4 student labs", route: "/sigs", favicon: "sig", className: "sig" },
  { icon: FiCalendar, label: "Events", sub: "Hackathons & workshops", route: "/events", favicon: "events", className: "events" },
  { icon: FiCode, label: "Projects", sub: "Built by members", route: "/projects", favicon: "projects", className: "projects" },
  { icon: FiUsers, label: "Team", sub: "Core & alumni", route: "/core", favicon: "team", className: "team" },
  { icon: FiTrendingUp, label: "Achievements", sub: "Competition wins", route: "/achievements", favicon: "about", className: "about" },
  { icon: FiBookOpen, label: "Bridge Course", sub: "First-year program", route: "/bridge_course", favicon: "recruit", className: "recruit" },
  { icon: FiInfo, label: "About", sub: "Mission & goals", route: "/goals", favicon: "about", className: "about" },
];

const sigs = [
  { id: "ai", title: "Artificial Intelligence", desc: "ML models, vision, agents, and research-grade systems.", color: "#3bb4e0" },
  { id: "cyber", title: "Cybersecurity", desc: "CTFs, ethical hacking, forensics, and defense.", color: "#38a1ce" },
  { id: "web", title: "Web & App", desc: "Fullstack, cloud, mobile, and blockchain.", color: "#00b4d8" },
  { id: "glitch", title: "Game Development", desc: "Engines, shaders, worlds, and playable experiences.", color: "#1684b2" },
];

export default function Home({ navigate, openTab }) {
  return (
    <div className="start-page">
      {/* Atmospheric background */}
      <div className="atmosphere">
        <div className="atmosphere-glow atmosphere-glow-1" />
        <div className="atmosphere-glow atmosphere-glow-2" />
        <div className="atmosphere-grain" />
      </div>

      {/* Logo */}
      <motion.div
        className="start-page-logo"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="start-page-logo-mark">ACM</div>
        <div className="start-page-logo-text">Amritapuri Student Chapter</div>
      </motion.div>

      {/* Hero */}
      <motion.div
        className="start-page-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1>
          Fueling <span className="accent">curiosity.</span>
          <br />
          Igniting ideas.
        </h1>
        <p>
          We're the campus community for people who want to build the future,
          break things intelligently, and learn alongside a seriously talented crew.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="start-page-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {stats.map((stat) => (
          <div className="start-stat" key={stat.label}>
            <div className="start-stat-value">{stat.value}</div>
            <div className="start-stat-label">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Quick-access tiles */}
      <motion.div
        className="start-page-tiles"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            className="start-tile"
            onClick={() => openTab(tile.route)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.04 }}
            whileHover={{ y: -4 }}
          >
            <div className={`start-tile-icon ${tile.className}`}>
              <tile.icon size={22} />
            </div>
            <div className="start-tile-label">{tile.label}</div>
            <div className="start-tile-sub">{tile.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* SIG preview section */}
      <motion.div
        className="start-sig-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="start-section-label">Student Interest Groups</div>
        <div className="start-sig-cards">
          {sigs.map((sig, i) => (
            <motion.div
              key={sig.id}
              className="start-sig-card"
              onClick={() => openTab(`/sigs/${sig.id}`)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
              whileHover={{ y: -3 }}
              style={{ borderTop: `2px solid ${sig.color}` }}
            >
              <div className="start-sig-card-title" style={{ color: sig.color }}>
                {sig.title}
              </div>
              <div className="start-sig-card-desc">{sig.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Join CTA */}
      <motion.a
        href="https://aseam.acm.org/join"
        target="_blank"
        rel="noreferrer"
        className="bridge-actions"
        style={{ textDecoration: "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 32px",
            borderRadius: 12,
            background: "var(--acm-red)",
            color: "white",
            fontSize: 15,
            fontWeight: 600,
            transition: "transform 0.2s, background 0.2s",
          }}
        >
          Join ACM Amritapuri <FiArrowRight size={18} />
        </span>
      </motion.a>

      {/* Footer */}
      <div className="start-page-footer">
        <div className="start-page-socials">
          {socialData.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noreferrer noopener"
              className="start-page-social-link"
              title={social.name}
            >
              <social.Icon size={20} />
            </a>
          ))}
        </div>
        <div className="start-page-copy">
          ACM Amritapuri · Built by students, for students · EST. 2021
        </div>
      </div>
    </div>
  );
}
