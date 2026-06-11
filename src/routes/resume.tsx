import { createFileRoute } from "@tanstack/react-router";
import { Printer, Mail, Github, Linkedin } from "lucide-react";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Somil Singh" },
      {
        name: "description",
        content:
          "Resume of Somil Singh — Software Engineer at Oracle. Experience, skills, education and research.",
      },
      { property: "og:title", content: "Resume — Somil Singh" },
      { property: "og:description", content: "Experience, skills and research." },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Curriculum Vitae
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95]">
              Resume.
            </h1>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:bg-muted print:hidden"
            >
              <Printer className="h-4 w-4" />
              Print / PDF
            </button>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          {/* Sidebar */}
          <Reveal className="md:col-span-4">
            <aside className="rounded-3xl border border-border bg-card p-8">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-foreground font-display text-3xl text-background">
                S
              </div>
              <h2 className="mt-5 font-display text-2xl">Somil Singh</h2>
              <p className="text-sm text-muted-foreground">Software Engineer</p>

              <div className="mt-8 space-y-4 text-sm">
                <a href="mailto:somil@example.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" /> somil@example.com
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-4 w-4" /> linkedin.com/in/somil
                </a>
                <a href="https://github.com/somilsin" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Github className="h-4 w-4" /> github.com/somilsin
                </a>
              </div>

              <div className="mt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Core Skills
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {["Java", "JUnit", "Preact", "Oracle JET", "Integration Testing", "OIC", "AI"].map((s) => (
                    <li key={s} className="rounded-full border border-border px-3 py-1 text-xs">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Interests
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Football (State-level), Chess (1340), Guitar, Space.
                </p>
              </div>
            </aside>
          </Reveal>

          {/* Main */}
          <div className="md:col-span-8">
            <Section title="Experience" index="01">
              <Entry
                role="Associate Software Developer"
                org="Oracle — Construction & Engineering GBU"
                time="2024 — Present"
                body="Frontend components and cloud integrations. Focused on testable components, accessibility and maintainability. Owned reusable JET components and contributed to OIC integration flows."
              />
              <Entry
                role="Software Engineering Intern"
                org="Oracle (6 months)"
                time="2023 — 2024"
                body="Built component features, wrote integration tests and contributed to automation for developer workflows."
              />
            </Section>

            <Section title="Education" index="02">
              <Entry
                role="B.Tech, Computer Science"
                org="Final-semester research project — published paper"
                time="—"
                body="Coursework in systems, algorithms and AI foundations. Published a final-semester research paper on applied integrations."
              />
            </Section>

            <Section title="Beyond Work" index="03">
              <Entry
                role="State-Level Footballer"
                org="Tournament experience"
                time="Ongoing"
                body="Multiple state-level tournaments; team captain and midfielder."
              />
              <Entry
                role="Chess · Guitar · Badminton"
                org="Personal pursuits"
                time=""
                body="Internationally-rated chess player (1340). Performing guitarist. Casual badminton player."
              />
            </Section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Section({ title, index, children }: { title: string; index: string; children: React.ReactNode }) {
  return (
    <Reveal className="mb-14">
      <div className="mb-6 flex items-baseline gap-4 border-b border-border pb-3">
        <span className="font-mono text-xs text-muted-foreground">{index}</span>
        <h3 className="font-display text-3xl">{title}</h3>
      </div>
      <div className="space-y-8">{children}</div>
    </Reveal>
  );
}

function Entry({ role, org, time, body }: { role: string; org: string; time: string; body: string }) {
  return (
    <article className="grid gap-1 md:grid-cols-[1fr_auto]">
      <div>
        <h4 className="font-display text-xl">{role}</h4>
        <p className="text-sm text-accent">{org}</p>
        <p className="mt-3 text-muted-foreground">{body}</p>
      </div>
      {time && <p className="font-mono text-xs text-muted-foreground md:text-right">{time}</p>}
    </article>
  );
}
