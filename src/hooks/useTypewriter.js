import { useEffect, useRef, useState } from "react";

// Returns true if the user prefers reduced motion (checked once on mount).
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Drives the "Go Live" terminal: types an array of { d, cls, pre, text } steps
// one after another, exposing the lines rendered so far. Calls onDone when the
// whole sequence finishes. Respects prefers-reduced-motion (shows everything at
// once) and cleans up all timers on unmount / when `active` turns false.
export default function useTypewriter(steps, active, onDone) {
  const [lines, setLines] = useState([]);
  // Index of the line currently being typed, and how many chars are visible.
  const [typing, setTyping] = useState({ index: -1, chars: 0 });
  const timers = useRef([]);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!active) return;

    // Reset state on each activation.
    setLines([]);
    setTyping({ index: -1, chars: 0 });

    const clearAll = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    // Reduced motion: dump everything immediately, then fire onDone.
    if (prefersReducedMotion()) {
      setLines(steps.map((st) => ({ ...st, text: st.text })));
      const t = setTimeout(() => doneRef.current && doneRef.current(), 300);
      timers.current.push(t);
      return clearAll;
    }

    let cancelled = false;

    const runStep = (i) => {
      if (cancelled || i >= steps.length) {
        if (!cancelled) {
          const t = setTimeout(() => doneRef.current && doneRef.current(), 500);
          timers.current.push(t);
        }
        return;
      }
      const step = steps[i];
      const start = setTimeout(() => {
        // Add an empty line for this step, then reveal it char by char.
        setLines((prev) => [...prev, { ...step, text: "" }]);
        let chars = 0;
        const speed = 12 + Math.random() * 14;
        const tick = () => {
          if (cancelled) return;
          chars += 1;
          const visible = step.text.slice(0, chars);
          setLines((prev) => {
            const copy = prev.slice();
            copy[copy.length - 1] = { ...step, text: visible };
            return copy;
          });
          setTyping({ index: i, chars });
          if (chars < step.text.length) {
            const t = setTimeout(tick, speed);
            timers.current.push(t);
          } else {
            runStep(i + 1);
          }
        };
        tick();
      }, step.d);
      timers.current.push(start);
    };

    runStep(0);

    return () => {
      cancelled = true;
      clearAll();
    };
  }, [steps, active]);

  return { lines, typing };
}
