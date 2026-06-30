"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type FlavorKey =
  | "spinatHimbeere"
  | "oreo"
  | "spinatZitrone"
  | "schockiOrange"
  | "caramelBanane"
  | "schockiHimbeere"
  | "snickers"
  | "rotVelvetErdbeere"
  | "vanillaErdbeere"
  | "vanillaHimbeere";

const flavorColors: Record<FlavorKey, { bg: string; border: string; emoji: string; gradient: string }> = {
  spinatHimbeere: { bg: "from-green-50 to-pink-50", border: "border-pink-200", emoji: "🍃🫐", gradient: "from-green-400 to-pink-400" },
  oreo: { bg: "from-gray-50 to-gray-100", border: "border-gray-200", emoji: "🍪", gradient: "from-gray-700 to-gray-500" },
  spinatZitrone: { bg: "from-green-50 to-yellow-50", border: "border-yellow-200", emoji: "🍃🍋", gradient: "from-green-400 to-yellow-400" },
  schockiOrange: { bg: "from-amber-50 to-orange-50", border: "border-orange-200", emoji: "🍫🍊", gradient: "from-amber-600 to-orange-500" },
  caramelBanane: { bg: "from-yellow-50 to-amber-50", border: "border-amber-200", emoji: "🍌🍮", gradient: "from-yellow-500 to-amber-400" },
  schockiHimbeere: { bg: "from-gray-50 to-pink-50", border: "border-pink-200", emoji: "🍫🫐", gradient: "from-gray-700 to-pink-400" },
  snickers: { bg: "from-amber-50 to-yellow-50", border: "border-amber-200", emoji: "🥜🍫", gradient: "from-amber-700 to-amber-400" },
  rotVelvetErdbeere: { bg: "from-red-50 to-pink-50", border: "border-red-200", emoji: "❤️🍓", gradient: "from-red-600 to-pink-400" },
  vanillaErdbeere: { bg: "from-cream-50 to-pink-50", border: "border-pink-100", emoji: "🍦🍓", gradient: "from-amber-200 to-pink-300" },
  vanillaHimbeere: { bg: "from-pink-50 to-rose-50", border: "border-rose-100", emoji: "🍦🫐", gradient: "from-amber-200 to-rose-300" },
};

const flavorKeys: FlavorKey[] = [
  "spinatHimbeere",
  "oreo",
  "spinatZitrone",
  "schockiOrange",
  "caramelBanane",
  "schockiHimbeere",
  "snickers",
  "rotVelvetErdbeere",
  "vanillaErdbeere",
  "vanillaHimbeere",
];

export default function Flavors() {
  const t = useTranslations("flavors");
  const [selected, setSelected] = useState<FlavorKey | null>(null);

  return (
    <section id="flavors" className="py-20 md:py-28 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
        <p className="text-gray-500 text-lg">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {flavorKeys.map((key) => {
          const color = flavorColors[key];
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(isSelected ? null : key)}
              className={`relative rounded-2xl border-2 p-4 text-center transition-all duration-300 cursor-pointer bg-gradient-to-br ${color.bg} ${color.border} ${
                isSelected
                  ? "ring-2 ring-pink-400 ring-offset-2 shadow-lg -translate-y-1"
                  : "hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {/* Gradient top stripe */}
              <div className={`h-2 rounded-full bg-gradient-to-r ${color.gradient} mb-3 mx-auto w-3/4`} />
              <div className="text-3xl mb-2">{color.emoji}</div>
              <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                {t(`items.${key}.name`)}
              </h3>
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-pink-100 text-xs text-gray-600 text-left">
                  {t(`items.${key}.desc`)}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-8 p-6 bg-white/80 border border-pink-100 rounded-2xl shadow-sm max-w-xl mx-auto text-center">
          <div className="text-4xl mb-2">{flavorColors[selected].emoji}</div>
          <h3 className="font-bold text-pink-700 text-lg mb-2">{t(`items.${selected}.name`)}</h3>
          <p className="text-gray-600">{t(`items.${selected}.desc`)}</p>
        </div>
      )}
    </section>
  );
}
