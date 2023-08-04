'use client';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import { Box, Typography } from '@mui/material';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

type ProviderType = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const LoginMain: React.FC = () => {
  const [provider, setProvider] = useState<ProviderType>(null);

  useEffect(() => {
    (async () => {
      const providers = await getProviders().then((res) => res);
      setProvider(providers);
    })();
  }, []);

  if (provider == null) {
    return <>ログイン方式が取得できませんでした</>;
  }
  return (
    <>
      <Typography variant="body1">ログインする</Typography>
      {Object.values(provider).map((provider) => {
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
      <PrimaryButton label={provider.name} fullWidth onClick={handleClick} />
    </>
  );
};
