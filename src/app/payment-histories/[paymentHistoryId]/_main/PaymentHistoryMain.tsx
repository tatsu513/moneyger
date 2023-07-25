'use client';

import {
  PaymentHistoryPageListPaymentsQuery,
  PaymentHistoryPageQuery,
} from '@/dao/generated/preset/graphql';
import DialogState from '@/types/DialogState';
import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import UpdatePaymentHistoryDialog from '@/app/payment-histories/[paymentHistoryId]/_dialog/UpdatePaymentHistoryDialog';
import PrismaDateToFrontendDateStr from '@/logics/PrismaDateToFrontendDateStr';
import PageTitle from '@/components/common/PageTitle';
import { grey } from '@mui/material/colors';
import { Delete as DeleteIcon } from '@mui/icons-material';
import DeletePaymentHistoryDialog from '@/app/payment-histories/[paymentHistoryId]/_dialog/DeletePaymentHistoryDialog';

type ListPayments = PaymentHistoryPageListPaymentsQuery['listPayments'];

type Props = {
  paymentHistory: NonNullable<PaymentHistoryPageQuery['paymentHistory']>;
  listPayments: ListPayments;
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
    return <>支払項目が見つかりません</>;
  }
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <PageTitle title="支払詳細" />
        <Box color={grey[500]}>
          <IconButton size="small" color="inherit" onClick={deleteDialogOpen}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">支払項目</Typography>
        <Typography variant="h2">{payment?.name ?? '-'}</Typography>
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

      <Button variant="outlined" fullWidth onClick={updateDialogOpen}>
        編集する
      </Button>

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
    </Box>
  );
};

export default PaymentHistoryMain;
