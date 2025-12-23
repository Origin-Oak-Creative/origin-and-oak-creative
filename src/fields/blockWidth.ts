import type { Field } from 'payload';

export const blockWidthField: Field = {
  name: 'width',
  type: 'radio',
  defaultValue: 'block',
  options: [
    { label: 'Block', value: 'block' },
    { label: 'Full Width', value: 'fullWidth' },
  ],
  required: true,
};
