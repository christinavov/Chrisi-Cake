"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(id);
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        timeouts.push(t);
      } else if (attempts < 20) {
        const t = setTimeout(() => tryScroll(attempts + 1), 100);
        timeouts.push(t);
      }
    };
    tryScroll();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return null;
}
