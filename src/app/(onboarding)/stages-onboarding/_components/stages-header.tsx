import Image from 'next/image';
import { Icons } from '@/components/icons';

/** Navy Prudential Stages bar: logo left, profile and Logout right. */
export function StagesHeader() {
  return (
    <header className='flex h-[63px] items-stretch justify-between bg-[#001F45] text-white'>
      <div className='flex items-center pl-4 sm:pl-[58px]'>
        <Image
          src='/stages-onboarding/stages-logo.png'
          alt='Prudential Stages for Retirement'
          width={243}
          height={52}
          priority
          className='h-[35px] w-auto'
        />
      </div>
      <div className='flex items-stretch'>
        <button
          type='button'
          aria-label='Profile'
          className='flex items-center px-4 hover:bg-white/10 sm:px-6'
        >
          <Icons.account className='size-6' stroke={1.5} />
        </button>
        <button
          type='button'
          className='flex items-center gap-2.5 border-l border-white/60 px-4 text-[15px] font-semibold hover:bg-white/10 sm:px-6'
        >
          Logout
          <Icons.logout className='size-6' stroke={1.75} />
        </button>
      </div>
    </header>
  );
}
