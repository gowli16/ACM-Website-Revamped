import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL || '/'

const navLinks = [
  { label: 'About', id: 'home' },
  { label: 'Ops', id: 'what-we-do' },
  { label: 'Projects', id: 'works' },
  { label: 'Events', id: 'events' },
]

const sigLinks = [
  { label: 'AI', id: 'ai', icon: 'network' },
  { label: 'Web', id: 'web', icon: 'web' },
  { label: 'Cyber', id: 'cyber', icon: 'shield' },
  { label: 'Glitch', id: 'glitch', icon: 'game' },
]

function SigIcon({ name }) {
  if (name === 'network') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="5" r="2" />
        <circle cx="6" cy="17" r="2" />
        <circle cx="18" cy="17" r="2" />
        <path d="m11 7-4 8m6-8 4 8M8 17h8" />
      </svg>
    )
  }

  if (name === 'web') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 9h16M9 9v11m6-11v11" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8h10a4 4 0 0 1 3.7 2.5l1 2.5a2 2 0 0 1-3 2.4L16 13H8l-2.7 2.4a2 2 0 0 1-3-2.4l1-2.5A4 4 0 0 1 7 8Z" />
      <path d="M7 10v4m-2-2h4m7-1h.01M18 13h.01" />
    </svg>
  )
}

export default function Navbar({
  activeSection,
  sigId,
  sigMissionNavigation = false,
  activeSigId,
  onSigSelect,
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (sigMissionNavigation) return undefined

    const onScroll = () => setScrolled(window.scrollY > 100)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [sigMissionNavigation])

  const handleNavClick = (id) => {
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  const currentNavLinks = [...navLinks]

  if (!sigMissionNavigation && sigId === 'web') {
    const opsIndex = currentNavLinks.findIndex(
      (l) => l.id === 'what-we-do'
    )

    if (opsIndex !== -1) {
      currentNavLinks.splice(opsIndex + 1, 0, {
        label: 'Roadmap',
        id: 'roadmap',
      })
    }

  }

  const navigationLinks = sigMissionNavigation
    ? sigLinks
    : currentNavLinks

  if (sigMissionNavigation) {
    return (
      <nav
        className="sigc-mission-nav"
        aria-label="SIG navigation"
      >
        <div className="sigc-nav-list">
          {navigationLinks.map(({ label, id, icon }) => (
            <button
              className="sigc-nav-item"
              type="button"
              key={id}
              aria-label={`${label} SIG`}
              aria-current={activeSigId === id ? 'location' : undefined}
              onClick={() => onSigSelect(id)}
            >
              <span className="sigc-nav-icon"><SigIcon name={icon} /></span>
              <span className="sigc-nav-label" aria-hidden="true">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    )
  }

  return (
    <motion.div
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6 ${
        sigMissionNavigation ? 'sigc-navbar' : ''
      }`}
      initial={sigMissionNavigation ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={sigMissionNavigation ? { duration: 0 } : {
        duration: 0.7,
        ease: 'easeOut',
        delay: 0.2,
      }}
    >
      <div
        className={`${sigMissionNavigation ? 'sigc-navbar-inner' : ''} flex w-full max-w-6xl items-center justify-center overflow-x-auto rounded-2xl border border-white/10 bg-[#071A2B]/95 px-6 py-5 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled
            ? 'shadow-[0_4px_30px_rgba(199,154,59,0.15)]'
            : ''
        }`}
      >
        {/* Logo */}
        <motion.button
          className="flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-full"
          whileHover={sigMissionNavigation ? undefined : { scale: 1.05 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          onClick={() => window.scrollTo({
            top: 0,
            behavior: sigMissionNavigation &&
              window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'auto'
              : 'smooth',
          })}
        >
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-orange-500/40 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
            <img
              src={`${BASE}assets/acm-amritapuri-mark.png`}
              alt="ACM Amritapuri"
              className="h-6 w-6 object-contain brightness-200"
            />
          </div>

          <span className="hidden bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-[11px] font-bold uppercase tracking-[0.16em] font-retro text-transparent drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] sm:inline">
            ACM Amritapuri
          </span>
        </motion.button>

        {/* Divider */}
        <div className="mx-5 hidden h-6 w-px flex-shrink-0 bg-white/10 sm:block" />

        {/* Navigation */}
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {navigationLinks.map(({ label, id }) => {
            const isActive = sigMissionNavigation
              ? activeSigId === id
              : activeSection === id

            return (
              <motion.button
                key={label}
                aria-current={isActive ? 'location' : undefined}
                onClick={() =>
                  sigMissionNavigation ? onSigSelect(id) : handleNavClick(id)
                }
                whileHover={sigMissionNavigation ? undefined : { scale: 1.04 }}
                whileTap={sigMissionNavigation ? undefined : { scale: 0.97 }}
                className={`whitespace-nowrap cursor-pointer rounded-full px-3 py-1.5 text-xs font-body transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? 'border border-orange-500/50 bg-gradient-to-r from-orange-500/20 to-yellow-500/10 text-orange-200 shadow-[0_0_15px_rgba(249,115,22,0.25)]'
                    : 'border border-transparent text-neutral-400 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400'
                }`}
              >
                {label}
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}