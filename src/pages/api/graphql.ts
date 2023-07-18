import { ApolloServer, ApolloServerOptions } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { readFileSync } from 'fs'
import { Context } from 'src/types/context'
import { ClientOptions } from '@grpc/grpc-js'
import { Resolvers } from '@/dao/generated/graphql'
import { prisma } from '@/util/prisma'
import { join } from 'path'
import { PaymentHistory } from '@prisma/client'

const GRPC_OPTIONS = {
  'grpc.keepalive_timeout_ms': 3000,
  'grpc.max_receive_message_length': 1024 * 1024 * 10,
} as const satisfies Partial<ClientOptions>

const resolvers: Resolvers = {
  Query: {
    // 収支項目一覧
    listPayments: async () => {
      const results = (await prisma.payment.findMany()) ?? []
      return results.map(async (r) => {
        const phs = await prisma.paymentHistory.findMany({
          where: { paymentId: r.id },
        })
        const currentAmount = phs.reduce((acc: number, val: PaymentHistory): number => {
          return acc + val.price
        }, 0)
        return { ...r, currentAmount }
      })
    },
    // 収取項目を1つ取得
    payment: async (_, { paymentId }) => {
      const phs = await prisma.paymentHistory.findMany({
        where: { paymentId },
      })
      const currentAmount = phs.reduce((acc: number, val: PaymentHistory): number => {
        return acc + val.price
      }, 0)
      const result = await prisma.payment.findUnique({
        where: { id: paymentId },
      })
      if (result == null) {
        throw new Error('収支項目がありませんでした')
      }
      return { ...result, currentAmount }
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      const results = await prisma.paymentHistory.findMany({
        where: { paymentId },
      })
      return (
        results?.map((r) => ({
          ...r,
          paymentDate: r.paymentDate.toISOString(),
        })) ?? []
      )
    },
    // 支払履歴を1件取得
    paymentHistory: async (_, { paymentHistoryId }) => {
      const result = await prisma.paymentHistory.findUnique({
        where: { id: paymentHistoryId },
      })
      if (result == null) return null
      return {
        ...result,
        paymentDate: result.paymentDate.toISOString(),
      }
    },
  },
  mutation: {
    createPayment: async (_, { name, maxAmount }) => {
      const result = await prisma.payment.create({
        data: {
          name,
          maxAmount,
          currentAmount: 0,
        },
      })
      return result.id
    },
    updatePayment: async (_, { id, name, maxAmount }) => {
      const result = await prisma.payment.update({
        where: { id },
        data: { name, maxAmount },
      })
      return result.id
    },
    deletePayment: async (_, { id }) => {
      const result = await prisma.payment.delete({
        where: { id },
      })
      return result.id
    },
    createPaymentHistory: async (_, { note, price, paymentDate, paymentId }) => {
      const result = await prisma.paymentHistory.create({
        data: {
          note,
          price,
          paymentDate,
          paymentId,
        },
      })
      return result.id
    },
    updatePaymentHistory: async (_, { id, note, price, paymentDate }) => {
      const result = await prisma.paymentHistory.update({
        where: { id },
        data: {
          note,
          price,
          paymentDate,
        },
      })
      return result.id
    },
    deletePaymentHistory: async (_, { id }) => {
      const result = await prisma.paymentHistory.delete({
        where: { id },
      })
      return result.id
    },
  },
}

const serverConfig: ApolloServerOptions<Context> = {
  typeDefs: readFileSync(join(process.cwd() + '/graphql/schema.graphql'), 'utf-8'),
  resolvers,
}
const server = new ApolloServer(serverConfig)

export default startServerAndCreateNextHandler(server)
