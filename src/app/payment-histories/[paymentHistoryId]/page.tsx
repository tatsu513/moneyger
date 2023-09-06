import { graphql } from '@/dao/generated/preset';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { z } from 'zod';
import { notFound } from 'next/navigation';
import PaymentHistoryMain from '@/app/payment-histories/[paymentHistoryId]/_main/PaymentHistoryMain';
import { nameType } from '@/models/category';
import checkSessionOnServer from '@/util/checkSessionOnServer';
import dateTimeToStringDate from '@/logics/dateTimeToStringDate';
import { DateTime } from 'luxon';
import {
  categoryLabelsType,
  noteType,
  priceType,
} from '@/models/paymentHistory';

const paymentHistoryPageDocument = graphql(`
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
`);

const paymentHistoryPageListCategoriesDocument = graphql(`
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
`);

const pageParamSchema = z.object({
  paymentHistoryId: z.coerce.number(),
});

const paymentHistorySchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  paymentDate: z.string(),
  note: noteType,
  price: priceType,
  labels: categoryLabelsType,
});

const categorySchema = z.array(
  z.object({
    id: z.number(),
    name: nameType,
    labels: categoryLabelsType,
  }),
);

export default async function Home({
  params,
}: {
  params: { paymentHistoryId: unknown };
}) {
  const paymentHistoryId = pageParamSchema.parse(params).paymentHistoryId;
  const { cookie } = await checkSessionOnServer(
    `payment-histories/${paymentHistoryId}/`,
  );
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const res = await getClient().query(paymentHistoryPageDocument, {
      paymentHistoryId,
    });
    if (res.error) throw res.error;

    const listCategoriesRes = await getClient().query(
      paymentHistoryPageListCategoriesDocument,
      {
        targetDate: dateTimeToStringDate(DateTime.now()),
      },
    );
    if (listCategoriesRes.error) throw listCategoriesRes.error;
    const result = paymentHistorySchema.parse(res.data?.paymentHistory);
    const listPaymentResult = categorySchema.parse(
      listCategoriesRes.data?.listCategories,
    );
    return (
      <PaymentHistoryMain
        paymentHistory={result}
        listCategories={listPaymentResult}
      />
    );
  } catch (e) {
    notFound();
  }
}
