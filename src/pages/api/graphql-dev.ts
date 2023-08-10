import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';
import { GraphQLError } from 'graphql';

const resolvers: Resolvers = {
  Query: {
    listPayments: async () => {
      return payments;
    },
    payment: async (_, { paymentId }) => {
      const target = payments.find((p) => p.id === paymentId)
      if (target == null) return null;
      return target
    },
    // 支払履歴を全て取得
    listPaymentHistories: async () => {
      return paymentHistorys
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      const results = paymentHistorys.flatMap((p) => {
        if (p.paymentId === paymentId) return p
        return []
      })
      return results;
    },
    // 支払履歴を1件取得
    paymentHistory: async (_, { paymentHistoryId }) => {
      const result = paymentHistorys.find((p) => {
        return p.id === paymentHistoryId
      })
      if (result == null) {
        throw Error('支払履歴が見つかりません');
      }
      return result;
    },
    // ダッシュボード用
    paymentSummary: async (_, _args, { user }) => {
      console.log({ user });
      const listPayments = payments;
      const total = listPayments.reduce(
        (acc, val) => {
          const data = JSON.parse(JSON.stringify(acc));
          data.totalMaxAmount = data.totalMaxAmount + val.maxAmount;
          data.totalCurrentAmount = data.totalCurrentAmount + val.currentAmount;
          return data;
        },
        { totalMaxAmount: 0, totalCurrentAmount: 0 },
      );
      const result = total.totalCurrentAmount / total.totalMaxAmount;
      const floatedVal = Math.floor(result * 1000) / 1000;
      const ratio = floatedVal * 100;
      return {
        ...total,
        totalPaymentRatio: ratio,
      };
    },
  },
  Mutation: {
    createPayment: async (_, { name, maxAmount }, { user }) => {
      console.info({ name, maxAmount, user }, 'createPayment called')
      return 1;
    },
    updatePayment: async (_, { id, name, maxAmount }) => {
      console.info({ id, name, maxAmount }, 'updatePayment called')
      return 1;
    },
    deletePayment: async (_, { id }) => {
      console.info({ id }, 'updatePayment called')
      return 1;
    },
    createPaymentHistory: async (
      _,
      { note, price, paymentDate, paymentId },
      { user },
    ) => {
      console.info({ note, price, paymentDate, paymentId, user }, 'createPaymentHistory called')
      return 1;
    },
    updatePaymentHistory: async (_, { id, note, price, paymentDate }) => {
      console.info({ id, note, price, paymentDate}, 'createPaymentHistory called')
      return id;
    },
    deletePaymentHistory: async (_, { id }) => {
      console.info({ id }, 'createPaymentHistory called')
      return id;
    },
  },
};

const server = new ApolloServer({
  typeDefs: [
    fs.readFileSync(process.cwd() + '/graphql/schema.graphql', {
      encoding: 'utf8',
    }),
  ],
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req) => {
    const callerUserId = req.headers['caller-user-id'];
    if (typeof callerUserId !== 'string') {
      throw new GraphQLError('GOT INVALID CALLER USER ID');
    }
    return {
      user: {
        id: callerUserId,
        name: 'test',
        email: 'test@email.com',
        emailVerified: new Date(),
        image: '#',
      },
    };
  },
});

const payments = [
  {
    id: 1,
    name: 'テスト1',
    maxAmount: 100000,
    currentAmount: 20000,
    authorId: 10,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'テスト2',
    maxAmount: 80000,
    currentAmount: 15000,
    authorId: 1,
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'テスト3',
    maxAmount: 10000,
    currentAmount: 2200,
    authorId: 12,
    createdAt: new Date()
  },
]

const paymentHistorys = [
  {
    id: 100,
    note: 'スーパー',
    price: 1588,
    paymentDate: '2023-08-07T03:12:40+09:00',
    paymentId: 1,
    authorId: 1,
    createdAt: new Date()
  },
  {
    id: 200,
    note: 'コンビニ',
    price: 600,
    paymentDate: '2023-08-07T03:12:40+09:00',
    paymentId: 2,
    authorId: 1,
    createdAt: new Date()
  },{
    id: 1300,
    note: '薬局',
    price: 1588,
    paymentDate: '2023-08-07T03:12:40+09:00',
    paymentId: 3,
    authorId: 1,
    createdAt: new Date()
  },
]