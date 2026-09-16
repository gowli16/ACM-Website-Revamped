const sharedEvents = [
  ['Open workshop', 'WORKSHOP', 'APR 2026', null, 'Learn by building with the community.'],
]

const makeSig = ({ id, name, shortName, description, words, domains, projects }) => ({
  id,
  name,
  shortName,
  description,
  words,
  domains,
  projects,
  events: sharedEvents,
})

export const sigs = [
  makeSig({
    id: 'ai',
    name: 'Artificial Intelligence',
    shortName: 'AI',
    description: 'Explore machine learning, intelligent products, and research through practical experiments.',
    words: ['learn', 'research', 'build'],
    domains: [
      ['Machine Learning', 'Build models and understand the ideas behind them.', ['Python', 'Models']],
      ['Data', 'Turn messy information into useful signals and decisions.', ['Analysis', 'SQL']],
      ['Generative AI', 'Prototype thoughtful tools with modern AI systems.', ['LLMs', 'Agents']],
      ['Research', 'Ask better questions and test them rigorously.', ['Papers', 'Experiments']],
    ],
    projects: [['Campus assistant', 'A practical AI prototype', ['Python', 'AI'], null]],
  }),
  makeSig({
    id: 'cyber',
    name: 'Cybersecurity',
    shortName: 'CYBER',
    description: 'Learn how systems break, how to defend them, and how to think like an ethical adversary.',
    words: ['defend', 'investigate', 'secure'],
    domains: [
      ['Web Security', 'Find and fix vulnerabilities in realistic applications.', ['Web', 'OWASP']],
      ['CTF', 'Practice the techniques used in capture-the-flag challenges.', ['Linux', 'Forensics']],
      ['Networks', 'Understand traffic, protocols, and defensive monitoring.', ['TCP/IP', 'Tools']],
      ['Reverse Engineering', 'Look beneath the surface of software and binaries.', ['Assembly', 'Debugging']],
    ],
    projects: [['Security lab', 'Hands-on defensive security exercises', ['Linux', 'CTF'], null]],
  }),
  makeSig({
    id: 'glitch',
    name: 'Game Development',
    shortName: 'GLITCH',
    description: 'Make games, interactive worlds, and playful experiments that people remember.',
    words: ['play', 'create', 'iterate'],
    domains: [
      ['Game Design', 'Shape mechanics and experiences around a clear idea.', ['Design', 'Prototyping']],
      ['Programming', 'Build responsive systems that make play feel good.', ['C#', 'Logic']],
      ['Art and Audio', 'Give every world its own visual and sonic identity.', ['2D', 'Audio']],
      ['Game Jams', 'Ship small, strange, and finished things together.', ['Teamwork', 'Shipping']],
    ],
    projects: [['Jam archive', 'Small games built in short bursts', ['Unity', 'Games'], null]],
  }),
  makeSig({
    id: 'web',
    name: 'Web and App Development',
    shortName: 'WEB',
    description: 'Design and ship useful digital experiences with a product-minded team.',
    words: ['design', 'ship', 'iterate'],
    domains: [
      ['Frontend', 'Build polished interfaces that feel fast and clear.', ['React', 'CSS']],
      ['Backend', 'Design APIs and reliable services for real users.', ['Node', 'APIs']],
      ['Mobile', 'Create useful experiences that travel with people.', ['Apps', 'UX']],
      ['Product', 'Turn a problem into something people want to use.', ['Research', 'Strategy']],
    ],
    projects: [['Chapter platform', 'Tools for the ACM community', ['React', 'Next.js'], null]],
  }),
]
