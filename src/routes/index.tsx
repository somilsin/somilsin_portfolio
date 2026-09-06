import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ParticleHead from "@/components/fx/ParticleHead";
import SourcesPanel from "@/components/SourcesPanel";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Somil Singh — AI & Computer Vision Engineer" },
      {
        name: "description",
        content:
          "AI & Computer Vision Engineer. NeRF and Gaussian splatting research at IISc VAL, multi-agent LLM infrastructure and RAG at Oracle, published object tracking research.",
      },
      { property: "og:title", content: "Somil Singh — AI & Computer Vision Engineer" },
      {
        property: "og:description",
        content:
          "3D perception, multi-agent LLM systems and production RAG. IISc VAL · Oracle · Wipro PARI · published in IJISRT.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const NAV = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "credentials", label: "Credentials" },
  { id: "sources", label: "Sources" },
  { id: "contact", label: "Contact" },
];


const METRICS = [
  { value: "150–200", label: "bugs triaged autonomously / week at Oracle" },
  { value: "$1.1M", label: "projected savings from agentic SDLC adoption" },
  { value: "<30ms", label: "latency, GPU object tracking pipeline" },
  { value: "25%", label: "NeRF reconstruction fidelity gain at IISc VAL" },
];

const EXPERIENCE = [
  {
    role: "Computer Vision Research Assistant",
    name: "IISc Bangalore — Visual AI & Learning Lab (VAL)",
    tag: "Sep 2026 — Present",
    points: [
      "Neural Radiance Fields with plenoptic functions modelling 7D scene representations for human-pose estimation — +25% reconstruction fidelity, validated on Blender, LLFF and DTU.",
      "SfM/SLAM camera calibration for 3D reconstruction with differentiable ray tracing at 12 fps real-time inference; volumetric rendering and lightfield pipelines (1000+ LoC, PyTorch/Ubuntu).",
      "Reduced mean joint-position error 18% on out-of-distribution data using Gaussian splatting, supersampling and custom BVH acceleration structures.",
    ],
    link: { label: "val.cds.iisc.ac.in ↗", href: "https://val.cds.iisc.ac.in/" },
  },
  {
    role: "Full-Stack AI Engineer",
    name: "Oracle — Primavera Cloud",
    tag: "Jan 2024 — Present",
    points: [
      "Engineered a multi-agent LLM ecosystem (MCP, PL/SQL DB, Jira, codebase) that autonomously triages 150–200 bugs per week — resolution time from 45 min to under 2 min, 120+ engineering hours saved monthly.",
      "Built RAG pipelines over a 100k+ vector knowledge base processing 500+ RFP documents daily with LangChain and Oracle Vector 23ai — sub-1.5s retrieval, +35% throughput.",
      "Drove org-wide adoption of agentic tooling (Cline, Kilo Code, Codex), turning the enterprise SDLC into model-agnostic, OS-independent AI infrastructure — $1.1M projected savings.",
      "Owned 19 full-stack features across React and Java/Spring (+28% responsiveness); resolved 40+ high-priority bugs with a 0-defect post-fix record.",
    ],
    link: { label: "oracle.com ↗", href: "https://www.oracle.com" },
  },
  {
    role: "Founder — BehaviorAI · Winner",
    name: "Softway LoveXAI Hackathon",
    tag: "Jun 2026",
    points: [
      "Solo-architected a functional AI behavioural-change product in a 2-hour sprint, scoped for 10,000 employees.",
      "Won the hackathon and secured corporate interest for enterprise rollout after a live executive defence.",
    ],
    link: { label: "github.com/somilsin/behaviorai-lovexai ↗", href: "https://github.com/somilsin/behaviorai-lovexai" },
  },
  {
    role: "Deep Learning Research Assistant",
    name: "Wipro PARI — Autonomous Driving",
    tag: "Nov 2022 — Mar 2023",
    points: [
      "Trained a customised Single Shot Detector with Feature Pyramid Networks for multi-scale perception in dense driving scenes — 55–75% mAP on the real-world WIRIN traffic dataset.",
    ],
    link: { label: "github.com/somilsin/Object-Detection-using-SSD ↗", href: "https://github.com/somilsin/Object-Detection-using-SSD" },
  },
];

const WORK = [
  {
    n: "01",
    title: "Object Detection, Classification & Tracking of Everyday Common Objects",
    meta: "Published · IJISRT Vol. 8 Issue 8, Aug 2023 · ISSN 2456-2165",
    body: "GPU-accelerated segmentation and tracking pipeline (YOLOv4, TensorFlow, OpenCV) at sub-30ms latency. Detection combined with dynamic cropping for 75–95% accuracy, handling edge-frame targets and occlusion.",
    href: "https://doi.org/10.5281/zenodo.8330641",
    hrefLabel: "doi.org/10.5281/zenodo.8330641 ↗",
  },
  {
    n: "02",
    title: "Transformers & Large Language Models",
    meta: "From-scratch implementations · Stanford / MIT curricula",
    body: "Transformers and LLMs implemented from first principles — attention, tokenisation, training loops — documenting a progression through advanced machine learning concepts.",
    href: "https://github.com/somilsin/Transformers_Large-Language-Models",
    hrefLabel: "github.com/somilsin/Transformers_Large-Language-Models ↗",
  },
  {
    n: "03",
    title: "BehaviorAI",
    meta: "Prize-winning · Softway LoveXAI Hackathon 2026",
    body: "AI behavioural-change engine built with Claude in a 2-hour solo sprint, designed for a 10,000-employee deployment.",
    href: "https://github.com/somilsin/behaviorai-lovexai",
    hrefLabel: "github.com/somilsin/behaviorai-lovexai ↗",
  },
  {
    n: "04",
    title: "Indian ANPR",
    meta: "OCR · MySQL · Twilio",
    body: "Automatic number plate recognition for Indian vehicles — real-time plate detection with pytesseract, registration checks against a database, and SMS alerting on repeat offences.",
    href: "https://github.com/somilsin/Indian-ANPR",
    hrefLabel: "github.com/somilsin/Indian-ANPR ↗",
  },
  {
    n: "05",
    title: "Object Detection using SSD",
    meta: "Wipro PARI · WIRIN dataset",
    body: "Customised Single Shot Detector for an automated self-driving car, tuned for detection and tracking accuracy and integrated with the vehicle through a companion app.",
    href: "https://github.com/somilsin/Object-Detection-using-SSD",
    hrefLabel: "github.com/somilsin/Object-Detection-using-SSD ↗",
  },
  {
    n: "06",
    title: "Learning Archive",
    meta: "Jupyter · self-directed",
    body: "A curated archive of practice projects and academic explorations — continuous experimentation across programming and computer science.",
    href: "https://github.com/somilsin/Learning-Archive",
    hrefLabel: "github.com/somilsin/Learning-Archive ↗",
  },
];

const STACK = [
  {
    n: "01",
    title: "3D Perception & Robotics",
    body: "Neural Radiance Fields, Gaussian splatting, SLAM/SfM, camera calibration, differentiable ray tracing, volumetric rendering, BVH acceleration.",
  },
  {
    n: "02",
    title: "Vision & Multimodal Models",
    body: "CNNs, Vision Transformers (ViT), Vision-Language Models, Vision-Language-Action models, diffusion models, world models (JEPA).",
  },
  {
    n: "03",
    title: "Agent & LLM Infrastructure",
    body: "Multi-agent orchestration over MCP, agent evals and harnesses, fine-tuning, pre/post-training, RAG, LangChain, LlamaIndex, Vector 23ai.",
  },
  {
    n: "04",
    title: "Systems & AIOps",
    body: "Python, Java, JavaScript, C, MATLAB · PyTorch, TensorFlow, HuggingFace, CUDA · Spring, Hibernate, Docker, Redis, CI/CD, quantisation and inference optimisation.",
  },
];

const CREDENTIALS = [
  {
    title: "B.E. Computer Science & Engineering",
    meta: "Rashtreeya Vidyalaya College of Engineering · Dec 2020 — Jun 2024",
  },
  {
    title: "High School Diploma — 96.8% aggregate",
    meta: "National Public School, Indiranagar · Sep 2016 — Jun 2020",
  },
  {
    title: "NTSE Scholar — All India Rank within Top 800",
    meta: "National Talent Search Examination",
  },
  {
    title: "Winner — Softway LoveXAI Hackathon 2026",
    meta: "Solo entry · BehaviorAI",
  },
  {
    title: "Published author — IJISRT 2023",
    meta: "Object Detection, Classification and Tracking of Everyday Common Objects",
  },
];

function useActiveSection() {
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const ids = ["top", ...NAV.map((n) => n.id)];
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduce) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // Auto-stagger reveals grouped by their nearest <section>, so each act
    // plays its heading → paragraph → cards in the same smooth cadence.
    const groups = new Map<Element, HTMLElement[]>();
    els.forEach((el) => {
      const key = el.closest("section, header, footer") ?? document.body;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(el);
    });
    groups.forEach((list) => {
      list.forEach((el, i) => {
        if (el.dataset.revealDelay === undefined) {
          el.dataset.revealDelay = String(i * 110);
        }
      });
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay || 0);
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  const active = useActiveSection();
  useReveal();

  return (
    <div id="top" className="page-in relative min-h-screen text-[color:var(--color-foreground)]">
      {/* Top nav */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">
          <a href="#top" className="flex flex-col leading-none">
            <span className="serif-display text-2xl tracking-[0.35em]">SOMIL</span>
            <span className="mt-1 eyebrow text-[color:var(--color-primary)]">AI · COMPUTER VISION · ROBOTICS</span>
          </a>
          <nav className="hidden gap-10 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`eyebrow transition-colors ${
                  active === n.id
                    ? "text-[color:var(--color-primary)]"
                    : "text-[color:var(--color-foreground)]/70 hover:text-[color:var(--color-foreground)]"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Right side scroll dots */}
      <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 md:flex" aria-label="Section progress">
        {["top", ...NAV.map((n) => n.id)].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={id}
            className={`h-2 w-2 rounded-full border transition-all ${
              active === id
                ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] scale-125"
                : "border-[color:var(--color-foreground)]/40 bg-transparent hover:border-[color:var(--color-foreground)]"
            }`}
          />
        ))}
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-32">
        {/* Particle portrait — full-viewport-bleed. Particles fly across the
            entire width and pass behind the left-anchored text column. */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <ParticleHead />
        </div>

        <div className="relative z-10 grid w-full grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-6 lg:col-span-5 xl:col-span-4">
            <p className="reveal serif-italic-accent text-lg md:text-xl">
              AI &amp; Computer Vision Engineer — 3D perception, agentic systems, shipped products.
            </p>
            <h1
              className="reveal serif-display mt-8 text-[3.25rem] leading-[0.98] tracking-[-0.015em] md:mt-10 md:text-[5.5rem] lg:text-[6.25rem]"
              data-reveal-delay="80"
            >
              Somil <em>Singh</em>.
            </h1>
            <div
              className="reveal prose-editorial mt-10 max-w-[26rem] border-l border-[color:var(--color-border)] pl-6"
              data-reveal-delay="160"
            >
              NeRF, Gaussian splatting and SLAM/SfM research at IISc Bangalore&rsquo;s Visual AI &amp; Learning Lab.
              Full-Stack AI Engineer at Oracle Primavera Cloud, where my multi-agent LLM system autonomously triages
              150–200 bugs a week. Published in IJISRT. Solo winner of the Softway LoveXAI hackathon — built and
              defended an enterprise AI product in two hours.
            </div>

            <div className="reveal mt-10 flex flex-col gap-3" data-reveal-delay="240">
              <a
                href="mailto:somils@andrew.cmu.edu"
                className="inline-flex w-full items-center justify-center rounded-sm bg-[color:var(--color-primary)] px-6 py-4 eyebrow text-[color:var(--color-primary-foreground)] transition-all hover:opacity-90 sm:w-[360px]"
              >
                Get in touch
              </a>
              <a
                href="#work"
                className="inline-flex w-full items-center justify-center rounded-sm border border-[color:var(--color-foreground)]/40 px-6 py-4 eyebrow text-[color:var(--color-foreground)] transition-all hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)] sm:w-[360px]"
              >
                See the work
              </a>
            </div>

            <div className="reveal mt-10 flex items-center gap-8" data-reveal-delay="320">
              <a
                href="https://www.linkedin.com/in/somil-singh/"
                target="_blank"
                rel="noreferrer"
                className="eyebrow border-b border-[color:var(--color-foreground)]/40 pb-1 transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/somilsin"
                target="_blank"
                rel="noreferrer"
                className="eyebrow border-b border-[color:var(--color-foreground)]/40 pb-1 transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
              >
                GitHub
              </a>
              <a
                href="mailto:somils@andrew.cmu.edu"
                className="eyebrow border-b border-[color:var(--color-foreground)]/40 pb-1 transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
              >
                Email
              </a>
            </div>

            <p className="reveal mt-10 text-sm text-[color:var(--color-foreground)]/60" data-reveal-delay="400">
              Bangalore, India · +91 991 690 6693
            </p>
          </div>
          <div className="hidden md:col-span-6 md:block lg:col-span-7 xl:col-span-8" />
        </div>

        <div className="pointer-events-none absolute bottom-8 right-16 hidden items-center gap-4 md:flex">
          <span className="h-px w-16 bg-[color:var(--color-foreground)]/40" />
          <span className="eyebrow text-[color:var(--color-foreground)]/60">Scroll</span>
        </div>
      </section>

      {/* METRICS */}
      <section className="relative px-6 pt-24 md:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-8 border-t border-[color:var(--color-border)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <div key={m.value} className="reveal" data-reveal-delay={i * 90}>
              <p className="serif-display text-4xl text-[color:var(--color-primary)] md:text-5xl">{m.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-foreground)]/70">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider numeral="I" kicker="Where the work happens" index="01" />

      {/* EXPERIENCE */}
      <section id="experience" className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="reveal serif-display max-w-4xl text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            Research lab and <em className="text-[color:var(--color-primary)]">production</em>, at once.
          </h2>
          <p className="reveal prose-editorial mt-6 max-w-xl" data-reveal-delay="100">
            3D perception research at IISc VAL. Multi-agent LLM infrastructure running inside a global enterprise
            product at Oracle. Same engineer, both sides of the gap.
          </p>

          <div className="mt-16 space-y-14">
            {EXPERIENCE.map((c) => (
              <article
                key={c.name}
                className="reveal grid gap-8 border-t border-[color:var(--color-border)] pt-10 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="eyebrow text-[color:var(--color-foreground)]/60">{c.role}</p>
                  <p className="eyebrow mt-3 text-[color:var(--color-primary)]">{c.tag}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="serif-display text-3xl md:text-4xl">{c.name}</h3>
                  <ul className="mt-5 max-w-3xl space-y-3">
                    {c.points.map((p) => (
                      <li
                        key={p}
                        className="border-l border-[color:var(--color-border)] pl-5 text-[15px] leading-relaxed text-[color:var(--color-foreground)]/80"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={c.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block eyebrow text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
                  >
                    {c.link.label}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider numeral="II" kicker="Shipped and published" index="02" />

      {/* WORK */}
      <section id="work" className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="reveal serif-display max-w-4xl text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            The <em className="text-[color:var(--color-primary)]">work</em> itself.
          </h2>
          <p className="reveal prose-editorial mt-6 max-w-xl" data-reveal-delay="100">
            One peer-reviewed publication and an open GitHub — every claim below has code or a DOI behind it.
          </p>

          <div className="mt-16 space-y-0">
            {WORK.map((p) => (
              <article
                key={p.n}
                className="reveal grid gap-8 border-t border-[color:var(--color-border)] py-10 md:grid-cols-12"
              >
                <div className="md:col-span-2">
                  <span className="serif-display text-5xl text-[color:var(--color-primary)]">{p.n}</span>
                </div>
                <div className="md:col-span-7">
                  <h3 className="serif-display text-2xl md:text-3xl">{p.title}</h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[color:var(--color-foreground)]/80">
                    {p.body}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <p className="eyebrow text-[color:var(--color-foreground)]/60">{p.meta}</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block break-all eyebrow text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
                  >
                    {p.hrefLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider numeral="III" kicker="What I build with" index="03" />

      {/* STACK */}
      <section id="stack" className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="reveal serif-display max-w-4xl text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            The <em className="text-[color:var(--color-primary)]">stack</em>.
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {STACK.map((p, i) => (
              <div key={p.n} className="reveal border-t border-[color:var(--color-border)] pt-8" data-reveal-delay={i * 80}>
                <span className="serif-display text-5xl text-[color:var(--color-primary)]">{p.n}</span>
                <h3 className="serif-display mt-6 text-2xl">{p.title}</h3>
                <p className="prose-editorial mt-4">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider numeral="IV" kicker="Education & recognition" index="04" />

      {/* CREDENTIALS */}
      <section id="credentials" className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="reveal serif-display max-w-4xl text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            On <em className="text-[color:var(--color-primary)]">record</em>.
          </h2>

          <div className="mt-16 divide-y divide-[color:var(--color-border)]">
            {CREDENTIALS.map((c) => (
              <div key={c.title} className="reveal flex flex-wrap items-baseline justify-between gap-4 py-7">
                <h3 className="serif-display text-2xl md:text-3xl">{c.title}</h3>
                <p className="eyebrow text-[color:var(--color-foreground)]/60">{c.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider numeral="V" kicker="Receipts" index="05" />

      {/* SOURCES */}
      <section id="sources" className="relative px-6 py-24 md:px-12">
        <SourcesPanel />
      </section>

      <SectionDivider numeral="VI" kicker="Let's talk" index="06" />


      {/* CONTACT */}
      <section id="contact" className="relative px-6 py-32 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="reveal serif-display max-w-4xl text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            Open to <em className="text-[color:var(--color-primary)]">computer vision, robotics</em> and AI engineering roles.
          </h2>
          <p className="reveal prose-editorial mt-6 max-w-xl" data-reveal-delay="100">
            Building visual intelligence for embodied agents, or frontier LLM infrastructure. Either way — send a
            note.
          </p>

          <div className="reveal mt-12 flex flex-col gap-3 sm:max-w-md" data-reveal-delay="200">
            <a
              href="mailto:somils@andrew.cmu.edu"
              className="inline-flex items-center justify-center rounded-sm bg-[color:var(--color-primary)] px-6 py-4 eyebrow text-[color:var(--color-primary-foreground)] transition-opacity hover:opacity-90"
            >
              Email — somils@andrew.cmu.edu
            </a>
            <a
              href="https://www.linkedin.com/in/somil-singh/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-[color:var(--color-foreground)]/40 px-6 py-4 eyebrow transition-all hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            >
              Message on LinkedIn
            </a>
            <a
              href="https://github.com/somilsin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-[color:var(--color-foreground)]/40 px-6 py-4 eyebrow transition-all hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            >
              github.com/somilsin
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[color:var(--color-border)] px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
          <p className="eyebrow text-[color:var(--color-foreground)]/60">
            SOMIL SINGH · {new Date().getFullYear()}
          </p>
          <p className="eyebrow text-[color:var(--color-foreground)]/60">
            AI &amp; Computer Vision Engineer
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionDivider({ numeral, kicker, index }: { numeral: string; kicker: string; index: string }) {
  return (
    <div className="px-6 pt-24 md:px-12">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between border-t border-[color:var(--color-border)] pt-6">
        <p className="serif-display italic text-lg text-[color:var(--color-foreground)]/60">{numeral}</p>
        <p className="eyebrow text-[color:var(--color-foreground)]/60">
          <span className="serif-display text-base not-italic tracking-normal text-[color:var(--color-foreground)]">
            SOMIL
          </span>{" "}
          <span className="mx-3">{kicker}</span>
          <span className="text-[color:var(--color-primary)]">✶ {index}</span>
        </p>
      </div>
    </div>
  );
}
