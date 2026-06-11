import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { chapters } from "@/data/chapters";
import { entries } from "@/data/entries";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Nebula } from "@/components/Nebula";

function loader({ params }: { params: { id: string } }) {
  const chapter = chapters.find((w) => w.id === params.id);
  if (!chapter) throw notFound();
  const chapterEntries = entries.filter((e) => e.chapterId === chapter.id);
  return { chapter, chapterEntries };
}

function ErrorBoundary({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cream)" }}>
      <div style={{ textAlign: "center" }}>
        <div className="label-mono" style={{ color: "var(--nebula-cyan)" }}>SIGNAL LOST</div>
        <button onClick={reset} className="label-mono" style={{ marginTop: 16, color: "var(--cream)" }}>Reconnect</button>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
      <div className="label-mono" style={{ color: "var(--danger)" }}>CHAPTER NOT FOUND</div>
      <h1 className="font-display" style={{ fontSize: 48, margin: "16px 0", color: "var(--cream)" }}>This chapter is out of range.</h1>
      <Link to="/" className="label-mono" style={{ color: "var(--nebula-cyan)" }}>← RETURN TO BASE</Link>
    </div>
  );
}

export const Route = createFileRoute("/chapter/$id")({
  loader,
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Chapter ${loaderData.chapter.roman} — ${loaderData.chapter.title} · Somil Singh` : "Somil Singh" },
      { name: "description", content: loaderData?.chapter.description ?? "A chapter from Somil Singh's portfolio." },
      { property: "og:title", content: loaderData ? `Chapter ${loaderData.chapter.roman} — ${loaderData.chapter.title}` : "Somil Singh" },
      { property: "og:description", content: loaderData?.chapter.description ?? "" },
    ],
  }),
  component: ChapterPage,
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});

function ChapterPage() {
  const { chapter, chapterEntries } = Route.useLoaderData();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <header style={{ padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--rule)" }}>
        <Link to="/" className="label-mono" data-cursor="hover" style={{ color: "var(--nebula-cyan)" }}>
          ← SOMIL · SINGH
        </Link>
        <span className="label-mono" style={{ color: "var(--mist)" }}>CHAPTER {chapter.roman}</span>
      </header>

      <section style={{ position: "relative", padding: "120px 24px 80px", overflow: "hidden", minHeight: "60vh" }}>
        <Nebula />
        <span
          aria-hidden
          className="font-display"
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "30vw",
            backgroundImage: "linear-gradient(180deg, var(--nebula-cyan), var(--nebula-violet))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            opacity: 0.12,
            lineHeight: 1,
            fontWeight: 300,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          {chapter.roman}
        </span>
        <div style={{ position: "relative", maxWidth: 980, margin: "0 auto", textAlign: "center", zIndex: 1 }}>
          <Reveal>
            <div className="label-mono" style={{ color: "var(--mist)" }}>CHAPTER {chapter.roman}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display nebula-glow" style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--cream)", margin: "20px 0" }}>
              {chapter.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div
              className="font-mono"
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "8px 14px",
                fontSize: 10,
                letterSpacing: "0.18em",
                border: `1px solid ${chapter.status === "open" ? "var(--nebula-cyan)" : chapter.status === "archived" ? "var(--nebula-violet)" : "var(--rule)"}`,
                color: chapter.status === "open" ? "var(--nebula-cyan)" : chapter.status === "archived" ? "#c9b8ff" : "var(--mist)",
              }}
            >
              {chapter.status === "open"
                ? `LIVE — ${chapter.entry} OF ${chapter.total}`
                : chapter.status === "archived"
                ? `ARCHIVED — ${chapter.total}/${chapter.total}`
                : "QUEUED"}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ marginTop: 32, color: "var(--mist)", fontSize: 16, lineHeight: 1.7, maxWidth: 640, margin: "32px auto 0" }}>
              {chapter.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {chapterEntries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid var(--rule)" }}>
              <div className="label-mono" style={{ color: "var(--danger)" }}>QUEUED</div>
              <p className="font-display" style={{ fontSize: 28, fontStyle: "italic", color: "var(--cream)", marginTop: 20 }}>
                This chapter is being authored.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 1, background: "var(--rule)" }}>
              {chapterEntries.map((e) => {
                const isOpen = open === e.number;
                return (
                  <button
                    key={e.number}
                    data-cursor="hover"
                    onClick={() => setOpen(isOpen ? null : e.number)}
                    style={{
                      background: "var(--panel)",
                      textAlign: "left",
                      padding: "32px 28px",
                      border: "none",
                      color: "inherit",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <div style={{ display: "flex", gap: 24, alignItems: "baseline", flexWrap: "wrap" }}>
                      <div className="label-mono" style={{ color: "var(--nebula-cyan)", flex: "0 0 auto" }}>
                        ENTRY {String(e.number).padStart(3, "0")} / {String(e.total).padStart(3, "0")}
                      </div>
                      <p className="font-display" style={{ fontSize: 22, lineHeight: 1.45, color: "var(--cream)", margin: 0, flex: 1, minWidth: 240 }}>
                        &ldquo;{e.fact}&rdquo;
                      </p>
                      <span className="label-mono" style={{ color: "var(--mist)" }}>{isOpen ? "—" : "+"}</span>
                    </div>
                    {isOpen && (
                      <p style={{ marginTop: 20, color: "var(--mist)", fontSize: 14, lineHeight: 1.7, maxWidth: 800 }}>
                        {e.expansion}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
