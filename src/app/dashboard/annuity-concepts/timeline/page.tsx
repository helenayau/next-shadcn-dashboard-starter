import PageContainer from '@/components/layout/page-container';
import { ConceptTimeline } from '@/features/annuity/components/concept-timeline';

export const metadata = { title: 'Concept: Timeline Layout' };

export default function Page() {
  return (
    <PageContainer pageTitle='Concept C — Income Timeline' pageDescription='Chronological layout'>
      <ConceptTimeline />
    </PageContainer>
  );
}
