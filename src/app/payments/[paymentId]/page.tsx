import PaymentMain from '@/app/payments/[paymentId]/_main/PaymentMain';
import MainContentsWrapper from '@/components/common/MainContentsWrapper';
import PageContentsTemplate from '@/components/common/PageContentsTemplate';

export default function Home() {
  return (
    <PageContentsTemplate>
      <MainContentsWrapper>
        <PaymentMain paymentId={1} />
      </MainContentsWrapper>
    </PageContentsTemplate>
  );
}
