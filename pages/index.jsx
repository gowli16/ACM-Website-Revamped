import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";

import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import InterconnectedLabs from "../components/InterconnectedLabs";
import PhotoStackGallery from "../components/PhotoStackGallery";

const achievements = [
  { value: "08", label: "Hackathon awards" },
  { value: "100+", label: "Projects shipped" },
  { value: "26", label: "Events hosted" },
  { value: "08", label: "Research papers" },
];

const highlights = [
  { tag: "National stage", title: "Adversary CTF winners at c0c0n", meta: "SIG Cyber · 2023", accent: "01" },
  { tag: "Competitive coding", title: "ICPC Asia-West regional finalists", meta: "Team ACM Amritapuri", accent: "02" },
  { tag: "Innovation", title: "Two teams awarded at Smart India Hackathon", meta: "Student Projects · 2022", accent: "03" },
];

const galleryPhotos = [
  {
    src: "/assets/ACM-Pics/team-photo.jpg",
    alt: "ACM Amritapuri students and mentors together at a chapter gathering",
    caption: "ACM Amritapuri chapter gathering",
  },
  {
    src: "/assets/aiEvents/agentic ai workshop.jpeg",
    alt: "Students attending an Agentic AI workshop",
    caption: "Agentic AI Workshop",
  },
  {
    src: "/assets/aiEvents/epochon 2.0.jpeg",
    alt: "Students gathered for the EpochOn event",
    caption: "EpochOn 2.0 Hackathon",
  },
  {
    src: "/assets/cyberworkshops/hero.jpeg",
    alt: "A student presenting a cybersecurity workshop",
    caption: "Offensive Security Hands-on Lab",
  },
  {
    src: "/pastEvents/1.jpg",
    alt: "ACM Amritapuri representatives at an ACM India event",
    caption: "ACM India Annual Flagship Event",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const SANS_STACK = 'Arial, Helvetica, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <div
      className="home-sans-root bg-[#121212] min-h-screen relative text-white font-sans pt-24 sm:pt-28"
      style={{ fontFamily: SANS_STACK }}
    >
      <Head>
        <title>ACM Amritapuri — Fueling curiosity</title>
        <meta
          name="description"
          content="ACM Amritapuri is where curious students build, research, compete, and shape what comes next."
        />
      </Head>

      <style jsx global>{`
        :root,
        html,
        body,
        #__next,
        .home-sans-root {
          background-color: #121212 !important;
          color: #ffffff !important;
          font-family: ${SANS_STACK} !important;
        }

        .home-sans-root h1,
        .home-sans-root h2,
        .home-sans-root h3 {
          font-family: ${SANS_STACK} !important;
          letter-spacing: -0.02em !important;
        }
      `}</style>

      <Header />

      <AnimatePresence>
        {showLoading && (
          <LoadingScreen key="loading" onComplete={() => setShowLoading(false)} />
        )}
      </AnimatePresence>

      {!showLoading && (
        <motion.div
          key="home"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 font-sans bg-[#121212]"
        >
          <main className="font-sans">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center text-center">
              <motion.div
                initial="hidden"
                animate="show"
                variants={reveal}
                className="flex flex-col items-center text-center max-w-4xl mx-auto px-4"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1993C6]/10 border border-[#1993C6]/30 text-[#1993C6] text-xs font-semibold tracking-wider uppercase mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#1993C6] inline-block animate-pulse" /> ACM Student Chapter · Amritapuri <b className="ml-1 font-bold">EST. 2021</b>
                </span>

                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.08] text-white">
                  Fueling <span className="text-[#1993C6]">curiosity.</span>
                  <br />
                  Igniting ideas.
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                  We’re the campus community for people who want to build the future, break things intelligently, and learn alongside a seriously talented crew.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="https://aseam.acm.org/join"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1993C6] hover:bg-[#157EA8] text-white font-semibold text-base transition-all shadow-[0_4px_20px_rgba(25,147,198,0.35)]"
                  >
                    Enter the community <HiArrowRight className="text-lg" />
                  </Link>
                  <Link
                    href="/achievements"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1B1B1B] border border-white/10 hover:border-[#1993C6] text-white font-semibold text-base transition-all"
                  >
                    See our impact <FiArrowUpRight className="text-lg text-[#1993C6]" />
                  </Link>
                </div>
              </motion.div>
            </section>

            {/* LIFE AT ACM AMRITAPURI - PHOTO STACK GALLERY SLIDESHOW */}
            <section className="py-20 px-6 bg-[#181818] border-y border-white/10">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1993C6]/10 border border-[#1993C6]/30 text-[#1993C6] text-xs font-semibold tracking-wider uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1993C6]" />
                    Life at ACM Amritapuri
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                    People make
                    <br />
                    <span className="text-[#1993C6]">the moments.</span>
                  </h2>
                  <p className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed">
                    Workshops, chapter gatherings, hackathons, and shared projects—these are a few moments from our community learning and building together.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <PhotoStackGallery photos={galleryPhotos} />
                </div>
              </div>
            </section>

            {/* MISSION / MANIFESTO SECTION */}
            <section className="py-24 px-6 max-w-4xl mx-auto text-center flex flex-col items-center bg-[#121212]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1993C6]/10 border border-[#1993C6]/30 text-[#1993C6] text-xs font-semibold tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1993C6]" />
                Our Mission
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.15] text-white">
                Not another club.
                <br />
                A <span className="text-[#1993C6]">launchpad</span> for the relentlessly curious.
              </h2>
              <p className="text-[#A0A0A0] text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
                From a first line of code to a nationally recognized build, we give students the mentorship, tools, and creative room to explore computer science on their own terms.
              </p>
              <div className="w-20 h-1 bg-[#1993C6] rounded-full" />
            </section>

            {/* STATS BAND */}
            <section className="bg-[#181818] border-y border-white/10" aria-label="Chapter highlights">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {achievements.map((item, index) => (
                  <div
                    className="border-b sm:border-b-0 sm:border-l last:border-r border-white/10 py-10 px-6 flex flex-col justify-center bg-[#181818]"
                    key={item.label}
                  >
                    <small className="text-[#1993C6] text-xs font-semibold mb-2">0{index + 1}</small>
                    <strong className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight my-1">
                      {item.value}
                    </strong>
                    <span className="text-[#A0A0A0] text-xs sm:text-sm font-medium uppercase tracking-wider mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* STUDENT INTEREST GROUPS SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-20 bg-[#121212]" id="what-we-do">
              <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1993C6]/10 border border-[#1993C6]/30 text-[#1993C6] text-xs font-semibold tracking-wider uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1993C6]" />
                    Student Interest Groups
                  </div>
                  <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                    Four labs.
                    <br />
                    Infinite directions.
                  </h2>
                </div>
                <p className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed max-w-xl">
                  Focused student-led communities learning by doing—interconnected labs exploring every layer of modern computing.
                </p>
              </div>
              <InterconnectedLabs />
            </section>

            {/* ACHIEVEMENTS / PROVEN TRACK RECORD */}
            <section className="py-20 bg-[#161616]" id="achievements">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1993C6]/10 border border-[#1993C6]/30 text-[#1993C6] text-xs font-semibold tracking-wider uppercase mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1993C6]" />
                      Proven Track Record
                    </div>
                    <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                      We don’t just participate.
                      <br />
                      <span className="text-[#1993C6]">We show up.</span>
                    </h2>
                  </div>
                  <p className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed max-w-xl">
                    Our members compete, publish, ship, and represent the chapter on national and global stages.
                  </p>
                </div>
                <div className="space-y-4">
                  {highlights.map((item) => (
                    <article
                      key={item.title}
                      className="bg-[#1C1C1C] border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:border-[#1993C6] transition-colors"
                    >
                      <span className="text-[#1993C6] font-bold text-2xl mr-6">{item.accent}</span>
                      <div className="flex-1">
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-[#121212] text-[#1993C6] border border-[#1993C6]/30 mb-2 uppercase tracking-wider">
                          {item.tag}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#A0A0A0]">{item.meta}</p>
                      </div>
                      <FiArrowUpRight className="text-[#1993C6] text-2xl ml-4 shrink-0" />
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* EVENTS SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-20 bg-[#121212]" id="events">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1993C6]/10 border border-[#1993C6]/30 text-[#1993C6] text-xs font-semibold tracking-wider uppercase mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1993C6]" />
                  Hands-on Experiences
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  Show up curious.
                  <br />
                  <span className="text-[#1993C6]">Leave electric.</span>
                </h2>
                <p className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed mb-8">
                  Workshops, open houses, hackathons, tech talks, and community nights—built to turn passive interest into real hands-on experience.
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2.5 text-[#1993C6] hover:text-white font-semibold tracking-wide text-sm sm:text-base transition-colors"
                >
                  Explore all events <HiArrowRight className="text-lg" />
                </Link>
              </div>
            </section>

            {/* JOIN / GET INVOLVED SECTION */}
            <section className="py-20 bg-[#181818] border-t border-white/10" id="join">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1993C6]/10 border border-[#1993C6]/30 text-[#1993C6] text-xs font-semibold tracking-wider uppercase mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1993C6]" />
                      Get Involved
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                      Your next big idea
                      <br />
                      starts <span className="text-[#1993C6]">here.</span>
                    </h2>
                  </div>
                  <div>
                    <p className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed mb-8">
                      You don’t need to be an expert. Bring your curiosity, your ambitious ideas, and the drive to build something meaningful.
                    </p>
                    <Link
                      href="https://aseam.acm.org/join"
                      target="_blank"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1993C6] hover:bg-[#157EA8] text-white font-semibold text-base transition-all shadow-[0_4px_20px_rgba(25,147,198,0.35)]"
                    >
                      Join ACM Amritapuri <HiArrowRight className="text-lg" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </motion.div>
      )}
    </div>
  );
}