import { useEffect, useState } from 'react'
import gsap from 'gsap'

const BASE = import.meta.env.BASE_URL;

const BG_MAP = {
  default: `${BASE}assets/hero.png`,
  web: `${BASE}assets/webBg.png`,
  ai: `${BASE}assets/aiBg.png`,
  glitch: `${BASE}assets/glitchBg.png`,
  cyber: `${BASE}assets/cyberBg.png`,
}

export default function Hero({ sig }) {
  const [wordIndex, setWordIndex] = useState(0)
  const words = sig.words || []

  const bgImage = sig.bgImage || BG_MAP[sig.bgKey || sig.id] || BG_MAP.default

  useEffect(() => {
    setWordIndex(0)
    if (words.length === 0) return
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out' })
      tl.fromTo('.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      )
      tl.fromTo('.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, delay: 0.3 },
        '<'
      )
    })
    return () => ctx.revert()
  }, [sig.id])

  return (
    <section id="home" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-28 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <style>{`
          @keyframes cinematic-breath {
            0%, 100% { transform: translate(-50%, -50%) scale(1.02); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
          }
          @keyframes flash-sky {
            0%, 93%, 95%, 97%, 100% { opacity: 0.48; }
            94%, 96% { opacity: 0.78; filter: brightness(1.2) contrast(1.1); }
          }
          .animate-breath { animation: cinematic-breath 16s ease-in-out infinite; }
          .animate-sky-flash { animation: flash-sky 8s infinite; }
        `}</style>

        <img
          key={sig.id}
          src={bgImage}
          alt=""
          className="hero-bg-img absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-50 transition-all duration-700 animate-breath animate-sky-flash"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-red-950/10 to-[#020204]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(229,9,20,0.23),transparent_36%),radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.1),#020204_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <img
          src={`${BASE}assets/acm-amritapuri-logo.png`}
          alt="ACM Amritapuri"
          className="blur-in mb-6 h-12 w-auto object-contain drop-shadow-[0_0_16px_rgba(229,9,20,0.35)] md:h-14"
        />

        <p className="blur-in mb-8 text-xs font-bold uppercase tracking-[0.42em] text-red-500 font-retro animate-pulse">
          {sig.heroEyebrow || 'ACM AMRITAPURI - S1 SIG RECRUITMENT'}
        </p>

        {sig.heroStory ? (
          <>
            <h1 className="name-reveal mb-6 text-4xl font-black uppercase leading-[0.98] text-red-600 font-display stranger-title animate-flicker md:text-6xl lg:text-7xl">
              {sig.heroStory.title}
            </h1>

            <div className="blur-in mb-8 max-w-2xl">
              {(sig.heroStory.lines || []).map((line, i) => (
                <p key={i} className="mb-2 text-base leading-relaxed text-neutral-300 font-body md:text-lg">
                  {line}
                </p>
              ))}
              {sig.heroStory.closing && (
                <p className="mt-5 text-2xl font-bold uppercase tracking-wider text-red-500 font-retro stranger-glow md:text-4xl">
                  {sig.heroStory.closing}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="name-reveal mb-6 text-5xl font-black uppercase leading-[0.95] text-red-600 font-display stranger-title animate-flicker md:text-7xl lg:text-8xl">
              {sig.heroTitle || 'Fueling Curiosity'}
            </h1>

            <p className="blur-in mb-4 max-w-2xl text-lg text-neutral-300 font-body md:text-xl">
              Igniting ideas through <span className="text-red-500 stranger-glow">{sig.name}</span>.
              {words.length > 0 && (
                <>
                  {' '}Where{' '}
                  <span
                    key={wordIndex}
                    className="inline-block text-xl font-bold tracking-wider text-red-500 font-retro stranger-glow animate-role-fade-in md:text-2xl"
                  >
                    {words[wordIndex]}
                  </span>
                  {' '}become real.
                </>
              )}
            </p>
          </>
        )}

        <p className="blur-in mb-8 max-w-xl text-sm leading-relaxed text-neutral-400 font-body md:text-base">
          {sig.description ||
            'ACM Amritapuri is a student chapter built around self-education, group-based learning, and SIGs where students collaborate on AI, Cyber Security, Web and App Dev, Glitch Gaming, and more.'}
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <HeroButton
            primary
            onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Enter Operations
          </HeroButton>
          <HeroButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join ACM
          </HeroButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs font-bold tracking-[0.2em] text-red-600 font-retro">SCROLL</span>
        <div className="relative h-10 w-px overflow-hidden bg-red-950/60">
          <div className="absolute inset-x-0 h-full bg-red-600 animate-scroll-down" style={{ boxShadow: '0 0 6px #ff1a1a' }} />
        </div>
      </div>
    </section>
  )
}

function HeroButton({ children, primary, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-visible rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider font-retro cursor-pointer md:text-sm ${
        primary
          ? 'border-2 border-red-600 bg-red-600 text-neutral-100 shadow-lg shadow-red-900/30 hover:bg-red-700'
          : 'border-2 border-red-950/60 bg-[#020204]/80 text-red-500'
      }`}
      style={{
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease, background 0.3s ease',
      }}
    >
      {hovered && (
        <span
          className="pointer-events-none absolute rounded-full"
          style={{ inset: '-2px', background: 'linear-gradient(90deg, #ff1a1a 0%, #ea580c 100%)', zIndex: -1 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}