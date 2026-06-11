import type { Entry } from "@/data/entries";

export function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article
      style={{
        background: "linear-gradient(160deg, var(--panel), var(--stone))",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid var(--rule)",
      }}
    >
      <div className="label-mono" style={{ color: "var(--nebula-cyan)" }}>
        ENTRY {String(entry.number).padStart(3, "0")} / {String(entry.total).padStart(3, "0")}
      </div>
      <p className="font-display" style={{ marginTop: 20, fontSize: 20, lineHeight: 1.4, color: "var(--cream)", fontWeight: 400 }}>
        &ldquo;{entry.fact}&rdquo;
      </p>
      <p style={{ marginTop: 16, fontSize: 13, color: "var(--mist)", lineHeight: 1.7, flex: 1 }}>
        {entry.expansion}
      </p>
      <div
        style={{
          height: 1,
          background: "linear-gradient(to right, transparent, var(--nebula-cyan), transparent)",
          marginTop: 24,
        }}
      />
    </article>
  );
}
