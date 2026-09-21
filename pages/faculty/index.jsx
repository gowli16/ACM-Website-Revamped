import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PeopleRevealDeck from "../../components/PeopleRevealDeck";

const faculty = [
  {
    prefix: "Dr.",
    name: "Geetha M",
    role: "Faculty Sponsor",
    area: "Chapter Sponsor",
    image: "/Geethamam.jpg",
  },
  {
    prefix: "Dr.",
    name: "Swaminathan J",
    role: "Executive Committee Member",
    area: "Faculty Committee",
    image: "/Swaminathanj.jpg",
  },
  {
    prefix: "Mr.",
    name: "P. K. Binu",
    role: "Executive Committee Member",
    area: "Faculty Committee",
    image: "/Binupk.jpg",
  },
  {
    prefix: "Dr.",
    name: "Gopakumar G",
    role: "Executive Committee Member",
    area: "Faculty Committee",
    image: "/Gopakumarg.jpg",
  },
  {
    prefix: "Dr.",
    name: "Lekshmi S. Nair",
    role: "Executive Committee Member",
    area: "Faculty Committee",
    image: "/Lakshmi_mam.jpg",
  },
  {
    prefix: "",
    name: "Shalu Murali",
    role: "Executive Committee Member",
    area: "Faculty Committee",
    image: "/shalu_sir.jpeg",
  },
  {
    prefix: "",
    name: "Priya M",
    role: "Executive Committee Member",
    area: "Faculty Committee",
    image: "/Priyamam1.png",
  },
];

export default function Faculty() {
  const [showPeople, setShowPeople] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPeople(true);
    }, 1900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="subpage people-clean-page faculty-clean-page">

      <section className="people-hero section-shell">

        <motion.p
          className="section-kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          [ GUIDANCE / FACULTY ]
        </motion.p>

        <h1>
          <motion.span
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.15,
              ease: "easeOut",
            }}
          >
            EXPERIENCE
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.35,
              ease: "easeOut",
            }}
          >
            BEHIND
          </motion.span>

          <motion.span
            className="outlined"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.55,
              ease: "easeOut",
            }}
          >
            THE EXPERIMENT.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.85,
            ease: "easeOut",
          }}
        >
          <p>
            Faculty mentors who protect the space to explore, open doors,
            and help student ambition become sustainable impact.
          </p>

          <motion.b
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 1.15,
            }}
          >
            {String(faculty.length).padStart(2, "0")} FACULTY MEMBERS
          </motion.b>
        </motion.div>

      </section>

      {showPeople && (
        <motion.section
          className="section-shell"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
        >
          <PeopleRevealDeck
            title="Faculty"
            people={faculty}
          />
        </motion.section>
      )}

    </div>
  );
}