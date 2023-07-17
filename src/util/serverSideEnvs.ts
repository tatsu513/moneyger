/**
 * ビルド時に確定しているサーバー用の環境変数
 * `env.*`ファイルに記述されている変数
 */
export class ServerSideEnvs {
  private _env

  constructor() {
    this._env = {
      useAuth0: process.env.USE_AUTH0,
    }
  }

  get useAuth0(): boolean {
    return this._env.useAuth0 === 'true'
  }
}
