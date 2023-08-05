import PaymentHistoriesMain from '@/app/payment-histories/_main/PaymentHistoriesMain';
import { graphql } from '@/dao/generated/preset';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { z } from 'zod';
import { nameType } from '@/models/payment';
import { notFound } from 'next/navigation';
import checkSessionOnServer from '@/util/checkSessionOnServer';

const paymentHistoriesPageDocument = graphql(`
  query paymentHistoriesPage {
    listPayments {
      id
      name
    }
  }
`);

const paymentSchema = z.array(
  z.object({
    id: z.number(),
    name: nameType,
  }),
);

export default async function Home() {
  const { cookie } = await checkSessionOnServer('/payment-histories');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const res = await getClient().query(paymentHistoriesPageDocument, {});
    if (res.error) throw res.error;
    const result = paymentSchema.parse(res.data?.listPayments);
    return <PaymentHistoriesMain listPayments={result} />;
  } catch (e) {
    notFound();
  }
}
