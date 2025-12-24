import React from 'react';

import { CardGridBlock as CardGridBlockProps } from '@/payload-types';

import { RichTextCard } from '@/components/RichTextCard';
import RichText from '@/components/RichText';

// import styles from './style.module.css';

export const CardGridBlock: React.FC<CardGridBlockProps> = ({
  width,
  theme,
  heading = { content: null, position: 'out' },
  columns,
  cards,
}) => {
  const { content, position } = heading;
  return (
    <div className={`${theme}, ${width}`}>
      {content && position == 'out' && <RichText data={content} enableGutter={false} />}
      <div className={`${columns}`}>
        {content && position == 'in' && <RichText data={content} enableGutter={false} />}
        {cards.map((e, i) => (
          <RichTextCard key={i} theme={theme} data={e.content} />
        ))}
      </div>
    </div>
  );
};
