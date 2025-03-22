import { ActiveAlerts } from '@/components/ui/active-alerts';
// Import async server components
import Hero from '@/components/content/hero';
import TeamSection from '@/components/content/team-section';
import PracticeInfo from '@/components/content/practice-info';
import Services from '@/components/content/services';
import Testimonials from '@/components/content/testimonials';

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