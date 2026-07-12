"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Leaf, Sparkles, Ban, Heart, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

const aboutPhotos = ["/images/about/about1.jpg", "/images/about/about2.jpg"];

export default function About() {
  const t = useTranslations("about");
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % aboutPhotos.length);
        setFading(false);
      }, 800);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const badges = [
    { icon: Leaf, key: "badge1" },
    { icon: Sparkles, key: "badge2" },
    { icon: Ban, key: "badge3" },
    { icon: Heart, key: "badge4" },
  ] as const;

  return (
    <section id="about" className="py-20 md:py-28 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image side */}
        <div className="relative flex justify-center">
          <div className="relative w-[30rem] md:w-[39rem]">
            <Image
              src={aboutPhotos[current]}
              alt="Chrisi Cake"
              width={600}
              height={800}
              className="w-full h-auto rounded-3xl"
              style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.8s ease-in-out",
                boxShadow: "0 0 0 2px rgba(236,72,153,0.4), 0 0 30px 10px rgba(249,168,212,0.6), 0 0 70px 25px rgba(251,207,232,0.35)",
              }}
            />
          </div>
        </div>

        {/* Text side */}
        <div>
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-6">{t("title")}</h2>

          <div className="space-y-4 mb-8">
            <p className="text-pink-600 leading-relaxed text-xl md:text-2xl font-semibold border-l-4 border-pink-400 pl-4">
              {t("p1intro")}
            </p>
            <p className="text-gray-700 leading-relaxed text-base border-l-4 border-pink-300 pl-4">
              {t("p1")}
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              {t("p2")}
            </p>
            <p className="text-gray-600 leading-relaxed text-base font-medium text-pink-800">
              {t("p3")}
            </p>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {badges.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="flex items-center gap-3 bg-white/80 border border-pink-100 rounded-xl px-4 py-3 shadow-sm"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-pink-600" />
                </div>
                <span className="text-sm font-medium text-pink-800">{t(key)}</span>
              </div>
            ))}
          </div>

          {/* Instagram button */}
          <a
            href="https://www.instagram.com/chrisicake"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <Instagram size={20} />
            @chrisicake
          </a>
        </div>
      </div>
    </section>
  );
}
