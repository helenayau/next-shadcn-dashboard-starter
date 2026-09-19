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
  registrationSteps
} from './registration-schema';
import { pruClass } from './registration-theme';

const TOTAL_STEPS = registrationSteps.length;

/**
 * Numbered progress rail with a label under each dot.
 *
 * Equal-width grid columns rather than a flex row, so the three steps space
 * themselves evenly across the whole form column at any width. Each
 * connector is drawn from its own column's centre back to the previous
 * one's, and the dots sit above it on `z-10` with an opaque fill so the line
 * passes behind them instead of through them.
 */
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <ol className='grid grid-cols-3' aria-label={`Step ${currentStep} of ${TOTAL_STEPS}`}>
      {registrationSteps.map((step, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        return (
          <li
            key={step.label}
            className='relative flex flex-col items-center gap-3 px-1 text-center'
          >
            {index > 0 && (
              <span
                aria-hidden
                className={`absolute top-6 right-1/2 -mt-px h-0.5 w-full ${
                  stepNumber <= currentStep ? 'bg-[#001F45]' : 'bg-[#001F45]/25'
                }`}
              />
            )}
            <span
              aria-current={isCurrent ? 'step' : undefined}
              className={`relative z-10 flex size-12 items-center justify-center rounded-full border-2 text-base font-bold ${
                isDone || isCurrent
                  ? 'border-[#001F45] bg-[#001F45] text-white'
                  : 'border-[#001F45]/25 bg-[#E2F4FF] text-[#001F45]/50'
              }`}
            >
              {isDone ? <Icons.check className='size-6' aria-hidden /> : stepNumber}
            </span>
            <span
              className={`text-sm leading-tight ${
                isCurrent ? 'font-bold text-[#001F45]' : 'font-medium text-[#001F45]/60'
              }`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Variant B of the registration A/B test — the same fields as variant A
 * (`single-step-registration-form`), paginated across three steps. Both arms
 * render the shared `withForm` sections, so the fields, labels and validation
 * are identical. The vertical rhythm between blocks is deliberately looser
 * here than in variant A: a step shows two or three fields, so the page has
 * room the single-page arm does not.
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
      className={`mt-12 flex flex-col gap-10 ${pruClass.formWidth}`}
      data-registration-variant='multi-step'
    >
      <div className='flex flex-col gap-5'>
        <p className='text-sm font-semibold text-[#001F45]/70'>
          Step {currentStep} of {TOTAL_STEPS}
        </p>
        <StepIndicator currentStep={currentStep} />
        <h2 className='mt-3 text-2xl font-bold text-[#001F45]'>
          {registrationSteps[currentStep - 1].title}
        </h2>
      </div>

      {currentStep === 1 && <NameFields form={form} />}
      {currentStep === 2 && <ContactFields form={form} />}
      {currentStep === 3 && (
        <div className='flex flex-col gap-8'>
          <PasswordFieldSection form={form} />
          <ConsentField form={form} />
          <ConsentCallout />
        </div>
      )}

      <div className='flex items-center gap-4'>
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
