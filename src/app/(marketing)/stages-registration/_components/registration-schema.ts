import * as z from 'zod';

/**
 * One schema for both arms of the A/B test. The single-page arm validates it
 * whole on submit; the multi-step arm picks slices of it per step and
 * re-validates the whole thing on the final submit, so a field can never
 * pass in one arm and fail in the other.
 */
export const registrationSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.email('Enter a valid email address'),
  mobile: z.string().regex(/^[\d\s()+-]{10,}$/, 'Enter a valid mobile number'),
  /* One issue at a time — stacking every unmet password rule under the field
     buries the one thing the user has to change next. */
  password: z.string().superRefine((value, ctx) => {
    const message =
      value.length < 8
        ? 'Password must be at least 8 characters'
        : !/[A-Za-z]/.test(value)
          ? 'Password must include a letter'
          : !/\d/.test(value)
            ? 'Password must include a number'
            : null;
    if (message) {
      ctx.addIssue({ code: 'custom', message });
    }
  }),
  consent: z.literal(true, { error: 'Please accept the consent to continue' })
});

export type RegistrationValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  consent: boolean;
};

export const registrationDefaults: RegistrationValues = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: '',
  consent: false
};

/** Step slices for the multi-step arm — same rules, split three ways. */
export const registrationStepSchemas = [
  registrationSchema.pick({ firstName: true, lastName: true }),
  registrationSchema.pick({ email: true, mobile: true }),
  registrationSchema.pick({ password: true, consent: true })
];

/**
 * Step copy for the multi-step arm. `label` is the short name shown under
 * each dot in the progress rail, so it has to stay narrow enough to sit in a
 * third of the form column; `title` is the heading above that step's fields.
 */
export const registrationSteps = [
  { label: 'Your name', title: 'Tell us who you are' },
  { label: 'Contact info', title: 'How can we reach you?' },
  { label: 'Consent', title: 'Password and consent' }
] as const;
