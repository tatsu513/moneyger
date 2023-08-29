import PaymentHistoriesMain from '@/app/payment-histories/_main/PaymentHistoriesMain';
import { graphql } from '@/dao/generated/preset';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { z } from 'zod';
import { nameType } from '@/models/category';
import { notFound } from 'next/navigation';
import checkSessionOnServer from '@/util/checkSessionOnServer';

const paymentHistoriesPageDocument = graphql(`
  query paymentHistoriesPage {
    listCategories {
      id
      name
    }
    listPaymentHistories {
      id
      paymentId
      paymentDate
      note
      price
    }
  }
`);

const fetchDataSchema = z.object({
  listCategories: z.array(
    z.object({
      id: z.number(),
      name: nameType,
    }),
  ),
  listPaymentHistories: z.array(
    z.object({
      id: z.number(),
      note: z.string().nullable(),
      price: z.number(),
      paymentDate: z.string(),
      paymentId: z.number(),
    }),
  ),
});

export default async function Home() {
  const { cookie } = await checkSessionOnServer('/payment-histories');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const res = await getClient().query(paymentHistoriesPageDocument, {});
    if (res.error) throw res.error;
    const result = fetchDataSchema.parse(res.data);
    return (
      <PaymentHistoriesMain
        listCategories={result.listCategories}
        listPaymentHistories={result.listPaymentHistories}
      />
    );
  } catch (e) {
    notFound();
  }
}
