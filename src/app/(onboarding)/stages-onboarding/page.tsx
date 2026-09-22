import { redirect } from 'next/navigation';

/** The bare /stages-onboarding address opens version 1. */
export default function StagesOnboardingIndex() {
  redirect('/stages-onboarding/carousel');
}
