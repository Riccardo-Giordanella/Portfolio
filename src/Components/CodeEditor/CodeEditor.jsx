import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { FILES, FILES_BY_NAME } from "../../assets/editor_data";
import "./CodeEditor.css";

const LiveTerminal = lazy(() => import("./LiveTerminal"));

// Short colored badge shown next to a filename (echoes VS Code's file icons).
const ICON_LABEL = { md: "M↓", js: "JS", json: "{}", ts: "TS" };

function FileBadge({ icon }) {
  return <span className={`ide-badge ide-badge--${icon}`}>{ICON_LABEL[icon] || "•"}</span>;
}

function CodePane({ file }) {
  // `key` on the wrapper restarts the fade-in animation on file switch.
  return (
    <div className="ide-code" key={file.name} role="tabpanel" aria-label={file.name}>
      {file.lines.map((tokens, i) => (
        <div className="ide-line" key={i}>
          <span className="ide-ln">{i + 1}</span>
          <span className="ide-lc">
            {tokens.length === 0
              ? " "
              : tokens.map((tk, j) => (
                  <span key={j} className={tk.c}>
                    {tk.t}
                  </span>
                ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CodeEditor({ onClose }) {
  const [activeFile, setActiveFile] = useState(FILES[0].name);
  const [liveOpen, setLiveOpen] = useState(false);
  const rootRef = useRef(null);
  const file = FILES_BY_NAME[activeFile];

  // Esc: close the terminal first if it's open, otherwise exit the IDE.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (liveOpen) setLiveOpen(false);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [liveOpen, onClose]);

  // Lock the underlying page scroll and move focus into the dialog.
  useEffect(() => {
    document.documentElement.classList.add("ide-open");
    rootRef.current?.focus();
    return () => document.documentElement.classList.remove("ide-open");
  }, []);

  return (
    <div
      className="ide"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio source — editor view"
      ref={rootRef}
      tabIndex={-1}
    >
      {/* Title bar */}
      <div className="ide-titlebar">
        <div className="ide-dots" aria-hidden="true">
          <button
            className="ide-dot ide-dot--r"
            onClick={onClose}
            aria-label="Close editor"
            title="Close editor"
          />
          <span className="ide-dot ide-dot--y" />
          <span className="ide-dot ide-dot--g" />
        </div>
        <div className="ide-title-center">riccardo-giordanella — portfolio</div>
        <button className="ide-exit" onClick={onClose}>
          <span>Esc to exit</span>
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      {/* Body */}
      <div className="ide-body">
        {/* Activity bar */}
        <div className="ide-activity" aria-hidden="true">
          <span className="ide-ico active">
            <svg viewBox="0 0 24 24">
              <path d="M4 4h6l2 2h8v12H4z" />
            </svg>
          </span>
          <span className="ide-ico">
            <svg viewBox="0 0 24 24">
              <path d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 10-.7.7l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
            </svg>
          </span>
          <span className="ide-ico">
            <svg viewBox="0 0 24 24">
              <path d="M13 2v3h-2V2H4v7h3v2H4v7h7v-3h2v3h7v-7h-3v-2h3V2z" />
            </svg>
          </span>
        </div>

        {/* Sidebar / explorer */}
        <div className="ide-sidebar">
          <div className="ide-explorer-title">Explorer</div>
          <div className="ide-folder">PORTFOLIO</div>
          {FILES.map((f) => (
            <button
              key={f.name}
              className={`ide-file ${f.name === activeFile ? "active" : ""}`}
              onClick={() => setActiveFile(f.name)}
            >
              <FileBadge icon={f.icon} />
              {f.name}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="ide-editor">
          <div className="ide-tabs" role="tablist" aria-label="Open files">
            {FILES.map((f) => (
              <button
                key={f.name}
                role="tab"
                aria-selected={f.name === activeFile}
                className={`ide-tab ${f.name === activeFile ? "active" : ""}`}
                onClick={() => setActiveFile(f.name)}
              >
                <FileBadge icon={f.icon} />
                {f.name}
              </button>
            ))}
          </div>

          <div className="ide-breadcrumb" aria-hidden="true">
            <span>portfolio</span>
            {file.crumb.map((c, i) => (
              <span key={i}>
                <span className="ide-sep">›</span>
                <span>{c}</span>
              </span>
            ))}
          </div>

          <div className="ide-code-area">
            <CodePane file={file} />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="ide-statusbar">
        <span>⎇ main</span>
        <span>◎ 0 ⚠ 0</span>
        <span className="ide-status-role">Full-stack developer</span>
        <div className="ide-status-right">
          <span>UTF-8</span>
          <span>{file.lang.toUpperCase()}</span>
          <button
            className="ide-golive"
            onClick={() => setLiveOpen(true)}
            title="Run npm run dev"
          >
            ◉ Go Live
          </button>
        </div>
      </div>

      {liveOpen && (
        <Suspense fallback={null}>
          <LiveTerminal onClose={() => setLiveOpen(false)} onEnterSite={onClose} />
        </Suspense>
      )}
    </div>
  );
}
