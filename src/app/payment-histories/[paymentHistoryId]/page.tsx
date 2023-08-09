import { graphql } from '@/dao/generated/preset';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { z } from 'zod';
import { notFound } from 'next/navigation';
import PaymentHistoryMain from '@/app/payment-histories/[paymentHistoryId]/_main/PaymentHistoryMain';
import { nameType } from '@/models/payment';
import checkSessionOnServer from '@/util/checkSessionOnServer';

const paymentHistoryPageDocument = graphql(`
  query paymentHistoryPage($paymentHistoryId: Int!) {
    paymentHistory(paymentHistoryId: $paymentHistoryId) {
      id
      paymentId
      paymentDate
      note
      price
    }
  }
`);

const paymentHistoryPageListPaymentsDocument = graphql(`
  query paymentHistoryPageListPayments {
    listPayments {
      id
      name
    }
  }
`);

const pageParamSchema = z.object({
  paymentHistoryId: z.coerce.number(),
});

const paymentHistorySchema = z.object({
  id: z.number(),
  paymentId: z.number(),
  paymentDate: z.string(),
  note: z.string().nullable(),
  price: z.number(),
});

const paymentSchema = z.array(
  z.object({
    id: z.number(),
    name: nameType,
  }),
);

export default async function Home({
  params,
}: {
  params: { paymentHistoryId: unknown };
}) {
  const paymentHistoryId = pageParamSchema.parse(params).paymentHistoryId;
  const { session, cookie } = await checkSessionOnServer(
    `payment-histories/${paymentHistoryId}/`,
  );
  const { getClient } = registerRscUrqlClient(session, cookie);
  try {
    const res = await getClient().query(paymentHistoryPageDocument, {
      paymentHistoryId,
    });
    if (res.error) throw res.error;

    const listPaymentsRes = await getClient().query(
      paymentHistoryPageListPaymentsDocument,
      {},
    );
    if (listPaymentsRes.error) throw listPaymentsRes.error;
    const result = paymentHistorySchema.parse(res.data?.paymentHistory);
    const listPaymentResult = paymentSchema.parse(
      listPaymentsRes.data?.listPayments,
    );
    return (
      <PaymentHistoryMain
        paymentHistory={result}
        listPayments={listPaymentResult}
      />
    );
  } catch (e) {
    notFound();
  }
}
