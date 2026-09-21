import { motion } from 'framer-motion'

export default function Domains({ sig }) {
  const domains = sig?.domains || []

  return (
    <section id="what-we-do" className="relative z-10 py-20 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-orange-500/50" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 font-retro">
              OPERATIONS
            </span>
            <span className="h-px w-6 bg-orange-500/50" />
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tight text-white font-display md:text-5xl lg:text-6xl">
            CHOOSE YOUR{' '}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">
              MISSION PATH
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 font-body md:text-base">
            Every SIG has beginner-friendly entry points and room to grow into serious work.
            Start with curiosity, leave with proof that you can build.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain, index) => {
            const [title, desc, skills = []] = Array.isArray(domain)
              ? domain
              : [domain.title, domain.description, domain.skills]

            return (
              <motion.div
                key={title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
              >
                <div>
                  {/* Card Icon Accent */}
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-950/30 text-orange-400">
                    <span className="text-sm font-bold font-retro">{index + 1}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display transition-colors group-hover:text-orange-300">
                    {title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-neutral-300 font-body">
                    {desc}
                  </p>
                </div>

                {/* Tech Pills */}
                {skills && skills.length > 0 && (
                  <div className="mt-6 flex flex-col gap-2">
                    {skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-lg border border-orange-500/20 bg-orange-950/20 py-2 text-center text-xs font-bold uppercase tracking-wider text-orange-300 font-retro transition-colors duration-200 group-hover:border-orange-500/40 group-hover:bg-orange-900/30"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}