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
import { RegistrationHeading } from './registration-shell';
import { pruClass } from './registration-theme';

const TOTAL_STEPS = registrationSteps.length;

const CIRCLE_PX = 40;
/** How far a rule stops short of the circle it runs into. */
const CLEARANCE_PX = 16;

/** Where step `index`'s column centres, measured from the rail's left edge. */
function columnCentre(index: number) {
  return `${(((index + 0.5) / TOTAL_STEPS) * 100).toFixed(4)}%`;
}

/**
 * Numbered progress rail, built to the reference mockup: the reached circles
 * filled navy with a white numeral and the rest pale grey, joined by thin grey
 * rules that stop short of each circle. Numerals throughout — the reference
 * uses no checkmarks — so the current step is marked by its bold navy label
 * rather than by a different glyph.
 *
 * The rail is the width of the fields below it and each step owns an equal
 * third of it, with the circle and its label centred together in that third.
 * Centring the outer circles on the column rather than on the rail's edge is
 * what keeps their labels — which are wider than the circles — inside the
 * form column instead of spilling past the inputs.
 */
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className='relative'>
      {registrationSteps.slice(1).map((step, i) => {
        const index = i + 1;
        return (
          <span
            key={step.label}
            aria-hidden
            className={`absolute top-[19px] h-0.5 ${
              index < currentStep ? 'bg-[#001F45]' : 'bg-[#D0D8E4]'
            }`}
            style={{
              left: `calc(${columnCentre(index - 1)} + ${CIRCLE_PX / 2 + CLEARANCE_PX}px)`,
              right: `calc(100% - (${columnCentre(index)} - ${CIRCLE_PX / 2 + CLEARANCE_PX}px))`
            }}
          />
        );
      })}
      <ol
        className='grid'
        style={{ gridTemplateColumns: `repeat(${TOTAL_STEPS}, minmax(0, 1fr))` }}
        aria-label={`Step ${currentStep} of ${TOTAL_STEPS}`}
      >
        {registrationSteps.map((step, index) => {
          const stepNumber = index + 1;
          const isReached = stepNumber <= currentStep;
          const isCurrent = stepNumber === currentStep;
          return (
            <li key={step.label} className='flex flex-col items-center gap-3'>
              <span
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex size-10 items-center justify-center rounded-full text-base font-bold ${
                  isReached ? 'bg-[#001F45] text-white' : 'bg-[#D0D8E4] text-[#4A5A6A]'
                }`}
              >
                {stepNumber}
              </span>
              <span
                className={`text-[15px] leading-tight whitespace-nowrap ${
                  isCurrent ? 'font-bold text-[#001F45]' : 'font-normal text-[#5A6A7A]'
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Variant B of the registration A/B test — the same fields as variant A
 * (`single-step-registration-form`), paginated across three steps. Both arms
 * render the shared `withForm` sections, so the fields, labels and validation
 * are identical. The step's own line of copy replaces the supporting line
 * under the h1 rather than adding a second heading, so the page carries one
 * title however many steps it has.
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
    <>
      <RegistrationHeading description={registrationSteps[currentStep - 1].title} />

      {/* Every submit — the Enter key included — routes through the stepper
          gate; calling form.handleSubmit directly on a non-final step would
          validate only that step's slice and then submit a half-filled form. */}
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
        <StepIndicator currentStep={currentStep} />

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
    </>
  );
}
