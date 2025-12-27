import React from 'react';

import type { LinkButtonInlineBlock as LinkButtonInlineBlockProps } from '@/payload-types';

import { CMSLink } from '@/components/CMSLink';

export const LinkButtonInlineBlock: React.FC<LinkButtonInlineBlockProps> = ({ link, display }) => {
  const { appearance, direction, label } = display;

  return <CMSLink link={link} appearance={appearance} direction={direction} label={label} />;
};
