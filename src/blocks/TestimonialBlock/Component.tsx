import React from 'react';

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types';

import { getCachedCollection } from '@/utilities/getCollection';
import { TestimonialsClient } from './Component.client';

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = async (props) => {
  const testimonials = await getCachedCollection('testimonials')();

  return <TestimonialsClient testimonials={testimonials} {...props} />;
};
