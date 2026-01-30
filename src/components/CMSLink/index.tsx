import React from 'react';
import Link from 'next/link';

import type { Page, PdfDocument } from '@/payload-types';

import styles from './style.module.css';

type LinkType = {
  link: {
    type: 'reference' | 'pdf' | 'custom';
    newTab?: boolean | null;
    reference?: {
      relationTo: 'pages';
      value: number | Page;
    } | null;
    url?: string | null;
    pdf?: (number | null) | PdfDocument;
  };
  appearance?: 'plain' | 'solid' | 'outline' | 'circle';
  direction?: ('left' | 'right') | null;
  colour?: 'light' | 'dark';
  label: string;
};

export const CMSLink: React.FC<LinkType> = ({ link, appearance, direction, colour, label }) => {
  const { type, newTab, reference, url, pdf } = link;

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `/${reference.value.slug}`
      : type === 'pdf' && pdf && typeof pdf === 'object' && pdf.url
        ? pdf.url
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
