'use client';

import { toast } from 'sonner';
import { useAppForm } from '@/lib/form';
import {
  ConsentCallout,
  ConsentDisclosure,
  ConsentField,
  ContactFields,
  NameFields,
  PasswordFieldSection,
  RegistrationCta
} from './registration-fields';
import { registrationDefaults, registrationSchema } from './registration-schema';
import { pruClass } from './registration-theme';

/**
 * Variant A of the registration A/B test — every field on one page, exactly
 * as the design-system mockup specifies. Variant B
 * (`multi-step-registration-form`) renders these same sections across three
 * steps; keep the two in step when either changes.
 */
export function SingleStepRegistrationForm() {
  const form = useAppForm({
    defaultValues: registrationDefaults,
    validators: { onSubmit: registrationSchema },
    onSubmit: () => {
      toast.success('Account created');
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      noValidate
      className={`mt-12 flex flex-col gap-8 ${pruClass.formWidth}`}
      data-registration-variant='single-page'
    >
      <NameFields form={form} />
      <ContactFields form={form} />
      <PasswordFieldSection form={form} />

      <div className='mt-4 flex flex-col gap-6'>
        <ConsentField form={form} />
        <ConsentCallout />
        {/* The mockup shows the CTA in its pale disabled state, so it unlocks
            only once every field on the page satisfies the schema. */}
        <form.Subscribe
          selector={(state) => [state.values, state.isSubmitting] as const}
          children={([values, isSubmitting]) => (
            <RegistrationCta
              disabled={isSubmitting || !registrationSchema.safeParse(values).success}
            />
          )}
        />
      </div>

      <ConsentDisclosure />
    </form>
  );
}
