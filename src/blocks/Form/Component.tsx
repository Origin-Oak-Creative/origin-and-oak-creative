import React from 'react';

import type { FormBlock as FormBlockProps } from '@/payload-types';

import RichText from '@/components/RichText';
import { Form } from '@/components/Form';
import { BlockBackground } from '@/components/BlockBackground';

import styles from './style.module.css';

export const FormBlock: React.FC<FormBlockProps> = ({
  form,
  introContent,
  enableIntro,
  heading,
  width,
  theme,
  backgroundImage = { image: null, opacity: 0 },
}) => {
  if (typeof form === 'object')
    return (
      <BlockBackground theme={theme} {...backgroundImage}>
        <div className={`${styles.wrapper} ${width} ${theme}`}>
          {heading && (
            <div className={styles.heading}>
              <RichText data={heading} enableGutter={false} type="heading" />
            </div>
          )}
          {enableIntro && introContent && (
            <div className={styles.content}>
              <RichText data={introContent} />
            </div>
          )}
          <Form form={form} />
        </div>
      </BlockBackground>
    );

  return null;
};
