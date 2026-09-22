import { cn } from '@/lib/utils';
import { paceDestination, paces } from './onboarding-paths';
import { OptionCard } from './option-card';

/** The carousel's pace step: each card goes straight to its destination. */
export function PaceChoices({
  className,
  onChoose
}: {
  className?: string;
  onChoose: (href: string) => void;
}) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {paces.map((pace) => (
        <OptionCard
          key={pace.id}
          title={pace.title}
          description={pace.description}
          onClick={() => onChoose(paceDestination(pace.id))}
        />
      ))}
    </div>
  );
}
