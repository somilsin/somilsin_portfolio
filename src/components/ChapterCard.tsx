import { Link } from "@tanstack/react-router";
import type { Chapter } from "@/data/chapters";

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  const statusStyle =
    chapter.status === "open"
      ? { border: "1px solid var(--nebula-cyan)", color: "var(--nebula-cyan)" }
      : chapter.status === "archived"
      ? { border: "1px solid var(--nebula-violet)", color: "#c9b8ff" }
      : { border: "1px solid var(--rule)", color: "var(--mist)" };

  const statusText =
    chapter.status === "open"
      ? `LIVE — ${chapter.entry} OF ${chapter.total}`
      : chapter.status === "archived"
      ? `ARCHIVED — ${chapter.total}/${chapter.total}`
      : "QUEUED";

  return (
    <Link
      to="/chapter/$id"
      params={{ id: chapter.id }}
      data-cursor="hover"
      style={{
        position: "relative",
        flex: "0 0 320px",
        width: 320,
        height: 440,
        background: "linear-gradient(160deg, var(--panel), var(--stone))",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid var(--rule)",
        borderRadius: 6,
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-6px)";
        el.style.borderColor = "rgba(139,92,246,0.55)";
        el.style.boxShadow = "0 24px 80px rgba(139,92,246,0.25)";
        const num = el.querySelector<HTMLElement>("[data-roman]");
        if (num) num.style.opacity = "0.35";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--rule)";
        el.style.boxShadow = "none";
        const num = el.querySelector<HTMLElement>("[data-roman]");
        if (num) num.style.opacity = "0.18";
      }}
    >
      <span
        data-roman
        className="font-display"
        style={{
          position: "absolute",
          top: -28,
          right: 16,
          fontSize: 140,
          fontWeight: 300,
          backgroundImage: "linear-gradient(180deg, var(--nebula-cyan), var(--nebula-violet))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          opacity: 0.18,
          lineHeight: 1,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
        }}
      >
        {chapter.roman}
      </span>
      <div className="label-mono" style={{ color: "var(--mist)" }}>CHAPTER {chapter.roman}</div>
      <h3
        className="font-display"
        style={{ fontSize: 28, fontWeight: 400, color: "var(--cream)", marginTop: 16, lineHeight: 1.15 }}
      >
        {chapter.title}
      </h3>
      <div
        className="font-mono"
        style={{
          marginTop: 16,
          fontSize: 10,
          letterSpacing: "0.14em",
          padding: "6px 10px",
          alignSelf: "flex-start",
          borderRadius: 2,
          ...statusStyle,
        }}
      >
        {statusText}
      </div>
      <p style={{ marginTop: 20, color: "var(--mist)", fontSize: 14, lineHeight: 1.6, flex: 1 }}>
        {chapter.description}
      </p>
      <div className="label-mono" style={{ marginTop: 16, color: "var(--nebula-cyan)" }}>ENTER CHAPTER →</div>
    </Link>
  );
}
