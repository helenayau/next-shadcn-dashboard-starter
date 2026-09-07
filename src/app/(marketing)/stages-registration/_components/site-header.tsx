import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export function SiteHeader() {
  return (
    <header className='flex items-center justify-between bg-[#0B1F3A] px-6 py-3 sm:px-10'>
      <div className='flex items-center gap-2'>
        <span className='flex size-8 items-center justify-center rounded-full bg-white/10'>
          <span className='size-3 rounded-full bg-white' />
        </span>
        <div className='leading-tight text-white'>
          <p className='text-sm font-bold'>Prudential Stages</p>
          <p className='text-[11px] text-white/70'>for Retirement</p>
        </div>
      </div>
      <Button variant='ghost' className='gap-1.5 text-white hover:bg-white/10 hover:text-white'>
        Log in
        <Icons.login className='size-4' />
      </Button>
    </header>
  );
}
