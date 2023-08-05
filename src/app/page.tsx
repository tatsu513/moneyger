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
  }
`);

const schema = z.object({
  paymentSummary: z.object({
    totalMaxAmount: z.number(),
    totalCurrentAmount: z.number(),
    totalPaymentRatio: z.number(),
  }),
});

export default async function Home() {
  const { cookie } = await checkSessionOnServer('/');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const result = await getClient().query(
      topPageDocument,
      {},
      { suspense: true },
    );
    if (result.error) {
      throw result.error;
    }
    const summary = schema.parse(result.data);
    return <TopMain summary={summary} />;
  } catch (error) {
    console.error({ error });
    notFound();
  }
}
