"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

const layout = [
  { col: "col-span-2", row: "row-span-2" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-2" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-2", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-2" },
  { col: "col-span-2", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
];

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
  const reviewsPath = locale === "de" ? "/reviews" : `/${locale}/reviews`;

  const [slots, setSlots] = useState<string[]>(() => shuffle(allReviews).slice(0, 12));
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const [nextSrc, setNextSrc] = useState<string>("");
  const usedRef = useRef<Set<string>>(new Set(slots));
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const slotIdx = Math.floor(Math.random() * 12);
      const available = allReviews.filter((img) => !usedRef.current.has(img));
      if (available.length === 0) return;
      const newImg = available[Math.floor(Math.random() * available.length)];

      setFadingIndex(slotIdx);
      setNextSrc(newImg);

      setTimeout(() => {
        setSlots((prev) => {
          const updated = [...prev];
          usedRef.current.delete(updated[slotIdx]);
          usedRef.current.add(newImg);
          updated[slotIdx] = newImg;
          return updated;
        });
        setFadingIndex(null);
      }, 600);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        {/* Mosaic grid */}
        <div
          className="grid gap-2 md:gap-3 mb-10"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "160px" }}
        >
          {slots.map((src, i) => {
            const cell = layout[i];
            return (
              <div
                key={i}
                onClick={() => setSelected(src)}
                className={`${cell.col} ${cell.row} group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
              >
                <Image
                  src={src}
                  alt={`Отзыв ${i + 1}`}
                  fill
                  className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                    fadingIndex === i ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {fadingIndex === i && nextSrc && (
                  <Image
                    src={nextSrc}
                    alt="Отзыв"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                )}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                  style={{ boxShadow: "inset 0 0 30px 10px rgba(255, 228, 235, 0.35)" }}
                />
                <div className="absolute inset-0 bg-pink-300/0 group-hover:bg-pink-300/10 transition-colors duration-300 rounded-2xl z-10" />
              </div>
            );
          })}
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

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <div className="relative max-w-2xl w-full">
            <Image
              src={selected}
              alt="Отзыв"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
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
