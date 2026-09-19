'use client';

import { revalidateLogic } from '@tanstack/react-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useAppForm } from '@/lib/form';
import { useFormStepper } from '@/hooks/use-stepper';
import {
  ConsentCallout,
  ConsentDisclosure,
  ConsentField,
  ContactFields,
  NameFields,
  PasswordFieldSection,
  RegistrationCta
} from './registration-fields';
import {
  registrationDefaults,
  registrationSchema,
  registrationStepSchemas,
  registrationStepTitles
} from './registration-schema';
import { pruClass } from './registration-theme';

const TOTAL_STEPS = registrationStepSchemas.length;

/** Numbered progress rail — the only chrome variant B adds over variant A. */
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <ol className='flex items-center gap-2' aria-label={`Step ${currentStep} of ${TOTAL_STEPS}`}>
      {registrationStepTitles.map((title, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        return (
          <li key={title} className='flex flex-1 items-center gap-2 last:flex-none'>
            <span
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                isDone || isCurrent
                  ? 'border-[#001F45] bg-[#001F45] text-white'
                  : 'border-[#001F45]/30 bg-transparent text-[#001F45]/50'
              }`}
            >
              {isDone ? <Icons.check className='size-4' aria-hidden /> : stepNumber}
            </span>
            <span className='sr-only'>{title}</span>
            {stepNumber < TOTAL_STEPS && (
              <span
                aria-hidden
                className={`h-0.5 flex-1 ${isDone ? 'bg-[#001F45]' : 'bg-[#001F45]/20'}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Variant B of the registration A/B test — the same fields as variant A
 * (`single-step-registration-form`), paginated across three steps. Both arms
 * render the shared `withForm` sections, so the fields, labels, validation
 * and visual treatment are identical; only the pagination differs.
 */
export function MultiStepRegistrationForm() {
  const {
    currentValidator,
    step,
    currentStep,
    isFirstStep,
    handleCancelOrBack,
    handleNextStepOrSubmit
  } = useFormStepper(registrationStepSchemas, { fullSchema: registrationSchema });

  const form = useAppForm({
    defaultValues: registrationDefaults,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: currentValidator as typeof registrationSchema },
    onSubmit: () => {
      toast.success('Account created');
    }
  });

  const isLastStep = step.isCompleted;

  return (
    /* Every submit — the Enter key included — routes through the stepper
       gate; calling form.handleSubmit directly on a non-final step would
       validate only that step's slice and then submit a half-filled form. */
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void handleNextStepOrSubmit(form);
      }}
      noValidate
      className={`mt-10 flex flex-col gap-6 ${pruClass.formWidth}`}
      data-registration-variant='multi-step'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-sm font-semibold text-[#001F45]/70'>
          Step {currentStep} of {TOTAL_STEPS}
        </p>
        <StepIndicator currentStep={currentStep} />
        <h2 className='mt-2 text-xl font-bold text-[#001F45]'>
          {registrationStepTitles[currentStep - 1]}
        </h2>
      </div>

      {currentStep === 1 && <NameFields form={form} />}
      {currentStep === 2 && <ContactFields form={form} />}
      {currentStep === 3 && (
        <div className='flex flex-col gap-5'>
          <PasswordFieldSection form={form} />
          <ConsentField form={form} />
          <ConsentCallout />
        </div>
      )}

      <div className='mt-2 flex items-center gap-3'>
        {!isFirstStep && (
          <Button
            type='button'
            variant='ghost'
            onClick={() => handleCancelOrBack()}
            className='h-11 gap-1 rounded-full px-5 text-base font-semibold text-[#001F45] hover:bg-[#001F45]/5'
          >
            <Icons.chevronLeft className='size-4' aria-hidden />
            Back
          </Button>
        )}
        {/* Same disabled-until-valid rule as variant A, applied to the slice
            of the schema this step is responsible for — so a user sees the
            pale CTA unlock at the same point in both arms. */}
        <form.Subscribe
          selector={(state) => [state.values, state.isSubmitting] as const}
          children={([values, isSubmitting]) => (
            <RegistrationCta
              disabled={isSubmitting || !currentValidator.safeParse(values).success}
            />
          )}
        />
      </div>

      {isLastStep && <ConsentDisclosure />}
    </form>
  );
}
