import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import {
  annuitySummary,
  beneficiaries,
  fundAllocation,
  withdrawals
} from '@/constants/mock-api-annuity';
import { formatCurrency } from '../utils';

export function ConceptHero() {
  const ytdWithdrawn = withdrawals.reduce((total, w) => total + w.amount, 0);

  return (
    <div className='flex flex-1 flex-col gap-6'>
      <Card className='border-primary/20 bg-gradient-to-br from-primary/10 to-card'>
        <CardContent className='flex flex-col items-center gap-2 py-10 text-center'>
          <div className='text-muted-foreground text-sm font-medium tracking-wide uppercase'>
            Your guaranteed monthly income
          </div>
          <div className='text-6xl font-bold tabular-nums'>
            {formatCurrency(annuitySummary.guaranteedMonthlyIncome)}
          </div>
          <Badge variant='secondary' className='mt-2 text-sm'>
            <Icons.check className='mr-1 h-3.5 w-3.5' />
            Paid for {annuitySummary.payoutsRemaining.toLowerCase()} — no market risk
          </Badge>
          <div className='text-muted-foreground mt-4 text-sm'>
            Next deposit lands automatically on{' '}
            <span className='text-foreground font-medium'>{annuitySummary.nextPayoutDate}</span>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardDescription>Total Account Value</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums'>
              {formatCurrency(annuitySummary.accountValue)}
            </CardTitle>
          </CardHeader>
          <CardFooter className='text-muted-foreground text-sm'>
            {annuitySummary.contractType}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Withdrawn This Year</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums'>
              {formatCurrency(ytdWithdrawn)}
            </CardTitle>
          </CardHeader>
          <CardFooter className='text-muted-foreground text-sm'>
            {withdrawals.length} payments so far
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent & Upcoming Payments</CardTitle>
          <CardDescription>Your last few deposits, and what's next</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col divide-y'>
            {withdrawals.slice(0, 3).map((w) => (
              <div key={w.id} className='flex items-center justify-between py-3'>
                <div>
                  <div className='font-medium'>{w.description}</div>
                  <div className='text-muted-foreground text-sm'>{w.date}</div>
                </div>
                <div className='font-medium tabular-nums'>{formatCurrency(w.amount)}</div>
              </div>
            ))}
            <div className='flex items-center justify-between bg-primary/5 -mx-6 px-6 py-3'>
              <div>
                <div className='font-medium'>Next guaranteed payment</div>
                <div className='text-muted-foreground text-sm'>{annuitySummary.nextPayoutDate}</div>
              </div>
              <div className='font-medium tabular-nums'>
                {formatCurrency(annuitySummary.guaranteedMonthlyIncome)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>How your money is invested</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            {fundAllocation.map((fund) => (
              <div key={fund.category} className='flex items-center gap-3'>
                <div className='w-36 text-sm'>{fund.category}</div>
                <div className='bg-muted h-2 flex-1 overflow-hidden rounded-full'>
                  <div
                    className='bg-primary h-full rounded-full'
                    style={{ width: `${fund.percent}%` }}
                  />
                </div>
                <div className='text-muted-foreground w-10 text-right text-sm tabular-nums'>
                  {fund.percent}%
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beneficiaries</CardTitle>
            <CardDescription>Who receives your remaining balance</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {beneficiaries.map((b) => (
              <div key={b.name} className='flex items-center justify-between text-sm'>
                <span>
                  {b.name} <span className='text-muted-foreground'>· {b.relationship}</span>
                </span>
                <Badge variant='outline'>{b.allocationPercent}%</Badge>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant='outline' className='w-full'>
              <Icons.notification className='mr-2 h-4 w-4' />
              Talk to my advisor
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
