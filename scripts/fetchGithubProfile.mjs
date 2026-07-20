import fs from 'fs';
import path from 'path';

const SRC_DATA_DIR = path.resolve(process.cwd(), 'src/data');

if (!fs.existsSync(SRC_DATA_DIR)) {
  fs.mkdirSync(SRC_DATA_DIR, { recursive: true });
}

async function fetchProfile() {
  const readmeUrl = 'https://raw.githubusercontent.com/Paramveersingh-S/Paramveersingh-S/main/README.md';
  const res = await fetch(readmeUrl);
  const markdown = await res.text();

  // Parsing Tech Stack Badges
  const techStack = [];
  const regex = /logo=([^&"\s)\]]+)/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const slug = match[1].toLowerCase();
    // Add logic to group categories manually if needed, or leave category as default
    techStack.push({ slug, label: slug, category: 'Skills' });
  }

  // De-duplicate tech stack
  const uniqueTechStack = Array.from(new Map(techStack.map(item => [item.slug, item])).values());
  
  fs.writeFileSync(path.join(SRC_DATA_DIR, 'techstack.json'), JSON.stringify(uniqueTechStack, null, 2));

  // Build About JSON based on plan
  const about = {
    tagline: "Machine Learning | Embedded Software | Cyber Security | Kernel Programming",
    currentlyBuilding: "Scalable Full-Stack Architectures & Deep Tech Solutions",
    bullets: [
      "Interested in Machine Learning, Embedded Software, Cyber Security, and Kernel Programming.",
      "Open to collaboration and research paper analysis."
    ],
    achievements: [
      "NASA Space Apps Challenge — Global Nominee & Regional Winner (out of 18,868+ teams)",
      "GirlScript Summer of Code (GSSoC) — Selected AI/ML & open-source contributor",
      "IPD EXPO 2025 — 1st place among 30+ projects",
      "AI Hack Matrix 2026 — Finalist (300+ teams)",
      "India Innovates — National Finalist (35,000+ entries)"
    ],
    publications: [
      "IEEE-ICSPED Conference paper: 'CHRONOS: A Chaos-Harnessed TRNG for Neural Initialization and Secure Key Synthesis'",
      "Springer Journal (accepted): 'AI Driven Sanskrit Character Recognition and Translating to Text and Audio Formats: A Step Towards IKS Revival'"
    ],
    internships: [
      "Software Development Intern @ CSIR-CSIO",
      "Manufacturing/Automation Intern @ Yamada Automation"
    ]
  };

  fs.writeFileSync(path.join(SRC_DATA_DIR, 'about.json'), JSON.stringify(about, null, 2));
  console.log('fetchGithubProfile complete.');
}

fetchProfile();
