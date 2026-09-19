import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

/**
 * Shared marketing header. `className` lets a page set its own navy — the
 * registration flow matches the mockup's #001F45, the landing page keeps its
 * own shade — and the logo carries an alpha channel so it sits on either.
 */
export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn('flex items-center justify-between bg-[#0B1F3A] px-6 py-3 sm:px-10', className)}
    >
      <Image
        src='/prudential-logo.png'
        alt='Prudential'
        width={139}
        height={32}
        priority
        className='h-7 w-auto'
      />
      <Button variant='ghost' className='gap-1.5 text-white hover:bg-white/10 hover:text-white'>
        Log in
        <Icons.login className='size-4' />
      </Button>
    </header>
  );
}
