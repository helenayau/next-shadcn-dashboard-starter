import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { teamInfoContent } from '@/config/infoconfig';

export default function TeamPage() {
  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members, roles, security and more.'
      infoContent={teamInfoContent}
    >
      <Card>
        <CardHeader>
          <CardTitle>Team management disabled</CardTitle>
          <CardDescription>
            Team membership is backed by Clerk Organizations, which are disabled in this deployment.
          </CardDescription>
        </CardHeader>
        <CardContent className='text-muted-foreground text-sm'>
          Set up real Clerk keys to enable team management here.
        </CardContent>
      </Card>
    </PageContainer>
  );
}
