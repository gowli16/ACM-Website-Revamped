import { useEffect, useState } from 'react'
import gsap from 'gsap'

const BASE = import.meta.env.BASE_URL;

export default function Hero({ sig }) {
  const [wordIndex, setWordIndex] = useState(0)
  const words = sig.words || []

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
      
      {/* 3D background sits entirely behind this section now, so we keep the center clear */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <img
          src={`${BASE}assets/acm-amritapuri-logo.png`}
          alt="ACM Amritapuri"
          className="blur-in mb-6 h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(249,115,22,0.5)] md:h-14"
        />

        <p className="blur-in mb-8 text-xs font-bold uppercase tracking-[0.42em] text-orange-500 font-retro animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
          {sig.heroEyebrow || 'ACM AMRITAPURI - S1 SIG RECRUITMENT'}
        </p>

        {sig.heroStory ? (
          <>
            <h1 className="name-reveal mb-6 text-4xl font-black uppercase leading-[0.98] text-neutral-100 font-display stranger-title animate-flicker md:text-6xl lg:text-7xl">
              {sig.heroStory.title}
            </h1>

            <div className="blur-in mb-8 max-w-2xl">
              {(sig.heroStory.lines || []).map((line, i) => (
                <p key={i} className="mb-2 text-base leading-relaxed text-neutral-300 font-body md:text-lg">
                  {line}
                </p>
              ))}
              {sig.heroStory.closing && (
                <p className="mt-5 text-2xl font-bold uppercase tracking-wider text-amber-400 font-retro stranger-glow md:text-4xl drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                  {sig.heroStory.closing}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="name-reveal mb-6 text-5xl font-black uppercase leading-[0.95] text-neutral-100 font-display stranger-title animate-flicker md:text-7xl lg:text-8xl">
              {sig.heroTitle || 'Fueling Curiosity'}
            </h1>

            <p className="blur-in mb-4 max-w-2xl text-lg text-neutral-300 font-body md:text-xl">
              Igniting ideas through <span className="text-amber-400 stranger-glow drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">{sig.name}</span>.
              {words.length > 0 && (
                <>
                  {' '}Where{' '}
                  <span
                    key={wordIndex}
                    className="inline-block text-xl font-black tracking-widest text-amber-400 font-retro stranger-glow animate-role-fade-in md:text-2xl bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"
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
        <span className="text-[10px] font-black tracking-[0.3em] text-orange-500 font-retro drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">SCROLL</span>
        <div className="relative h-12 w-px overflow-hidden bg-white/10">
          <div className="absolute inset-x-0 h-full bg-orange-500 animate-scroll-down" style={{ boxShadow: '0 0 15px #f97316' }} />
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
      className={`relative overflow-visible rounded-full px-8 py-4 text-xs font-black uppercase tracking-[0.15em] font-retro cursor-pointer md:text-sm ${
        primary
          ? 'border border-orange-500 bg-orange-950/40 text-orange-50 backdrop-blur-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:bg-orange-900/60'
          : 'border border-white/10 bg-white/5 text-neutral-300 backdrop-blur-md hover:border-orange-500/50 hover:text-white hover:bg-white/10'
      }`}
      style={{
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease, background 0.3s ease, border 0.3s ease',
      }}
    >
      {hovered && primary && (
        <span
          className="pointer-events-none absolute rounded-full opacity-80"
          style={{ inset: '-1px', background: 'linear-gradient(90deg, #ea580c 0%, #eab308 100%)', zIndex: -1, filter: 'blur(2px)' }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}