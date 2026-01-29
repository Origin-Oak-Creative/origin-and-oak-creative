import React from 'react';

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import type { ThemeField } from '@/fields/blockTheme';
import type { CardImageProps } from '@/fields/cardImage';

import RichText from '@/components/RichText';
import { CardBackground } from '../CardBackground';

import styles from './style.module.css';

export const RichTextCard: React.FC<{
  theme: ThemeField;
  data: { heading?: DefaultTypedEditorState | null; content: DefaultTypedEditorState };
  cardBackgroundImage?: CardImageProps;
}> = ({ theme, data, cardBackgroundImage }) => {
  return (
    <CardBackground theme={theme} {...cardBackgroundImage}>
      <div className={`${styles.card} ${theme}`}>
        {data.heading && (
          <div className={styles.heading}>
            <RichText data={data.heading} type="heading" />
          </div>
        )}
        <RichText data={data.content} type="content" />
      </div>
    </CardBackground>
  );
};
