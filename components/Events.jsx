import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BASE = import.meta.env.BASE_URL;
// Fixes path by removing '../' and prepending the base URL
const fixPath = (path) => path.startsWith('http') ? path : `${BASE}${path.startsWith('../') ? path.slice(3) : path}`;

const eventImages = [
  `${BASE}assets/default-event-1.jpg`, // Replace with actual paths if needed
  `${BASE}assets/default-event-2.jpg`,
]

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Events({ sig }) {
  const [openEvent, setOpenEvent] = useState(null)

  return (
    <section id="events" className="relative z-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-orange-500/50" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 font-retro">TRANSMISSIONS</span>
            </div>
            <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
              {sig.eventsHeadingPlain || 'Workshops &'} <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">{sig.eventsHeadingHighlight || 'operations'}</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400 font-body">
              {sig.eventsDescription || 'A semester of low-pressure sessions for first years: learn, build, ask questions, and find your people.'}
            </p>
          </div>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:bg-white/5 md:inline-flex font-retro"
          >
            Get notified <span className="text-orange-500/50">-&gt;</span>
          </button>
        </motion.div>

        <div className="flex flex-col gap-3">
          {sig.events.map(([title, type, date, image, description, gallery], i) => {
            const entry = { 
                title, 
                type, 
                date, 
                image: fixPath(image || eventImages[i % eventImages.length]), 
                description, 
                gallery: gallery?.map(fixPath) 
            }
            return (
              <EventRow
                key={title}
                entry={entry}
                index={i}
                onOpen={(description || gallery) ? () => setOpenEvent(entry) : undefined}
              />
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {openEvent && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenEvent(null)}
          >
            <motion.div
              className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#020204]/95 p-6 shadow-[0_0_40px_rgba(249,115,22,0.15)] backdrop-blur-xl md:p-8"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <span className="mb-2 inline-block rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white font-retro">
                    {openEvent.type}
                  </span>
                  <h3 className="text-2xl font-extrabold uppercase leading-tight text-neutral-100 font-display md:text-3xl">
                    {openEvent.title}
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-orange-500/80 font-retro">{openEvent.date}</p>
                </div>
                <button onClick={() => setOpenEvent(null)} className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-orange-500/50 hover:text-orange-400 hover:bg-white/5">
                  ✕
                </button>
              </div>

              {openEvent.description && (
                <p className="mb-6 text-sm leading-relaxed text-neutral-400 font-body md:text-base">
                  {openEvent.description}
                </p>
              )}

              {openEvent.gallery && openEvent.gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {openEvent.gallery.map((src, i) => (
                    <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover opacity-90" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function EventRow({ entry, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onOpen}
      className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] sm:gap-6 sm:rounded-full ${onOpen ? 'cursor-pointer' : ''}`}
    >
      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14">
        <img src={entry.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110" />
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="hidden flex-shrink-0 rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-[0_0_10px_rgba(249,115,22,0.3)] font-retro sm:inline-block">
          {entry.type}
        </span>
        <p className="min-w-0 truncate text-sm font-medium text-neutral-300 transition-colors duration-200 group-hover:text-orange-300 font-body sm:text-base">
          {entry.title}
        </p>
      </div>

      <div className="flex flex-shrink-0 items-center gap-4 text-xs font-bold uppercase text-neutral-400 font-retro">
        <span>{entry.date}</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-orange-500/30 text-[10px] text-orange-500 transition-colors group-hover:border-orange-400 group-hover:text-orange-300">-&gt;</span>
      </div>
    </motion.div>
  )
}