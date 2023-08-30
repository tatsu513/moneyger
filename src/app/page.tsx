import TopMain from '@/app/_main/TopMain';
import { graphql } from '@/dao/generated/preset/gql';
import checkSessionOnServer from '@/util/checkSessionOnServer';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const topPageDocument = graphql(`
  query paymentSummary {
    paymentSummary {
      totalMaxAmount
      totalCurrentAmount
      totalPaymentRatio
    }
    listCategories {
      id
      name
      maxAmount
      currentAmount
    }
  }
`);

const schema = z.object({
  paymentSummary: z.object({
    totalMaxAmount: z.number(),
    totalCurrentAmount: z.number(),
    totalPaymentRatio: z.number(),
  }),
  listCategories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      maxAmount: z.number(),
      currentAmount: z.number()
    })
  )
});

export default async function page() {
  const { cookie } = await checkSessionOnServer('/');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const result = await getClient().query(topPageDocument, {});
    if (result.error) {
      console.error({ error: result.error, message: 'fetch失敗' });
      throw result.error;
    }
    const summary = schema.parse(result.data);
    return <TopMain summary={summary} />;
  } catch (error) {
    console.error({ error, page: '/' });
    notFound();
  }
}
