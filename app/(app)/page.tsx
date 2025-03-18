import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Services } from '@/components/services';
import { Testimonials } from '@/components/testimonials';
import { CTA } from '@/components/cta';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <CTA />
    </main>
  );
}