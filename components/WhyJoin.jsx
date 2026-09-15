import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Pool of symbols to draw from when a benefit doesn't specify its own
// iconPath — so data entry can just be [title, description] and still get
// a distinct-looking icon per card.
const ICON_POOL = [
  'M4 5h16M4 12h16M4 19h16', // list
  'M13 2 3 14h7l-1 8 10-12h-7l1-8z', // bolt
  'M12 3 3 8l9 5 9-5-9-5z M7 10.5V16c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-5.5', // grad cap
  'M4 4h16v14H4z M4 9h16 M9 13h6', // browser
  'M12 5v14M5 12h14 M7 7l10 10 M17 7 7 17', // compass/star
  'M12 5a2.5 2.5 0 1 0 0 .1M5 18a2.5 2.5 0 1 0 0 .1M19 18a2.5 2.5 0 1 0 0 .1M12 7.5v4M10.2 13.5 6.5 16M13.8 13.5l3.7 2.5', // network
  'M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5', // stacked layers
  'M9 3v18 M3 9h18 M3 3h18v18H3z', // grid/board
  'M4 17V7a2 2 0 0 1 2-2h9l5 5v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M11 5v5h5', // folder/doc
  'M12 2v4 M12 18v4 M4.9 4.9l2.8 2.8 M16.3 16.3l2.8 2.8 M2 12h4 M18 12h4 M4.9 19.1l2.8-2.8 M16.3 7.7l2.8-2.8', // spark/burst
]

// Deterministic Fisher–Yates so the shuffle is reproducible per render pass
// (stable via useMemo) without needing a fixed seed value.
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
  // Each benefit is a [title, description, iconPath?] tuple, same
  // convention as the internships/papers/exploration data elsewhere —
  // falls back to the defaults above if sig doesn't provide any.
  const source = sig?.benefits ?? []

  // Any benefit that omits its own iconPath gets a randomly-assigned one
  // from the pool instead — shuffled once per mount/data-change (not on
  // every render) so icons don't jump around while the page is open.
  const randomIcons = useMemo(() => shuffle(ICON_POOL), [source.length])

  const benefits = source.map(([title, description, iconPath], i) => ({
    title,
    description,
    iconPath: iconPath || randomIcons[i % randomIcons.length],
  }))

  if (benefits.length === 0) return null

  return (
    <section id="why-join" className="bg-bg py-16 md:py-24 border-t border-red-950/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-red-900/50" />
            <span className="text-xs text-red-500 uppercase tracking-[0.3em] font-retro font-bold">
              {sig?.whyJoinHeading ?? 'WHY ACM AMRITAPURI'}
            </span>
            <div className="w-8 h-px bg-red-900/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display uppercase font-extrabold text-neutral-200 leading-tight">
            {sig?.whyJoinTitle ?? (
              <>Not just a club - <span className="text-red-600 stranger-glow">a launchpad</span></>
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
      className="relative group rounded-2xl bg-[#090002]/40 border border-red-950/40 hover:border-transparent transition-all duration-300 p-6 flex flex-col cursor-default"
    >
      {hovered && (
        <span
          className="absolute rounded-2xl pointer-events-none"
          style={{ inset: '-1.5px', background: 'linear-gradient(135deg, #ff1a1a 0%, #7f1d1d 100%)', zIndex: -1 }}
        />
      )}

      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-red-500 transition-all duration-300"
        style={{ background: hovered ? 'linear-gradient(135deg, #ff1a1a 0%, #7f1d1d 100%)' : 'hsl(350 40% 8%)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d={benefit.iconPath} />
        </svg>
      </div>

      <h3 className="text-lg font-body font-semibold text-neutral-200 mb-2">{benefit.title}</h3>
      <p className="text-sm text-neutral-400 font-body leading-relaxed flex-1">{benefit.description}</p>
    </motion.div>
  )
}