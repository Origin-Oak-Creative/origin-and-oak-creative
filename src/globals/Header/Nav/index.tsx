'use client';

import React, { useState } from 'react';

import type { Header as HeaderType } from '@/payload-types';

import { CMSLink } from '@/components/CMSLink';
import { Menu, X } from 'lucide-react';
import styles from './style.module.css';

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.btn}
        aria-label="Open menu"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Menu size={36} />
      </button>
      <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
        <button
          className={styles.btn}
          aria-label="Close menu"
          onClick={() => {
            setOpen(false);
          }}
        >
          <X size={36} />
        </button>
        <ul>
          {navItems.map((link, i) => {
            return (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
