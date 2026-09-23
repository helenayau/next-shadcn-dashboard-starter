import { cn } from '@/lib/utils';

/**
 * The white, centred choice card from the list mockup. `selected` draws the
 * navy outline; `asRadio` renders the card as a radio in a radiogroup.
 */
export function OptionCard({
  title,
  description,
  selected = false,
  asRadio = false,
  onClick
}: {
  title: string;
  description: string;
  selected?: boolean;
  asRadio?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type='button'
      role={asRadio ? 'radio' : undefined}
      aria-checked={asRadio ? selected : undefined}
      onClick={onClick}
      className={cn(
        'flex min-h-[92px] w-full flex-col items-center justify-center rounded-[3px] border bg-white px-5 py-5 text-center transition-colors',
        selected ? 'border-[#001F45]' : 'border-transparent hover:border-[#001F45]/40',
        'focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 focus-visible:outline-none'
      )}
    >
      <span className='text-[19px] leading-snug font-bold'>{title}</span>
      <span className='mt-1.5 text-[15px] leading-snug'>{description}</span>
    </button>
  );
}
