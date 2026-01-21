import React from 'react';

import type { FormBlock as FormBlockProps } from '@/payload-types';
import RichText from '@/components/RichText';
import { Form } from '@/components/Form';

import styles from './style.module.css';

export const FormBlock: React.FC<FormBlockProps> = ({
  form,
  introContent,
  enableIntro,
  heading,
  width,
  theme,
}) => {
  if (typeof form === 'object')
    return (
      <div className={`${styles.container} ${theme}`}>
        <div className={`${styles.wrapper} ${width}`}>
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
      </div>
    );

  return null;
};
