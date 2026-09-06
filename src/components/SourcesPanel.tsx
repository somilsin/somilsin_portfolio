import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ALL_TAGS,
  SOURCES,
  buildExportRows,
  evidenceUrl,
  fetchRepoFacts,
  rowsToCsv,
  tagsFor,
  type RepoFacts,
} from "@/lib/sources";

function fmt(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function download(filename: string, mime: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

type FetchState = "idle" | "loading" | "error" | "done";

export default function SourcesPanel() {
  const [facts, setFacts] = useState<Record<string, RepoFacts>>({});
  const [state, setState] = useState<FetchState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setState("loading");
    setError(null);
    try {
      const map = await fetchRepoFacts(ctrl.signal);
      if (ctrl.signal.aborted) return;
      setFacts(map);
      setCheckedAt(new Date().toLocaleTimeString("en-GB"));
      setAttempts(0);
      setState("done");
    } catch (e) {
      if (ctrl.signal.aborted) return;
      setError(e instanceof Error ? e.message : "Network request failed");
      setAttempts((n) => n + 1);
      setState("error");
    }
  }, []);

  useEffect(() => {
    void refresh();
    return () => abortRef.current?.abort();
  }, [refresh]);

  const toggleTag = (t: string) =>
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SOURCES.filter((s) => {
      const tags = tagsFor(s);
      if (activeTags.length && !activeTags.every((t) => tags.includes(t))) return false;
      if (!q) return true;
      return `${s.claim} ${s.section} ${s.repo ?? ""} ${s.external?.label ?? ""} ${s.cv.label} ${tags.join(" ")}`
        .toLowerCase()
        .includes(q);
    });
  }, [query, activeTags]);

  const exportRows = () => buildExportRows(typeof window !== "undefined" ? window.location.origin : "");

  const btn =
    "inline-flex items-center gap-3 rounded-sm border border-[color:var(--color-foreground)]/25 px-5 py-3 eyebrow transition-all hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)] disabled:opacity-50";

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="reveal serif-display max-w-4xl text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            Every claim, <em className="text-[color:var(--color-primary)]">sourced</em>.
          </h2>
          <p className="reveal prose-editorial mt-6 max-w-xl" data-reveal-delay="100">
            Each statement on this page maps to a public repository, a DOI, or the exact CV section it comes from.
            Repository facts below are fetched live from the GitHub API.
          </p>
        </div>

        <div className="reveal flex flex-col items-start gap-3" data-reveal-delay="160">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => void refresh()} disabled={state === "loading"} className={btn}>
              <span
                className={`h-2 w-2 rounded-full ${
                  state === "error" ? "bg-red-400" : "bg-[color:var(--color-primary)]"
                } ${state === "loading" ? "animate-ping" : ""}`}
              />
              {state === "loading" ? "Refreshing…" : state === "error" ? "Retry refresh" : "Refresh from GitHub"}
            </button>
            <button
              type="button"
              onClick={() => download("somil-verified-sources.json", "application/json", JSON.stringify(exportRows(), null, 2))}
              className={btn}
            >
              Export JSON
            </button>
            <button
              type="button"
              onClick={() => download("somil-verified-sources.csv", "text/csv", rowsToCsv(exportRows()))}
              className={btn}
            >
              Export CSV
            </button>
          </div>
          <p
            className={`eyebrow ${state === "error" ? "text-red-400" : "text-[color:var(--color-foreground)]/50"}`}
            role="status"
            aria-live="polite"
          >
            {state === "loading"
              ? "Contacting api.github.com…"
              : state === "error"
                ? `Failed (attempt ${attempts}) — ${error}. Claims below still show cached evidence links.`
                : checkedAt
                  ? `Verified ${checkedAt} · ${Object.keys(facts).length} repos`
                  : "Not yet verified"}
          </p>
        </div>
      </div>

      <div className="reveal mt-12 flex flex-wrap items-center gap-3" data-reveal-delay="120">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search claims, repos, CV sections…"
          aria-label="Search sources"
          className="w-full max-w-sm rounded-sm border border-[color:var(--color-border)] bg-transparent px-4 py-3 text-sm text-[color:var(--color-foreground)] outline-none transition-colors placeholder:text-[color:var(--color-foreground)]/40 focus:border-[color:var(--color-primary)]"
        />
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((t) => {
            const on = activeTags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                aria-pressed={on}
                className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  on
                    ? "border-[color:var(--color-primary)] text-[color:var(--color-primary)]"
                    : "border-[color:var(--color-border)] text-[color:var(--color-foreground)]/55 hover:text-[color:var(--color-foreground)]"
                }`}
              >
                {t}
              </button>
            );
          })}
          {(activeTags.length > 0 || query) && (
            <button
              type="button"
              onClick={() => {
                setActiveTags([]);
                setQuery("");
              }}
              className="rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-foreground)]/45 underline underline-offset-4"
            >
              clear
            </button>
          )}
        </div>
        <span className="eyebrow text-[color:var(--color-foreground)]/40">
          {filtered.length}/{SOURCES.length}
        </span>
      </div>

      <div className="mt-10 divide-y divide-[color:var(--color-border)] border-t border-[color:var(--color-border)]">
        {filtered.length === 0 && (
          <p className="py-10 text-sm text-[color:var(--color-foreground)]/55">No claims match that filter.</p>
        )}
        {filtered.map((s, i) => {
          const fact = s.repo ? facts[s.repo.toLowerCase()] : undefined;
          const href = evidenceUrl(s);
          return (
            <article key={s.claim} className="reveal grid gap-6 py-8 md:grid-cols-12" data-reveal-delay={Math.min(i, 6) * 60}>
              <div className="md:col-span-2">
                <p className="eyebrow text-[color:var(--color-foreground)]/60">{s.section}</p>
              </div>
              <div className="md:col-span-6">
                <p className="max-w-2xl text-[15px] leading-relaxed text-[color:var(--color-foreground)]/85">{s.claim}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tagsFor(s).map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-foreground)]/35">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4">
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="block break-all eyebrow text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
                  >
                    {s.repo
                      ? `${s.repoLabel ? `${s.repoLabel} — ` : ""}${s.repo}${s.repoPath ?? ""}`
                      : s.external?.label}{" "}
                    ↗
                  </a>
                )}
                {s.repo && (
                  <p className="mt-2 text-xs text-[color:var(--color-foreground)]/55">
                    {fact
                      ? `${fact.language ?? "—"} · ★ ${fact.stargazers_count} · last push ${fmt(fact.pushed_at)}`
                      : state === "loading"
                        ? "Fetching live repo facts…"
                        : state === "error"
                          ? "Live facts unavailable — retry above"
                          : "No live facts returned"}
                  </p>
                )}
                <a
                  href={s.cv.anchor}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block eyebrow text-[color:var(--color-foreground)]/60 underline underline-offset-4 transition-colors hover:text-[color:var(--color-foreground)]"
                >
                  {s.cv.label} ↗
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
