import type { Metadata } from 'next';
import { RegistrationHeading, RegistrationShell } from '../_components/registration-shell';
import { SingleStepRegistrationForm } from '../_components/single-step-registration-form';

export const metadata: Metadata = {
  title: 'Create your account'
};

/**
 * Variant A of the registration A/B test: all fields on a single page.
 * Variant B lives at `/stages-registration/create-account-multi-step`.
 */
export default function CreateAccountPage() {
  return (
    <RegistrationShell>
      <RegistrationHeading description='Setting up your account and password now helps protect the information you share.' />
      <SingleStepRegistrationForm />
    </RegistrationShell>
  );
}
