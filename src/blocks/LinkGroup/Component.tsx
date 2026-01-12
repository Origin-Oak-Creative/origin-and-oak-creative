import React from 'react';

import type { LinkGroupBlock as LinkGroupBlockProps } from '@/payload-types';

import { CMSLink } from '@/components/CMSLink';

import styles from './style.module.css';

export const LinkGroupBlock: React.FC<LinkGroupBlockProps> = ({ links }) => {
  return (
    <div className={styles.container}>
      {links.map((e, i) => (
        <CMSLink
          key={i}
          link={e.link}
          appearance={e.display.appearance}
          direction={e.display.direction}
          label={e.display.label}
          colour={e.display.colour}
        />
      ))}
    </div>
  );
};
