import 'server-only';

import {
  Client,
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  ssrExchange,
} from '@urql/core';
import { registerUrql } from '@urql/next/rsc';
import { cache } from 'react';
import { ShardEnvs } from '@/util/shardEnvs';
import { GRAPHQL_ENDPOINT } from '@/constants/graphqlEndpoint';

const envs = new ShardEnvs();

const isServerSide = typeof window === 'undefined';
const ssr = ssrExchange({
  isClient: !isServerSide,
});

const makeClient = (cookie: string) => {
  return () => {
    return createClient({
      url: envs.nextAuthUrl + GRAPHQL_ENDPOINT,
      exchanges: [cacheExchange, debugExchange, ssr, fetchExchange],
      fetchOptions: () => {
        return {
          headers: {
            cookie: cookie,
          },
        };
      },
    });
  };
};

/**
 * RSC用のurqlクライアントを取得します
 * 同一リクエストで同じcookieが渡された場合は同じクライアントを返します
 */
const registerRscUrqlClient: (cookie: string) => {
  getClient: () => Client;
} = cache((cookie: string) => {
  return registerUrql(makeClient(cookie));
});

export default registerRscUrqlClient;
