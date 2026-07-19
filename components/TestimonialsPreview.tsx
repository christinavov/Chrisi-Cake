"use client";

import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const allReviews = [
  "/images/reviews/photo_2026-07-03_20-12-03.jpg",
  "/images/reviews/photo_2026-07-03_20-12-04.jpg",
  "/images/reviews/photo_2026-07-03_20-12-05.jpg",
  "/images/reviews/photo_2026-07-03_20-12-06.jpg",
  "/images/reviews/photo_2026-07-03_20-12-08.jpg",
  "/images/reviews/photo_2026-07-03_20-12-09.jpg",
  "/images/reviews/photo_2026-07-03_20-12-10.jpg",
  "/images/reviews/photo_2026-07-03_20-12-12.jpg",
  "/images/reviews/photo_2026-07-03_20-12-13.jpg",
  "/images/reviews/photo_2026-07-03_20-12-14.jpg",
  "/images/reviews/photo_2026-07-03_20-12-16.jpg",
  "/images/reviews/photo_2026-07-03_20-12-17.jpg",
  "/images/reviews/photo_2026-07-03_20-12-19.jpg",
  "/images/reviews/photo_2026-07-03_20-12-20.jpg",
  "/images/reviews/photo_2026-07-03_20-12-22.jpg",
];

const TOTAL = 6;
const SWAP_INTERVAL = 20000;
const FADE_DURATION = 600;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TestimonialsPreview() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const reviewsPath = locale === "de" || locale === "" ? "/reviews" : `/${locale}/reviews`;

  const initialSlots = useMemo(() => shuffle(allReviews).slice(0, TOTAL), []);
  const [slots, setSlots] = useState<string[]>(initialSlots);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const slotsRef = useRef<string[]>(initialSlots);
  const shownRef = useRef<Set<string>>(new Set(initialSlots));
  const queueRef = useRef<string[]>(shuffle(allReviews.filter(img => !new Set(initialSlots).has(img))));

  const swappingRef = useRef(false);
  const swapOne = useCallback(() => {
    if (swappingRef.current) return;
    if (queueRef.current.length === 0) {
      queueRef.current = shuffle(allReviews.filter(img => !shownRef.current.has(img)));
      if (queueRef.current.length === 0) return;
    }
    const newImg = queueRef.current.shift()!;
    const slotIdx = Math.floor(Math.random() * TOTAL);
    const oldImg = slotsRef.current[slotIdx];

    swappingRef.current = true;
    setFadingIndex(slotIdx);
    setTimeout(() => {
      const next = [...slotsRef.current];
      next[slotIdx] = newImg;
      slotsRef.current = next;
      shownRef.current.delete(oldImg);
      shownRef.current.add(newImg);
      setSlots(next);
      setFadingIndex(null);
      swappingRef.current = false;
    }, FADE_DURATION);
  }, []);

  useEffect(() => {
    const id = setInterval(swapOne, SWAP_INTERVAL);
    return () => clearInterval(id);
  }, [swapOne]);

  return (
    <section id="testimonials" className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        <div className="columns-2 sm:columns-3 gap-3 mb-10">
          {slots.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelected(src)}
              className="break-inside-avoid mb-3 cursor-pointer rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              style={{ opacity: fadingIndex === i ? 0 : 1, transition: `opacity ${FADE_DURATION}ms ease-in-out` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Kundenbewertung" className="w-full h-auto block" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={reviewsPath}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            {t("viewAll")} <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <div className="relative max-w-2xl w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected} alt="Отзыв" className="w-full h-auto rounded-2xl shadow-2xl block" />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-white/90 rounded-full w-9 h-9 flex items-center justify-center text-pink-700 font-bold text-lg hover:bg-white transition"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
