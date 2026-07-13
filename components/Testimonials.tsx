"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

const reviewImages = [
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

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="testimonials" className="py-20 md:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
          {reviewImages.map((src) => (
            <div
              key={src}
              onClick={() => setSelected(src)}
              className="flex-shrink-0 snap-start cursor-pointer rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 w-32 sm:w-40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Kundenbewertung" className="w-full h-auto block" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <div className="relative max-w-2xl w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected} alt="Bewertung" className="w-full h-auto rounded-2xl shadow-2xl block" />
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
