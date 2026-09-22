import { Inter, Open_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-stages' });
const inter = Inter({ subsets: ['latin'], variable: '--font-stages-display' });

/**
 * The Stages onboarding prototypes are a fixed light design. The dashboard
 * template flips `html` to dark for visitors whose device is in dark mode, so
 * every colour here is hard-coded and native controls are pinned to the light
 * colour scheme; the pages render the same on either setting.
 */
export default function StagesOnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        openSans.variable,
        inter.variable,
        'min-h-svh bg-[#E2F4FF] font-[family-name:var(--font-stages)] text-[#001F45] antialiased [color-scheme:light]'
      )}
    >
      {children}
    </div>
  );
}
