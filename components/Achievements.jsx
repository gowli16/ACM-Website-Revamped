import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL;

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}


const getLocalLogo = (companyName) => {
  const name = companyName.toLowerCase().trim()
 // Mapping based on the exact filenames in your screenshot
  if (name.includes('amazon')) return `${BASE}assets/companyLogos/amazon.png`;
  if (name.includes('amrita')) return `${BASE}assets/companyLogos/amrita_create_logo.jpg`;
  if (name.includes('appviewx')) return `${BASE}assets/companyLogos/appviewx.png`;
  if (name.includes('bosch')) return `${BASE}assets/companyLogos/BoschGlobalSoftwareTechnologies.jpg`; // Ensure this matches exactly!
  if (name.includes('breach')) return `${BASE}assets/companyLogos/BreachSimRange.jpg`;
  if (name.includes('ccmb')) return `${BASE}assets/companyLogos/ccmb-lacons.png`;
  if (name.includes('ericsson')) return `${BASE}assets/companyLogos/ericsson.png`;
  if (name.includes('groww')) return `${BASE}assets/companyLogos/groww.png`;
  if (name.includes('heap')) return `${BASE}assets/companyLogos/heapvue.png`;
  if (name.includes('infineon')) return `${BASE}assets/companyLogos/infineon.webp`;
  if (name.includes('innspark')) return `${BASE}assets/companyLogos/Innspark.jpg`;
  if (name.includes('isro')) return `${BASE}assets/companyLogos/Isro-vssc.jpg`;
  if (name.includes('litmus')) return `${BASE}assets/companyLogos/litmus7.png`;
  return null
}

export default function Achievements({ sig }) {
  const data = sig.achievements
  if (!data) return null

  const isGlitch = sig.id === 'glitch'

  return (
    <section id="internships-achievements" className="border-t border-red-950/40 bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        
        <motion.div
          className="mb-10 md:mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-red-900/50" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 font-retro">
              {isGlitch ? 'TRIUMPHS' : data.eyebrow}
            </span>
          </div>
          <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-200 font-display md:text-5xl">
            {isGlitch ? 'HACKATHON' : data.headingPlain}{' '}
            <span className="font-black text-red-600 stranger-glow">
              {isGlitch ? 'WINS' : data.headingHighlight}
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-400 font-body">
            {data.description}
          </p>
        </motion.div>

        {isGlitch ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl border border-red-900/30 bg-[#090002]/40 p-6 md:p-10 shadow-[0_0_40px_rgba(220,38,38,0.06)] backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-950/40 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 font-retro bg-red-950/60 px-3 py-1 rounded border border-red-900/30">
                  {data.hackathonWinPayload?.award}
                </span>
                <h3 className="text-2xl font-black text-neutral-100 font-display md:text-3xl tracking-wide uppercase mt-3">
                  {data.hackathonWinPayload?.title}
                </h3>
              </div>
            </div>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 font-body max-w-4xl">
              {data.hackathonWinPayload?.summary}
            </p>
          </motion.div>
        ) : (
          <>
            {data.partnership && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-14 rounded-2xl border-2 border-red-600/30 bg-red-950/10 p-8 text-center shadow-[0_0_35px_rgba(220,38,38,0.12)] backdrop-blur-sm"
              >
                <p className="text-xl font-bold leading-relaxed text-neutral-100 font-body md:text-2xl max-w-4xl mx-auto tracking-wide">
                  {data.partnership}
                </p>
              </motion.div>
            )}

            <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Added optional chaining (?) to data.people here */}
              {data.people?.map(([name, role, company, domain], i) => {
                const localLogoUrl = getLocalLogo(company)
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                    className="rounded-2xl border border-red-950/40 bg-[#090002]/30 px-4 py-8 text-center hover:border-red-900/40"
                  >
                    {localLogoUrl && (
                      <div className="mx-auto mb-5 flex h-36 w-36 items-center justify-center">
                        <img src={localLogoUrl} alt={`${company} logo`} loading="lazy" className="h-36 w-36 rounded-full object-contain" />
                      </div>
                    )}
                    <p className="text-xl font-bold text-neutral-200 font-body leading-snug">{name}</p>
                    <p className="mt-3 text-base font-medium text-red-500/90 font-retro">{role}</p>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}