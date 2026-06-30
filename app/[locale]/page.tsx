import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Flavors from "@/components/Flavors";
import OrderBuilder from "@/components/OrderBuilder";
import Prices from "@/components/Prices";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import StorageTips from "@/components/StorageTips";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Flavors />
      <OrderBuilder />
      <Prices />
      <FAQ />
      <Testimonials />
      <StorageTips />
      <Contact />
      <Footer />
    </main>
  );
}
