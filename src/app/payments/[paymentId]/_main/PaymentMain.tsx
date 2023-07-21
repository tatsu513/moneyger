'use client';
import CommonLoading from '@/components/common/CommonLoading';
import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import PageTitle from '@/components/common/PageTitle';
import React, { Suspense } from 'react';
import PaymentWithSuspense from '@/app/payments/[paymentId]/_main/PaymentWithSuspense';

type Props = {
  paymentId: number;
};

const PaymentMain: React.FC<Props> = ({ paymentId }) => {
  return (
    <>
      <PageTitle title="食事" />
      <FetchErrorBoundary>
        <Suspense fallback={<CommonLoading />}>
          <PaymentWithSuspense id={paymentId} />
        </Suspense>
      </FetchErrorBoundary>
    </>
  );
};

export default PaymentMain;
