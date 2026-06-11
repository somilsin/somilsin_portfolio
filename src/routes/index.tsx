import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Music, Trophy, Sparkles } from "lucide-react";
import heroImage from "../assets/hero.jpg";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Somil Singh — Software Engineer & AI Enthusiast" },
      {
        name: "description",
        content:
          "I design fast, testable frontends and integration flows. Software Engineer at Oracle, AI enthusiast, footballer and guitarist.",
      },
      { property: "og:title", content: "Somil Singh — Personal Portfolio" },
      {
        property: "og:description",
        content: "Software Engineer · AI Enthusiast · Footballer · Guitarist",
      },
    ],
  }),
  component: Index,
});

const skills = [
  "Java", "JUnit / QUnit", "Preact", "Oracle JET",
  "Integration Testing", "OIC Integrations", "AI Foundations", "Cloud Concepts",
];

const highlights = [
  { icon: Sparkles, title: "Research", body: "Published a research paper during my final semester project." },
  { icon: Trophy, title: "Athlete", body: "State-level footballer & rated chess player (1340 international)." },
  { icon: Music, title: "Musician", body: "Guitarist; badminton enthusiast off the keyboard." },
];

function Index() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* HERO */}
      <section className="grain relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:grid-cols-12 md:pt-24">
          <div className="md:col-span-7">
            <Reveal>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Portfolio · 2026
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]">
                Somil <em className="italic text-accent">Singh.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Software engineer at Oracle building fast, testable frontends and
                integration flows. I turn complex systems into simple, elegant user
                experiences — with an obsession for AI, space, and clean code.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  View Projects
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-muted"
                >
                  Read Resume
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent/10 blur-2xl" />
              <img
                src={heroImage}
                alt="Editorial portrait composition"
                width={1280}
                height={1600}
                className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-xl sm:block">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Currently</p>
                <p className="text-sm">@ Oracle · C&E GBU</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* marquee */}
        <div className="border-y border-border bg-surface">
          <div className="mx-auto flex max-w-6xl items-center gap-10 overflow-hidden px-6 py-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {["Software Engineer", "·", "AI Enthusiast", "·", "State-Level Footballer", "·", "Chess 1340", "·", "Guitarist"].map((t, i) => (
              <span key={i} className="whitespace-nowrap">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">01 — About</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">A few words.</h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-8">
            <p className="text-lg leading-relaxed text-foreground/90">
              I'm a passionate software engineer with experience at Oracle, building
              frontend components and integration tests for the Construction &
              Engineering GBU. I love working on AI-driven features and crafting
              production-grade interfaces.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Off the keyboard, I play guitar, compete in football at the state level,
              and chase the next chess rating bump.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">02 — Toolbox</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Skills & tech.</h2>
          </Reveal>
          <ul className="mt-10 flex flex-wrap gap-3">
            {skills.map((s, i) => (
              <Reveal key={s} as="li" delay={i * 50}>
                <span className="inline-block rounded-full border border-border bg-card px-5 py-2.5 text-sm">
                  {s}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">03 — Beyond code</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">More about me.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 100}>
              <article className="group h-full rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <h.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-6 font-display text-2xl">{h.title}</h3>
                <p className="mt-3 text-muted-foreground">{h.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="rounded-[2rem] border border-border bg-foreground p-10 text-background md:p-16">
            <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">Let's talk</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">
              Have a project in mind?
            </h2>
            <p className="mt-5 max-w-xl opacity-80">
              I'm open to interesting work — from frontend components and integrations
              to AI-driven product ideas.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
