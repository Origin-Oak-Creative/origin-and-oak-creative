import type { Form } from '@/payload-types';
import type { UnionField } from '@/blocks/Form/types';

export const getFormSteps = (fields: Form['fields']) => {
  const steps: UnionField[] = [];
  let currentStepFields: UnionField = [];

  if (!fields) return [];

  fields.forEach((field) => {
    if (field.blockType === 'stepBreak') {
      steps.push(currentStepFields);
      currentStepFields = [];
    } else {
      currentStepFields.push(field);
    }
  });

  // Push the final set of fields
  if (currentStepFields.length > 0) steps.push(currentStepFields);

  return steps;
};
