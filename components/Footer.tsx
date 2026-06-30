"use client";

import { useTranslations } from "next-intl";
import { Instagram, Mail, Heart } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("contact");

  return (
    <footer className="bg-gradient-to-br from-pink-700 to-rose-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-script text-3xl mb-1">Chrisi Cake</p>
            <p className="text-pink-200 text-sm flex items-center gap-1 justify-center md:justify-start">
              <Heart size={12} className="fill-pink-300 text-pink-300" />
              {t("madein")}
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href={tc("instagramUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`mailto:${tc("email")}`}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-pink-600/50 mt-8 pt-6 text-center text-pink-200 text-sm">
          {t("copy")}
        </div>
      </div>
    </footer>
  );
}
