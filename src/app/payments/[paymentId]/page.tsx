import PaymentMain from '@/app/payments/[paymentId]/_main/PaymentMain';
import MainContentsWrapper from '@/components/common/MainContentsWrapper';
import PageContentsTemplate from '@/components/common/PageContentsTemplate';
import { graphql } from '@/dao/generated/preset';
import { currentAmountType, maxAmountType, nameType } from '@/models/payment';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const paymentPageDocument = graphql(`
  query paymentPage($paymentId: Int!) {
    payment(paymentId: $paymentId) {
      id
      name
      maxAmount
      currentAmount
    }
  }
`);

const pageParamSchema = z.object({
  paymentId: z.coerce.number(),
});

const paymentSchema = z.object({
  id: z.number(),
  name: nameType,
  maxAmount: maxAmountType,
  currentAmount: currentAmountType,
});

export default async function Home({
  params,
}: {
  params: { paymentId: unknown };
}) {
  const paymentId = pageParamSchema.parse(params).paymentId;
  const { getClient } = registerRscUrqlClient('cookie');

  try {
    const res = await getClient().query(paymentPageDocument, { paymentId });
    if (res.error) throw res.error;
    const result = paymentSchema.parse(res.data?.payment);
    return (
      <PageContentsTemplate>
        <MainContentsWrapper>
          <PaymentMain payment={result} />
        </MainContentsWrapper>
      </PageContentsTemplate>
    );
  } catch (e) {
    notFound();
  }
}
