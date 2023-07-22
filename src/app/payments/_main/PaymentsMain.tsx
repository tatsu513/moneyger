'use client';

import React, { Suspense, useCallback, useState } from 'react';
import { Box, Fab } from '@mui/material';
import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import CommonLoading from '@/components/common/CommonLoading';
import ListPaymentWithSuspense from '@/app/payments/_main/ListPaymentWithSuspense';
import PageTitle from '@/components/common/PageTitle';
import MainContentsWrapper from '@/components/common/MainContentsWrapper';
import { Add as AddIcon } from '@mui/icons-material';
import DialogState from '@/types/DialogState';
import CreatePaymentDialog from '@/app/payments/_dialog/CreatePaymentDialog';

const PaymentsMain = () => {
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);
  return (
    <Box>
      <MainContentsWrapper>
        <PageTitle title="Payments" />
      </MainContentsWrapper>
      <FetchErrorBoundary>
        <Suspense fallback={<CommonLoading />}>
          <ListPaymentWithSuspense />
        </Suspense>
      </FetchErrorBoundary>

      <Box
        sx={{
          position: 'fixed',
          top: 'auto',
          bottom: 32,
          right: 16,
          left: 'auto',
        }}
      >
        <Fab variant="extended" size="medium" onClick={dialogOpen}>
          <AddIcon sx={{ mr: 0.5 }} />
          支払項目を追加
        </Fab>
      </Box>
      <CreatePaymentDialog dialogState={dialogState} onClose={dialogClose} />
    </Box>
  );
};

export default PaymentsMain;
