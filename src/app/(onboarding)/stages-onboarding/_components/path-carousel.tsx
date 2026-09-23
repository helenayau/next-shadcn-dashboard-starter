'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  FINISHED_PATH,
  type PathId,
  type SlideImage,
  carouselPaces,
  needsPace,
  retirementPaths
} from './onboarding-paths';

const SWIPE_THRESHOLD = 50;

type Slide = {
  id: string;
  title: string;
  description: string;
  image: SlideImage;
};

/**
 * Version 1: one path per slide, stepped with the arrows, the dots, a swipe or
 * the arrow keys. "Select" on planning ahead or already retired moves on to
 * the pace carousel; the other two stay put. Either pace lands on the end
 * screen.
 */
export function PathCarousel() {
  const router = useRouter();
  const [chosen, setChosen] = useState<PathId | null>(null);

  if (chosen) {
    return (
      <SlideCarousel
        key='pace'
        heading='Great! Next, choose your pace'
        slides={carouselPaces}
        onSelect={() => router.push(FINISHED_PATH)}
      />
    );
  }

  return (
    <SlideCarousel
      key='path'
      heading='How can we help you today, James?'
      slides={retirementPaths.map((path) => ({
        id: path.id,
        title: path.carouselTitle,
        description: path.carouselDescription,
        image: path.image
      }))}
      // Existing customer and open an account are dead ends in this prototype:
      // their Select stays on the carousel rather than leading anywhere.
      onSelect={(id) => {
        const path = id as PathId;
        if (!needsPace(path)) return;
        setChosen(path);
        window.scrollTo({ top: 0 });
      }}
    />
  );
}

function SlideCarousel({
  heading,
  slides,
  onSelect
}: {
  heading: string;
  slides: Slide[];
  onSelect: (id: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const dragStart = useRef<number | null>(null);

  const count = slides.length;
  const go = (next: number) => setIndex(Math.min(count - 1, Math.max(0, next)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(count - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);

  return (
    <section
      className='px-4 pt-14 pb-16 sm:pt-20'
      aria-roledescription='carousel'
      aria-label={heading}
    >
      <h1 className='text-center text-[26px] leading-tight font-bold sm:text-[32px]'>{heading}</h1>

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
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                role='group'
                aria-roledescription='slide'
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                className='flex min-h-[450px] w-full shrink-0 flex-col items-center justify-center px-6 py-10 text-center'
              >
                <div className='flex h-[210px] items-center justify-center'>
                  <Image
                    src={slide.image.src}
                    alt=''
                    width={slide.image.width}
                    height={slide.image.height}
                    unoptimized
                    draggable={false}
                    style={{
                      width: slide.image.displayWidth,
                      height: slide.image.displayHeight
                    }}
                    className='max-w-full object-contain select-none'
                  />
                </div>
                <h2 className='mt-5 font-[family-name:var(--font-stages-display)] text-[24px] leading-tight font-bold sm:text-[28px]'>
                  {slide.title}
                </h2>
                <p className='mt-3 text-[17px] leading-snug'>{slide.description}</p>
                <button
                  type='button'
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => onSelect(slide.id)}
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
        {slides.map((slide, i) => (
          <button
            key={slide.id}
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
