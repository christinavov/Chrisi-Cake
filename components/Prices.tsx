"use client";

import { useTranslations } from "next-intl";
import { ChevronRight, CreditCard } from "lucide-react";
import Image from "next/image";

const exampleCakes = [
  {
    images: [
      "/images/gallery/photo_2026-07-03_21-02-13.jpg",
    ],
    labelKey: "exampleBerries",
    price: "ab 100 CHF",
  },
  {
    images: ["/images/gallery/photo_2026-07-03_21-02-28.jpg"],
    labelKey: "examplePrint",
    price: "ab 110 CHF",
  },
  {
    images: ["/images/gallery/photo_2026-07-03_21-01-28.jpg"],
    labelKey: "exampleFlowers",
    price: "ab 120 CHF",
  },
  {
    images: ["/images/gallery/photo_2026-07-03_21-02-33.jpg"],
    labelKey: "exampleBottle",
    price: "ab 120 CHF",
  },
];

const icons = ["🎂", "🏰", "✨", "💌"];

export default function Prices() {
  const t = useTranslations("prices");
  const items = t.raw("items") as Array<{ label: string; value: string; desc: string }>;

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="prices" className="py-20 md:py-28 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
        <p className="text-2xl font-semibold text-pink-500 mb-4">{t("subtitle")}</p>
        <p className="text-gray-500 max-w-2xl mx-auto">{t("intro")}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white/90 border border-pink-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center flex flex-col"
          >
            <div className="text-4xl mb-3">{icons[i]}</div>
            <h3 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">{item.label}</h3>
            <p className="text-2xl font-bold text-pink-600 mb-3">{item.value}</p>
            <p className="text-xs text-gray-500 flex-grow">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Example cakes */}
      <div className="mb-10">
        <p className="text-center text-gray-500 text-sm mb-6">* {t("exampleNote")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exampleCakes.map((cake, i) => (
            <div key={i} className="bg-white/90 border border-pink-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className={`grid ${cake.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-0.5`}>
                {cake.images.map((src, j) => (
                  <div key={j} className="relative aspect-square">
                    <Image src={src} alt={t(cake.labelKey)} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="p-4 text-center">
                <p className="text-sm font-medium text-gray-700 mb-1">{t(cake.labelKey)}</p>
                <p className="text-xl font-bold text-pink-600">{cake.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Twint / Prepayment notice */}
      <div className="mb-10 flex items-center gap-4 bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-2xl px-6 py-5">
        <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <CreditCard size={24} className="text-violet-600" />
        </div>
        <div>
          <p className="font-bold text-violet-800 text-base">{t("twintTitle")}</p>
          <p className="text-violet-700 text-sm mt-0.5">{t("twintNote")}</p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={scrollToOrder}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          {t("ctaLabel")} <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
