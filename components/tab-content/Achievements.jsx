import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const wins = [
  { year: "2023", type: "CYBERSECURITY", title: "Adversary CTF winners at c0c0n", team: "SIG Cyber" },
  { year: "2023", type: "COMPETITIVE CODING", title: "ICPC Asia-West regional finalists", team: "Competitive Programming" },
  { year: "2022", type: "NATIONAL HACKATHON", title: "Two teams awarded at Smart India Hackathon", team: "Student Projects" },
  { year: "2022", type: "CYBERSECURITY", title: "Runner-up at Dome CTF", team: "SIG Cyber" },
  { year: "2022", type: "ARTIFICIAL INTELLIGENCE", title: "Hack the Plan winners", team: "SIG AI" },
];

export default function Achievements() {
  return (
    <div className="subpage">
      <div className="atmosphere">
        <div className="atmosphere-glow atmosphere-glow-1" />
        <div className="atmosphere-grain" />
      </div>
      <section className="subpage-hero compact">
        <div className="subpage-kicker">[ Proof / chapter archive ]</div>
        <h1 className="subpage-title">
          Work that<br />
          <span className="outlined">made a mark.</span>
        </h1>
        <div className="subpage-intro">
          <b>Achievement Log</b>
          <p>Competition wins, research milestones, shipped products, and moments that moved the chapter forward.</p>
        </div>
      </section>
      <section className="achievement-list">
        {wins.map((win, i) => (
          <motion.article
            className="achievement-item"
            key={win.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="achievement-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="achievement-meta">
              <small>{win.year}</small>
              <b>{win.type}</b>
            </div>
            <div className="achievement-content">
              <h2>{win.title}</h2>
              <p>{win.team}</p>
            </div>
            <FiArrowUpRight className="achievement-arrow" size={22} />
          </motion.article>
        ))}
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <b style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Next Entry / Pending
          </b>
          <p style={{ fontSize: 14, color: "var(--text-tertiary)", marginTop: 8, maxWidth: 400, margin: "8px auto 0" }}>
            Send the title, year, team, photos, and links. This archive is structured to grow with every chapter win.
          </p>
        </div>
      </section>
    </div>
  );
}
