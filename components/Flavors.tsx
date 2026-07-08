"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
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

const flavorImages: Record<FlavorKey, string> = {
  spinatHimbeere: "/images/flavors/spinatHimbeere.jpg",
  oreo: "/images/flavors/oreo.jpg",
  spinatZitrone: "/images/flavors/spinatZitrone.jpg",
  schockiOrange: "/images/flavors/schockiOrange.jpg",
  caramelBanane: "/images/flavors/caramelBanane.jpg",
  schockiHimbeere: "/images/flavors/schockiHimbeere.jpg",
  snickers: "/images/flavors/snickers.jpg",
  rotVelvetErdbeere: "/images/flavors/rotVelvetErdbeere.jpg",
  vanillaErdbeere: "/images/flavors/vanillaErdbeere.jpg",
  vanillaHimbeere: "/images/flavors/vanillaHimbeere.jpg",
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
  const [expanded, setExpanded] = useState<FlavorKey | null>(null);

  return (
    <section id="flavors" className="py-20 md:py-28 bg-white/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-script bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 bg-clip-text text-transparent mb-3 drop-shadow-sm">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {flavorKeys.map((key) => {
            const isOpen = expanded === key;
            return (
              <div
                key={key}
                onClick={() => setExpanded(isOpen ? null : key)}
                className="cursor-pointer rounded-2xl overflow-hidden border border-pink-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={flavorImages[key]}
                    alt={t(`items.${key}.name`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-pink-700 text-center leading-tight">
                    {t(`items.${key}.name`)}
                  </p>
                  {isOpen && (
                    <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
                      {t(`items.${key}.desc`)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* No gelatin notice */}
        <div className="mt-8 flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-6 py-4 max-w-xl mx-auto">
          <span className="text-2xl">🌿</span>
          <p className="text-green-800 font-medium text-sm">{t("noGelatin")}</p>
        </div>
      </div>
    </section>
  );
}
