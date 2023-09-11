'use client';
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { grey } from '@mui/material/colors';
import * as CloseIcon from '@mui/icons-material/Close';
import DeletePaymentHistoryDialog from '@/app/payment-histories/_dialog/DeletePaymentHistoryDialog';
import DialogState from '@/types/DialogState';
import useAlert from '@/hooks/useAlert';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import DisplayCategoryLabelsList from '@/components/DisplayCategoryLabelsList';
import { CategoryLabel } from '@/dao/generated/preset/graphql';

type Props = {
  id: number;
  note: string | null;
  price: number;
  paymentDate: string;
  labels: CategoryLabel[];
};

const PaymentHistoryListItem: React.FC<Props> = ({
  id,
  note,
  price,
  paymentDate,
  labels,
}) => {
  const router = useRouter();
  const [dialogState, setDialogState] = useState<DialogState>('closed');

  const { alertType, setSuccess, setError, setProcessing, setNone } =
    useAlert();

  const closeDialog = useCallback(() => setDialogState('closed'), []);
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
  }, []);

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
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
          onClick={handleClick}
        >
          <Box
            display="flex"
            alignContent="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              flex={7}
            >
              <Typography variant="h3Bold" mb={1}>
                {price.toLocaleString()}円
              </Typography>
              {labels.length > 0 && (
                <Box mb={0.5}>
                  <DisplayCategoryLabelsList labels={labels} />
                </Box>
              )}
              {/* <Typography variant="body1">{!note ? '-' : note}</Typography> */}
            </Box>
            <Box color={grey[400]} flex={1} textAlign="center">
              <IconButton
                color="inherit"
                onClick={handleDeleteClick}
                size="small"
              >
                <CloseIcon.default fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>

      <DeletePaymentHistoryDialog
        dialogState={dialogState}
        paymentHistory={{
          id,
          note,
          price,
          paymentDate,
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
