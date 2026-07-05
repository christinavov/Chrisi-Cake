"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);

    // Wait for page to render, then scroll
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      } else if (attempts < 20) {
        setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };
    tryScroll();
  }, []);

  return null;
}
