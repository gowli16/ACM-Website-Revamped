export const glitch = {
  id: 'glitch',
  shortName: 'GLITCH',
  name: 'Glitch',
  fullName: 'ACM Glitch',
  selectorTitle: 'Glitch Arena',
  selectorHint: 'Build worlds, not just software',
  signal: 'ACCEPT THE QUEST',
  tagline: 'Turn curiosity into creation.',
  words: ['engines', 'shaders', 'worlds', 'npcs', 'mechanics', 'experiences'],
  description: 'Go from your first game engine project to shipping playable worlds — gameplay, AI, graphics, multiplayer, and everything between.',
  email: 'acmchapter@am.amrita.edu',
  marquee: 'GLITCH SIG - BUILD THE WORLD - ',

  // ── Hero ──
  heroEyebrow: 'ACM GLITCH - GAME DEV SIG',
  heroStory: {
    title: 'This Is ACM Glitch',
    lines: [
      'The world doesn\u2019t remember software. It remembers experiences.',
      'Every game that changed millions of lives, every unforgettable story, every breathtaking world, every impossible boss fight — someone built it.',
      'We don\u2019t just write code. We build worlds, create experiences, and turn ideas into reality. Whether you\u2019ve never opened a game engine before or you\u2019re already deep in Unity, Unreal, or Godot, ACM Glitch is where creators become developers.',
    ],
    closing: 'Turn curiosity into creation.',
  },

  // ── "Why Game Development?" briefing (TataBreach section) ──
  breachStory: {
    eyebrow: 'THE BRIEFING',
    title: 'Why Game Development?',
    highlight: 'Game Development',
    questions: [
      'Artificial Intelligence',
      'Computer Graphics',
      'Physics & Mathematics',
      'Networking',
      'UI/UX & Animation',
      'Audio Engineering',
      'Optimization & Software Architecture',
    ],
    paragraphs: [
      'Game development is one of the few fields where almost every area of computer science comes together in a single build — it\u2019s one of the most complete engineering challenges in software.',
      'And engines don\u2019t stop at games. The same tech now powers VR, AR, digital twins, medical simulations, surgical training, film production, self-driving simulation, robotics, and interactive education.',
      'Learning game development means learning the technology shaping what comes next — and our mission is simple: turn curiosity into creation, one prototype, one bug, one failed mechanic, one shipped project at a time.',
    ],
    stats: [],
  },

  // ── Metrics Section ──
  metrics: [],

  // ── "Choose your skill tree" (Domains) ──
  domainsHeadingPlain: 'Choose your',
  domainsHeadingHighlight: 'skill tree',
  domainsDescription: 'Every skill tree starts beginner-friendly and levels up into real production complexity. Pick one, or explore them all.',
  domains: [
    ['Gameplay Programming', 'Build mechanics, combat systems, inventories, movement, interactions, and gameplay logic.', ['C#', 'C++', 'Unity']],
    ['Game AI', 'Create intelligent NPCs using pathfinding, behavior trees, state machines, and procedural decision-making.', ['Behavior Trees', 'Pathfinding', 'FSMs']],
    ['Level Design', 'Design immersive worlds, puzzles, progression systems, and memorable player experiences.', ['World Building', 'Puzzles']],
    ['Graphics & Shaders', 'Explore lighting, rendering, VFX, post-processing, particles, and shaders.', ['Shaders', 'VFX', 'Rendering']],
    ['Multiplayer Systems', 'Build online games using networking, synchronization, matchmaking, and real-time communication.', ['Networking', 'Sync', 'Matchmaking']],
    ['Optimization', 'Improve performance, memory usage, frame rates, loading systems, and scalable architecture.', ['Profiling', 'Perf']],
  ],

  // ── "What you'll build" 
  projects: [
    [
      'Brick Breaker', 
      'A high-energy arcade classic reimagined with modern glowing neon aesthetics, custom collision physics, and destructive level scaling.', 
      ['Arcade', 'Unity', 'C#'], 
      '${BASE}/assets/projects/brick-breaker.jpeg'
    ],
    [
      'Gravity Flip', 
      'A fast-paced reflex platformer prototype driven by real-time physics vector manipulation and instantaneous gravity inversion mechanics.', 
      ['2D Platformer', 'Mechanics', 'Unity'], 
      '${BASE}/assets/projects/gravity-flip.jpeg'
    ],
    [
      'Shadow Memory', 
      'A grid-based tactical puzzle layout focusing on procedural memory validation and complex movement array logic tracking.', 
      ['Puzzle', 'Grid-Based', 'C#'], 
      '${BASE}/assets/projects/shadow-memory.jpeg'
    ],
    [
      'Asteroid Blast', 
      'An action-packed space shooter handling velocity momentum shifts, custom object transforms, and projectile hit detection systems.', 
      ['Space Shooter', 'Arcade', '2D'], 
      '${BASE}/assets/projects/asteroid-blast.jpeg'
    ],
    [
      'Death Strike', 
      'A high-fidelity 3D third-person fantasy RPG sandbox environment showcasing advanced atmospheric lighting setups and character behavior mechanics.', 
      ['3D RPG', 'Unreal Engine', 'Graphics'], 
      '${BASE}/assets/projects/death-strike.jpeg'
    ]
  ],

  // ── "Unlock abilities" ──
  events: [],
  internships: [],
  papers: [],

  // ── Custom Achievements structure strictly optimized for GLITCH layout ──
  achievements: {
    eyebrow: 'TRIUMPHS',
    headingPlain: 'Hackathon',
    headingHighlight: 'Wins',
    description: 'Turning midnight caffeine into national recognition. Our teams compete and dominate at the highest levels.',
    
    hackathonWinPayload: {
      title: 'Evolumin National Level Hackathon',
      team: 'Team Cobra',
      member: 'Bussa Surya',
      award: 'Top 10 National Finalists',
      summary: 'Successfully advanced through intense competitive stages to finish among the Top 10 Teams nationwide at the highly selective Evolumin National Level Hackathon, organized and evaluated by the ACM Student Chapter, Amritapuri.'
    },

    people: [],
    competitionWins: [],
    internships: [],
    publications: [],
    hackathons: [],
  },

  // ── Explorations background cards ──
  explorations: [],

  // ── Closing section: Philosophy, Arsenal, Endgame, Accept the Quest ──
  manifesto: {
    eyebrow: 'THE GLITCH PHILOSOPHY',
    headingPlain: 'Anyone can play.',
    headingHighlight: 'Creators build.',
    philosophy: [
      'Anyone can consume experiences. Creators design them.',
      'Every legendary game, every unforgettable world, every iconic character started as a single idea.',
      'At ACM Glitch, we don\u2019t just teach game development \u2014 we build the next generation of creators.',
    ],
    arsenalLabel: 'Your Arsenal',
    arsenal: ['Unity', 'Unreal Engine', 'Godot', 'C#', 'C++', 'Blender', 'Git & GitHub', 'Aseprite'],
    endgameLabel: 'Endgame',
    endgame: ['Game Development', 'Graphics Engineering', 'AR/VR', 'Simulation Engineering', 'Software Engineering', 'Research', 'Hackathons', 'Startups', 'Open Source', 'UI/UX Engineering', 'Interactive Media'],
    cta: {
      eyebrow: 'ACCEPT THE QUEST',
      line: 'The next unforgettable game, the next incredible world, the next breakthrough idea hasn\u2019t been created yet. Maybe it begins with you. Welcome to ACM Glitch.',
      buttonLabel: 'Welcome to ACM Glitch',
    },
  },

  // ── "Why Join" benefit cards ──
  whyJoinHeading: 'WHY JOIN GLITCH',
  whyJoinTitle: 'From Player To Creator',
  whyJoinDescription: 'From your first game engine project to shipping playable worlds — this SIG is where curiosity turns into creation.',
  benefits: [
    ['Build Real Games, Not Just Demos', 'Ship 2D, 3D, multiplayer, and mobile builds — not toy assignments that live in a folder.'],
    ['Every CS Discipline, One Build', 'Game dev touches AI, graphics, physics, networking, and architecture all at once — one of the most complete engineering challenges around.'],
    ['Beyond Games: VR, AR & Simulation', 'The same engines power medical simulations, digital twins, self-driving simulation, and robotics — skills that transfer far past gaming.'],
    ['Learn By Shipping', 'Weekly challenges, jams, and sprints mean you\u2019re always building — every prototype, bug, and failed mechanic makes you a better engineer.'],
    ['Tools Real Studios Use', 'Unity, Unreal, Godot, and the same pipelines professional game studios run in production.'],
    ['A Portfolio Of Playable Work', 'Leave with shipped builds and jam entries recruiters can actually open and play — not just a resume line.'],
  ],

  // ── "The Party" (Members) ──
  classes: ['Engineer', 'Artist', 'Designer'],
  members: [
    ['Monish', '${BASE}/assets/glitch-party/mounish.jpeg', 'Core', 'Gameplay Programming', 'Engineer'],
    ['Jaswanth', '${BASE}/assets/glitch-party/jaswanth.jpeg', 'Core', 'Graphics & Shaders', 'Artist'],
    ['Madhav', '${BASE}/assets/glitch-party/madhav.jpeg', 'Core', 'Graphics & Shaders', 'Artist'],
  ],
}