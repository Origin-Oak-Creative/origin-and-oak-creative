import React from 'react';

import { Width } from '../Width';

import styles from '../styles.module.css';

export const StepBreak: React.FC<{ stepTitle: string }> = ({ stepTitle }) => {
  return (
    <Width width={100}>
      <h3 className={styles.step}>{stepTitle}</h3>
    </Width>
  );
};
