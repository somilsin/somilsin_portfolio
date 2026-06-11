export interface Entry {
  chapterId: string;
  number: number;
  total: number;
  fact: string;
  expansion: string;
}

export const entries: Entry[] = [
  // Experience
  {
    chapterId: "experience",
    number: 1,
    total: 2,
    fact:
      "Building agentic software at Oracle — RAG pipelines and context engineering for the Construction & Engineering GBU.",
    expansion:
      "Associate Software Engineer working on full-stack AI/ML systems: applied agentic engineering, retrieval-augmented generation, and Oracle JET frontends with deep integration into OIC flows.",
  },
  {
    chapterId: "experience",
    number: 2,
    total: 2,
    fact:
      "Shipped reusable JET components and integration tests that became part of the team's permanent toolbox during a 6-month internship.",
    expansion:
      "Software Engineering Intern at Oracle (2023–2024). Owned component features, wrote integration tests, and contributed automation to developer workflows before converting to full-time.",
  },
  // Projects
  {
    chapterId: "projects",
    number: 1,
    total: 5,
    fact:
      "Wrote cyber-security reconnaissance tooling that fingerprints remote OSes and probes open ports to surface third-party attack surface.",
    expansion:
      "Computer Networking + Operating Systems project at RVCE (May–Aug 2023). Focused on remote OS detection and port-vulnerability mapping.",
  },
  {
    chapterId: "projects",
    number: 2,
    total: 5,
    fact:
      "Built a YOLOv4 object-tracking system with boundary-edge detection — accuracy held in the 75–95% range, even on objects clipping the frame.",
    expansion:
      "Real-time computer vision pipeline. Published in IJISRT (Aug 24, 2023): 'Object Detection, Classification and Tracking of Everyday Common Objects.'",
  },
  {
    chapterId: "projects",
    number: 3,
    total: 5,
    fact:
      "Automatic Number Plate Recognition for Indian vehicles using Tesseract OCR, stored to a live database with Twilio SMS alerts on repeat offenders.",
    expansion:
      "Node.js + computer networking project (May–Sep 2022). Built end-to-end license-plate capture, parsing, persistence, and alerting.",
  },
  {
    chapterId: "projects",
    number: 4,
    total: 5,
    fact:
      "Trained a CNN on Fashion-MNIST that classifies apparel categories from raw images — a hands-on dive into convolutional architectures.",
    expansion:
      "Artificial Intelligence + Deep Learning project (Sep 2021 – Jan 2022). First serious experiment with convolutional neural networks.",
  },
  {
    chapterId: "projects",
    number: 5,
    total: 5,
    fact:
      "An Arduino UNO + RFID smart-parking entry system for apartment and office authentication — embedded C, hardware in the loop.",
    expansion:
      "RFID Smart Parking Entry System (Nov–Dec 2021). Hardware + firmware project, written in C against the AVR toolchain.",
  },
  // Education
  {
    chapterId: "education",
    number: 1,
    total: 3,
    fact:
      "B.E. Computer Science, RV College of Engineering — 3.74/4.0 Scholaro GPA, First Class with Distinction (Dec 2020 – Aug 2024).",
    expansion:
      "Coursework across systems, algorithms, AI/ML, networking and operating systems. Final-semester research paper published in IJISRT.",
  },
  {
    chapterId: "education",
    number: 2,
    total: 3,
    fact:
      "National Public School, Indiranagar — 96.8% in CBSE 10th, NTSE final round (AIR Top 800), awarded a 2-year merit scholarship.",
    expansion:
      "₹25,000 INR per quarter merit scholarship from NTSE for two years. CBSE-affiliated board.",
  },
  {
    chapterId: "education",
    number: 3,
    total: 3,
    fact:
      "GRE 335/340 (165 Q, 169 V) · TOEFL-iBT 116/120 (R 29, L 29, S 28, W 30) — certified C2-level English proficiency.",
    expansion:
      "Standardised test scores taken in 2025. Campion School, Mumbai alumnus — All-Rounder Award recipient (2015, 2016).",
  },
  // Honors
  {
    chapterId: "honors",
    number: 1,
    total: 25,
    fact:
      "International chess ELO of 1340 since 2016. 8th place in the Maharashtra State U-8 tourney. Over 25 chess medals from inter-school to national level.",
    expansion:
      "Trained at SMCA — South Mumbai Chess Academy, Group A Winner (2010–2015). Chess is where pattern-recognition and patience were forged.",
  },
  {
    chapterId: "honors",
    number: 2,
    total: 25,
    fact:
      "NTSE 2018 — All India Rank in the Top 800 finals, with a 2-year merit scholarship from the Government of India.",
    expansion:
      "Associated with National Public School, Indiranagar. NTSE is one of India's most competitive school-level scholarship exams.",
  },
  {
    chapterId: "honors",
    number: 3,
    total: 25,
    fact:
      "MaRRS Spelling Bee — State Level finalist (May 2016) while at Campion School, Mumbai.",
    expansion:
      "Qualified through inter-school and zonal rounds before reaching the state-level competition.",
  },
  {
    chapterId: "honors",
    number: 4,
    total: 25,
    fact:
      "Badminton District Sports Office (DSO) — 4th place in Mumbai, Jan 2016.",
    expansion:
      "One of many sports honors from Campion School: football, basketball, chess, badminton, cricket and quiz accolades from 2008–2019.",
  },
  // Volunteering
  {
    chapterId: "volunteering",
    number: 1,
    total: 2,
    fact:
      "Core Electronics Engineer on Team Antariksh — RVSAT1, India's first student-built satellite carrying a microbiological payload.",
    expansion:
      "March – November 2022 (9 months). Designed and optimised payload circuitry using Arduino-based systems with hard reliability constraints.",
  },
  {
    chapterId: "volunteering",
    number: 2,
    total: 2,
    fact:
      "Design Team Member at the National Service Scheme, RVCE — Nov 2022 to Jun 2024. 'Innovation with a purpose: giving back to society.'",
    expansion:
      "1 year 8 months in NSS. Designed visual identity and communications for campus social-impact campaigns.",
  },
  // Beyond
  {
    chapterId: "beyond",
    number: 1,
    total: 4,
    fact:
      "State-level footballer and team captain — midfielder by trade, multiple tournament appearances through school and college.",
    expansion:
      "Football, Basketball Winner at Campion School (2008–2016). Sport is where strategy meets stamina.",
  },
  {
    chapterId: "beyond",
    number: 2,
    total: 4,
    fact:
      "Astronomy Quiz Competition Winner (2015) — the spark that turned a child's curiosity about space into a lifelong obsession with the cosmos.",
    expansion:
      "Campion School, Mumbai. The same year as the All-Rounder Award. The interest in nebulae and deep space dates back to here.",
  },
  {
    chapterId: "beyond",
    number: 3,
    total: 4,
    fact:
      "Performing guitarist. Strings as a counterweight to silicon — a different kind of pattern, played in real time.",
    expansion:
      "Self-taught across acoustic and electric. A reminder that not every system needs to be debugged.",
  },
  {
    chapterId: "beyond",
    number: 4,
    total: 4,
    fact:
      "Obsessed with agentic AI, space, and civilisations — the three things big enough to be worth a lifetime.",
    expansion:
      "The driving curiosity behind everything: how minds (artificial or biological) reason under uncertainty, and what's out there beyond the atmosphere.",
  },
];
