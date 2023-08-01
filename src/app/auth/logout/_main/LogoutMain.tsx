'use client';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import { signOut } from 'next-auth/react';
import React, { useCallback } from 'react';

const LogoutMain: React.FC = () => {
  const handleClick = useCallback(() => {
    signOut({
      callbackUrl: '/auth/login',
    });
  }, []);
  return (
    <>
      <PrimaryButton label="ログアウト" onClick={handleClick} />
    </>
  );
};

export default LogoutMain;
