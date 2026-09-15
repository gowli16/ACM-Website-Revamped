import { useState } from 'react'
import { motion } from 'framer-motion'

const GITHUB_ORG = 'https://github.com'
const BASE = import.meta.env.BASE_URL;

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function CyberWorks({ sig }) {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-red-900/50" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 font-retro">
                {sig.worksEyebrow || 'OPERATIONS LOG'}
              </span>
            </div>
            <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
              {sig.worksHeadingPlain || 'Classified'}{' '}
              <span className="text-red-600 stranger-glow">
                {sig.worksHeadingHighlight || 'archives'}
              </span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400 font-body">
              {sig.worksDescription || `Sample missions for ${sig.name}.`}
            </p>
          </div>

          <a
            href={GITHUB_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="relative hidden items-center gap-2 rounded-full border border-red-950/60 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-red-500 transition-all duration-300 hover:border-red-600/60 md:inline-flex font-retro"
          >
            Open GitHub vault
            <span className="text-red-700">-&gt;</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sig.projects?.map(([title, subtitle, tags, image]) => (
            <CyberProjectCard
              key={title}
              project={{ title, subtitle, tags, image }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CyberProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  // Automatic path fixing for project images
  const imagePath = project.image.startsWith('http') 
    ? project.image 
    : `${BASE}${project.image.startsWith('/') ? project.image.slice(1) : project.image}`;

  return (
    <motion.a
      href={GITHUB_ORG}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl border border-red-950/40 bg-[#090002]/40 cursor-pointer aspect-[4/3]"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.img
        src={imagePath}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:4px_4px] opacity-20 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020204]/95 via-[#020204]/25 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg font-semibold leading-tight text-neutral-100 font-body">{project.title}</h3>
        <p className="mt-0.5 text-xs text-neutral-400 font-body">{project.subtitle}</p>
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col justify-between bg-[#020204]/85 p-6 backdrop-blur-lg vhs-noise"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-red-950 bg-red-950/20 px-2.5 py-1 text-[11px] text-red-500 font-retro">
              {tag}
            </span>
          ))}
        </div>
        <div>
          <p className="mb-4 max-w-xs text-sm text-neutral-400 font-body">{project.subtitle}</p>
          <span className="relative inline-flex rounded-full bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white shadow-md shadow-red-950/30 font-retro">
            Open directory
          </span>
        </div>
      </motion.div>
    </motion.a>
  )
}