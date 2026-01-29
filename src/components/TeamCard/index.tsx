'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

import type { TeamMember } from '@/payload-types';
import type { CardImageProps } from '@/fields/cardImage';

import { Media } from '@/components/Media';
import RichText from '../RichText';
import { CardBackground } from '../CardBackground';

import styles from './style.module.css';

export const TeamCard: React.FC<{
  member: TeamMember;
  theme: 'softLinen' | 'riverStone' | 'midnight';
  cardBackgroundImage?: CardImageProps;
}> = ({ member, theme, cardBackgroundImage }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (open) modalRef.current.showModal();
    else modalRef.current.close();
  });

  const handleDialogClose = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (e.target == modalRef.current) setOpen(false);
  };

  const { name, title, headshot, biography } = member;
  return (
    <CardBackground theme={theme} {...cardBackgroundImage}>
      <div className={`${styles.card} ${theme}`}>
        <div className={styles.image}>
          <Media resource={headshot} />
        </div>
        <h3>{name}</h3>
        <p>{title}</p>
        <button className={styles.btn} onClick={() => setOpen(true)}>{`More About ${name}`}</button>
        <dialog
          className={styles.dialog}
          ref={modalRef}
          onClose={() => setOpen(false)}
          onClick={handleDialogClose}
        >
          <div className={`${styles.content} ${theme}`}>
            <button onClick={() => setOpen(false)} aria-label="Close modal">
              <X size={36} />
            </button>
            <RichText data={biography} />
          </div>
        </dialog>
      </div>
    </CardBackground>
  );
};
