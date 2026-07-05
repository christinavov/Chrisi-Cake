"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const locales = [
  { code: "de", label: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
  { code: "ru", label: "RU", name: "Русский", flag: "🇷🇺" },
  { code: "uk", label: "UK", name: "Українська", flag: "🇺🇦" },
];

const navItems = ["home", "about", "gallery", "flavors", "order", "prices", "faq", "contact"] as const;

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

  const switchLocale = (newLocale: string) => {
    const newPath = newLocale === "de" ? "/" : `/${newLocale}`;
    window.location.href = newPath;
    setLangOpen(false);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-pink-200 shadow">
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
              <button
                key={item}
                onClick={() => scrollTo(sectionIds[item])}
                className="px-3 py-2 text-sm font-medium text-pink-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
              >
                {t(item)}
              </button>
            ))}
          </nav>

          {/* Lang Switcher + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-pink-200 hover:bg-pink-50 transition-all"
              >
                <span className="text-xl leading-none">{locales.find((l) => l.code === locale)?.flag}</span>
                <span className="text-xs font-semibold text-pink-700">{locales.find((l) => l.code === locale)?.label}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-pink-100 py-2 z-50">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLocale(l.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-pink-50 transition-colors ${
                        l.code === locale ? "text-pink-600 font-semibold" : "text-gray-700"
                      }`}
                    >
                      <span className="text-xl leading-none">{l.flag}</span>
                      <span>{l.name}</span>
                      {l.code === locale && <span className="ml-auto text-pink-400">✓</span>}
                    </button>
                  ))}
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
              <button
                key={item}
                onClick={() => scrollTo(sectionIds[item])}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-pink-800 hover:bg-pink-50 rounded-lg transition-colors"
              >
                {t(item)}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
