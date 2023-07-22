'use client';
import CommonLoading from '@/components/common/CommonLoading';
import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import React, { Suspense, useCallback, useState } from 'react';
import PaymentWithSuspense from '@/app/payments/[paymentId]/_main/PaymentWithSuspense';
import { Box, Button } from '@mui/material';
import UpdatePaymentDialog from '@/app/payments/[paymentId]/_dialog/UpdatePaymentDialog';
import DialogState from '@/types/DialogState';
import DeletePaymentDialog from '@/app/payments/[paymentId]/_dialog/DeletePaymentDialog';
type Props = {
  paymentId: number;
};

const PaymentMain: React.FC<Props> = ({ paymentId }) => {
  const [updateDialogState, setUpdateDialogState] =
    useState<DialogState>('closed');
  const [deleteDialogState, setDeleteDialogState] =
    useState<DialogState>(`closed`);

  const updateDialogOpen = useCallback(() => {
    setUpdateDialogState('open');
  }, []);
  const deleteDialogOpen = useCallback(() => {
    setDeleteDialogState('open');
  }, []);
  const handleClose = useCallback(() => {
    setUpdateDialogState('closed');
    setDeleteDialogState('closed');
  }, []);
  return (
    <>
      <FetchErrorBoundary>
        <Suspense fallback={<CommonLoading height={290} />}>
          <Box mb={4}>
            <PaymentWithSuspense
              paymentId={paymentId}
              onClickDelete={deleteDialogOpen}
            />
          </Box>
        </Suspense>
      </FetchErrorBoundary>

      <Button variant="outlined" fullWidth onClick={updateDialogOpen}>
        編集する
      </Button>

      <UpdatePaymentDialog
        dialogState={updateDialogState}
        onClose={handleClose}
      />
      <DeletePaymentDialog
        dialogState={deleteDialogState}
        onClose={handleClose}
      />
    </>
  );
};

export default PaymentMain;
