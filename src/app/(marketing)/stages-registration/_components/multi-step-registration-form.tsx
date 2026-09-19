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

const CIRCLE_PX = 40;
/** How far a rule stops short of the circle it runs into. */
const CLEARANCE_PX = 16;

/**
 * Where step `index`'s circle centres, measured from the rail's left edge.
 * The first and last circles sit flush with the column edges, so the centres
 * span `100% - CIRCLE_PX` and divide evenly between them.
 */
function circleCentre(index: number) {
  const ratio = index / (TOTAL_STEPS - 1);
  return `calc(${CIRCLE_PX / 2}px + (100% - ${CIRCLE_PX}px) * ${ratio})`;
}

/**
 * Numbered progress rail, built to the reference mockup: the reached circles
 * filled navy with a white numeral and the rest pale grey, joined by thin grey
 * rules that stop short of each circle. Numerals throughout — the reference
 * uses no checkmarks — so the current step is marked by its bold navy label
 * rather than by a different glyph.
 *
 * The rail spans exactly the width of the fields below it, so the outer
 * circles line up with the edges of the inputs. The circles are placed on
 * equal grid columns with the rules laid over from the same measurements,
 * because the labels differ in width and letting flex distribute around them
 * pulls the circles off an even rhythm. Every label is centred on its own
 * circle, as the reference has it, so the outer two reach a little past the
 * column; the page gutter absorbs that.
 */
function StepIndicator({ currentStep }: { currentStep: number }) {
  const lastIndex = TOTAL_STEPS - 1;
  return (
    <div className='relative pb-8'>
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
              left: `calc(${circleCentre(index - 1)} + ${CIRCLE_PX / 2 + CLEARANCE_PX}px)`,
              right: `calc(100% - (${circleCentre(index)} - ${CIRCLE_PX / 2 + CLEARANCE_PX}px))`
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
          const align =
            index === 0
              ? 'justify-self-start'
              : index === lastIndex
                ? 'justify-self-end'
                : 'justify-self-center';
          return (
            <li key={step.label} className={`flex ${align}`}>
              <span
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex size-10 items-center justify-center rounded-full text-base font-bold ${
                  isReached ? 'bg-[#001F45] text-white' : 'bg-[#D0D8E4] text-[#4A5A6A]'
                }`}
              >
                {stepNumber}
              </span>
              {/* Positioned from the same measurement as the circle rather
                  than sitting under it in flow, so the circles keep an even
                  rhythm however long the labels are. */}
              <span
                className={`absolute top-[52px] text-[15px] leading-tight whitespace-nowrap ${
                  isCurrent ? 'font-bold text-[#001F45]' : 'font-normal text-[#5A6A7A]'
                }`}
                style={{ left: circleCentre(index), transform: 'translateX(-50%)' }}
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
      <div className='flex flex-col gap-6'>
        <StepIndicator currentStep={currentStep} />
        <h2 className='mt-4 text-2xl font-bold text-[#001F45]'>
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
