import { Hero } from '@/components/content/hero';
import { PracticeInfo } from '@/components/content/practice-info';
import { Services } from '@/components/content/services';
import { TeamSection } from '@/components/content/team-section';
import { Testimonials } from '@/components/content/testimonials';
import { ActiveAlerts } from '@/components/ui/active-alerts';

export default function Home() {
  return (
    <main>
      <ActiveAlerts position="home" />
      <Hero />
      <PracticeInfo />
      <Services />
      <TeamSection />
      <Testimonials />
    </main>
  );
}