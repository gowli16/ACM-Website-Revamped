import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const baseStats = [
  ['Active Members', 'Students training and building together'],
  ['Missions Shipped', 'Projects, writeups, designs, and demos'],
  ['Workshops', 'Hands-on sessions for beginners'],
  ['Challenge Wins', 'Hackathons, contests, CTFs, and showcases'],
]

function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!active) return
    let startTs
    const step = (ts) => {
      if (startTs === undefined) startTs = ts
      const progress = Math.min((ts - startTs) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    setValue(0)
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, duration])

  return value
}

export default function Stats({ sig }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })
  const seed = sig.id.length
  const stats = [
    { num: 35 + seed * 3, suffix: '+', label: baseStats[0][0], description: baseStats[0][1] },
    { num: 12 + sig.projects.length * 4, suffix: '+', label: baseStats[1][0], description: baseStats[1][1] },
    { num: 8 + sig.events.length * 3, suffix: '+', label: baseStats[2][0], description: baseStats[2][1] },
    { num: 3 + seed, suffix: '', label: baseStats[3][0], description: baseStats[3][1] },
  ]

  return (
    <section id="stats" className="border-t border-red-950/40 bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-red-900/50" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 font-retro">METRICS</span>
            <div className="h-px w-8 bg-red-900/50" />
          </div>
          <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
            {sig.shortName} telemetry <span className="text-red-600 stranger-glow">recorded</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 gap-10 md:grid-cols-4 md:divide-x md:divide-red-950/40 md:gap-0">
          {stats.map((stat, i) => (
            <StatItem key={`${sig.id}-${stat.label}`} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ stat, index, inView }) {
  const count = useCountUp(stat.num, inView)
  return (
    <motion.div
      className="flex flex-col items-center text-center md:px-6 lg:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span
        className="mb-3 text-6xl leading-none text-red-500 font-retro stranger-glow tabular-nums md:text-7xl"
        style={{
          background: 'linear-gradient(90deg, #ff1a1a 0%, #7f1d1d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {count}{stat.suffix}
      </span>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-red-500/80 font-retro">
        {stat.label}
      </p>
      <p className="max-w-[180px] text-xs leading-relaxed text-neutral-400 font-body">
        {stat.description}
      </p>
    </motion.div>
  )
}
