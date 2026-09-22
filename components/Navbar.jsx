import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL || '/'

const navLinks = [
  { label: 'About', id: 'home' },
  { label: 'Ops', id: 'what-we-do' },
  { label: 'Projects', id: 'works' },
  { label: 'Events', id: 'events' },
]

export default function Navbar({ activeSection, sigId }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  if (sigId === 'web') {
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

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
        delay: 0.2,
      }}
    >
      <div
        className={`flex w-full max-w-6xl items-center justify-center overflow-x-auto rounded-2xl border border-white/10 bg-[#071A2B]/95 px-6 py-5 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled
            ? 'shadow-[0_4px_30px_rgba(199,154,59,0.15)]'
            : ''
        }`}
      >
        {/* Logo */}
        <motion.button
          className="flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-full"
          whileHover={{ scale: 1.05 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
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
          {currentNavLinks.map(({ label, id }) => {
            const isActive = activeSection === id

            return (
              <motion.button
                key={label}
                onClick={() => handleNavClick(id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
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