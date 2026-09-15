import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'


const navLinks = [
  { label: 'About', id: 'home' },
  { label: 'Ops', id: 'what-we-do' },
  { label: 'Projects', id: 'works' },
  { label: 'Events', id: 'events' },
  { label: 'Join', id: 'contact' },
]

export default function Navbar({ activeSection, sigId }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const currentNavLinks = [...navLinks]
  if (sigId === 'web') {
    const opsIndex = currentNavLinks.findIndex(l => l.id === 'what-we-do')
    if (opsIndex !== -1) {
      currentNavLinks.splice(opsIndex + 1, 0, { label: 'Roadmap', id: 'roadmap' })
    }
  }

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
    >
      <div className={`flex max-w-full items-center overflow-x-auto rounded-full border border-red-950/40 bg-surface/80 px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-red-950/10' : ''}`}>
        <motion.button
          className="relative flex h-9 flex-shrink-0 cursor-pointer items-center gap-2 rounded-full pl-1 pr-3"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-red-900/50]">
            <img src="/acm/assets/acm-amritapuri-mark.png" alt="" className="h-6 w-6 object-contain" />
          </div>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.16em] text-red-400 font-retro stranger-glow sm:inline">
            ACM Amritapuri
          </span>
        </motion.button>

        <div className="mx-1 hidden h-5 w-px flex-shrink-0 bg-red-950/60 sm:block" />

        {currentNavLinks.map(({ label, id }) => {
          const isActive = activeSection === id
          return (
            <button
              key={label}
              onClick={() => handleNavClick(id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-all duration-200 cursor-pointer font-body sm:px-4 sm:py-2 sm:text-sm ${
                isActive
                  ? 'border border-red-900/20 bg-red-950/30 text-red-500'
                  : 'text-muted hover:bg-red-950/20 hover:text-red-500'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
