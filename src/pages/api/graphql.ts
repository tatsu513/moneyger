import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';
import prisma from '@/util/prisma';
import { GraphQLError } from 'graphql';

const resolvers: Resolvers = {
  Query: {
    listPayments: async () => {
      return await prisma.payment.findMany();
    },
    payment: async (_, { paymentId }) => {
      const target = await prisma.payment.findUnique({
        where: { id: paymentId },
      });
      if (target == null) return null;
      return {
        id: target.id,
        name: target.name,
        currentAmount: target.currentAmount,
        maxAmount: target.maxAmount,
      };
    },
    // 支払履歴を全て取得
    listPaymentHistories: async () => {
      const results = await prisma.paymentHistory.findMany();
      return results.map((r) => ({
        ...r,
        paymentDate: r.paymentDate.toISOString(),
      }));
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      const results = await prisma.paymentHistory.findMany({
        where: { paymentId },
      });
      return results.map((r) => ({
        id: r.id,
        note: r.note,
        price: r.price,
        paymentDate: r.paymentDate.toISOString(),
        paymentId,
      }));
    },
    // 支払履歴を1件取得
    paymentHistory: async (_, { paymentHistoryId }) => {
      const result = await prisma.paymentHistory.findUnique({
        where: { id: paymentHistoryId },
      });
      if (result == null) {
        throw Error('支払履歴が見つかりません');
      }
      return {
        ...result,
        paymentDate: result.paymentDate.toISOString(),
      };
    },
    // ダッシュボード用
    paymentSummary: async (_, _args, { user }) => {
      console.log({ user });
      const listPayments = await prisma.payment.findMany();
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
          paymentDate: new Date(paymentDate),
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
    //   throw new GraphQLError('UNREGISTERED USER');
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
