'use client';

import {
  PaymentHistory,
  PaymentHistoryPageListPaymentsQuery,
} from '@/dao/generated/preset/graphql';
import DialogState from '@/types/DialogState';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import UpdatePaymentHistoryDialog from '@/app/payment-histories/[paymentHistoryId]/_dialog/UpdatePaymentHistoryDialog';
import PrismaDateToFrontendDateStr from '@/logics/PrismaDateToFrontendDateStr';
import PageTitle from '@/components/common/PageTitle';
import DeletePaymentHistoryDialog from '@/app/payment-histories/[paymentHistoryId]/_dialog/DeletePaymentHistoryDialog';
import SecondaryButton from '@/components/common/buttons/SecondaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { grey } from '@/color';

type Props = {
  paymentHistory: PaymentHistory;
  listPayments: PaymentHistoryPageListPaymentsQuery['listPayments'];
};
const PaymentHistoryMain: React.FC<Props> = ({
  paymentHistory,
  listPayments,
}) => {
  const [updateDialogState, setUpdateDialogState] =
    useState<DialogState>('closed');
  const [deleteDialogState, setDeleteDialogState] =
    useState<DialogState>('closed');
  const updateDialogOpen = useCallback(() => {
    setUpdateDialogState('open');
  }, []);
  const deleteDialogOpen = useCallback(() => {
    setDeleteDialogState('open');
  }, []);
  const closeDialog = useCallback(() => {
    setUpdateDialogState('closed');
    setDeleteDialogState('closed');
  }, []);

  const payment = listPayments.find((p) => p.id === paymentHistory.paymentId);
  if (payment == null) {
    return <Typography variant='body1' color={grey[500]}>支払項目が見つかりません</Typography>;
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <PageTitle title={payment?.name ?? '-'} />
        <TextButton label="削除する" onClick={deleteDialogOpen} />
      </Box>

      <Box mb={2}>
        <Typography variant="body1">支払日</Typography>
        <Typography variant="h2">
          {PrismaDateToFrontendDateStr(paymentHistory.paymentDate)}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="body1">支払金額</Typography>
        <Typography variant="h2">
          {paymentHistory.price.toLocaleString()}円
        </Typography>
      </Box>

      <SecondaryButton label="編集する" fullWidth onClick={updateDialogOpen} />

      <UpdatePaymentHistoryDialog
        dialogState={updateDialogState}
        paymentHistory={paymentHistory}
        listPayments={listPayments}
        onClose={closeDialog}
      />
      <DeletePaymentHistoryDialog
        dialogState={deleteDialogState}
        paymentHistory={paymentHistory}
        onClose={closeDialog}
      />
    </>
  );
};

export default PaymentHistoryMain;
