"use client";

import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const previewImages = [
  "/images/reviews/photo_2026-07-03_20-12-03.jpg",
  "/images/reviews/photo_2026-07-03_20-12-04.jpg",
  "/images/reviews/photo_2026-07-03_20-12-05.jpg",
  "/images/reviews/photo_2026-07-03_20-12-06.jpg",
  "/images/reviews/photo_2026-07-03_20-12-08.jpg",
  "/images/reviews/photo_2026-07-03_20-12-09.jpg",
];

export default function TestimonialsPreview() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const reviewsPath = locale === "de" ? "/reviews" : `/${locale}/reviews`;
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="testimonials" className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        <div className="columns-2 sm:columns-4 gap-3 mb-10 min-h-[300px]">
          {previewImages.map((src) => (
            <div
              key={src}
              onClick={() => setSelected(src)}
              className="break-inside-avoid mb-3 cursor-pointer rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Kundenbewertung" className="w-full h-auto block" style={{ contentVisibility: "auto", containIntrinsicSize: "0 300px" }} />
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

      {/* Lightbox */}
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
