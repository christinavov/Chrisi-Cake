"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{ name: string; text: string; stars: number }>;

  return (
    <section className="py-20 md:py-28 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-script text-pink-700">{t("title")}</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white/90 border border-pink-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: item.stars }).map((_, s) => (
                <Star key={s} size={16} className="text-pink-400 fill-pink-400" />
              ))}
            </div>
            <p className="text-gray-600 mb-4 italic leading-relaxed">"{item.text}"</p>
            <p className="font-semibold text-pink-700">— {item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
