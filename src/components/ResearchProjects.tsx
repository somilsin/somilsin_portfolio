import { Reveal } from "./Reveal";

interface Project {
  title: string;
  tag: string;
  description: string;
  link?: string;
  accent: string;
}

const projects: Project[] = [
  {
    title: "Object Classification & Tracking",
    tag: "Computer Vision / Published Research",
    description:
      "Published paper on an advanced computer vision system for object detection, classification, and tracking utilizing the YOLOv4 algorithm.",
    link: "https://www.ijisrt.com/object-detection-classification-and-tracking-of-everyday-common-objects",
    accent: "var(--nebula-cyan)",
  },
  {
    title: "Novel View Synthesis with NeRF",
    tag: "3D Computer Vision / IISc Bangalore",
    description:
      "AI Research Internship project focusing on Neural Radiance Fields (NeRF) to generate complex 3D scenes from 2D images.",
    accent: "var(--nebula-violet)",
  },
  {
    title: "Autonomous Deep Space Navigation",
    tag: "Agentic AI / Robotics",
    description:
      "Developing algorithms and AI systems for autonomous navigation and planetary exploration, alongside satellite payload circuit design.",
    accent: "var(--nebula-magenta)",
  },
  {
    title: "Enterprise RAG Pipelines & JET Components",
    tag: "Full-Stack AI / Oracle",
    description:
      "Building robust Retrieval-Augmented Generation (RAG) pipelines and frontend Oracle JET components for enterprise applications.",
    accent: "var(--nebula-cyan)",
  },
  {
    title: "Quantitative Finance & Algorithmic Trading",
    tag: "Machine Learning / Finance",
    description:
      "Developing algorithmic trading strategies and quantitative analysis models for Indian market indices (Nifty 50 and Sensex).",
    accent: "var(--nebula-violet)",
  },
];

export function ResearchProjects() {
  return (
    <section id="research" style={{ padding: "140px 24px", background: "var(--ink)", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div className="label-mono" style={{ color: "var(--mist)" }}>
            RESEARCH &amp; PROJECTS — AI / ML / 3D VISION
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="font-display"
            style={{ fontSize: 52, fontStyle: "italic", margin: "16px 0 12px", fontWeight: 400, lineHeight: 1.1 }}
          >
            <span style={{ color: "var(--cream)" }}>Where models</span>{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(120deg, var(--nebula-cyan), var(--nebula-magenta))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              meet the world.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ color: "var(--mist)", maxWidth: 640, fontSize: 15, lineHeight: 1.7 }}>
            A selection of published research, internship work, and applied AI systems — from neural radiance fields and
            agentic navigation to enterprise RAG and quantitative trading.
          </p>
        </Reveal>

        <div
          style={{
            marginTop: 64,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <article
      className="research-card"
      style={{
        position: "relative",
        height: "100%",
        padding: "28px 28px 32px",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        overflow: "hidden",
        transition: "transform .5s cubic-bezier(.16,1,.3,1), border-color .4s, box-shadow .5s",
      }}
    >
      <div
        aria-hidden
        className="research-glow"
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 18,
          background: `radial-gradient(600px circle at 0% 0%, ${project.accent}22, transparent 40%)`,
          opacity: 0,
          transition: "opacity .5s",
          pointerEvents: "none",
        }}
      />
      <div className="label-mono" style={{ color: project.accent, fontSize: 11 }}>
        {project.tag}
      </div>
      <h3
        className="font-display"
        style={{
          margin: "18px 0 14px",
          fontSize: 26,
          fontWeight: 400,
          lineHeight: 1.2,
          color: "var(--cream)",
        }}
      >
        {project.title}
      </h3>
      <p style={{ color: "var(--mist)", fontSize: 14.5, lineHeight: 1.65 }}>{project.description}</p>
      {project.link && (
        <div className="label-mono" style={{ marginTop: 24, color: project.accent, fontSize: 11 }}>
          READ PAPER ↗
        </div>
      )}
      <style>{`
        .research-card:hover { transform: translateY(-4px); border-color: ${project.accent}55; box-shadow: 0 30px 60px -30px ${project.accent}33; }
        .research-card:hover .research-glow { opacity: 1; }
      `}</style>
    </article>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noreferrer" style={{ display: "block", height: "100%", textDecoration: "none" }}>
      {inner}
    </a>
  ) : (
    inner
  );
}
