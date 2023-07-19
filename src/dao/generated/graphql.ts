import { GraphQLResolveInfo } from "graphql"
import { Context } from "src/types/context"
import { GraphQLClient } from "graphql-request"
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types"
import gql from "graphql-tag"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

/**  作業日誌情報  */
export type Payment = {
  /**  現状の金額  */
  currentAmount: Scalars["Int"]["output"]
  /**  ID  */
  id: Scalars["Int"]["output"]
  /**  上限金額  */
  maxAmount: Scalars["Int"]["output"]
  /**  項目名  */
  name: Scalars["String"]["output"]
}

export type PaymentHistory = {
  /**  ID  */
  id: Scalars["Int"]["output"]
  /**  備考  */
  note?: Maybe<Scalars["String"]["output"]>
  /**  支払日  */
  paymentDate: Scalars["String"]["output"]
  /**  収支項目ID  */
  paymentId: Scalars["Int"]["output"]
  /**  支払料金  */
  price: Scalars["Int"]["output"]
}

export type Query = {
  /**  paymentごとの支払履歴一覧  */
  listPaymentHistoriesByPaymentId: Array<PaymentHistory>
  /**  作業日誌一覧  */
  listPayments: Array<Payment>
  /**  項目1つを取得  */
  payment?: Maybe<Payment>
  /**  支払履歴を1件取得  */
  paymentHistory?: Maybe<PaymentHistory>
}

export type QueryListPaymentHistoriesByPaymentIdArgs = {
  paymentId: Scalars["Int"]["input"]
}

export type QueryPaymentArgs = {
  paymentId: Scalars["Int"]["input"]
}

export type QueryPaymentHistoryArgs = {
  paymentHistoryId: Scalars["Int"]["input"]
}

export type Mutation = {
  /**  収支項目の作成  */
  createPayment: Scalars["Int"]["output"]
  /**  支払履歴を作成  */
  createPaymentHistory: Scalars["Int"]["output"]
  /**  収支項目の削除  */
  deletePayment: Scalars["Int"]["output"]
  /**  支払履歴を削除  */
  deletePaymentHistory: Scalars["Int"]["output"]
  /**  収支項目の更新  */
  updatePayment: Scalars["Int"]["output"]
  /**  支払履歴を更新  */
  updatePaymentHistory: Scalars["Int"]["output"]
}

export type MutationCreatePaymentArgs = {
  maxAmount: Scalars["Int"]["input"]
  name: Scalars["String"]["input"]
}

export type MutationCreatePaymentHistoryArgs = {
  note: Scalars["String"]["input"]
  paymentDate: Scalars["String"]["input"]
  paymentId: Scalars["Int"]["input"]
  price: Scalars["Int"]["input"]
}

export type MutationDeletePaymentArgs = {
  id: Scalars["Int"]["input"]
}

export type MutationDeletePaymentHistoryArgs = {
  id: Scalars["Int"]["input"]
}

export type MutationUpdatePaymentArgs = {
  id: Scalars["Int"]["input"]
  maxAmount: Scalars["Int"]["input"]
  name: Scalars["String"]["input"]
}

export type MutationUpdatePaymentHistoryArgs = {
  id: Scalars["Int"]["input"]
  note: Scalars["String"]["input"]
  paymentDate: Scalars["String"]["input"]
  price: Scalars["Int"]["input"]
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>
  Payment: ResolverTypeWrapper<Payment>
  PaymentHistory: ResolverTypeWrapper<PaymentHistory>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars["String"]["output"]>
  mutation: ResolverTypeWrapper<Mutation>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"]
  Int: Scalars["Int"]["output"]
  Payment: Payment
  PaymentHistory: PaymentHistory
  Query: {}
  String: Scalars["String"]["output"]
  mutation: Mutation
}

export type PaymentResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Payment"] = ResolversParentTypes["Payment"],
> = {
  currentAmount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  maxAmount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PaymentHistoryResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["PaymentHistory"] = ResolversParentTypes["PaymentHistory"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  note?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  paymentDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  paymentId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  price?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  listPaymentHistoriesByPaymentId?: Resolver<
    Array<ResolversTypes["PaymentHistory"]>,
    ParentType,
    ContextType,
    RequireFields<QueryListPaymentHistoriesByPaymentIdArgs, "paymentId">
  >
  listPayments?: Resolver<Array<ResolversTypes["Payment"]>, ParentType, ContextType>
  payment?: Resolver<
    Maybe<ResolversTypes["Payment"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPaymentArgs, "paymentId">
  >
  paymentHistory?: Resolver<
    Maybe<ResolversTypes["PaymentHistory"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPaymentHistoryArgs, "paymentHistoryId">
  >
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["mutation"] = ResolversParentTypes["mutation"],
> = {
  createPayment?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePaymentArgs, "maxAmount" | "name">
  >
  createPaymentHistory?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePaymentHistoryArgs, "note" | "paymentDate" | "paymentId" | "price">
  >
  deletePayment?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePaymentArgs, "id">
  >
  deletePaymentHistory?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePaymentHistoryArgs, "id">
  >
  updatePayment?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePaymentArgs, "id" | "maxAmount" | "name">
  >
  updatePaymentHistory?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePaymentHistoryArgs, "id" | "note" | "paymentDate" | "price">
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = Context> = {
  Payment?: PaymentResolvers<ContextType>
  PaymentHistory?: PaymentHistoryResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  mutation?: MutationResolvers<ContextType>
}

export type ListPaymentsQueryVariables = Exact<{ [key: string]: never }>

export type ListPaymentsQuery = {
  listPayments: Array<{ id: number; name: string; maxAmount: number; currentAmount: number }>
}

export const ListPaymentsDocument = gql`
  query listPayments {
    listPayments {
      id
      name
      maxAmount
      currentAmount
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
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
        "listPayments",
        "query",
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
