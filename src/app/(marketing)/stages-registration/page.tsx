import type { Metadata } from 'next';
import { SiteHeader } from './_components/site-header';
import { HeroSection } from './_components/hero-section';
import { GuidanceSection } from './_components/guidance-section';

export const metadata: Metadata = {
  title: 'Stages for Retirement'
};

export default function StagesRegistrationPage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <GuidanceSection />
    </main>
  );
}
