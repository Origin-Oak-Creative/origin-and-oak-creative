'use client';

import {
  isEarlyExitField,
  isInputField,
  type ObjectFormBlock,
  type UnsanitizedField,
} from './types';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

import RichText from '@/components/RichText';
import { fields as fieldComponents } from './fields';
import { getFormSteps } from '@/utilities/tranformFormFields';
import { handleFormSubmission } from './action';

export const ClientFormBlock: React.FC<ObjectFormBlock> = ({ form, enableIntro, introContent }) => {
  const { fields, id, confirmationType, confirmationMessage, redirect, submitButtonLabel } = form;
  const steps = getFormSteps(fields);

  const formMethods = useForm({
    mode: 'onChange',
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
    trigger,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<{ message: string; status?: number } | undefined>();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const allValues = watch();
  const isLastStep = currentStep === steps.length - 1;

  const isEarlyExit = (stepFields: UnsanitizedField[]) => {
    return stepFields.some((field) => {
      if (isEarlyExitField(field)) {
        const val = allValues[field.name];

        return field.earlyExitValue && val === field.earlyExitValue;
      }
    });
  };

  const handleNext = async () => {
    // Validate only the fields in the current step
    const fieldsInStep = steps[currentStep].map((f: UnsanitizedField) =>
      isInputField(f) ? f.name : '',
    );
    const isValid = await trigger(fieldsInStep);

    if (isValid) {
      const shouldExitEarly = isEarlyExit(steps[currentStep]);

      if (shouldExitEarly || isLastStep) {
        handleSubmit(onSubmit)();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const onSubmit = useCallback(
    (data: FieldValues) => {
      let loadingTimerID: ReturnType<typeof setTimeout>;
      const submitForm = async () => {
        setError(undefined);

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          const req = await handleFormSubmission(id, data);

          clearTimeout(loadingTimerID);

          if (!req.success) {
            setIsLoading(false);

            setError({
              message: req.message || 'Internal Server Error',
              status: req.status || 500,
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (req.overrideRedirect) {
            if (
              req.overrideRedirect.type === 'reference' &&
              typeof req.overrideRedirect.reference?.value === 'object' &&
              req.overrideRedirect.reference.value.slug
            ) {
              router.push(req.overrideRedirect.reference.value.slug);
            } else if (req.overrideRedirect.type === 'custom' && req.overrideRedirect.url) {
              router.push(req.overrideRedirect.url);
            }
          }

          if (confirmationType === 'redirect' && redirect) {
            if (
              redirect.type === 'reference' &&
              typeof redirect.reference?.value === 'object' &&
              redirect.reference.value.slug
            ) {
              router.push(redirect.reference.value.slug);
            } else if (redirect.type === 'custom' && redirect.url) {
              router.push(redirect.url);
            }
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: 'Internal Server Error',
            status: 500,
          });
        }
      };

      void submitForm();
    },
    [router, id, redirect, confirmationType],
  );

  return (
    <div>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText data={introContent} enableGutter={false} />
      )}
      <div>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && confirmationMessage && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                {steps[currentStep].map((field, index) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Field: React.FC<any> =
                    fieldComponents?.[field.blockType as keyof typeof fieldComponents];
                  if (Field) {
                    return (
                      <div key={index}>
                        <Field
                          form={form}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <button form={`${id}`} type={isLastStep ? 'submit' : 'button'} onClick={handleNext}>
                {isLastStep ? submitButtonLabel : 'Next'}
              </button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  );
};
