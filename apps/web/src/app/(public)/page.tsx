import { Nav } from '@/components/sections/nav';
import { Hero } from '@/components/sections/hero';
import { BentoStats } from '@/components/sections/bento-stats';
import { FeatureCards } from '@/components/sections/feature-cards';
import { Testimonials } from '@/components/sections/testimonials';
import { CTASection } from '@/components/sections/cta-section';
import { Footer } from '@/components/sections/footer';

function SectionSpacer() {
  return <div style={{ height: 'clamp(100px, 12vw, 180px)' }} />;
}

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <SectionSpacer />
      <BentoStats />
      <SectionSpacer />
      <FeatureCards />
      <SectionSpacer />
      <Testimonials />
      <SectionSpacer />
      <CTASection />
      <div style={{ height: 'clamp(60px, 8vw, 120px)' }} />
      <Footer />
    </main>
  );
}
