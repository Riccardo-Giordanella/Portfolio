import { useEffect, useRef, useState } from "react";

export default function useInView({ threshold = 0.1, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
    // Primitives in deps (threshold, rootMargin) instead of the options object,
    // so the observer isn't recreated on every render (which caused it to
    // never fire reliably, especially on mobile).
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
