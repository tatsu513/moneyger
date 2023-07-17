import { ApolloServer, ApolloServerOptions } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { credentials } from '@grpc/grpc-js'
import { SiteMessageServiceClient } from 'andpad-apis/node/timecard/v2/site_message_grpc_pb'
import fs from 'fs'
import { globSync } from 'glob'
import { GraphQLError } from 'graphql'
import { getToken } from 'next-auth/jwt'
import { Resolvers } from 'src/dao/generated/v2/graphql'
import SiteMessageRepository from 'src/graphql-v2/SiteMessageRepository'
import mutationResolver from 'src/graphql-v2/resolvers/mutationResolver'
import queryResolver from 'src/graphql-v2/resolvers/queryResolver'
import siteMessageResolver from 'src/graphql-v2/resolvers/siteMessageResolver'
import { ContextV2 } from 'src/types/context'
// import {
//   graphQLApolloArmorPlugins,
//   graphQLApolloArmorProtection,
// } from 'src/utils/graphQLApolloArmor'
import { ServerSideEnvs } from 'src/utils/serverSideEnvs'
import { CustomJwt } from 'src/utils/sessionTypes'
import { ClientOptions } from '@grpc/grpc-js'

const GRPC_OPTIONS = {
  'grpc.keepalive_timeout_ms': 3000,
  'grpc.max_receive_message_length': 1024 * 1024 * 10,
} as const satisfies Partial<ClientOptions>

const resolvers: Resolvers = {
  Query: queryResolver,
  SiteMessage: siteMessageResolver,
  Mutation: mutationResolver,
}

const envs = new ServerSideEnvs()
const siteMessageClient = new SiteMessageServiceClient(
  envs.backendInfo.backendUrl,
  credentials.createInsecure(),
  GRPC_OPTIONS,
)

const serverConfig: ApolloServerOptions<ContextV2> = {
  typeDefs: [
    globSync(process.cwd() + '/graphql/v2/schema/**/*.graphql').map((file) =>
      fs.readFileSync(file, {
        encoding: 'utf8',
      }),
    ),
  ],
  resolvers,
  // ...graphQLApolloArmorProtection,
  // plugins: [...graphQLApolloArmorPlugins],
  // validationRules: [...graphQLApolloArmorProtection.validationRules],
}
const server = new ApolloServer(serverConfig)

export default startServerAndCreateNextHandler(server, {
  context: async (req) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const token = (await getToken({
      req,
      secret: envs.secrets.authSecret,
    })) as CustomJwt | null

    if (token == null || token.sub == null) {
      throw new GraphQLError('認証エラーです')
    }

    const workmanUserId = String(token.sub ?? '')
    const workmanClientId = String(token.client.id)

    const con: ContextV2 = {
      siteMessageRepository: new SiteMessageRepository(
        workmanUserId,
        workmanClientId,
        siteMessageClient,
      ),
    }
    return con
  },
})
