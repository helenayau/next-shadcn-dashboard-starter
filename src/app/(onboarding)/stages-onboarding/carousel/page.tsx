import type { Metadata } from 'next';
import { PathCarousel } from '../_components/path-carousel';
import { StagesHeader } from '../_components/stages-header';

export const metadata: Metadata = {
  title: { absolute: 'Prudential Stages for Retirement' }
};

/** Version 1 of the retirement path selection: one option per slide. */
export default function CarouselPage() {
  return (
    <main>
      <StagesHeader />
      <PathCarousel />
    </main>
  );
}
