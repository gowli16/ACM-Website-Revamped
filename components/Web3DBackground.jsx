import { useEffect, useRef } from 'react'

export default function Web3DBackground({ sig }) {
  const canvasRef = useRef(null)
  const sigId = sig?.id || 'web'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Mouse tracking for parallax tilt
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width - 0.5) * 0.7
      mouse.targetY = (e.clientY / height - 0.5) * 0.7
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Define unique themes and behaviors based on SIG ID
    let primaryColor = '#f97316'
    let secondaryColor = '#eab308'
    let nodeSpeed = 0.5

    if (sigId === 'cyber') {
      primaryColor = '#10b981' // Emerald
      secondaryColor = '#06b6d4' // Cyan
      nodeSpeed = 0.6
    } else if (sigId === 'glitch') {
      primaryColor = '#a855f7' // Purple
      secondaryColor = '#ec4899' // Pink
      nodeSpeed = 0.8
    } else if (sigId === 'ai') {
      primaryColor = '#3b82f6' // Blue
      secondaryColor = '#8b5cf6' // Violet
      nodeSpeed = 0.4
    }

    // 3D Matrix points distribution
    const pointsCount = 70
    const points = []
    
    for (let i = 0; i < pointsCount; i++) {
      points.push({
        x: (Math.random() - 0.5) * window.innerWidth * 1.3,
        y: (Math.random() - 0.5) * window.innerHeight * 1.3,
        z: (Math.random() - 0.5) * 800,
        vx: (Math.random() - 0.5) * nodeSpeed,
        vy: (Math.random() - 0.5) * nodeSpeed,
        vz: (Math.random() - 0.5) * nodeSpeed,
        color: i % 2 === 0 ? primaryColor : secondaryColor,
      })
    }

    let angleX = 0
    let angleY = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      angleX = 0.0015 + mouse.y
      angleY = 0.002 + mouse.x

      const cx = width / 2
      const cy = height / 2
      const fov = 600

      // Project and animate full-screen 3D nodes
      const projected = points.map((p) => {
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        const limitX = width * 0.9
        const limitY = height * 0.9
        if (p.x < -limitX || p.x > limitX) p.vx *= -1
        if (p.y < -limitY || p.y > limitY) p.vy *= -1
        if (p.z < -400 || p.z > 400) p.vz *= -1

        let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY)
        let z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY)
        let y1 = p.y

        let y2 = y1 * Math.cos(angleX) - z1 * Math.sin(angleX)
        let z2 = z1 * Math.cos(angleX) + y1 * Math.sin(angleX)
        let x2 = x1

        const scale = fov / (fov + z2 + 400)
        return {
          x: cx + x2 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
          color: p.color,
        }
      })

      // Draw specialized connection webs based on SIG
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i]
          const p2 = projected[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Different connection thresholds for different SIG visual styles
          const maxDist = sigId === 'glitch' ? 140 : 180

          if (dist < maxDist) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const alpha = (1 - dist / maxDist) * 0.25 * Math.min(p1.scale, p2.scale)
            ctx.strokeStyle = primaryColor
            ctx.lineWidth = sigId === 'cyber' ? 0.9 : 0.7
            ctx.globalAlpha = Math.max(0, alpha)
            ctx.stroke()
            ctx.globalAlpha = 1.0
          }
        }
      }

      // Draw nodes
      projected.forEach((p) => {
        if (p.scale <= 0) return

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(1, (sigId === 'glitch' ? 3.5 : 3) * p.scale), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.min(1, Math.max(0.15, p.scale * 0.75))
        ctx.shadowBlur = sigId === 'cyber' ? 14 : 10
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1.0
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [sigId])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020204]">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none" />
    </div>
  )
}