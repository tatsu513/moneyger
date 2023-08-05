'use client';
import CommonLoading from '@/components/common/CommonLoading';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import { Box, Typography } from '@mui/material';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
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
    return <CommonLoading />;
  }
  return (
    <>
      <Typography variant="h3" textAlign="center" mb={3}>
        ログイン
      </Typography>
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
  const searchParams = useSearchParams();
  const target = searchParams?.get('callbackUrl');
  const handleClick = useCallback(() => {
    signIn(provider.id, {
      callbackUrl: target ?? undefined,
      redirect: true,
    });
  }, [provider, target]);
  return (
    <Box mb={2}>
      <PrimaryButton
        label={provider.name}
        size="large"
        fullWidth
        onClick={handleClick}
      />
    </Box>
  );
};
