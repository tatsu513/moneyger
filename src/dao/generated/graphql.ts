import { GraphQLResolveInfo } from 'graphql';
import { Context } from 'src/types/context';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Category = {
  currentAmount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  maxAmount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  createCategory: Scalars['Int']['output'];
  createPaymentHistory: Scalars['Int']['output'];
  deleteCategory: Scalars['Int']['output'];
  deletePaymentHistory: Scalars['Int']['output'];
  updateCategory: Scalars['Int']['output'];
  updatePaymentHistory: Scalars['Int']['output'];
};

export type MutationCreateCategoryArgs = {
  maxAmount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationCreatePaymentHistoryArgs = {
  note?: InputMaybe<Scalars['String']['input']>;
  paymentDate: Scalars['String']['input'];
  paymentId: Scalars['Int']['input'];
  price: Scalars['Int']['input'];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeletePaymentHistoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateCategoryArgs = {
  id: Scalars['Int']['input'];
  maxAmount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationUpdatePaymentHistoryArgs = {
  id: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  paymentDate: Scalars['String']['input'];
  paymentId: Scalars['Int']['input'];
  price: Scalars['Int']['input'];
};

export type PaymentHistory = {
  id: Scalars['Int']['output'];
  note?: Maybe<Scalars['String']['output']>;
  paymentDate: Scalars['String']['output'];
  paymentId: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
};

export type PaymentSummary = {
  totalCurrentAmount: Scalars['Int']['output'];
  totalMaxAmount: Scalars['Int']['output'];
  totalPaymentRatio: Scalars['Float']['output'];
};

export type Query = {
  category?: Maybe<Category>;
  listCategories: Array<Category>;
  listPaymentHistories: Array<PaymentHistory>;
  listPaymentHistoriesByPaymentId: Array<PaymentHistory>;
  paymentHistory?: Maybe<PaymentHistory>;
  paymentSummary: PaymentSummary;
};

export type QueryCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};

export type QueryListPaymentHistoriesByPaymentIdArgs = {
  paymentId: Scalars['Int']['input'];
};

export type QueryPaymentHistoryArgs = {
  paymentHistoryId: Scalars['Int']['input'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PaymentHistory: ResolverTypeWrapper<PaymentHistory>;
  PaymentSummary: ResolverTypeWrapper<PaymentSummary>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PaymentHistory: PaymentHistory;
  PaymentSummary: PaymentSummary;
  Query: {};
  String: Scalars['String']['output'];
};

export type CategoryResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['Category'] = ResolversParentTypes['Category'],
> = {
  currentAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createCategory?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCategoryArgs, 'maxAmount' | 'name'>
  >;
  createPaymentHistory?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreatePaymentHistoryArgs,
      'paymentDate' | 'paymentId' | 'price'
    >
  >;
  deleteCategory?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCategoryArgs, 'id'>
  >;
  deletePaymentHistory?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePaymentHistoryArgs, 'id'>
  >;
  updateCategory?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCategoryArgs, 'id' | 'maxAmount' | 'name'>
  >;
  updatePaymentHistory?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdatePaymentHistoryArgs,
      'id' | 'paymentDate' | 'paymentId' | 'price'
    >
  >;
};

export type PaymentHistoryResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['PaymentHistory'] = ResolversParentTypes['PaymentHistory'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentSummaryResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['PaymentSummary'] = ResolversParentTypes['PaymentSummary'],
> = {
  totalCurrentAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalMaxAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPaymentRatio?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  category?: Resolver<
    Maybe<ResolversTypes['Category']>,
    ParentType,
    ContextType,
    RequireFields<QueryCategoryArgs, 'categoryId'>
  >;
  listCategories?: Resolver<
    Array<ResolversTypes['Category']>,
    ParentType,
    ContextType
  >;
  listPaymentHistories?: Resolver<
    Array<ResolversTypes['PaymentHistory']>,
    ParentType,
    ContextType
  >;
  listPaymentHistoriesByPaymentId?: Resolver<
    Array<ResolversTypes['PaymentHistory']>,
    ParentType,
    ContextType,
    RequireFields<QueryListPaymentHistoriesByPaymentIdArgs, 'paymentId'>
  >;
  paymentHistory?: Resolver<
    Maybe<ResolversTypes['PaymentHistory']>,
    ParentType,
    ContextType,
    RequireFields<QueryPaymentHistoryArgs, 'paymentHistoryId'>
  >;
  paymentSummary?: Resolver<
    ResolversTypes['PaymentSummary'],
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = Context> = {
  Category?: CategoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaymentHistory?: PaymentHistoryResolvers<ContextType>;
  PaymentSummary?: PaymentSummaryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

export type DeleteCategoryDialog_DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteCategoryDialog_DeleteCategoryMutation = {
  deleteCategory: number;
};

export type CreateCategoryDialog_UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
}>;

export type CreateCategoryDialog_UpdateCategoryMutation = {
  updateCategory: number;
};

export type CategoryPageQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;

export type CategoryPageQuery = {
  category?: {
    id: number;
    name: string;
    maxAmount: number;
    currentAmount: number;
  } | null;
};

export type CreateCategoryDialog_CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
}>;

export type CreateCategoryDialog_CreateCategoryMutation = {
  createCategory: number;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  listCategories: Array<{
    id: number;
    name: string;
    maxAmount: number;
    currentAmount: number;
  }>;
};

export type PaymentSummaryQueryVariables = Exact<{ [key: string]: never }>;

export type PaymentSummaryQuery = {
  paymentSummary: {
    totalMaxAmount: number;
    totalCurrentAmount: number;
    totalPaymentRatio: number;
  };
  listCategories: Array<{
    id: number;
    name: string;
    maxAmount: number;
    currentAmount: number;
  }>;
};

export type DeletePaymentHistoryDialog_DeletePaymentHistoryMutationVariables =
  Exact<{
    id: Scalars['Int']['input'];
  }>;

export type DeletePaymentHistoryDialog_DeletePaymentHistoryMutation = {
  deletePaymentHistory: number;
};

export type CreatePaymentHistoryDialog_UpdateHistoryPaymentMutationVariables =
  Exact<{
    id: Scalars['Int']['input'];
    paymentId: Scalars['Int']['input'];
    paymentDate: Scalars['String']['input'];
    price: Scalars['Int']['input'];
    note?: InputMaybe<Scalars['String']['input']>;
  }>;

export type CreatePaymentHistoryDialog_UpdateHistoryPaymentMutation = {
  updatePaymentHistory: number;
};

export type PaymentHistoryPageQueryVariables = Exact<{
  paymentHistoryId: Scalars['Int']['input'];
}>;

export type PaymentHistoryPageQuery = {
  paymentHistory?: {
    id: number;
    paymentId: number;
    paymentDate: string;
    note?: string | null;
    price: number;
  } | null;
};

export type PaymentHistoryPageListCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PaymentHistoryPageListCategoriesQuery = {
  listCategories: Array<{ id: number; name: string }>;
};

export type CreatePaymentHistoryDialog_CreatePaymentHistoryMutationVariables =
  Exact<{
    paymentId: Scalars['Int']['input'];
    paymentDate: Scalars['String']['input'];
    price: Scalars['Int']['input'];
    note?: InputMaybe<Scalars['String']['input']>;
  }>;

export type CreatePaymentHistoryDialog_CreatePaymentHistoryMutation = {
  createPaymentHistory: number;
};

export type PaymentHistoriesPageQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PaymentHistoriesPageQuery = {
  listCategories: Array<{ id: number; name: string }>;
  listPaymentHistories: Array<{
    id: number;
    paymentId: number;
    paymentDate: string;
    note?: string | null;
    price: number;
  }>;
};

export const DeleteCategoryDialog_DeleteCategoryDocument = gql`
  mutation deleteCategoryDialog_DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;
export const CreateCategoryDialog_UpdateCategoryDocument = gql`
  mutation createCategoryDialog_UpdateCategory(
    $id: Int!
    $name: String!
    $maxAmount: Int!
  ) {
    updateCategory(id: $id, name: $name, maxAmount: $maxAmount)
  }
`;
export const CategoryPageDocument = gql`
  query categoryPage($categoryId: Int!) {
    category(categoryId: $categoryId) {
      id
      name
      maxAmount
      currentAmount
    }
  }
`;
export const CreateCategoryDialog_CreateCategoryDocument = gql`
  mutation createCategoryDialog_CreateCategory(
    $name: String!
    $maxAmount: Int!
  ) {
    createCategory(name: $name, maxAmount: $maxAmount)
  }
`;
export const CategoriesDocument = gql`
  query categories {
    listCategories {
      id
      name
      maxAmount
      currentAmount
    }
  }
`;
export const PaymentSummaryDocument = gql`
  query paymentSummary {
    paymentSummary {
      totalMaxAmount
      totalCurrentAmount
      totalPaymentRatio
    }
    listCategories {
      id
      name
      maxAmount
      currentAmount
    }
  }
`;
export const DeletePaymentHistoryDialog_DeletePaymentHistoryDocument = gql`
  mutation deletePaymentHistoryDialog_DeletePaymentHistory($id: Int!) {
    deletePaymentHistory(id: $id)
  }
`;
export const CreatePaymentHistoryDialog_UpdateHistoryPaymentDocument = gql`
  mutation createPaymentHistoryDialog_UpdateHistoryPayment(
    $id: Int!
    $paymentId: Int!
    $paymentDate: String!
    $price: Int!
    $note: String
  ) {
    updatePaymentHistory(
      id: $id
      paymentId: $paymentId
      paymentDate: $paymentDate
      price: $price
      note: $note
    )
  }
`;
export const PaymentHistoryPageDocument = gql`
  query paymentHistoryPage($paymentHistoryId: Int!) {
    paymentHistory(paymentHistoryId: $paymentHistoryId) {
      id
      paymentId
      paymentDate
      note
      price
    }
  }
`;
export const PaymentHistoryPageListCategoriesDocument = gql`
  query paymentHistoryPageListCategories {
    listCategories {
      id
      name
    }
  }
`;
export const CreatePaymentHistoryDialog_CreatePaymentHistoryDocument = gql`
  mutation createPaymentHistoryDialog_CreatePaymentHistory(
    $paymentId: Int!
    $paymentDate: String!
    $price: Int!
    $note: String
  ) {
    createPaymentHistory(
      paymentId: $paymentId
      paymentDate: $paymentDate
      price: $price
      note: $note
    )
  }
`;
export const PaymentHistoriesPageDocument = gql`
  query paymentHistoriesPage {
    listCategories {
      id
      name
    }
    listPaymentHistories {
      id
      paymentId
      paymentDate
      note
      price
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    deleteCategoryDialog_DeleteCategory(
      variables: DeleteCategoryDialog_DeleteCategoryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteCategoryDialog_DeleteCategoryMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteCategoryDialog_DeleteCategoryMutation>(
            DeleteCategoryDialog_DeleteCategoryDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'deleteCategoryDialog_DeleteCategory',
        'mutation',
      );
    },
    createCategoryDialog_UpdateCategory(
      variables: CreateCategoryDialog_UpdateCategoryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateCategoryDialog_UpdateCategoryMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateCategoryDialog_UpdateCategoryMutation>(
            CreateCategoryDialog_UpdateCategoryDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'createCategoryDialog_UpdateCategory',
        'mutation',
      );
    },
    categoryPage(
      variables: CategoryPageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CategoryPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CategoryPageQuery>(CategoryPageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'categoryPage',
        'query',
      );
    },
    createCategoryDialog_CreateCategory(
      variables: CreateCategoryDialog_CreateCategoryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateCategoryDialog_CreateCategoryMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateCategoryDialog_CreateCategoryMutation>(
            CreateCategoryDialog_CreateCategoryDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'createCategoryDialog_CreateCategory',
        'mutation',
      );
    },
    categories(
      variables?: CategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CategoriesQuery>(CategoriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'categories',
        'query',
      );
    },
    paymentSummary(
      variables?: PaymentSummaryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PaymentSummaryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PaymentSummaryQuery>(
            PaymentSummaryDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'paymentSummary',
        'query',
      );
    },
    deletePaymentHistoryDialog_DeletePaymentHistory(
      variables: DeletePaymentHistoryDialog_DeletePaymentHistoryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeletePaymentHistoryDialog_DeletePaymentHistoryMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePaymentHistoryDialog_DeletePaymentHistoryMutation>(
            DeletePaymentHistoryDialog_DeletePaymentHistoryDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'deletePaymentHistoryDialog_DeletePaymentHistory',
        'mutation',
      );
    },
    createPaymentHistoryDialog_UpdateHistoryPayment(
      variables: CreatePaymentHistoryDialog_UpdateHistoryPaymentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreatePaymentHistoryDialog_UpdateHistoryPaymentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePaymentHistoryDialog_UpdateHistoryPaymentMutation>(
            CreatePaymentHistoryDialog_UpdateHistoryPaymentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'createPaymentHistoryDialog_UpdateHistoryPayment',
        'mutation',
      );
    },
    paymentHistoryPage(
      variables: PaymentHistoryPageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PaymentHistoryPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PaymentHistoryPageQuery>(
            PaymentHistoryPageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'paymentHistoryPage',
        'query',
      );
    },
    paymentHistoryPageListCategories(
      variables?: PaymentHistoryPageListCategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PaymentHistoryPageListCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PaymentHistoryPageListCategoriesQuery>(
            PaymentHistoryPageListCategoriesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'paymentHistoryPageListCategories',
        'query',
      );
    },
    createPaymentHistoryDialog_CreatePaymentHistory(
      variables: CreatePaymentHistoryDialog_CreatePaymentHistoryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreatePaymentHistoryDialog_CreatePaymentHistoryMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePaymentHistoryDialog_CreatePaymentHistoryMutation>(
            CreatePaymentHistoryDialog_CreatePaymentHistoryDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'createPaymentHistoryDialog_CreatePaymentHistory',
        'mutation',
      );
    },
    paymentHistoriesPage(
      variables?: PaymentHistoriesPageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PaymentHistoriesPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PaymentHistoriesPageQuery>(
            PaymentHistoriesPageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'paymentHistoriesPage',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
