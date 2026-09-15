import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TataBreach from '../components/Tatabreach'
import Domains from '../components/Domains'
import Works from '../components/Works'
import CyberWorks from '../components/CyberWorks'
import Explorations from '../components/Explorations'
import Members from '../components/Members'
import Events from '../components/Events'
import Stats from '../components/Stats'
import Achievements from '../components/Achievements'
import InternshipsAndPapers from '../components/papersandinternship'
import WhyJoin from '../components/WhyJoin'
import Manifesto from '../components/Manifesto'
import Contact from '../components/Contact'
import Spores from '../components/Spores'
import StrangerWidgets from '../components/StrangerWidgets'
import PsychicSequence from '../components/PsychicSequence'
import { sigs } from '../data/sigs'
import CinematicExperience from '../components/CinematicExperience'

const sectionIds = [
  'home',
  'what-we-do',
  'works',
  'achievements',
  'members',
  'events',
  'stats',
  'why-join',
  'contact'
]

export default function RecruitmentPage() {
  const navigate = useNavigate()
  const { sig: sigId } = useParams()

  const [activeSig, setActiveSig] = useState(
    () => sigs.find((s) => s.id === sigId) || null
  )

  const [activeSection, setActiveSection] = useState('home')
  const [isTelekinesisActive, setIsTelekinesisActive] = useState(false)
  const [shouldShake, setShouldShake] = useState(false)
  const [isUpsideDown, setIsUpsideDown] = useState(false)
  const [isPsychicSequenceActive, setIsPsychicSequenceActive] = useState(false)

  useEffect(() => {
    setActiveSig(sigs.find((s) => s.id === sigId) || null)
    setActiveSection('home')
    window.scrollTo(0, 0)
  }, [sigId])

  const toggleTelekinesis = () => {
    setIsTelekinesisActive(!isTelekinesisActive)
    setShouldShake(true)

    setTimeout(() => {
      setShouldShake(false)
    }, 600)
  }

  const goBackToSigSelection = () => {
    navigate(-1)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const detectionY = scrollY + window.innerHeight * 0.4
      let current = 'home'

      for (const id of sectionIds) {
        const el = document.getElementById(id)

        if (!el) continue

        const sectionTop =
          el.getBoundingClientRect().top + scrollY

        if (sectionTop <= detectionY) {
          current = id
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true
    })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className={`min-h-screen w-full transition-transform ease-in-out origin-center ${
          isUpsideDown
            ? 'rotate-180 upside-down-active'
            : ''
        }`}
        style={{
          transitionDuration: '1600ms'
        }}
      >
        <button
          onClick={goBackToSigSelection}
          className="fixed top-16 left-6 z-[9000] px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white font-retro text-xs uppercase tracking-widest cursor-pointer border border-white/20 hover:border-red-500 backdrop-blur-sm transition-colors"
        >
          ‹ Back
        </button>

        <Navbar activeSection={activeSection} />

        <Spores />

        <StrangerWidgets
          isTelekinesisActive={isTelekinesisActive}
          onToggleTelekinesis={toggleTelekinesis}
          isUpsideDown={isUpsideDown}
          onTogglePortal={() =>
            setIsPsychicSequenceActive(true)
          }
        />

        {activeSig ? (
          <main
            className={`relative z-10 transition-transform duration-500 ${
              shouldShake ? 'animate-shake' : ''
            } ${
              isTelekinesisActive
                ? 'telekinesis-active'
                : ''
            }`}
          >
            <Hero sig={activeSig} />

            <TataBreach sig={activeSig} />

            <Domains sig={activeSig} />

            {activeSig.id === 'web' ? (
              <>
                <CinematicExperience />

                <WhyJoin sig={activeSig} />

                <Works sig={activeSig} />

                <Explorations sig={activeSig} />

                {activeSig.internships &&
                  activeSig.internships.length > 0 && (
                    <InternshipsAndPapers
                      sig={activeSig}
                    />
                  )}

                {activeSig.events &&
                  activeSig.events.length > 0 && (
                    <Events sig={activeSig} />
                  )}

                <Achievements sig={activeSig} />

                <Manifesto sig={activeSig} />

                <Members sig={activeSig} />

                <Stats sig={activeSig} />

                <Contact sig={activeSig} />
              </>
            ) : (
              <>
                {activeSig.id === 'cyber' ? (
                  <>
                    <CyberWorks sig={activeSig} />

                    <Explorations sig={activeSig} />

                    {activeSig.events &&
                      activeSig.events.length > 0 && (
                        <Events sig={activeSig} />
                      )}

                    <Achievements sig={activeSig} />

                    <Members sig={activeSig} />

                    <Stats sig={activeSig} />

                    <WhyJoin sig={activeSig} />

                    <Manifesto sig={activeSig} />

                    <Contact sig={activeSig} />
                  </>
                ) : (
                  <>
                    <Works sig={activeSig} />

                    <Explorations sig={activeSig} />

                    {activeSig.internships &&
                      activeSig.internships.length > 0 && (
                        <InternshipsAndPapers
                          sig={activeSig}
                        />
                      )}

                    {activeSig.id !== 'glitch' && (
                      <Members sig={activeSig} />
                    )}

                    {activeSig.events &&
                      activeSig.events.length > 0 && (
                        <Events sig={activeSig} />
                      )}

                    <Stats sig={activeSig} />

                    <Achievements sig={activeSig} />

                    {activeSig.id === 'glitch' && (
                      <Members sig={activeSig} />
                    )}

                    <WhyJoin sig={activeSig} />

                    <Manifesto sig={activeSig} />

                    <Contact sig={activeSig} />
                  </>
                )}
              </>
            )}
          </main>
        ) : (
          <main className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
            <p className="text-white/70 font-retro uppercase tracking-widest text-sm">
              No SIG selected — head back and pick one from the Gate.
            </p>

            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-retro font-bold text-xs uppercase tracking-widest cursor-pointer border border-red-500"
            >
              Go to the Gate
            </button>
          </main>
        )}
      </div>

      {isPsychicSequenceActive && (
        <PsychicSequence
          onComplete={() => {
            setIsUpsideDown(!isUpsideDown)

            setTimeout(() => {
              setIsPsychicSequenceActive(false)
            }, 900)
          }}
        />
      )}

      {isUpsideDown && (
        <button
          onClick={() =>
            setIsPsychicSequenceActive(true)
          }
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-retro font-bold text-xs uppercase tracking-widest cursor-pointer shadow-[0_0_20px_#ef4444] border border-red-500 animate-pulse"
        >
          Exit Rift
        </button>
      )}
    </>
  )
}