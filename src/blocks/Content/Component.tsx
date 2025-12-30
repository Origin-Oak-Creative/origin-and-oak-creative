import React from 'react';
import RichText from '@/components/RichText';

import type { ContentBlock as ContentBlockProps } from '@/payload-types';

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { width, theme, heading, columns } = props;

  return (
    <div className={`${width}. ${theme}`}>
      {heading && <RichText data={heading} enableGutter={false} type="heading" />}
      <div>
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { content } = col;

            return (
              <div key={index}>{content && <RichText data={content} enableGutter={false} />}</div>
            );
          })}
      </div>
    </div>
  );
};
