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
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';
import { annuitySummary, beneficiaries, withdrawals } from '@/constants/mock-api-annuity';
import { formatCurrency } from '../utils';
import { FundAllocationPie } from './fund-allocation-pie';
import { IncomeScheduleChart } from './income-schedule-chart';

export function ConceptTabs() {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
      <Card className='lg:sticky lg:top-20 lg:col-span-1 lg:self-start'>
        <CardHeader>
          <CardDescription>{annuitySummary.contractType}</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums'>
            {formatCurrency(annuitySummary.accountValue)}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <Separator />
          <div>
            <div className='text-muted-foreground text-sm'>Guaranteed monthly income</div>
            <div className='text-xl font-semibold tabular-nums'>
              {formatCurrency(annuitySummary.guaranteedMonthlyIncome)}
            </div>
          </div>
          <div>
            <div className='text-muted-foreground text-sm'>Next payout</div>
            <div className='font-medium'>{annuitySummary.nextPayoutDate}</div>
          </div>
          <Badge variant='outline' className='w-fit'>
            <Icons.check className='mr-1 h-3.5 w-3.5' />
            Locked in for life
          </Badge>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>
            <Icons.notification className='mr-2 h-4 w-4' />
            Contact my advisor
          </Button>
        </CardFooter>
      </Card>

      <div className='lg:col-span-3'>
        <Tabs defaultValue='overview'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='payouts'>Payouts</TabsTrigger>
            <TabsTrigger value='beneficiaries'>Beneficiaries</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='flex flex-col gap-4'>
            <IncomeScheduleChart />
            <FundAllocationPie />
          </TabsContent>

          <TabsContent value='payouts'>
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
                <CardDescription>Your most recent payouts and withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawals.map((w) => (
                      <TableRow key={w.id}>
                        <TableCell className='text-muted-foreground'>{w.date}</TableCell>
                        <TableCell>{w.description}</TableCell>
                        <TableCell>
                          <Badge variant={w.status === 'completed' ? 'secondary' : 'outline'}>
                            {w.status === 'completed' ? 'Completed' : 'Processing'}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-right tabular-nums'>
                          {formatCurrency(w.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='beneficiaries'>
            <Card>
              <CardHeader>
                <CardTitle>Beneficiaries</CardTitle>
                <CardDescription>Who receives your remaining balance</CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col gap-3'>
                {beneficiaries.map((b) => (
                  <div
                    key={b.name}
                    className='flex items-center justify-between rounded-lg border p-3'
                  >
                    <div>
                      <div className='font-medium'>{b.name}</div>
                      <div className='text-muted-foreground text-sm'>{b.relationship}</div>
                    </div>
                    <Badge variant='outline'>{b.allocationPercent}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
