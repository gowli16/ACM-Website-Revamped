import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiCode, FiCpu, FiLayers, FiLock } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";

const achievements = [
  { value: "08", label: "Hackathon awards" },
  { value: "100+", label: "Projects shipped" },
  { value: "26", label: "Events hosted" },
  { value: "08", label: "Research papers" },
];

const groups = [
  { number: "01", title: "Artificial Intelligence", short: "AI / ML", text: "Intelligent systems, research, and ambitious experiments turned into real products.", Icon: FiCpu },
  { number: "02", title: "Cybersecurity", short: "CYBER", text: "Offensive and defensive security through CTFs, workshops, and hands-on challenges.", Icon: FiLock },
  { number: "03", title: "Web & App", short: "DEV", text: "Useful digital experiences built with modern tools and a product-first mindset.", Icon: FiCode },
  { number: "04", title: "Game Development", short: "GAME", text: "Stories and mechanics brought to life through game jams and creative code.", Icon: FiLayers },
];

const highlights = [
  { tag: "National stage", title: "Adversary CTF winners at c0c0n", meta: "SIG Cyber · 2023", accent: "01" },
  { tag: "Competitive coding", title: "ICPC Asia-West regional finalists", meta: "Team ACM Amritapuri", accent: "02" },
  { tag: "Innovation", title: "Two teams awarded at Smart India Hackathon", meta: "Student Projects · 2022", accent: "03" },
];

const reveal = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <div className="bg-[#071A2B] min-h-screen relative overflow-hidden text-white pt-32">
      <Head>
        <title>ACM Amritapuri — Fueling curiosity</title>
        <meta name="description" content="ACM Amritapuri is where curious students build, research, compete, and shape what comes next." />
      </Head>

      <Header />

      <AnimatePresence>
        {showLoading && (
          <LoadingScreen key="loading" onComplete={() => setShowLoading(false)} />
        )}
      </AnimatePresence>

      {!showLoading && (
        <motion.div
          key="home"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <main>
            {/* CENTERED HERO SECTION */}
            {/* CENTERED HERO SECTION */}
            <section className="hero section-shell">
              <div className="hero-noise" aria-hidden="true" />
              <div className="hero-copy">
                <motion.div initial="hidden" animate="show" variants={reveal} className="flex flex-col items-center text-center">
                  <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#009BDE]/10 border border-[#009BDE]/30 text-[#009BDE] text-xs font-semibold tracking-wider uppercase mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#009BDE] inline-block animate-pulse" /> ACM Student Chapter · Amritapuri <b>EST. 2021</b>
                  </span>
                  
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight uppercase font-sans">
                    Fueling<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009BDE] to-[#1B5CA2]">
                      curiosity.
                    </span><br />
                    Igniting ideas.
                  </h1>
                  
                  <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                    We’re the campus community for people who want to build the future, break things intelligently, and learn alongside a seriously talented crew.
                  </p>

                  <div className="hero-actions">
                    <Link 
                      href="https://aseam.acm.org/join" 
                      target="_blank" 
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#009BDE] hover:bg-[#0082be] text-white font-semibold transition-all shadow-[0_0_20px_rgba(0,155,222,0.4)]"
                    >
                      Enter the community <HiArrowRight />
                    </Link>
                    <Link 
                      href="/achievements" 
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0B2033] border border-[#009BDE]/50 hover:border-[#009BDE] text-white font-semibold transition-all"
                    >
                      See our impact <FiArrowUpRight />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* CENTERED MISSION / MANIFESTO SECTION */}
            <section className="py-24 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
              <span className="text-[#009BDE] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                [ 001 — MISSION ]
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                Not another club.<br />
                A <span className="text-[#009BDE]">launchpad</span> for<br />
                the relentlessly curious.
              </h2>
              <p className="text-neutral-300 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                From a first line of code to a nationally recognized build, we give students the people, tools, and room to explore computer science on their own terms.
              </p>
              <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#009BDE] to-transparent" />
            </section>

            <section className="stats-band" aria-label="Chapter highlights">
              <div className="stats-grid section-shell">{achievements.map((item, index) => <div className="stat" key={item.label}><small className="text-[#009BDE]">0{index + 1}</small><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
            </section>

            <section className="programs section-shell" id="what-we-do">
              <div className="section-heading"><div><p className="section-kicker text-[#009BDE]">[ Choose your frequency ]</p><h2>Four labs.<br />Infinite directions.</h2></div><p>Focused groups for learning by doing—open to beginners, builders, researchers, and everyone in between.</p></div>
                <div className="program-grid">{groups.map(({ Icon, ...group }) => <article className="program-card" key={group.title}><div className="program-scan" /><div className="program-top text-[#009BDE]"><span>{group.number} / {group.short}</span><Icon /></div><h3>{group.title}</h3><p>{group.text}</p><Link href="/sigs" aria-label={`Learn about ${group.title}`}><FiArrowUpRight /></Link></article>)}</div>
            </section>
        
            <section className="achievements" id="achievements">
              <div className="achievement-orb" aria-hidden="true" style={{ background: 'radial-gradient(circle, rgba(1, 13, 18, 0.15) 0%, rgba(7,26,43,0) 70%)' }} />
              <div className="section-shell">
                <div className="section-heading light"><div><p className="section-kicker text-[#009BDE]">[ Signals of impact ]</p><h2>We don’t just<br />participate. <span className="text-[#009BDE]">We show up.</span></h2></div><p>Our members compete, publish, ship, and represent the chapter on stages far beyond campus.</p></div>
                <div className="highlight-list">{highlights.map((item) => <article key={item.title}><span className="highlight-index text-[#009BDE]">{item.accent}</span><div><span className="tag border-[#009BDE]/30 text-[#009BDE]">{item.tag}</span><h3>{item.title}</h3><p>{item.meta}</p></div><FiArrowUpRight /></article>)}</div>
                <div className="data-note"><span>YOUR NEXT WIN →</span><p>This space is ready for winner photos, project links, publication details, and everything the chapter achieves next.</p><b>DATA SLOT / 04</b></div>
              </div>
            </section>

            <section className="event-feature section-shell" id="events">
              <div className="event-image"><span>LIVE / COLLABORATIVE / HANDS-ON</span></div>
              <div className="event-copy"><p className="section-kicker text-[#009BDE]">[ Experiences over lectures ]</p><h2>Show up curious.<br /><span className="text-[#009BDE]">Leave electric.</span></h2><p>Workshops, open houses, hackathons, tech talks, and community nights—built to turn passive interest into hands-on experience.</p><Link href="/events" className="text-link text-[#009BDE]">Explore our events <HiArrowRight /></Link></div>
            </section>

            <section className="join-wrap"><div className="join-section section-shell" id="join"><div className="join-grid" /><div><p className="section-kicker text-[#009BDE]">[ The door is open ]</p><h2>Your next big idea<br />starts <span className="text-[#009BDE]">here.</span></h2></div><div><p>You don’t need to be an expert. Bring your curiosity, your weird idea, and the will to make something real.</p><Link href="https://aseam.acm.org/join" target="_blank" className="button button-light bg-[#009BDE] text-white hover:bg-[#0082be]">Join ACM Amritapuri <HiArrowRight /></Link></div></div></section>
          </main>
        </motion.div>
      )}
    </div>
  );
}