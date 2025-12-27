import React from 'react';

import type { CallToActionBlock as CTABlockProps } from '@/payload-types';

import RichText from '@/components/RichText';

export const CallToActionBlock: React.FC<CTABlockProps> = ({ richText }) => {
  return (
    <div>
      <div>
        <div>{richText && <RichText data={richText} enableGutter={false} />}</div>
      </div>
    </div>
  );
};
