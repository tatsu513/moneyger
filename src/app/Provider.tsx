'use client'

import { LOCALIZATION_FORMATS } from '@/constants/localizationProviderFormats'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { Settings } from 'luxon'
import React, { PropsWithChildren, Provider } from 'react'
import {
  UrqlProvider,
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  ssrExchange,
} from '@urql/next'
import { devtoolsExchange } from '@urql/devtools'
import { refocusExchange } from '@urql/exchange-refocus'
import { retryExchange } from '@urql/exchange-retry'

Settings.defaultLocale = 'ja-JP'
Settings.defaultZone = 'Asia/Tokyo'

const isServerSide = typeof window === 'undefined'

const ssr = ssrExchange({
  isClient: !isServerSide,
})

const client = createClient({
  url: '/api/graphql',
  exchanges: [
    devtoolsExchange,
    refocusExchange(),
    cacheExchange,
    retryExchange({}),
    debugExchange,
    fetchExchange,
  ],
  requestPolicy: 'cache-first',
  fetchOptions: () => ({
    credentials: 'include',
  }),
  suspense: true,
})

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      <LocalizationProvider
        dateAdapter={AdapterLuxon}
        adapterLocale={Settings.defaultLocale}
        dateFormats={LOCALIZATION_FORMATS}
      >
        {children}
      </LocalizationProvider>
    </UrqlProvider>
  )
}

export default Providers
