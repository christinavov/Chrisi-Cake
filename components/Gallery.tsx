"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Instagram } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=400&fit=crop",
    alt: "Elegant pink cake",
  },
  {
    src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop",
    alt: "Wedding cake",
  },
  {
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    alt: "Birthday cake",
  },
  {
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
    alt: "Chocolate cake",
  },
  {
    src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
    alt: "Raspberry cake",
  },
  {
    src: "https://images.unsplash.com/photo-1517427677506-ade074eb1432?w=400&h=400&fit=crop",
    alt: "Celebration cake",
  },
];

export default function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/chrisicake"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Instagram size={20} />
            @chrisicake
          </a>
        </div>
      </div>
    </section>
  );
}
