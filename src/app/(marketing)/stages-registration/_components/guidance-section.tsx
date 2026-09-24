import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { AdvisorIllustration } from './illustrations';

export function GuidanceSection() {
  return (
    <section className='bg-[#0B1F3A]'>
      <div className='mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:py-24'>
        <div className='flex justify-center lg:justify-start'>
          <AdvisorIllustration />
        </div>
        <div className='max-w-lg'>
          <h2 className='text-2xl font-bold tracking-tight text-white sm:text-3xl'>
            Need more guidance?
          </h2>
          <p className='mt-4 text-white/70'>
            Our advisors offer a complimentary assessment. Get personalized advice about retirement,
            investing, life insurance, annuities and more ways to plan.
          </p>
          <Button
            size='lg'
            variant='outline'
            className='mt-6 gap-1.5 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white'
          >
            Schedule a call
            <Icons.calendar className='size-4' />
          </Button>
        </div>
      </div>
    </section>
  );
}
