import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET_TEXT = "acm amritapuri"

export default function LoadingScreen({ onComplete }) {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [step, setStep] = useState('SEARCHING') 

  // Phase 1: Typewriter effect
  useEffect(() => {
    if (step !== 'SEARCHING') return;
    
    let timeout;
    if (isTyping) {
      if (text.length < TARGET_TEXT.length) {
        const typingSpeed = Math.random() * 40 + 60;
        timeout = setTimeout(() => {
          setText(TARGET_TEXT.slice(0, text.length + 1))
        }, typingSpeed)
      } else {
        setIsTyping(false)
      }
    } else {
      timeout = setTimeout(() => setStep('DRAWING'), 2000)
    }
    return () => clearTimeout(timeout)
  }, [text, isTyping, step])

  // Phase 2 & 3: Drawing -> Text Mask Zoom
  useEffect(() => {
    if (step === 'DRAWING') {
      const timeout = setTimeout(() => {
        setStep('ZOOMING') 
      }, 3500); 
      return () => clearTimeout(timeout);
    }
    
    if (step === 'ZOOMING') {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete(); 
      }, 1200); 
      return () => clearTimeout(timeout);
    }
  }, [step, onComplete])

  return (
    <div className="fixed h-screen inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-none">
      
      {/* =========================================
          THE TEXT MASK ZOOM EFFECT (OPTIMIZED)
      ========================================= */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center w-full pointer-events-none"
        initial={{ scale: 1, opacity: 1 }}
        animate={step === 'ZOOMING' ? { scale: 60, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ 
          scale: { duration: 1.2, ease: [0.7, 0, 0.2, 1] },
          opacity: { duration: 0.4, delay: 0.6 } // Fades out midway to completely kill the lag!
        }}
        style={{ 
          transformOrigin: "36% 50%",
          willChange: "transform, opacity" // FORCES GPU HARDWARE ACCELERATION
        }} 
      >
        <svg viewBox="0 0 500 200" className="w-full max-w-4xl px-6 overflow-visible drop-shadow-[0_0_20px_rgba(0,155,222,0.4)]">
          <defs>
            <mask id="acm-mask">
              {/* Drastically reduced rect size to stop CPU overload */}
              <rect x="-1000" y="-1000" width="3000" height="3000" fill="white" />
              <g
                stroke="black"
                strokeWidth={step === 'ZOOMING' ? "50" : "0"}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M 60,160 L 110,40 L 160,160 M 85,100 L 135,100" />
                <path d="M 280,60 L 250,40 L 210,40 L 180,60 L 180,140 L 210,160 L 250,160 L 280,140" />
                <path d="M 320,160 L 320,40 L 380,100 L 440,40 L 440,160" />
              </g>
            </mask>
          </defs>

          {/* Solid black background with holes punched out */}
          <rect x="-1000" y="-1000" width="3000" height="3000" fill="#020204" mask="url(#acm-mask)" />

          {(step === 'DRAWING' || step === 'ZOOMING') && (
            <>
              {/* RESTORED 3D LAYER (Dark Blue Shadow) */}
              <g stroke="#1B5CA2" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" transform="translate(10, 10)">
                <motion.path
                  d="M 60,160 L 110,40 L 160,160 M 85,100 L 135,100"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: step === 'ZOOMING' ? 0 : 1 }}
                  transition={{ pathLength: { duration: 1, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
                />
                <motion.path
                  d="M 280,60 L 250,40 L 210,40 L 180,60 L 180,140 L 210,160 L 250,160 L 280,140"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: step === 'ZOOMING' ? 0 : 1 }}
                  transition={{ pathLength: { duration: 1, ease: "easeInOut", delay: 0.3 }, opacity: { duration: 0.3 } }}
                />
                <motion.path
                  d="M 320,160 L 320,40 L 380,100 L 440,40 L 440,160"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: step === 'ZOOMING' ? 0 : 1 }}
                  transition={{ pathLength: { duration: 1, ease: "easeInOut", delay: 0.6 }, opacity: { duration: 0.3 } }}
                />
              </g>

              {/* Main Laser Tracing Layer (Light Blue) */}
              <g stroke="#009BDE" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <motion.path
                  d="M 60,160 L 110,40 L 160,160 M 85,100 L 135,100"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: step === 'ZOOMING' ? 0 : 1 }}
                  transition={{ pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.2 }, opacity: { duration: 0.3 } }}
                />
                <motion.path
                  d="M 280,60 L 250,40 L 210,40 L 180,60 L 180,140 L 210,160 L 250,160 L 280,140"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: step === 'ZOOMING' ? 0 : 1 }}
                  transition={{ pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.7 }, opacity: { duration: 0.3 } }}
                />
                <motion.path
                  d="M 320,160 L 320,40 L 380,100 L 440,40 L 440,160"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: step === 'ZOOMING' ? 0 : 1 }}
                  transition={{ pathLength: { duration: 1.2, ease: "easeInOut", delay: 1.2 }, opacity: { duration: 0.3 } }}
                />
              </g>
            </>
          )}
        </svg>
      </motion.div>

      {/* =========================================
          PHASE 1: SEARCH BAR
      ========================================= */}
      <AnimatePresence>
        {step === 'SEARCHING' && (
          <motion.div 
            key="search-bar"
            className="w-full max-w-2xl px-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className={`relative flex items-center w-full bg-[#121218] border rounded-full px-6 py-4 shadow-2xl transition-all duration-500 ${
                !isTyping ? 'border-[#009BDE]/50 shadow-[0_0_30px_rgba(0,155,222,0.2)]' : 'border-white/10'
              }`}
              animate={!isTyping ? { scale: 0.98 } : { scale: 1 }}
            >
              <div className="mr-4 text-neutral-400 flex-shrink-0 transition-colors duration-300">
                <svg className="h-6 w-6" fill="none" stroke={!isTyping ? "#009BDE" : "currentColor"} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex-1 overflow-hidden flex items-center h-8">
                <span className="text-white text-xl md:text-2xl font-medium tracking-wide whitespace-nowrap">
                  {text}
                </span>
                <motion.span 
                  className="ml-1 w-[2px] h-6 md:h-8 bg-[#009BDE] inline-block"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: !isTyping ? 0 : Infinity, ease: "linear" }}
                  style={{ opacity: !isTyping ? 0 : 1 }}
                />
              </div>
            </motion.div>

            {/* 3 DOTS LOADING TRANSITION */}
            <AnimatePresence>
              {!isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-8 flex justify-center items-center gap-3"
                >
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-3 h-3 bg-[#009BDE] rounded-full"
                      animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                      style={{ boxShadow: '0 0 12px rgba(0,155,222,0.6)' }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TEXT LABEL (Fades out when zooming) */}
      <AnimatePresence>
        {(step === 'DRAWING' || step === 'ZOOMING') && (
          <motion.div 
            className="absolute bottom-16 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step === 'ZOOMING' ? 0 : 1, y: 0 }}
            transition={{ duration: 0.8, delay: step === 'ZOOMING' ? 0 : 2.5 }}
          >
            <span className="text-[#009BDE] font-retro text-sm tracking-[0.4em] uppercase">
              Student Chapter Initialization
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}