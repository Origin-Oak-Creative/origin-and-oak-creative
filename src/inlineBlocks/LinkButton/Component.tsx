import React from 'react';

import type { LinkButtonInlineBlock as LinkButtonInlineBlockProps } from '@/payload-types';

import { CMSLink } from '@/components/CMSLink';

export const LinkButtonInlineBlock: React.FC<LinkButtonInlineBlockProps> = ({ link, display }) => {
  const { appearance, direction, label, colour, icon, placement } = display;

  console.log(icon);

  return (
    <CMSLink
      link={link}
      appearance={appearance}
      direction={direction}
      label={label}
      colour={colour}
      icon={icon}
      placement={placement}
    />
  );
};
