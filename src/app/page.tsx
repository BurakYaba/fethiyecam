import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import About from "@/components/About";
import Features from "@/components/Features";
import Satisfaction from "@/components/Satisfaction";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Tips from "@/components/Tips";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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
        <Testimonials />
        <FAQ />
        <Tips />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
