import { SiteHeader } from './site-header';
import { RegistrationAside } from './registration-aside';

/**
 * The page chrome both A/B arms render into: navy header, pale-blue canvas,
 * the form column on the left and the advisor rail on the right. Arms supply
 * only the form column, so nothing but pagination differs between them.
 */
export function RegistrationShell({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-svh bg-[#E2F4FF]'>
      <SiteHeader />
      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:py-14'>
        <div className='w-full lg:max-w-[620px]'>{children}</div>
        <RegistrationAside />
      </div>
    </main>
  );
}

/** The h1 + supporting line, held constant across both arms. */
export function RegistrationHeading({ description }: { description: string }) {
  return (
    <header>
      <h1 className='text-4xl leading-tight font-bold tracking-tight text-[#001F45] sm:text-5xl'>
        First, let&apos;s create your account
      </h1>
      <p className='mt-4 text-base text-[#001F45]'>{description}</p>
    </header>
  );
}
