"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { galleryImages as allImages } from "@/lib/galleryImages";

const TOTAL = 12;
const SWAP_INTERVAL = 2500;
const FADE_DURATION = 600;

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
  const galleryPath = locale === "de" || locale === "" ? "/gallery" : `/${locale}/gallery`;

  const initialSlots = useMemo(() => shuffle(allImages).slice(0, TOTAL), []);
  const [slots, setSlots] = useState<string[]>(initialSlots);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const slotsRef = useRef<string[]>(initialSlots);
  const usedRef = useRef<Set<string>>(new Set(initialSlots));

  const swappingRef = useRef(false);
  const swapOne = useCallback(() => {
    if (swappingRef.current) return;
    const available = allImages.filter(img => !usedRef.current.has(img));
    if (available.length === 0) return;
    const slotIdx = Math.floor(Math.random() * TOTAL);
    const newImg = available[Math.floor(Math.random() * available.length)];
    const oldImg = slotsRef.current[slotIdx];

    swappingRef.current = true;
    setFadingIndex(slotIdx);
    setTimeout(() => {
      const next = [...slotsRef.current];
      next[slotIdx] = newImg;
      slotsRef.current = next;
      usedRef.current.delete(oldImg);
      usedRef.current.add(newImg);
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 items-start mb-10">
          {slots.map((src, i) => (
            <div
              key={i}
              data-src={src}
              onClick={e => { const s = e.currentTarget.dataset.src; if (s) setSelected(s); }}
              className="group relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer aspect-[4/5]"
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(236,72,153,0.7), 0 0 20px 6px rgba(249,168,212,0.8), 0 0 45px 16px rgba(251,207,232,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
            >
              <Image
                src={src}
                alt={`Chrisi Cake ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
                style={{ opacity: fadingIndex === i ? 0 : 1, transition: `opacity ${FADE_DURATION}ms ease-in-out` }}
              />
              <div className="absolute inset-0 bg-pink-300/0 group-hover:bg-pink-300/10 transition-colors duration-300 rounded-2xl" />
            </div>
          ))}
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
