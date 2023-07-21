'use client';
import CommonLoading from '@/components/common/CommonLoading';
import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import PageTitle from '@/components/common/PageTitle';
import React, { ChangeEvent, Suspense, useCallback, useState } from 'react';
import PaymentWithSuspense from '@/app/payments/[paymentId]/_main/PaymentWithSuspense';

type Props = {
  paymentId: number;
};

const PaymentMain: React.FC<Props> = ({ paymentId }) => {
  const [value, setValue] = useState<string>('');
  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [],
  );
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
