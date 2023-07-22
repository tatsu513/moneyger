import { Resolvers } from '@/dao/generated/graphql';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { globSync } from 'glob';
import fs from 'fs';
const resolvers: Resolvers = {
  Query: {
    listPayments: () => payments,
    payment: (_, { paymentId }) => {
      const target = payments.find((p) => p.id === paymentId);
      if (target == null) return null;
      return {
        id: target.id,
        name: target.name,
        currentAmount: target.currentAmount,
        maxAmount: target.maxAmount,
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
  Mutation: {
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

const server = new ApolloServer({
  typeDefs: [
    globSync(`${process.cwd()}/graphql/schema.graphql`).map((file) => {
      return fs.readFileSync(file, {
        encoding: 'utf8',
      });
    }),
  ],
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: Request) {
  return handler(request);
}
export async function POST(request: Request) {
  return handler(request);
}

const payments = [
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
  {
    currentAmount: 7000,
    id: 3,
    name: '交通費',
    maxAmount: 5000,
  },
];
