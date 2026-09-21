import { motion } from "framer-motion";
import PeopleRevealDeck from "../../components/PeopleRevealDeck";

const core = [
  {
    name: "Anaswara A",
    role: "Chair",
    area: "Core Committee",
    image: "/anashwara.jpeg",
  },
  {
    name: "Sanjay",
    role: "Vice Chair",
    area: "SIG AI",
    image: "/sanjay.png",
  },
  {
    name: "Nishanth",
    role: "Vice Chair",
    area: "SIG AI",
    image: "/nishanth.png",
  },
  {
    name: "Sreelaya",
    role: "Secretary",
    area: "Core Committee",
    image: "/sreelaya.png",
  },
  {
    name: "Punit",
    role: "Treasurer & SIG AI Lead",
    area: "SIG AI",
    image: "/punit.png",
  },
  {
    name: "Sai Anand",
    role: "Web Master",
    area: "SIG Web & App",
    image: "/sai-anand.png",
  },
  {
    name: "Semin",
    role: "Cyber SIG Lead",
    area: "SIG Cyber",
    image: "/semin.png",
  },
  {
    name: "Mounish",
    role: "SIG Glitch Lead",
    area: "SIG Glitch",
    image: "/mounish.png",
  },
  {
    name: "Sreejith",
    role: "Web & App Development Lead",
    area: "SIG Web & App",
    image: "/sreejith.png",
  },
  {
    name: "Mohith",
    role: "AI Co-Lead",
    area: "SIG AI",
    image: "/mohith.png",
  },
  {
    name: "Poonguzhaly",
    role: "Cyber Co-Lead",
    area: "SIG Cyber",
    image: "/poonguzhaly.png",
  },
  {
    name: "Meera",
    role: "Web & App Co-Lead",
    area: "SIG Web & App",
    image: "/meera.png",
  },
  {
    name: "Anirudh",
    role: "Web & App Core Member",
    area: "SIG Web & App",
    image: "/anirudh.png",
  },
  {
    name: "Rajmohith",
    role: "Cyber Core Member",
    area: "SIG Cyber",
    image: "/rajmohith.png",
  },
  {
    name: "Tenisha",
    role: "Cyber Core Member",
    area: "SIG Cyber",
    image: "/tenisha.png",
  },
];

export default function Core() {
  return (
    <div className="subpage people-clean-page core-page">

      {/* =========================
          CORE HERO
         ========================= */}

      <section className="people-hero section-shell">

        {/* KICKER */}

        <motion.p
          className="section-kicker"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          [ CURRENT COMMAND / ACTIVE TEAM ]
        </motion.p>


        {/* MAIN TITLE */}

        <h1>

          <motion.span
            initial={{
              opacity: 0,
              y: 70,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.15,
              ease: "easeOut",
            }}
          >
            THE PEOPLE BEHIND
          </motion.span>


          <motion.span
            className="outlined"
            initial={{
              opacity: 0,
              y: 70,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            THE MOMENTUM.
          </motion.span>

        </h1>


        {/* DESCRIPTION */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.7,
            ease: "easeOut",
          }}
        >

          <p>
            Student leaders coordinating every SIG, event, project,
            and slightly chaotic late-night build session.
          </p>


          <motion.b
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
          >
            {String(core.length).padStart(2, "0")} CORE MEMBERS
          </motion.b>

        </motion.div>

      </section>


      {/* =========================
          INTERACTIVE CORE REVEAL
         ========================= */}

      <motion.section
        className="section-shell"

        initial={{
          opacity: 0,
          y: 45,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
          delay: 1.55,
          ease: "easeOut",
        }}
      >

        <PeopleRevealDeck
          people={core}
          title="Core"
          heading="Meet the people"
          subheading="driving the chapter."
          showProgress={true}
        />

      </motion.section>

    </div>
  );
}