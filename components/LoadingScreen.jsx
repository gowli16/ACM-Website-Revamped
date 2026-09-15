import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['CONNECTING SIGNAL...', 'ACM AMRITAPURI', 'FUELING CURIOSITY', 'IGNITING IDEAS', 'SIG RECRUITMENT']

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startTime = useRef(null)
  const rafId = useRef(null)
  const duration = 2800

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      setCount(Math.round(eased * 100))
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => onComplete(), 400)
      }
    }
    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length)
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed h-screen inset-0 z-[9999] bg-[#08040f] flex flex-col overflow-hidden vhs-noise"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Custom styles for animations matching the user's stormy red Mind Flayer picture */}
      <style>{`
        @keyframes petal-snap {
          0%, 100% { transform: scale(0.8) rotate(0deg); }
          45% { transform: scale(1.15) rotate(4deg); }
          50% { transform: scale(0.65) rotate(-2deg); }
          60% { transform: scale(1) rotate(1deg); }
        }
        .animate-petal {
          transform-origin: 50px 50px;
          animation: petal-snap 3.5s infinite ease-in-out;
        }

        /* Lightning Strike */
        @keyframes lightning-strike {
          0%, 86%, 89%, 91%, 93%, 100% {
            opacity: 0;
          }
          87%, 90%, 92% {
            opacity: 0.9;
          }
        }
        .animate-lightning {
          animation: lightning-strike 7s infinite;
        }

        /* Ambient Storm Flash */
        @keyframes storm-flash {
          0%, 86%, 89%, 91%, 93%, 100% {
            opacity: 0.25;
          }
          87%, 90%, 92% {
            opacity: 0.85;
          }
        }
        .animate-storm-flash {
          animation: storm-flash 7s infinite alternate;
        }

        /* Mind Flayer Walk Cycles */
        .left-outer-leg {
          transform-origin: 470px 380px;
          animation: walk-left-1 6s ease-in-out infinite alternate;
        }
        .left-inner-leg {
          transform-origin: 475px 390px;
          animation: walk-left-2 4.5s ease-in-out infinite alternate;
        }
        .right-outer-leg {
          transform-origin: 530px 380px;
          animation: walk-right-1 6s ease-in-out infinite alternate;
        }
        .right-inner-leg {
          transform-origin: 525px 390px;
          animation: walk-right-2 4.5s ease-in-out infinite alternate;
        }
        .flayer-body {
          transform-origin: 500px 380px;
          animation: body-breathe 5s ease-in-out infinite alternate;
        }

        @keyframes walk-left-1 {
          0% { transform: rotate(0deg) scaleY(1); }
          100% { transform: rotate(-5deg) scaleY(0.97) translateY(-3px); }
        }
        @keyframes walk-left-2 {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(5deg) scale(1.03) translateY(4px); }
        }
        @keyframes walk-right-1 {
          0% { transform: rotate(0deg) scaleY(1); }
          100% { transform: rotate(5deg) scaleY(0.97) translateY(-3px); }
        }
        @keyframes walk-right-2 {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(-5deg) scale(1.03) translateY(4px); }
        }
        @keyframes body-breathe {
          0% { transform: translateY(0) scaleY(1); }
          100% { transform: translateY(-7px) scaleY(1.04); }
        }
      `}</style>

      {/* ── Stormy Sky Backdrop ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 animate-storm-flash opacity-25"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(255, 79, 163, 0.45) 0%, rgba(18, 11, 34, 0.2) 60%, rgba(8, 4, 15, 1) 100%)'
        }}
      />

      {/* ── Lightning Strike ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg viewBox="0 0 200 400" className="absolute top-8 left-[38%] w-1/4 h-2/3 text-[#fffaff] fill-none stroke-current opacity-0 animate-lightning pointer-events-none" style={{ filter: 'drop-shadow(0 0 10px #ff4fa3) drop-shadow(0 0 25px #9b6cff)' }}>
          <path d="M 50,0 L 70,80 L 40,140 L 90,200 L 30,290 L 70,400" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 70,80 L 95,120 L 110,160" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 40,140 L 15,180 L 5,210" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 90,200 L 120,240 L 140,280" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Animated Mind Flayer Walking/Breathing in Storm ── */}
      <div 
        className="absolute inset-x-0 bottom-12 top-0 flex items-center justify-center pointer-events-none z-0 transition-all duration-300"
        style={{
          opacity: (count / 100) * 0.12,
          transform: `scale(${0.92 + (count / 100) * 0.14})`
        }}
      >
        <svg viewBox="0 0 1000 600" className="w-full max-w-5xl h-full text-[#1a1030] fill-current" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 79, 163, 0.15))' }}>
          {/* Main Body Spike Head */}
          <path d="M 480,380 C 480,380 500,260 500,260 C 500,260 520,380 520,380 Z" className="flayer-body" />
          
          {/* Left Outer Leg */}
          <path d="M 470,380 C 400,320 250,280 150,300 C 50,320 0,400 0,400 C 0,400 40,360 120,340 C 220,320 380,340 470,380 Z" className="left-outer-leg" />
          
          {/* Left Inner Leg */}
          <path d="M 475,390 C 400,360 300,380 250,450 C 230,480 220,530 220,530 C 220,530 240,490 280,450 C 350,390 420,400 475,390 Z" className="left-inner-leg" />
          
          {/* Right Outer Leg */}
          <path d="M 530,380 C 600,320 750,280 850,300 C 950,320 1000,400 1000,400 C 1000,400 960,360 880,340 C 780,320 620,340 530,380 Z" className="right-outer-leg" />
          
          {/* Right Inner Leg */}
          <path d="M 525,390 C 600,360 700,380 750,450 C 770,480 780,530 780,530 C 780,530 760,490 720,450 C 650,390 580,400 525,390 Z" className="right-inner-leg" />
          
          {/* Central Body Trunk */}
          <path d="M 470,380 L 530,380 L 530,600 L 470,600 Z" className="flayer-body" />
        </svg>
      </div>

      {/* ── Horizonal Horizon Silhouette (Matching the picture) ── */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-[#08040f]/90 z-10 border-t border-[#120b22] pointer-events-none select-none">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full text-[#08040f] fill-current absolute bottom-0">
          <path d="M 0,100 L 0,60 Q 150,55 300,68 Q 450,75 600,60 Q 750,55 900,68 L 1000,60 L 1000,100 Z" />
          {/* Small towers/antennas silhouettes like the photo */}
          <rect x="440" y="25" width="6" height="40" fill="#000000" />
          <circle cx="443" cy="22" r="3.5" fill="#000000" stroke="#ff4fa3" strokeWidth="1" className="animate-pulse" />
          
          <path d="M 280,68 L 285,42 M 285,42 L 278,45" stroke="#000000" strokeWidth="2" />
          <path d="M 720,68 L 722,46 L 726,48" stroke="#000000" strokeWidth="2" />
        </svg>
      </div>

      {/* ── Snapping Demogorgon (Pulsing silhouette in bottom-right corner) ── */}
      <div className="absolute bottom-28 right-10 md:right-16 z-20 pointer-events-none select-none opacity-[0.06]">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#ff4fa3] fill-current animate-petal">
          {/* Neck / base */}
          <path d="M 42,80 Q 30,95 20,100 L 80,100 Q 70,95 58,80 Z" />
          {/* Inner core mouth cavity */}
          <circle cx="50" cy="50" r="10" />
          {/* 5 Petal flaps with small teeth silhouettes */}
          {/* Top Petal */}
          <path d="M 50,42 C 43,15 57,15 50,42 Z" />
          {/* Top Right Petal */}
          <path d="M 57,47 C 82,30 85,45 57,47 Z" />
          {/* Bottom Right Petal */}
          <path d="M 55,56 C 75,76 60,86 55,56 Z" />
          {/* Bottom Left Petal */}
          <path d="M 45,56 C 25,86 15,76 45,56 Z" />
          {/* Top Left Petal */}
          <path d="M 43,47 C 15,45 18,30 43,47 Z" />
        </svg>
      </div>

      {/* Top-left — Club identity */}
      <motion.div
        className="absolute top-8 left-8 md:top-10 md:left-10 flex items-center gap-3 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <img src="/acm/assets/acm-amritapuri-logo.png" alt="ACM Amritapuri" className="h-10 w-auto object-contain" />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#ff4fa3] font-retro tracking-[0.3em] font-bold">
            ACM AMRITAPURI
          </span>
          <span className="text-[10px] text-[#a294b2] uppercase tracking-[0.2em] font-retro">
            S1 Induction - SIG Recruitment
          </span>
        </div>
      </motion.div>

      {/* Top-right — tagline */}
      <motion.div
        className="absolute top-8 right-8 md:top-10 md:right-10 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      >
        <span className="text-[15px] text-[#ff4fa3]/70 uppercase tracking-[0.25em] font-retro">
          fueling curiosity - igniting ideas
        </span>
      </motion.div>

      {/* Center — cycling word */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3 z-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-[#ff4fa3] select-none stranger-glow uppercase tracking-wider text-center px-4"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-[#a294b2] uppercase tracking-[0.3em] font-retro font-bold mt-2">
          RECRUITMENT PORTAL
        </span>
      </div>

      {/* Bottom — counter + progress bar */}
      <div className="px-8 md:px-10 pb-8 md:pb-10 z-10">
        <div className="flex items-end justify-between mb-2">
          <span className="text-xs text-[#a294b2]/80 uppercase tracking-[0.25em] font-retro self-end mb-2 font-bold">
            OPENING ACM PORTAL
          </span>
          <span className="text-7xl md:text-9xl font-retro text-[#ff4fa3] stranger-glow tabular-nums leading-none">
            {String(count).padStart(3, '0')}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[4px] bg-[#120b22] rounded-full overflow-hidden border border-[#1a1030]">
          <motion.div
            className="h-full bg-[#ff4fa3] rounded-full"
            style={{
              scaleX: count / 100,
              transformOrigin: 'left',
              boxShadow: '0 0 10px rgba(255, 79, 163, 0.75)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}