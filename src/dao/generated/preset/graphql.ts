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

export type Query = {
  listPaymentHistoriesByPaymentId: Array<PaymentHistory>;
  listPayments: Array<Payment>;
  payment?: Maybe<Payment>;
  paymentHistory?: Maybe<PaymentHistory>;
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
  note: Scalars['String']['input'];
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
  note: Scalars['String']['input'];
  paymentDate: Scalars['String']['input'];
  price: Scalars['Int']['input'];
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

export type ListPaymentsQueryVariables = Exact<{ [key: string]: never }>;

export type ListPaymentsQuery = {
  listPayments: Array<{
    id: number;
    name: string;
    maxAmount: number;
    currentAmount: number;
  }>;
};

export const PaymentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'payment' },
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
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paymentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'paymentId' },
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
} as unknown as DocumentNode<PaymentQuery, PaymentQueryVariables>;
export const ListPaymentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listPayments' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listPayments' },
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
} as unknown as DocumentNode<ListPaymentsQuery, ListPaymentsQueryVariables>;
