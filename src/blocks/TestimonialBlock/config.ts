import { blockThemeField, blockWidthField, headingLexical } from '@/fields';
import { blockImageField } from '@/fields/blockImage';
import { cardImageField } from '@/fields/cardImage';
import { cardThemeField } from '@/fields/cardTheme';
import { Block, Field } from 'payload';

const TestimonialsFields: Field[] = [
  blockWidthField,
  blockThemeField,
  cardThemeField,
  blockImageField,
  cardImageField,
  { name: 'heading', type: 'richText', editor: headingLexical(['h2', 'h3', 'h4']) },
  {
    name: 'relationTo',
    type: 'select',
    defaultValue: 'testimonials',
    label: 'Collections To Show',
    required: true,
    options: [
      {
        label: 'Testimonials',
        value: 'testimonials',
      },
    ],
  },
];

export const Testimonials: Block = {
  slug: 'testimonials-block',
  interfaceName: 'Testimonials Block',
  fields: TestimonialsFields,
};
