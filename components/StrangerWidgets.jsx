import { useState, useEffect } from 'react'

export default function StrangerWidgets({ isTelekinesisActive, onToggleTelekinesis, isUpsideDown, onTogglePortal }) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [radarStatus, setRadarStatus] = useState({ text: 'SECURE', level: 0, danger: false })

  // Track scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) return
      const pct = window.scrollY / totalScroll
      setScrollPercent(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update proximity radar based on scroll position
  useEffect(() => {
    // Achievements section is roughly in the middle of the scroll (0.35 to 0.65 scrollPercent)
    if (scrollPercent > 0.38 && scrollPercent < 0.68) {
      const proximity = Math.round(((scrollPercent - 0.38) / 0.3) * 100)
      const clampedProximity = Math.max(0, Math.min(100, proximity))
      
      setRadarStatus({
        text: `BREACH DETECTED: ${clampedProximity}%`,
        level: clampedProximity,
        danger: true
      })
    } else if (scrollPercent >= 0.68) {
      setRadarStatus({
        text: 'ANOMALY PAST: 12%',
        level: 12,
        danger: false
      })
    } else {
      const level = Math.round(scrollPercent * 15)
      setRadarStatus({
        text: `SCANNING: ${level}%`,
        level: level,
        danger: false
      })
    }
  }, [scrollPercent])

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 font-retro select-none">
      <style>{`
        @keyframes radar-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes nosebleed-flow {
          0% { height: 0px; opacity: 0; }
          100% { height: 11px; opacity: 1; }
        }
        .animate-radar-pulse {
          animation: radar-pulse 1.2s infinite;
        }
        .animate-nosebleed {
          animation: nosebleed-flow 2.5s forwards ease-out;
        }
      `}</style>

      {/* Radar Panel */}
      <div 
        className={`w-48 p-2.5 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 transition-all duration-300 flex items-center gap-2.5 shadow-2xl ${
          radarStatus.danger 
            ? 'border-red-600 shadow-red-950/20' 
            : 'border-neutral-800 shadow-black/50'
        }`}
      >
        {/* Blinking indicator */}
        <div className="relative flex h-3 w-3 flex-shrink-0">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-radar-pulse ${
            radarStatus.danger ? 'bg-red-500' : 'bg-green-500/70'
          }`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${
            radarStatus.danger ? 'bg-red-600' : 'bg-green-600'
          }`} />
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[9px] text-neutral-500 tracking-widest uppercase">PROXIMITY RADAR</span>
          <span className={`text-[11px] font-bold tracking-wider truncate uppercase ${
            radarStatus.danger ? 'text-red-500 animate-pulse' : 'text-green-500/80'
          }`}>
            {radarStatus.text}
          </span>
        </div>
      </div>

      {/* Eleven Trigger Button */}
      <button
        onClick={onToggleTelekinesis}
        className={`w-48 p-2.5 rounded-xl border bg-neutral-900/90 backdrop-blur-md flex items-center gap-3 transition-all duration-300 cursor-pointer text-left shadow-2xl ${
          isTelekinesisActive 
            ? 'border-red-600 shadow-red-950/40 text-red-500' 
            : 'border-neutral-800 shadow-black/50 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
        }`}
      >
        {/* Eleven Avatar */}
        <div className="relative w-9 h-9 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center flex-shrink-0 overflow-visible">
          <svg viewBox="0 0 100 100" className={`w-7 h-7 fill-current transition-colors duration-300 ${
            isTelekinesisActive ? 'text-red-500' : 'text-neutral-500'
          }`}>
            {/* Shaved head silhouette */}
            <circle cx="50" cy="45" r="22" />
            <path d="M 32,32 C 35,22 45,18 50,18 C 55,18 65,22 68,32 C 60,25 40,25 32,32 Z" fill="#1c1c1c" />
            {/* Blindfold */}
            <rect x="26" y="37" width="48" height="9" rx="1.5" fill="#000" />
            <path d="M 23,41 L 18,43 M 77,41 L 82,43" stroke="#000" strokeWidth="2" />
            {/* Dress / shoulders */}
            <path d="M 35,67 C 35,67 25,90 20,95 L 80,95 C 75,90 65,67 65,67 Z" />
          </svg>

          {/* Nosebleed drop */}
          {isTelekinesisActive && (
            <div className="absolute top-[22px] left-[17px] w-[2px] bg-red-600 rounded-full animate-nosebleed z-10" />
          )}
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[9px] text-neutral-500 tracking-widest uppercase">TELEKINESIS</span>
          <span className="text-[11px] font-bold tracking-wider">
            {isTelekinesisActive ? 'ACTIVE (BODY)' : 'ACTIVATE FORCE'}
          </span>
        </div>
      </button>

      {/* Dimensional Portal Switch */}
      <button
        onClick={onTogglePortal}
        className={`w-48 p-2.5 rounded-xl border bg-neutral-900/90 backdrop-blur-md flex items-center gap-3 transition-all duration-300 cursor-pointer text-left shadow-2xl ${
          isUpsideDown 
            ? 'border-red-600 shadow-red-950/40 text-red-500' 
            : 'border-neutral-800 shadow-black/50 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
        }`}
      >
        {/* Portal Icon */}
        <div className="relative w-9 h-9 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center flex-shrink-0 overflow-visible">
          <svg viewBox="0 0 100 100" className={`w-6 h-6 fill-none stroke-current stroke-2 transition-colors duration-300 ${
            isUpsideDown ? 'text-red-500' : 'text-neutral-500'
          }`}>
            {/* Rift Crack */}
            <path d="M 50,15 L 42,35 L 58,45 L 38,65 L 55,75 L 50,85" strokeWidth="4" />
          </svg>
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[9px] text-neutral-500 tracking-widest uppercase">DIMENSIONAL GATE</span>
          <span className="text-[11px] font-bold tracking-wider">
            {isUpsideDown ? 'GATE: OPEN' : 'OPEN THE RIFT'}
          </span>
        </div>
      </button>
    </div>
  )
}
