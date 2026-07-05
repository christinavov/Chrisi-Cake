"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const allImages = [
  "/images/gallery/photo_2026-07-03_21-01-13.jpg",
  "/images/gallery/photo_2026-07-03_21-01-14.jpg",
  "/images/gallery/photo_2026-07-03_21-01-15.jpg",
  "/images/gallery/photo_2026-07-03_21-01-16.jpg",
  "/images/gallery/photo_2026-07-03_21-01-17.jpg",
  "/images/gallery/photo_2026-07-03_21-01-19.jpg",
  "/images/gallery/photo_2026-07-03_21-01-20.jpg",
  "/images/gallery/photo_2026-07-03_21-01-21.jpg",
  "/images/gallery/photo_2026-07-03_21-01-22.jpg",
  "/images/gallery/photo_2026-07-03_21-01-23.jpg",
  "/images/gallery/photo_2026-07-03_21-01-24.jpg",
  "/images/gallery/photo_2026-07-03_21-01-25.jpg",
  "/images/gallery/photo_2026-07-03_21-01-27.jpg",
  "/images/gallery/photo_2026-07-03_21-01-28.jpg",
  "/images/gallery/photo_2026-07-03_21-01-29.jpg",
  "/images/gallery/photo_2026-07-03_21-01-30.jpg",
  "/images/gallery/photo_2026-07-03_21-01-31.jpg",
  "/images/gallery/photo_2026-07-03_21-01-32.jpg",
  "/images/gallery/photo_2026-07-03_21-01-34.jpg",
  "/images/gallery/photo_2026-07-03_21-01-35.jpg",
  "/images/gallery/photo_2026-07-03_21-01-37.jpg",
  "/images/gallery/photo_2026-07-03_21-01-38.jpg",
  "/images/gallery/photo_2026-07-03_21-01-39.jpg",
  "/images/gallery/photo_2026-07-03_21-01-40.jpg",
  "/images/gallery/photo_2026-07-03_21-01-42.jpg",
  "/images/gallery/photo_2026-07-03_21-01-43.jpg",
  "/images/gallery/photo_2026-07-03_21-01-44.jpg",
  "/images/gallery/photo_2026-07-03_21-01-45.jpg",
  "/images/gallery/photo_2026-07-03_21-01-47.jpg",
  "/images/gallery/photo_2026-07-03_21-01-48.jpg",
  "/images/gallery/photo_2026-07-03_21-01-50.jpg",
  "/images/gallery/photo_2026-07-03_21-01-53.jpg",
  "/images/gallery/photo_2026-07-03_21-01-54.jpg",
  "/images/gallery/photo_2026-07-03_21-01-55.jpg",
  "/images/gallery/photo_2026-07-03_21-01-56.jpg",
  "/images/gallery/photo_2026-07-03_21-01-58.jpg",
  "/images/gallery/photo_2026-07-03_21-01-59.jpg",
  "/images/gallery/photo_2026-07-03_21-02-00.jpg",
  "/images/gallery/photo_2026-07-03_21-02-01.jpg",
  "/images/gallery/photo_2026-07-03_21-02-03.jpg",
  "/images/gallery/photo_2026-07-03_21-02-04.jpg",
  "/images/gallery/photo_2026-07-03_21-02-05.jpg",
  "/images/gallery/photo_2026-07-03_21-02-06.jpg",
  "/images/gallery/photo_2026-07-03_21-02-07.jpg",
  "/images/gallery/photo_2026-07-03_21-02-09.jpg",
  "/images/gallery/photo_2026-07-03_21-02-10.jpg",
  "/images/gallery/photo_2026-07-03_21-02-12.jpg",
  "/images/gallery/photo_2026-07-03_21-02-13.jpg",
  "/images/gallery/photo_2026-07-03_21-02-14.jpg",
  "/images/gallery/photo_2026-07-03_21-02-15.jpg",
  "/images/gallery/photo_2026-07-03_21-02-16.jpg",
  "/images/gallery/photo_2026-07-03_21-02-17.jpg",
  "/images/gallery/photo_2026-07-03_21-02-19.jpg",
  "/images/gallery/photo_2026-07-03_21-02-20.jpg",
  "/images/gallery/photo_2026-07-03_21-02-21.jpg",
  "/images/gallery/photo_2026-07-03_21-02-24.jpg",
  "/images/gallery/photo_2026-07-03_21-02-26.jpg",
  "/images/gallery/photo_2026-07-03_21-02-27.jpg",
  "/images/gallery/photo_2026-07-03_21-02-28.jpg",
  "/images/gallery/photo_2026-07-03_21-02-30.jpg",
  "/images/gallery/photo_2026-07-03_21-02-31.jpg",
  "/images/gallery/photo_2026-07-03_21-02-32.jpg",
  "/images/gallery/photo_2026-07-03_21-02-33.jpg",
  "/images/gallery/photo_2026-07-03_21-02-34.jpg",
  "/images/gallery/photo_2026-07-03_21-02-35.jpg",
  "/images/gallery/photo_2026-07-03_21-02-36.jpg",
  "/images/gallery/photo_2026-07-03_21-02-38.jpg",
  "/images/gallery/photo_2026-07-03_21-02-39.jpg",
  "/images/gallery/photo_2026-07-03_21-02-40.jpg",
  "/images/gallery/photo_2026-07-03_21-02-41.jpg",
  "/images/gallery/photo_2026-07-03_21-02-43.jpg",
  "/images/gallery/photo_2026-07-03_21-02-44.jpg",
  "/images/gallery/photo_2026-07-03_21-02-46.jpg",
  "/images/gallery/photo_2026-07-03_21-02-47.jpg",
  "/images/gallery/photo_2026-07-03_21-02-48.jpg",
  "/images/gallery/photo_2026-07-03_21-02-50.jpg",
  "/images/gallery/photo_2026-07-03_21-02-51.jpg",
  "/images/gallery/photo_2026-07-03_21-02-52.jpg",
  "/images/gallery/photo_2026-07-03_21-02-54.jpg",
  "/images/gallery/photo_2026-07-03_21-02-55.jpg",
  "/images/gallery/photo_2026-07-03_21-02-56.jpg",
  "/images/gallery/photo_2026-07-03_21-02-58.jpg",
  "/images/gallery/photo_2026-07-03_21-02-59.jpg",
  "/images/gallery/photo_2026-07-03_21-03-00.jpg",
  "/images/gallery/photo_2026-07-03_21-03-02.jpg",
  "/images/gallery/photo_2026-07-03_21-03-03.jpg",
  "/images/gallery/photo_2026-07-03_21-03-04.jpg",
  "/images/gallery/photo_2026-07-03_21-03-06.jpg",
  "/images/gallery/photo_2026-07-03_21-03-11.jpg",
];

// Layout: each cell has a col-span and row-span (in a 4-col grid)
// Total = 12 cells arranged in a visually balanced mosaic
const layout = [
  { col: "col-span-2", row: "row-span-2" }, // 0 — large square
  { col: "col-span-1", row: "row-span-1" }, // 1 — small
  { col: "col-span-1", row: "row-span-1" }, // 2 — small
  { col: "col-span-1", row: "row-span-2" }, // 3 — tall
  { col: "col-span-1", row: "row-span-1" }, // 4 — small
  { col: "col-span-1", row: "row-span-1" }, // 5 — small
  { col: "col-span-1", row: "row-span-1" }, // 6 — small
  { col: "col-span-2", row: "row-span-1" }, // 7 — wide
  { col: "col-span-1", row: "row-span-1" }, // 8 — small
  { col: "col-span-1", row: "row-span-2" }, // 9 — tall
  { col: "col-span-2", row: "row-span-1" }, // 10 — wide
  { col: "col-span-1", row: "row-span-1" }, // 11 — small
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GalleryPreview() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const galleryPath = locale === "de" ? "/gallery" : `/${locale}/gallery`;

  const [slots, setSlots] = useState<string[]>(() => shuffle(allImages).slice(0, 12));
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const [nextSrc, setNextSrc] = useState<string>("");
  const usedRef = useRef<Set<string>>(new Set(slots));

  useEffect(() => {
    const interval = setInterval(() => {
      const slotIdx = Math.floor(Math.random() * 12);
      const available = allImages.filter((img) => !usedRef.current.has(img));
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        {/* Mosaic grid — 4 cols, auto rows of 160px */}
        <div
          className="grid gap-2 md:gap-3 mb-10"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "160px",
          }}
        >
          {slots.map((src, i) => {
            const cell = layout[i];
            return (
              <a
                key={i}
                href={galleryPath}
                className={`${cell.col} ${cell.row} group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-1`}
              >
                <Image
                  src={src}
                  alt={`Chrisi Cake ${i + 1}`}
                  fill
                  className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                    fadingIndex === i ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {fadingIndex === i && nextSrc && (
                  <Image
                    src={nextSrc}
                    alt="Chrisi Cake preview"
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
              </a>
            );
          })}
        </div>

        {/* CTA button */}
        <div className="text-center">
          <a
            href={galleryPath}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            {t("viewAll")} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
