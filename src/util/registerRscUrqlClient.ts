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
import { GRAPHQL_ENDPOINT } from '@/constants/graphqlEndpoint';
import { CustomSession } from '@/types/sessionType';

const envs = new ShardEnvs();
const makeClient = (session: CustomSession, cookie: string) => {
  return () => {
    return createClient({
      url: envs.nextAuthUrl + GRAPHQL_ENDPOINT,
      exchanges: [cacheExchange, debugExchange, fetchExchange],
      fetchOptions: () => {
        return {
          headers: {
            cookie,
            'caller-user-id': session.user.id,
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
const registerRscUrqlClient: (
  session: CustomSession,
  cookie: string,
) => {
  getClient: () => Client;
} = cache((session: CustomSession, cookie: string) => {
  return registerUrql(makeClient(session, cookie));
});

export default registerRscUrqlClient;
