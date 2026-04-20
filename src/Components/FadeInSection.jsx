import { useState, useEffect } from "react";
import useInView from "../hooks/useInView.js";
import "./FadeInSection.css";

export default function FadeInSection({ children, delay = 0 }) {
  const [ref, isVisible] = useInView({ threshold: 0.05 });
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setHasAppeared(true);
    }
  }, [isVisible]);

  // Safety fallback: after 2s, show the section regardless of IntersectionObserver
  // This prevents sections from being stuck invisible if IO doesn't fire
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasAppeared(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in-section ${hasAppeared ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
