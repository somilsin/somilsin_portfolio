export type ChapterStatus = "open" | "queued" | "archived";

export interface Chapter {
  id: string;
  roman: string;
  title: string;
  status: ChapterStatus;
  entry: number;
  total: number;
  description: string;
}

export const chapters: Chapter[] = [
  {
    id: "experience",
    roman: "I",
    title: "Experience at Oracle",
    status: "open",
    entry: 2,
    total: 2,
    description:
      "Associate Software Engineer in Oracle's Construction & Engineering GBU. Building agentic systems, RAG pipelines, and full-stack AI/ML features for enterprise-grade products.",
  },
  {
    id: "projects",
    roman: "II",
    title: "Engineering Projects",
    status: "open",
    entry: 5,
    total: 5,
    description:
      "Cyber-security recon tools, YOLOv4 object tracking, ANPR for Indian vehicles, Fashion-MNIST CNNs, and RFID smart parking. Hardware to deep learning, all hand-built.",
  },
  {
    id: "education",
    roman: "III",
    title: "Education & Test Scores",
    status: "archived",
    entry: 3,
    total: 3,
    description:
      "B.E. Computer Science, RVCE (3.74/4.0, First Class with Distinction). 96.8% in CBSE 10th. NTSE AIR Top 800 scholar. GRE 335/340. TOEFL 116/120 — C2 proficiency.",
  },
  {
    id: "honors",
    roman: "IV",
    title: "Honors & Awards",
    status: "archived",
    entry: 25,
    total: 25,
    description:
      "International ELO 1340 in Chess. 8th place Maharashtra State U-8. NTSE merit scholar. MaRRS Spelling Bee state finalist. 25+ chess medals from inter-school to national circuits.",
  },
  {
    id: "volunteering",
    roman: "V",
    title: "Volunteering & Satellites",
    status: "archived",
    entry: 2,
    total: 2,
    description:
      "Core Electronics Engineer on Team Antariksh — RVSAT1, India's first student-built satellite carrying a microbiological payload. Design Team Member, NSS RVCE.",
  },
  {
    id: "beyond",
    roman: "VI",
    title: "Beyond the Terminal",
    status: "open",
    entry: 4,
    total: 4,
    description:
      "State-level footballer. Badminton DSO 4th place. Guitarist. Astronomy quiz winner. A relentless interest in space, agentic AI, and how civilisations think.",
  },
];
