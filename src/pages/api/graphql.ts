import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
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
      const target = paymentHistories.flatMap((p) => {
        if (p.paymentId !== paymentId) return [];
        return [p];
      });
      if (target == null) return [];
      return target;
    },
    // 支払履歴を1件取得
    paymentHistory: async (_, { paymentHistoryId }) => {
      const target = paymentHistories.find((h) => h.id === paymentHistoryId);
      if (target == null) {
        throw Error('支払履歴が見つかりません');
      }
      return target;
    },
    // 上限の合計金額を取得
    paymentSummary: async () => {
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
    fs.readFileSync(process.cwd() + '/graphql/schema.graphql', {
      encoding: 'utf8',
    }),
  ],
  resolvers,
});

export default startServerAndCreateNextHandler(server);

const payments = [
  {
    currentAmount: 2000,
    id: 1,
    name: '食費',
    maxAmount: 35220,
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

const paymentHistories = [
  {
    id: 10,
    paymentId: 1,
    paymentDate: '2023-07-01T00:00:00+09:00',
    note: 'メモ',
    price: 1000,
  },
  {
    id: 11,
    paymentId: 2,
    paymentDate: '2023-07-02T00:00:00+09:00',
    note: null,
    price: 2200,
  },
  {
    id: 12,
    paymentId: 3,
    paymentDate: '2023-07-03T00:00:00+09:00',
    note: null,
    price: 222,
  },
  {
    id: 13,
    paymentId: 1,
    paymentDate: '2023-07-04T00:00:00+09:00',
    note: 'ハンバーグ定食',
    price: 980,
  },
];
