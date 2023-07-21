import PaymentsMain from '@/app/payments/_main/PaymentsMain';
import PageContentsTemplate from '@/components/common/PageContentsTemplate';

export default async function Home() {
  return (
    <PageContentsTemplate>
      <PaymentsMain />
    </PageContentsTemplate>
  );
}
