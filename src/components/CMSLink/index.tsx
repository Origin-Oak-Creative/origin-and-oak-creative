import React from 'react';
import Link from 'next/link';

import type { Page, Post } from '@/payload-types';

import RichText from '../RichText';

type LinkType = {
  link: {
    type: 'reference' | 'custom';
    newTab?: boolean | null | undefined;
    reference?:
      | {
          relationTo: 'pages';
          value: number | Page;
        }
      | {
          relationTo: 'posts';
          value: number | Post;
        }
      | null
      | undefined;
    url?: string | null;
  };
  appearance?: 'plain' | 'solid' | 'outline' | 'circle';
  direction?: ('left' | 'right') | null;
  label:
    | string
    | {
        [k: string]: unknown;
        root: {
          type: string;
          children: {
            [k: string]: unknown;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: any;
            version: number;
          }[];
          direction: 'ltr' | 'rtl' | null;
          format: '' | 'left' | 'right' | 'center' | 'start' | 'end' | 'justify';
          indent: number;
          version: number;
        };
      };
};

export const CMSLink: React.FC<LinkType> = ({ link, appearance, direction, label }) => {
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
      className={appearance ? `${appearance} ${direction || ''}` : ''}
    >
      {typeof label == 'string' ? label : <RichText data={label} />}
    </Link>
  );
};
