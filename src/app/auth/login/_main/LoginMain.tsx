'use client';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import { Box } from '@mui/material';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import React, { useCallback } from 'react';

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};
const LoginMain: React.FC<Props> = ({ providers }) => {
  if (providers == null) {
    return <>nullです</>;
  }
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => {
          return (
            <Box key={provider.name}>
              <LoginButton provider={provider} />
            </Box>
          );
        })}
    </>
  );
};

export default LoginMain;

type LoginButtonProps = {
  provider: ClientSafeProvider;
};
const LoginButton: React.FC<LoginButtonProps> = ({ provider }) => {
  const handleClick = useCallback(() => {
    signIn(provider.id, {
      callback: '/',
    });
  }, [provider]);
  return (
    <>
      <PrimaryButton label={provider.name} onClick={handleClick} />
    </>
  );
};
