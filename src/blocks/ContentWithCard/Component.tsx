import React from 'react';

import { ContentWithCardBlock as ContentWithCardBlockProps } from '@/payload-types';

import { RichTextCard } from '@/components/RichTextCard';
import RichText from '@/components/RichText';

// import styles from './style.module.css';

export const ContentWithCardBlock: React.FC<ContentWithCardBlockProps> = ({
  width,
  cardPlacement,
  theme,
  heading,
  content,
  card,
}) => {
  return (
    <div className={`${theme}, ${width}`}>
      {heading && <RichText data={heading} enableGutter={false} type="heading" />}
      <div className={cardPlacement}>
        <RichText data={content} /> <RichTextCard theme={theme} data={card} />
      </div>
    </div>
  );
};
