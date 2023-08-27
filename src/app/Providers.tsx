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
import { ShardEnvs } from '@/util/shardEnvs';
import { SessionProvider } from 'next-auth/react';
import ProtectedPage from '@/app/ProtectedPage';

Settings.defaultLocale = 'ja-JP';
Settings.defaultZone = 'Asia/Tokyo';

const envs = new ShardEnvs();
const isServerSide = typeof window === 'undefined';

const ssr = ssrExchange({ isClient: !isServerSide });
const client = createClient({
  url: envs.nextAuthUrl + envs.graphqlEndpoint,
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
  fetchOptions: () => ({ credentials: 'include' }),
  suspense: true,
});

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={Settings.defaultLocale}
          dateFormats={LOCALIZATION_FORMATS}
        >
          <UrqlProvider client={client} ssr={ssr}>
            {/* {children} */}
            <ProtectedPage>{children}</ProtectedPage>
          </UrqlProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
