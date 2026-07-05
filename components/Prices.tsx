"use client";

import { useTranslations } from "next-intl";
import { ChevronRight, CreditCard } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

  const [guests, setGuests] = useState(10);
  const [extraPrint, setExtraPrint] = useState(false);
  const [extraChoco, setExtraChoco] = useState(false);
  const [extraFlowers, setExtraFlowers] = useState(false);
  const [extraBottle, setExtraBottle] = useState(false);

  const basePrice = guests * 10;
  const extrasPrice = (extraPrint ? 10 : 0) + (extraChoco ? 10 : 0) + (extraFlowers ? 20 : 0) + (extraBottle ? 20 : 0);
  const totalPrice = basePrice + extrasPrice;

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
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-script text-pink-700 mb-1">{t("exampleTitle")}</h3>
          <p className="text-gray-500 text-sm">* {t("exampleNote")}</p>
        </div>
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

      {/* Price Calculator */}
      <div className="mb-10 bg-white/90 border-2 border-pink-100 rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="text-2xl md:text-3xl font-script text-pink-700 mb-1 text-center">{t("calcTitle")}</h3>
        <p className="text-center text-gray-400 text-sm mb-6">{t("calcSubtitle")}</p>

        {/* Guests counter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-pink-800 mb-3">{t("calcGuests")}</label>
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(10, g - 1))}
              className="w-12 h-12 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-2xl font-bold transition-all flex items-center justify-center select-none"
            >−</button>
            <div className="text-center min-w-[100px]">
              <span className="text-5xl font-bold text-pink-600">{guests}</span>
              <p className="text-sm text-gray-400 mt-1">{t("calcPersons")}</p>
            </div>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(100, g + 1))}
              className="w-12 h-12 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-2xl font-bold transition-all flex items-center justify-center select-none"
            >+</button>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">* {t("calcMinNote")}</p>
        </div>

        {/* Extras */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-pink-800 mb-3">{t("calcExtras")}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { key: "extraPrint", state: extraPrint, set: setExtraPrint, price: 10, emoji: "🖨️" },
              { key: "extraChoco", state: extraChoco, set: setExtraChoco, price: 10, emoji: "🍫" },
              { key: "extraFlowers", state: extraFlowers, set: setExtraFlowers, price: 20, emoji: "🌸" },
              { key: "extraBottle", state: extraBottle, set: setExtraBottle, price: 20, emoji: "🍾" },
            ].map(({ key, state, set, price, emoji }) => (
              <button
                key={key}
                type="button"
                onClick={() => set(!state)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all text-left ${
                  state
                    ? "border-pink-400 bg-pink-50 shadow-sm"
                    : "border-pink-100 bg-white hover:border-pink-200"
                }`}
              >
                <span className="text-2xl">{emoji}</span>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-700">{t(key as Parameters<typeof t>[0])}</p>
                  <p className="text-xs text-pink-500">+{price} CHF</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${state ? "border-pink-500 bg-pink-500" : "border-gray-300"}`}>
                  {state && <span className="text-white text-xs">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 flex items-center justify-between text-white">
          <div>
            <p className="text-sm opacity-80">{t("calcTotal")}</p>
            <p className="text-xs opacity-60 mt-0.5">{t("calcApprox")}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{totalPrice}</p>
            <p className="text-sm opacity-80">CHF</p>
          </div>
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
