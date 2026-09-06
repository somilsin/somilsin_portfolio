export type SourceRef = {
  /** The exact claim made elsewhere on the page. */
  claim: string;
  /** Where on the page the claim appears. */
  section: "Hero" | "Metrics" | "Experience" | "Work" | "Stack" | "Credentials";
  /** GitHub evidence: full repo name (owner/repo) and optional PR / file path. */
  repo?: string;
  repoPath?: string;
  repoLabel?: string;
  /** Non-GitHub primary source (DOI, lab page, employer). */
  external?: { label: string; href: string };
  /** The CV section that states this claim, linked to the matching page anchor. */
  cv: { label: string; anchor: string };
};

export const GITHUB_USER = "somilsin";

export const SOURCES: SourceRef[] = [
  {
    claim:
      "NeRF with plenoptic 7D scene representations, +25% reconstruction fidelity (Blender, LLFF, DTU) at IISc VAL.",
    section: "Experience",
    external: { label: "IISc Visual AI & Learning Lab", href: "https://val.cds.iisc.ac.in/" },
    cv: { label: "CV — Experience § IISc Bangalore, VAL", anchor: "#experience" },
  },
  {
    claim: "Reduced mean joint-position error 18% using Gaussian splatting, supersampling and custom BVH.",
    section: "Experience",
    external: { label: "IISc Visual AI & Learning Lab", href: "https://val.cds.iisc.ac.in/" },
    cv: { label: "CV — Experience § IISc Bangalore, VAL", anchor: "#experience" },
  },
  {
    claim: "Multi-agent LLM ecosystem triaging 150–200 bugs/week; 45 min → under 2 min resolution.",
    section: "Metrics",
    external: { label: "Oracle Primavera Cloud", href: "https://www.oracle.com/construction-engineering/primavera-cloud/" },
    cv: { label: "CV — Experience § Oracle, Primavera Cloud", anchor: "#experience" },
  },
  {
    claim: "RAG over a 100k+ vector knowledge base, 500+ RFP documents/day, sub-1.5s retrieval.",
    section: "Experience",
    external: { label: "Oracle Vector 23ai", href: "https://www.oracle.com/database/ai-vector-search/" },
    cv: { label: "CV — Experience § Oracle, Primavera Cloud", anchor: "#experience" },
  },
  {
    claim: "$1.1M projected savings from org-wide agentic SDLC adoption.",
    section: "Metrics",
    cv: { label: "CV — Experience § Oracle, Primavera Cloud", anchor: "#experience" },
  },
  {
    claim: "BehaviorAI — winner, Softway LoveXAI Hackathon 2026, built solo in a 2-hour sprint.",
    section: "Work",
    repo: "somilsin/behaviorai-lovexai",
    repoLabel: "Source repository",
    cv: { label: "CV — Awards § LoveXAI Hackathon", anchor: "#credentials" },
  },
  {
    claim: "Published: object detection, classification and tracking at sub-30ms latency (YOLOv4, TensorFlow, OpenCV).",
    section: "Work",
    external: { label: "doi.org/10.5281/zenodo.8330641", href: "https://doi.org/10.5281/zenodo.8330641" },
    cv: { label: "CV — Publications § IJISRT Vol. 8 Issue 8", anchor: "#credentials" },
  },
  {
    claim: "Transformers and LLMs implemented from scratch (attention, tokenisation, training loops).",
    section: "Work",
    repo: "somilsin/Transformers_Large-Language-Models",
    repoLabel: "Source repository",
    cv: { label: "CV — Projects § Transformers & LLMs", anchor: "#work" },
  },
  {
    claim: "Indian ANPR — real-time plate recognition with pytesseract, MySQL registration checks, Twilio alerts.",
    section: "Work",
    repo: "somilsin/Indian-ANPR",
    repoLabel: "Source repository",
    cv: { label: "CV — Projects § Indian ANPR", anchor: "#work" },
  },
  {
    claim: "Customised SSD + FPN for autonomous driving — 55–75% mAP on the WIRIN dataset (Wipro PARI).",
    section: "Experience",
    repo: "somilsin/Object-Detection-using-SSD",
    repoLabel: "Source repository",
    cv: { label: "CV — Experience § Wipro PARI", anchor: "#experience" },
  },
  {
    claim: "Continuous self-directed ML practice and academic explorations.",
    section: "Stack",
    repo: "somilsin/Learning-Archive",
    repoLabel: "Source repository",
    cv: { label: "CV — Skills § Machine Learning", anchor: "#stack" },
  },
  {
    claim: "B.E. Computer Science & Engineering, RVCE (Dec 2020 — Jun 2024).",
    section: "Credentials",
    external: { label: "rvce.edu.in", href: "https://www.rvce.edu.in/" },
    cv: { label: "CV — Education § RVCE", anchor: "#credentials" },
  },
];

const TAG_RULES: Array<[string, RegExp]> = [
  ["computer vision", /nerf|gaussian|detection|tracking|yolo|opencv|anpr|ssd|plenoptic|joint-position/i],
  ["llm", /llm|rag|transformer|agent|attention|token/i],
  ["research", /nerf|gaussian|publish|doi|ijisrt|iisc/i],
  ["production", /oracle|savings|week|latency|retrieval|sdlc/i],
  ["award", /winner|hackathon/i],
  ["education", /b\.e\.|rvce|education/i],
  ["github", /repo/i],
];

/** Derives filter tags for a claim from its section, evidence and wording. */
export function tagsFor(s: SourceRef): string[] {
  const hay = `${s.claim} ${s.section} ${s.repo ?? ""} ${s.external?.label ?? ""} ${s.cv.label}`;
  const tags = new Set<string>([s.section.toLowerCase()]);
  for (const [tag, re] of TAG_RULES) if (re.test(hay)) tags.add(tag);
  if (s.repo) tags.add("github");
  if (s.external?.href.includes("doi.org")) tags.add("doi");
  return [...tags];
}

export const ALL_TAGS = [...new Set(SOURCES.flatMap(tagsFor))].sort();

export function evidenceUrl(s: SourceRef): string | null {
  if (s.repo) return `https://github.com/${s.repo}${s.repoPath ?? ""}`;
  return s.external?.href ?? null;
}

export type ExportRow = {
  section: string;
  claim: string;
  evidence_type: string;
  evidence_label: string;
  evidence_url: string;
  cv_section: string;
  cv_anchor: string;
  tags: string;
};

export function buildExportRows(origin = ""): ExportRow[] {
  return SOURCES.map((s) => ({
    section: s.section,
    claim: s.claim,
    evidence_type: s.repo ? "github" : s.external?.href.includes("doi.org") ? "doi" : s.external ? "web" : "cv-only",
    evidence_label: s.repoLabel ?? s.external?.label ?? "CV only",
    evidence_url: evidenceUrl(s) ?? "",
    cv_section: s.cv.label,
    cv_anchor: `${origin}/${s.cv.anchor}`.replace(/([^:])\/\/+/g, "$1/"),
    tags: tagsFor(s).join("|"),
  }));
}

export function rowsToCsv(rows: ExportRow[]): string {
  const headers = Object.keys(rows[0] ?? {}) as Array<keyof ExportRow>;
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

export type RepoFacts = {
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
};

/** Fetches the latest public facts for the repos referenced above. */
export async function fetchRepoFacts(signal?: AbortSignal): Promise<Record<string, RepoFacts>> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });
  if (!res.ok) {
    const hint =
      res.status === 403 || res.status === 429
        ? "GitHub rate limit reached — wait a minute and retry."
        : res.status === 404
          ? "GitHub user not found."
          : "GitHub is unreachable right now.";
    throw new Error(`${res.status} — ${hint}`);
  }
  const list = (await res.json()) as RepoFacts[];
  const map: Record<string, RepoFacts> = {};
  for (const r of list) map[r.full_name.toLowerCase()] = r;
  return map;
}
