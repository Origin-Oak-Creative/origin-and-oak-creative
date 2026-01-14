'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@payloadcms/ui';
import { useRouter, usePathname } from 'next/navigation';

const PasswordResetEnforcer = () => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && user.needsPasswordReset) {
      const accountPath = '/admin/account';

      if (pathname !== accountPath) {
        router.push(accountPath);
      }
    }
  }, [user, pathname, router]);

  if (user?.needsPasswordReset && pathname === '/admin/account') {
    return (
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#B31509',
          color: 'white',
          borderRadius: '4px',
          marginBottom: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Security Action Required: Please update your password to unlock full access.
      </div>
    );
  }

  return null;
};

export default PasswordResetEnforcer;
