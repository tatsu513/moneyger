'use client';

import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import CommonLoading from '@/components/common/CommonLoading';
import ListPaymentWithSuspense from '@/app/payments/_main/ListPaymentWithSuspense';
import PageTitle from '@/components/common/PageTitle';
import MainContentsWrapper from '@/components/common/MainContentsWrapper';

const PaymentsMain = () => {
  return (
    <Box>
      <MainContentsWrapper>
        <PageTitle title="今月のお支払" />
      </MainContentsWrapper>
      <FetchErrorBoundary>
        <Suspense fallback={<CommonLoading />}>
          <ListPaymentWithSuspense />
        </Suspense>
      </FetchErrorBoundary>
    </Box>
  );
};

export default PaymentsMain;
