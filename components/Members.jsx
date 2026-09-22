import { useEffect, useRef } from 'react'

export default function Web3DBackground({ sig }) {
  const canvasRef = useRef(null)
  const sigId = sig?.id || 'web'
  const isCyber = sigId === 'cyber'

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

    // Mouse tracking for 3D parallax tilt
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width - 0.5) * 0.8
      mouse.targetY = (e.clientY / height - 0.5) * 0.8
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Setup for Cyber 3D data streams & bokeh
    let streamLines = []
    let bokehParticles = []
    let fingerprintOffset = 0

    if (isCyber) {
      // Initialize data trace lines coming down
      for (let i = 0; i < 40; i++) {
        streamLines.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 120 + 60,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }

      // Initialize floating bokeh background particles
      for (let i = 0; i < 50; i++) {
        bokehParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 3 + 1,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.4 + 0.05,
        })
      }
    }

    // Non-cyber configurations (Neural Matrix)
    let primaryColor = '#f97316'
    let secondaryColor = '#eab308'
    let nodeSpeed = 0.5

    if (sigId === 'glitch') {
      primaryColor = '#D6C507'
      secondaryColor = '#FFFFFF'
      nodeSpeed = 0.8
    } else if (sigId === 'ai') {
      primaryColor = '#D6C507'
      secondaryColor = '#FFFFFF'
      nodeSpeed = 0.4
    }

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

      if (isCyber) {
        // --- CYBER SECURITY: 3D ISOMETRIC TILTED FINGERPRINT & DATA STREAMS ---

        // 1. Draw floating bokeh particles
        bokehParticles.forEach((p) => {
          p.y -= p.speedY
          if (p.y < 0) p.y = height
          if (p.y > height) p.y = 0

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
          ctx.shadowBlur = 8
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
          ctx.fill()
          ctx.shadowBlur = 0
        })

        // 2. Draw vertical data / circuit trace streams
        streamLines.forEach((s) => {
          s.y += s.speed
          if (s.y > height + s.length) s.y = -s.length

          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x, s.y + s.length)
          const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length)
          grad.addColorStop(0, 'transparent')
          grad.addColorStop(0.5, `rgba(255, 255, 255, ${s.opacity})`)
          grad.addColorStop(1, 'transparent')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.2
          ctx.stroke()
        })

        // 3. Draw Tilted 3D Isometric Particle Fingerprint Matrix in Center
        ctx.save()
        const centerX = width * 0.5 + mouse.x * 30
        const centerY = height * 0.5 + mouse.y * 30
        
        ctx.translate(centerX, centerY)
        // Apply 3D perspective tilt (isometric rotation matrix effect)
        ctx.transform(1, 0.25, -0.15, 0.85, 0, 0)

        fingerprintOffset += 0.005

        const rings = 16
        const maxRadiusX = 170
        const maxRadiusY = 110

        for (let r = 1; r <= rings; r++) {
          const rx = (r / rings) * maxRadiusX
          const ry = (r / rings) * maxRadiusY
          const particleCount = r * 14

          for (let i = 0; i < particleCount; i++) {
            const theta = (i / particleCount) * Math.PI * 2 + fingerprintOffset * (r % 2 === 0 ? 1 : -1)
            // Add subtle organic fingerprint wave irregularity
            const wave = Math.sin(theta * 6) * 3
            const px = Math.cos(theta) * (rx + wave)
            const py = Math.sin(theta) * (ry + wave)

            // Alternating brightness for white/grey realistic micro-particles
            const isWhite = (i + r) % 3 === 0
            ctx.beginPath()
            ctx.arc(px, py, isWhite ? 1.8 : 1.2, 0, Math.PI * 2)
            ctx.fillStyle = isWhite ? 'rgba(255, 255, 255, 0.9)' : 'rgba(150, 150, 150, 0.5)'
            ctx.shadowBlur = isWhite ? 10 : 4
            ctx.shadowColor = '#ffffff'
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }

        ctx.restore()

      } else {
        // --- OTHER SIGS: 3D NEURAL MATRIX NETWORK ---
        angleX = 0.0015 + mouse.y
        angleY = 0.002 + mouse.x

        const cx = width / 2
        const cy = height / 2
        const fov = 600

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

        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const p1 = projected[i]
            const p2 = projected[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < 180) {
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              const alpha = (1 - dist / 180) * 0.25 * Math.min(p1.scale, p2.scale)
              ctx.strokeStyle = primaryColor
              ctx.lineWidth = 0.7
              ctx.globalAlpha = Math.max(0, alpha)
              ctx.stroke()
              ctx.globalAlpha = 1.0
            }
          }
        }

        projected.forEach((p) => {
          if (p.scale <= 0) return

          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.max(1, 3 * p.scale), 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = Math.min(1, Math.max(0.15, p.scale * 0.75))
          ctx.shadowBlur = 10
          ctx.shadowColor = p.color
          ctx.fill()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1.0
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isCyber, sigId])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020204]">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none" />
    </div>
  )
}