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
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';

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
  const {
    alertType: updateAlertType,
    setSuccess: updateSetSuccess,
    setError: updateSetError,
    setProcessing: updateSetProcessing,
    setNone: updateSetNone,
  } = useAlert();
  const {
    alertType: deleteAlertType,
    setSuccess: deleteSetSuccess,
    setError: deleteSetError,
    setProcessing: deleteSetProcessing,
    setNone: deleteSetNone,
  } = useAlert();
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
    return (
      <Typography variant="body1" color={grey[500]}>
        支払項目が見つかりません
      </Typography>
    );
  }
  return (
    <>
      <MoneygerSnackBar
        state={updateAlertType}
        successMessage="支払いの更新に成功しました"
        errorMessage="支払いの更新に失敗しました"
        processingMessage="支払いを更新中です"
        onClose={updateSetNone}
      />
      <MoneygerSnackBar
        state={deleteAlertType}
        successMessage="支払いの削除に成功しました"
        errorMessage="支払いの削除に失敗しました"
        processingMessage="支払いを削除です"
        onClose={deleteSetNone}
      />
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
        events={{
          onSuccess: updateSetSuccess,
          onError: updateSetError,
          onProcessing: updateSetProcessing,
        }}
      />
      <DeletePaymentHistoryDialog
        dialogState={deleteDialogState}
        paymentHistory={paymentHistory}
        onClose={closeDialog}
        events={{
          onSuccess: deleteSetSuccess,
          onError: deleteSetError,
          onProcessing: deleteSetProcessing,
        }}
      />
    </>
  );
};

export default PaymentHistoryMain;
