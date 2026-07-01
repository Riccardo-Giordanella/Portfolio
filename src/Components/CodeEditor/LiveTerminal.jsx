import { useEffect, useRef, useState } from "react";
import { TERMINAL_STEPS, PROFILE } from "../../assets/editor_data";
import useTypewriter from "../../hooks/useTypewriter";

// The "Go Live" overlay: types a scenographic `npm run dev` / `build` log, then
// reveals a profile card built entirely from portfolio data. "Enter site →"
// closes the whole IDE and returns to the live portfolio.
export default function LiveTerminal({ onClose, onEnterSite }) {
  const [phase, setPhase] = useState("terminal"); // "terminal" | "preview"
  const termRef = useRef(null);
  const panelRef = useRef(null);

  const { lines } = useTypewriter(TERMINAL_STEPS, true, () => setPhase("preview"));

  // Keep the terminal scrolled to the newest line while typing.
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  // Focus the panel on mount for keyboard users.
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  const initials = PROFILE.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="live-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="live-panel"
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Live Server"
      >
        <div className="live-topbar">
          <span>{phase === "terminal" ? "Terminal — npm run dev" : "Preview — localhost:5173"}</span>
          <button className="live-close" onClick={onClose} aria-label="Close terminal">
            ✕
          </button>
        </div>

        {phase === "terminal" && (
          <div className="live-term" ref={termRef}>
            {lines.map((ln, i) => (
              <div key={i}>
                <span className="t-time">[{ln.time || "dev"}] </span>
                <span className={ln.cls}>{ln.pre}</span>
                <span className={ln.cls}>{ln.text}</span>
                {i === lines.length - 1 && <span className="live-cursor" />}
              </div>
            ))}
          </div>
        )}

        {phase === "preview" && (
          <div className="live-preview">
            <div className="live-toolbar">
              <span className="live-url">🔒 localhost:5173 / riccardo-portfolio</span>
              <button className="live-enter" onClick={onEnterSite}>
                Enter site <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="live-scroll">
              <div className="profile-card">
                <div className="profile-head">
                  <div className="profile-avatar">{initials}</div>
                  <div>
                    <h3>{PROFILE.name}</h3>
                    <p className="profile-role">{PROFILE.role}</p>
                    <p className="profile-loc">📍 {PROFILE.location}</p>
                  </div>
                </div>
                <p className="profile-tagline">{PROFILE.tagline}</p>
                <div className="profile-stack">
                  {PROFILE.stack.map((s) => (
                    <span key={s} className="profile-chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="profile-links">
                  {PROFILE.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
                <button className="profile-cta" onClick={onEnterSite}>
                  Enter the full portfolio <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
