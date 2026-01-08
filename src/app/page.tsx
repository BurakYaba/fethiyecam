import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import About from "@/components/About";
import Features from "@/components/Features";
import Satisfaction from "@/components/Satisfaction";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// Dynamic imports for below-fold components
const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => <div className="section-padding bg-cream" />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="section-padding" />,
});

const Tips = dynamic(() => import("@/components/Tips"), {
  loading: () => <div className="section-padding bg-cream" />,
});

const CTA = dynamic(() => import("@/components/CTA"), {
  loading: () => <div className="section-padding bg-cream" />,
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <About />
        <Features />
        <Satisfaction />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Tips />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
