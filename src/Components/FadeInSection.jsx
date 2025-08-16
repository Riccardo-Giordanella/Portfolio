import useInView from "../hooks/useInView.js";
import "./FadeInSection.css";

export default function FadeInSection({ children }) {
  const [ref, isVisible] = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}
