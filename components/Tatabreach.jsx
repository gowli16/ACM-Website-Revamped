import { motion } from 'framer-motion'

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function TataBreach({ sig }) {
  const story = sig?.breachStory
  if (!story) return null

  return (
    <section id="breach-story" className="border-t border-orange-950/40 bg-[#020204] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-10 md:mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-orange-500/50" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 font-retro">{story.eyebrow}</span>
          </div>
          <h2 className="max-w-3xl text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
            {story.title.split(story.highlight || 'Tata Electronics').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">{story.highlight || 'Tata Electronics'}</span>}
              </span>
            ))}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Terminal-style briefing / raise-your-hand questions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl border border-orange-900/30 bg-orange-950/10 backdrop-blur-md p-6 md:p-8"
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="h-2 w-2 rounded-full bg-orange-800" />
              <span className="h-2 w-2 rounded-full bg-orange-950" />
              <span className="ml-2 text-[10px] uppercase tracking-[0.25em] text-orange-400/70 font-retro">acm_cyber // briefing.log</span>
            </div>
            <div className="flex flex-col gap-3">
              {story.questions.map((q, i) => (
                <p key={i} className="font-retro text-sm leading-relaxed text-neutral-300 md:text-xl">
                  <span className="mr-2 text-orange-400">&gt;</span>{q}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Narrative paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-center gap-4"
          >
            {story.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-neutral-400 font-body md:text-base">
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Stat callouts */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-16">
        {story.stats.map(([num, label], i) => (
            <motion.div
            key={num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl border border-orange-900/30 bg-orange-950/10 backdrop-blur-md p-6 md:p-8 text-center transition-all duration-300 hover:border-orange-500/50 shadow-lg shadow-orange-950/20"
            >
            <p className="mb-3 text-3xl font-black tracking-wider bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent font-retro md:text-4xl lg:text-5xl drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                {num}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-300 font-retro leading-relaxed">
                {label}
            </p>
            </motion.div>
        ))}
        </div>
      </div>
    </section>
  )
}