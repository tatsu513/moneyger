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
  maxAmount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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

export type DeleteCategoryDialog_DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteCategoryDialog_DeleteCategoryMutation = {
  deletePayment: number;
};

export type CreateCategoryDialog_UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
}>;

export type CreateCategoryDialog_UpdateCategoryMutation = {
  updatePayment: number;
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
  createPayment: number;
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
            name: { kind: 'Name', value: 'deletePayment' },
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
            name: { kind: 'Name', value: 'updatePayment' },
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
export const CategoryPageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'categoryPage' },
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
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'category' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'categoryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'categoryId' },
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
} as unknown as DocumentNode<CategoryPageQuery, CategoryPageQueryVariables>;
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
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPayment' },
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
export const CategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'categories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategories' },
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
} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const PaymentSummaryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'paymentSummary' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSummary' },
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
            name: { kind: 'Name', value: 'paymentId' },
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
                name: { kind: 'Name', value: 'paymentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'paymentId' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'paymentId' } },
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
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategories' },
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
            name: { kind: 'Name', value: 'paymentId' },
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
                name: { kind: 'Name', value: 'paymentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'paymentId' },
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
export const PaymentHistoriesPageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'paymentHistoriesPage' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listCategories' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'paymentId' } },
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
