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
import DeletePaymentHistoryDialog from '@/app/payment-histories/[paymentHistoryId]/_dialog/DeletePaymentHistoryDialog';
import SecondaryButton from '@/components/common/buttons/SecondaryButton';
import { grey } from '@/color';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import RowContentsBlock from '@/components/common/RowContentsBlock';
import PageTitle from '@/components/common/PageTitle';

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
        費目が見つかりません
      </Typography>
    );
  }
  return (
    <>
      <MoneygerSnackBar
        state={updateAlertType}
        successMessage="支払いの更新に成功しました"
        errorMessage="支払いの更新に失敗しました"
        processingMessage="支払いを更新中..."
        onClose={updateSetNone}
      />
      <MoneygerSnackBar
        state={deleteAlertType}
        successMessage="支払いの削除に成功しました"
        errorMessage="支払いの削除に失敗しました"
        processingMessage="支払いを削除中..."
        onClose={deleteSetNone}
      />
      <Box mb={2}>
        <PageTitle title="支払い詳細" />
      </Box>
      
      <RowContentsBlock title="費目" body={payment?.name ?? '-'}/>
      <RowContentsBlock title="支払日" body={PrismaDateToFrontendDateStr(paymentHistory.paymentDate)}/>
      <RowContentsBlock title="金額" body={paymentHistory.price.toLocaleString() + '円'}/>
      <RowContentsBlock title="メモ" body={paymentHistory.note ?? '-'}/>

      <Box textAlign="center" display="flex" columnGap={1} mt={2}>
        <Box flex={1}>
        <PrimaryButton label="編集" fullWidth onClick={updateDialogOpen} />
        </Box>
        <Box flex={1}>
        <SecondaryButton label="削除" fullWidth onClick={deleteDialogOpen} />
        </Box>
      </Box>

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
