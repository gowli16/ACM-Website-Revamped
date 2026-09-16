export const cyber = {
  id: 'cyber',
  shortName: 'CYBER',
  name: 'Cyber Security',
  fullName: 'Cyber Security',
  selectorTitle: 'Cyber Security',
  selectorHint: 'Firewall breach',
  signal: 'FIREWALL BREACH UNIT',
  tagline: 'Enter the lab, defend the signal.',
  words: ['CTFs', 'forensics', 'exploits', 'defense', 'red team'],
  description: 'Learn ethical hacking, digital forensics, web security, and the mindset needed to protect real systems.',
  heroEyebrow: 'ACM AMRITAPURI - CYBER SECURITY SIG',
  heroStory: {
    title: 'You Scan A QR Code',
    lines: [
      "Nothing looks suspicious. And that's exactly the point.",
      'Most cyberattacks don’t start with a complex hack; they start with a single moment of misplaced trust.',
    ],
    closing: 'Welcome to cybersecurity.',
  },
  breachStory: {
    eyebrow: 'CASE FILE',
    title: 'The Story Of The Tata Electronics Breach',
    questions: [
      "Quick question. Raise your hand if you've used an iPhone.",
      "Now... keep it raised if you've driven a Tesla.",
      'Probably fewer hands.',
      'Now one more question. How many of you know Tata Electronics?',
      "Not many. And that's exactly why this story matters.",
    ],
    paragraphs: [
      "Tata Electronics isn't a consumer brand. They manufacture components behind the scenes. No advertisements. No product launches. No fanbase. Just critical infrastructure inside the global technology supply chain.",
      'The World Leaks ransomware group reportedly stole around 1.4 TB of internal data. Suddenly, a company that most people had never heard of became international news.',
      'Inside were highly confidential details related to the unreleased iPhone 18 Pro and iPhone 18 Pro Max.',
      'The breach also reportedly exposed engineering drawings marked "TRADE SECRET" connected to components manufactured for Tesla.',
    ],
    stats: [
      ['1.4 TB', 'Internal data allegedly stolen'],
      ['iPhone 18 Pro', 'Unreleased device details exposed'],
      ['Tesla', 'Trade secret drawings leaked'],
    ],
  },
  domainsHeadingPlain: 'Our',
  domainsHeadingHighlight: 'Mission',
  domainsDescription: 'ACM Cyber exists to turn curiosity into capability. Our goal is simple: help students develop practical cybersecurity skills that are useful in competitions, research, internships, and industry.',
  
  showMembers: true,
  email: 'acmchapter@am.amrita.edu',
  marquee: 'CYBER SECURITY SIG - BREACH DETECTED - ',
  domains: [
    ['Web Security', 'Master the art of thinking like a hacker to hunt down hidden weaknesses in websites—protecting your favorite everyday apps from massive data breaches—and launch an exciting career as a penetration tester or bug bounty hunter for everyone from hot startups to global tech giants.', ['OWASP', 'Burp', 'Auth']],
    ['Cryptography', 'Master the art of keeping the digital world safe—protecting everything from WhatsApp chats to online banking—and launch a high-impact career as a security expert at top global tech and finance companies.', ['Crypto', 'Hashing', 'RSA']],
    ['Digital Forensics', 'Master the art of digital detective work to piece together cybercrimes—tracking down hackers and recovering deleted evidence after an attack—and launch a thrilling career as a forensics investigator or incident responder for law enforcement and top enterprise security teams.', ['Wireshark', 'Linux', 'OSINT']],
    ['REVERSING', 'Master the art of taking software apart to uncover its hidden secrets—from busting dangerous ransomware to stopping video game cheaters—and launch a thrilling career as a malware analyst or security researcher at top cybersecurity firms and government agencies.', ['pwn', 'rev', 'CTF']],
  ],
  worksEyebrow: 'PROJECT LOG',
  worksHeadingPlain: 'Our',
  worksHeadingHighlight: 'Projects',
  worksDescription: 'Real tools and research shipped by ACM Cyber members - not tutorials, actual working builds.',
  projects: [
    ['WebFuzzer', 'A custom coverage-guided web fuzzing engine for automated crash discovery and bug hunting.', ['Fuzzing', 'Python'], '${BASE}/assets/projects/1.png'],
    ['CrumbJack', 'A session hijacking research tool that extracts and converts browser cookies for security testing.', ['Session Hijacking', 'Python'], '${BASE}/assets/projects/2.png'],
    ['IDS DoS Firewall', 'A real-time intrusion detection script that monitors packet rates to flag and mitigate DoS traffic.', ['IDS', 'Networking'], '${BASE}/assets/projects/3.png'],
    ['Epochon - GreenEra', 'A precision farming platform tackling crop disease diagnosis and sustainable agriculture at scale.', ['Hackathon', 'ML'], '${BASE}/assets/projects/4.png'],
    ['Fingerprint Deepfake Detection', 'A deep learning model trained to catch silicone, 3D-printed, and AI-generated fingerprint spoofs.', ['Deep Learning', 'Biometrics'], '${BASE}/assets/projects/5.png'],
    ['Ransomware Simulation', 'A safe, sandboxed ransomware simulation for teaching encryption, key handling, and incident response.', ['Malware Sim', 'Security'], '${BASE}/assets/projects/6.png'],
  ],

  // Root level copies (for clean standalone components)
  internships: [
    ['xTREEM Multimedia', 'Web Security Intern', 'Vasudev'],
    ['Inlighn Tech', 'Cyber Security Intern', 'Semin'],
    ['Oasis Infobyte', 'Cyber Security Intern', 'Mohith'],
    ['Amroha Police Cyber Security', 'Cyber Security Intern', 'Anvesh']
  ],
  papers: [
    ['A Chaos Game Representation Approach for Genome Analysis', 'International Conference', '2026', 'Rushik'],
    ['Federated Learning-Based Secure Access Control in IoMT Systems', 'IEEE Publication', '2026', 'Neha Manoj']
  ],

  // ONLY FIRST 2 WORKSHOPS
  eventsHeadingPlain: 'Hands-on',
  eventsHeadingHighlight: 'Workshops',
  eventsDescription: 'At ACM SIG Cyber, we conduct practical workshops on real-world cybersecurity topics such as Active Directory, Web Security, Reverse Engineering, Digital Forensics, and CTFs. Learn by doing, not just by listening.',
  events: [
    [
      'Active Directory: Identity Management',
      'Workshop',
      'Completed',
      '${BASE}/assets/workshops/active-directory-hero.jpeg',
      'A hands-on session on Active Directory - covering identity, security principals, group policy scope and precedence, and how Windows authenticates users under the hood. Part of our practical workshop series on real-world cybersecurity topics like Active Directory, Web Security, Reverse Engineering, Digital Forensics, and CTFs. Learn by doing, not just by listening.',
      [
        '${BASE}/assets/workshops/active-directory-hero.jpeg',
        '${BASE}/assets/workshops/active-directory-1.jpeg',
        '${BASE}/assets/workshops/active-directory-2.jpeg',
        '${BASE}/assets/workshops/active-directory-3.jpeg',
        '${BASE}/assets/workshops/active-directory-4.jpeg',
        '${BASE}/assets/workshops/active-directory-5.jpeg',
      ],
    ],
    [
      'ISEA MeitY Initiative: Foundations of Cybersecurity',
      'Workshop',
      'Completed',
      '/assets/cyberworkshops/hero.jpeg',
      'The Centre for Internet Studies and Artificial Intelligence (CISAI) at Amrita Vishwa Vidyapeetham, in collaboration with the ACM Student Chapter, Amritapuri, successfully hosted a cybersecurity workshop under the ISEA Phase-III, MeitY initiative. Key takeaways included hands-on cybersecurity training, interactive discussions on emerging threats, live demonstrations on digital safety, and expert Q&A on the future of cybersecurity.',
      [
        '${BASE}/assets/cyberworkshops/1.jpeg',
        '${BASE}/assets/cyberworkshops/2.jpeg',
        '${BASE}/assets/cyberworkshops/3.jpeg',
        '${BASE}/assets/cyberworkshops/4.jpeg',
        '${BASE}/assets/cyberworkshops/6.jpeg',
        '${BASE}/assets/cyberworkshops/hero.jpeg',
      ],
    ],
  ],  

  members: [
    // ── CORE (big cards) ──
    ['Anaswara A', '${BASE}/assets/cybermembers/anaswara.jpeg', 'core', 'ACM Chairperson'],
    ['Semin', '${BASE}/assets/cybermembers/semin.jpeg', 'core', 'Cyber Lead'],
    ['Tenisha', '${BASE}/assets/cybermembers/tenisha.jpeg', 'core', 'Core Member'],
    ['Raj Mohith', '${BASE}/assets/cybermembers/mohith.jpeg', 'core', 'Core Member'],
    ['Poonguzhali', '${BASE}/assets/cybermembers/poonguzhali.jpeg', 'core', 'Core Member'],

    // ── MEMBERS (small cards) ──
    ['Rushik', '${BASE}/assets/cybermembers/rushik.jpeg', 'Member'],
    ['Anvesh', '${BASE}/assets/cybermembers/anvesh.jpeg', 'Member'],
    ['Jeevita', '${BASE}/assets/cybermembers/jeevita.jpeg', 'Member'],
    ['Arjun', '${BASE}/assets/cybermembers/arjun.jpeg', 'Member'],
    ['Joseph', '${BASE}/assets/cybermembers/joseph.jpeg', 'Member'],
    ['Shriya', '${BASE}/assets/cybermembers/shriya.jpeg', 'Member'],
    ['Navneeth', '${BASE}/assets/cybermembers/navneeth.jpeg', 'Member'],
    ['Nandana', '${BASE}/assets/cybermembers/nandana.jpeg', 'Member'],
    ['Abhinav', '${BASE}/assets/cybermembers/abhinav.jpeg', 'Member'],
  ],

  achievements: {
    eyebrow: 'TRACK RECORD',
    headingPlain: 'Internships &',
    headingHighlight: 'Achievements',
    description: 'Proof that ACM Cyber turns curiosity into capability - in competitions, internships, research, and industry.',
    people: [
      ['Akhil Menon', 'Product Security Engineer', 'Groww', 'groww.in'],
      ['Neha Manoj', 'Research Intern', 'Ericsson', 'ericsson.com'],
      ['Vasudev', 'Security Researcher Intern', 'Breachsimrange', 'breachsimrange.io'],
      ['Aadithyan Raju', 'Intern', 'Bosch Global Software Technologies', 'bosch.com'],
      ['Vipin Venu', 'Senior Security Researcher', 'Innspark', 'innspark.in'],
    ],
    competitionWins: [
      'TECHNOIR CTF - National Runner-up',
      'IIT Madras Embedded CTF - Top 10 team in India',
      'Kerala Police Dome CTF - Runner-up',
      'Buffer CTF - Top 4 nationally',
      'Anokha CTF - 4th place',
      'Top 15% globally in CTF competitions',
      'Top 5 at TECHASHY, the IIT Kottayam Hackathon',
      'TryHackMe team ranking: Top 8% on the platform',
    ],
    // Nested backups so older setups don't break
    internships: [
      ['Vasudev', 'Web Security Intern - xTREEM Multimedia'],
      ['Semin', 'Cyber Security Intern — Inlighn Tech'],
      ['Mohith', 'Cyber Security Intern — Oasis Infobyte'],
      ['Anvesh', 'Cyber Security Intern — Amroha Police Cyber Security'],
    ],
    publications: [
      ['Rushik', 'A Chaos Game Representation Approach for Genome Analysis'],
      ['Neha Manoj', 'Federated Learning-Based Secure Access Control (IEEE Publication)'],
    ],
    hackathons: [
      ['Jeevita', 'Best Girls Team Award \u2014 HackToLearn Hackathon'],
      ['Nandana', '3rd Place \u2014 Epochon Hackathon'],
      ['Akhil Menon', 'Adversary Village CTF, COCON \u201923 \u2014 16th COCON Cyber Security Conference, Grand Hyatt Kochi'],
      ['Vasudev B', 'DDoS IDS/IPS Deployment at Xtreem Multimedia \u2014 built a custom intrusion detection & prevention system to mitigate DDoS attacks'],
    ],
    partnership: 'Co-organized a cybersecurity workshop collaboration with the Centre for Internet Studies & Artificial Intelligence (CISAI), as part of the ISEA Phase III, MeitY initiative.',
  },
}