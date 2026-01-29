import React from 'react';

import type { ContentBlock as ContentBlockProps } from '@/payload-types';

import { BlockBackground } from '@/components/BlockBackground';
import RichText from '@/components/RichText';

import styles from './style.module.css';

export const ContentBlock: React.FC<ContentBlockProps> = ({
  width,
  theme,
  heading,
  columns,
  backgroundImage = { image: null, opacity: 0 },
}) => {
  return (
    <BlockBackground theme={theme} {...backgroundImage}>
      <div className={`${styles.wrapper} ${width} ${theme}`}>
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
    </BlockBackground>
  );
};
