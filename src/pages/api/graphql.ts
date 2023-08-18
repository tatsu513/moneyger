import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';
import prisma from '@/util/prisma';
import { GraphQLError } from 'graphql';
import isThisMonth from '@/logics/isThisMonth';
import { DateTime } from 'luxon';

const resolvers: Resolvers = {
  Query: {
    listPayments: async () => {
      const paymentsPromise = prisma.payment.findMany();
      const historiesPromise = prisma.paymentHistory.findMany();
      const [payments, histories] = await Promise.all([paymentsPromise, historiesPromise]);
      const validHistories = histories.flatMap((h) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(h.paymentDate)) ? [h] : []
      })
      const data = payments.map((p) => {
        const currentAmount = validHistories.reduce((acc, val) => {
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
      const paymentPromise = prisma.payment.findUnique({
        where: { id: paymentId },
      });
      const historiesPromise = prisma.paymentHistory.findMany({
        where: { paymentId }
      })
      const [payment, histories] = await Promise.all([paymentPromise, historiesPromise]);
      if (payment == null) return null;
      const currentAmount = histories.reduce((acc, val) => {
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
      const results = await prisma.paymentHistory.findMany({
        orderBy: {
          paymentDate: 'desc'
        }
      });
      const validHistories = results.flatMap((r) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(r.paymentDate)) ? [r] : []
      })
      return validHistories
        .map((r) => ({
          ...r,
          paymentDate: r.paymentDate.toISOString(),
      }));
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      const results = await prisma.paymentHistory.findMany({
        where: { paymentId },
        orderBy: { paymentDate: 'desc' }
      });
      const validHistories = results.flatMap((r) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(r.paymentDate)) ? [r] : []
      })
      return validHistories
        .map((r) => ({
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
      const totalMaxAmount = listPayments.reduce(
        (acc, val) => acc + val.maxAmount,
        0
      );
      const paymentHistories = await prisma.paymentHistory.findMany();
      const validHistories = paymentHistories.flatMap((h) => {
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
        totalPaymentRatio: isNaN(ratio) ? 0 : ratio,
      };
    },
  },
  Mutation: {
    createPayment: async (_, { name, maxAmount }, { user }) => {
      const newPayment = await prisma.payment.create({
        data: {
          name,
          maxAmount,
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
    updatePaymentHistory: async (_, { id, paymentId ,note, price, paymentDate }) => {
      const target = await prisma.paymentHistory.update({
        where: { id },
        data: {
          paymentId,
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
    const user = await prisma.user.findUnique({
      where: { id: callerUserId },
    });
    if (user == null) {
      throw new GraphQLError('user undifined');
    }
    return {
      user: {
        id: callerUserId,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
      },
    };
  },
});
