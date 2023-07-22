'use client';
import React, { useCallback, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import UpdatePaymentDialog from '@/app/payments/[paymentId]/_dialog/UpdatePaymentDialog';
import DialogState from '@/types/DialogState';
import DeletePaymentDialog from '@/app/payments/[paymentId]/_dialog/DeletePaymentDialog';
import { Payment } from '@/dao/generated/preset/graphql';
import PageTitle from '@/components/common/PageTitle';
import { grey } from '@/color';
import { Delete as DeleteIcon } from '@mui/icons-material';

type Props = {
  payment: Payment;
};

const PaymentMain: React.FC<Props> = ({ payment }) => {
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
      <Box mb={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <PageTitle title={payment.name} />
          <Box color={grey[500]}>
            <IconButton size="small" color="inherit" onClick={deleteDialogOpen}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" mb={0.5}>
            今月の使用可能金額
          </Typography>
          <Typography variant="h1">
            {(payment.maxAmount - payment.currentAmount).toLocaleString()}円
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="body1">上限</Typography>
          <Typography variant="h2">
            {payment.maxAmount.toLocaleString()}円
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1">支払済</Typography>
          <Typography variant="h2">
            {payment.currentAmount.toLocaleString()}円
          </Typography>
        </Box>
      </Box>

      <Button variant="outlined" fullWidth onClick={updateDialogOpen}>
        編集する
      </Button>

      <UpdatePaymentDialog
        dialogState={updateDialogState}
        payment={payment}
        onClose={handleClose}
      />
      <DeletePaymentDialog
        dialogState={deleteDialogState}
        payment={payment}
        onClose={handleClose}
      />
    </>
  );
};

export default PaymentMain;
