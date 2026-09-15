import { motion } from 'framer-motion'
import { useState } from 'react'

const FALLBACK_PEOPLE = [
  ['Arjun Mehta', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop', 'Core', 'ML Foundations', 'Paladin'],
  ['Priya Nair', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop', 'Core', 'Deep Learning', 'Mage'],
  ['Karan Iyer', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop', 'Core', 'Applied AI', 'Ranger'],
  ['Sneha Rajan', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&auto=format&fit=crop', 'Research Sprints'],
  ['Dev Pillai', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80&auto=format&fit=crop', 'ML Foundations'],
  ['Meera Raj', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80&auto=format&fit=crop', 'Deep Learning'],
  ['Aditya Menon', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80&auto=format&fit=crop', 'Applied AI'],
  ['Asha Varma', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80&auto=format&fit=crop', 'Research Sprints'],
  ['Rohan Das', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80&auto=format&fit=crop', 'ML Foundations'],
  ['Kavitha Sree', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80&auto=format&fit=crop', 'Deep Learning'],
  ['Nikhil Kumar', 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80&auto=format&fit=crop', 'Applied AI'],
]

const FALLBACK_CLASSES = ['Paladin', 'Mage', 'Ranger']
const CORE_ROLE = 'core'
const INITIAL_MEMBER_LIMIT = 10

export default function Members({ sig }) {
  const [showAllMembers, setShowAllMembers] = useState(false)

  const people = sig?.members ?? FALLBACK_PEOPLE
  const classes = sig?.classes ?? FALLBACK_CLASSES
  const domainRoles = (sig?.domains ?? []).map(([title]) => title)
  const isCyber = sig?.id === 'cyber'

  if (sig?.showMembers === false) return null

  const leadRoles = ['SIG Lead', 'Mentor', 'Ops Head']

  const leadTuples = people.filter(([, , role]) => (role ?? '').toLowerCase() === CORE_ROLE)
  const memberTuples = people.filter(([, , role]) => (role ?? '').toLowerCase() !== CORE_ROLE)

  const leads = leadTuples.map(([name, image, role, domain, dndClass], i) => ({
    name,
    image,
    role: role ?? leadRoles[i % leadRoles.length],
    domain: domain ?? domainRoles[i % (domainRoles.length || 1)] ?? sig.name,
    dndClass: dndClass ?? classes[i % (classes.length || 1)],
  }))

  const allMembers = memberTuples.map(([name, image, role], i) => ({
    name,
    image,
    role: role ?? domainRoles[i % (domainRoles.length || 1)],
  }))

  const hasOverflow = allMembers.length > INITIAL_MEMBER_LIMIT
  const members = showAllMembers ? allMembers : allMembers.slice(0, INITIAL_MEMBER_LIMIT)
  const hiddenCount = allMembers.length - INITIAL_MEMBER_LIMIT

  return (
    <section id="members" className="bg-bg py-16 md:py-24">
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
              <div className="h-px w-8 bg-red-900/50" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 font-retro">
                {isCyber ? 'NETWORK CELL' : 'THE PARTY'}
              </span>
            </div>
            
            {/* Fixed Title to CYBER Party */}
            <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
              Meet the <span className="text-red-600 stranger-glow">
                {isCyber ? 'CYBER party' : `${sig.shortName} party`}
              </span>
            </h2>
            
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400 font-body">
              {isCyber 
                ? 'Our core defensive cluster. Team leads, CTF researchers, and threat analysts driving the signal.'
                : 'Seniors, mentors, and fellow first-years who turn scary topics into weekend builds and contest nights.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full border border-red-950/60 bg-[#090002]/45 px-5 py-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-sm font-bold tracking-wider text-neutral-400 font-retro">
              <span className="font-bold text-red-500">{allMembers.length + leads.length}</span> ACTIVE AGENTS
            </span>
          </div>
        </motion.div>

        {leads.length > 0 && (
          <div
            className="mb-8 grid gap-5"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${leads.length <= 2 ? 280 : 220}px, 1fr))` }}
          >
            {leads.map((lead, i) => (
              <LeadCard key={lead.name} member={lead} index={i} />
            ))}
          </div>
        )}

        {members.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {members.map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        )}

        {hasOverflow && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAllMembers((v) => !v)}
              className="rounded-full border border-red-950/60 bg-[#090002]/45 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-red-500 transition-colors duration-200 hover:border-red-700/50 hover:text-red-400 font-retro"
            >
              {showAllMembers ? 'Show less' : `Show ${hiddenCount} more agents`}
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-red-950/40 bg-[#090002]/40 p-6 text-center sm:flex-row sm:text-left md:p-8"
        >
          <div>
            <h3 className="text-xl font-extrabold uppercase text-neutral-200 font-display md:text-2xl">
              Want to join the <span className="text-red-600 stranger-glow">party</span>?
            </h3>
            <p className="mt-1 text-sm text-neutral-400 font-body">Applications for the new batch are open.</p>
          </div>
          <JoinButton />
        </motion.div>
      </div>
    </section>
  )
}

function JoinButton() {
  return (
    <button
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      className="relative inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-100 shadow-md shadow-red-950/30 transition-transform duration-300 hover:scale-105 font-retro"
    >
      Apply to join <span className="text-[10px]">-&gt;</span>
    </button>
  )
}

function LeadCard({ member, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative mx-auto h-52 w-52 cursor-pointer overflow-hidden rounded-2xl border border-red-950/40 bg-[#090002]/40 transition-all duration-300 hover:border-red-700/50"
    >
      <motion.img
        src={member.image}
        alt={member.name}
        className="absolute inset-0 h-full w-full object-cover object-top"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute left-3 top-3">
        <span className="rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white font-retro">
          {member.role}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090002] via-[#090002]/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-base font-semibold text-neutral-100 font-body drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {member.name}
        </h3>

        <motion.div
          initial={false}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <p className="mb-3 mt-1 text-xs text-neutral-300 font-body">{member.domain}</p>
          <div className="flex gap-2">
            <SocialBtn href="#" icon="GH" />
            <SocialBtn href="#" icon="in" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function MemberCard({ member, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex cursor-pointer flex-col items-center rounded-2xl border border-red-950/40 bg-[#090002]/30 p-4 text-center transition-all duration-300 hover:border-red-900/35 hover:bg-[#090002]"
    >
      <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-red-950 transition-all duration-300 group-hover:ring-red-600">
        <motion.img 
          src={member.image} 
          alt={member.name} 
          className="h-full w-full object-cover object-top opacity-80" 
          animate={{ scale: hovered ? 1.1 : 1 }} 
          transition={{ duration: 0.4 }} 
        />
      </div>
      <p className="text-sm font-medium leading-tight text-neutral-200 font-body">{member.name}</p>
      <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-red-500/80 font-retro">{member.role}</p>
    </motion.div>
  )
}

function SocialBtn({ href, icon }) {
  return (
    <a 
      href={href} 
      aria-label={icon === 'GH' ? 'GitHub profile' : 'LinkedIn profile'} 
      className="flex h-7 w-7 items-center justify-center rounded-full border border-red-950/60 bg-red-950/20 text-[10px] font-bold text-red-500 transition-all duration-200 hover:border-red-600/40 hover:text-white font-retro"
    >
      {icon}
    </a>
  )
}