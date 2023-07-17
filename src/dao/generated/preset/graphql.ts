/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
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
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: unknown; output: unknown }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

/**  作業日誌情報  */
export type Payment = {
  /**  現状の金額  */
  currentAmount: Scalars['Int']['output']
  /**  ID  */
  id: Scalars['ID']['output']
  /**  上限金額  */
  maxAmount: Scalars['Int']['output']
  /**  項目名  */
  name: Scalars['String']['output']
}

export type Query = {
  /**  作業日誌一覧  */
  listPayments: Array<Payment>
  /**  項目1つを取得  */
  payment?: Maybe<Payment>
}

export type QueryListPaymentsArgs = {
  userId: Scalars['String']['input']
}

export type QueryPaymentArgs = {
  paymentId: Scalars['Int']['input']
}

export type Mutation = {
  updatePayment?: Maybe<UpdatePaymentResponse>
}

export type MutationUpdatePaymentArgs = {
  id: Scalars['Int']['input']
  maxAmount: Scalars['Int']['input']
  name: Scalars['String']['input']
}

export type UpdatePaymentResponse = {
  id: Scalars['Int']['output']
}

export type ListPaymentsQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type ListPaymentsQuery = {
  listPayments: Array<{ id: unknown; name: string; maxAmount: number; currentAmount: number }>
}

export const ListPaymentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listPayments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listPayments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxAmount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currentAmount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListPaymentsQuery, ListPaymentsQueryVariables>
