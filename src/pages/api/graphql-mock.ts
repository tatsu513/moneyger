import { ApolloServer, ApolloServerOptions } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { Context } from 'src/types/context';
import { Resolvers } from '@/dao/generated/graphql';
import { join } from 'path';
// import { PaymentHistory } from '@prisma/client'

// const GRPC_OPTIONS = {
//   'grpc.keepalive_timeout_ms': 3000,
//   'grpc.max_receive_message_length': 1024 * 1024 * 10,
// } as const satisfies Partial<ClientOptions>

const resolvers: Resolvers = {
  Query: {
    // 収支項目一覧
    listPayments: async () => {
      return [
        {
          currentAmount: 2000,
          id: 1,
          name: '食費',
          maxAmount: 30000,
        },
        {
          currentAmount: 9000,
          id: 2,
          name: '日用品',
          maxAmount: 10000,
        },
      ];
    },
    // 収取項目を1つ取得
    payment: async (_, { paymentId }) => {
      return {
        currentAmount: 2000,
        id: paymentId,
        name: '食費',
        maxAmount: 30000,
      };
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      return [
        {
          paymentDate: '',
          id: 1,
          paymentId: paymentId,
          note: '',
          price: 300,
        },
        {
          paymentDate: '',
          id: 2,
          paymentId: paymentId,
          note: '',
          price: 500,
        },
      ];
    },
    // 支払履歴を1件取得
    paymentHistory: async (_, { paymentHistoryId }) => {
      return {
        paymentDate: '',
        id: paymentHistoryId,
        paymentId: 1,
        note: '',
        price: 300,
      };
    },
  },
  mutation: {
    createPayment: async (_, { name, maxAmount }) => {
      console.log({ name, maxAmount });
      return 1;
    },
    updatePayment: async (_, { id, name, maxAmount }) => {
      console.log({ name, maxAmount });
      return id;
    },
    deletePayment: async (_, { id }) => {
      return id;
    },
    createPaymentHistory: async (
      _,
      { note, price, paymentDate, paymentId },
    ) => {
      console.log({ note, price, paymentDate, paymentId });
      return 1;
    },
    updatePaymentHistory: async (_, { id, note, price, paymentDate }) => {
      console.log({ note, price, paymentDate });
      return id;
    },
    deletePaymentHistory: async (_, { id }) => {
      return id;
    },
  },
};

const serverConfig: ApolloServerOptions<Context> = {
  typeDefs: readFileSync(
    join(process.cwd() + '/graphql/schema.graphql'),
    'utf-8',
  ),
  resolvers,
};
const server = new ApolloServer(serverConfig);

export default startServerAndCreateNextHandler(server);
