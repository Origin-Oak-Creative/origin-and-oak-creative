import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.parent}>
      <div className={styles.content}>
        <h1>404</h1>
        <div>
          <p>The page you are looking for isn&apos;t here.</p>
          <Link href="/">Go home</Link>
        </div>
      </div>
      <div className={styles.background}>
        <Image
          src="/dual-ripples.jpg"
          alt="black and white image of dual water ripples"
          width={2091}
          height={1176}
          priority={true}
        />
      </div>
    </main>
  );
}
