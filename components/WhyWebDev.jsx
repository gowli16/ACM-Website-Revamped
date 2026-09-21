import { useState } from 'react'
import { motion } from 'framer-motion'

export default function WhyWebDev({ sig }) {
  const benefits = sig?.benefits ?? [
    ['No Single Point of Control', 'Work with systems that distribute control instead of trusting a single server, and learn why removing the middleman scales stability.'],
    ['Records That Can’t Be Rewritten', 'Understand how each block locks cryptographically to the one before it, so tampering with history breaks the chain and gets caught immediately.'],
    ['Smart Contracts, Not Just Theory', 'Write, test, and deploy Solidity contracts on testnets, and learn how gas, security, and audits actually work before it costs you real money.'],
    ['Rent Infrastructure, Don’t Just Buy It', 'Learn why teams provision storage, databases, and processing power from providers like AWS, Microsoft, and Google instead of buying hardware outright.'],
    ['Public, Private, and Hybrid Cloud', 'Work across shared third-party infrastructure, dedicated single-org environments, and the hybrid setups that move data safely between both.'],
    ['A Portfolio That Proves It', 'Leave with deployed contracts, live cloud infrastructure, and GitHub history recruiters can actually click through — not just a list of buzzwords.'],
  ]

  return (
    <section id="why-web-dev" className="relative z-10 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(([title, description], index) => (
            <FeatureCard key={title} title={title} description={description} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ title, description, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Fills with gradient on hover/click and transitions text to black
      className={`relative group rounded-2xl backdrop-blur-md border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
        hovered 
          ? 'bg-gradient-to-br from-orange-500 to-amber-400 border-transparent shadow-[0_0_30px_rgba(249,115,22,0.4)] text-black' 
          : 'bg-white/[0.02] border-white/10 text-neutral-200'
      }`}
    >
      {/* Icon Accent */}
      <div 
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 font-retro text-xs font-bold ${
          hovered ? 'bg-black/10 text-black' : 'bg-orange-500/10 text-orange-400'
        }`}
      >
        {index + 1}
      </div>

      <h3 className={`text-lg font-bold font-display mb-2 transition-colors ${
        hovered ? 'text-black' : 'text-neutral-100'
      }`}>
        {title}
      </h3>

      <p className={`text-xs md:text-sm font-body leading-relaxed flex-1 transition-colors ${
        hovered ? 'text-black/90 font-medium' : 'text-neutral-400'
      }`}>
        {description}
      </p>
    </motion.div>
  )
}