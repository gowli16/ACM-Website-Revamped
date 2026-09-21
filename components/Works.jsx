import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Works({ sig }) {
  const isCyber = sig?.id === 'cyber'

  // Dynamic projects list tailored per SIG
  const cyberWorks = [
    {
      title: 'PacketPulse Sniffer',
      description: 'A custom multi-threaded network packet analyzer built in Python and C for real-time anomaly detection.',
      tech: ['Python', 'C', 'Scapy', 'Wireshark API'],
      category: 'Network Defense',
    },
    {
      title: 'OWASP Sentinel',
      description: 'An automated web vulnerability scanner targeting top injection vectors and broken authentication flaws.',
      tech: ['Go', 'Docker', 'REST APIs', 'Security Automation'],
      category: 'Web Pentesting',
    },
    {
      title: 'Cryptographic Vault',
      description: 'Zero-knowledge proof implementation and custom asymmetric encryption suite for secure messaging.',
      tech: ['Rust', 'ZK-SNARKs', 'Cryptography', 'Python'],
      category: 'Applied Crypto',
    },
  ]

  const webWorks = [
    {
      title: 'Nexus Portal',
      description: 'Full-stack high-performance recruitment portal with interactive 3D WebGL backgrounds and glassmorphism UI.',
      tech: ['React.js', 'Node.js', 'Tailwind CSS', 'WebGL'],
      category: 'Full-Stack',
    },
    {
      title: 'DeFi Liquidity Engine',
      description: 'Decentralized automated market maker protocol featuring secure smart contracts and yield tracking dashboard.',
      tech: ['Solidity', 'Next.js', 'Ethers.js', 'Hardhat'],
      category: 'Web3 / Blockchain',
    },
    {
      title: 'CloudSync Distributed',
      description: 'Scalable microservices backend infrastructure with real-time state synchronization and container orchestration.',
      tech: ['Node.js', 'Docker', 'Redis', 'PostgreSQL'],
      category: 'Cloud Architecture',
    },
  ]

  const currentWorks = sig?.works && sig.works.length > 0 
    ? sig.works 
    : (isCyber ? cyberWorks : webWorks)

  return (
    <section id="works" className="relative z-10 py-16 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-orange-500/50" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 font-retro">
                {isCyber ? 'SECURITY ARSENAL' : 'FEATURED WORKS'}
              </span>
            </div>
            
            <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
              Built by the <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">
                {isCyber ? 'Cyber unit' : 'community'}
              </span>
            </h2>
            
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400 font-body">
              {isCyber 
                ? 'Practical defensive tools, penetration testing scripts, and secure architectures engineered by our agents.'
                : 'Production-grade applications, open-source libraries, and decentralized protocols crafted by our members.'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {currentWorks.map((work, index) => (
            <WorkCard key={work.title || index} work={work} index={index} isCyber={isCyber} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkCard({ work, index, isCyber }) {
  const [hovered, setHovered] = useState()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8 transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:-translate-y-1.5"
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 font-retro border border-orange-500/20">
            {work.category || (isCyber ? 'Security' : 'Engineering')}
          </span>
          <span className="text-xs font-mono text-neutral-500">0{index + 1}</span>
        </div>

        <h3 className="text-xl font-bold uppercase text-neutral-100 font-display transition-colors group-hover:text-orange-300 mb-3">
          {work.title}
        </h3>

        <p className="text-sm leading-relaxed text-neutral-400 font-body mb-6">
          {work.description}
        </p>
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-2">
          {(work.tech || []).map((t, i) => (
            <span key={i} className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-neutral-300 font-retro">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}