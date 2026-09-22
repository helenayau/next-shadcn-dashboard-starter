import type { Metadata } from 'next';
import Image from 'next/image';
import { AdvisorCallForm } from '../_components/advisor-call-form';
import { StagesHeader } from '../_components/stages-header';

export const metadata: Metadata = {
  title: { absolute: 'Schedule a call | Prudential Stages for Retirement' }
};

/** Where "I want to open an account" and "Connect with an advisor" lead. */
export default function ConnectWithAdvisorPage() {
  return (
    <div className='min-h-svh'>
      <main>
        <StagesHeader />
        <div className='px-4 pt-10 pb-20 sm:px-[61px] sm:pt-[70px]'>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-11'>
            <Image
              src='/stages-onboarding/schedule-call.png'
              alt=''
              width={474}
              height={366}
              priority
              unoptimized
              className='h-auto w-[158px] shrink-0 sm:-mt-3'
            />
            <div>
              <h1 className='text-[30px] leading-tight font-bold tracking-tight sm:text-[38px]'>
                Schedule a 30 min Zoom call.
              </h1>
              <p className='mt-5 max-w-[660px] text-[17px] leading-relaxed'>
                We’ll connect you with an advisor based on the date and time that works best for
                you. Let’s start with a date.
              </p>
            </div>
          </div>
          <div className='mt-10'>
            <AdvisorCallForm />
          </div>
        </div>
      </main>
    </div>
  );
}
