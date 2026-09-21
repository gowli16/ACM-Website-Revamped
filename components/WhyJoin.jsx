import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const ICON_POOL = [
  'M4 5h16M4 12h16M4 19h16',
  'M13 2 3 14h7l-1 8 10-12h-7l1-8z',
  'M12 3 3 8l9 5 9-5-9-5z M7 10.5V16c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-5.5',
  'M4 4h16v14H4z M4 9h16 M9 13h6',
  'M12 5v14M5 12h14 M7 7l10 10 M17 7 7 17',
  'M12 5a2.5 2.5 0 1 0 0 .1M5 18a2.5 2.5 0 1 0 0 .1M19 18a2.5 2.5 0 1 0 0 .1M12 7.5v4M10.2 13.5 6.5 16M13.8 13.5l3.7 2.5',
  'M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  'M9 3v18 M3 9h18 M3 3h18v18H3z',
  'M4 17V7a2 2 0 0 1 2-2h9l5 5v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M11 5v5h5',
  'M12 2v4 M12 18v4 M4.9 4.9l2.8 2.8 M16.3 16.3l2.8 2.8 M2 12h4 M18 12h4 M4.9 19.1l2.8-2.8 M16.3 7.7l2.8-2.8',
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function WhyJoin({ sig }) {
  const source = sig?.benefits ?? []
  const randomIcons = useMemo(() => shuffle(ICON_POOL), [source.length])

  const benefits = source.map(([title, description, iconPath], i) => ({
    title,
    description,
    iconPath: iconPath || randomIcons[i % randomIcons.length],
  }))

  if (benefits.length === 0) return null

  return (
    <section id="why-join" className="relative z-10 py-16 md:py-24 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-500/50" />
            <span className="text-xs text-orange-500 uppercase tracking-[0.3em] font-retro font-bold">
              {sig?.whyJoinHeading ?? 'WHY ACM AMRITAPURI'}
            </span>
            <div className="w-8 h-px bg-orange-500/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display uppercase font-extrabold text-neutral-200 leading-tight">
            {sig?.whyJoinTitle ?? (
              <>Not just a club - <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">a launchpad</span></>
            )}
          </h2>
          <p className="text-sm text-neutral-400 mt-3 max-w-2xl mx-auto font-body leading-relaxed">
            {sig?.whyJoinDescription ??
              'ACM Amritapuri is built around curiosity, collaboration, and computing that creates positive impact. Bring an idea, pick a SIG, and find the people to build it with.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitCard({ benefit, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Fills with gradient on hover and turns all text inside to solid black
      className={`relative group rounded-2xl backdrop-blur-md border p-6 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
        hovered 
          ? 'bg-gradient-to-br from-orange-500 to-amber-400 border-transparent shadow-[0_0_30px_rgba(249,115,22,0.4)] text-black' 
          : 'bg-white/[0.02] border-white/10 text-neutral-200'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
          hovered ? 'bg-black/10 text-black' : 'bg-orange-500/10 text-orange-400'
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d={benefit.iconPath} />
        </svg>
      </div>

      <h3 className={`text-lg font-body font-semibold mb-2 transition-colors ${
        hovered ? 'text-black font-bold' : 'text-neutral-200'
      }`}>{benefit.title}</h3>
      
      <p className={`text-sm font-body leading-relaxed flex-1 transition-colors ${
        hovered ? 'text-black/90 font-medium' : 'text-neutral-400'
      }`}>{benefit.description}</p>
    </motion.div>
  )
}