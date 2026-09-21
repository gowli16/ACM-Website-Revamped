import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const sigs = [
  { id: "AI / 01", title: "SIG AI", desc: "Research, machine learning, intelligent products, and experiments that move beyond notebooks.", wins: ["Hack the Plan winners", "Commercially deployed software"] },
  { id: "CYBER / 02", title: "SIG Cyber", desc: "A home for security researchers, CTF players, and people curious about how systems break.", wins: ["Adversary CTF winner at c0c0n", "Dome CTF runner-up"] },
  { id: "GAME / 03", title: "Glitch", desc: "Games, interactive worlds, creative tooling, and the strange ideas that make play memorable.", wins: ["GameJam winners", "Multiple research internships"] },
  { id: "DEV / 04", title: "Web & App", desc: "Product-minded developers shipping experiences that solve real problems on campus and beyond.", wins: ["ICPC Asia-West finalists", "Two Smart India Hackathon awards"] },
];

export default function About() {
  const [active, setActive] = useState(0);
  
  return (
    <div className="subpage about-page min-h-screen bg-[#020204] text-white">
      
      {/* 
        This style block forces the new theme colors onto your existing custom CSS classes 
        so the old orange/yellow theme stops taking over the bottom half of the page.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .about-page .section-kicker,
        .about-page .subpage-intro b { 
          color: #22d3ee !important; /* cyan-400 */
        }
        .about-page h1 span {
          background: linear-gradient(to right, #22d3ee, #3b82f6, #a855f7) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        .about-page .photo-code {
          color: #22d3ee !important;
        }
        .about-page .about-metrics strong {
          background: linear-gradient(to right, #22d3ee, #3b82f6) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        .about-page .console-tabs button.active {
          color: #22d3ee !important;
          border-left-color: #22d3ee !important;
          border-bottom-color: #22d3ee !important;
        }
        .about-page .console-panel i { 
          color: #a855f7 !important; /* purple-500 */
        }
      `}} />

      <section className="subpage-hero section-shell">
        <div>
          <p className="section-kicker tracking-[0.3em]">[ Identity / chapter 001 ]</p>
          <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}}>
            Built by the<br />
            <span>
              terminally curious.
            </span>
          </motion.h1>
        </div>
        <div className="subpage-intro">
          <b className="tracking-widest block mb-2">ACM · AMRITAPURI</b>
          <p className="text-neutral-400">
            We are a student-led computing community built around self-education, shared ambition, and making ideas real together.
          </p>
        </div>
      </section>
      
      <section className="about-visual section-shell">
        <div className="about-photo">
          <Image src="/group.png" alt="The ACM Amritapuri community" fill sizes="100vw" priority />
          <div className="photo-code bg-[#020204]/80 backdrop-blur-sm px-3 py-1">
            COMMUNITY_FRAME / 2024
          </div>
        </div>
      </section>
      
      <section className="about-metrics section-shell">
        {[["03+","Years building"],["89+","Active members"],["100+","Projects"],["26","Events hosted"],["08","Papers published"]].map(([value,label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span className="text-neutral-400 uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </section>
      
      <section className="sig-console section-shell">
        <div className="console-tabs">
          {sigs.map((sig,i) => (
            <button 
              className={`${active === i ? "active" : "text-neutral-500 hover:text-neutral-300"} transition-colors`} 
              onClick={() => setActive(i)} 
              key={sig.title}
            >
              <small className="opacity-70">{sig.id}</small>
              {sig.title}
            </button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div key={active} className="console-panel" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
            <p className="section-kicker tracking-widest">[ Active frequency ]</p>
            <h2 className="text-white">{sigs[active].title}</h2>
            <p className="text-neutral-400">{sigs[active].desc}</p>
            <div>
              {sigs[active].wins.map((win,i) => (
                <span key={win} className="text-neutral-300 flex items-center gap-3">
                  <i className="font-mono not-italic">0{i+1}</i>
                  {win}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      
    </div>
  );
}