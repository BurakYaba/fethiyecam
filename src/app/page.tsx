import dynamicImport from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockRenderer from "@/components/BlockRenderer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import About from "@/components/About";
import Features from "@/components/Features";
import Satisfaction from "@/components/Satisfaction";
import FAQ from "@/components/FAQ";
import { db } from "@/lib/db";

// Dynamic imports for below-fold components
const Gallery = dynamicImport(() => import("@/components/Gallery"), {
  loading: () => <div className="section-padding bg-cream" />,
});

const Testimonials = dynamicImport(() => import("@/components/Testimonials"), {
  loading: () => <div className="section-padding" />,
});

const Tips = dynamicImport(() => import("@/components/Tips"), {
  loading: () => <div className="section-padding bg-cream" />,
});

const CTA = dynamicImport(() => import("@/components/CTA"), {
  loading: () => <div className="section-padding bg-cream" />,
});

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  // Fetch content blocks for home page
  let blocks: any[] = [];
  try {
    blocks = await db.contentBlock.findMany({
      where: {
        page: 'home',
        visible: true,
      },
      include: {
        image: true,
      },
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Failed to fetch content blocks:', error);
  }

  // If no blocks exist, use default component structure (backward compatibility)
  const useBlocks = blocks.length > 0;

  return (
    <>
      <Header />
      <main>
        {useBlocks ? (
          <BlockRenderer blocks={blocks} />
        ) : (
          <>
            {/* Fallback to default components if no blocks configured */}
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
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
