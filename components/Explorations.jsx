import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL;

// Helper to fix paths dynamically
const fixPath = (path) => path.startsWith('http') ? path : `${BASE}${path.startsWith('../') ? path.slice(3) : path}`;

// Image arrays with pathing fix
const defaultCards = [
  { id: 1, image: fixPath('assets/aiAchievements/agenticaiworkshop.jpeg'), width: 480 },
  { id: 2, image: fixPath('assets/aiAchievements/aiachievement1.jpeg'), width: 460 },
  { id: 3, image: fixPath('assets/aiAchievements/aiachievement2.jpeg'), width: 470 },
  { id: 4, image: fixPath('assets/aiAchievements/epochon2_0.jpeg'), width: 450 },
]

const cyberCards = [
  { id: 1, image: fixPath('assets/cyberExplorations/1.jpeg'), width: 480 },
  { id: 2, image: fixPath('assets/cyberExplorations/2.jpeg'), width: 460 },
  { id: 3, image: fixPath('assets/cyberExplorations/3.jpeg'), width: 470 },
  { id: 4, image: fixPath('assets/cyberExplorations/4.jpeg'), width: 450 },
  { id: 5, image: fixPath('assets/cyberExplorations/5.jpeg'), width: 480 },
  { id: 6, image: fixPath('assets/cyberExplorations/6.jpeg'), width: 480 },
  { id: 7, image: fixPath('assets/cyberExplorations/7.jpeg'), width: 480 },
]

const glitchCards = [
  { id: 1, image: fixPath('assets/glitchExplorations/1.jpg'), width: 480 },
  { id: 2, image: fixPath('assets/glitchExplorations/2.jpg'), width: 460 },
  { id: 3, image: fixPath('assets/glitchExplorations/3.jpg'), width: 470 },
  { id: 4, image: fixPath('assets/glitchExplorations/4.jpg'), width: 450 },
  { id: 5, image: fixPath('assets/glitchExplorations/5.jpg'), width: 480 },
  { id: 6, image: fixPath('assets/glitchExplorations/6.jpg'), width: 480 },
  { id: 7, image: fixPath('assets/glitchExplorations/7.jpg'), width: 480 },
  { id: 8, image: fixPath('assets/glitchExplorations/8.jpg'), width: 420 },
]

const webCards = [
  { id: 1, image: fixPath('assets/webexplorations/1.jpeg'), width: 480 },
  { id: 2, image: fixPath('assets/webexplorations/2.jpeg'), width: 460 },
  { id: 3, image: fixPath('assets/webexplorations/3.jpeg'), width: 470 },
  { id: 4, image: fixPath('assets/webexplorations/4.jpeg'), width: 450 },
  { id: 5, image: fixPath('assets/webexplorations/5.jpeg'), width: 480 },
  { id: 10, image: fixPath('assets/webexplorations/10.jpeg'), width: 460 },
]

function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() < 0.7 ? 1.5 : Math.random() < 0.9 ? 2.5 : 3.5,
    opacity: 0.15 + Math.random() * 0.55,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  }))
}

const SCROLL_VH = 1600 
const SCRUB = 3 
const WINDOW_SIZE = 0.3 
const TOTAL_TURNS = 1.6 
const START_Y_VH = 75 
const END_Y_VH = -75 
const RADIUS_BASE_VH = 30 
const RADIUS_BULGE_VH = 12 
const EDGE_FADE = 0.16 

export default function Explorations({ sig = {} }) {
  const sectionRef = useRef(null)
  const pinnedRef = useRef(null)
  const cardRefs = useRef([])
  const [lightbox, setLightbox] = useState(null)
  const stars = useMemo(() => generateStars(80), [])

  const activeCards = sig?.id === 'cyber' 
    ? cyberCards 
    : sig?.id === 'glitch' 
    ? glitchCards 
    : sig?.id === 'web'
    ? webCards
    : defaultCards

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedRef.current,
        pinSpacing: false,
      })

      const count = activeCards.length
      const spread = 1 - WINDOW_SIZE 

      const updateSpiral = progress => {
        cardRefs.current.forEach((el, i) => {
          if (!el) return
          const offset = count > 1 ? (i / (count - 1)) * spread : 0
          const localP = gsap.utils.clamp(0, 1, (progress - offset) / WINDOW_SIZE)
          const y = gsap.utils.interpolate(START_Y_VH, END_Y_VH, localP)
          const baseAngle = (i * 360) / count
          const angle = baseAngle + localP * TOTAL_TURNS * 360
          const angleRad = (angle * Math.PI) / 180
          const radius = RADIUS_BASE_VH + Math.sin(localP * Math.PI) * RADIUS_BULGE_VH
          const x = radius * Math.sin(angleRad)
          const depth = Math.cos(angleRad) 
          const depthT = (depth + 1) / 2
          const scale = gsap.utils.interpolate(0.55, 1.2, depthT)
          const depthOpacity = gsap.utils.interpolate(0.35, 1, depthT)
          const zIndex = Math.round(depthT * 500)
          let edgeFade = 1
          if (localP < EDGE_FADE) edgeFade = localP / EDGE_FADE
          else if (localP > 1 - EDGE_FADE) edgeFade = (1 - localP) / EDGE_FADE
          gsap.set(el, { x: `${x}vh`, y: `${y}vh`, scale, opacity: depthOpacity * edgeFade, zIndex })
        })
      }

      updateSpiral(0)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: SCRUB,
        onUpdate: self => updateSpiral(self.progress),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [activeCards])

  return (
    <>
      <section ref={sectionRef} id="achievements" className="relative bg-bg" style={{ minHeight: `${SCROLL_VH}vh` }}>
        <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#020204] via-red-950/5 to-[#020204]">
          <style>{`
            @keyframes lightning-flash { 0%, 93%, 95%, 97%, 100% { opacity: 0; } 94%, 96% { opacity: 0.2; background-color: #ff1a1a; } }
            @keyframes pulse-rift { 0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 8px #ff1a1a); } 50% { opacity: 0.65; filter: drop-shadow(0 0 20px #e50914); } }
            @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
            .animate-lightning { animation: lightning-flash 9s infinite alternate; }
            .animate-pulse-rift { animation: pulse-rift 4s infinite ease-in-out; }
          `}</style>
          <div className="absolute inset-0 pointer-events-none z-[2] animate-lightning" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-64 pointer-events-none z-0 flex items-center justify-center animate-pulse-rift">
            <svg viewBox="0 0 100 800" className="h-full w-full text-red-600 fill-current opacity-40">
              <path d="M 50,0 Q 48,100 52,200 Q 55,300 48,400 Q 43,500 51,600 Q 55,700 50,800 L 51,800 Q 56,700 52,600 Q 44,500 49,400 Q 56,300 53,200 Q 49,100 51,0 Z" />
              <path d="M 50,250 Q 30,230 15,200 M 52,380 Q 75,410 90,430 M 47,550 Q 25,580 10,620 M 53,150 Q 70,120 85,90" stroke="#ff1a1a" strokeWidth="1.5" fill="none" className="opacity-60" />
            </svg>
          </div>
          <div className="absolute inset-0 pointer-events-none z-0">
            {stars.map(star => (
              <div key={star.id} className="absolute rounded-full bg-red-600/30 shadow-[0_0_6px_#ff1a1a]" style={{ top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity, animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite alternate` }} />
            ))}
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            {activeCards.map((card, index) => (
              <SpiralCard key={card.id} card={card} onCardClick={() => setLightbox(card)} innerRef={el => (cardRefs.current[index] = el)} />
            ))}
          </div>
          {sig?.id !== 'cyber' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <motion.div className="text-center px-6 max-w-md pointer-events-auto" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-px bg-red-900/50" />
                  <span className="text-[10px] text-red-500 uppercase tracking-[0.35em] font-bold">INVESTIGATIONS</span>
                  <div className="w-8 h-px bg-red-900/50" />
                </div>
                <h2 className="text-5xl md:text-6xl font-extrabold uppercase text-neutral-200 leading-tight mb-4">
                  <span className="text-red-600 drop-shadow-[0_0_20px_rgba(255,26,26,0.8)]">Gallery</span>
                </h2>
              </motion.div>
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-md flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <motion.img src={lightbox.image} alt="" className="max-w-full max-h-full rounded-2xl border border-red-950/40 object-contain shadow-2xl shadow-red-950/10" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.3 }} onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SpiralCard({ card, onCardClick, innerRef }) {
  return (
    <div className="absolute pointer-events-auto" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: card.width }}>
      <div ref={innerRef}>
        <motion.div className="relative rounded-2xl overflow-hidden cursor-pointer border border-red-950/40 shadow-2xl shadow-red-950/20 backdrop-blur-sm" style={{ boxShadow: '0 0 30px rgba(255, 26, 26, 0.2), 0 20px 40px rgba(0, 0, 0, 0.6)' }} whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(255, 26, 26, 0.5), 0 30px 60px rgba(0, 0, 0, 0.8)' }} transition={{ duration: 0.4, ease: 'easeOut' }} onClick={onCardClick}>
          <img src={card.image} alt="" loading="lazy" className="w-full aspect-[21/9] object-cover opacity-85" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-950/40 pointer-events-none" />
          <div className="absolute inset-0 border border-red-500/10 rounded-2xl pointer-events-none" />
        </motion.div>
      </div>
    </div>
  )
}