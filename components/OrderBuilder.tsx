"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Upload, AlertTriangle, CheckCircle2, Info } from "lucide-react";

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
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dateError, setDateError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

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
    if (!flavor || !guests || !date || !name || !email) return;

    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("flavor", flavor);
    body.append("guests", guests);
    body.append("date", date ? date.toLocaleDateString("de-CH") : "");
    body.append("_subject", `Neue Bestellung von ${name}`);
    body.append("_replyto", email);
    if (file) body.append("reference", file);

    try {
      await fetch("https://formspree.io/f/xqevwbzj", {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
    } catch {}

    setSubmitted(true);
  };

  const filterDate = (d: Date) => !isSunday(d) && !isPast(d);

  if (submitted) {
    return (
      <section id="order" className="py-20 md:py-28 bg-white/40">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-pink-100">
            <CheckCircle2 size={64} className="text-pink-500 mx-auto mb-4" />
            <h2 className="text-3xl font-script text-pink-700 mb-3">{t("successTitle")}</h2>
            <p className="text-gray-600">{t("successMsg")}</p>
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

          {/* Guests */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("guestsLabel")} *</label>
            <input
              type="number"
              min={10}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder={t("guestsPlaceholder")}
              required
              className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400"
            />
            <p className="mt-1 text-xs text-gray-400">⚠️ {t("minGuests")}</p>
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

          {/* File upload */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("referenceLabel")}</label>
            <input
              type="file"
              ref={fileRef}
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-pink-200 rounded-xl text-pink-600 hover:bg-pink-50 hover:border-pink-400 transition-all text-sm font-medium"
            >
              <Upload size={18} />
              {file ? file.name : t("referenceBtn")}
            </button>
            <p className="mt-1 text-xs text-gray-400">{t("referenceNote")}</p>
          </div>

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
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("phoneLabel")}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("phonePlaceholder")}
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
          <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl p-3">
            <Info size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <span>{t("legalNote")}</span>
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
