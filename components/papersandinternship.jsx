import { motion } from 'framer-motion'

export default function InternshipsAndPapers({ sig }) {
  const internships = sig?.internships || []
  const papers = sig?.papers || []

  if (internships.length === 0 && papers.length === 0) return null

  // Safe data extraction to prevent crashes if array lengths or formats vary between SIGs
  const safeInternship = (item) => {
    if (Array.isArray(item)) {
      return {
        company: item[0] || 'Enterprise',
        role: item[1] || 'Developer / Engineer',
        studentName: item[2] || 'SIG Member',
        localLogoUrl: item[3] || null
      }
    }
    return {
      company: item.company || 'Enterprise',
      role: item.role || 'Developer / Engineer',
      studentName: item.studentName || item.name || 'SIG Member',
      localLogoUrl: item.localLogoUrl || null
    }
  }

  const safePaper = (item) => {
    if (Array.isArray(item)) {
      return {
        title: item[0] || 'Research Publication Title',
        conference: item[1] || 'International Conference',
        year: item[2] || '2026',
        authorName: item[3] || 'Researcher'
      }
    }
    return {
      title: item.title || 'Research Publication Title',
      conference: item.conference || item.journal || 'International Conference',
      year: item.year || '2026',
      authorName: item.authorName || item.author || 'Researcher'
    }
  }

  return (
    <section id="internships-papers" className="relative bg-[#020204] py-24 px-6 md:px-12 overflow-hidden border-b border-red-950/20 w-full">
      {/* Cinematic Cyber Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-red-500 uppercase font-bold">DISPATCHES</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-neutral-200">
            INTERNSHIPS & <span className="text-red-600 drop-shadow-[0_0_30px_rgba(255,26,26,0.5)]">PUBLICATIONS</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-3 max-w-xl font-medium leading-relaxed">
            Real-world impact. Review the industry placements and published research contributions delivered by our unit.
          </p>
        </div>

        {/* INTERNSHIPS SECTION */}
        {internships.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between border-b border-red-950/40 pb-4 mb-8">
              <h3 className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase font-black">
                // SYSTEM PLACEMENTS
              </h3>
              <span className="text-xs text-neutral-500 font-mono">[{internships.length} RECOGNIZED]</span>
            </div>

            {/* Force list to distribute evenly into a two-column grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {internships.map((item, idx) => {
                const { company, role, studentName, localLogoUrl } = safeInternship(item)
                return (
                  <motion.div
                    key={idx}
                    className="group relative bg-[#06060c]/70 border border-red-950/40 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-red-600/40 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-red-600 rounded-l-2xl transition-colors" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2">
                        {/* HUGE STUDENT NAME */}
                        <h4 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-neutral-100 group-hover:text-red-500 transition-colors duration-300">
                          {studentName}
                        </h4>
                        <p className="text-base text-neutral-300 font-medium tracking-wide">
                          {role}
                        </p>
                        <p className="text-sm text-neutral-500 font-mono">
                          {company}
                        </p>
                      </div>
                      
                      <div className="shrink-0">
                        <div className="mx-auto mb-5 flex h-36 w-36 items-center justify-center shadow-md shadow-red-950/20">
                        <img src={localLogoUrl} alt={`${company} logo`} loading="lazy" className="h-36 w-36 rounded-full" />
                      </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* PUBLICATIONS SECTION */}
        {papers.length > 0 && (
          <div>
            <div className="flex items-center justify-between border-b border-red-950/40 pb-4 mb-8">
              <h3 className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase font-black">
                // RESEARCH ARCHIVES
              </h3>
              <span className="text-xs text-neutral-500 font-mono">[{papers.length} INDEXED]</span>
            </div>

            {/* Force list to distribute evenly into a two-column grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {papers.map((item, idx) => {
                const { title, conference, year, authorName } = safePaper(item)
                return (
                  <motion.div
                    key={idx}
                    className="group relative bg-[#06060c]/70 border border-red-950/40 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-red-600/40 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                  >
                    <div className="absolute top-0 right-0 w-1 h-full bg-transparent group-hover:bg-red-600 rounded-r-2xl transition-colors" />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        {/* HUGE AUTHOR NAME */}
                        <h4 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-neutral-100 group-hover:text-red-500 transition-colors duration-300">
                          {authorName}
                        </h4>
                        <span className="text-xs font-mono text-neutral-500 tracking-wider shrink-0">{year}</span>
                      </div>
                      
                      <p className="text-sm md:text-base text-neutral-300 font-medium leading-relaxed">
                        "{title}"
                      </p>
                      
                      <div className="pt-2">
                        <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-neutral-400 bg-neutral-900 border border-neutral-800/80 px-3 py-1.5 rounded-lg uppercase">
                          {conference}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}