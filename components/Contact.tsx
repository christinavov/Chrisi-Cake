"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";

export default function Contact() {
  const t = useTranslations("contact");
  const phoneRaw = t("phone").replace(/\s/g, "");
  const whatsappNumber = phoneRaw.replace("+", "");

  const contactItems = [
    {
      icon: Mail,
      label: t("email"),
      href: `mailto:${t("email")}`,
    },
    {
      icon: Phone,
      label: t("phone"),
      href: `tel:${phoneRaw}`,
      extra: {
        icon: MessageCircle,
        label: "WhatsApp",
        href: `https://wa.me/${whatsappNumber}`,
      },
    },
    {
      icon: MapPin,
      label: t("location"),
      href: "https://maps.google.com/?q=Bern,Schweiz",
    },
    {
      icon: Instagram,
      label: t("instagram"),
      href: t("instagramUrl"),
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-white/40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map(({ icon: Icon, label, href, extra }, i) => (
            <div key={i} className="flex flex-col gap-3">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-white/90 border border-pink-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-pink-200 group-hover:to-rose-200 transition-colors">
                  <Icon size={22} className="text-pink-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 break-all">{label}</p>
              </a>
              {extra && (
                <a
                  href={extra.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  <extra.icon size={18} />
                  {extra.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
