import React from 'react';

import { ContentWithMediaBlock as ContentWithMediaBlockProps } from '@/payload-types';

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

import styles from './style.module.css';

export const ContentWithMediaBlock: React.FC<ContentWithMediaBlockProps> = ({
  width,
  theme,
  heading,
  textDirection,
  content,
  image,
}) => {
  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={`${styles.wrapper} ${width}`}>
        {heading && (
          <div className={styles.heading}>
            <RichText data={heading} enableGutter={false} type="heading" />
          </div>
        )}
        <div className={`${styles.content} ${textDirection}`}>
          <RichText data={content} enableGutter={false} />
        </div>
        <div className={`${styles.image} ${image.style}`}>
          <Media resource={image.media} />
        </div>
      </div>
    </div>
  );
};
