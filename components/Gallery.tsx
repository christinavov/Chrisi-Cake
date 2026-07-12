"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
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

        {/* Masonry columns — original aspect ratio */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2">
          {galleryImages.map((src, i) => (
            <div
              key={src}
              onClick={() => openLightbox(i)}
              className="group relative break-inside-avoid mb-2 cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(236,72,153,0.7), 0 0 20px 6px rgba(249,168,212,0.8), 0 0 45px 16px rgba(251,207,232,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Chrisi Cake ${i + 1}`}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-pink-300/0 group-hover:bg-pink-300/10 transition-colors duration-300 rounded-2xl" />
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
              alt={`Werk ${lightboxIndex + 1}`}
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
