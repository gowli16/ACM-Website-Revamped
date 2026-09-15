import { useEffect, useState } from 'react'

export default function Spores() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 1.5, // 1.5px to 6.5px
      delay: Math.random() * -30, // Negative delay to prevent all starting at bottom together
      duration: Math.random() * 25 + 20, // 20s to 45s
      opacity: Math.random() * 0.4 + 0.15,
      drift: Math.random() * 120 - 60 // Horizontal drift
    }))
    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <style>{`
        @keyframes driftUp {
          0% {
            transform: translateY(105vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: var(--particle-opacity);
          }
          85% {
            opacity: var(--particle-opacity);
          }
          100% {
            transform: translateY(-5vh) translateX(var(--drift-x)) rotate(360deg);
            opacity: 0;
          }
        }
        .spore-particle {
          animation: driftUp var(--duration) linear infinite;
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-neutral-400/40 backdrop-blur-[0.5px] spore-particle"
          style={{
            left: p.left,
            bottom: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--duration': `${p.duration}s`,
            '--particle-opacity': p.opacity,
            '--drift-x': `${p.drift}px`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
