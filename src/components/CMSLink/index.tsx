import React from 'react';
import Link from 'next/link';

import type { Page } from '@/payload-types';

import styles from './style.module.css';

type LinkType = {
  link: {
    type: 'reference' | 'custom';
    newTab?: boolean | null | undefined;
    reference?:
      | {
          relationTo: 'pages';
          value: number | Page;
        }
      | null
      | undefined;
    url?: string | null;
  };
  appearance?: 'plain' | 'solid' | 'outline' | 'circle';
  direction?: ('left' | 'right') | null;
  colour?: 'light' | 'dark';
  label: string;
};

export const CMSLink: React.FC<LinkType> = ({ link, appearance, direction, colour, label }) => {
  const { type, newTab, reference, url } = link;

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url;

  if (!href) return null;

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};

  return (
    <Link
      href={href || url || ''}
      {...newTabProps}
      className={`${styles.link} ${appearance ? `${appearance} ${direction || ''}` : ''} ${colour || ''}`}
    >
      {label}
    </Link>
  );
};
