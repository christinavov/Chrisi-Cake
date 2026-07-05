import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function ReviewsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20 md:pt-24">
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
