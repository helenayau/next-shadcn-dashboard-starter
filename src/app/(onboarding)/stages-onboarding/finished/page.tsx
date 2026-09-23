import type { Metadata } from 'next';
import { Icons } from '@/components/icons';
import { StagesHeader } from '../_components/stages-header';

export const metadata: Metadata = {
  title: { absolute: 'Prudential Stages for Retirement' }
};

/** Where the carousel ends: either pace lands here. */
export default function FinishedPage() {
  return (
    <main className='flex min-h-svh flex-col'>
      <StagesHeader />
      <section className='flex flex-1 flex-col items-center justify-center px-4 pb-[63px] text-center'>
        <span className='grid size-[52px] place-items-center rounded-full bg-[#001F45]'>
          <Icons.check className='size-8 text-white' stroke={3} aria-hidden='true' />
        </span>
        <h1 className='mt-6 text-[28px] leading-tight font-bold sm:text-[32px]'>
          You’ve reached the end!
        </h1>
        <p className='mt-3 text-[19px]'>Thanks for your participation.</p>
      </section>
    </main>
  );
}
