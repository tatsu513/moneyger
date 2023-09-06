import PaymentHistoriesMain from '@/app/payment-histories/_main/PaymentHistoriesMain';
import { graphql } from '@/dao/generated/preset';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { z } from 'zod';
import { labelsType, nameType } from '@/models/category';
import { notFound } from 'next/navigation';
import checkSessionOnServer from '@/util/checkSessionOnServer';
import dateTimeToStringDate from '@/logics/dateTimeToStringDate';
import { DateTime } from 'luxon';

const paymentHistoriesPageDocument = graphql(`
  query paymentHistoriesPage($targetDate: String!) {
    listCategories(targetDate: $targetDate) {
      id
      name
      labels {
        id
        name
      }
    }
    listPaymentHistories {
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

const fetchDataSchema = z.object({
  listCategories: z.array(
    z.object({
      id: z.number(),
      name: nameType,
      labels: labelsType,
    }),
  ),
  listPaymentHistories: z.array(
    z.object({
      id: z.number(),
      note: z.string().nullable(),
      price: z.number(),
      paymentDate: z.string(),
      categoryId: z.number(),
      labels: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  ),
});

export default async function Home() {
  const { cookie } = await checkSessionOnServer('/payment-histories');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const res = await getClient().query(paymentHistoriesPageDocument, {
      targetDate: dateTimeToStringDate(DateTime.now()),
    });
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
