import type { Form } from '@/payload-types';
import type { UnionField } from '@/components/Form/types';

export const getFormSteps = (fields: Form['fields']) => {
  const steps: UnionField[] = [];
  let currentStepFields: UnionField = [];

  if (!fields) return [];

  fields.forEach((field, index) => {
    if (field.blockType === 'stepBreak') {
      if (index != 0) steps.push(currentStepFields);
      currentStepFields = [field];
    } else {
      currentStepFields.push(field);
    }
  });

  // Push the final set of fields
  if (currentStepFields.length > 0) steps.push(currentStepFields);

  return steps;
};
