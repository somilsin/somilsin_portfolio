import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { chapters } from "@/lib/portfolio-data";
import { StarField } from "@/components/fx/StarField";
import { CursorRing } from "@/components/fx/CursorRing";
import { HudChrome } from "@/components/fx/HudChrome";
import { TiltCard } from "@/components/fx/TiltCard";
import { GlitchText } from "@/components/fx/GlitchText";
import { ClientOnly } from "@/components/fx/ClientOnly";

export const Route = createFileRoute("/chapter/$slug")({
  loader: ({ params }) => {
    const chapter = chapters.find((c) => c.slug === params.slug);
    if (!chapter) throw notFound();
    return { chapter };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Chapter not found" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.chapter;
    return {
      meta: [
        { title: `${c.subtitle}: ${c.title} — Somil Singh` },
        { name: "description", content: c.blurb },
        { property: "og:title", content: `${c.subtitle}: ${c.title}` },
        { property: "og:description", content: c.blurb },
      ],
    };
  },
  component: ChapterPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center hud-text text-[color:var(--color-neon)]">
      SIGNAL LOST · Chapter not found
    </div>
  ),
});

function ChapterPage() {
  const { chapter } = Route.useLoaderData();
  const idx = chapters.findIndex((c) => c.slug === chapter.slug);
  const next = chapters[(idx + 1) % chapters.length];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ClientOnly>
        <StarField />
        <CursorRing />
      </ClientOnly>
      <HudChrome />

      <section className="relative px-6 pt-40 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="hud-text inline-flex items-center gap-2 text-[color:var(--color-cyan-soft)] transition-colors hover:text-[color:var(--color-neon)]"
          >
            ← Back to trajectory
          </Link>

          <div className="mt-10 flex items-end justify-between gap-6 border-b border-[color:var(--color-border)] pb-10">
            <div>
              <p className="hud-text text-[color:var(--color-neon)]">
                <GlitchText text={`${chapter.subtitle} · ${chapter.status}`} />
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight md:text-7xl">
                {chapter.title}
              </h1>
            </div>
            <span className="hidden font-[family-name:var(--font-display)] text-[10rem] font-bold leading-none text-[color:var(--color-neon)] drop-shadow-[0_0_40px_var(--color-neon)] md:block">
              {chapter.numeral}
            </span>
          </div>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-[color:var(--color-muted-foreground)]">
            {chapter.blurb}
          </p>
        </div>
      </section>

      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-6">
          {chapter.entries.map((e: { title: string; meta: string; body: string }, i: number) => (
            <TiltCard key={i} className="p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="hud-text mb-2 text-[color:var(--color-neon)]">
                    ENTRY {String(i + 1).padStart(3, "0")} / {String(chapter.entries.length).padStart(3, "0")}
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                    {e.title}
                  </h3>
                </div>
                {e.meta ? (
                  <span className="hud-text text-[color:var(--color-cyan-soft)]">{e.meta}</span>
                ) : null}
              </div>
              {e.body ? (
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                  {e.body}
                </p>
              ) : null}
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between border-t border-[color:var(--color-border)] pt-10">
          <Link to="/" className="hud-text text-[color:var(--color-cyan-soft)] hover:text-[color:var(--color-neon)]">
            ← All chapters
          </Link>
          <Link
            to="/chapter/$slug"
            params={{ slug: next.slug }}
            className="hud-text text-[color:var(--color-neon)] hover:text-[color:var(--color-magenta)]"
          >
            Next → {next.subtitle}: {next.title}
          </Link>
        </div>
      </section>
    </div>
  );
}