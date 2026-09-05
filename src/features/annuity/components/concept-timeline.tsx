import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import {
  annuitySummary,
  beneficiaries,
  fundAllocation,
  withdrawals
} from '@/constants/mock-api-annuity';
import { formatCurrency } from '../utils';

const timelineEvents = [
  ...withdrawals
    .slice()
    .reverse()
    .map((w) => ({ ...w, kind: 'past' as const })),
  {
    id: 'next',
    date: annuitySummary.nextPayoutDate,
    description: 'Guaranteed monthly income',
    amount: annuitySummary.guaranteedMonthlyIncome,
    kind: 'next' as const
  },
  {
    id: 'future',
    date: 'Nov 1, 2026',
    description: 'Guaranteed monthly income (projected)',
    amount: annuitySummary.guaranteedMonthlyIncome,
    kind: 'future' as const
  }
];

export function ConceptTimeline() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
      <div className='lg:col-span-2'>
        <Card>
          <CardHeader>
            <CardTitle>Your Income Timeline</CardTitle>
            <CardDescription>Past payments, and what's coming next</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='relative flex flex-col gap-6 pl-6'>
              <div className='bg-border absolute top-1 bottom-1 left-[7px] w-px' />
              {timelineEvents.map((event) => (
                <div key={event.id} className='relative flex items-start justify-between gap-4'>
                  <div
                    className={`absolute top-1 -left-6 size-3.5 rounded-full border-2 ${
                      event.kind === 'past'
                        ? 'bg-primary border-primary'
                        : event.kind === 'next'
                          ? 'bg-background border-primary'
                          : 'bg-background border-muted-foreground/40'
                    }`}
                  />
                  <div>
                    <div className='flex items-center gap-2 font-medium'>
                      {event.description}
                      {event.kind === 'next' && <Badge>Next</Badge>}
                      {event.kind === 'future' && <Badge variant='outline'>Projected</Badge>}
                    </div>
                    <div className='text-muted-foreground text-sm'>{event.date}</div>
                  </div>
                  <div
                    className={`font-medium tabular-nums ${event.kind === 'future' ? 'text-muted-foreground' : ''}`}
                  >
                    {formatCurrency(event.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardDescription>Account Value</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums'>
              {formatCurrency(annuitySummary.accountValue)}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Fund Allocation</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {fundAllocation.map((fund) => (
              <div key={fund.category} className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>{fund.category}</span>
                <span className='font-medium tabular-nums'>{fund.percent}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Beneficiaries</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {beneficiaries.map((b) => (
              <div key={b.name} className='flex items-center justify-between text-sm'>
                <span>{b.name}</span>
                <Badge variant='outline'>{b.allocationPercent}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button variant='outline'>
          <Icons.notification className='mr-2 h-4 w-4' />
          Contact my advisor
        </Button>
      </div>
    </div>
  );
}
