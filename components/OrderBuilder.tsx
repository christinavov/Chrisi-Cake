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
  "snickers",
  "rotVelvetErdbeere",
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
  minDate.setDate(minDate.getDate() + 5);
  minDate.setHours(0, 0, 0, 0);
  return date < minDate;
};

export default function OrderBuilder() {
  const t = useTranslations("order");
  const tf = useTranslations("flavors");

  const [flavor, setFlavor] = useState("");
  const [occasion, setOccasion] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dateError, setDateError] = useState("");
  const [guestsError, setGuestsError] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flavor || !guests || !date || !name || !email || !phone) return;
    if (parseInt(guests) < 10) {
      setGuestsError(t("minGuestsError"));
      return;
    }

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "9acbede1-9652-4427-9603-023f4a7940e8",
          subject: `Neue Bestellung von ${name}`,
          name,
          email,
          phone,
          flavor,
          guests,
          date: date ? date.toLocaleDateString("de-CH") : "",
          occasion: occasion || "—",
          details: details || "—",
        }),
      });
    } catch {}

    setSubmitted(true);
  };

  const filterDate = (d: Date) => !isSunday(d) && !isPast(d);

  if (submitted) {
    return (
      <section id="order" className="py-20 md:py-28 bg-white/40">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-pink-100 space-y-6">
            <CheckCircle2 size={64} className="text-pink-500 mx-auto" />
            <h2 className="text-3xl font-script text-pink-700">{t("successTitle")}</h2>
            <p className="text-gray-500 text-sm">{t("responseTime")}</p>
            <div className="flex items-start gap-3 bg-amber-50 border-l-4 border-amber-400 rounded-xl p-4 text-left">
              <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 font-semibold text-sm">{t("successMsg")}</p>
            </div>
            <a
              href="https://wa.me/41762236126"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all text-sm"
            >
              📸 {t("whatsappHint")}
            </a>
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
              min={10}
              value={guests}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || parseInt(val) >= 10) {
                  setGuests(val);
                  setGuestsError("");
                } else {
                  setGuests("10");
                  setGuestsError("");
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
              <p className="mt-1 text-xs text-gray-400">⚠️ {t("minGuests")}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("dateLabel")} *</label>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              filterDate={filterDate}
              minDate={(() => { const d = new Date(); d.setDate(d.getDate() + 5); return d; })()}
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
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("emailLabel")} *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
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
