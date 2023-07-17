import { ApolloServer, ApolloServerOptions } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import fs, { readFileSync } from 'fs'
import { globSync } from 'glob'
import { Context } from 'src/types/context'
import { ClientOptions } from '@grpc/grpc-js'
import { Resolvers } from '@/dao/generated/graphql'
import { prisma } from '@/util/prisma'
import { startStandaloneServer } from '@apollo/server/standalone'
import { join } from 'path'

const GRPC_OPTIONS = {
  'grpc.keepalive_timeout_ms': 3000,
  'grpc.max_receive_message_length': 1024 * 1024 * 10,
} as const satisfies Partial<ClientOptions>

const resolvers: Resolvers = {
  Query: {
    listPayments: async () => {
      return await prisma.payment.findMany()
    },
    payment: async (_, { paymentId }) => {
      return await prisma.payment.findUnique({
        where: { id: paymentId },
      })
    },
  },
  mutation: {
    updatePayment: async (_, { id, name, maxAmount }) => {
      const result = await prisma.payment.update({
        where: { id },
        data: { name, maxAmount },
      })
      return { id: result.id }
    },
  },
}

const serverConfig: ApolloServerOptions<Context> = {
  typeDefs: readFileSync(join(process.cwd() + '/graphql/schema.graphql'), 'utf-8'),
  resolvers,
}
const server = new ApolloServer(serverConfig)
// const startServer = async () => {
//   const { url } = await startStandaloneServer(server, {
//     context: async ({ req }) => ({
//       ...req,
//       prisma,
//       userId: req && req.headers.authorization ? '1' : null,
//     }),
//     listen: { port: 4000 },
//   })
//   console.log(`🚀  Server ready at: ${url}`)
// }

export default startServerAndCreateNextHandler(server)
