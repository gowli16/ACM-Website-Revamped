import { useState } from 'react'
import { motion } from 'framer-motion'

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Domains({ sig }) {
  return (
    <section id="what-we-do" className="border-t border-red-950/40 bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-10 md:mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-red-900/50" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 font-retro">OPERATIONS</span>
          </div>
          <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
            {sig.domainsHeadingPlain || 'Choose your'} <span className="font-black text-red-600 stranger-glow">{sig.domainsHeadingHighlight || 'mission path'}</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400 font-body">
            {sig.domainsDescription || 'Every SIG has beginner-friendly entry points and room to grow into serious work. Start with curiosity, leave with proof that you can build.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sig.domains.map(([title, description, tags], i) => (
            <DomainCard key={title} title={title} description={description} tags={tags} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainCard({ title, description, tags, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex min-h-[320px] cursor-default flex-col overflow-hidden rounded-2xl border border-red-950/40 bg-[#090002]/40 p-6 transition-all duration-300 hover:border-transparent"
    >
      {hovered && (
        <span
          className="pointer-events-none absolute rounded-2xl"
          style={{ inset: '-1.5px', background: 'linear-gradient(135deg, #ff1a1a 0%, #7f1d1d 100%)', zIndex: -1 }}
        />
      )}

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-red-500 transition-all duration-300" style={{ background: hovered ? 'linear-gradient(135deg, #ff1a1a 0%, #7f1d1d 100%)' : 'hsl(350 40% 8%)' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M4 17 12 3l8 14" />
          <path d="M8 17h8" />
          <path d="M12 11v10" />
        </svg>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-neutral-200 font-body">{title}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-400 font-body">{description}</p>

      {/* Maximized Keywords Tag Section Layout */}
      <div className="mt-auto flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="text-base font-black uppercase tracking-wider border-2 border-red-500/50 bg-red-950/40 text-red-400 px-4 py-2 rounded-xl font-retro drop-shadow-[0_0_10px_rgba(239,68,68,0.4)] md:text-lg transition-all duration-300 group-hover:border-red-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}