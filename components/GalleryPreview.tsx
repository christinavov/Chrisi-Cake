"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const allImages = [
  "/images/gallery/photo_2026-07-03_21-01-13.webp",
  "/images/gallery/photo_2026-07-03_21-01-14.webp",
  "/images/gallery/photo_2026-07-03_21-01-15.webp",
  "/images/gallery/photo_2026-07-03_21-01-16.webp",
  "/images/gallery/photo_2026-07-03_21-01-17.webp",
  "/images/gallery/photo_2026-07-03_21-01-19.webp",
  "/images/gallery/photo_2026-07-03_21-01-20.webp",
  "/images/gallery/photo_2026-07-03_21-01-21.webp",
  "/images/gallery/photo_2026-07-03_21-01-22.webp",
  "/images/gallery/photo_2026-07-03_21-01-23.webp",
  "/images/gallery/photo_2026-07-03_21-01-24.webp",
  "/images/gallery/photo_2026-07-03_21-01-25.webp",
  "/images/gallery/photo_2026-07-03_21-01-27.webp",
  "/images/gallery/photo_2026-07-03_21-01-28.webp",
  "/images/gallery/photo_2026-07-03_21-01-29.webp",
  "/images/gallery/photo_2026-07-03_21-01-30.webp",
  "/images/gallery/photo_2026-07-03_21-01-31.webp",
  "/images/gallery/photo_2026-07-03_21-01-32.webp",
  "/images/gallery/photo_2026-07-03_21-01-34.webp",
  "/images/gallery/photo_2026-07-03_21-01-35.webp",
  "/images/gallery/photo_2026-07-03_21-01-37.webp",
  "/images/gallery/photo_2026-07-03_21-01-38.webp",
  "/images/gallery/photo_2026-07-03_21-01-39.webp",
  "/images/gallery/photo_2026-07-03_21-01-40.webp",
  "/images/gallery/photo_2026-07-03_21-01-42.webp",
  "/images/gallery/photo_2026-07-03_21-01-43.webp",
  "/images/gallery/photo_2026-07-03_21-01-44.webp",
  "/images/gallery/photo_2026-07-03_21-01-45.webp",
  "/images/gallery/photo_2026-07-03_21-01-47.webp",
  "/images/gallery/photo_2026-07-03_21-01-48.webp",
  "/images/gallery/photo_2026-07-03_21-01-50.webp",
  "/images/gallery/photo_2026-07-03_21-01-53.webp",
  "/images/gallery/photo_2026-07-03_21-01-54.webp",
  "/images/gallery/photo_2026-07-03_21-01-55.webp",
  "/images/gallery/photo_2026-07-03_21-01-56.webp",
  "/images/gallery/photo_2026-07-03_21-01-58.webp",
  "/images/gallery/photo_2026-07-03_21-01-59.webp",
  "/images/gallery/photo_2026-07-03_21-02-00.webp",
  "/images/gallery/photo_2026-07-03_21-02-01.webp",
  "/images/gallery/photo_2026-07-03_21-02-03.webp",
  "/images/gallery/photo_2026-07-03_21-02-04.webp",
  "/images/gallery/photo_2026-07-03_21-02-05.webp",
  "/images/gallery/photo_2026-07-03_21-02-06.webp",
  "/images/gallery/photo_2026-07-03_21-02-07.webp",
  "/images/gallery/photo_2026-07-03_21-02-09.webp",
  "/images/gallery/photo_2026-07-03_21-02-10.webp",
  "/images/gallery/photo_2026-07-03_21-02-12.webp",
  "/images/gallery/photo_2026-07-03_21-02-13.webp",
  "/images/gallery/photo_2026-07-03_21-02-14.webp",
  "/images/gallery/photo_2026-07-03_21-02-15.webp",
  "/images/gallery/photo_2026-07-03_21-02-16.webp",
  "/images/gallery/photo_2026-07-03_21-02-17.webp",
  "/images/gallery/photo_2026-07-03_21-02-19.webp",
  "/images/gallery/photo_2026-07-03_21-02-20.webp",
  "/images/gallery/photo_2026-07-03_21-02-21.webp",
  "/images/gallery/photo_2026-07-03_21-02-24.webp",
  "/images/gallery/photo_2026-07-03_21-02-26.webp",
  "/images/gallery/photo_2026-07-03_21-02-27.webp",
  "/images/gallery/photo_2026-07-03_21-02-28.webp",
  "/images/gallery/photo_2026-07-03_21-02-30.webp",
  "/images/gallery/photo_2026-07-03_21-02-31.webp",
  "/images/gallery/photo_2026-07-03_21-02-32.webp",
  "/images/gallery/photo_2026-07-03_21-02-33.webp",
  "/images/gallery/photo_2026-07-03_21-02-34.webp",
  "/images/gallery/photo_2026-07-03_21-02-35.webp",
  "/images/gallery/photo_2026-07-03_21-02-36.webp",
  "/images/gallery/photo_2026-07-03_21-02-38.webp",
  "/images/gallery/photo_2026-07-03_21-02-39.webp",
  "/images/gallery/photo_2026-07-03_21-02-40.webp",
  "/images/gallery/photo_2026-07-03_21-02-41.webp",
  "/images/gallery/photo_2026-07-03_21-02-43.webp",
  "/images/gallery/photo_2026-07-03_21-02-44.webp",
  "/images/gallery/photo_2026-07-03_21-02-46.webp",
  "/images/gallery/photo_2026-07-03_21-02-47.webp",
  "/images/gallery/photo_2026-07-03_21-02-48.webp",
  "/images/gallery/photo_2026-07-03_21-02-50.webp",
  "/images/gallery/photo_2026-07-03_21-02-51.webp",
  "/images/gallery/photo_2026-07-03_21-02-52.webp",
  "/images/gallery/photo_2026-07-03_21-02-54.webp",
  "/images/gallery/photo_2026-07-03_21-02-55.webp",
  "/images/gallery/photo_2026-07-03_21-02-56.webp",
  "/images/gallery/photo_2026-07-03_21-02-58.webp",
  "/images/gallery/photo_2026-07-03_21-02-59.webp",
  "/images/gallery/photo_2026-07-03_21-03-00.webp",
  "/images/gallery/photo_2026-07-03_21-03-02.webp",
  "/images/gallery/photo_2026-07-03_21-03-03.webp",
  "/images/gallery/photo_2026-07-03_21-03-04.webp",
  "/images/gallery/photo_2026-07-03_21-03-06.webp",
  "/images/gallery/photo_2026-07-03_21-03-11.webp",
];

const TOTAL = 12;

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

  const initialSlots = shuffle(allImages).slice(0, TOTAL);
  const [slots, setSlots] = useState<string[]>(initialSlots);
  const [pending, setPending] = useState<{ idx: number; src: string; visible: boolean } | null>(null);
  const slotsRef = useRef<string[]>(initialSlots);
  const busyRef = useRef(false);
  const [selected, setSelected] = useState<string | null>(null);

  const FADE_MS = 2500;
  const INTERVAL_MS = 6000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (busyRef.current) return;

      const current = new Set(slotsRef.current);
      const available = allImages.filter((img) => !current.has(img));
      if (available.length === 0) return;

      const slotIdx = Math.floor(Math.random() * TOTAL);
      const newImg = available[Math.floor(Math.random() * available.length)];

      busyRef.current = true;

      // Optimistically update slotsRef so next tick won't pick same image
      const next = [...slotsRef.current];
      next[slotIdx] = newImg;
      slotsRef.current = next;

      setPending({ idx: slotIdx, src: newImg, visible: false });

      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setPending((p) => p ? { ...p, visible: true } : p)
        )
      );

      setTimeout(() => {
        setSlots([...slotsRef.current]);
        setPending(null);
        busyRef.current = false;
      }, FADE_MS + 100);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

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

        {/* Grid: flat list, correct index per slot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 items-start mb-10">
          {slots.map((src, slotIdx) => {
            const isChanging = pending?.idx === slotIdx;
            const visibleSrc = isChanging && pending?.visible ? pending.src : src;
            return (
              <div
                key={slotIdx}
                onClick={() => setSelected(visibleSrc)}
                className="group relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(236,72,153,0.7), 0 0 20px 6px rgba(249,168,212,0.8), 0 0 45px 16px rgba(251,207,232,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
              >
                <Image
                  src={src}
                  alt={`Chrisi Cake ${slotIdx + 1}`}
                  width={400}
                  height={500}
                  className="w-full h-auto block"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {isChanging && pending?.src && (
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: pending.visible ? 1 : 0,
                      transition: `opacity ${FADE_MS}ms ease-in-out`,
                    }}
                  >
                    <Image
                      src={pending.src}
                      alt="next"
                      width={400}
                      height={500}
                      className="w-full h-auto block"
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
          })}
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
              unoptimized
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
