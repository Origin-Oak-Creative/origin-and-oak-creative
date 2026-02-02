import React from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { dynamicIconImports } from 'lucide-react/dynamic';

type IconName = keyof typeof dynamicIconImports;

import type { IconInlineBlock as IconInlineBlockProps } from '@/payload-types';

/* This is a hack-job - need to effectively rebuild package in-house */

export const IconInlineBlock: React.FC<IconInlineBlockProps> = ({ icon, color, size }) => {
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

  if (!iconName) return null;

  return <DynamicIcon name={iconName as IconName} strokeWidth={1.5} color={color} size={size} />;
};
