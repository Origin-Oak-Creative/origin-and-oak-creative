import React from 'react';
import * as LucideIcons from 'lucide-react';

import type { IconInlineBlock as IconInlineBlockProps } from '@/payload-types';

/* This is a hack-job - need to effectively rebuild package in-house */

export const IconInlineBlock: React.FC<IconInlineBlockProps> = ({ icon }) => {
  let iconName: string | undefined;
  if (icon && typeof icon === 'object' && !Array.isArray(icon)) {
    // If featureIcon is an object with a name property
    const iconObj = icon as Record<string, unknown>;
    if ('name' in iconObj && typeof iconObj.name === 'string') {
      iconName = iconObj.name;
    }
  } else if (typeof icon === 'string') {
    // If featureIcon is directly a string
    iconName = icon;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = iconName ? (LucideIcons as any)[iconName] : undefined;

  return <span>{Icon && <Icon />}</span>;
};
