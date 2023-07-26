'use client';

import { LOCALIZATION_FORMATS } from '@/constants/localizationProviderFormats';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings } from 'luxon';
import React, { PropsWithChildren } from 'react';
import {
  Client,
  UrqlProvider,
  cacheExchange,
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

Settings.defaultLocale = 'ja-JP';
Settings.defaultZone = 'Asia/Tokyo';

const envs = new ShardEnvs();

const isServerSide = typeof window === 'undefined';
const ssr = ssrExchange({
  isClient: !isServerSide,
});
const client = new Client({
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
      headers: { authorization: 'Bearer token' },
      credentials: 'include',
    };
  },
  suspense: true,
});

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterLuxon}
        adapterLocale={Settings.defaultLocale}
        dateFormats={LOCALIZATION_FORMATS}
      >
        <UrqlProvider client={client} ssr={ssr}>
          <CssBaseline />
          {children}
        </UrqlProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Providers;
