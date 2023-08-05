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

export type Mutation = {
  createPayment: Scalars['Int']['output'];
  createPaymentHistory: Scalars['Int']['output'];
  deletePayment: Scalars['Int']['output'];
  deletePaymentHistory: Scalars['Int']['output'];
  updatePayment: Scalars['Int']['output'];
  updatePaymentHistory: Scalars['Int']['output'];
};

export type MutationCreatePaymentArgs = {
  maxAmount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationCreatePaymentHistoryArgs = {
  note?: InputMaybe<Scalars['String']['input']>;
  paymentDate: Scalars['String']['input'];
  paymentId: Scalars['Int']['input'];
  price: Scalars['Int']['input'];
};

export type MutationDeletePaymentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeletePaymentHistoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdatePaymentArgs = {
  id: Scalars['Int']['input'];
  maxAmount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationUpdatePaymentHistoryArgs = {
  id: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  paymentDate: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};

export type Payment = {
  currentAmount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  maxAmount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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
  listPaymentHistoriesByPaymentId: Array<PaymentHistory>;
  listPayments: Array<Payment>;
  payment?: Maybe<Payment>;
  paymentHistory?: Maybe<PaymentHistory>;
  paymentSummary: PaymentSummary;
};

export type QueryListPaymentHistoriesByPaymentIdArgs = {
  paymentId: Scalars['Int']['input'];
};

export type QueryPaymentArgs = {
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
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Payment: ResolverTypeWrapper<Payment>;
  PaymentHistory: ResolverTypeWrapper<PaymentHistory>;
  PaymentSummary: ResolverTypeWrapper<PaymentSummary>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Payment: Payment;
  PaymentHistory: PaymentHistory;
  PaymentSummary: PaymentSummary;
  Query: {};
  String: Scalars['String']['output'];
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createPayment?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePaymentArgs, 'maxAmount' | 'name'>
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
  deletePayment?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePaymentArgs, 'id'>
  >;
  deletePaymentHistory?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePaymentHistoryArgs, 'id'>
  >;
  updatePayment?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePaymentArgs, 'id' | 'maxAmount' | 'name'>
  >;
  updatePaymentHistory?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdatePaymentHistoryArgs,
      'id' | 'paymentDate' | 'price'
    >
  >;
};

export type PaymentResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['Payment'] = ResolversParentTypes['Payment'],
> = {
  currentAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  listPaymentHistoriesByPaymentId?: Resolver<
    Array<ResolversTypes['PaymentHistory']>,
    ParentType,
    ContextType,
    RequireFields<QueryListPaymentHistoriesByPaymentIdArgs, 'paymentId'>
  >;
  listPayments?: Resolver<
    Array<ResolversTypes['Payment']>,
    ParentType,
    ContextType
  >;
  payment?: Resolver<
    Maybe<ResolversTypes['Payment']>,
    ParentType,
    ContextType,
    RequireFields<QueryPaymentArgs, 'paymentId'>
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
  Mutation?: MutationResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  PaymentHistory?: PaymentHistoryResolvers<ContextType>;
  PaymentSummary?: PaymentSummaryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

export type PaymentSummaryQueryVariables = Exact<{ [key: string]: never }>;

export type PaymentSummaryQuery = {
  paymentSummary: {
    totalMaxAmount: number;
    totalCurrentAmount: number;
    totalPaymentRatio: number;
  };
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

export type PaymentHistoryPageListPaymentsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PaymentHistoryPageListPaymentsQuery = {
  listPayments: Array<{ id: number; name: string }>;
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

export type ListPaymentHistoriesQueryVariables = Exact<{
  paymentId: Scalars['Int']['input'];
}>;

export type ListPaymentHistoriesQuery = {
  listPaymentHistoriesByPaymentId: Array<{
    id: number;
    paymentId: number;
    paymentDate: string;
    note?: string | null;
    price: number;
  }>;
};

export type PaymentHistoriesPageQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PaymentHistoriesPageQuery = {
  listPayments: Array<{ id: number; name: string }>;
};

export type DeletePaymentDialog_DeletePaymentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeletePaymentDialog_DeletePaymentMutation = {
  deletePayment: number;
};

export type CreatePaymentDialog_UpdatePaymentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
}>;

export type CreatePaymentDialog_UpdatePaymentMutation = {
  updatePayment: number;
};

export type PaymentQueryVariables = Exact<{
  paymentId: Scalars['Int']['input'];
}>;

export type PaymentQuery = {
  payment?: {
    id: number;
    name: string;
    maxAmount: number;
    currentAmount: number;
  } | null;
};

export type PaymentPageQueryVariables = Exact<{
  paymentId: Scalars['Int']['input'];
}>;

export type PaymentPageQuery = {
  payment?: {
    id: number;
    name: string;
    maxAmount: number;
    currentAmount: number;
  } | null;
};

export type CreatePaymentDialog_CreatePaymentMutationVariables = Exact<{
  name: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
}>;

export type CreatePaymentDialog_CreatePaymentMutation = {
  createPayment: number;
};

export type ListPaymentsQueryVariables = Exact<{ [key: string]: never }>;

export type ListPaymentsQuery = {
  listPayments: Array<{
    id: number;
    name: string;
    maxAmount: number;
    currentAmount: number;
  }>;
};

export const PaymentSummaryDocument = gql`
  query paymentSummary {
    paymentSummary {
      totalMaxAmount
      totalCurrentAmount
      totalPaymentRatio
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
    $paymentDate: String!
    $price: Int!
    $note: String
  ) {
    updatePaymentHistory(
      id: $id
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
export const PaymentHistoryPageListPaymentsDocument = gql`
  query paymentHistoryPageListPayments {
    listPayments {
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
export const ListPaymentHistoriesDocument = gql`
  query listPaymentHistories($paymentId: Int!) {
    listPaymentHistoriesByPaymentId(paymentId: $paymentId) {
      id
      paymentId
      paymentDate
      note
      price
    }
  }
`;
export const PaymentHistoriesPageDocument = gql`
  query paymentHistoriesPage {
    listPayments {
      id
      name
    }
  }
`;
export const DeletePaymentDialog_DeletePaymentDocument = gql`
  mutation deletePaymentDialog_DeletePayment($id: Int!) {
    deletePayment(id: $id)
  }
`;
export const CreatePaymentDialog_UpdatePaymentDocument = gql`
  mutation createPaymentDialog_UpdatePayment(
    $id: Int!
    $name: String!
    $maxAmount: Int!
  ) {
    updatePayment(id: $id, name: $name, maxAmount: $maxAmount)
  }
`;
export const PaymentDocument = gql`
  query payment($paymentId: Int!) {
    payment(paymentId: $paymentId) {
      id
      name
      maxAmount
      currentAmount
    }
  }
`;
export const PaymentPageDocument = gql`
  query paymentPage($paymentId: Int!) {
    payment(paymentId: $paymentId) {
      id
      name
      maxAmount
      currentAmount
    }
  }
`;
export const CreatePaymentDialog_CreatePaymentDocument = gql`
  mutation createPaymentDialog_CreatePayment($name: String!, $maxAmount: Int!) {
    createPayment(name: $name, maxAmount: $maxAmount)
  }
`;
export const ListPaymentsDocument = gql`
  query listPayments {
    listPayments {
      id
      name
      maxAmount
      currentAmount
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
    paymentHistoryPageListPayments(
      variables?: PaymentHistoryPageListPaymentsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PaymentHistoryPageListPaymentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PaymentHistoryPageListPaymentsQuery>(
            PaymentHistoryPageListPaymentsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'paymentHistoryPageListPayments',
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
    listPaymentHistories(
      variables: ListPaymentHistoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ListPaymentHistoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ListPaymentHistoriesQuery>(
            ListPaymentHistoriesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'listPaymentHistories',
        'query',
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
    deletePaymentDialog_DeletePayment(
      variables: DeletePaymentDialog_DeletePaymentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeletePaymentDialog_DeletePaymentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePaymentDialog_DeletePaymentMutation>(
            DeletePaymentDialog_DeletePaymentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'deletePaymentDialog_DeletePayment',
        'mutation',
      );
    },
    createPaymentDialog_UpdatePayment(
      variables: CreatePaymentDialog_UpdatePaymentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreatePaymentDialog_UpdatePaymentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePaymentDialog_UpdatePaymentMutation>(
            CreatePaymentDialog_UpdatePaymentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'createPaymentDialog_UpdatePayment',
        'mutation',
      );
    },
    payment(
      variables: PaymentQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PaymentQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PaymentQuery>(PaymentDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'payment',
        'query',
      );
    },
    paymentPage(
      variables: PaymentPageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PaymentPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PaymentPageQuery>(PaymentPageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'paymentPage',
        'query',
      );
    },
    createPaymentDialog_CreatePayment(
      variables: CreatePaymentDialog_CreatePaymentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreatePaymentDialog_CreatePaymentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePaymentDialog_CreatePaymentMutation>(
            CreatePaymentDialog_CreatePaymentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'createPaymentDialog_CreatePayment',
        'mutation',
      );
    },
    listPayments(
      variables?: ListPaymentsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ListPaymentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ListPaymentsQuery>(ListPaymentsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'listPayments',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
