"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-100/60 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-4 md:mb-5">
          <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/40" style={{ boxShadow: "0 0 30px 14px rgba(249,168,212,0.9), 0 0 65px 35px rgba(251,207,232,0.65), 0 0 110px 65px rgba(252,231,243,0.45), 0 0 160px 90px rgba(253,242,248,0.25)" }}>
            <Image
              src="/images/logo.jpg"
              alt="Chrisi Cake"
              width={256}
              height={256}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-script text-4xl md:text-5xl text-pink-700 mb-3 drop-shadow-sm">
          {t("title")}
        </h1>

        <p className="text-xl md:text-2xl font-semibold text-pink-500 mb-4 tracking-wide uppercase">
          {t("subtitle")}
        </p>

        {/* Location badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-white/80 border border-pink-200 text-pink-700 font-medium text-sm px-4 py-2 rounded-full shadow-sm">
            <MapPin size={14} className="text-pink-500" />
            Bern, Schweiz
          </span>
        </div>

        <p className="text-lg md:text-xl text-pink-800/70 max-w-2xl mx-auto mb-8 leading-relaxed font-medium tracking-wide">
          {t("description")}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToOrder}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-300 text-lg"
          >
            {t("cta")}
          </button>
          <span className="text-sm text-pink-400 font-medium bg-pink-50 px-4 py-2 rounded-full border border-pink-200">
            🎂 {t("note")}
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center animate-bounce">
          <ChevronDown size={28} className="text-pink-300" />
        </div>
      </div>
    </section>
  );
}
