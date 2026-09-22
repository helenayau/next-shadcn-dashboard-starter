import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StagesHeader } from '../_components/stages-header';

const PACES: Record<string, { title: string; description: string }> = {
  'quick-onboarding': {
    title: 'Quick onboarding',
    description: 'Answer a few questions for a quick snapshot.'
  },
  'complete-onboarding': {
    title: 'Complete onboarding',
    description: 'Answer detailed questions for a comprehensive view.'
  }
};

export function generateStaticParams() {
  return Object.keys(PACES).map((pace) => ({ pace }));
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: { absolute: 'Prudential Stages for Retirement' }
};

/**
 * Stand-in for the two onboarding questionnaires, which are out of scope for
 * this prototype: it confirms the choice and offers a way back.
 */
export default async function PacePage({ params }: { params: Promise<{ pace: string }> }) {
  const { pace } = await params;
  const content = PACES[pace];
  if (!content) notFound();

  return (
    <main>
      <StagesHeader />
      <section className='mx-auto w-full max-w-[760px] px-4 pt-14 pb-16 text-center sm:pt-20'>
        <h1 className='text-[26px] leading-tight font-bold sm:text-[32px]'>{content.title}</h1>
        <p className='mt-3 text-[17px]'>{content.description}</p>
        <p className='mx-auto mt-8 max-w-[520px] rounded-lg bg-white px-6 py-8 text-[16px] leading-relaxed'>
          This is where the {content.title.toLowerCase()} questions will begin.
        </p>
        <Link
          href='/stages-onboarding/list'
          className='mt-8 inline-block text-[15px] font-semibold text-[#0066CC] hover:underline'
        >
          Start over
        </Link>
      </section>
    </main>
  );
}
