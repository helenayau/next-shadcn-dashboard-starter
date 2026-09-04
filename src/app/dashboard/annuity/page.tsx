import PageContainer from '@/components/layout/page-container';
import { AnnuityOverview } from '@/features/annuity/components/annuity-overview';

export const metadata = { title: 'Dashboard: My Annuity' };

export default function Page() {
  return (
    <PageContainer
      pageTitle='My Annuity'
      pageDescription='Track your annuity value, guaranteed income, and withdrawals'
    >
      <AnnuityOverview />
    </PageContainer>
  );
}
