import React from 'react';

import styles from '../styles.module.css';

export const Width: React.FC<{
  children: React.ReactNode;
  width?: number | string;
}> = ({ children, width }) => {
  return (
    <div className={styles.width} style={{ '--width': `${width}%` }}>
      {children}
    </div>
  );
};
