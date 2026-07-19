"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const FlagDE = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
    <rect width="5" height="3" y="0" fill="#000"/>
    <rect width="5" height="2" y="1" fill="#D00"/>
    <rect width="5" height="1" y="2" fill="#FFCE00"/>
  </svg>
);
const FlagGB = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
    <rect width="60" height="30" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);
const FlagRU = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
    <rect width="9" height="3" y="0" fill="#fff"/>
    <rect width="9" height="2" y="2" fill="#0039A6"/>
    <rect width="9" height="2" y="4" fill="#D52B1E"/>
  </svg>
);
const FlagUA = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 1" className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
    <rect width="2" height="1" fill="#005BBB"/>
    <rect width="2" height=".5" y=".5" fill="#FFD500"/>
  </svg>
);

const flags: Record<string, () => JSX.Element> = { de: FlagDE, en: FlagGB, ru: FlagRU, uk: FlagUA };

const locales = [
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "en", label: "EN", name: "English" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "uk", label: "UK", name: "Українська" },
];

const navItems = ["home", "about", "gallery", "flavors", "order", "prices", "faq", "testimonials", "contact"] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("restoreScroll");
    if (saved) {
      sessionStorage.removeItem("restoreScroll");
      window.scrollTo({ top: parseInt(saved), behavior: "instant" });
    }
    document.documentElement.style.opacity = "0";
    document.documentElement.style.transition = "opacity 0.3s ease";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.opacity = "1";
      });
    });
  }, []);

  const switchLocale = (newLocale: string) => {
    const scrollY = window.scrollY;
    const newPath = newLocale === "de" ? "/" : `/${newLocale}`;
    sessionStorage.setItem("restoreScroll", String(scrollY));
    setLangOpen(false);
    document.documentElement.style.transition = "opacity 0.25s ease";
    document.documentElement.style.opacity = "0";
    setTimeout(() => { window.location.href = newPath; }, 250);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Not on home page — navigate there and scroll to section
      const homePath = locale === "de" ? `/#${id}` : `/${locale}#${id}`;
      window.location.href = homePath;
    }
    setMobileOpen(false);
  };

  const sectionIds: Record<string, string> = {
    home: "hero",
    about: "about",
    gallery: "gallery",
    flavors: "flavors",
    order: "order",
    prices: "prices",
    faq: "faq",
    testimonials: "testimonials",
    contact: "contact",
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md shadow-pink-100"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-pink-200 shadow" style={{ boxShadow: "0 0 8px 3px rgba(249,168,212,0.7), 0 0 18px 6px rgba(251,207,232,0.4)" }}>
              <Image
                src="/images/logo.jpg"
                alt="Chrisi Cake"
                width={48}
                height={48}
                className="object-cover w-full h-full"
                onError={() => {}}
              />
            </div>
            <span className="font-script text-xl md:text-2xl text-pink-700 font-bold">
              Chrisi Cake
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item === "gallery" ? (
                <a
                  key={item}
                  href={locale === "de" ? "/gallery" : `/${locale}/gallery`}
                  className="group relative px-3 py-2 text-base font-medium text-pink-800 hover:text-pink-600 rounded-lg transition-all duration-200"
                >
                  {t(item)}
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                </a>
              ) : (
                <button
                  key={item}
                  onClick={() => scrollTo(sectionIds[item])}
                  className="group relative px-3 py-2 text-base font-medium text-pink-800 hover:text-pink-600 rounded-lg transition-all duration-200"
                >
                  {t(item)}
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                </button>
              )
            ))}
          </nav>

          {/* Lang Switcher + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              {(() => { const ActiveFlag = flags[locale]; return (
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-pink-200 hover:bg-pink-50 transition-all"
              >
                <ActiveFlag />
                <span className="text-xs font-semibold text-pink-700">{locales.find((l) => l.code === locale)?.label}</span>
              </button>
              ); })()}
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-pink-100 py-2 z-50">
                  {locales.map((l) => { const Flag = flags[l.code]; return (
                    <button
                      key={l.code}
                      onClick={() => switchLocale(l.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-pink-50 transition-colors ${
                        l.code === locale ? "text-pink-600 font-semibold" : "text-gray-700"
                      }`}
                    >
                      <Flag />
                      <span>{l.name}</span>
                      {l.code === locale && <span className="ml-auto text-pink-400">✓</span>}
                    </button>
                  ); })}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-pink-700 hover:bg-pink-50 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-pink-100 py-3 pb-4">
            {navItems.map((item) => (
              item === "gallery" ? (
                <a
                  key={item}
                  href={locale === "de" ? "/gallery" : `/${locale}/gallery`}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-pink-800 hover:bg-pink-50 rounded-lg transition-colors"
                >
                  {t(item)}
                </a>
              ) : (
                <button
                  key={item}
                  onClick={() => scrollTo(sectionIds[item])}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-pink-800 hover:bg-pink-50 rounded-lg transition-colors"
                >
                  {t(item)}
                </button>
              )
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
