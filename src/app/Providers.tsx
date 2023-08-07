'use client';

import { LOCALIZATION_FORMATS } from '@/constants/localizationProviderFormats';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings } from 'luxon';
import React, { PropsWithChildren } from 'react';
import {
  UrqlProvider,
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  ssrExchange,
} from '@urql/next';
import { devtoolsExchange } from '@urql/devtools';
import { refocusExchange } from '@urql/exchange-refocus';
import { retryExchange } from '@urql/exchange-retry';
import { ThemeProvider } from '@emotion/react';
import theme from '@/theme';
import { CssBaseline } from '@mui/material';
import { GRAPHQL_ENDPOINT } from '@/constants/graphqlEndpoint';
import { ShardEnvs } from '@/util/shardEnvs';
import { SessionProvider, useSession } from 'next-auth/react';

Settings.defaultLocale = 'ja-JP';
Settings.defaultZone = 'Asia/Tokyo';

const envs = new ShardEnvs();
const isServerSide = typeof window === 'undefined';
const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      {/* <ProtectPage> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={Settings.defaultLocale}
          dateFormats={LOCALIZATION_FORMATS}
        >
          <UrqlProviderWrapper>{children}</UrqlProviderWrapper>
        </LocalizationProvider>
      </ThemeProvider>
      {/* </ProtectPage> */}
    </SessionProvider>
  );
};

export default Providers;

const UrqlProviderWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();
  const ssr = ssrExchange({
    isClient: !isServerSide,
  });
  const client = createClient({
    url: envs.nextAuthUrl + GRAPHQL_ENDPOINT,
    exchanges: [
      devtoolsExchange,
      refocusExchange(),
      cacheExchange,
      retryExchange({}),
      debugExchange,
      fetchExchange,
      ssr,
    ],
    requestPolicy: 'cache-first',
    fetchOptions: () => {
      return {
        headers: {
          authorization: 'Bearer token',
          'caller-user-id': session?.user.id ?? '',
        },
        credentials: 'include',
      };
    },
    suspense: true,
  });
  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
};
