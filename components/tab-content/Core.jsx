import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import PersonCard from "../PersonCard";
import PeopleRevealDeck from "../PeopleRevealDeck";

const core = [
  { name: "Anaswara A", role: "Chair", area: "Core Committee", image: "/anashwara.jpeg" },
  { name: "Sanjay", role: "Vice Chair", area: "SIG AI", image: "/sanjay.png" },
  { name: "Nishanth", role: "Vice Chair", area: "SIG AI", image: "/nishanth.png" },
  { name: "Sreelaya", role: "Secretary", area: "Core Committee", image: "/sreelaya.png" },
  { name: "Punit", role: "Treasurer & SIG AI Lead", area: "SIG AI", image: "/punit.png" },
  { name: "Sai Anand", role: "Web Master", area: "SIG Web & App", image: "/sai-anand.png" },
  { name: "Semin", role: "Cyber SIG Lead", area: "SIG Cyber", image: "/semin.png" },
  { name: "Mounish", role: "SIG Glitch Lead", area: "SIG Glitch", image: "/mounish.png" },
  { name: "Sreejith", role: "Web & App Development Lead", area: "SIG Web & App", image: "/sreejith.png" },
  { name: "Mohith", role: "AI Co-Lead", area: "SIG AI", image: "/mohith.png" },
  { name: "Poonguzhaly", role: "Cyber Co-Lead", area: "SIG Cyber", image: "/poonguzhaly.png" },
  { name: "Meera", role: "Web & App Co-Lead", area: "SIG Web & App", image: "/meera.png" },
  { name: "Anirudh", role: "Web & App Core Member", area: "SIG Web & App", image: "/anirudh.png" },
  { name: "Rajmohith", role: "Cyber Core Member", area: "SIG Cyber", image: "/rajmohith.png" },
  { name: "Tenisha", role: "Cyber Core Member", area: "SIG Cyber", image: "/tenisha.png" },
];

export default function Core() {
  return (
    <div className="subpage">
      <div className="atmosphere">
        <div className="atmosphere-glow atmosphere-glow-1" />
        <div className="atmosphere-grain" />
      </div>
      <section className="people-hero">
        <motion.p
          className="subpage-kicker"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          [ Current command / active team ]
        </motion.p>
        <h1>
          <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
            THE PEOPLE BEHIND
          </motion.span>
          <motion.span className="outlined" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.3 }}>
            THE MOMENTUM.
          </motion.span>
        </h1>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.5 }}>
          <p>Student leaders coordinating every SIG, event, project, and slightly chaotic late-night build session.</p>
          <motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            {String(core.length).padStart(2, "0")} CORE MEMBERS
          </motion.b>
        </motion.div>
      </section>
      <motion.section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <PeopleRevealDeck people={core} title="Core" heading="Meet the people" subheading="driving the chapter." showProgress={true} />
      </motion.section>
    </div>
  );
}
