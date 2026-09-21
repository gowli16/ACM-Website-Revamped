import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import TataBreach from '../../components/Tatabreach'
import Domains from '../../components/Domains'
import Works from '../../components/Works'
import CyberWorks from '../../components/CyberWorks'
import Explorations from '../../components/Explorations'
import Members from '../../components/Members'
import Events from '../../components/Events'
import Stats from '../../components/Stats'
import Achievements from '../../components/Achievements'
import InternshipsAndPapers from '../../components/papersandinternship'
import WhyJoin from '../../components/WhyJoin'
import Manifesto from '../../components/Manifesto'
import Contact from '../../components/Contact'
import Spores from '../../components/Spores'
import StrangerWidgets from '../../components/StrangerWidgets'
import PsychicSequence from '../../components/PsychicSequence'
import CinematicExperience from '../../components/CinematicExperience'
import Web3DBackground from '../../components/Web3DBackground'



const sectionIds = ['home', 'what-we-do', 'works', 'achievements', 'members', 'events', 'stats', 'why-join', 'contact']
const sigs = [
  {
    id: "ai",
    code: "AI / 01",
    title: "Artificial Intelligence",
    text: "Machine learning, applied research, intelligent products, and experiments that turn ambitious ideas into working systems.",
    focus: ["ML foundations", "Applied AI", "Research"]
  },
  {
    id: "cyber",
    code: "CYBER / 02",
    title: "Cybersecurity",
    text: "Offensive and defensive security learned through CTFs, security labs, workshops, and shared investigation.",
    focus: ["CTFs", "Web security", "Forensics"]
  },
  {
    id: "web",
    code: "DEV / 03",
    title: "Web & App",
    text: "Product-minded design and development for useful experiences on the web, mobile devices, and campus.",
    focus: ["Frontend", "Backend", "Mobile"]
  },
  {
    id: "glitch",
    code: "GAME / 04",
    title: "Glitch",
    text: "Game design, creative coding, visual systems, and interactive worlds explored through collaborative jams.",
    focus: ["Unity", "Design", "Creative code"]
  }
];


export default function RecruitmentPage() {
  const router = useRouter() 
  const { sig: sigId } = router.query 

  const [activeSig, setActiveSig] = useState(() => sigs.find((s) => s.id === sigId) || null)
  const [activeSection, setActiveSection] = useState('home')
  const [isTelekinesisActive, setIsTelekinesisActive] = useState(false)
  const [shouldShake, setShouldShake] = useState(false)
  const [isUpsideDown, setIsUpsideDown] = useState(false)
  const [isPsychicSequenceActive, setIsPsychicSequenceActive] = useState(false)

  useEffect(() => {
    if (sigId) {
      setActiveSig(sigs.find((s) => s.id === sigId) || null)
      setActiveSection('home')
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }, 50) 
    }
  }, [sigId])

  const toggleTelekinesis = () => {
    setIsTelekinesisActive(!isTelekinesisActive)
    setShouldShake(true)
    setTimeout(() => setShouldShake(false), 600)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const detectionY = scrollY + window.innerHeight * 0.4
      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const sectionTop = el.getBoundingClientRect().top + scrollY
        if (sectionTop <= detectionY) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className={`min-h-screen w-full bg-[#020204] transition-transform ease-in-out origin-center ${isUpsideDown ? 'rotate-180 upside-down-active' : ''}`} style={{ transitionDuration: '1600ms' }}>
        
        {/* Pass activeSig so Web3DBackground switches between Cyber Fingerprint & Neural Matrix */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Web3DBackground sig={activeSig} />
        </div>

        <button onClick={() => router.back()} className="fixed top-16 left-6 z-[9000] px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white font-retro text-xs uppercase tracking-widest cursor-pointer border border-white/20 hover:border-cyan-500 backdrop-blur-sm transition-colors">
          ‹ Back
        </button>

        <div className="relative z-50">
          <Navbar activeSection={activeSection} sigId={activeSig?.id} />
          <Spores />
          <StrangerWidgets isTelekinesisActive={isTelekinesisActive} onToggleTelekinesis={toggleTelekinesis} isUpsideDown={isUpsideDown} onTogglePortal={() => setIsPsychicSequenceActive(true)} />
        </div>

        {activeSig ? (
          <main className={`relative z-10 transition-transform duration-500 ${shouldShake ? 'animate-shake' : ''} ${isTelekinesisActive ? 'telekinesis-active' : ''}`}>
            <motion.div key={sigId} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} className="pt-36 sm:pt-40 md:pt-48">
              <Hero sig={activeSig} />
            </motion.div>

            <TataBreach sig={activeSig} />
            <Domains sig={activeSig} />
            <CinematicExperience />
            <WhyJoin sig={activeSig} />
            {activeSig.id === 'cyber' ? <CyberWorks sig={activeSig} /> : <Works sig={activeSig} />}
            <Explorations sig={activeSig} />
            {activeSig.internships?.length > 0 && <InternshipsAndPapers sig={activeSig} />}
            {activeSig.events?.length > 0 && <Events sig={activeSig} />}
            <Achievements sig={activeSig} />
            <Manifesto sig={activeSig} />
            <Members sig={activeSig} />
            <Stats sig={activeSig} />
            <Contact sig={activeSig} />
          </main>
        ) : (
          <main className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
            <p className="text-white/70 font-retro uppercase tracking-widest text-sm">No SIG selected.</p>
          </main>
        )}
      </div>
    </>
  )
}