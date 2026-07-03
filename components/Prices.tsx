"use client";

import { useTranslations } from "next-intl";
import { ChevronRight, CreditCard } from "lucide-react";

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
