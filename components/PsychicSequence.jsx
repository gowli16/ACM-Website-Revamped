import { useState, useEffect } from 'react'

export default function PsychicSequence({ onComplete }) {
  const [terminalText, setTerminalText] = useState('')
  const [isGlitching, setIsGlitching] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const [phase, setPhase] = useState('fade-in') // fade-in, raise-hand, glitching, flash, fade-out

  useEffect(() => {
    // Synth audio chime generator (Web Audio API)
    const playChime = (delayTime, pitch = 82.4) => {
      const timer = setTimeout(() => {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext
          if (!AudioContext) return
          const ctx = new AudioContext()
          const now = ctx.currentTime
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(pitch, now)
          osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, now + 2.2)
          
          gain.gain.setValueAtTime(0.35, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.1)
          
          const filter = ctx.createBiquadFilter()
          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(200, now)
          
          osc.connect(filter)
          filter.connect(gain)
          gain.connect(ctx.destination)
          
          osc.start(now)
          osc.stop(now + 2.2)
        } catch (e) {
          console.log(e)
        }
      }, delayTime)
      return timer
    }

    // Schedule 4 deep chimes matching Vecna's grandfather clock!
    const chime1 = playChime(100, 82.4)  // E2
    const chime2 = playChime(1000, 73.4) // D2
    const chime3 = playChime(2000, 65.4) // C2
    const chime4 = playChime(3000, 55.0) // A1

    // Phase Timeline
    // 0.5s: Raise Hand begins
    const tHand = setTimeout(() => {
      setPhase('raise-hand')
    }, 500)

    // 1.8s: Glitching begins & Terminal logs
    const tGlitchStart = setTimeout(() => {
      setPhase('glitching')
      setIsGlitching(true)
      setTerminalText('SYSTEM OVERRIDE DETECTED...')
    }, 1800)

    // 2.5s: Signal lost log
    const tTerminal2 = setTimeout(() => {
      setTerminalText('SIGNAL LOST IN ACM AMRITAPURI NODE...')
    }, 2550)

    // 3.2s: Portal breach log
    const tTerminal3 = setTimeout(() => {
      setTerminalText('WARNING: DIMENSIONAL BREACH ACTIVE...')
    }, 3200)

    // 3.8s: Flash phase (white-out)
    const tFlash = setTimeout(() => {
      setPhase('flash')
      setIsFlashing(true)
      setTerminalText('ENTERING ANOTHER DIMENSION...')
    }, 3800)

    // 4.2s: Complete (Trigger Flip)
    const tComplete = setTimeout(() => {
      onComplete()
      setPhase('fade-out')
      setIsFlashing(false)
      setIsGlitching(false)
    }, 4200)

    return () => {
      clearTimeout(chime1)
      clearTimeout(chime2)
      clearTimeout(chime3)
      clearTimeout(chime4)
      clearTimeout(tHand)
      clearTimeout(tGlitchStart)
      clearTimeout(tTerminal2)
      clearTimeout(tTerminal3)
      clearTimeout(tFlash)
      clearTimeout(tComplete)
    }
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center transition-all pointer-events-auto ${
        phase === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-[#020204]'
      }`}
      style={{ transitionDuration: '600ms' }}
    >
      {/* Cinematic CSS Keyframes */}
      <style>{`
        @keyframes float-dust {
          0% { transform: translateY(80px) translateX(0) scale(0.8); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-160px) translateX(-20px) scale(0.5); opacity: 0; }
        }
        @keyframes arm-raise-psychic {
          0% { transform: rotate(38deg); }
          100% { transform: rotate(-12deg); }
        }
        @keyframes head-vibrate {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-1.5px, 1px); }
          40% { transform: translate(1px, -1.5px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1.5px, 1.5px); }
        }
        @keyframes screen-flicker-glitch {
          0%, 100% { opacity: 0.95; }
          45% { opacity: 0.3; background-color: rgba(229, 9, 20, 0.15); }
          50% { opacity: 0.85; background-color: rgba(229, 9, 20, 0.05); }
          55% { opacity: 0.1; }
          85% { opacity: 0.7; }
        }
        @keyframes rgb-split-glow {
          0%, 100% { filter: drop-shadow(0 0 5px #e50914); }
          50% { filter: drop-shadow(-3px 2px 2px #06b6d4) drop-shadow(3px -1px 2px #e50914); }
        }
        @keyframes lightning-border {
          0%, 100% { opacity: 0.1; }
          45% { opacity: 0.9; box-shadow: inset 0 0 15px #e50914, 0 0 10px #e50914; }
          50% { opacity: 0.2; }
          85% { opacity: 0.85; box-shadow: inset 0 0 25px #e50914, 0 0 20px #e50914; }
        }
        @keyframes portal-pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 12px #ff1a1a); }
          50% { filter: drop-shadow(0 0 35px #ff1a1a) drop-shadow(0 0 15px #e50914); }
        }
        @keyframes tracking-bar {
          0% { top: -20%; }
          100% { top: 120%; }
        }
        .animate-float-dust {
          animation: float-dust 3.5s infinite linear;
        }
        .animate-arm-psychic {
          transform-origin: 108px 122px;
          animation: arm-raise-psychic 2.5s forwards cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .animate-vibrate {
          animation: head-vibrate 0.15s infinite;
        }
        .animate-flicker-glitch {
          animation: screen-flicker-glitch 0.4s infinite;
        }
        .animate-rgb-split {
          animation: rgb-split-glow 0.3s infinite;
        }
        .animate-lightning-border {
          animation: lightning-border 0.5s infinite;
        }
        .animate-nosebleed {
          animation: nosebleed-flow 2s forwards ease-out;
        }
        .animate-portal-glow {
          animation: portal-pulse-glow 1.5s infinite ease-in-out;
        }
        .animate-tracking-bar {
          animation: tracking-bar 1.8s infinite linear;
        }
      `}</style>

      {/* ── Creeping corner vines overlay (creeps in during sequence) ── */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        {/* Top Left Vine */}
        <svg 
          className={`absolute top-0 left-0 w-52 h-52 text-[#080102] fill-current drop-shadow-[0_0_12px_#7f1d1d] transition-all ${
            phase === 'fade-in' ? '-translate-x-20 -translate-y-20 scale-90' : 'translate-x-0 translate-y-0 scale-100'
          }`}
          style={{ transitionDuration: '2500ms' }}
        >
          <path d="M 0,0 C 30,10 60,30 80,60 C 90,75 100,50 90,30 C 80,10 40,0 0,0 Z M 0,30 C 20,40 40,70 50,90 C 45,70 30,50 0,30 Z M 15,10 C 25,20 35,45 40,55 C 38,40 28,25 15,10 Z" />
        </svg>
        {/* Top Right Vine */}
        <svg 
          className={`absolute top-0 right-0 w-52 h-52 text-[#080102] fill-current drop-shadow-[0_0_12px_#7f1d1d] transition-all ${
            phase === 'fade-in' ? 'translate-x-20 -translate-y-20 scale-90' : 'translate-x-0 translate-y-0 scale-100'
          }`}
          style={{ transitionDuration: '2500ms' }}
        >
          <path d="M 200,0 C 170,10 140,30 120,60 C 110,75 100,50 110,30 C 120,10 160,0 200,0 Z M 200,30 C 180,40 160,70 150,90 C 155,70 170,50 200,30 Z M 185,10 C 175,20 165,45 160,55 C 162,40 172,25 185,10 Z" />
        </svg>
        {/* Bottom Left Vine */}
        <svg 
          className={`absolute bottom-0 left-0 w-52 h-52 text-[#080102] fill-current drop-shadow-[0_0_12px_#7f1d1d] transition-all ${
            phase === 'fade-in' ? '-translate-x-20 translate-y-20 scale-90' : 'translate-x-0 translate-y-0 scale-100'
          }`}
          style={{ transitionDuration: '2500ms' }}
        >
          <path d="M 0,200 C 30,190 60,170 80,140 C 90,125 100,150 90,170 C 80,190 40,200 0,200 Z M 0,170 C 20,160 40,130 50,110 C 45,130 30,150 0,170 Z M 15,190 C 25,180 35,155 40,145 C 38,160 28,175 15,190 Z" />
        </svg>
        {/* Bottom Right Vine */}
        <svg 
          className={`absolute bottom-0 right-0 w-52 h-52 text-[#080102] fill-current drop-shadow-[0_0_12px_#7f1d1d] transition-all ${
            phase === 'fade-in' ? 'translate-x-20 translate-y-20 scale-90' : 'translate-x-0 translate-y-0 scale-100'
          }`}
          style={{ transitionDuration: '2500ms' }}
        >
          <path d="M 200,200 C 170,190 140,170 120,140 C 110,125 100,150 110,170 C 120,190 160,200 200,200 Z M 200,170 C 180,160 160,130 150,110 C 155,130 170,150 200,170 Z M 185,190 C 175,180 165,155 160,145 C 162,160 172,175 185,190 Z" />
        </svg>
      </div>

      {/* ── Horizontal Scrolling Analog VHS tracking bar ── */}
      {isGlitching && (
        <div className="absolute left-0 w-full h-10 bg-neutral-100/5 backdrop-blur-[1px] border-y border-white/10 z-[102] pointer-events-none animate-tracking-bar" />
      )}

      {/* ── Lightning borders surrounding screen (Flashes during glitching phase) ── */}
      {isGlitching && (
        <div className="absolute inset-0 pointer-events-none z-[100] animate-lightning-border border border-red-600/20" />
      )}

      {/* ── Fog & Scanline Glitch Filter Overlay ── */}
      {isGlitching && (
        <div className="absolute inset-0 pointer-events-none z-[99] animate-flicker-glitch bg-repeating-linear-gradient" style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 2px, transparent 2px, transparent 4px)'
        }} />
      )}

      {/* ── Glowing white-red portal flash ── */}
      {isFlashing && (
        <div className="absolute inset-0 z-[101] bg-white transition-colors duration-200" style={{
          animation: 'storm-flash 0.12s infinite alternate',
          backgroundColor: '#eae6d8'
        }} />
      )}

      {/* ── Dust Spores & Energy Particles (psychic cloud) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 28 }).map((_, i) => {
          const left = Math.random() * 100
          const top = Math.random() * 60 + 20
          const size = Math.random() * 3.5 + 1
          const delay = Math.random() * 2.5
          const duration = Math.random() * 2 + 1.8
          return (
            <div 
              key={i}
              className="absolute bg-red-600 rounded-full animate-float-dust shadow-[0_0_8px_#ff1a1a]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          )
        })}
      </div>

      {/* ── Giant Mind Flayer Outline rising behind the portal ── */}
      {(phase === 'glitching' || phase === 'flash') && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-[620px] h-[620px] text-black/85 fill-current filter blur-[4px] animate-pulse">
            {/* Core body */}
            <ellipse cx="100" cy="80" rx="30" ry="12" />
            {/* Six writhing giant limbs */}
            <path d="M 85,80 Q 50,50 20,60 Q 40,80 85,82" />
            <path d="M 115,80 Q 150,50 180,60 Q 160,80 115,82" />
            <path d="M 80,82 Q 40,90 10,120 Q 50,110 80,85" />
            <path d="M 120,82 Q 160,90 190,120 Q 150,110 120,85" />
            <path d="M 90,88 Q 70,130 50,180 Q 75,140 95,88" />
            <path d="M 110,88 Q 130,130 150,180 Q 125,140 105,88" />
          </svg>
        </div>
      )}


      {/* ── Mysterious Girl (Eleven Reaching Out Image) ── */}
      <div 
        className={`relative w-80 h-80 z-20 flex items-center justify-center transition-all ${
          phase === 'raise-hand' ? 'scale-105' : phase === 'glitching' ? 'scale-115 animate-vibrate' : ''
        }`}
        style={{ transitionDuration: '700ms' }}
      >
        <img 
          src="/eleven-psychic.png"
          alt="Eleven Reaching Out"
          className={`w-full h-full object-cover transition-all ${
            isGlitching ? 'animate-rgb-split filter brightness-110 contrast-125' : 'filter brightness-90'
          }`}
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 35%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 75%)',
            transitionDuration: '800ms'
          }}
        />

        {/* Nosebleed drop animation (flows from Eleven's nose at 52% 43.5%) */}
        {phase === 'glitching' && (
          <div 
            className="absolute w-[2px] bg-red-600 rounded-full animate-nosebleed z-30" 
            style={{ 
              top: '43.5%', 
              left: '52%',
              boxShadow: '0 0 4px #ff1a1a'
            }} 
          />
        )}
      </div>

      {/* ── Retro CRT Terminal Feedback Text ── */}
      {terminalText && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/90 border border-red-900/60 p-4 font-retro rounded text-[11px] tracking-[0.25em] text-red-500 text-center w-80 max-w-sm shadow-[0_0_20px_rgba(229,9,20,0.15)] z-50">
          <span className="animate-pulse font-bold">{terminalText}</span>
        </div>
      )}
    </div>
  )
}
