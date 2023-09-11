import { GraphQLResolveInfo } from 'graphql';
import { Context } from 'src/types/context';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  currentAmount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  labels: Array<CategoryLabel>;
  maxAmount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CategoryLabel = {
  categoryId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CreateCategoryLabelInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  label: Scalars['String']['input'];
};

export type Mutation = {
  createCategory: Scalars['Int']['output'];
  createCategoryLabel: Scalars['Int']['output'];
  createPaymentHistory: Scalars['Int']['output'];
  deleteCategory: Scalars['Int']['output'];
  deleteCategoryLabel: Scalars['Int']['output'];
  deleteCategoryLabelFromCategory: Scalars['Int']['output'];
  deletePaymentHistory: Scalars['Int']['output'];
  updateCategory: Scalars['Int']['output'];
  updateCategoryLabel: Scalars['Int']['output'];
  updatePaymentHistory: Scalars['Int']['output'];
};


export type MutationCreateCategoryArgs = {
  labelIds: Array<Scalars['Int']['input']>;
  maxAmount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateCategoryLabelArgs = {
  input: Array<CreateCategoryLabelInput>;
};


export type MutationCreatePaymentHistoryArgs = {
  categoryId: Scalars['Int']['input'];
  categoryLabelIds: Array<Scalars['Int']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  paymentDate: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCategoryLabelArgs = {
  categoryLabelId: Scalars['Int']['input'];
};


export type MutationDeleteCategoryLabelFromCategoryArgs = {
  categoryId: Scalars['Int']['input'];
  categoryLabelIds: Array<Scalars['Int']['input']>;
};


export type MutationDeletePaymentHistoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Int']['input'];
  labelIds: Array<Scalars['Int']['input']>;
  maxAmount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateCategoryLabelArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  categoryLabelId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdatePaymentHistoryArgs = {
  categoryId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  labelIds: Array<Scalars['Int']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  paymentDate: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};

export type PaymentHistory = {
  categoryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  labels: Array<CategoryLabel>;
  note?: Maybe<Scalars['String']['output']>;
  paymentDate: Scalars['String']['output'];
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
  listCategoryLabels: Array<CategoryLabel>;
  listCategoryLabelsByCategoryId: Array<CategoryLabel>;
  listPaymentHistories: Array<PaymentHistory>;
  listPaymentHistoriesByCategoryId: Array<PaymentHistory>;
  paymentHistory?: Maybe<PaymentHistory>;
  paymentSummary: PaymentSummary;
};


export type QueryCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryListCategoriesArgs = {
  targetDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListCategoryLabelsByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryListPaymentHistoriesByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryPaymentHistoryArgs = {
  paymentHistoryId: Scalars['Int']['input'];
};


export type QueryPaymentSummaryArgs = {
  targetDate: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryLabel: ResolverTypeWrapper<CategoryLabel>;
  CreateCategoryLabelInput: CreateCategoryLabelInput;
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
  CategoryLabel: CategoryLabel;
  CreateCategoryLabelInput: CreateCategoryLabelInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PaymentHistory: PaymentHistory;
  PaymentSummary: PaymentSummary;
  Query: {};
  String: Scalars['String']['output'];
};

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  currentAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  labels?: Resolver<Array<ResolversTypes['CategoryLabel']>, ParentType, ContextType>;
  maxAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryLabelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CategoryLabel'] = ResolversParentTypes['CategoryLabel']> = {
  categoryId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'labelIds' | 'maxAmount' | 'name'>>;
  createCategoryLabel?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationCreateCategoryLabelArgs, 'input'>>;
  createPaymentHistory?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationCreatePaymentHistoryArgs, 'categoryId' | 'categoryLabelIds' | 'paymentDate' | 'price'>>;
  deleteCategory?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteCategoryLabel?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteCategoryLabelArgs, 'categoryLabelId'>>;
  deleteCategoryLabelFromCategory?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteCategoryLabelFromCategoryArgs, 'categoryId' | 'categoryLabelIds'>>;
  deletePaymentHistory?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeletePaymentHistoryArgs, 'id'>>;
  updateCategory?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'id' | 'labelIds' | 'maxAmount' | 'name'>>;
  updateCategoryLabel?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpdateCategoryLabelArgs, 'categoryLabelId' | 'name'>>;
  updatePaymentHistory?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpdatePaymentHistoryArgs, 'categoryId' | 'id' | 'labelIds' | 'paymentDate' | 'price'>>;
};

export type PaymentHistoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaymentHistory'] = ResolversParentTypes['PaymentHistory']> = {
  categoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  labels?: Resolver<Array<ResolversTypes['CategoryLabel']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentSummaryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaymentSummary'] = ResolversParentTypes['PaymentSummary']> = {
  totalCurrentAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalMaxAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPaymentRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'categoryId'>>;
  listCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, Partial<QueryListCategoriesArgs>>;
  listCategoryLabels?: Resolver<Array<ResolversTypes['CategoryLabel']>, ParentType, ContextType>;
  listCategoryLabelsByCategoryId?: Resolver<Array<ResolversTypes['CategoryLabel']>, ParentType, ContextType, RequireFields<QueryListCategoryLabelsByCategoryIdArgs, 'categoryId'>>;
  listPaymentHistories?: Resolver<Array<ResolversTypes['PaymentHistory']>, ParentType, ContextType>;
  listPaymentHistoriesByCategoryId?: Resolver<Array<ResolversTypes['PaymentHistory']>, ParentType, ContextType, RequireFields<QueryListPaymentHistoriesByCategoryIdArgs, 'categoryId'>>;
  paymentHistory?: Resolver<Maybe<ResolversTypes['PaymentHistory']>, ParentType, ContextType, RequireFields<QueryPaymentHistoryArgs, 'paymentHistoryId'>>;
  paymentSummary?: Resolver<ResolversTypes['PaymentSummary'], ParentType, ContextType, RequireFields<QueryPaymentSummaryArgs, 'targetDate'>>;
};

export type Resolvers<ContextType = Context> = {
  Category?: CategoryResolvers<ContextType>;
  CategoryLabel?: CategoryLabelResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaymentHistory?: PaymentHistoryResolvers<ContextType>;
  PaymentSummary?: PaymentSummaryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


export type TopPageCategoriesQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;


export type TopPageCategoriesQuery = { listCategories: Array<{ id: number, name: string, maxAmount: number, currentAmount: number }> };

export type PaymentSummaryMainQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;


export type PaymentSummaryMainQuery = { paymentSummary: { totalMaxAmount: number, totalCurrentAmount: number, totalPaymentRatio: number } };

export type PaymentSummaryQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;


export type PaymentSummaryQuery = { paymentSummary: { totalMaxAmount: number, totalCurrentAmount: number, totalPaymentRatio: number }, listCategories: Array<{ id: number, name: string, maxAmount: number, currentAmount: number }> };

export type UpdatePaymentHistoryDialog_UpdateHistoryPaymentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  categoryId: Scalars['Int']['input'];
  paymentDate: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  labelIds: Array<Scalars['Int']['input']>;
}>;


export type UpdatePaymentHistoryDialog_UpdateHistoryPaymentMutation = { updatePaymentHistory: number };

export type PaymentHistoryPageQueryVariables = Exact<{
  paymentHistoryId: Scalars['Int']['input'];
}>;


export type PaymentHistoryPageQuery = { paymentHistory?: { id: number, categoryId: number, paymentDate: string, note?: string | null, price: number, labels: Array<{ id: number, name: string }> } | null };

export type PaymentHistoryPageListCategoriesQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;


export type PaymentHistoryPageListCategoriesQuery = { listCategories: Array<{ id: number, name: string, labels: Array<{ id: number, name: string }> }> };

export type CreatePaymentHistoryDialog_CreatePaymentHistoryMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  paymentDate: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  categoryLabelIds: Array<Scalars['Int']['input']>;
}>;


export type CreatePaymentHistoryDialog_CreatePaymentHistoryMutation = { createPaymentHistory: number };

export type CreatePaymentHistoryDialogQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type CreatePaymentHistoryDialogQuery = { listCategoryLabelsByCategoryId: Array<{ id: number, name: string, categoryId?: number | null }> };

export type DeletePaymentHistoryDialog_DeletePaymentHistoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePaymentHistoryDialog_DeletePaymentHistoryMutation = { deletePaymentHistory: number };

export type PaymentHistoriesPageQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;


export type PaymentHistoriesPageQuery = { listCategories: Array<{ id: number, name: string, labels: Array<{ id: number, name: string }> }>, listPaymentHistories: Array<{ id: number, categoryId: number, paymentDate: string, note?: string | null, price: number, labels: Array<{ id: number, name: string }> }> };

export type CreateCategoryDialog_CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
  labelIds: Array<Scalars['Int']['input']>;
}>;


export type CreateCategoryDialog_CreateCategoryMutation = { createCategory: number };

export type DeleteCategoryDialog_DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCategoryDialog_DeleteCategoryMutation = { deleteCategory: number };

export type UpdateCategoryDialog_UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
  labelIds: Array<Scalars['Int']['input']>;
}>;


export type UpdateCategoryDialog_UpdateCategoryMutation = { updateCategory: number };

export type SettingCategoriesPageQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;


export type SettingCategoriesPageQuery = { listCategories: Array<{ id: number, name: string, maxAmount: number }>, listCategoryLabels: Array<{ id: number, name: string, categoryId?: number | null }> };

export type CreateLabelDialog_CreateLabelMutationVariables = Exact<{
  input: Array<CreateCategoryLabelInput>;
}>;


export type CreateLabelDialog_CreateLabelMutation = { createCategoryLabel: number };

export type DeleteCategoryDialog_DeleteCategoryLabelMutationVariables = Exact<{
  categoryLabelId: Scalars['Int']['input'];
}>;


export type DeleteCategoryDialog_DeleteCategoryLabelMutation = { deleteCategoryLabel: number };

export type CreateLabelDialog_UpdateCategoryLabelMutationVariables = Exact<{
  categoryLabelId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateLabelDialog_UpdateCategoryLabelMutation = { updateCategoryLabel: number };

export type SettingLabelsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingLabelsPageQuery = { listCategoryLabels: Array<{ id: number, name: string, categoryId?: number | null }>, listCategories: Array<{ id: number, name: string }> };


export const TopPageCategoriesDocument = gql`
    query topPageCategories($targetDate: String!) {
  listCategories(targetDate: $targetDate) {
    id
    name
    maxAmount
    currentAmount
  }
}
    `;
export const PaymentSummaryMainDocument = gql`
    query paymentSummaryMain($targetDate: String!) {
  paymentSummary(targetDate: $targetDate) {
    totalMaxAmount
    totalCurrentAmount
    totalPaymentRatio
  }
}
    `;
export const PaymentSummaryDocument = gql`
    query paymentSummary($targetDate: String!) {
  paymentSummary(targetDate: $targetDate) {
    totalMaxAmount
    totalCurrentAmount
    totalPaymentRatio
  }
  listCategories(targetDate: $targetDate) {
    id
    name
    maxAmount
    currentAmount
  }
}
    `;
export const UpdatePaymentHistoryDialog_UpdateHistoryPaymentDocument = gql`
    mutation updatePaymentHistoryDialog_UpdateHistoryPayment($id: Int!, $categoryId: Int!, $paymentDate: String!, $price: Int!, $note: String, $labelIds: [Int!]!) {
  updatePaymentHistory(
    id: $id
    categoryId: $categoryId
    paymentDate: $paymentDate
    price: $price
    note: $note
    labelIds: $labelIds
  )
}
    `;
export const PaymentHistoryPageDocument = gql`
    query paymentHistoryPage($paymentHistoryId: Int!) {
  paymentHistory(paymentHistoryId: $paymentHistoryId) {
    id
    categoryId
    paymentDate
    note
    price
    labels {
      id
      name
    }
  }
}
    `;
export const PaymentHistoryPageListCategoriesDocument = gql`
    query paymentHistoryPageListCategories($targetDate: String!) {
  listCategories(targetDate: $targetDate) {
    id
    name
    labels {
      id
      name
    }
  }
}
    `;
export const CreatePaymentHistoryDialog_CreatePaymentHistoryDocument = gql`
    mutation createPaymentHistoryDialog_CreatePaymentHistory($categoryId: Int!, $paymentDate: String!, $price: Int!, $note: String, $categoryLabelIds: [Int!]!) {
  createPaymentHistory(
    categoryId: $categoryId
    paymentDate: $paymentDate
    price: $price
    note: $note
    categoryLabelIds: $categoryLabelIds
  )
}
    `;
export const CreatePaymentHistoryDialogDocument = gql`
    query createPaymentHistoryDialog($categoryId: Int!) {
  listCategoryLabelsByCategoryId(categoryId: $categoryId) {
    id
    name
    categoryId
  }
}
    `;
export const DeletePaymentHistoryDialog_DeletePaymentHistoryDocument = gql`
    mutation deletePaymentHistoryDialog_DeletePaymentHistory($id: Int!) {
  deletePaymentHistory(id: $id)
}
    `;
export const PaymentHistoriesPageDocument = gql`
    query paymentHistoriesPage($targetDate: String!) {
  listCategories(targetDate: $targetDate) {
    id
    name
    labels {
      id
      name
    }
  }
  listPaymentHistories {
    id
    categoryId
    paymentDate
    note
    price
    labels {
      id
      name
    }
  }
}
    `;
export const CreateCategoryDialog_CreateCategoryDocument = gql`
    mutation createCategoryDialog_CreateCategory($name: String!, $maxAmount: Int!, $labelIds: [Int!]!) {
  createCategory(name: $name, maxAmount: $maxAmount, labelIds: $labelIds)
}
    `;
export const DeleteCategoryDialog_DeleteCategoryDocument = gql`
    mutation deleteCategoryDialog_DeleteCategory($id: Int!) {
  deleteCategory(id: $id)
}
    `;
export const UpdateCategoryDialog_UpdateCategoryDocument = gql`
    mutation updateCategoryDialog_UpdateCategory($id: Int!, $name: String!, $maxAmount: Int!, $labelIds: [Int!]!) {
  updateCategory(id: $id, name: $name, maxAmount: $maxAmount, labelIds: $labelIds)
}
    `;
export const SettingCategoriesPageDocument = gql`
    query settingCategoriesPage($targetDate: String!) {
  listCategories(targetDate: $targetDate) {
    id
    name
    maxAmount
  }
  listCategoryLabels {
    id
    name
    categoryId
  }
}
    `;
export const CreateLabelDialog_CreateLabelDocument = gql`
    mutation createLabelDialog_CreateLabel($input: [CreateCategoryLabelInput!]!) {
  createCategoryLabel(input: $input)
}
    `;
export const DeleteCategoryDialog_DeleteCategoryLabelDocument = gql`
    mutation deleteCategoryDialog_DeleteCategoryLabel($categoryLabelId: Int!) {
  deleteCategoryLabel(categoryLabelId: $categoryLabelId)
}
    `;
export const CreateLabelDialog_UpdateCategoryLabelDocument = gql`
    mutation createLabelDialog_UpdateCategoryLabel($categoryLabelId: Int!, $name: String!, $categoryId: Int) {
  updateCategoryLabel(
    categoryLabelId: $categoryLabelId
    name: $name
    categoryId: $categoryId
  )
}
    `;
export const SettingLabelsPageDocument = gql`
    query settingLabelsPage {
  listCategoryLabels {
    id
    name
    categoryId
  }
  listCategories {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    topPageCategories(variables: TopPageCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TopPageCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TopPageCategoriesQuery>(TopPageCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'topPageCategories', 'query');
    },
    paymentSummaryMain(variables: PaymentSummaryMainQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PaymentSummaryMainQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PaymentSummaryMainQuery>(PaymentSummaryMainDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'paymentSummaryMain', 'query');
    },
    paymentSummary(variables: PaymentSummaryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PaymentSummaryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PaymentSummaryQuery>(PaymentSummaryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'paymentSummary', 'query');
    },
    updatePaymentHistoryDialog_UpdateHistoryPayment(variables: UpdatePaymentHistoryDialog_UpdateHistoryPaymentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdatePaymentHistoryDialog_UpdateHistoryPaymentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePaymentHistoryDialog_UpdateHistoryPaymentMutation>(UpdatePaymentHistoryDialog_UpdateHistoryPaymentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updatePaymentHistoryDialog_UpdateHistoryPayment', 'mutation');
    },
    paymentHistoryPage(variables: PaymentHistoryPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PaymentHistoryPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PaymentHistoryPageQuery>(PaymentHistoryPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'paymentHistoryPage', 'query');
    },
    paymentHistoryPageListCategories(variables: PaymentHistoryPageListCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PaymentHistoryPageListCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PaymentHistoryPageListCategoriesQuery>(PaymentHistoryPageListCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'paymentHistoryPageListCategories', 'query');
    },
    createPaymentHistoryDialog_CreatePaymentHistory(variables: CreatePaymentHistoryDialog_CreatePaymentHistoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePaymentHistoryDialog_CreatePaymentHistoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePaymentHistoryDialog_CreatePaymentHistoryMutation>(CreatePaymentHistoryDialog_CreatePaymentHistoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPaymentHistoryDialog_CreatePaymentHistory', 'mutation');
    },
    createPaymentHistoryDialog(variables: CreatePaymentHistoryDialogQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePaymentHistoryDialogQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePaymentHistoryDialogQuery>(CreatePaymentHistoryDialogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPaymentHistoryDialog', 'query');
    },
    deletePaymentHistoryDialog_DeletePaymentHistory(variables: DeletePaymentHistoryDialog_DeletePaymentHistoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeletePaymentHistoryDialog_DeletePaymentHistoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePaymentHistoryDialog_DeletePaymentHistoryMutation>(DeletePaymentHistoryDialog_DeletePaymentHistoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deletePaymentHistoryDialog_DeletePaymentHistory', 'mutation');
    },
    paymentHistoriesPage(variables: PaymentHistoriesPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PaymentHistoriesPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PaymentHistoriesPageQuery>(PaymentHistoriesPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'paymentHistoriesPage', 'query');
    },
    createCategoryDialog_CreateCategory(variables: CreateCategoryDialog_CreateCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateCategoryDialog_CreateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCategoryDialog_CreateCategoryMutation>(CreateCategoryDialog_CreateCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createCategoryDialog_CreateCategory', 'mutation');
    },
    deleteCategoryDialog_DeleteCategory(variables: DeleteCategoryDialog_DeleteCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteCategoryDialog_DeleteCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCategoryDialog_DeleteCategoryMutation>(DeleteCategoryDialog_DeleteCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteCategoryDialog_DeleteCategory', 'mutation');
    },
    updateCategoryDialog_UpdateCategory(variables: UpdateCategoryDialog_UpdateCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateCategoryDialog_UpdateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCategoryDialog_UpdateCategoryMutation>(UpdateCategoryDialog_UpdateCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateCategoryDialog_UpdateCategory', 'mutation');
    },
    settingCategoriesPage(variables: SettingCategoriesPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SettingCategoriesPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SettingCategoriesPageQuery>(SettingCategoriesPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'settingCategoriesPage', 'query');
    },
    createLabelDialog_CreateLabel(variables: CreateLabelDialog_CreateLabelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateLabelDialog_CreateLabelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateLabelDialog_CreateLabelMutation>(CreateLabelDialog_CreateLabelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createLabelDialog_CreateLabel', 'mutation');
    },
    deleteCategoryDialog_DeleteCategoryLabel(variables: DeleteCategoryDialog_DeleteCategoryLabelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteCategoryDialog_DeleteCategoryLabelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCategoryDialog_DeleteCategoryLabelMutation>(DeleteCategoryDialog_DeleteCategoryLabelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteCategoryDialog_DeleteCategoryLabel', 'mutation');
    },
    createLabelDialog_UpdateCategoryLabel(variables: CreateLabelDialog_UpdateCategoryLabelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateLabelDialog_UpdateCategoryLabelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateLabelDialog_UpdateCategoryLabelMutation>(CreateLabelDialog_UpdateCategoryLabelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createLabelDialog_UpdateCategoryLabel', 'mutation');
    },
    settingLabelsPage(variables?: SettingLabelsPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SettingLabelsPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SettingLabelsPageQuery>(SettingLabelsPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'settingLabelsPage', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;