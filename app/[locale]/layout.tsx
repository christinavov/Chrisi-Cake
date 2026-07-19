import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import HashScroll from "@/components/HashScroll";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Chrisi Cake",
  description:
    "Handgefertigte Torten auf Bestellung in Bern. Moderne Dekorationstechniken, frische Zutaten, kein Fondant. Mindestbestellung ab 10 Personen.",
  keywords: "Torte, Hochzeitstorte, Geburtstagstorte, Bern, Schweiz, custom cake, auf Bestellung",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Chrisi Cake – Handgefertigte Torten in Bern",
    description: "Traumtorten auf Bestellung – frische Zutaten, kein Fondant, kein Gelatine. Abholung Mo–Sa in Bern.",
    type: "website",
    url: "https://chrisicake.ch",
    siteName: "Chrisi Cake",
    images: [
      {
        url: "https://chrisicake.ch/images/gallery/photo_2026-07-03_21-01-13.jpg",
        width: 1200,
        height: 900,
        alt: "Chrisi Cake – Handgefertigte Torte",
      },
    ],
    locale: "de_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chrisi Cake – Handgefertigte Torten in Bern",
    description: "Traumtorten auf Bestellung – frische Zutaten, kein Fondant, kein Gelatine.",
    images: ["https://chrisicake.ch/images/gallery/photo_2026-07-03_21-01-13.jpg"],
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} ${dancing.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <HashScroll />
          <ScrollToTop />
          <WhatsAppButton />
          {/* Fixed pink vignette frame over entire site */}
          <div
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{
              boxShadow: "inset 0 0 80px 40px rgba(236,72,153,0.18), inset 0 0 160px 80px rgba(251,207,232,0.12)",
              borderRadius: 0,
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
