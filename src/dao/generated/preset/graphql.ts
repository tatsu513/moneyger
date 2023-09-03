/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  labels: Array<Maybe<CategoryLabel>>;
  maxAmount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CategoryLabel = {
  categoryId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  createCategory: Scalars['Int']['output'];
  createCategoryLabel: Scalars['Int']['output'];
  createPaymentHistory: Scalars['Int']['output'];
  deleteCategory: Scalars['Int']['output'];
  deletePaymentHistory: Scalars['Int']['output'];
  updateCategory: Scalars['Int']['output'];
  updatePaymentHistory: Scalars['Int']['output'];
};

export type MutationCreateCategoryArgs = {
  labelIds: Array<Scalars['Int']['input']>;
  maxAmount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationCreateCategoryLabelArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  labels?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type MutationCreatePaymentHistoryArgs = {
  categoryId: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  paymentDate: Scalars['String']['input'];
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
  categoryId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  paymentDate: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};

export type PaymentHistory = {
  categoryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
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

export type QueryListPaymentHistoriesByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};

export type QueryPaymentHistoryArgs = {
  paymentHistoryId: Scalars['Int']['input'];
};

export type QueryPaymentSummaryArgs = {
  targetDate: Scalars['String']['input'];
};

export type TopPageCategoriesQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;

export type TopPageCategoriesQuery = {
  listCategories: Array<{
    id: number;
    name: string;
    maxAmount: number;
    currentAmount: number;
  }>;
};

export type PaymentSummaryMainQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;

export type PaymentSummaryMainQuery = {
  paymentSummary: {
    totalMaxAmount: number;
    totalCurrentAmount: number;
    totalPaymentRatio: number;
  };
};

export type PaymentSummaryQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;

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

export type CreatePaymentHistoryDialog_UpdateHistoryPaymentMutationVariables =
  Exact<{
    id: Scalars['Int']['input'];
    categoryId: Scalars['Int']['input'];
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
    categoryId: number;
    paymentDate: string;
    note?: string | null;
    price: number;
  } | null;
};

export type PaymentHistoryPageListCategoriesQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;

export type PaymentHistoryPageListCategoriesQuery = {
  listCategories: Array<{ id: number; name: string }>;
};

export type CreatePaymentHistoryDialog_CreatePaymentHistoryMutationVariables =
  Exact<{
    categoryId: Scalars['Int']['input'];
    paymentDate: Scalars['String']['input'];
    price: Scalars['Int']['input'];
    note?: InputMaybe<Scalars['String']['input']>;
  }>;

export type CreatePaymentHistoryDialog_CreatePaymentHistoryMutation = {
  createPaymentHistory: number;
};

export type DeletePaymentHistoryDialog_DeletePaymentHistoryMutationVariables =
  Exact<{
    id: Scalars['Int']['input'];
  }>;

export type DeletePaymentHistoryDialog_DeletePaymentHistoryMutation = {
  deletePaymentHistory: number;
};

export type PaymentHistoriesPageQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;

export type PaymentHistoriesPageQuery = {
  listCategories: Array<{ id: number; name: string }>;
  listPaymentHistories: Array<{
    id: number;
    categoryId: number;
    paymentDate: string;
    note?: string | null;
    price: number;
  }>;
};

export type CreateCategoryDialog_CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
  labelIds: Array<Scalars['Int']['input']>;
}>;

export type CreateCategoryDialog_CreateCategoryMutation = {
  createCategory: number;
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

export type SettingCategoriesPageQueryVariables = Exact<{
  targetDate: Scalars['String']['input'];
}>;

export type SettingCategoriesPageQuery = {
  listCategories: Array<{ id: number; name: string; maxAmount: number }>;
};

export type CreateLabelDialog_CreateLabelMutationVariables = Exact<{
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  labels?: InputMaybe<Array<Scalars['String']['input']>>;
}>;

export type CreateLabelDialog_CreateLabelMutation = {
  createCategoryLabel: number;
};

export type SettingLabelsPageQueryVariables = Exact<{ [key: string]: never }>;

export type SettingLabelsPageQuery = {
  listCategoryLabels: Array<{ id: number; name: string }>;
};

export const TopPageCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'topPageCategories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'targetDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targetDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'targetDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxAmount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currentAmount' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TopPageCategoriesQuery,
  TopPageCategoriesQueryVariables
>;
export const PaymentSummaryMainDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'paymentSummaryMain' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'targetDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSummary' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targetDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'targetDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalMaxAmount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalCurrentAmount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalPaymentRatio' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PaymentSummaryMainQuery,
  PaymentSummaryMainQueryVariables
>;
export const PaymentSummaryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'paymentSummary' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'targetDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSummary' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targetDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'targetDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalMaxAmount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalCurrentAmount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalPaymentRatio' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targetDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'targetDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxAmount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currentAmount' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentSummaryQuery, PaymentSummaryQueryVariables>;
export const CreatePaymentHistoryDialog_UpdateHistoryPaymentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'createPaymentHistoryDialog_UpdateHistoryPayment',
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'categoryId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'paymentDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'price' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'note' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePaymentHistory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'categoryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'categoryId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paymentDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'paymentDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'price' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'price' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'note' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'note' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreatePaymentHistoryDialog_UpdateHistoryPaymentMutation,
  CreatePaymentHistoryDialog_UpdateHistoryPaymentMutationVariables
>;
export const PaymentHistoryPageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'paymentHistoryPage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'paymentHistoryId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentHistory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paymentHistoryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'paymentHistoryId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'categoryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paymentDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'note' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PaymentHistoryPageQuery,
  PaymentHistoryPageQueryVariables
>;
export const PaymentHistoryPageListCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'paymentHistoryPageListCategories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'targetDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targetDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'targetDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PaymentHistoryPageListCategoriesQuery,
  PaymentHistoryPageListCategoriesQueryVariables
>;
export const CreatePaymentHistoryDialog_CreatePaymentHistoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'createPaymentHistoryDialog_CreatePaymentHistory',
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'categoryId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'paymentDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'price' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'note' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPaymentHistory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'categoryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'categoryId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paymentDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'paymentDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'price' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'price' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'note' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'note' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreatePaymentHistoryDialog_CreatePaymentHistoryMutation,
  CreatePaymentHistoryDialog_CreatePaymentHistoryMutationVariables
>;
export const DeletePaymentHistoryDialog_DeletePaymentHistoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'deletePaymentHistoryDialog_DeletePaymentHistory',
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deletePaymentHistory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeletePaymentHistoryDialog_DeletePaymentHistoryMutation,
  DeletePaymentHistoryDialog_DeletePaymentHistoryMutationVariables
>;
export const PaymentHistoriesPageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'paymentHistoriesPage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'targetDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targetDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'targetDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listPaymentHistories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'categoryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paymentDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'note' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PaymentHistoriesPageQuery,
  PaymentHistoriesPageQueryVariables
>;
export const CreateCategoryDialog_CreateCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCategoryDialog_CreateCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'maxAmount' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'labelIds' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'Int' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'maxAmount' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'maxAmount' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'labelIds' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'labelIds' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCategoryDialog_CreateCategoryMutation,
  CreateCategoryDialog_CreateCategoryMutationVariables
>;
export const DeleteCategoryDialog_DeleteCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteCategoryDialog_DeleteCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCategoryDialog_DeleteCategoryMutation,
  DeleteCategoryDialog_DeleteCategoryMutationVariables
>;
export const CreateCategoryDialog_UpdateCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCategoryDialog_UpdateCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'maxAmount' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'maxAmount' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'maxAmount' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCategoryDialog_UpdateCategoryMutation,
  CreateCategoryDialog_UpdateCategoryMutationVariables
>;
export const SettingCategoriesPageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'settingCategoriesPage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'targetDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targetDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'targetDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxAmount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SettingCategoriesPageQuery,
  SettingCategoriesPageQueryVariables
>;
export const CreateLabelDialog_CreateLabelDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createLabelDialog_CreateLabel' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'categoryId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'labels' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCategoryLabel' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'categoryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'categoryId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'labels' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'labels' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateLabelDialog_CreateLabelMutation,
  CreateLabelDialog_CreateLabelMutationVariables
>;
export const SettingLabelsPageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'settingLabelsPage' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategoryLabels' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SettingLabelsPageQuery,
  SettingLabelsPageQueryVariables
>;
