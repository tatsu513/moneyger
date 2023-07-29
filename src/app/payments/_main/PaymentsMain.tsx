'use client';

import React, { useCallback, useState } from 'react';
import { Box, Fab } from '@mui/material';
import PageTitle from '@/components/common/PageTitle';
import { Add as AddIcon } from '@mui/icons-material';
import DialogState from '@/types/DialogState';
import CreatePaymentDialog from '@/app/payments/_dialog/CreatePaymentDialog';
import { Payment } from '@/dao/generated/preset/graphql';
import PaymentListItem from '@/app/payments/_main/PaymentListItem';

type Props = {
  payments: Payment[];
};
const PaymentsMain: React.FC<Props> = ({ payments }) => {
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);
  return (
    <Box>
      <Box px={2}>
        <PageTitle title="Payments" />
      </Box>
      {payments.map((p) => (
        <PaymentListItem key={p.name} {...p} />
      ))}

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
