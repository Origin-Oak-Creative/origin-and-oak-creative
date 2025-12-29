import React from 'react';

import { Width } from '../Width';

export const StepBreak: React.FC<{ stepTitle: string }> = ({ stepTitle }) => {
  return (
    <Width width={100}>
      <h3>{stepTitle}</h3>
    </Width>
  );
};
