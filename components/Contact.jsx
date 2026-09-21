import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import gsap from 'gsap'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const ACM_EMAIL = 'acmchapter@am.amrita.edu'

const socials = [
  { label: 'GitHub', href: 'https://github.com/ACM-Amrita-Amritapuri' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/acm-student-chapter-amrita-amritapuri/' },
  { label: 'Instagram', href: 'https://www.instagram.com/acm.amrita/' },
  { label: 'Facebook', href: 'https://www.facebook.com/acm.amrita' },
]

export default function Contact({ sig }) {
  const videoRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
  }, [])

  useEffect(() => {
    if (!marqueeRef.current) return
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 200,
      ease: 'none',
      repeat: -1,
    })
    return () => tween.kill()
  }, [])

  return (
    // Relative z-10 allows the global 3D space background to show through
    <section id="contact" className="relative z-10 overflow-hidden pb-8 pt-16 md:pb-12 md:pt-20">
      <div className="relative mb-16 md:mb-20">
        <div className="relative mx-6 h-[60vh] overflow-hidden rounded-2xl md:mx-10 lg:mx-16 border border-white/10">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-30"
            style={{ transform: 'translate(-50%, -50%) scaleY(-1)' }}
          />
          {/* Changed gradient overlay to deep space/Orange mix */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/90 via-orange-950/20 to-[#020204]/90" />

          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden py-4">
            <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
              {Array(20).fill(`ACM AMRITAPURI - ${sig.marquee}`).map((text, i) => (
                <span key={i} className="pr-8 text-3xl font-black uppercase tracking-widest text-orange-950/30 font-display md:text-5xl lg:text-6xl">
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
            {/* Eyebrow text to Plasma Orange */}
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-orange-500 font-retro">
              Ready to join?
            </p>
            {/* Main title remains glowing white for high contrast */}
            <h2 className="mb-8 text-4xl font-black uppercase leading-tight text-neutral-100 font-display drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] md:text-6xl lg:text-7xl">
              Join ACM Amritapuri
            </h2>
            <p className="mb-7 max-w-xl text-sm leading-relaxed text-neutral-300 font-body md:text-base">
              Bring your ideas to a SIG, find a team, and turn challenging projects into something real.
            </p>
            <EmailButton email={ACM_EMAIL} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-[0.15em] text-orange-500/80 transition-colors duration-200 hover:text-orange-300 font-retro">
                {social.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-retro">Recruitment Active - New Members Welcome</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-500/40 font-body">
          Copyright 2026 ACM Amritapuri. All rights reserved.
        </p>
      </div>
    </section>
  )
}

function EmailButton({ email }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={`mailto:${email}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex cursor-pointer items-center gap-2 overflow-visible rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md px-8 py-4 text-xs font-bold uppercase tracking-widest text-orange-400 transition-all duration-300 hover:border-transparent font-retro"
    >
      {hovered && (
        <span className="pointer-events-none absolute rounded-full" style={{ inset: '-2px', background: 'linear-gradient(90deg, #f97316 0%, #eab308 100%)', zIndex: -1 }} />
      )}
      <span className="relative z-10 transition-colors group-hover:text-white">{email}</span>
      <span className="relative z-10 text-xs text-orange-500 transition-colors group-hover:text-white">-&gt;</span>
    </a>
  )
}