'use client';
import React, { useCallback, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import UpdatePaymentDialog from '@/app/payments/[paymentId]/_dialog/UpdatePaymentDialog';
import DialogState from '@/types/DialogState';
import DeletePaymentDialog from '@/app/payments/[paymentId]/_dialog/DeletePaymentDialog';
import { Payment } from '@/dao/generated/preset/graphql';
import PageTitle from '@/components/common/PageTitle';
import { grey } from '@/color';
import { Delete as DeleteIcon } from '@mui/icons-material';
import SecondaryButton from '@/components/common/buttons/SecondaryButton';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import RowContentsBlock from '@/components/common/RowContentsBlock';

type Props = {
  payment: Payment;
};

const PaymentMain: React.FC<Props> = ({ payment }) => {
  const [updateDialogState, setUpdateDialogState] =
    useState<DialogState>('closed');
  const [deleteDialogState, setDeleteDialogState] =
    useState<DialogState>(`closed`);

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
  const handleClose = useCallback(() => {
    setUpdateDialogState('closed');
    setDeleteDialogState('closed');
  }, []);
  return (
    <>
      <MoneygerSnackBar
        state={updateAlertType}
        successMessage="費目の更新に成功しました"
        errorMessage="費目の更新に失敗しました"
        processingMessage="費目を更新中..."
        onClose={updateSetNone}
      />
      <MoneygerSnackBar
        state={deleteAlertType}
        successMessage="費目の削除に成功しました"
        errorMessage="費目の削除に失敗しました"
        processingMessage="費目を削除中..."
        onClose={deleteSetNone}
      />
      <Box mb={4}>
        <Box mb={2}>
          <Typography variant='caption' mb={0.5} color={grey[500]}>費目</Typography>
          <PageTitle title={payment.name} />
        </Box>

        <RowContentsBlock title="使用可能額" body={(payment.maxAmount - payment.currentAmount).toLocaleString() + '円'}/>
        <RowContentsBlock title="上限" body={(payment.maxAmount - payment.currentAmount).toLocaleString() + '円'}/>
        <RowContentsBlock title="支払済" body={(payment.currentAmount.toLocaleString()) + '円'}/>

        <Box textAlign="center" display="flex" columnGap={1} mt={4}>
          <Box flex={1}>
          <PrimaryButton label="編集" fullWidth onClick={updateDialogOpen} />
          </Box>
          <Box flex={1}>
          <SecondaryButton label="削除" fullWidth onClick={deleteDialogOpen} />
        </Box>
      </Box>
      </Box>

      <UpdatePaymentDialog
        dialogState={updateDialogState}
        payment={payment}
        onClose={handleClose}
        events={{
          onSuccess: updateSetSuccess,
          onError: updateSetError,
          onProcessing: updateSetProcessing,
        }}
      />
      <DeletePaymentDialog
        dialogState={deleteDialogState}
        payment={payment}
        onClose={handleClose}
        events={{
          onSuccess: deleteSetSuccess,
          onError: deleteSetError,
          onProcessing: deleteSetProcessing,
        }}
      />
    </>
  );
};

export default PaymentMain;
