import { useCallback, useEffect, useState } from "react";

// Tiny hash-based toggle so the IDE overlay is linkable (#editor), survives the
// back button, and can be closed with the browser history — without pulling in
// a full router.
export default function useHashRoute(hash) {
  const match = () =>
    typeof window !== "undefined" && window.location.hash === hash;

  const [active, setActive] = useState(match);

  useEffect(() => {
    const onChange = () => setActive(match());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  const open = useCallback(() => {
    if (window.location.hash !== hash) window.location.hash = hash;
  }, [hash]);

  const close = useCallback(() => {
    if (window.location.hash === hash) {
      // Prefer going back so we don't leave an empty #hash in the URL.
      if (window.history.length > 1) window.history.back();
      else
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      setActive(false);
    }
  }, [hash]);

  return { active, open, close };
}
