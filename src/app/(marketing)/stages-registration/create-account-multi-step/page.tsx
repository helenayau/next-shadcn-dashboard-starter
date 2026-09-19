import type { Metadata } from 'next';
import { RegistrationHeading, RegistrationShell } from '../_components/registration-shell';
import { MultiStepRegistrationForm } from '../_components/multi-step-registration-form';

export const metadata: Metadata = {
  title: 'Create your account'
};

/**
 * Variant B of the registration A/B test: the same fields as variant A,
 * paginated across three steps. Variant A lives at
 * `/stages-registration/create-account`.
 */
export default function CreateAccountMultiStepPage() {
  return (
    <RegistrationShell>
      <RegistrationHeading description='Setting up your account and password now helps protect the information you share.' />
      <MultiStepRegistrationForm />
    </RegistrationShell>
  );
}
