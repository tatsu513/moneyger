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
      const categoryLabelPromise = prisma.categoryLabel.findMany();
      const [categories, histories, categoryLabels] = await Promise.all([
        categoriesPromise,
        historiesPromise,
        categoryLabelPromise,
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
      const data = categories.map((p) => {
        const currentAmount = validHistories.reduce((acc, val) => {
          return val.categoryId === p.id ? acc + val.price : acc;
        }, 0);
        const labels = categoryLabels.flatMap((l) => {
          const hasId = p.categoryLabelIds.includes(l.id)
          return hasId ? [l] : []
        })
        return {
          ...p,
          currentAmount,
          labels
        };
      });
      return data
    },
    category: async (_, { categoryId }) => {
      const categoryPromise = prisma.category.findUnique({
        where: { id: categoryId },
      });
      const historiesPromise = prisma.paymentHistory.findMany({
        where: { categoryId },
      });
      const categoryLabelPromise = prisma.categoryLabel.findMany()
      const [category, histories, labels] = await Promise.all([
        categoryPromise,
        historiesPromise,
        categoryLabelPromise
      ]);
      if (category == null) return null;
      const currentAmount = histories.reduce((acc, val) => {
        return val.categoryId === category.id ? acc + val.price : acc;
      }, 0);
      const includedLabels = labels.flatMap((l) => l.id === categoryId ? [l] : [])
      return {
        id: category.id,
        name: category.name,
        currentAmount,
        maxAmount: category.maxAmount,
        labels: includedLabels
      };
    },
    // 支払履歴を全て取得
    listPaymentHistories: async () => {
      const historiesPrimise = prisma.paymentHistory.findMany({
        orderBy: {
          paymentDate: 'desc',
        },
      });
      const labelsPromise = prisma.categoryLabel.findMany()

      const [histories, labels] = await Promise.all([
        historiesPrimise,
        labelsPromise
      ])
      return histories.flatMap((r) => {
        const { dateTime, str } = getJstDateTimeFromJsDate(r.paymentDate);
        if (str == null) {
          throw new GraphQLError(
            '支払履歴の支払日が正しく取得できませんでした',
          );
        }
        const categoryLabels = labels.flatMap((l) => {
          const isInclude = r.categoryLabelIds.includes(l.id)
          return isInclude ? [l] : []
        })
        return dateTime.month >=
          DateTime.now().minus({ months: AVAILABLE_MONTH }).month
          ? [{ ...r, paymentDate: str, labels: categoryLabels }]
          : [];
      });
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByCategoryId: async (_, { categoryId }) => {
      const historiesPrimise = prisma.paymentHistory.findMany({
        where: { categoryId: categoryId },
        orderBy: { paymentDate: 'desc' },
      });
      const labelsPromise = prisma.categoryLabel.findMany();
      const [histories, labels] = await Promise.all([
        historiesPrimise,
        labelsPromise
      ])

      return histories.flatMap((r) => {
        const { dateTime, str } = getJstDateTimeFromJsDate(r.paymentDate);
        if (str == null) {
          throw new GraphQLError(
            'paymentに紐づく支払履歴の支払日が正しく取得できませんでした',
          );
        }
        const categoryLabels = labels.flatMap((l) => {
          const isInclude = r.categoryLabelIds.includes(l.id)
          return isInclude ? [l] : []
        })
        return dateTime.month >=
          DateTime.now().minus({ months: AVAILABLE_MONTH }).month
          ? [{ ...r, paymentDate: str, labels: categoryLabels }]
          : [];
      });
    },
    // 支払履歴を1件取得
    paymentHistory: async (_, { paymentHistoryId }) => {
      const historyPrimise = prisma.paymentHistory.findUnique({
        where: { id: paymentHistoryId },
      });
      const labelsPromise = prisma.categoryLabel.findMany();
      const [history, labels] = await Promise.all([
        historyPrimise,
        labelsPromise
      ])
      if (history == null) {
        throw Error('支払履歴が見つかりません');
      }
      const { str } = getJstDateTimeFromJsDate(history.paymentDate);
      if (str == null) {
        throw new GraphQLError(
          '支払履歴を1件の支払日が正しく取得できませんでした',
        );
      }
      const categoryLabels = labels.flatMap((l) => {
        const isInclude = history.categoryLabelIds.includes(l.id)
        return isInclude ? [l] : []
      })
      return {
        ...history,
        paymentDate: str,
        labels: categoryLabels,
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
    createCategory: async (_, { name, maxAmount, labelIds }, { user }) => {
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
            categoryLabelIds: labelIds
          },
        })
        .catch((err) => {
          throw new GraphQLError('カテゴリの作成に失敗しました', {
            originalError: err,
          });
        });
      return newPayment.id;
    },
    updateCategory: async (_, { id, name, maxAmount, labelIds }) => {
      const target = await prisma.category.update({
        where: { id },
        data: {
          name,
          maxAmount,
          categoryLabelIds: labelIds
        },
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
      { note, price, paymentDate, categoryId, categoryLabelIds },
      { user },
    ) => {
      const newData = await prisma.paymentHistory.create({
        data: {
          note,
          price,
          paymentDate: new Date(paymentDate),
          category: {
            connect: {
              id: categoryId,
            },
          },
          author: {
            connect: {
              id: user.id,
            },
          },
          categoryLabelIds
        },
      });
      return newData.id;
    },
    updatePaymentHistory: async (
      _,
      { id, categoryId, note, price, paymentDate, labelIds },
    ) => {
      const target = await prisma.paymentHistory.update({
        where: { id },
        data: {
          categoryId,
          note,
          price,
          paymentDate,
          categoryLabelIds: labelIds
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
        data: labels.map((l) => ({ name: l })),
        skipDuplicates: true,
      }).catch((err) => {
        console.error('カテゴリラベルの登録に失敗しました', { err, categoryId, labels });
        throw new GraphQLError('カテゴリラベルの登録に失敗しました')
      })
      return target.count
    },
    updateCaregoryLabel: async (_, { categoryLabelId, name }) => {
      const target = await prisma.categoryLabel.update({
        where: { id: categoryLabelId },
        data: { name }
      }).catch((err) => {
        console.error('カテゴリラベルの更新に失敗しました', { err, categoryLabelId, name });
        throw new GraphQLError('カテゴリラベルの更新に失敗しました')
      })
      return target.id
    },
    deleteCaregoryLabel: async (_, { categoryLabelId }) => {
      const target = await prisma.categoryLabel.delete({
        where: { id: categoryLabelId },
      }).catch((err) => {
        console.error('カテゴリラベルの削除に失敗しました', { err, categoryLabelId, name });
        throw new GraphQLError('カテゴリラベルの削除に失敗しました')
      })
      return target.id
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
