import type { Form, FormBlock as FormBlockProps } from '@/payload-types';

export type ObjectFormBlock = Omit<FormBlockProps, 'form'> & { form: Form };

export type UnionField = NonNullable<Form['fields']>;

export type UnsanitizedField = UnionField[number];

export type InputField = UnsanitizedField & { name: string };

export type AutomationField = InputField & {
  mailerLiteKey?:
    | 'none'
    | 'email'
    | 'name'
    | 'lastName'
    | 'company'
    | 'country'
    | 'city'
    | 'phone'
    | 'state'
    | 'zip'
    | null
    | undefined;
  dubsadoKey?: string | null;
};

export type EarlyExitField = AutomationField & {
  earlyExitValue?: string | null;
  conditionalRedirect?: {
    /**
     * Choose from the "Conditional Redirects" defined at the bottom of the form.
     */
    redirect?: string | null;
    value?: string | null;
  };
};

export type AutomationOption = Form['automationSettings']['automation'];

export type ConditionalRedirectOptions = Form['automationSettings']['conditionalRedirect'];

export const isEarlyExitField = (field: UnsanitizedField): field is EarlyExitField => {
  return (
    field.blockType === 'select' || field.blockType === 'radio' || field.blockType === 'checkbox'
  );
};

export const isInputField = (field: UnsanitizedField): field is InputField => {
  return field.blockType !== 'message' && field.blockType !== 'stepBreak';
};

export const isAutomationField = (field: UnsanitizedField): field is AutomationField => {
  return (
    field.blockType !== 'state' &&
    field.blockType !== 'message' &&
    field.blockType !== 'country' &&
    field.blockType !== 'stepBreak'
  );
};
