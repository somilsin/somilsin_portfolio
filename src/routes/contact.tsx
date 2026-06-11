import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Somil Singh" },
      { name: "description", content: "Get in touch with Somil Singh — email, LinkedIn, GitHub." },
      { property: "og:title", content: "Contact — Somil Singh" },
      { property: "og:description", content: "Let's build something together." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email", value: "somil@example.com", href: "mailto:somil@example.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/somil", href: "#" },
  { icon: Github, label: "GitHub", value: "github.com/somilsin", href: "https://github.com/somilsin" },
];

function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Say hello
            </p>
            <h1 className="mt-3 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92]">
              Let's <em className="italic text-accent">build</em> something.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              I'm open to interesting work, collaborations, and a good conversation about
              AI, space or football. Pick a channel and ping me — I reply within a day or two.
            </p>
          </Reveal>

          <Reveal delay={150} className="md:col-span-5">
            <ul className="space-y-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:bg-muted"
                  >
                    <span className="flex items-center gap-4">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-background">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                          {c.label}
                        </span>
                        <span className="block">{c.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:rotate-45 group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
