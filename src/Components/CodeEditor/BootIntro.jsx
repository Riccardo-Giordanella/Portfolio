import { useEffect, useRef, useState } from "react";
import { FILES, BOOT_BUILD_STEPS } from "../../assets/editor_data";
import { prefersReducedMotion } from "../../hooks/useTypewriter";
import "./CodeEditor.css";

const ICON_LABEL = { md: "M↓", js: "JS", json: "{}", ts: "TS" };
const pathOf = (f) => f.crumb.join("/");

function FileBadge({ icon }) {
  return <span className={`ide-badge ide-badge--${icon}`}>{ICON_LABEL[icon] || "•"}</span>;
}

// First-load cinematic: the portfolio is "built" live inside an editor — files
// are touched in the terminal, their code is typed in, then `npm run build`
// runs and a CTA reveals the finished portfolio. Fully scripted + cancellable.
export default function BootIntro({ onEnter }) {
  const [created, setCreated] = useState([]); // file names created so far
  const [activeFile, setActiveFile] = useState(null); // currently-typed file
  const [typedLines, setTypedLines] = useState(0); // lines revealed in active file
  const [term, setTerm] = useState([]); // terminal output lines
  const [phase, setPhase] = useState("scaffold"); // scaffold | build | ready

  const termRef = useRef(null);
  const codeRef = useRef(null);

  // Keep terminal and editor scrolled to the newest content.
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [term]);
  useEffect(() => {
    if (codeRef.current) codeRef.current.scrollTop = codeRef.current.scrollHeight;
  }, [typedLines, activeFile]);

  useEffect(() => {
    // Local cancellation token: each effect run owns its own flag so a
    // StrictMode remount can't revive a previous run's async loop.
    let cancelled = false;
    const isCancelled = () => cancelled;

    document.documentElement.classList.add("ide-open");
    runSequence(isCancelled);

    return () => {
      cancelled = true;
      document.documentElement.classList.remove("ide-open");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const rnd = (a, b) => a + Math.random() * (b - a);

  // Append a terminal line and reveal its text char by char.
  async function typeLine({ cls = "t-dim", pre = "", text }, reduced, isCancelled) {
    if (isCancelled()) return;
    setTerm((t) => [...t, { cls, pre, text: reduced ? text : "" }]);
    if (reduced) return;
    for (let i = 1; i <= text.length; i++) {
      if (isCancelled()) return;
      const visible = text.slice(0, i);
      setTerm((t) => {
        const copy = t.slice();
        copy[copy.length - 1] = { cls, pre, text: visible };
        return copy;
      });
      await sleep(rnd(10, 24));
    }
  }

  async function runSequence(isCancelled) {
    const reduced = prefersReducedMotion();

    // Fresh start — clears any partial state left by a StrictMode double-invoke
    // (a cancelled first run may have committed a few characters).
    setTerm([]);
    setCreated([]);
    setActiveFile(null);
    setTypedLines(0);
    setPhase("scaffold");

    // 1) Scaffold each file: touch it, then type its contents.
    for (const f of FILES) {
      if (isCancelled()) return;
      await typeLine({ cls: "t-cmd", pre: "$ ", text: `touch ${pathOf(f)}` }, reduced, isCancelled);
      await sleep(reduced ? 0 : 160);

      setCreated((c) => (c.includes(f.name) ? c : [...c, f.name]));
      setActiveFile(f.name);
      setTypedLines(reduced ? f.lines.length : 0);

      if (!reduced) {
        for (let n = 1; n <= f.lines.length; n++) {
          if (isCancelled()) return;
          setTypedLines(n);
          await sleep(rnd(38, 70));
        }
      }
      await sleep(reduced ? 0 : 260);
    }

    // 2) Build phase.
    if (isCancelled()) return;
    setPhase("build");
    await sleep(reduced ? 0 : 350);
    for (const step of BOOT_BUILD_STEPS) {
      if (isCancelled()) return;
      await typeLine(step, reduced, isCancelled);
      await sleep(reduced ? 0 : step.d);
    }

    // 3) Ready — show the CTA.
    if (isCancelled()) return;
    setPhase("ready");
  }

  const file = FILES.find((f) => f.name === activeFile);

  return (
    <div className="ide ide--boot" role="dialog" aria-modal="true" aria-label="Building the portfolio">
      {/* Title bar */}
      <div className="ide-titlebar">
        <div className="ide-dots" aria-hidden="true">
          <span className="ide-dot ide-dot--r" />
          <span className="ide-dot ide-dot--y" />
          <span className="ide-dot ide-dot--g" />
        </div>
        <div className="ide-title-center">riccardo-giordanella — portfolio</div>
        <button className="ide-exit" onClick={onEnter}>
          <span>Skip intro</span>
          <span aria-hidden="true">⏭</span>
        </button>
      </div>

      <div className="ide-body">
        {/* Activity bar */}
        <div className="ide-activity" aria-hidden="true">
          <span className="ide-ico active">
            <svg viewBox="0 0 24 24">
              <path d="M4 4h6l2 2h8v12H4z" />
            </svg>
          </span>
        </div>

        {/* Sidebar — files appear as they're touched */}
        <div className="ide-sidebar">
          <div className="ide-explorer-title">Explorer</div>
          <div className="ide-folder">PORTFOLIO</div>
          {created.map((name) => {
            const f = FILES.find((x) => x.name === name);
            return (
              <div
                key={name}
                className={`ide-file boot-file-in ${name === activeFile ? "active" : ""}`}
              >
                <FileBadge icon={f.icon} />
                {name}
              </div>
            );
          })}
          {created.length === 0 && (
            <div className="boot-sidebar-empty">initializing…</div>
          )}
        </div>

        {/* Editor + integrated terminal */}
        <div className="ide-editor">
          <div className="ide-tabs" aria-hidden="true">
            {created.map((name) => {
              const f = FILES.find((x) => x.name === name);
              return (
                <div key={name} className={`ide-tab ${name === activeFile ? "active" : ""}`}>
                  <FileBadge icon={f.icon} />
                  {name}
                </div>
              );
            })}
          </div>

          {file && (
            <div className="ide-breadcrumb" aria-hidden="true">
              <span>portfolio</span>
              {file.crumb.map((c, i) => (
                <span key={i}>
                  <span className="ide-sep">›</span>
                  <span>{c}</span>
                </span>
              ))}
            </div>
          )}

          <div className="ide-code-area boot-code-area" ref={codeRef}>
            {file && (
              <div className="ide-code">
                {file.lines.slice(0, typedLines).map((tokens, i) => (
                  <div className="ide-line" key={i}>
                    <span className="ide-ln">{i + 1}</span>
                    <span className="ide-lc">
                      {tokens.length === 0
                        ? " "
                        : tokens.map((tk, j) => (
                            <span key={j} className={tk.c}>
                              {tk.t}
                            </span>
                          ))}
                      {i === typedLines - 1 && phase === "scaffold" && (
                        <span className="boot-caret" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Integrated terminal */}
          <div className="boot-term-panel">
            <div className="boot-term-tabs">
              <span className="boot-term-tab active">TERMINAL</span>
              <span className="boot-term-tab">PROBLEMS</span>
              <span className="boot-term-tab">OUTPUT</span>
            </div>
            <div className="live-term boot-term" ref={termRef}>
              {term.map((ln, i) => (
                <div key={i}>
                  <span className={ln.cls}>{ln.pre}</span>
                  <span className={ln.cls}>{ln.text}</span>
                  {i === term.length - 1 && phase !== "ready" && (
                    <span className="live-cursor" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="ide-statusbar">
        <span>⎇ main</span>
        <span>{phase === "build" ? "building…" : phase === "ready" ? "ready" : "writing…"}</span>
        <div className="ide-status-right">
          <span>{created.length}/{FILES.length} files</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* Ready CTA */}
      {phase === "ready" && (
        <div className="boot-cta-wrap">
          <div className="boot-cta-card">
            <div className="boot-cta-check" aria-hidden="true">✓</div>
            <h2>Build complete</h2>
            <p>Your portfolio compiled successfully and is ready to explore.</p>
            <button className="boot-cta-btn" onClick={onEnter} autoFocus>
              Enter the portfolio <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
