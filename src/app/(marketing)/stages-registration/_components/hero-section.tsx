import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { HeroIllustration, RugIllustration } from './illustrations';

export function HeroSection() {
  return (
    <section className='bg-[#D8EEEC]'>
      <div className='mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:py-20'>
        <div className='max-w-lg'>
          <h1 className='text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl'>
            Ready to retire your way?
          </h1>
          <p className='mt-4 text-[#0B1F3A]/80'>
            Get started with Prudential Stages for Retirement to see if you&apos;re on track to live
            the life you want.
          </p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Button size='lg' className='gap-1.5 bg-[#155EEF] text-white hover:bg-[#0E4FCE]'>
              Get started
              <Icons.arrowRight className='size-4' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='gap-1.5 border-transparent bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90'
            >
              Schedule a call
              <Icons.calendar className='size-4' />
            </Button>
          </div>
        </div>
        <div className='flex justify-center lg:justify-end'>
          <HeroIllustration />
        </div>
      </div>
      <div className='border-t border-white/60 bg-[#AEE0DE] py-8'>
        <div className='mx-auto max-w-6xl px-6 sm:px-10'>
          <RugIllustration />
        </div>
      </div>
    </section>
  );
}
