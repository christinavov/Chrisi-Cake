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
  | "vanillaHimbeere"
  | "kokosMango"
  | "schokoMango"
  | "blaubeereLemon"
  | "makMalinaLimon";

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
  kokosMango: "/images/flavors/kokosMango.jpg",
  schokoMango: "/images/flavors/schokoMango.jpg",
  blaubeereLemon: "/images/flavors/blaubeereLemon.jpg",
  makMalinaLimon: "/images/flavors/мак малина лимон.jpg",
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
  "kokosMango",
  "schokoMango",
  "blaubeereLemon",
  "makMalinaLimon",
];

export default function Flavors() {
  const t = useTranslations("flavors");
  const [hovered, setHovered] = useState<FlavorKey | null>(null);
  const [expanded, setExpanded] = useState<FlavorKey | null>(null);

  const selectFlavor = (key: FlavorKey, e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem("selectedFlavor", key);
    window.dispatchEvent(new CustomEvent("flavorSelected", { detail: key }));
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="flavors" className="py-20 md:py-28 bg-white/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {flavorKeys.map((key) => {
            const isHovered = hovered === key;
            const isExpanded = expanded === key;
            return (
              <div
                key={key}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setExpanded(isExpanded ? null : key)}
                className="relative rounded-2xl overflow-hidden border border-pink-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
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
                  {/* Desktop: show on hover */}
                  {isHovered && (
                    <p className="hidden md:block text-xs text-gray-500 mt-2 text-center leading-relaxed">
                      {t(`items.${key}.desc`)}
                    </p>
                  )}
                  {/* Mobile: show on tap */}
                  {isExpanded && (
                    <p className="md:hidden text-xs text-gray-500 mt-2 text-center leading-relaxed">
                      {t(`items.${key}.desc`)}
                    </p>
                  )}
                  <button
                    onClick={(e) => selectFlavor(key, e)}
                    className="mt-2 w-full py-1.5 bg-pink-100 text-pink-700 text-xs font-semibold rounded-xl hover:bg-pink-200 transition-all"
                  >
                    {t("select")}
                  </button>
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
