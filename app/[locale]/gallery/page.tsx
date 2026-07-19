import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20 md:pt-24">
        <Gallery />
      </div>
      <Footer />
    </main>
  );
}
