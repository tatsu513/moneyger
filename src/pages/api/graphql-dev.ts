import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';
import { GraphQLError } from 'graphql';
import isThisMonth from '@/logics/isThisMonth';
import { DateTime } from 'luxon';

const resolvers: Resolvers = {
  Query: {
    listPayments: async () => {
      const data = payments.map((p) => {
        const currentAmount = paymentHistorys.reduce((acc, val) => {
          if (!isThisMonth(DateTime.now(), DateTime.fromJSDate(val.paymentDate))) return acc;
          return val.paymentId === p.id ? acc + val.price : acc
        }, 0)
        return {
          ...p,
          currentAmount
        }
      })
      return data
    },
    payment: async (_, { paymentId }) => {
      const payment = payments.find((p) => p.id === paymentId)
      if (payment == null) return null;
      const currentAmount = paymentHistorys.reduce((acc, val) => {
        return val.paymentId === payment.id ? acc + val.price : acc
      }, 0)
      return {
        id: payment.id,
        name: payment.name,
        currentAmount,
        maxAmount: payment.maxAmount,
      };
    },
    // 支払履歴を全て取得
    listPaymentHistories: async () => {
      const validHistories = paymentHistorys.flatMap((h) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(h.paymentDate)) ? [h] : []
      })
      return validHistories.map((h) => ({
        ...h,
        paymentDate: h.paymentDate.toISOString()
      }))
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      const validHistories = paymentHistorys.flatMap((h) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(h.paymentDate)) ? [h] : []
      })
      const results = validHistories.flatMap((p) => {
        if (p.paymentId === paymentId) {
          return [{
            ...p,
            paymentDate: p.paymentDate.toISOString()
          }]
        }
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
      return {
        ...result,
        paymentDate: result.paymentDate.toISOString()
      };
    },
    // ダッシュボード用
    paymentSummary: async (_, _args, { user }) => {
      console.log({ user });
      const totalMaxAmount = payments.reduce(
        (acc, val) => acc + val.maxAmount,
        0,
      );
      const validHistories = paymentHistorys.flatMap((h) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(h.paymentDate)) ? [h] : []
      })
      const totalCurrentAmount = validHistories.reduce((acc, val) => {
        return acc + val.price
      }, 0)
      const result = totalCurrentAmount / totalMaxAmount;
      const floatedVal = Math.floor(result * 1000) / 1000;
      const ratio = floatedVal * 100;
      return {
        totalMaxAmount,
        totalCurrentAmount,
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

const today = new Date()
const payments = [
  {
    id: 1,
    name: 'テスト1',
    maxAmount: 100000,
    authorId: 10,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'テスト2',
    maxAmount: 80000,
    authorId: 1,
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'テスト3',
    maxAmount: 10000,
    authorId: 12,
    createdAt: new Date()
  },
]

const paymentHistorys = [
  {
    id: 100,
    note: 'スーパー',
    price: 1588,
    paymentDate: new Date(), // '2023-08-07T03:12:40+09:00',
    paymentId: 1,
    authorId: 1,
    createdAt: new Date()
  },
  {
    id: 200,
    note: 'コンビニ',
    price: 600,
    paymentDate: new Date(),
    paymentId: 2,
    authorId: 1,
    createdAt: new Date()
  },
  {
    id: 1300,
    note: '薬局',
    price: 300,
    paymentDate: new Date(),
    paymentId: 3,
    authorId: 1,
    createdAt: new Date()
  },
  {
    id: 999,
    note: 'ヤマザキ',
    price: 300,
    paymentDate: new Date(today.setMonth(today.getMonth() + 2)),
    paymentId: 3,
    authorId: 1,
    createdAt: new Date()
  },
]