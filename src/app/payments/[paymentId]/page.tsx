import PaymentMain from '@/app/payments/[paymentId]/_main/PaymentMain';
import MainContentsWrapper from '@/components/common/MainContentsWrapper';
import PageContentsTemplate from '@/components/common/PageContentsTemplate';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const pageParamsSchema = z.object({
  paymentId: z.string(),
});

export default function Home({ params }: { params: { paymentId: unknown } }) {
  const result = pageParamsSchema.safeParse(params);
  if (!result.success) notFound();
  const paymentIdNum = Number(result.data.paymentId);
  if (isNaN(paymentIdNum)) notFound();
  return (
    <PageContentsTemplate>
      <MainContentsWrapper>
        <PaymentMain paymentId={paymentIdNum} />
      </MainContentsWrapper>
    </PageContentsTemplate>
  );
}
