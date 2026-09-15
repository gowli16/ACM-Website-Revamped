import { motion } from 'framer-motion'

export default function WhyWebDev({ sig }) {
  // Only render if we are on the web SIG page
  if (sig?.id !== 'web') return null

  // Embedded cinematic copy to guarantee it renders immediately
  const content = {
    eyebrow: 'THE DIGITAL FRONTIER',
    titlePlain: 'WHY',
    titleHighlight: 'WEB & APP',
    subtitle: "Every click tells a story. Every swipe creates an experience. Web and App Development is the art of transforming ideas into digital realities that millions interact with every day.",
    cards: [
      {
        badge: 'GLOBAL CANVAS',
        title: 'Web Development',
        desc: "In today's digital-first world, every successful business, startup, and innovation begins with a great web or mobile application. Web and App Development is more than writing code—it's about designing experiences, solving problems, and creating technology that people love to use."
      },
      {
        badge: 'RAW EMAGINATION',
        title: 'App Development',
        desc: "Mobile applications occupy the most valuable digital real estate in existence: the user's pocket. Building native and cross-platform mobile apps means mastering high-performance rendering loops, gesture-driven interfaces, deep hardware integrations, and offline-first databases that keep users locked in."
      }
    ]
  }

  return (
    <section className="relative bg-[#020204] py-28 px-6 md:px-12 border-t border-b border-red-950/25 overflow-hidden w-full">
      {/* Cinematic Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/5 via-transparent to-red-950/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-900/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HUGE High-Impact Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-16 h-px bg-red-800/40" />
            <span className="text-xs text-red-500 uppercase tracking-[0.5em] font-extrabold">
              {content.eyebrow}
            </span>
            <div className="w-16 h-px bg-red-800/40" />
          </div>

          <h2 className="text-6xl md:text-8xl font-black uppercase text-neutral-200 tracking-tight leading-none mb-8">
            {content.titlePlain} <span className="text-red-600 drop-shadow-[0_0_35px_rgba(255,26,26,0.6)]">{content.titleHighlight}</span>?
          </h2>

          <p className="text-xl md:text-2xl text-neutral-400 font-medium max-w-4xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Big Side-By-Side Interactive Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {content.cards.map((card, i) => (
            <motion.div
              key={i}
              className="group relative bg-[#06060c]/80 border border-red-950/40 rounded-3xl p-8 md:p-12 backdrop-blur-md hover:border-red-600/30 transition-all duration-500 overflow-hidden"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              {/* Radial subtle red glow on card hover */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-red-900/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-all duration-500" />

              <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-red-500 bg-red-950/40 border border-red-900/40 px-4 py-1.5 rounded-full uppercase">
                {card.badge}
              </span>

              <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-100 uppercase tracking-wide mt-8 mb-6">
                {card.title}
              </h3>

              <p className="text-lg text-neutral-300 leading-relaxed font-medium">
                {card.desc}
              </p>

              {/* Cybernetic Accent Line */}
              <div className="mt-10 flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <div className="w-28 h-px bg-gradient-to-r from-red-600 to-transparent self-center" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}