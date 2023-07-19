/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
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

export type ListPaymentsQueryVariables = Exact<{ [key: string]: never }>

export type ListPaymentsQuery = {
  listPayments: Array<{ id: number; name: string; maxAmount: number; currentAmount: number }>
}

export const ListPaymentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listPayments" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listPayments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "maxAmount" } },
                { kind: "Field", name: { kind: "Name", value: "currentAmount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListPaymentsQuery, ListPaymentsQueryVariables>
