import { Hero } from '@/components/content/hero';
import { Features } from '@/components/content/features';
import { Services } from '@/components/content/services';
import { Testimonials } from '@/components/content/testimonials';
import { CTA } from '@/components/content/cta';
import { ActiveAlerts } from '@/components/ui/active-alerts';

export default function Home() {
  return (
    <main>
      <ActiveAlerts position="home" />
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <CTA />
    </main>
  );
}