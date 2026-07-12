import type { Metadata } from "next";
import { Inter, Dancing_Script, Pacifico } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import HashScroll from "@/components/HashScroll";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico" });

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
    title: "Chrisi Cake",
    description: "Handgefertigte Traumtorten auf Bestellung in Bern, Schweiz",
    type: "website",
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
      <body className={`${inter.variable} ${dancing.variable} ${pacifico.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <HashScroll />
          <ScrollToTop />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
