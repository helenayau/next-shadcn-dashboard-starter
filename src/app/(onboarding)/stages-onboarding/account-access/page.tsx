import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: { absolute: 'Log in | Prudential' }
};

/**
 * Where "I'm an existing customer" leads: a still image of the Prudential
 * sign-in page. It is a mockup only, so nothing on it is clickable and the
 * prototype never sends anyone to the real site.
 */
export default function AccountAccessPage() {
  return (
    <main className='min-h-svh bg-white'>
      <Image
        src='/stages-onboarding/account-access.png'
        alt='Prudential sign-in page: Access your personal accounts'
        width={2160}
        height={1585}
        priority
        unoptimized
        draggable={false}
        className='mx-auto h-auto w-full max-w-[1440px] select-none'
      />
    </main>
  );
}
