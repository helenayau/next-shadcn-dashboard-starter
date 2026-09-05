import PageContainer from '@/components/layout/page-container';
import { ConceptTabs } from '@/features/annuity/components/concept-tabs';

export const metadata = { title: 'Concept: Tabs Layout' };

export default function Page() {
  return (
    <PageContainer pageTitle='Concept B — Wallet + Tabs' pageDescription='Sectioned layout'>
      <ConceptTabs />
    </PageContainer>
  );
}
