"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
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

export default function Gallery() {
  const t = useTranslations("gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i! - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setLightboxIndex((i) => (i! + 1) % galleryImages.length);

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

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
          {galleryImages.map((src, i) => (
            <div
              key={src}
              onClick={() => openLightbox(i)}
              className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src={src}
                alt={`Chrisi Cake ${i + 1}`}
                width={400}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              {/* Vignette edges */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 30px 10px rgba(255, 228, 235, 0.5)" }}
              />
              {/* Hover pink tint */}
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
