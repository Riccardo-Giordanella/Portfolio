import { useState, useEffect } from "react";
import useInView from "../hooks/useInView.js";
import "./FadeInSection.css";

export default function FadeInSection({ children }) {
  const [ref, isVisible] = useInView({ threshold: 0.3 });
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setHasAppeared(true); // memorizza che è stata vista
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={`fade-in-section ${hasAppeared ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}
