/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query topPageCategories($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n      currentAmount\n    }\n  }\n": types.TopPageCategoriesDocument,
    "\n  query paymentSummaryMain($targetDate: String!) {\n    paymentSummary(targetDate: $targetDate) {\n      totalMaxAmount\n      totalCurrentAmount\n      totalPaymentRatio\n    }\n  }\n": types.PaymentSummaryMainDocument,
    "\n  query paymentSummary($targetDate: String!) {\n    paymentSummary(targetDate: $targetDate) {\n      totalMaxAmount\n      totalCurrentAmount\n      totalPaymentRatio\n    }\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n      currentAmount\n    }\n  }\n": types.PaymentSummaryDocument,
    "\n  mutation updatePaymentHistoryDialog_UpdateHistoryPayment(\n    $id: Int!\n    $categoryId: Int!\n    $paymentDate: String!\n    $price: Int!\n    $note: String\n    $labelIds: [Int!]!\n  ) {\n    updatePaymentHistory(\n      id: $id\n      categoryId: $categoryId\n      paymentDate: $paymentDate\n      price: $price\n      note: $note\n      labelIds: $labelIds\n    )\n  }\n": types.UpdatePaymentHistoryDialog_UpdateHistoryPaymentDocument,
    "\n  query updatePaymentHistoryDialog($categoryId: Int!) {\n    listCategoryLabelsByCategoryId(categoryId: $categoryId) {\n      id\n      name\n      categoryId\n    }\n  }\n": types.UpdatePaymentHistoryDialogDocument,
    "\n  query paymentHistoryPage($paymentHistoryId: Int!) {\n    paymentHistory(paymentHistoryId: $paymentHistoryId) {\n      id\n      categoryId\n      paymentDate\n      note\n      price\n      labels {\n        id\n        name\n      }\n    }\n  }\n": types.PaymentHistoryPageDocument,
    "\n  query paymentHistoryPageListCategories($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      labels {\n        id\n        name\n      }\n    }\n  }\n": types.PaymentHistoryPageListCategoriesDocument,
    "\n  mutation createPaymentHistoryDialog_CreatePaymentHistory(\n    $categoryId: Int!\n    $paymentDate: String!\n    $price: Int!\n    $note: String\n    $categoryLabelIds: [Int!]!\n  ) {\n    createPaymentHistory(\n      categoryId: $categoryId\n      paymentDate: $paymentDate\n      price: $price\n      note: $note\n      categoryLabelIds: $categoryLabelIds\n    )\n  }\n": types.CreatePaymentHistoryDialog_CreatePaymentHistoryDocument,
    "\n  query createPaymentHistoryDialog($categoryId: Int!) {\n    listCategoryLabelsByCategoryId(categoryId: $categoryId) {\n      id\n      name\n      categoryId\n    }\n  }\n": types.CreatePaymentHistoryDialogDocument,
    "\n  mutation deletePaymentHistoryDialog_DeletePaymentHistory($id: Int!) {\n    deletePaymentHistory(id: $id)\n  }\n": types.DeletePaymentHistoryDialog_DeletePaymentHistoryDocument,
    "\n  query paymentHistoriesPage($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      labels {\n        id\n        name\n      }\n    }\n    listPaymentHistories {\n      id\n      categoryId\n      paymentDate\n      note\n      price\n      labels {\n        id\n        name\n      }\n    }\n  }\n": types.PaymentHistoriesPageDocument,
    "\n  mutation createCategoryDialog_CreateCategory(\n    $name: String!\n    $maxAmount: Int!\n    $labelIds: [Int!]!\n  ) {\n    createCategory(name: $name, maxAmount: $maxAmount, labelIds: $labelIds)\n  }\n": types.CreateCategoryDialog_CreateCategoryDocument,
    "\n  mutation deleteCategoryDialog_DeleteCategory($id: Int!) {\n    deleteCategory(id: $id)\n  }\n": types.DeleteCategoryDialog_DeleteCategoryDocument,
    "\n  mutation updateCategoryDialog_UpdateCategory(\n    $id: Int!\n    $name: String!\n    $maxAmount: Int!\n    $labelIds: [Int!]!\n  ) {\n    updateCategory(\n      id: $id\n      name: $name\n      maxAmount: $maxAmount\n      labelIds: $labelIds\n    )\n  }\n": types.UpdateCategoryDialog_UpdateCategoryDocument,
    "\n  query settingCategoriesPage($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n    }\n    listCategoryLabels {\n      id\n      name\n      categoryId\n    }\n  }\n": types.SettingCategoriesPageDocument,
    "\n  mutation createLabelDialog_CreateLabel($input: [CreateCategoryLabelInput!]!) {\n    createCategoryLabel(input: $input)\n  }\n": types.CreateLabelDialog_CreateLabelDocument,
    "\n  mutation deleteCategoryDialog_DeleteCategoryLabel($categoryLabelId: Int!) {\n    deleteCategoryLabel(categoryLabelId: $categoryLabelId)\n  }\n": types.DeleteCategoryDialog_DeleteCategoryLabelDocument,
    "\n  mutation createLabelDialog_UpdateCategoryLabel(\n    $categoryLabelId: Int!\n    $name: String!\n    $categoryId: Int\n  ) {\n    updateCategoryLabel(\n      categoryLabelId: $categoryLabelId,\n      name: $name,\n      categoryId: $categoryId)\n  }\n": types.CreateLabelDialog_UpdateCategoryLabelDocument,
    "\n  query settingLabelsPage {\n    listCategoryLabels {\n      id\n      name\n      categoryId\n    }\n    listCategories {\n      id\n      name\n    }\n  }\n": types.SettingLabelsPageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query topPageCategories($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n      currentAmount\n    }\n  }\n"): (typeof documents)["\n  query topPageCategories($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n      currentAmount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query paymentSummaryMain($targetDate: String!) {\n    paymentSummary(targetDate: $targetDate) {\n      totalMaxAmount\n      totalCurrentAmount\n      totalPaymentRatio\n    }\n  }\n"): (typeof documents)["\n  query paymentSummaryMain($targetDate: String!) {\n    paymentSummary(targetDate: $targetDate) {\n      totalMaxAmount\n      totalCurrentAmount\n      totalPaymentRatio\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query paymentSummary($targetDate: String!) {\n    paymentSummary(targetDate: $targetDate) {\n      totalMaxAmount\n      totalCurrentAmount\n      totalPaymentRatio\n    }\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n      currentAmount\n    }\n  }\n"): (typeof documents)["\n  query paymentSummary($targetDate: String!) {\n    paymentSummary(targetDate: $targetDate) {\n      totalMaxAmount\n      totalCurrentAmount\n      totalPaymentRatio\n    }\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n      currentAmount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePaymentHistoryDialog_UpdateHistoryPayment(\n    $id: Int!\n    $categoryId: Int!\n    $paymentDate: String!\n    $price: Int!\n    $note: String\n    $labelIds: [Int!]!\n  ) {\n    updatePaymentHistory(\n      id: $id\n      categoryId: $categoryId\n      paymentDate: $paymentDate\n      price: $price\n      note: $note\n      labelIds: $labelIds\n    )\n  }\n"): (typeof documents)["\n  mutation updatePaymentHistoryDialog_UpdateHistoryPayment(\n    $id: Int!\n    $categoryId: Int!\n    $paymentDate: String!\n    $price: Int!\n    $note: String\n    $labelIds: [Int!]!\n  ) {\n    updatePaymentHistory(\n      id: $id\n      categoryId: $categoryId\n      paymentDate: $paymentDate\n      price: $price\n      note: $note\n      labelIds: $labelIds\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query updatePaymentHistoryDialog($categoryId: Int!) {\n    listCategoryLabelsByCategoryId(categoryId: $categoryId) {\n      id\n      name\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  query updatePaymentHistoryDialog($categoryId: Int!) {\n    listCategoryLabelsByCategoryId(categoryId: $categoryId) {\n      id\n      name\n      categoryId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query paymentHistoryPage($paymentHistoryId: Int!) {\n    paymentHistory(paymentHistoryId: $paymentHistoryId) {\n      id\n      categoryId\n      paymentDate\n      note\n      price\n      labels {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query paymentHistoryPage($paymentHistoryId: Int!) {\n    paymentHistory(paymentHistoryId: $paymentHistoryId) {\n      id\n      categoryId\n      paymentDate\n      note\n      price\n      labels {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query paymentHistoryPageListCategories($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      labels {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query paymentHistoryPageListCategories($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      labels {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPaymentHistoryDialog_CreatePaymentHistory(\n    $categoryId: Int!\n    $paymentDate: String!\n    $price: Int!\n    $note: String\n    $categoryLabelIds: [Int!]!\n  ) {\n    createPaymentHistory(\n      categoryId: $categoryId\n      paymentDate: $paymentDate\n      price: $price\n      note: $note\n      categoryLabelIds: $categoryLabelIds\n    )\n  }\n"): (typeof documents)["\n  mutation createPaymentHistoryDialog_CreatePaymentHistory(\n    $categoryId: Int!\n    $paymentDate: String!\n    $price: Int!\n    $note: String\n    $categoryLabelIds: [Int!]!\n  ) {\n    createPaymentHistory(\n      categoryId: $categoryId\n      paymentDate: $paymentDate\n      price: $price\n      note: $note\n      categoryLabelIds: $categoryLabelIds\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query createPaymentHistoryDialog($categoryId: Int!) {\n    listCategoryLabelsByCategoryId(categoryId: $categoryId) {\n      id\n      name\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  query createPaymentHistoryDialog($categoryId: Int!) {\n    listCategoryLabelsByCategoryId(categoryId: $categoryId) {\n      id\n      name\n      categoryId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePaymentHistoryDialog_DeletePaymentHistory($id: Int!) {\n    deletePaymentHistory(id: $id)\n  }\n"): (typeof documents)["\n  mutation deletePaymentHistoryDialog_DeletePaymentHistory($id: Int!) {\n    deletePaymentHistory(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query paymentHistoriesPage($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      labels {\n        id\n        name\n      }\n    }\n    listPaymentHistories {\n      id\n      categoryId\n      paymentDate\n      note\n      price\n      labels {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query paymentHistoriesPage($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      labels {\n        id\n        name\n      }\n    }\n    listPaymentHistories {\n      id\n      categoryId\n      paymentDate\n      note\n      price\n      labels {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCategoryDialog_CreateCategory(\n    $name: String!\n    $maxAmount: Int!\n    $labelIds: [Int!]!\n  ) {\n    createCategory(name: $name, maxAmount: $maxAmount, labelIds: $labelIds)\n  }\n"): (typeof documents)["\n  mutation createCategoryDialog_CreateCategory(\n    $name: String!\n    $maxAmount: Int!\n    $labelIds: [Int!]!\n  ) {\n    createCategory(name: $name, maxAmount: $maxAmount, labelIds: $labelIds)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteCategoryDialog_DeleteCategory($id: Int!) {\n    deleteCategory(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteCategoryDialog_DeleteCategory($id: Int!) {\n    deleteCategory(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCategoryDialog_UpdateCategory(\n    $id: Int!\n    $name: String!\n    $maxAmount: Int!\n    $labelIds: [Int!]!\n  ) {\n    updateCategory(\n      id: $id\n      name: $name\n      maxAmount: $maxAmount\n      labelIds: $labelIds\n    )\n  }\n"): (typeof documents)["\n  mutation updateCategoryDialog_UpdateCategory(\n    $id: Int!\n    $name: String!\n    $maxAmount: Int!\n    $labelIds: [Int!]!\n  ) {\n    updateCategory(\n      id: $id\n      name: $name\n      maxAmount: $maxAmount\n      labelIds: $labelIds\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query settingCategoriesPage($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n    }\n    listCategoryLabels {\n      id\n      name\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  query settingCategoriesPage($targetDate: String!) {\n    listCategories(targetDate: $targetDate) {\n      id\n      name\n      maxAmount\n    }\n    listCategoryLabels {\n      id\n      name\n      categoryId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createLabelDialog_CreateLabel($input: [CreateCategoryLabelInput!]!) {\n    createCategoryLabel(input: $input)\n  }\n"): (typeof documents)["\n  mutation createLabelDialog_CreateLabel($input: [CreateCategoryLabelInput!]!) {\n    createCategoryLabel(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteCategoryDialog_DeleteCategoryLabel($categoryLabelId: Int!) {\n    deleteCategoryLabel(categoryLabelId: $categoryLabelId)\n  }\n"): (typeof documents)["\n  mutation deleteCategoryDialog_DeleteCategoryLabel($categoryLabelId: Int!) {\n    deleteCategoryLabel(categoryLabelId: $categoryLabelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createLabelDialog_UpdateCategoryLabel(\n    $categoryLabelId: Int!\n    $name: String!\n    $categoryId: Int\n  ) {\n    updateCategoryLabel(\n      categoryLabelId: $categoryLabelId,\n      name: $name,\n      categoryId: $categoryId)\n  }\n"): (typeof documents)["\n  mutation createLabelDialog_UpdateCategoryLabel(\n    $categoryLabelId: Int!\n    $name: String!\n    $categoryId: Int\n  ) {\n    updateCategoryLabel(\n      categoryLabelId: $categoryLabelId,\n      name: $name,\n      categoryId: $categoryId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query settingLabelsPage {\n    listCategoryLabels {\n      id\n      name\n      categoryId\n    }\n    listCategories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query settingLabelsPage {\n    listCategoryLabels {\n      id\n      name\n      categoryId\n    }\n    listCategories {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;