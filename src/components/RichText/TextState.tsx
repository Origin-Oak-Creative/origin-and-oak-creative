'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './style.module.css';

export const TextState: React.FC<{
  classNames: string;
  element:
    | string
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>;
}> = ({ classNames, element }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <span ref={ref} className={`${classNames} ${inView ? styles.visible : ''}`}>
      {element}
    </span>
  );
};
