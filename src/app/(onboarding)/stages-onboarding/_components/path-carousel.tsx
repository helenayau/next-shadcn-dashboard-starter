'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { type PathId, needsPace, pathDestination, retirementPaths } from './onboarding-paths';
import { PaceChoices } from './pace-choices';

const SWIPE_THRESHOLD = 50;

/**
 * Version 1: one path per slide, stepped with the arrows, the dots, a swipe or
 * the arrow keys. "Select" on planning ahead or already retired moves on to
 * the pace question; the other two leave the page.
 */
export function PathCarousel() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<PathId | null>(null);
  const dragStart = useRef<number | null>(null);

  const count = retirementPaths.length;
  const go = (next: number) => setIndex(Math.min(count - 1, Math.max(0, next)));

  useEffect(() => {
    if (chosen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(count - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chosen, count]);

  function select(path: PathId) {
    if (needsPace(path)) {
      setChosen(path);
      window.scrollTo({ top: 0 });
      return;
    }
    router.push(pathDestination(path as 'existing' | 'open-account'));
  }

  if (chosen) {
    return (
      <section className='mx-auto w-full max-w-[652px] px-4 pt-14 pb-16 sm:pt-20'>
        <BackButton onClick={() => setChosen(null)} />
        <h1 className='mt-4 text-center text-[26px] leading-tight font-bold sm:text-[32px]'>
          Now, choose your pace.
        </h1>
        <PaceChoices className='mt-8' onChoose={(href) => router.push(href)} />
      </section>
    );
  }

  return (
    <section
      className='px-4 pt-14 pb-16 sm:pt-20'
      aria-roledescription='carousel'
      aria-label='How can we help you today'
    >
      <h1 className='text-center text-[26px] leading-tight font-bold sm:text-[32px]'>
        How can we help you today, James?
      </h1>

      <div className='mx-auto mt-8 flex max-w-[864px] items-center justify-center gap-3 sm:gap-[50px]'>
        <ArrowButton direction='prev' disabled={index === 0} onClick={() => go(index - 1)} />

        <div
          className='w-full max-w-[652px] touch-pan-y overflow-hidden rounded-lg bg-white'
          onPointerDown={(e) => {
            dragStart.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (dragStart.current === null) return;
            const delta = e.clientX - dragStart.current;
            dragStart.current = null;
            if (delta > SWIPE_THRESHOLD) go(index - 1);
            if (delta < -SWIPE_THRESHOLD) go(index + 1);
          }}
          onPointerCancel={() => {
            dragStart.current = null;
          }}
        >
          <div
            className='flex transition-transform duration-300 ease-out motion-reduce:transition-none'
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {retirementPaths.map((path, i) => (
              <div
                key={path.id}
                role='group'
                aria-roledescription='slide'
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                className='flex min-h-[450px] w-full shrink-0 flex-col items-center justify-center px-6 py-10 text-center'
              >
                <div className='flex h-[210px] items-center justify-center'>
                  <Image
                    src={path.image.src}
                    alt=''
                    width={path.image.width}
                    height={path.image.height}
                    draggable={false}
                    style={{ width: path.image.displayWidth }}
                    className='h-auto max-w-full select-none'
                  />
                </div>
                <h2 className='mt-5 font-[family-name:var(--font-stages-display)] text-[24px] leading-tight font-bold sm:text-[28px]'>
                  {path.carouselTitle}
                </h2>
                <p className='mt-3 text-[17px] leading-snug'>{path.carouselDescription}</p>
                <button
                  type='button'
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => select(path.id)}
                  className='mt-5 h-12 w-[116px] rounded-full bg-[#001F45] text-base font-bold text-white transition-colors hover:bg-[#0B3366] focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 focus-visible:outline-none'
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>

        <ArrowButton
          direction='next'
          disabled={index === count - 1}
          onClick={() => go(index + 1)}
        />
      </div>

      <div className='mt-8 flex items-center justify-center gap-1'>
        {retirementPaths.map((path, i) => (
          <button
            key={path.id}
            type='button'
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className='grid size-5 place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:outline-none'
          >
            <span
              className={cn(
                'block rounded-full transition-all',
                i === index ? 'size-3.5 bg-[#15375B]' : 'size-2.5 bg-[#9DB4CB]'
              )}
            />
          </button>
        ))}
      </div>
      <p className='mt-2 text-center text-[15px]' aria-live='polite'>
        {index + 1} of {count}
      </p>
    </section>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === 'prev' ? Icons.chevronLeft : Icons.chevronRight;
  return (
    <button
      type='button'
      aria-label={direction === 'prev' ? 'Previous option' : 'Next option'}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-full border-2 transition-colors sm:size-14',
        disabled
          ? 'cursor-default border-[#5A748F]/70 bg-[#F3FBFF] text-[#5A748F]'
          : 'border-[#001F45] bg-white text-[#001F45] hover:bg-[#F3FBFF]',
        'focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 focus-visible:outline-none'
      )}
    >
      <Icon className='size-5' stroke={2.5} />
    </button>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex items-center gap-1 text-[15px] font-semibold text-[#0066CC] hover:underline'
    >
      <Icons.chevronLeft className='size-4' stroke={2.5} />
      Back
    </button>
  );
}
