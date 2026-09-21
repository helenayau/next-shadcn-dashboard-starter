'use client';

import * as React from 'react';
import { Icons } from '@/components/icons';
import { pruClass } from './registration-theme';

/**
 * The confirmation screen both arms land on once the account is created. It
 * is shared so the A/B test still measures pagination only: whichever way a
 * user filled the fields, the ending is identical.
 *
 * The confirmation itself is the heading and the welcome sits under it in
 * the same copy treatment the steps use. Focus moves to the heading on
 * mount, so a screen-reader or keyboard user is told the form is gone and
 * the page has changed.
 */
export function RegistrationSuccess() {
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
        Account created!
      </h1>
      <p className={`mt-5 ${pruClass.copy}`}>Welcome to Prudential.</p>
    </section>
  );
}
