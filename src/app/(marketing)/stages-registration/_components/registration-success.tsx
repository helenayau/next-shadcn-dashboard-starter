'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { pruClass } from './registration-theme';

/**
 * The confirmation screen both arms land on once the account is created. It
 * is shared so the A/B test still measures pagination only: whichever way a
 * user filled the fields, the ending is identical.
 *
 * It carries the four things a confirmation screen is for — an unambiguous
 * statement that the thing happened, what was created and where the
 * confirmation went, the single next action, and a way out if the email
 * never lands. Focus moves to the heading on mount, so a screen-reader or
 * keyboard user is told the form is gone and the page has changed.
 */
export function RegistrationSuccess({ email }: { email: string }) {
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className={pruClass.formWidth} aria-labelledby='registration-complete'>
      <span
        aria-hidden
        className='flex size-14 items-center justify-center rounded-full bg-[#001F45]'
      >
        <Icons.check className='size-7 text-white' />
      </span>

      <h1
        id='registration-complete'
        ref={headingRef}
        tabIndex={-1}
        className={`mt-6 outline-none ${pruClass.h1}`}
      >
        You&apos;re all set.
      </h1>
      <p className={`mt-5 ${pruClass.copy}`}>
        Your account is created. We sent a confirmation to{' '}
        <span className='font-semibold'>{email}</span>.
      </p>

      <div className='mt-10 border-t border-[#7ECAF2] pt-6'>
        <h2 className='text-sm font-semibold tracking-wide text-[#001F45] uppercase'>
          What happens next
        </h2>
        <ol className='mt-4 flex flex-col gap-3 text-base text-[#001F45]'>
          {[
            'Confirm your email address using the link we just sent.',
            'Tell us about your retirement goals so we can tailor your plan.',
            'Book time with a financial professional whenever you are ready.'
          ].map((item, index) => (
            <li key={item} className='flex gap-3'>
              <span
                aria-hidden
                className='mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#D0D8E4] text-sm font-bold text-[#001F45]'
              >
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>

      <div className='mt-10 flex flex-col gap-4'>
        <Button type='button' className={pruClass.cta}>
          Go to your account
        </Button>
        <p className='text-sm text-[#001F45]'>
          No email yet? Check your spam folder or{' '}
          <button type='button' className={pruClass.link}>
            send it again
          </button>
          .
        </p>
      </div>
    </section>
  );
}
