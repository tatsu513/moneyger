import { ApolloServer } from '@apollo/server';
import { Resolvers } from '@/dao/generated/graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';
// import { GraphQLError } from 'graphql';
import isThisMonth from '@/logics/isThisMonth';
import { DateTime } from 'luxon';

const resolvers: Resolvers = {
  Query: {
    listCategories: async () => {
      const data = categories.map((p) => {
        const currentAmount = paymentHistories.reduce((acc, val) => {
          if (
            !isThisMonth(DateTime.now(), DateTime.fromJSDate(val.paymentDate))
          )
            return acc;
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
      console.log('呼ばれました', { categoryId })
      const category = categories.find((p) => p.id === categoryId);
      if (category == null) return null;
      const currentAmount = paymentHistories.reduce((acc, val) => {
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
      const validHistories = paymentHistories.flatMap((h) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(h.paymentDate))
          ? [h]
          : [];
      });
      return validHistories.map((h) => ({
        ...h,
        paymentDate: h.paymentDate.toISOString(),
      }));
    },
    // paymentに紐づく支払履歴一覧
    listPaymentHistoriesByPaymentId: async (_, { paymentId }) => {
      const validHistories = paymentHistories.flatMap((h) => {
        return isThisMonth(DateTime.now(), DateTime.fromJSDate(h.paymentDate))
          ? [h]
          : [];
      });
      const results = validHistories.flatMap((p) => {
        if (p.paymentId === paymentId) {
          return [
            {
              ...p,
              paymentDate: p.paymentDate.toISOString(),
            },
          ];
        }
        return [];
      });
      return results;
    },
    // 支払履歴を1件取得
    paymentHistory: async (_, { paymentHistoryId }) => {
      const result = paymentHistories.find((p) => {
        return p.id === paymentHistoryId;
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
      const totalMaxAmount = categories.reduce(
        (acc, val) => acc + val.maxAmount,
        0,
      );
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
      console.info({ name, maxAmount, user }, 'createPayment called');
      return 1;
    },
    updateCategory: async (_, { id, name, maxAmount }) => {
      console.info({ id, name, maxAmount }, 'updatePayment called');
      return 1;
    },
    deleteCategory: async (_, { id }) => {
      console.info({ id }, 'updatePayment called');
      return 1;
    },
    createPaymentHistory: async (
      _,
      { note, price, paymentDate, paymentId },
      { user },
    ) => {
      console.info(
        { note, price, paymentDate, paymentId, user },
        'createPaymentHistory called',
      );
      return 1;
    },
    updatePaymentHistory: async (
      _,
      { id, paymentId, note, price, paymentDate },
    ) => {
      console.info(
        { id, paymentId, note, price, paymentDate },
        'createPaymentHistory called',
      );
      return id;
    },
    deletePaymentHistory: async (_, { id }) => {
      console.info({ id }, 'createPaymentHistory called');
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
  context: async (_req, _res) => {
    // const session = await getServerSession(req, res, authOptions);
    // if (session == null) {
    //   console.error('session is null')
    //   throw new GraphQLError('session is null in the graphql server');
    // }
    // const { id, name, email, emailVerified, image } = session.user
    return {
      user: {
        id: 'cll6sv0560000kz08gavj116i',
        name: 'name',
        email: 'email',
        emailVerified: new Date(),
        image: '#',
      },
    };
  },
});

const today = new Date();
const categories = [
  {
    id: 1,
    name: 'テスト1',
    maxAmount: 80000,
    authorId: 10,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'テスト2',
    maxAmount: 100000,
    authorId: 1,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'テスト3',
    maxAmount: 10000,
    authorId: 12,
    createdAt: new Date(),
  },
];

const paymentHistories = [
  {
    id: 100,
    note: 'スーパー',
    price: 1588,
    paymentDate: new Date(today.setDate(today.getDate() + 1)), // '2023-08-07T03:12:40+09:00',
    paymentId: 1,
    authorId: 1,
    createdAt: new Date(),
  },
  {
    id: 200,
    note: 'コンビニ',
    price: 600,
    paymentDate: new Date(),
    paymentId: 2,
    authorId: 1,
    createdAt: new Date(),
  },
  {
    id: 300,
    note: '薬局',
    price: 300,
    paymentDate: new Date(),
    paymentId: 3,
    authorId: 1,
    createdAt: new Date(),
  },
  {
    id: 999,
    note: 'ヤマザキ',
    price: 300,
    paymentDate: new Date(today.setMonth(today.getMonth() + 2)),
    paymentId: 3,
    authorId: 1,
    createdAt: new Date(),
  },
];
