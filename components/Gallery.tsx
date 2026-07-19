"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/lib/galleryImages";

export default function Gallery() {
  const t = useTranslations("gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i! - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setLightboxIndex((i) => (i! + 1) % galleryImages.length);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="relative py-20 md:py-28 overflow-hidden">
      {/* Pink background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-50 rounded-full blur-2xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        {/* Masonry — natural proportions */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2">
          {galleryImages.map((src, i) => (
            <div
              key={src}
              onClick={() => openLightbox(i)}
              className="break-inside-avoid mb-2 group cursor-pointer rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(236,72,153,0.7), 0 0 20px 6px rgba(249,168,212,0.8), 0 0 45px 16px rgba(251,207,232,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Chrisi Cake ${i + 1}`} loading="lazy" className="w-full h-auto block rounded-2xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
            touchStartX.current = null;
          }}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition z-10"
          >
            <ChevronLeft size={28} />
          </button>

          <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] max-w-3xl w-full flex flex-col items-center">
            <Image
              src={galleryImages[lightboxIndex]}
              alt={`Chrisi Cake ${lightboxIndex + 1}`}
              width={1200}
              height={1200}
              quality={95}
              priority
              unoptimized
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-white/50 text-sm mt-3">{lightboxIndex + 1} / {galleryImages.length}</p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition z-10"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
