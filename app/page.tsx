import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroBanner } from '@/components/hero-banner';
import { Features } from '@/components/features';
import { Testimonials } from '@/components/testimonials';
import { PricingSection } from '@/components/pricing-section';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <Features />
        <Testimonials />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}