import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { Reveal } from "../components/Reveal";
import p1 from "../assets/project-1.jpg";
import p2 from "../assets/project-2.jpg";
import p3 from "../assets/project-3.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Somil Singh" },
      {
        name: "description",
        content:
          "A selection of work by Somil Singh — components, integrations, and research across Oracle JET, QUnit, JUnit and AI.",
      },
      { property: "og:title", content: "Projects — Somil Singh" },
      { property: "og:description", content: "Components, integrations, and research." },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    img: p1,
    tag: "Testing · CI",
    title: "Integration Testing Suite",
    body:
      "Comprehensive QUnit & JUnit driven tests for component reliability and CI pipelines at Oracle.",
    stack: ["QUnit", "JUnit", "CI/CD"],
  },
  {
    img: p2,
    tag: "Component Library",
    title: "Oracle JET — GBU Components",
    body:
      "Reusable Construction & Engineering components with hierarchical checklist logic and accessibility-first design.",
    stack: ["Preact", "Oracle JET", "A11y"],
  },
  {
    img: p3,
    tag: "Research",
    title: "AI Foundations Paper",
    body:
      "Final semester research paper exploring AI foundations and applied integrations — mentored and published.",
    stack: ["AI", "Research", "Python"],
  },
];

function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Selected work
          </p>
          <h1 className="mt-3 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95]">
            Projects.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Components, integrations and research — a window into what I've shipped and
            what I'm exploring next.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <article
                className={`group h-full overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      i === 0 ? "aspect-[21/9]" : "aspect-[3/2]"
                    }`}
                  />
                </div>
                <div className="p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                    {p.tag}
                  </p>
                  <h2 className="mt-3 font-display text-3xl md:text-4xl">{p.title}</h2>
                  <p className="mt-4 text-muted-foreground">{p.body}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <button className="inline-flex items-center gap-1.5 text-sm font-medium link-underline">
                      Case study
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
