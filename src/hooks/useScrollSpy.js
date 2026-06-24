import { useEffect, useState } from "react";

// Tracks which section is currently in view and returns its id, so the navbar
// can highlight the active link as the user scrolls (not only on click).
export default function useScrollSpy(ids, offset = 80) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const onScroll = () => {
      // Use viewport-relative positions (getBoundingClientRect). offsetTop is
      // relative to each element's offsetParent — and here every section sits
      // in its own FadeInSection wrapper, so offsetTop is ~0 for all of them,
      // which would always select the last id.
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset + 1) current = id;
      }

      // When scrolled to the very bottom, force the last section active even if
      // it's too short to reach the offset line. Guard with scrollY > 0 so this
      // never fires on initial load.
      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (atBottom) current = ids[ids.length - 1];

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Recompute once everything (lazy images, fade-in sections) has laid out.
    window.addEventListener("load", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, [ids, offset]);

  return active;
}
