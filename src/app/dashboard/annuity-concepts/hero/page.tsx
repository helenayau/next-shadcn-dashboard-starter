import PageContainer from '@/components/layout/page-container';
import { ConceptHero } from '@/features/annuity/components/concept-hero';

export const metadata = { title: 'Concept: Hero Layout' };

export default function Page() {
  return (
    <PageContainer
      pageTitle='Concept A — Big Number Hero'
      pageDescription='Reassurance-first layout'
    >
      <ConceptHero />
    </PageContainer>
  );
}
