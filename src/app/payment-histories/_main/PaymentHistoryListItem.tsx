'use client';
import { Box, IconButton, ListItem, ListItemButton, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { grey } from '@mui/material/colors';
import * as CloseIcon from '@mui/icons-material/Close';
import DeletePaymentHistoryDialog from '@/app/payment-histories/_dialog/DeletePaymentHistoryDialog';
import DialogState from '@/types/DialogState';
import useAlert from '@/hooks/useAlert';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';

type Props = {
  id: number;
  note: string | null;
  price: number;
  paymentDate: string;
};

const PaymentHistoryListItem: React.FC<Props> = ({
  id,
  note,
  price,
  paymentDate,
}) => {
  const router = useRouter();
  const [dialogState, setDialogState] = useState<DialogState>('closed');

  const { alertType, setSuccess, setError, setProcessing, setNone } = useAlert();

  const closeDialog = useCallback(() => setDialogState('closed'), [])
  const handleClick = useCallback(() => {
    router.push(
      `/payment-histories/[paymentHistoryId]`.replace(
        '[paymentHistoryId]',
        id.toString(),
      ),
    );
  }, [router, id]);

  const handleDeleteClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setDialogState('open');
  }, [])

  return (
    <>
      <MoneygerSnackBar
        state={alertType}
        successMessage="支払いの削除に成功しました"
        errorMessage="支払いの削除に失敗しました"
        processingMessage="支払いを削除中..."
        onClose={setNone}
      />

      <ListItem disablePadding>
        <ListItemButton
          sx={{
            px: 0,
            py: 1,
            display: 'flex',
            alignItems: 'space-between',
          }}
          onClick={handleClick}
        >
          <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            flex={7}
          >
            <Typography variant="h3Bold" mb={0.5}>
              {price.toLocaleString()}円
            </Typography>
            <Typography variant="body1">{!note ? '-' : note}</Typography>
          </Box>
          <Box color={grey[400]} flex={1} textAlign="center">
            <IconButton color="inherit" onClick={handleDeleteClick} size='small'>
              <CloseIcon.default fontSize='inherit'/>
            </IconButton>
          </Box>
        </ListItemButton>
      </ListItem>

      <DeletePaymentHistoryDialog
        dialogState={dialogState}
        paymentHistory={{
          id,
          note,
          price,
          paymentDate
        }}
        onClose={closeDialog}
        events={{
          onSuccess: setSuccess,
          onError: setError,
          onProcessing: setProcessing,
        }}
      />
    </>
  );
};

export default PaymentHistoryListItem;
