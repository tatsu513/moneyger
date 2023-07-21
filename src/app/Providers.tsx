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
  fetchExchange,
  ssrExchange,
} from '@urql/next';
import { ShardEnvs } from '@/util/shardEnvs';

Settings.defaultLocale = 'ja-JP';
Settings.defaultZone = 'Asia/Tokyo';

const shardEnvs = new ShardEnvs();

const isServerSide = typeof window === 'undefined';
const ssr = ssrExchange({
  isClient: !isServerSide,
});
const client = new Client({
  url: shardEnvs.graphqlEndpoint,
  exchanges: [cacheExchange, fetchExchange, ssr],
  fetchOptions: () => {
    return { headers: { authorization: 'Bearer token' } };
  },
});

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterLuxon}
      adapterLocale={Settings.defaultLocale}
      dateFormats={LOCALIZATION_FORMATS}
    >
      <UrqlProvider client={client} ssr={ssr}>
        {children}
      </UrqlProvider>
    </LocalizationProvider>
  );
};

export default Providers;
