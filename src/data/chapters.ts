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
    title: "Experience",
    status: "open",
    entry: 7,
    total: 7,
    description:
      "Full Stack AI-ML Developer at Oracle. Prior research at IISc Bangalore (NeRF) and Samsung R&D (video frame synthesis), plus AI/CV internships at Wipro PARI and Solar Secure.",
  },
  {
    id: "projects",
    roman: "II",
    title: "Engineering Projects",
    status: "open",
    entry: 5,
    total: 5,
    description:
      "Computer vision first: YOLOv4 object tracking with boundary-edge detection, ANPR for Indian vehicles, Fashion-MNIST CNN classification — then cyber-security recon and RFID smart parking.",
  },
  {
    id: "certifications",
    roman: "III",
    title: "Certifications",
    status: "open",
    entry: 7,
    total: 7,
    description:
      "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional, OCI Foundations & AI Foundations Associates, TDD for Java, TensorFlow Deep Learning, Python for DS/ML.",
  },
  {
    id: "education",
    roman: "IV",
    title: "Education & Test Scores",
    status: "archived",
    entry: 3,
    total: 3,
    description:
      "B.E. Computer Science, RVCE (3.74/4.0, First Class with Distinction). 96.8% in CBSE 10th. NTSE AIR Top 800 scholar. GRE 335/340. TOEFL 116/120 — C2 proficiency.",
  },
  {
    id: "honors",
    roman: "V",
    title: "Honors & Awards",
    status: "archived",
    entry: 4,
    total: 4,
    description:
      "International ELO 1340 in chess, 8th in Maharashtra State U-8, NTSE merit scholar, MaRRS Spelling Bee state finalist, Badminton DSO 4th in Mumbai.",
  },
  {
    id: "volunteering",
    roman: "VI",
    title: "Volunteering & Satellites",
    status: "archived",
    entry: 2,
    total: 2,
    description:
      "Core Electronics Engineer on Team Antariksh — RVSAT1, India's first student-built satellite. Design Team, NSS RVCE.",
  },
  {
    id: "beyond",
    roman: "VII",
    title: "Beyond the Terminal",
    status: "open",
    entry: 3,
    total: 3,
    description:
      "State-level footballer & captain. Astronomy quiz winner. Performing guitarist.",
  },
];
