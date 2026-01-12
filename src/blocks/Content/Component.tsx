import React from 'react';
import RichText from '@/components/RichText';

import type { ContentBlock as ContentBlockProps } from '@/payload-types';

import styles from './style.module.css';

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { width, theme, heading, columns } = props;

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={`${styles.wrapper} ${width}`}>
        {heading && (
          <div className={styles.heading}>
            <RichText data={heading} type="heading" />
          </div>
        )}
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { content, size } = col;
            return (
              <div key={index} className={`${styles.column} ${size}`}>
                {content && <RichText data={content} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};
