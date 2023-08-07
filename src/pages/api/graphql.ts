import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';
import prisma from '@/util/prisma';
import { GraphQLError } from 'graphql';

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
      const newPayment = await prisma.payment.create({
        data: {
          name,
          maxAmount,
          currentAmount: 0,
          author: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return newPayment.id;
    },
    updatePayment: async (_, { id, name, maxAmount }) => {
      const target = await prisma.payment.update({
        where: { id },
        data: { name, maxAmount },
      });
      return target.id;
    },
    deletePayment: async (_, { id }) => {
      const target = await prisma.payment.delete({
        where: { id },
      });
      return target.id;
    },
    createPaymentHistory: async (
      _,
      { note, price, paymentDate, paymentId },
      { user },
    ) => {
      const newData = await prisma.paymentHistory.create({
        data: {
          note,
          price,
          paymentDate,
          payment: {
            connect: {
              id: paymentId,
            },
          },
          author: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return newData.id;
    },
    updatePaymentHistory: async (_, { id, note, price, paymentDate }) => {
      const target = await prisma.paymentHistory.update({
        where: { id },
        data: {
          note,
          price,
          paymentDate,
        },
      });
      return target.id;
    },
    deletePaymentHistory: async (_, { id }) => {
      const target = await prisma.paymentHistory.delete({
        where: { id },
      });
      return target.id;
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
    // 実際のデータを取得する時は以下を使う
    // const user = await prisma.user.findUnique({
    //   where: { id: callerUserId },
    // });
    // if (user == null) {
    //   throw new GraphQLError('UNREGISTER USER');
    // }
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
