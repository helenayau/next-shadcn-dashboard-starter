import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';
import { billingInfoContent } from '@/config/infoconfig';

export default function BillingPage() {
  return (
    <PageContainer
      infoContent={billingInfoContent}
      pageTitle='Billing & Plans'
      pageDescription='Manage your subscription and usage limits'
    >
      <div className='space-y-6'>
        <Alert>
          <Icons.info className='h-4 w-4' />
          <AlertDescription>
            Plans and subscriptions are managed through Clerk Billing, which is disabled in this
            deployment.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Set up real Clerk keys to enable billing here.</CardDescription>
          </CardHeader>
          <CardContent className='text-muted-foreground text-sm'>
            No plans to show without a connected Clerk Billing account.
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
