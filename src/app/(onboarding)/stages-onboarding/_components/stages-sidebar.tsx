import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

const items = [
  { label: 'Home', icon: Icons.home },
  { label: 'Action center', icon: Icons.actionCenter, active: true },
  { label: 'Outlook', icon: Icons.outlook },
  { label: 'Spending', icon: Icons.spending },
  { label: 'Sandbox', icon: Icons.sandbox }
];

/** The Stages app's left rail, with Action center current as in the mockup. */
export function StagesSidebar() {
  return (
    <nav
      aria-label='Stages'
      className='hidden w-[78px] shrink-0 flex-col items-stretch gap-6 bg-[#001F45] pt-[196px] text-white md:flex'
    >
      {items.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
          type='button'
          aria-current={active ? 'page' : undefined}
          className={cn(
            'relative flex flex-col items-center gap-1.5 px-1 py-3 text-center text-[12px] leading-tight font-semibold hover:bg-white/10',
            active &&
              'before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-white'
          )}
        >
          <Icon className='size-8' stroke={1.25} />
          {label}
        </button>
      ))}
    </nav>
  );
}
