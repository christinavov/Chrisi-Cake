"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertTriangle, CheckCircle2, MessageCircle, Info } from "lucide-react";

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

const flavorKeys: FlavorKey[] = [
  "spinatHimbeere",
  "oreo",
  "spinatZitrone",
  "schockiOrange",
  "caramelBanane",
  "schockiHimbeere",
  "rotVelvetErdbeere",
  "snickers",
  "vanillaErdbeere",
  "vanillaHimbeere",
];

const isSunday = (date: Date) => date.getDay() === 0;
const isPast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};
const isTooSoon = (date: Date) => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  minDate.setHours(0, 0, 0, 0);
  return date < minDate;
};

export default function OrderBuilder() {
  const t = useTranslations("order");
  const tf = useTranslations("flavors");

  const [flavor, setFlavor] = useState("");
  const [occasion, setOccasion] = useState("");
  const [twoTier, setTwoTier] = useState(false);
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dateError, setDateError] = useState("");
  const [guestsError, setGuestsError] = useState("");

  const minGuests = twoTier ? 20 : 10;

  const handleTierChange = (val: boolean) => {
    setTwoTier(val);
    setGuestsError("");
    // Auto-adjust guests if below new minimum
    if (val && guests && parseInt(guests) < 20) setGuests("20");
    if (!val && guests && parseInt(guests) === 20) setGuests("10");
  };

  const handleDateChange = (d: Date | null) => {
    setDateError("");
    if (!d) { setDate(null); return; }
    if (isSunday(d)) {
      setDateError(t("sundayError"));
      setDate(null);
      return;
    }
    setDate(d);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flavor || !guests || !date || !name || !phone) return;
    if (parseInt(guests) < minGuests) {
      setGuestsError(twoTier ? t("minGuestsErrorTwo") : t("minGuestsError"));
      return;
    }

    const flavorName = tf(`items.${flavor as FlavorKey}.name`);
    const tierLabel = twoTier ? "Zweistöckig (2 Etagen)" : "Einstöckig (1 Etage)";
    const dateStr = date ? date.toLocaleDateString("de-CH") : "—";
    const occasionLabel = occasion || "—";
    const emailLine = email ? `\nE-Mail: ${email}` : "";
    const detailsLine = details ? `\nWünsche: ${details}` : "";

    const msg = [
      "🎂 *Neue Tortenbestellung*",
      "",
      `👤 Name: ${name}`,
      `📞 Telefon: ${phone}${emailLine}`,
      "",
      `🍰 Geschmack: ${flavorName}`,
      `🎂 Tortenart: ${tierLabel}`,
      `👥 Gäste: ${guests} Personen`,
      `📅 Abholdatum: ${dateStr}`,
      `🎉 Anlass: ${occasionLabel}${detailsLine}`,
    ].join("\n");

    const waUrl = `https://wa.me/41762236126?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");

    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const filterDate = (d: Date) => !isSunday(d) && !isPast(d);

  if (submitted) {
    return (
      <section id="order" className="py-20 md:py-28 bg-white/40">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-pink-100 space-y-6">
            <CheckCircle2 size={64} className="text-green-500 mx-auto" />
            <h2 className="text-3xl font-script text-pink-700">{t("successTitle")}</h2>
            <p className="text-gray-600 text-sm">{t("successMsg")}</p>
            <div className="flex items-start gap-3 bg-green-50 border-l-4 border-green-400 rounded-xl p-4 text-left">
              <MessageCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800 font-semibold text-sm">{t("whatsappHint")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-20 md:py-28 bg-white/40">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-script text-pink-700 mb-3">{t("title")}</h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        {/* Important note */}
        <div className="mb-8 flex items-start gap-3 bg-gradient-to-r from-pink-50 to-rose-50 border-l-4 border-pink-500 rounded-xl p-4">
          <AlertTriangle size={20} className="text-pink-600 flex-shrink-0 mt-0.5" />
          <p className="text-pink-800 font-medium text-sm">{t("importantNote")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/90 rounded-3xl shadow-xl border border-pink-100 p-6 md:p-10 space-y-6">
          {/* Flavor */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("flavorLabel")} *</label>
            <select
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              required
              className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
            >
              <option value="">{t("flavorPlaceholder")}</option>
              {flavorKeys.map((k) => (
                <option key={k} value={k}>
                  {tf(`items.${k}.name`)}
                </option>
              ))}
            </select>
            {flavor && (
              <p className="mt-2 text-xs text-gray-500 flex items-start gap-1">
                <Info size={12} className="mt-0.5 flex-shrink-0 text-pink-400" />
                {tf(`items.${flavor as FlavorKey}.desc`)}
              </p>
            )}
          </div>

          {/* Tier selector */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-3">{t("tierLabel")} *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTierChange(false)}
                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border-2 transition-all ${!twoTier ? "border-pink-400 bg-pink-50 shadow-sm" : "border-pink-100 bg-white hover:border-pink-200"}`}
              >
                <svg width="40" height="40" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="12" width="28" height="18" rx="4" fill="#fce7f3"/>
                  <rect x="5" y="12" width="28" height="6" rx="3" fill="#fbcfe8"/>
                  <path d="M9 12 Q12 18 15 12 Q18 18 21 12 Q24 18 27 18 Q30 18 33 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <rect x="3" y="28" width="32" height="5" rx="2.5" fill="#f9a8d4"/>
                  <circle cx="13" cy="22" r="2" fill="#f472b6"/>
                  <circle cx="19" cy="22" r="2" fill="#f472b6"/>
                  <circle cx="25" cy="22" r="2" fill="#f472b6"/>
                </svg>
                <p className="text-sm font-semibold text-gray-700">{t("tierOne")}</p>
                <p className="text-xs text-pink-500">{t("tierOneNote")}</p>
              </button>
              <button
                type="button"
                onClick={() => handleTierChange(true)}
                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border-2 transition-all ${twoTier ? "border-pink-400 bg-pink-50 shadow-sm" : "border-pink-100 bg-white hover:border-pink-200"}`}
              >
                <svg width="40" height="40" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="6" width="20" height="13" rx="3" fill="#fce7f3"/>
                  <rect x="9" y="6" width="20" height="5" rx="2.5" fill="#fbcfe8"/>
                  <path d="M12 6 Q14.5 11 17 6 Q19.5 11 22 6 Q24.5 11 27 6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <rect x="4" y="20" width="30" height="13" rx="3" fill="#fce7f3"/>
                  <rect x="4" y="20" width="30" height="5" rx="2.5" fill="#fbcfe8"/>
                  <path d="M7 20 Q10 25 13 20 Q16 25 19 20 Q22 25 25 20 Q28 25 31 20" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <rect x="2" y="32" width="34" height="4" rx="2" fill="#f9a8d4"/>
                  <circle cx="13" cy="28" r="1.5" fill="#f472b6"/>
                  <circle cx="19" cy="28" r="1.5" fill="#f472b6"/>
                  <circle cx="25" cy="28" r="1.5" fill="#f472b6"/>
                </svg>
                <p className="text-sm font-semibold text-gray-700">{t("tierTwo")}</p>
                <p className="text-xs text-pink-500">{t("tierTwoNote")}</p>
              </button>
            </div>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("occasionLabel")}</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
            >
              <option value="">{t("occasionPlaceholder")}</option>
              <option value="birthday">{t("occasionBirthday")}</option>
              <option value="wedding">{t("occasionWedding")}</option>
              <option value="anniversary">{t("occasionAnniversary")}</option>
              <option value="babyshower">{t("occasionBabyShower")}</option>
              <option value="other">{t("occasionOther")}</option>
            </select>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("guestsLabel")} *</label>
            <input
              type="number"
              min={minGuests}
              value={guests}
              onChange={(e) => {
                const val = e.target.value;
                // Allow clearing the field, but clamp on blur
                setGuests(val);
                setGuestsError("");
              }}
              onBlur={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val < minGuests) {
                  setGuests(String(minGuests));
                  setGuestsError(twoTier ? t("minGuestsErrorTwo") : t("minGuestsError"));
                }
              }}
              placeholder={t("guestsPlaceholder")}
              required
              className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400 ${guestsError ? "border-red-400" : "border-pink-200"}`}
            />
            {guestsError ? (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle size={12} /> {guestsError}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-400">⚠️ {twoTier ? t("tierTwoNote") : t("minGuests")}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("dateLabel")} *</label>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              filterDate={filterDate}
              minDate={(() => { const d = new Date(); d.setDate(d.getDate() + 3); return d; })()}
              placeholderText={t("datePlaceholder")}
              dateFormat="dd.MM.yyyy"
              className="w-full"
              required
            />
            {dateError && (
              <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle size={12} /> {dateError}
              </p>
            )}
            <div className="mt-3 rounded-xl bg-pink-50 border border-pink-200 px-4 py-3 space-y-1">
              <p className="text-sm font-semibold text-pink-700">⏰ {t("timeNote")}</p>
              <p className="text-sm font-medium text-pink-600">📅 {t("dateNote")}</p>
            </div>
          </div>

          {/* WhatsApp reference block */}
          <a
            href="https://wa.me/41762236126"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-green-50 border-2 border-green-200 hover:border-green-400 hover:bg-green-100 rounded-2xl px-5 py-4 transition-all group"
          >
            <div className="w-12 h-12 bg-green-500 group-hover:bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
              <MessageCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-green-800 text-sm">{t("whatsappBlockTitle")}</p>
              <p className="text-green-700 text-xs mt-0.5">{t("whatsappBlockNote")}</p>
            </div>
          </a>

          <div className="border-t border-pink-100 pt-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-pink-800 mb-2">{t("nameLabel")} *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                required
                className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("emailLabel")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("phoneLabel")} *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="block text-sm font-semibold text-pink-800 mb-2">{t("detailsLabel")}</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t("detailsPlaceholder")}
                rows={4}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400 resize-none"
              />
            </div>
          </div>

          {/* Legal note */}
          <div className="flex items-start gap-3 bg-amber-50 border-l-4 border-amber-400 rounded-xl p-4">
            <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 font-semibold text-sm">{t("legalNote")}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-300 text-lg"
          >
            {t("submitBtn")}
          </button>
        </form>
      </div>
    </section>
  );
}
