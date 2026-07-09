import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../hooks/useTypewriter";
import "./BackToTop.css";

// Small circular "scroll to top" button, bottom-left, stacked above the
// dev-mode launcher. Fades in once the page is scrolled down.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });

  return (
    <button
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
