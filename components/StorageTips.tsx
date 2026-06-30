"use client";

import { useTranslations } from "next-intl";

export default function StorageTips() {
  const t = useTranslations("storage");
  const tips = t.raw("tips") as string[];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="bg-white/80 border border-pink-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm"
            >
              <span className="text-2xl flex-shrink-0">🧁</span>
              <p className="text-gray-600 text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
