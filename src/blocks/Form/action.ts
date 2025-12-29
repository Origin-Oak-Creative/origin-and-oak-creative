'use server';

import { APIError, getPayload } from 'payload';
import configPromise from '@payload-config';

import type { FieldValues } from '@payloadcms/plugin-form-builder/types';
import type { Form, Page } from '@/payload-types';
import { ConditionalRedirectOptions, isEarlyExitField, type UnsanitizedField } from './types';

export type OverrideRedirect = {
  type: 'custom' | 'reference';
  reference?:
    | {
        relationTo: 'pages';
        value: number | Page;
      }
    | null
    | undefined;
  url?: string | null;
};

export type FormSubmissionResponse = {
  success: boolean;
  message?: string;
  status?: number;
  overrideRedirect?: OverrideRedirect | null;
};

export const handleFormSubmission = async (formId: number, data: FieldValues) => {
  const payload = await getPayload({ config: configPromise });

  try {
    const formConfig = (await payload.findByID({
      collection: 'forms',
      id: formId,
    })) as Form;

    let overrideRedirect: OverrideRedirect | null = null;

    const reversedFields = [...(formConfig.fields || [])].reverse();

    const triggerField = reversedFields.find((field: UnsanitizedField) => {
      if (!isEarlyExitField(field)) return false;
      const userValue = data[field.name];
      return field.conditionalRedirect?.value && userValue === field.conditionalRedirect?.value;
    });

    if (triggerField && isEarlyExitField(triggerField)) {
      const redirectOptions: ConditionalRedirectOptions =
        formConfig.automationSettings?.conditionalRedirect;
      const redirectOption = redirectOptions
        ? redirectOptions.find((r) => r.label === triggerField.conditionalRedirect?.redirect)
        : null;

      if (redirectOption?.value) {
        overrideRedirect = redirectOption.value;
      }
    }

    const submissionData = Object.entries(data).map(([name, value]) => ({
      field: name,
      value: String(value),
    }));

    await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData,
      },
    });

    return { success: true, overrideRedirect };
  } catch (e: unknown) {
    if (e instanceof APIError) {
      return {
        success: false,
        message: e.message,
        status: e.status,
      };
    } else {
      throw e;
    }
  }
};
