import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { workspacesInfoContent } from '@/config/infoconfig';

export default function WorkspacesPage() {
  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Manage your workspaces and switch between them'
      infoContent={workspacesInfoContent}
    >
      <Card>
        <CardHeader>
          <CardTitle>Workspaces disabled</CardTitle>
          <CardDescription>
            Workspaces are backed by Clerk Organizations, which are disabled in this deployment.
          </CardDescription>
        </CardHeader>
        <CardContent className='text-muted-foreground text-sm'>
          Set up real Clerk keys to enable multi-workspace support here.
        </CardContent>
      </Card>
    </PageContainer>
  );
}
