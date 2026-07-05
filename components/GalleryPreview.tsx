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

// 4 columns × 3 items each = 12 slots
const COLS = 4;
const PER_COL = 3;
const TOTAL = COLS * PER_COL;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Split flat array into N columns for masonry
function toColumns(items: string[], n: number): string[][] {
  const cols: string[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push(item));
  return cols;
}

export default function GalleryPreview() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const galleryPath = locale === "de" ? "/gallery" : `/${locale}/gallery`;

  // Each slot holds [current, next] pair + whether transition is active
  const [slots, setSlots] = useState<string[]>(() => shuffle(allImages).slice(0, TOTAL));
  const [pending, setPending] = useState<{ idx: number; src: string } | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const usedRef = useRef<Set<string>>(new Set(slots));
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const slotIdx = Math.floor(Math.random() * TOTAL);
      const available = allImages.filter((img) => !usedRef.current.has(img));
      if (available.length === 0) return;
      const newImg = available[Math.floor(Math.random() * available.length)];

      // Place new image underneath (opacity 0), then fade it in
      setPending({ idx: slotIdx, src: newImg });
      // Small delay so the new img renders before transition starts
      requestAnimationFrame(() => requestAnimationFrame(() => setTransitioning(true)));

      setTimeout(() => {
        // Swap complete — commit new image as current
        setSlots((prev) => {
          const updated = [...prev];
          usedRef.current.delete(updated[slotIdx]);
          usedRef.current.add(newImg);
          updated[slotIdx] = newImg;
          return updated;
        });
        setPending(null);
        setTransitioning(false);
      }, 900);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const columns = toColumns(slots, COLS);

  return (
    <section id="gallery" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        {/* Masonry: 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 items-start mb-10">
          {columns.map((col, ci) =>
            col.map((src, ri) => {
              const slotIdx = ci + ri * COLS;
              const isChanging = pending?.idx === slotIdx;
              return (
                <div
                  key={`${ci}-${ri}`}
                  onClick={() => setSelected(src)}
                  className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg hover:shadow-pink-200 transition-shadow duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Current image — fades out during transition */}
                  <Image
                    src={src}
                    alt={`Chrisi Cake ${slotIdx + 1}`}
                    width={400}
                    height={500}
                    style={{ transition: "opacity 0.8s ease" }}
                    className={`w-full h-auto block ${isChanging && transitioning ? "opacity-0" : "opacity-100"}`}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {/* Incoming image — fades in on top */}
                  {isChanging && pending.src && (
                    <div className="absolute inset-0">
                      <Image
                        src={pending.src}
                        alt="next"
                        width={400}
                        height={500}
                        style={{ transition: "opacity 0.8s ease" }}
                        className={`w-full h-auto block ${transitioning ? "opacity-100" : "opacity-0"}`}
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: "inset 0 0 24px 8px rgba(255,228,235,0.3)" }}
                  />
                  <div className="absolute inset-0 bg-pink-300/0 group-hover:bg-pink-300/10 transition-colors duration-300 rounded-2xl" />
                </div>
              );
            })
          )}
        </div>

        <div className="text-center">
          <a
            href={galleryPath}
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
              alt="Chrisi Cake"
              width={800}
              height={800}
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
