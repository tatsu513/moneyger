import PaymentsMain from '@/app/payments/_main/PaymentsMain';
import { GRAPHQL_ENDPOINT } from '@/constants/graphqlEndpoint';
import { graphql } from '@/dao/generated/preset';
import { currentAmountType, maxAmountType, nameType } from '@/models/payment';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { ShardEnvs } from '@/util/shardEnvs';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const envs = new ShardEnvs();

const paymentsPageDocument = graphql(`
  query listPayments {
    listPayments {
      id
      name
      maxAmount
      currentAmount
    }
  }
`);

const paymentsSchema = z.array(
  z.object({
    id: z.number(),
    name: nameType,
    maxAmount: maxAmountType,
    currentAmount: currentAmountType,
  }),
);

export default async function page() {
  const { getClient } = registerRscUrqlClient('cookie');
  try {
    const result = await getClient().query(
      paymentsPageDocument,
      {},
      { suspense: true },
    );
    console.log({ result });
    console.log({ url: envs.nextAuthUrl + GRAPHQL_ENDPOINT });
    if (result.error) {
      throw result.error;
    }
    const payments = paymentsSchema.parse(result.data?.listPayments);
    return <PaymentsMain payments={payments} />;
  } catch (error) {
    console.error({ error });
    notFound();
  }
}
