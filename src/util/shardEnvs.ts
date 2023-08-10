import { z } from 'zod';

const shardEnvsSchema = z.object({
  nextAuthUrl: z.string(),
  graphqlEndpoint: z.string(),
});
/**
 * サーバーサイドとクライアントサイドで使用可能
 * `env.*`ファイルに記述されている変数
 * 秘匿情報では使用しない
 */
export class ShardEnvs {
  private _env;

  constructor() {
    this._env = shardEnvsSchema.parse({
      nextAuthUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
      graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
    });
  }

  get nextAuthUrl(): string {
    return this._env.nextAuthUrl;
  }

  get graphqlEndpoint(): string {
    return this._env.graphqlEndpoint;
  }
}
