import { chapters } from "@/data/chapters";
import { ChapterCard } from "./ChapterCard";
import { Reveal } from "./Reveal";

export function ChaptersGallery() {
  return (
    <section style={{ padding: "120px 24px 80px", background: "var(--ink)", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div className="label-mono" style={{ color: "var(--mist)" }}>THE CHAPTERS</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: 48, fontStyle: "italic", margin: "16px 0 0", fontWeight: 400 }}>
            <span style={{ color: "var(--cream)" }}>Six chapters.</span>{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(120deg, var(--nebula-cyan), var(--nebula-magenta))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              One trajectory.
            </span>
          </h2>
        </Reveal>

        <div
          className="chapters-scroll"
          style={{
            marginTop: 56,
            display: "flex",
            gap: 24,
            overflowX: "auto",
            paddingBottom: 24,
            scrollSnapType: "x mandatory",
          }}
        >
          {chapters.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.08}>
              <div style={{ scrollSnapAlign: "start" }}>
                <ChapterCard chapter={w} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px){.chapters-scroll{flex-direction:column;overflow-x:visible;}}`}</style>
    </section>
  );
}
