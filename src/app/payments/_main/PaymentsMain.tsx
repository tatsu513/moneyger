'use client';

import React, { useCallback, useState } from 'react';
import { Box, Divider, List } from '@mui/material';
import PageTitle from '@/components/common/PageTitle';
import DialogState from '@/types/DialogState';
import CreatePaymentDialog from '@/app/payments/_dialog/CreatePaymentDialog';
import { Payment } from '@/dao/generated/preset/graphql';
import PaymentListItem from '@/app/payments/_main/PaymentListItem';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';

type Props = {
  payments: Payment[];
};
const PaymentsMain: React.FC<Props> = ({ payments }) => {
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);
  return (
    <Box>
      <Box
        px={2}
        pb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <PageTitle title="Payments" />
        <PrimaryButton label="追加する" onClick={dialogOpen} />
      </Box>
      <List>
        <Divider component="li" />
        {payments.map((p) => (
          <PaymentListItem key={p.name} {...p} />
        ))}
      </List>
      <CreatePaymentDialog dialogState={dialogState} onClose={dialogClose} />
    </Box>
  );
};

export default PaymentsMain;
