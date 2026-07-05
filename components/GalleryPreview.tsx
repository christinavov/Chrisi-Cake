"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const previewImages = [
  "/images/gallery/photo_2026-07-03_21-01-13.jpg",
  "/images/gallery/photo_2026-07-03_21-01-17.jpg",
  "/images/gallery/photo_2026-07-03_21-01-22.jpg",
  "/images/gallery/photo_2026-07-03_21-01-28.jpg",
  "/images/gallery/photo_2026-07-03_21-01-35.jpg",
  "/images/gallery/photo_2026-07-03_21-01-44.jpg",
  "/images/gallery/photo_2026-07-03_21-02-13.jpg",
  "/images/gallery/photo_2026-07-03_21-02-28.jpg",
  "/images/gallery/photo_2026-07-03_21-02-33.jpg",
];

export default function GalleryPreview() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const galleryPath = locale === "de" ? "/gallery" : `/${locale}/gallery`;

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

        {/* 3x3 grid preview */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-10">
          {previewImages.map((src, i) => (
            <a
              key={src}
              href={galleryPath}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-1 aspect-square"
            >
              <Image
                src={src}
                alt={`Chrisi Cake ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 30px 10px rgba(255, 228, 235, 0.4)" }}
              />
              <div className="absolute inset-0 bg-pink-300/0 group-hover:bg-pink-300/10 transition-colors duration-300 rounded-2xl" />
            </a>
          ))}
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
