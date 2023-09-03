import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';
import prisma from '@/util/prisma';
import isThisMonth from '@/logics/isThisMonth';
import { DateTime } from 'luxon';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GraphQLError } from 'graphql';
import getJstDateTimeFromJsDate from '@/logics/getJstDateTimeFromJsDate';
import { AVAILABLE_MONTH } from '@/constants/appSettingValue';

const resolvers: Resolvers = {
  Query: {
    listCategories: async (_, { targetDate }) => {
      const categoriesPromise = prisma.category.findMany();
      const historiesPromise = prisma.paymentHistory.findMany();
      const [categories, histories] = await Promise.all([
        categoriesPromise,
        historiesPromise,
      ]);
      const validHistories = targetDate
        ? histories.flatMap((h) => {
            return isThisMonth(
              DateTime.fromISO(targetDate),
              DateTime.fromJSDate(h.paymentDate),
            )
              ? [h]
              : [];
          })
        : histories;
      return categories.map((p) => {
        const currentAmount = validHistories.reduce((acc, val) => {
          return val.paymentId === p.id ? acc + val.price : acc;
        }, 0);
        return {
          ...p,
          currentAmount,
        };
      });
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
      return results.flatMap((r) => {
        const { dateTime, str } = getJstDateTimeFromJsDate(r.paymentDate);
        if (str == null) {
          throw new GraphQLError(
            '支払履歴の支払日が正しく取得できませんでした',
          );
        }
        return dateTime.month >=
          DateTime.now().minus({ months: AVAILABLE_MONTH }).month
          ? [{ ...r, paymentDate: str }]
          : [];
      });
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      const results = await prisma.paymentHistory.findMany({
        where: { paymentId },
        orderBy: { paymentDate: 'desc' },
      });
      return results.flatMap((r) => {
        const { dateTime, str } = getJstDateTimeFromJsDate(r.paymentDate);
        if (str == null) {
          throw new GraphQLError(
            'paymentに紐づく支払履歴の支払日が正しく取得できませんでした',
          );
        }
        return dateTime.month >=
          DateTime.now().minus({ months: AVAILABLE_MONTH }).month
          ? [{ ...r, paymentDate: str }]
          : [];
      });
    },
    // 支払履歴を1件取得
    paymentHistory: async (_, { paymentHistoryId }) => {
      const result = await prisma.paymentHistory.findUnique({
        where: { id: paymentHistoryId },
      });
      if (result == null) {
        throw Error('支払履歴が見つかりません');
      }
      const { str } = getJstDateTimeFromJsDate(result.paymentDate);
      if (str == null) {
        throw new GraphQLError(
          '支払履歴を1件の支払日が正しく取得できませんでした',
        );
      }
      return {
        ...result,
        paymentDate: str,
      };
    },
    // ダッシュボード用
    paymentSummary: async (_, { targetDate }) => {
      const listCategories = await prisma.category.findMany();
      const totalMaxAmount = listCategories.reduce(
        (acc, val) => acc + val.maxAmount,
        0,
      );
      const paymentHistories = await prisma.paymentHistory.findMany();
      const validHistories = paymentHistories.flatMap((h) => {
        return isThisMonth(
          DateTime.fromISO(targetDate),
          DateTime.fromJSDate(h.paymentDate),
        )
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
    listCategoryLabels: async (_, _args) => {
      const labels = await prisma.categoryLabel.findMany();
      return labels;
    }, 
  },
  Mutation: {
    createCategory: async (_, { name, maxAmount }, { user }) => {
      const newPayment = await prisma.category
        .create({
          data: {
            name,
            maxAmount,
            author: {
              connect: {
                id: user.id,
              },
            },
          },
        })
        .catch((err) => {
          throw new GraphQLError('カテゴリの作成に失敗しました', {
            originalError: err,
          });
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
    createCategoryLabel: async (_, { categoryId, labels }) => {
      const target = await prisma.categoryLabel.createMany({
        data: labels.map((l) => ({ categoryId, name: l })),
        skipDuplicates: true,
      }).catch((err) => {
        console.error('カテゴリラベルの登録に失敗しました', { err, categoryId, labels });
        throw new GraphQLError('カテゴリラベルの登録に失敗しました')
      })
      return target.count
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
