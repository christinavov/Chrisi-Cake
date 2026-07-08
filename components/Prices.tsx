"use client";

import { useTranslations } from "next-intl";
import { ChevronRight, CreditCard } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const exampleCakes = [
  {
    images: [
      "/images/gallery/photo_2026-07-03_21-02-13.webp",
    ],
    labelKey: "exampleBerries",
    price: "ab 100 CHF",
  },
  {
    images: ["/images/gallery/photo_2026-07-03_21-02-28.webp"],
    labelKey: "examplePrint",
    price: "ab 110 CHF",
  },
  {
    images: ["/images/gallery/photo_2026-07-03_21-01-28.webp"],
    labelKey: "exampleFlowers",
    price: "ab 120 CHF",
  },
  {
    images: ["/images/gallery/photo_2026-07-03_21-02-33.webp"],
    labelKey: "exampleBottle",
    price: "ab 120 CHF",
  },
  {
    images: ["/images/gallery/photo_2026-07-03_21-02-20.webp"],
    labelKey: "exampleTwoTier",
    price: "ab 270 CHF",
  },
];

export default function Prices() {
  const t = useTranslations("prices");

  const [guests, setGuests] = useState(10);
  const [twoTier, setTwoTier] = useState(false);
  const [extraPrint, setExtraPrint] = useState(false);
  const [extraChoco, setExtraChoco] = useState(false);
  const [extraFlowers, setExtraFlowers] = useState(false);
  const [extraBottle, setExtraBottle] = useState(false);

  const minGuests = twoTier ? 20 : 10;
  const maxGuests = twoTier ? 200 : 25;
  const pricePerPerson = twoTier ? 13 : 10;

  const handleTwoTier = (val: boolean) => {
    setTwoTier(val);
    if (val && guests < 20) setGuests(20);
    if (!val) setGuests(10);
  };

  const decrement = () => setGuests((g) => Math.max(minGuests, g - 5));
  const increment = () => setGuests((g) => Math.min(maxGuests, g + 5));

  const basePrice = guests * pricePerPerson;
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
              onClick={decrement}
              disabled={guests <= minGuests}
              className="w-12 h-12 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-2xl font-bold transition-all flex items-center justify-center select-none disabled:opacity-40 disabled:cursor-not-allowed"
            >−</button>
            <div className="text-center min-w-[100px]">
              <span className="text-5xl font-bold text-pink-600">{guests}</span>
              <p className="text-sm text-gray-400 mt-1">{t("calcPersons")}</p>
            </div>
            <button
              type="button"
              onClick={increment}
              disabled={guests >= maxGuests}
              className="w-12 h-12 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-2xl font-bold transition-all flex items-center justify-center select-none disabled:opacity-40 disabled:cursor-not-allowed"
            >+</button>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">* {t("calcMinNote")}</p>
        </div>

        {/* Tier selector */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleTwoTier(false)}
            className={`flex flex-col items-center gap-1 px-4 py-4 rounded-2xl border-2 transition-all ${!twoTier ? "border-pink-400 bg-pink-50 shadow-sm" : "border-pink-100 bg-white hover:border-pink-200"}`}
          >
            {/* One-tier cake icon */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="12" width="28" height="18" rx="4" fill="#fce7f3"/>
              <rect x="5" y="12" width="28" height="6" rx="3" fill="#fbcfe8"/>
              <path d="M9 12 Q12 18 15 12 Q18 18 21 12 Q24 18 27 18 Q30 18 33 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <rect x="3" y="28" width="32" height="5" rx="2.5" fill="#f9a8d4"/>
              <circle cx="13" cy="22" r="2" fill="#f472b6"/>
              <circle cx="19" cy="22" r="2" fill="#f472b6"/>
              <circle cx="25" cy="22" r="2" fill="#f472b6"/>
            </svg>
            <p className="text-sm font-semibold text-gray-700">{t("calcOneTier")}</p>
            <p className="text-xs text-pink-500">10 CHF / {t("calcPerson")}</p>
          </button>
          <button
            type="button"
            onClick={() => handleTwoTier(true)}
            className={`flex flex-col items-center gap-1 px-4 py-4 rounded-2xl border-2 transition-all ${twoTier ? "border-pink-400 bg-pink-50 shadow-sm" : "border-pink-100 bg-white hover:border-pink-200"}`}
          >
            {/* Two-tier cake icon */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="9" y="6" width="20" height="13" rx="3" fill="#fce7f3"/>
              <rect x="9" y="6" width="20" height="5" rx="2.5" fill="#fbcfe8"/>
              <path d="M12 6 Q14.5 11 17 6 Q19.5 11 22 6 Q24.5 11 27 6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <rect x="4" y="20" width="30" height="13" rx="3" fill="#fce7f3"/>
              <rect x="4" y="20" width="30" height="5" rx="2.5" fill="#fbcfe8"/>
              <path d="M7 20 Q10 25 13 20 Q16 25 19 20 Q22 25 25 20 Q28 25 31 20" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <rect x="2" y="32" width="34" height="4" rx="2" fill="#f9a8d4"/>
              <circle cx="13" cy="28" r="1.5" fill="#f472b6"/>
              <circle cx="19" cy="28" r="1.5" fill="#f472b6"/>
              <circle cx="25" cy="28" r="1.5" fill="#f472b6"/>
            </svg>
            <p className="text-sm font-semibold text-gray-700">{t("calcTwoTier")}</p>
            <p className="text-xs text-pink-500">13 CHF / {t("calcPerson")} · {t("calcMin20")}</p>
          </button>
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
