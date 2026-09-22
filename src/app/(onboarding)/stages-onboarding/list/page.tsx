import type { Metadata } from 'next';
import { PathList } from '../_components/path-list';
import { StagesHeader } from '../_components/stages-header';

export const metadata: Metadata = {
  title: { absolute: 'Prudential Stages for Retirement' }
};

/** Version 2 of the retirement path selection: every option in one list. */
export default function ListPage() {
  return (
    <main>
      <StagesHeader />
      <PathList />
    </main>
  );
}
