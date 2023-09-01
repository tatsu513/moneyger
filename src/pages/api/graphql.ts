import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';
import prisma from '@/util/prisma';
// import { GraphQLError } from 'graphql';
import isThisMonth from '@/logics/isThisMonth';
import { DateTime } from 'luxon';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GraphQLError } from 'graphql';
// import { GraphQLError } from 'graphql/error';

const resolvers: Resolvers = {
  Query: {
    listCategories: async () => {
      const categoriesPromise = prisma.category.findMany();
      const historiesPromise = prisma.paymentHistory.findMany();
      const [categories, histories] = await Promise.all([
        categoriesPromise,
        historiesPromise,
      ]);
      const validHistories = histories.flatMap((h) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(h.paymentDate))
          ? [h]
          : [];
      });
      const data = categories.map((p) => {
        const currentAmount = validHistories.reduce((acc, val) => {
          return val.paymentId === p.id ? acc + val.price : acc;
        }, 0);
        return {
          ...p,
          currentAmount,
        };
      });
      return data;
    },
    category: async (_, { categoryId }) => {
      const categoryPromise = prisma.category.findUnique({
        where: { id: categoryId },
      });
      const historiesPromise = prisma.paymentHistory.findMany({
        where: { paymentId: categoryId },
      });
      const [category, histories] = await Promise.all([
        categoryPromise,
        historiesPromise,
      ]);
      if (category == null) return null;
      const currentAmount = histories.reduce((acc, val) => {
        return val.paymentId === category.id ? acc + val.price : acc;
      }, 0);
      return {
        id: category.id,
        name: category.name,
        currentAmount,
        maxAmount: category.maxAmount,
      };
    },
    // 支払履歴を全て取得
    listPaymentHistories: async () => {
      const results = await prisma.paymentHistory.findMany({
        orderBy: {
          paymentDate: 'desc',
        },
      });
      const validHistories = results.flatMap((r) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(r.paymentDate))
          ? [r]
          : [];
      });
      return validHistories.map((r) => ({
        ...r,
        paymentDate: r.paymentDate.toISOString(),
      }));
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      const results = await prisma.paymentHistory.findMany({
        where: { paymentId },
        orderBy: { paymentDate: 'desc' },
      });
      const validHistories = results.flatMap((r) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(r.paymentDate))
          ? [r]
          : [];
      });
      return validHistories.map((r) => ({
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
    paymentSummary: async (_, _args) => {
      const listCategories = await prisma.category.findMany();
      const totalMaxAmount = listCategories.reduce(
        (acc, val) => acc + val.maxAmount,
        0,
      );
      const paymentHistories = await prisma.paymentHistory.findMany();
      const validHistories = paymentHistories.flatMap((h) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(h.paymentDate))
          ? [h]
          : [];
      });
      const totalCurrentAmount = validHistories.reduce((acc, val) => {
        return acc + val.price;
      }, 0);
      const ratio = Math.floor((totalCurrentAmount / totalMaxAmount) * 100);
      return {
        totalMaxAmount,
        totalCurrentAmount,
        totalPaymentRatio: isNaN(ratio) ? 0 : ratio,
      };
    },
  },
  Mutation: {
    createCategory: async (_, { name, maxAmount }, { user }) => {
      const newPayment = await prisma.category.create({
        data: {
          name,
          maxAmount,
          author: {
            connect: {
              id: user.id,
            },
          },
        },
      }).catch((err) => {
        throw new GraphQLError('カテゴリの作成に失敗しました', { originalError: err })
      });
      return newPayment.id;
    },
    updateCategory: async (_, { id, name, maxAmount }) => {
      const target = await prisma.category.update({
        where: { id },
        data: { name, maxAmount },
      });
      return target.id;
    },
    deleteCategory: async (_, { id }) => {
      const target = await prisma.category.delete({
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
    updatePaymentHistory: async (
      _,
      { id, paymentId, note, price, paymentDate },
    ) => {
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
  context: async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session == null) {
      console.error('session is null');
      throw new GraphQLError('session is null in the graphql server');
    }
    return { user: session.user };
  },
});
