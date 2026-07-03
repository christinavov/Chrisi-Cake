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
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><Gallery /></ScrollReveal>
      <ScrollReveal><Flavors /></ScrollReveal>
      <ScrollReveal><OrderBuilder /></ScrollReveal>
      <ScrollReveal><Prices /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><StorageTips /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
      <Footer />
    </main>
  );
}
