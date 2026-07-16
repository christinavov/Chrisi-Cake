"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertTriangle, CheckCircle2, MessageCircle, Info, ChevronDown } from "lucide-react";

const COUNTRIES = [
  { code: "CH", name: "Schweiz",        dial: "+41",  flag: "🇨🇭" },
  { code: "DE", name: "Deutschland",    dial: "+49",  flag: "🇩🇪" },
  { code: "AT", name: "Österreich",     dial: "+43",  flag: "🇦🇹" },
  { code: "FR", name: "Frankreich",     dial: "+33",  flag: "🇫🇷" },
  { code: "IT", name: "Italien",        dial: "+39",  flag: "🇮🇹" },
  { code: "UA", name: "Ukraine",        dial: "+380", flag: "🇺🇦" },
  { code: "RU", name: "Russland",       dial: "+7",   flag: "🇷🇺" },
  { code: "GB", name: "Grossbritannien",dial: "+44",  flag: "🇬🇧" },
  { code: "US", name: "USA",            dial: "+1",   flag: "🇺🇸" },
  { code: "PL", name: "Polen",          dial: "+48",  flag: "🇵🇱" },
  { code: "ES", name: "Spanien",        dial: "+34",  flag: "🇪🇸" },
  { code: "NL", name: "Niederlande",    dial: "+31",  flag: "🇳🇱" },
  { code: "BE", name: "Belgien",        dial: "+32",  flag: "🇧🇪" },
  { code: "SE", name: "Schweden",       dial: "+46",  flag: "🇸🇪" },
  { code: "NO", name: "Norwegen",       dial: "+47",  flag: "🇳🇴" },
  { code: "DK", name: "Dänemark",       dial: "+45",  flag: "🇩🇰" },
  { code: "FI", name: "Finnland",       dial: "+358", flag: "🇫🇮" },
  { code: "PT", name: "Portugal",       dial: "+351", flag: "🇵🇹" },
  { code: "GR", name: "Griechenland",   dial: "+30",  flag: "🇬🇷" },
  { code: "CZ", name: "Tschechien",     dial: "+420", flag: "🇨🇿" },
  { code: "SK", name: "Slowakei",       dial: "+421", flag: "🇸🇰" },
  { code: "HU", name: "Ungarn",         dial: "+36",  flag: "🇭🇺" },
  { code: "RO", name: "Rumänien",       dial: "+40",  flag: "🇷🇴" },
  { code: "BG", name: "Bulgarien",      dial: "+359", flag: "🇧🇬" },
  { code: "HR", name: "Kroatien",       dial: "+385", flag: "🇭🇷" },
  { code: "RS", name: "Serbien",        dial: "+381", flag: "🇷🇸" },
  { code: "SI", name: "Slowenien",      dial: "+386", flag: "🇸🇮" },
  { code: "BA", name: "Bosnien",        dial: "+387", flag: "🇧🇦" },
  { code: "MK", name: "Nordmazedonien", dial: "+389", flag: "🇲🇰" },
  { code: "AL", name: "Albanien",       dial: "+355", flag: "🇦🇱" },
  { code: "ME", name: "Montenegro",     dial: "+382", flag: "🇲🇪" },
  { code: "MD", name: "Moldau",         dial: "+373", flag: "🇲🇩" },
  { code: "BY", name: "Belarus",        dial: "+375", flag: "🇧🇾" },
  { code: "LT", name: "Litauen",        dial: "+370", flag: "🇱🇹" },
  { code: "LV", name: "Lettland",       dial: "+371", flag: "🇱🇻" },
  { code: "EE", name: "Estland",        dial: "+372", flag: "🇪🇪" },
  { code: "LU", name: "Luxemburg",      dial: "+352", flag: "🇱🇺" },
  { code: "IE", name: "Irland",         dial: "+353", flag: "🇮🇪" },
  { code: "IS", name: "Island",         dial: "+354", flag: "🇮🇸" },
  { code: "MT", name: "Malta",          dial: "+356", flag: "🇲🇹" },
  { code: "CY", name: "Zypern",         dial: "+357", flag: "🇨🇾" },
  { code: "TR", name: "Türkei",         dial: "+90",  flag: "🇹🇷" },
  { code: "GE", name: "Georgien",       dial: "+995", flag: "🇬🇪" },
  { code: "AM", name: "Armenien",       dial: "+374", flag: "🇦🇲" },
  { code: "AZ", name: "Aserbaidschan",  dial: "+994", flag: "🇦🇿" },
  { code: "KZ", name: "Kasachstan",     dial: "+7",   flag: "🇰🇿" },
  { code: "UZ", name: "Usbekistan",     dial: "+998", flag: "🇺🇿" },
  { code: "IL", name: "Israel",         dial: "+972", flag: "🇮🇱" },
  { code: "SA", name: "Saudi-Arabien",  dial: "+966", flag: "🇸🇦" },
  { code: "AE", name: "Emirate",        dial: "+971", flag: "🇦🇪" },
  { code: "EG", name: "Ägypten",        dial: "+20",  flag: "🇪🇬" },
  { code: "MA", name: "Marokko",        dial: "+212", flag: "🇲🇦" },
  { code: "TN", name: "Tunesien",       dial: "+216", flag: "🇹🇳" },
  { code: "DZ", name: "Algerien",       dial: "+213", flag: "🇩🇿" },
  { code: "NG", name: "Nigeria",        dial: "+234", flag: "🇳🇬" },
  { code: "ZA", name: "Südafrika",      dial: "+27",  flag: "🇿🇦" },
  { code: "KE", name: "Kenia",          dial: "+254", flag: "🇰🇪" },
  { code: "ET", name: "Äthiopien",      dial: "+251", flag: "🇪🇹" },
  { code: "GH", name: "Ghana",          dial: "+233", flag: "🇬🇭" },
  { code: "SN", name: "Senegal",        dial: "+221", flag: "🇸🇳" },
  { code: "CI", name: "Elfenbeinküste", dial: "+225", flag: "🇨🇮" },
  { code: "CM", name: "Kamerun",        dial: "+237", flag: "🇨🇲" },
  { code: "IN", name: "Indien",         dial: "+91",  flag: "🇮🇳" },
  { code: "PK", name: "Pakistan",       dial: "+92",  flag: "🇵🇰" },
  { code: "BD", name: "Bangladesch",    dial: "+880", flag: "🇧🇩" },
  { code: "LK", name: "Sri Lanka",      dial: "+94",  flag: "🇱🇰" },
  { code: "NP", name: "Nepal",          dial: "+977", flag: "🇳🇵" },
  { code: "AF", name: "Afghanistan",    dial: "+93",  flag: "🇦🇫" },
  { code: "IR", name: "Iran",           dial: "+98",  flag: "🇮🇷" },
  { code: "IQ", name: "Irak",           dial: "+964", flag: "🇮🇶" },
  { code: "SY", name: "Syrien",         dial: "+963", flag: "🇸🇾" },
  { code: "LB", name: "Libanon",        dial: "+961", flag: "🇱🇧" },
  { code: "JO", name: "Jordanien",      dial: "+962", flag: "🇯🇴" },
  { code: "CN", name: "China",          dial: "+86",  flag: "🇨🇳" },
  { code: "JP", name: "Japan",          dial: "+81",  flag: "🇯🇵" },
  { code: "KR", name: "Südkorea",       dial: "+82",  flag: "🇰🇷" },
  { code: "VN", name: "Vietnam",        dial: "+84",  flag: "🇻🇳" },
  { code: "TH", name: "Thailand",       dial: "+66",  flag: "🇹🇭" },
  { code: "ID", name: "Indonesien",     dial: "+62",  flag: "🇮🇩" },
  { code: "MY", name: "Malaysia",       dial: "+60",  flag: "🇲🇾" },
  { code: "PH", name: "Philippinen",    dial: "+63",  flag: "🇵🇭" },
  { code: "SG", name: "Singapur",       dial: "+65",  flag: "🇸🇬" },
  { code: "MM", name: "Myanmar",        dial: "+95",  flag: "🇲🇲" },
  { code: "KH", name: "Kambodscha",     dial: "+855", flag: "🇰🇭" },
  { code: "TW", name: "Taiwan",         dial: "+886", flag: "🇹🇼" },
  { code: "HK", name: "Hongkong",       dial: "+852", flag: "🇭🇰" },
  { code: "AU", name: "Australien",     dial: "+61",  flag: "🇦🇺" },
  { code: "NZ", name: "Neuseeland",     dial: "+64",  flag: "🇳🇿" },
  { code: "CA", name: "Kanada",         dial: "+1",   flag: "🇨🇦" },
  { code: "MX", name: "Mexiko",         dial: "+52",  flag: "🇲🇽" },
  { code: "BR", name: "Brasilien",      dial: "+55",  flag: "🇧🇷" },
  { code: "AR", name: "Argentinien",    dial: "+54",  flag: "🇦🇷" },
  { code: "CL", name: "Chile",          dial: "+56",  flag: "🇨🇱" },
  { code: "CO", name: "Kolumbien",      dial: "+57",  flag: "🇨🇴" },
  { code: "PE", name: "Peru",           dial: "+51",  flag: "🇵🇪" },
  { code: "VE", name: "Venezuela",      dial: "+58",  flag: "🇻🇪" },
  { code: "EC", name: "Ecuador",        dial: "+593", flag: "🇪🇨" },
  { code: "UY", name: "Uruguay",        dial: "+598", flag: "🇺🇾" },
  { code: "PY", name: "Paraguay",       dial: "+595", flag: "🇵🇾" },
  { code: "BO", name: "Bolivien",       dial: "+591", flag: "🇧🇴" },
  { code: "CU", name: "Kuba",           dial: "+53",  flag: "🇨🇺" },
  { code: "DO", name: "Dom. Republik",  dial: "+1",   flag: "🇩🇴" },
];

const flavorPrices: Record<string, number> = {
  spinatHimbeere: 11, oreo: 11, spinatZitrone: 11, schockiOrange: 11,
  caramelBanane: 12, snickers: 12, kokosMango: 12, schokoMango: 12, blaubeereLemon: 12, makMalinaLimon: 12, malinaKokos: 12,
  schockiHimbeere: 10, rotVelvetErdbeere: 10, vanillaErdbeere: 10, vanillaHimbeere: 10,
};

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
  | "makMalinaLimon"
  | "malinaKokos";

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
  "kokosMango",
  "schokoMango",
  "blaubeereLemon",
  "makMalinaLimon",
  "malinaKokos",
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

  const [flavor, setFlavor] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedFlavor");
      if (saved) { localStorage.removeItem("selectedFlavor"); return saved; }
    }
    return "";
  });
  const [flavorOpen, setFlavorOpen] = useState(false);
  const flavorRef = useRef<HTMLDivElement>(null);
  const [occasion, setOccasion] = useState("");
  const [twoTier, setTwoTier] = useState(false);
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+41");
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const selectedCountry = COUNTRIES.find((c) => c.dial === countryCode) ?? COUNTRIES[0];
  const [details, setDetails] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [submitted, setSubmitted] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("orderSubmitted") === "1";
    }
    return false;
  });
  const [waUrl, setWaUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("orderWaUrl") || "";
    }
    return "";
  });
  const [dateError, setDateError] = useState("");
  const [guestsError, setGuestsError] = useState("");
  const [timeError, setTimeError] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onFlavorSelected = (e: Event) => {
      const key = (e as CustomEvent<string>).detail;
      if (key) setFlavor(key);
    };
    window.addEventListener("flavorSelected", onFlavorSelected);
    return () => window.removeEventListener("flavorSelected", onFlavorSelected);
  }, []);

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        document.getElementById("order-success")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [submitted]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (flavorRef.current && !flavorRef.current.contains(e.target as Node)) {
        setFlavorOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const minGuests = twoTier ? 20 : 10;
  const maxGuests = twoTier ? undefined : 25;

  const flavorPrice = flavor ? flavorPrices[flavor] : null;
  const guestsNum = guests ? parseInt(guests) : null;
  const pricePerPerson = flavorPrice !== null ? flavorPrice + (twoTier ? 3 : 0) : null;
  const totalPrice = pricePerPerson !== null && guestsNum !== null && !isNaN(guestsNum) ? pricePerPerson * guestsNum : null;

  const handleTierChange = (val: boolean) => {
    setTwoTier(val);
    setGuestsError("");
    if (val && guests && parseInt(guests) < 20) setGuests("20");
    if (!val && guests && parseInt(guests) > 25) setGuests("25");
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

    const newErrors: Record<string, boolean> = {};
    if (!flavor) newErrors.flavor = true;
    if (!guests) newErrors.guests = true;
    if (guests && parseInt(guests) < minGuests) {
      newErrors.guests = true;
      setGuestsError(twoTier ? t("minGuestsErrorTwo") : t("minGuestsError"));
    } else if (guests && !twoTier && parseInt(guests) > 25) {
      newErrors.guests = true;
      setGuestsError(t("maxGuestsErrorOne"));
    } else {
      setGuestsError("");
    }
    if (!date) newErrors.date = true;
    if (!pickupTime) { newErrors.pickupTime = true; setTimeError(true); }
    else setTimeError(false);
    if (!name) newErrors.name = true;
    if (!phone) newErrors.phone = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const order = ["flavor", "guests", "date", "pickupTime", "name", "phone"];
      const first = order.find((k) => newErrors[k]);
      if (first) {
        const el = document.getElementById(`field-${first}`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const flavorName = tf(`items.${flavor as FlavorKey}.name`);
    const tierLabel = twoTier ? "Zweistöckig (2 Etagen)" : "Einstöckig (1 Etage)";
    const dateStr = date ? date.toLocaleDateString("de-CH") : "—";
    const occasionMap: Record<string, string> = {
      birthday:    "Geburtstag",
      wedding:     "Hochzeit",
      anniversary: "Jubiläum",
      babyshower:  "Babyshower",
      other:       "Sonstiges",
    };
    const occasionLabel = occasion ? (occasionMap[occasion] ?? occasion) : "—";
    const emailLine = email ? `\nE-Mail: ${email}` : "";
    const detailsLine = details ? `\nWünsche: ${details}` : "";

    const calcFlavorPrice = flavorPrices[flavor] ?? 0;
    const calcPricePerPerson = calcFlavorPrice + (twoTier ? 3 : 0);
    const calcTotal = calcPricePerPerson * parseInt(guests);
    const priceLine = `\n\n*Geschätzter Preis:* ${calcFlavorPrice} CHF${twoTier ? " + 3 CHF (2-stöckig)" : ""} × ${guests} Personen = *${calcTotal} CHF*`;

    const msg = [
      "*Neue Tortenbestellung*",
      "",
      `*Name:* ${name}`,
      `*Telefon:* ${countryCode} ${phone}${emailLine}`,
      "",
      `*Geschmack:* ${flavorName}`,
      `*Tortenart:* ${tierLabel}`,
      `*Gaeste:* ${guests} Personen`,
      `*Abholdatum:* ${dateStr}${pickupTime ? ` um ${pickupTime} Uhr` : ""}`,
      `*Anlass:* ${occasionLabel}${detailsLine}${priceLine}`,
    ].join("\n");

    const url = `https://wa.me/41762236126?text=${encodeURIComponent(msg)}`;
    setWaUrl(url);
    setSubmitted(true);
    sessionStorage.setItem("orderSubmitted", "1");
    sessionStorage.setItem("orderWaUrl", url);

    if (window.innerWidth >= 768) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  const filterDate = (d: Date) => !isSunday(d) && !isPast(d);

  if (submitted) {
    return (
      <section id="order-success" className="py-20 md:py-28 bg-white/40">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-pink-100 space-y-5">
            <div className="text-6xl">🎂</div>
            <h2 className="text-3xl md:text-4xl font-script text-pink-700">{t("successTitle")}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{t("successMsg")}</p>
            <div className="pt-1">
              <p className="text-gray-500 text-sm mb-4">{t("successStorageHint")}</p>
              <button
                onClick={() => { sessionStorage.removeItem("orderSubmitted"); sessionStorage.removeItem("orderWaUrl"); document.getElementById("storage")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("successStorageBtn")} →
              </button>
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
        <div className="mb-4 flex items-start gap-3 bg-gradient-to-r from-pink-50 to-rose-50 border-l-4 border-pink-500 rounded-xl p-4">
          <AlertTriangle size={20} className="text-pink-600 flex-shrink-0 mt-0.5" />
          <p className="text-pink-800 font-medium text-sm">{t("importantNote")}</p>
        </div>

        {/* WhatsApp photo hint */}
        <div className="mb-8 flex items-start gap-3 bg-gradient-to-r from-pink-100 to-rose-100 border border-pink-300 rounded-xl p-4">
          <MessageCircle size={20} className="text-pink-500 flex-shrink-0 mt-0.5" />
          <p className="text-pink-800 text-sm">{t("photoHint")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/90 rounded-3xl shadow-xl border border-pink-100 p-6 md:p-10 space-y-6">
          {/* Flavor — custom dropdown */}
          <div id="field-flavor" ref={flavorRef} className="relative">
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("flavorLabel")} *</label>
            <button
              type="button"
              onClick={() => setFlavorOpen((o) => !o)}
              className={`w-full px-4 py-3 border rounded-xl bg-white text-left flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 ${errors.flavor ? "border-red-400 ring-1 ring-red-300" : flavorOpen ? "border-pink-400 ring-2 ring-pink-200" : "border-pink-200"}`}
            >
              {flavor ? (
                <span className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-gray-800 font-medium truncate">{tf(`items.${flavor as FlavorKey}.name`)}</span>
                  <span className="ml-auto text-pink-500 font-semibold text-sm whitespace-nowrap">{flavorPrices[flavor]} CHF/Person</span>
                </span>
              ) : (
                <span className="text-gray-400">{t("flavorPlaceholder")}</span>
              )}
              <ChevronDown size={18} className={`ml-2 flex-shrink-0 text-pink-400 transition-transform duration-200 ${flavorOpen ? "rotate-180" : ""}`} />
            </button>

            {flavorOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-pink-200 rounded-2xl shadow-xl shadow-pink-100 overflow-hidden">
                <div className="max-h-64 overflow-y-auto py-1">
                  {flavorKeys.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => { setFlavor(k); setFlavorOpen(false); setErrors((p) => ({ ...p, flavor: false })); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                        flavor === k
                          ? "bg-pink-50 text-pink-700"
                          : "hover:bg-pink-50/70 text-gray-700"
                      }`}
                    >
                      <span className={`font-medium text-sm ${flavor === k ? "text-pink-700" : "text-gray-800"}`}>
                        {tf(`items.${k}.name`)}
                      </span>
                      <span className="ml-4 text-xs font-semibold text-pink-400 whitespace-nowrap font-mono">
                        {flavorPrices[k]} CHF
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {flavor ? (
              <p className="mt-2 text-xs text-gray-500 flex items-start gap-1">
                <Info size={12} className="mt-0.5 flex-shrink-0 text-pink-400" />
                {tf(`items.${flavor as FlavorKey}.desc`)}
              </p>
            ) : errors.flavor && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12} /> {t("fieldRequired")}</p>
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
          <div id="field-guests">
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("guestsLabel")} *</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min={minGuests}
              max={maxGuests}
              value={guests}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setGuests(val);
                setGuestsError("");
                setErrors((p) => ({ ...p, guests: false }));
              }}
              onBlur={(e) => {
                const raw = parseInt(e.target.value);
                if (!isNaN(raw)) {
                  // round to nearest multiple of 5
                  let val = Math.round(raw / 5) * 5;
                  if (val < minGuests) val = minGuests;
                  if (!twoTier && val > 25) val = 25;
                  setGuests(String(val));
                  if (val < minGuests) {
                    setGuestsError(twoTier ? t("minGuestsErrorTwo") : t("minGuestsError"));
                  } else if (!twoTier && raw > 25) {
                    setGuestsError(t("maxGuestsErrorOne"));
                  }
                }
              }}
              placeholder={t("guestsPlaceholder")}
              required
              className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400 ${guestsError || errors.guests ? "border-red-400 ring-1 ring-red-300" : "border-pink-200"}`}
            />
            {guestsError ? (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle size={12} /> {guestsError}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-400">⚠️ {twoTier ? t("tierTwoNote") : t("minGuests")}</p>
            )}
          </div>

          {/* Price summary */}
          {totalPrice !== null && (
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl px-5 py-4">
              <p className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-2">Geschätzter Preis</p>
              <div className="flex items-end justify-between gap-2">
                <div className="text-sm text-gray-600 space-y-0.5">
                  <p>{flavorPrice} CHF/Person{twoTier ? <span className="text-pink-500"> + 3 CHF (2-stöckig)</span> : null} × {guestsNum} Personen</p>
                </div>
                <p className="text-3xl font-bold text-pink-600 leading-none">{totalPrice} <span className="text-lg font-semibold">CHF</span></p>
              </div>
              <p className="text-xs text-gray-400 mt-2">* Endpreis wird bei der Bestätigung mitgeteilt</p>
            </div>
          )}

          {/* Date */}
          <div id="field-date">
            <label className="block text-sm font-semibold text-pink-800 mb-2">{t("dateLabel")} *</label>
            <DatePicker
              selected={date}
              onChange={(d) => { handleDateChange(d); setErrors((p) => ({ ...p, date: false })); }}
              filterDate={filterDate}
              minDate={(() => { const d = new Date(); d.setDate(d.getDate() + 3); return d; })()}
              placeholderText={t("datePlaceholder")}
              dateFormat="dd.MM.yyyy"
              className={`w-full ${errors.date ? "border-red-400 ring-1 ring-red-300 rounded-xl" : ""}`}
            />
            {dateError ? (
              <p className="mt-2 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12} /> {dateError}</p>
            ) : errors.date && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12} /> {t("fieldRequired")}</p>
            )}
            <div className="mt-3 rounded-xl bg-pink-50 border border-pink-200 px-4 py-3">
              <p className="text-sm font-medium text-pink-700">📅 {t("dateNote")}</p>
            </div>

            {/* Pickup time */}
            <div className="mt-4" id="field-pickupTime">
              <label className="block text-sm font-semibold text-pink-800 mb-2">{t("pickupTimeLabel")} *</label>
              <div className="grid grid-cols-3 gap-3">
                {["18:00", "19:00", "20:00"].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => { setPickupTime(time); setTimeError(false); }}
                    className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      pickupTime === time
                        ? "border-pink-400 bg-pink-50 text-pink-700 shadow-sm"
                        : timeError
                        ? "border-red-300 bg-white text-gray-600 hover:border-pink-200"
                        : "border-pink-100 bg-white text-gray-600 hover:border-pink-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {timeError && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertTriangle size={12} /> {t("pickupTimeError")}
                </p>
              )}
            </div>
          </div>


          <div className="border-t border-pink-100 pt-6 space-y-4">
            {/* Name */}
            <div id="field-name">
              <label className="block text-sm font-semibold text-pink-800 mb-2">{t("nameLabel")} *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: false })); }}
                placeholder={t("namePlaceholder")}
                className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400 ${errors.name ? "border-red-400 ring-1 ring-red-300" : "border-pink-200"}`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12} /> {t("fieldRequired")}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("emailLabel")} <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-gray-400"
                />
              </div>
              <div id="field-phone">
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("phoneLabel")} *</label>
                <div className={`flex border rounded-xl bg-white transition-all ${errors.phone ? "border-red-400 ring-1 ring-red-300" : "border-pink-200"} focus-within:ring-2 focus-within:ring-pink-300 focus-within:border-pink-400`}>
                  {/* Custom country dropdown */}
                  <div ref={countryRef} className="relative flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setCountryOpen((o) => !o)}
                      className="flex items-center gap-1.5 px-3 py-3 bg-pink-50 border-r border-pink-200 rounded-l-xl h-full focus:outline-none hover:bg-pink-100 transition-colors"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`} width={20} height={15} alt={selectedCountry.name} className="rounded-sm object-cover" />
                      <span className="text-sm font-semibold text-pink-700">{selectedCountry.dial}</span>
                      <ChevronDown size={14} className={`text-pink-400 transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`} />
                    </button>

                    {countryOpen && (
                      <div className="absolute z-50 top-full left-0 mt-1 w-56 bg-white border border-pink-200 rounded-2xl shadow-xl shadow-pink-100 overflow-hidden">
                        <div className="max-h-60 overflow-y-auto py-1">
                          {COUNTRIES.map(({ code, name, dial, flag }) => (
                            <button
                              key={code}
                              type="button"
                              onClick={() => { setCountryCode(dial); setCountryOpen(false); }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                countryCode === dial && selectedCountry.code === code
                                  ? "bg-pink-50 text-pink-700"
                                  : "hover:bg-pink-50/70 text-gray-700"
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`} width={20} height={15} alt={name} className="rounded-sm object-cover flex-shrink-0" />
                              <span className="flex-1 text-sm font-medium truncate">{name}</span>
                              <span className="text-xs text-pink-400 font-mono font-semibold">{dial}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => { const v = e.target.value.replace(/[^0-9\s\-()]/g, ""); setPhone(v); setErrors((p) => ({ ...p, phone: false })); }}
                    placeholder="76 223 61 26"
                    className="flex-1 px-3 py-3 bg-white text-gray-800 focus:outline-none placeholder:text-gray-400 text-sm rounded-r-xl"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12} /> {t("fieldRequired")}</p>}
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
