'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FINISHED_PATH,
  type PaceId,
  type PathId,
  needsPace,
  paces,
  retirementPaths
} from './onboarding-paths';
import { OptionCard } from './option-card';

/**
 * Version 2: all four paths stacked. the pace question appears only
 * once planning ahead or already retired is picked, and disappears (and
 * forgets its answer) if the visitor switches to either of the other two.
 * Like the carousel, nothing links out: every pace lands on the end screen,
 * and Continue on existing customer or open an account stays on the page.
 */
export function PathList() {
  const router = useRouter();
  const [path, setPath] = useState<PathId | null>(null);
  const [pace, setPace] = useState<PaceId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const showPace = needsPace(path);

  function choosePath(next: PathId) {
    setPath(next);
    setError(null);
    if (!needsPace(next)) setPace(null);
  }

  function handleContinue() {
    if (!path) {
      setError('Choose an option to continue.');
      return;
    }
    if (!needsPace(path)) return;
    if (!pace) {
      setError('Choose your pace to continue.');
      return;
    }
    router.push(FINISHED_PATH);
  }

  return (
    <section className='mx-auto w-full max-w-[792px] px-4 pt-9 pb-6 sm:pt-[38px]'>
      <h1
        id='path-heading'
        className='text-center text-[26px] leading-tight font-bold sm:text-[32px]'
      >
        How can we help you today, James?
      </h1>

      <div role='radiogroup' aria-labelledby='path-heading' className='mt-6 flex flex-col gap-3'>
        {retirementPaths.map((option) => (
          <OptionCard
            key={option.id}
            asRadio
            title={option.listTitle}
            description={option.listDescription}
            selected={path === option.id}
            onClick={() => choosePath(option.id)}
          />
        ))}
      </div>

      {showPace && (
        <>
          <h2 id='pace-heading' className='mt-10 text-center text-[20px] leading-tight font-bold'>
            Great! Next, choose your pace.
          </h2>
          <div
            role='radiogroup'
            aria-labelledby='pace-heading'
            className='mt-3.5 flex flex-col gap-3'
          >
            {paces.map((option) => (
              <OptionCard
                key={option.id}
                asRadio
                title={option.title}
                description={option.description}
                selected={pace === option.id}
                onClick={() => {
                  setPace(option.id);
                  setError(null);
                }}
              />
            ))}
          </div>
        </>
      )}

      <div className='mt-10 flex flex-col items-center'>
        <button
          type='button'
          onClick={handleContinue}
          className='h-12 w-[141px] rounded-full bg-[#001F45] text-base font-bold text-white transition-colors hover:bg-[#0B3366] focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          Continue
        </button>
        <p role='alert' className='mt-3 min-h-5 text-sm font-semibold text-[#B3001B]'>
          {error}
        </p>
      </div>
    </section>
  );
}
