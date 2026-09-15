import { motion } from 'framer-motion'

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

// Renders nothing unless the active SIG's data file defines `manifesto`.
// This keeps the section opt-in per SIG on a shared page tree — SIGs
// without manifesto data (currently AI, Cyber, Web) are unaffected.
export default function Manifesto({ sig }) {
  const data = sig.manifesto
  if (!data) return null

  return (
    <section id="manifesto" className="border-t border-red-950/40 bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-10 text-center md:mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-900/50" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 font-retro">{data.eyebrow}</span>
            <div className="h-px w-8 bg-red-900/50" />
          </div>
          <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
            {data.headingPlain} <span className="font-black text-red-600 stranger-glow">{data.headingHighlight}</span>
          </h2>
        </motion.div>

        {/* Philosophy lines */}
        {data.philosophy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mb-12 flex max-w-2xl flex-col gap-4 text-center"
          >
            {data.philosophy.map((line, i) => (
              <p key={i} className="text-base leading-relaxed text-neutral-300 font-body md:text-lg">
                {line}
              </p>
            ))}
          </motion.div>
        )}

        {/* Arsenal + Endgame */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {data.arsenal && (
            <ChipBlock label={data.arsenalLabel || 'Arsenal'} items={data.arsenal} delay={0} />
          )}
          {data.endgame && (
            <ChipBlock label={data.endgameLabel || 'Endgame'} items={data.endgame} delay={0.1} />
          )}
        </div>

        {/* Accept the Quest CTA */}
        {data.cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 rounded-2xl border border-red-950/40 bg-[#090002]/40 p-8 text-center md:p-10"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500 font-retro">{data.cta.eyebrow}</p>
            <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-neutral-400 font-body md:text-base">
              {data.cta.line}
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-100 shadow-lg shadow-red-900/30 transition-transform duration-300 hover:scale-105 font-retro md:text-sm"
            >
              {data.cta.buttonLabel || 'Join us'} <span>-&gt;</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ChipBlock({ label, items, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl border border-red-950/40 bg-[#090002]/30 p-7 md:p-8"
    >
      <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-red-500 font-retro">{label}</h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-red-950/60 bg-[#020204]/80 px-3.5 py-1.5 text-xs text-red-500/80 font-retro">
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  )
}