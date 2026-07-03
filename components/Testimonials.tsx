"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useRef } from "react";
import { Star, Upload, X, CheckCircle } from "lucide-react";

const reviewImages = [
  "/images/reviews/photo_2026-07-03_20-12-03.jpg",
  "/images/reviews/photo_2026-07-03_20-12-04.jpg",
  "/images/reviews/photo_2026-07-03_20-12-05.jpg",
  "/images/reviews/photo_2026-07-03_20-12-06.jpg",
  "/images/reviews/photo_2026-07-03_20-12-08.jpg",
  "/images/reviews/photo_2026-07-03_20-12-09.jpg",
  "/images/reviews/photo_2026-07-03_20-12-10.jpg",
  "/images/reviews/photo_2026-07-03_20-12-12.jpg",
  "/images/reviews/photo_2026-07-03_20-12-13.jpg",
  "/images/reviews/photo_2026-07-03_20-12-14.jpg",
  "/images/reviews/photo_2026-07-03_20-12-16.jpg",
  "/images/reviews/photo_2026-07-03_20-12-17.jpg",
  "/images/reviews/photo_2026-07-03_20-12-19.jpg",
  "/images/reviews/photo_2026-07-03_20-12-20.jpg",
  "/images/reviews/photo_2026-07-03_20-12-22.jpg",
];

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [selected, setSelected] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text || rating === 0) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rating", String(rating));
    formData.append("text", text);
    formData.append("_subject", `Neue Bewertung von ${name} – ${rating}★`);
    formData.append("_replyto", "chrisicake8@gmail.com");
    if (photo) formData.append("photo", photo);

    try {
      await fetch("https://formspree.io/f/xqevwbzj", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
    } catch {}

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-script text-pink-700">{t("title")}</h2>
        <p className="text-gray-500 mt-3 text-lg">{t("subtitle")}</p>
      </div>

      {/* Review photo grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {reviewImages.map((src) => (
          <div
            key={src}
            onClick={() => setSelected(src)}
            className="break-inside-avoid cursor-pointer rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <Image
              src={src}
              alt="Kundenbewertung"
              width={400}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <div className="relative max-w-2xl w-full">
            <Image
              src={selected}
              alt="Bewertung"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-white/90 rounded-full w-9 h-9 flex items-center justify-center text-pink-700 font-bold text-lg hover:bg-white transition"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Review form */}
      <div className="mt-16 max-w-2xl mx-auto">
        <div className="bg-white/90 border border-pink-100 rounded-3xl shadow-sm p-8">
          <h3 className="text-2xl font-script text-pink-700 mb-1">{t("formTitle")}</h3>
          <p className="text-gray-500 text-sm mb-6">{t("formSubtitle")}</p>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle size={48} className="text-pink-400" />
              <p className="text-lg font-semibold text-pink-700">{t("formSuccess")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star rating */}
              <div>
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("formRating")}</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(0)}
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          s <= (hovered || rating) ? "text-pink-400 fill-pink-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("formName")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder={t("formNamePlaceholder")}
                  className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Text */}
              <div>
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("formText")}</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  rows={4}
                  placeholder={t("formTextPlaceholder")}
                  className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                />
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-sm font-semibold text-pink-800 mb-2">{t("formPhoto")}</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-pink-200 rounded-xl p-5 text-center cursor-pointer hover:border-pink-400 transition"
                >
                  {photoPreview ? (
                    <div className="relative inline-block">
                      <Image src={photoPreview} alt="preview" width={200} height={150} className="rounded-xl object-cover mx-auto" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPhoto(null); setPhotoPreview(null); }}
                        className="absolute -top-2 -right-2 bg-white border border-pink-200 rounded-full p-0.5 text-pink-600 hover:bg-pink-50"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Upload size={24} className="text-pink-300" />
                      <span className="text-sm">{t("formPhotoHint")}</span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              </div>

              <button
                type="submit"
                disabled={loading || rating === 0}
                className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all"
              >
                {loading ? "..." : t("formSubmit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
