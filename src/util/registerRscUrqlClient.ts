import 'server-only';

import {
  Client,
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
} from '@urql/core';
import { registerUrql } from '@urql/next/rsc';
import { cache } from 'react';
import { ShardEnvs } from '@/util/shardEnvs';

const envs = new ShardEnvs();
const makeClient = (cookie: string) => {
  return () => {
    return createClient({
      url: envs.nextAuthUrl + envs.graphqlEndpoint,
      exchanges: [cacheExchange, debugExchange, fetchExchange],
      fetchOptions: () => {
        return {
          headers: { cookie },
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
