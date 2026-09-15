import { useState } from 'react'
import { motion } from 'framer-motion'

const GITHUB_ORG = 'https://github.com'

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Works({ sig }) {
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
              <div className="h-px w-8 bg-neutral-800" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 font-body">
                {sig.worksEyebrow || 'PROJECT ARCHIVES'}
              </span>
            </div>
            <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-100 font-display md:text-5xl">
              {sig.worksHeadingPlain || 'Our'}{' '}
              <span className="text-red-500">
                {sig.worksHeadingHighlight || 'Projects'}
              </span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400 font-body">
              {sig.worksDescription || `Sample projects and builds from the ${sig.name} archive.`}
            </p>
          </div>

          <a
            href={GITHUB_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="relative hidden items-center gap-2 rounded-full border border-neutral-800 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-400 transition-all duration-300 hover:border-neutral-600 hover:text-neutral-200 md:inline-flex font-body"
          >
            View All Projects
            <span className="text-neutral-500">-&gt;</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sig.projects?.map(([title, subtitle, tags, image]) => (
            <StandardProjectCard
              key={title}
              project={{ title, subtitle, tags, image }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StandardProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={GITHUB_ORG}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/10 cursor-pointer aspect-[4/3]"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.img
        src={project.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-75"
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg font-semibold leading-tight text-neutral-200 font-body">{project.title}</h3>
        <p className="mt-0.5 text-xs text-neutral-400 font-body">{project.subtitle}</p>
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col justify-between bg-neutral-950/95 p-6 backdrop-blur-md"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-neutral-800 bg-neutral-800/50 px-2.5 py-1 text-[11px] text-neutral-300 font-body">
              {tag}
            </span>
          ))}
        </div>
        <div>
          <p className="mb-4 max-w-xs text-sm text-neutral-400 font-body">{project.subtitle}</p>
          <span className="relative inline-flex rounded-full bg-neutral-200 px-4 py-2 text-sm font-bold uppercase text-neutral-900 font-body hover:bg-white">
            Open Codebase
          </span>
        </div>
      </motion.div>
    </motion.a>
  )
}