import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatarProfile } from '@/components/user-avatar-profile';

const guestUser = {
  imageUrl: '',
  fullName: 'Guest User',
  emailAddresses: [{ emailAddress: 'guest@example.com' }]
};

export default function ProfileViewPage() {
  return (
    <div className='flex w-full flex-col p-4'>
      <Card className='mx-auto w-full max-w-2xl'>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Account management is powered by Clerk in this template and is disabled in this
            deployment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAvatarProfile showInfo user={guestUser} className='h-12 w-12 rounded-lg' />
        </CardContent>
      </Card>
    </div>
  );
}
