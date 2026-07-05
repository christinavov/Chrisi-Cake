import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function GalleryPage() {
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
